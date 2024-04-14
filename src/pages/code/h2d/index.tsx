import { CopyOutlined, FileTextOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, message, Select } from "antd";
import h2m from "h2m";
import htmlToMd from "html-to-md";
import html2markdown from "html2markdown";
import { useCallback, useEffect, useState } from "react";
import SplitPane from "react-split-pane";
import Turndown from "turndown";
import * as turndownGFM from "turndown-plugin-gfm";

import Clipboard from "@/components/Clipboard";
import { CodeEditor } from "@/components/CodeEditor";
import { LanguageDemo } from "@/constants/editor";
import Link from "next/link";
import { getRoutePrefix } from "@/utils/route";

// 转化方式
enum EConvertWay {
  H2M = "H2M",
  Turndown = "Turndown",
  HTML2markdown = "HTML2markdown",
  HTMLToMd = "html-to-md",
}

/**
 * 将HTML转化成Markdown的在线工具网站
 *
 * @returns
 */
export default function HTML2Markdown() {
  const [html, setHtml] = useState<string>();

  const [markdown, setMarkdown] = useState<string>();

  // 转换方式
  const [convertWay, setConvertWay] = useState<EConvertWay>(EConvertWay.H2M);

  useEffect(() => {
    // 获得HTML转化成Markdown字符串
    const md = getMarkdownByWay(convertWay, html);
    setMarkdown(md);
  }, [html, convertWay]);

  function getMarkdownByWay(way: EConvertWay, currentHtml: string): string {
    if (!currentHtml) {
      return "";
    }

    try {
      switch (way) {
        case EConvertWay.H2M: {
          // https://www.npmjs.com/package/h2m
          return h2m(currentHtml, { converter: "MarkdownExtra" });
        }
        case EConvertWay.Turndown: {
          const turndown = new Turndown({
            bulletListMarker: "-",
            codeBlockStyle: "fenced",
            headingStyle: "atx",
          });
          turndown.use(turndownGFM.gfm);
          // https://www.npmjs.com/package/turndown
          return turndown.turndown(currentHtml);
        }
        case EConvertWay.HTML2markdown: {
          // https://www.npmjs.com/package/html2markdown
          return html2markdown(currentHtml);
        }
        case EConvertWay.HTMLToMd: {
          // https://www.npmjs.com/package/html-to-md?activeTab=readme
          return htmlToMd(currentHtml, {}, false);
        }
        default: {
          return "";
        }
      }
    } catch (error) {
      console.error(error);
      message.error(error.message);
    }
  }

  /**
   * 修改HTML转化成Markdown的方式
   */
  const onChangeConvertWay = useCallback((way: EConvertWay) => {
    setConvertWay(way);
  }, []);

  return (
    <div className="relative flex min-h-[100vh] flex-1 flex-col bg-white">
      <Breadcrumb
        className="!m-6"
        items={[
          {
            title: <Link href={getRoutePrefix() + "/"}>小工具集合</Link>,
          },
          {
            title: "HTML2Markdown",
          },
        ]}
      />
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <SplitPane className="flex-1" split="vertical" minSize={50} maxSize={75}>
        <div className="overflow-y-auto">
          <div className="flex justify-between border-b border-black/20 px-6 py-4">
            <h2 className="text-lg font-medium leading-[32px]">HTML</h2>

            <div className="flex items-center space-x-5">
              <Button
                className="!inline-flex items-center"
                icon={<FileTextOutlined rev={undefined} />}
                onClick={() => {
                  setHtml(LanguageDemo.html);
                }}
              >
                案例
              </Button>
              <Clipboard
                text={html}
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
          <CodeEditor
            value={html}
            language="html"
            onChange={(val) => {
              setHtml(val);
            }}
            options={{ theme: "vs-light" }}
          />
        </div>
        <div className="overflow-y-auto">
          <div className="flex justify-between border-b border-black/20 px-6 py-4">
            <h2 className="text-lg font-medium leading-[32px]">Markdown</h2>

            <div className="flex items-center space-x-5">
              <Select
                className="w-32"
                placeholder="请选择转化方式"
                options={[
                  EConvertWay.H2M,
                  EConvertWay.Turndown,
                  EConvertWay.HTML2markdown,
                  EConvertWay.HTMLToMd,
                ].map((item) => ({
                  label: item,
                  value: item,
                }))}
                value={convertWay}
                onChange={onChangeConvertWay}
              />
              <Clipboard
                text={markdown}
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
          <CodeEditor
            value={markdown}
            language="markdown"
            onChange={(val) => {
              setMarkdown(val);
            }}
            options={{ theme: "vs-light", readOnly: true }}
          />
        </div>
      </SplitPane>
    </div>
  );
}
