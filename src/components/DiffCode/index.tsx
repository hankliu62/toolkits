// diffDataList 对比文件列表数据 [ {...diffDataItem} ]
// diffDataItem :
// {
//   prevData: any(string、json), // 旧数据
//   newData: any(string、json),  // 新数据
//   isYaml?: boolean,            // 是否yaml文件
//   isJson?: boolean,            // 是否json
//   fileName?: string,           // 文件名
//   oldHeader?: string,          // 重命名，旧文件名
//   newHeader?: string           // 重命名，新文件名
// },
// outputFormat diff格式，line-by-line || side-by-side
// isUseUi 是否使用Diff2HtmlUI
// id Diff2HtmlUI 挂载html的id，多实例的情况下，各个实例需要唯一id，防止页面冲突
// fileListToggle Diff2HtmlUI 文件目录概要是否要隐藏，true显示，false隐藏

import { Radio } from "antd";
import { createPatch } from "diff";
import { html, parse } from "diff2html";
import {
  Diff2HtmlUI,
  Diff2HtmlUIConfig,
} from "diff2html/lib/ui/js/diff2html-ui";
import yaml from "js-yaml";
import React, { useEffect, useState } from "react";

interface IDiffCodeProps extends Partial<Diff2HtmlUIConfig> {
  isUseUi?: boolean; // 是否使用Diff2HtmlUI
  id?: string; // Diff2HtmlUI 挂载html的id，多实例的情况下，各个实例需要唯一id，防止页面冲突
  diffDataList: {
    prevData: string; // 旧数据
    newData: string; // 新数据
    isYaml?: boolean; // 是否yaml文件
    isJson?: boolean; // 是否json
    fileName?: string; // 文件名
    oldHeader?: string; // 重命名，旧文件名
    newHeader?: string; // 重命名，新文件名
  }[];
  title: string;
  icon?: React.ReactNode;
  headerExtraRender?: () => React.ReactNode;
}

function DiffCode({
  diffDataList,
  isUseUi,
  id,
  title,
  icon,
  headerExtraRender,
  ...config
}: IDiffCodeProps) {
  const [diffData, setDiffData] = useState("");

  const [outputFormat, setOutputFormat] = useState<
    Diff2HtmlUIConfig["outputFormat"]
  >(config.outputFormat || "line-by-line");

  useEffect(() => {
    const diffJsonList = [];
    for (const item of diffDataList) {
      const {
        fileName,
        oldHeader,
        newHeader,
        prevData,
        newData,
        isJson,
        isYaml,
      } = item;
      let oldString = prevData || "";
      let newString = newData || "";
      // 特定需求处理
      if (isYaml) {
        // 将json转化为yaml格式
        oldString = yaml.dump(prevData);
        newString = yaml.dump(newData);
      } else if (isJson) {
        // 格式化json
        oldString = JSON.stringify(prevData, null, 2);
        newString = JSON.stringify(newData, null, 2);
      }
      const args = [
        fileName || "",
        oldString,
        newString,
        oldHeader || "",
        newHeader || "",
        { context: 99_999 },
      ];
      // 对比差异
      const diffStr = createPatch(...args);
      // 差异json化
      const diffJson = parse(diffStr);

      diffJsonList.push(diffJson[0]);
    }
    if (isUseUi) {
      // 使用diff2html-ui

      const targetElement = document.getElementById(id);
      const configuration: Diff2HtmlUIConfig = {
        ...config,
        drawFileList: true,
        matching: "lines",
        highlight: true,
        outputFormat,
      };
      const diff2htmlUi = new Diff2HtmlUI(
        targetElement,
        diffJsonList,
        configuration
      );
      diff2htmlUi.draw(); //绘制页面
      diff2htmlUi.highlightCode(); // 高亮数据
      diff2htmlUi.fileListToggle(!!configuration.fileListToggle); // 是否折叠概要
    } else {
      // 使用html方法
      const diffHtml = html(diffJsonList, {
        ...config,
        drawFileList: false,
        matching: "lines",
        outputFormat,
      });
      setDiffData(diffHtml);
    }
  }, [diffDataList, id, isUseUi, config, outputFormat]);

  return (
    <div>
      <div className="flex items-center justify-between rounded-tl-[4px] rounded-tr-[4px] border border-[#d8d8d8] bg-[#eff4f9] p-3">
        <div className="flex items-center">
          <div className="mr-2 last:mr-0 empty:hidden">{icon}</div>
          <div className="mr-2 text-sm last:mr-0 empty:hidden">{title}</div>
          <div className="mr-2 text-sm last:mr-0">
            <Radio.Group
              value={outputFormat}
              onChange={(e) => setOutputFormat(e.target.value)}
            >
              <Radio.Button value="line-by-line">Inline</Radio.Button>
              <Radio.Button value="side-by-side">Side-by-side</Radio.Button>
            </Radio.Group>
          </div>
        </div>
        <div className="empty:hidden">
          {headerExtraRender && headerExtraRender()}
        </div>
      </div>
      {isUseUi ? (
        <div id={id || "code-diff-ui"} />
      ) : (
        <div id="code-diff" dangerouslySetInnerHTML={{ __html: diffData }} />
      )}
    </div>
  );
}

export default DiffCode;
