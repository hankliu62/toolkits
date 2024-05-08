import { HourglassOutlined, ThunderboltOutlined } from "@ant-design/icons";
// import type {
//   monaco as Monaco,
//   TMonacoEditorLanguage,
// } from "@hankliu/rc-monaco-editor";
// import { Languages } from "@hankliu/rc-monaco-editor/lib/constants/index";
import { Breadcrumb, Button, message, Select } from "antd";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import PrettierWorker from "worker-loader!../../../workers/editor-prettier.worker";

import MonacoEditor from "@/components/CodeEditor";
import { LanguageDemo, Languages } from "@/constants/editor";
import { getRoutePrefix } from "@/utils/route";
import { createWorkerQueue } from "@/utils/workers";

// const MonacoEditor = dynamic(import("@hankliu/rc-monaco-editor"), {
//   ssr: false,
// });

const LanguagesOptions = Languages.map((item) => ({
  label: item,
  value: item,
}));

/**
 * Monaco编辑器在线网站
 *
 * @returns
 */
export default function MonacoEditorPage() {
  const [value, setValue] = useState<string>();
  const [language, setLanguage] = useState<keyof typeof LanguageDemo>("html");
  const editor = useRef<any>();
  const prettierWorker = useRef<any>();

  useEffect(() => {
    if (!prettierWorker.current) {
      prettierWorker.current = createWorkerQueue(PrettierWorker);
    }
  }, []);

  /**
   * 格式化代码
   */
  const onFormatCode = useCallback(
    async (val?: string) => {
      if (prettierWorker.current) {
        // 使用WebWorker进行代码格式化处理
        const { canceled, error, pretty } = await prettierWorker.current.emit({
          text: val || value,
          language: language,
        });

        if (error) {
          message.error(error.message);
          return;
        }

        if (canceled) return;

        setValue(pretty);
      }
    },
    [value, language]
  );

  /**
   * 设置案例
   */
  const onSetExample = useCallback(() => {
    setValue(LanguageDemo[language] || "");
  }, [language]);

  return (
    <div className="bg-white pb-6">
      <Breadcrumb
        className="!m-6"
        items={[
          {
            title: <Link href={getRoutePrefix() + "/"}>小工具集合</Link>,
          },
          {
            title: "代码编辑器",
          },
        ]}
      />

      <div className="flex flex-col space-y-6 px-6">
        <div>
          <label className="text-base font-normal">语言: </label>
          <div className="mt-2">
            <Select
              showSearch
              value={language}
              className="w-64"
              options={LanguagesOptions}
              onChange={(newLanguage) => {
                setLanguage(newLanguage);
              }}
            />
          </div>
        </div>
        <div>
          <div className="flex justify-between pb-4">
            <label className="text-base font-normal">案例展示: </label>

            <div className="flex items-center space-x-5">
              <Button
                className="!inline-flex items-center"
                icon={<HourglassOutlined rev={undefined} />}
                onClick={onSetExample}
                disabled={!LanguageDemo[language]}
              >
                案例
              </Button>

              <Button
                className="!inline-flex items-center"
                icon={<ThunderboltOutlined rev={undefined} />}
                onClick={() => {
                  onFormatCode();
                }}
              >
                格式化
              </Button>
            </div>
          </div>

          <div>
            <MonacoEditor
              height={600}
              value={value}
              language={language}
              onChange={(val) => {
                setValue(val);
              }}
              onMount={(codeEditor, monaco) => {
                editor.current = codeEditor;
                editor.current.addCommand(
                  monaco.KeyMod.CtrlCmd |
                    monaco.KeyMod.Shift |
                    monaco.KeyCode.KeyF,
                  function () {
                    console.log("cmd+shift+F", codeEditor.getValue());
                    onFormatCode(codeEditor.getValue());
                  }
                );
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
