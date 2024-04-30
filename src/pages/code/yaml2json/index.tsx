import { CopyOutlined, FileTextOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, message } from "antd";
import YAML from "js-yaml";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import SplitPane from "react-split-pane";

import Clipboard from "@/components/Clipboard";
import MonacoEditor, { LanguageDemo } from "@hankliu/rc-monaco-editor";
import { getRoutePrefix } from "@/utils/route";

/**
 * 将yaml转化成json的在线工具网站
 *
 * @returns
 */
export default function Yaml2JsonPage() {
  const [sourceLanguage, setSourceLanguage] = useState<"yaml" | "json">("yaml");

  // yaml数据
  const [yaml, setYaml] = useState<string>();

  // json数据
  const [json, setJson] = useState<string>();

  useEffect(() => {
    if (sourceLanguage === "yaml") {
      const convertedJson = convertYamlToJson(yaml);
      convertedJson && setJson(convertedJson);
    }
  }, [yaml, sourceLanguage]);

  useEffect(() => {
    if (sourceLanguage === "json") {
      const convertedYaml = convertJsonToYaml(json);
      convertedYaml && setYaml(convertedYaml);
    }
  }, [json, sourceLanguage]);

  /**
   * 转换 Yaml 格式成 JSON 格式
   *
   * @param currentYaml
   * @returns
   */
  function convertYamlToJson(currentYaml: string): string {
    if (!currentYaml) {
      return "";
    }

    try {
      const current = YAML.load(currentYaml);
      if (current) {
        return JSON.stringify(current, null, "  ");
      }

      message.error("转换失败");
    } catch (error) {
      console.error(error);
      message.error(error.message);
    }
  }

  /**
   * 转换 JSON 格式成 Yaml 格式
   *
   * @param currentYaml
   * @returns
   */
  function convertJsonToYaml(currentJson: string): string {
    if (!currentJson) {
      return "";
    }

    let currentData;
    try {
      currentData = JSON.parse(currentJson);
    } catch {}

    try {
      if (currentData) {
        const current = YAML.dump(currentData);
        if (current) {
          return current;
        }
        message.error("转换失败");
      }
    } catch (error) {
      console.error(error);
      message.error(error.message);
    }
  }

  /**
   * 转换源
   */
  const onChangeSource = useCallback(() => {
    setJson(undefined);
    setYaml(undefined);
    if (sourceLanguage === "yaml") {
      setSourceLanguage("json");
    } else {
      setSourceLanguage("yaml");
    }
  }, [sourceLanguage]);

  /**
   * 设置案例
   */
  const onSetExample = useCallback(() => {
    if (sourceLanguage === "yaml") {
      setYaml(LanguageDemo.yaml);
    } else {
      setJson(LanguageDemo.json);
    }
  }, [sourceLanguage]);

  /**
   * 修改源的内容
   */
  const onChangeSourceEditor = useCallback(
    (val) => {
      if (sourceLanguage === "yaml") {
        setYaml(val);
      } else {
        setJson(val);
      }
    },
    [sourceLanguage]
  );

  /**
   * 修改目标的内容
   */
  const onChangeTargetEditor = useCallback(
    (val) => {
      console.log(
        `target ${{ json: "yaml", yaml: "json" }[sourceLanguage]} changed.`,
        val
      );
    },
    [sourceLanguage]
  );

  const renderYamlEditor = () => {
    return (
      <MonacoEditor
        value={yaml}
        language="yaml"
        onChange={
          sourceLanguage === "yaml"
            ? onChangeSourceEditor
            : onChangeTargetEditor
        }
        options={{ theme: "vs-dark", readOnly: sourceLanguage !== "yaml" }}
      />
    );
  };

  const renderJsonEditor = () => {
    return (
      <MonacoEditor
        value={json}
        language="json"
        onChange={
          sourceLanguage === "yaml"
            ? onChangeTargetEditor
            : onChangeSourceEditor
        }
        options={{ theme: "vs-dark", readOnly: sourceLanguage === "yaml" }}
      />
    );
  };

  return (
    <div className="relative flex min-h-[100vh] flex-1 flex-col bg-white">
      <Breadcrumb
        className="!m-6"
        items={[
          {
            title: <Link href={getRoutePrefix() + "/"}>小工具集合</Link>,
          },
          {
            title: "Yaml2Json",
          },
        ]}
      />

      {}
      {/* @ts-ignore */}
      <SplitPane className="flex-1" split="vertical" minSize={50} maxSize={75}>
        <div className="overflow-y-auto">
          <div className="flex justify-between border-b border-black/20 px-6 py-4">
            <h2 className="text-lg font-medium leading-[32px]">
              {sourceLanguage.toUpperCase()}
            </h2>

            <div className="flex items-center space-x-5">
              <Button
                className="!inline-flex items-center"
                icon={<FileTextOutlined rev={undefined} />}
                onClick={onSetExample}
              >
                案例
              </Button>

              <Clipboard
                text={sourceLanguage === "yaml" ? yaml : json}
                onSuccess={() => {
                  message.success("复制成功");
                }}
              >
                <Button
                  className="!inline-flex items-center"
                  icon={<CopyOutlined rev={undefined} />}
                >
                  拷贝
                </Button>
              </Clipboard>
            </div>
          </div>
          {sourceLanguage === "yaml" ? renderYamlEditor() : renderJsonEditor()}
        </div>
        <div className="overflow-y-auto">
          <div className="flex justify-between border-b border-black/20 px-6 py-4">
            <h2 className="text-lg font-medium leading-[32px]">
              {{ json: "yaml", yaml: "json" }[sourceLanguage].toUpperCase()}
            </h2>

            <div className="flex items-center space-x-5">
              <Button
                className="!inline-flex items-center"
                icon={
                  <span className="anticon anticon-file-text">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-[14px] w-[14px]"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
                      />
                    </svg>
                  </span>
                }
                onClick={onChangeSource}
              >
                交换
              </Button>

              <Clipboard
                text={sourceLanguage === "yaml" ? json : yaml}
                onSuccess={() => {
                  message.success("复制成功");
                }}
              >
                <Button
                  className="!inline-flex items-center"
                  icon={<CopyOutlined rev={undefined} />}
                >
                  拷贝
                </Button>
              </Clipboard>
            </div>
          </div>
          {sourceLanguage === "yaml" ? renderJsonEditor() : renderYamlEditor()}
        </div>
      </SplitPane>
    </div>
  );
}
