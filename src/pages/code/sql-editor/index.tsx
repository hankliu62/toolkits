import { CopyOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, message } from 'antd';
import type { editor as MonacoEditor } from 'monaco-editor';
import Link from 'next/link';
import { useCallback, useRef, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { format as formatSQL } from 'sql-formatter';

import Clipboard from '@/components/Clipboard';
import { SqlEditor } from '@/components/SqlEditor';

/**
 * SQL在线编辑器页面
 *
 * @returns
 */
export default function SqlEditorPage() {
  const [value, setValue] = useState<string>();
  const editor = useRef<MonacoEditor.IStandaloneCodeEditor>();

  /**
   * 格式化SQL
   */
  const onFormatSQL = useCallback(
    (val?: string) => {
      val ? setValue(formatSQL(val)) : value && setValue(formatSQL(value));
    },
    [value],
  );

  // 快捷键格式化SQL
  useHotkeys(
    'cmd+shift+o',
    () => {
      onFormatSQL();
    },
    [onFormatSQL],
  );

  return (
    <div className="bg-white pb-6">
      <Breadcrumb
        className="!m-6"
        items={[
          {
            title: <Link href="/">小工具集合</Link>,
          },
          {
            title: 'SQL 编辑器',
          },
        ]}
      />
      <div className="flex flex-col space-y-6 px-6">
        <div>
          <div className="flex justify-between pb-4">
            <h2 className="text-lg font-medium leading-[32px]">SQL</h2>

            <div className="flex items-center space-x-5">
              <Button
                className="!inline-flex items-center"
                icon={<ThunderboltOutlined rev={undefined} />}
                onClick={() => {
                  onFormatSQL();
                }}
              >
                格式化
              </Button>

              <Clipboard
                text={value}
                onSuccess={() => {
                  message.success('复制成功');
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
          <div className="mt-2">
            <SqlEditor
              value={value}
              onChange={(val) => {
                setValue(val);
              }}
              onMount={(sqlEditor, monaco) => {
                editor.current = sqlEditor;
                editor.current.addCommand(
                  monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KeyF,
                  function () {
                    console.log('cmd+shift+F', sqlEditor.getValue());
                    onFormatSQL(sqlEditor.getValue());
                  },
                );
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
