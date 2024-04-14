## 背景

公司运维需要记录每次修改 yaml 格式模版配置的记录，同时需要非常直观的了解两次修改记录之间的差异，需要类似于 github 代码变更差异的展示的组件。

![yaml格式模版配置差异对比](https://user-images.githubusercontent.com/8088864/223602720-65e41820-1888-442f-8532-38de512e7ea7.jpg)

## 问题

1. 文本内容差异对比实现介绍

直观的给出两个文件或者两个字符串，我们需要获得两个文件的差异信息。

2. 将差异转化为 HTML

当解决上述问题后，我们需要奖差异信息转化成 HTML 进行展示，方便直观的获得其修改差异。

## 解决方案

### 技术选择

[diff](https://www.npmjs.com/package/diff) + [diff2html](https://www.npmjs.com/package/diff2html)

### diff

`diff` 是一个基于 javascript 实现的文本内容 diff 的库。它基于已发表论文中的算法 [An O(ND) Difference Algorithm and its Variations" (Myers, 1986)](https://citeseerx.ist.psu.edu/viewdoc/summary?doi=10.1.1.4.6927).

这个库功能十分强大，不仅能够简洁地输出字符串结果，也能够输出规范化的数据结构方便二次开发。

#### 安装

```bash
npm install diff --save

# or

yarn add diff
```

#### 引用

```ts
import {
  diffChars,
  diffWords,
  diffWordsWithSpace,
  diffLines,
  diffTrimmedLines,
  diffSentences,
  diffCss,
  diffJson,
  diffArrays,
  canonicalize,
  applyPatch,
  applyPatches,
  parsePatch,
  merge,
  structuredPatch,
  createTwoFilesPatch,
  createPatch,
  convertChangesToDMP,
  convertChangesToXML,
} from "diff";
```

#### API

- **`diffChars(oldStr, newStr[, options])`** 这个方法将比较两段文字，比较的维度是基于单个字符
  返回一个由描述改变的对象组成的列表。大致如下：
  ![结果一](https://user-images.githubusercontent.com/8088864/223605269-84cf776e-f991-4002-a5ba-eb8fa28e11fc.png)

  `added`表示是否是添加内容，`removed`表示是否为删除内容。共有的内容这两个属性都没有，`value`表示内容，`count`表示字符的个数（在某些用法中表示内容的行数）
  可选的配置属性`ignoreCase`: 标记为 true 时忽略字符的大小写，默认为 false，这里给出一个测试例子：
  ![测试例子](https://user-images.githubusercontent.com/8088864/223605416-398121a4-70e5-4782-bd60-d6f4314d32be.png)

- **`diffWords(oldStr, newStr[, options])`** 该方法比较两段文字，比较的维度是单词，忽略空格，返回一个由描述改变对象组成的列表，可选的配置属性 ignoreCase: 同 diffChars 中一样，这里给出一个使用例子：
  ![image](https://user-images.githubusercontent.com/8088864/223605628-6b2531cc-e38a-4153-9ee1-5f0f9d693baa.png)

- **`diffWordsWithSpace(oldStr, newStr[, options])`** 该方法比较两段文字，比较的维度是单词，同上一个方法不同的是，它将比较空格的差异，返回一个由描述改变的对象组成的列表。这里给出一个例子：
  ![image](https://user-images.githubusercontent.com/8088864/223605729-1b864451-4b8b-462d-bd96-70308de44d3e.png)

- **`diffLines(oldStr, newStr[, options])`** 比较两段文字，比较的维度是行。可选的配置项：

  - `ignoreWhitespace`: 设置为 true 时，将忽略开头和结尾处的空格，在 diffTrimmedLines 中也有这个配置。
  - `newlineIsToken`: 设置为 true 时，将换行符看作是分隔符。这样就可以独立于行内容对换行结构进行更改，并将其视为独立的(原文:This allows for changes to the newline structure to occur independently of the line content and to be treated as such, 这一句是机翻的，感觉不大准确)。总得来说，这样使得`diffLines`的输出对人类阅读(相较于其他对计算机更为友好的输出方式)更为友好，更加方便于比较差异。返回一个由描述改变的对象组成的列表。（这里返回的 obj 列表中，`count`表示这段内容的行数，下面的方法类似），接下来展示一个例子：
    ![image](https://user-images.githubusercontent.com/8088864/223605934-3da43e6b-ed37-414c-bb6c-e07764a72b38.png)

- **`diffTrimmedLines(oldStr, newStr[, options])`** 比较两段文字，比较的维度是行，忽略开头和结尾处的空格，返回一个由描述改变的对象组成的列表。实例截图：
  ![image](https://user-images.githubusercontent.com/8088864/223606123-672b5706-55e5-4611-b3cc-439f93d14387.png)

- **`diffSentences(oldStr, newStr[, options])`** 比较两段文字，比较的维度是句子。返回一个由描述改变的对象组成的列表。实例截图：
  ![image](https://user-images.githubusercontent.com/8088864/223606217-ed47042d-1f82-41d2-bfbf-995c10bd77b3.png)

- **`diffCss(oldStr, newStr[, options])`** 比较两段内容，比较基于 css 中的相关符号和语法。返回一个由描述改变的对象组成的列表。

- **`diffJson(oldObj, newObj[, options])`** 比较两个 JSON 对象，比较基于对象内部的 key。这些 key 在 json 对象内的顺序，在比较时将不会影响结果。返回一个由描述改变的对象组成的列表。实例截图：
  ![image](https://user-images.githubusercontent.com/8088864/223606377-4b1642a5-4ce4-48db-82a2-97a9da48d682.png)

- **`diffArrays(oldArr, newArr[, options])`** 比较两个数组，每一个元素使用严格等于来判定(===)。可选参数：`comparator`: function(left, right)用来进行相等性的比较，返回一个由描述改变的对象组成的列表。

- **`createTwoFilesPatch(oldFileName, newFileName, oldStr, newStr, oldHeader, newHeader)`** 创造一个统一的 diff 补丁输出。参数：

  - `oldFileName`: 移除内容在文件名部分输出的字符串
  - `newFileName`: 增添内容在文件名部分输出的字符串
  - `oldStr`: 原始的字符串(作为基准)
  - `newStr`: 比较内容的字符串
  - `oldHeader`: 在老文件头部新增的信息
  - `newHeader`: 在新文件头部新增的信息
  - `options`: 一个描述配置的对象，目前仅支持 context,用来描述应该展示 context 的多少行

  这里展示一个例子：

  ![image](https://user-images.githubusercontent.com/8088864/223606656-b467bd67-6695-4fc0-8f5c-463be6988d32.png)

  这里可以看到，该方法返回的是已经格式化的可直接输出的字符串，方便直接展示。

- **`createPatch(fileName, oldStr, newStr, oldHeader, newHeader)`** 创造一个统一的 diff 补丁输出,该方法的使用和`createTwoFilesPatch`几乎一致，唯一的区别是`oldFileName`等于`newFileName`

- **`structuredPatch(oldFileName, newFileName, oldStr, newStr, oldHeader, newHeader, options)`** 返回一个由描述具体变化的对象构成的数组。这个方法类似于`createTwoFilesPatch`，但是返回了一个适合于开发者后续处理的数据结构。其参数跟`createTwoFilesPatch`保持一致，返回的数据类似于如下：
  ![image](https://user-images.githubusercontent.com/8088864/223607353-06c46a1c-3bc8-4cc3-b569-d72db0930957.png)

  与之对应的应用实例如下：

  ![image](https://user-images.githubusercontent.com/8088864/223607423-eb8da3a2-c7af-4868-81f3-1dd95c16a9d7.png)

- **`applyPatch(source, patch[, options])`** 使用一个统一的 diff 补丁。该方法会返回一个应用了补丁的新版本字符串。这里的补丁（patch）可能是字符串形式的 diff 或者`parsePatch`和`structuredPatch`方法返回的输出。可选的配置项有如下：

  - `fuzzFactor`: 拒绝应用补丁之前允许比较的内容的行数。默认是 0
  - `compareLine(lineNumber, line, operation, patchContent)`: 用来比较给定的行内容在应用补丁时是否应该被认定为相等。默认是使用严格相等来比较的，但是这容易与 fuzzier 比较相冲突。当内容应该被拒绝时返回 false。

- **`applyPatches(patch[, options])`** 应用一个或者多个补丁。这个方法将会迭代补丁的内容并且将其应用在回调中传入的内容上。每个补丁被使用的整体工作流程是。可选的配置项有如下：

  - `loadFile(index, callback)`: 调用者应该加载文件的内容并且将其传递给回调（callback(err, data)）。传入一个 err 将会中断未来补丁的执行
  - `patched(index, content, callback)`: 该方法在每个补丁被使用时调用。传入一个 err 将会中断未来补丁的执行

- **`parsePatch(diffStr)`** 将一个补丁解析为结构化数据。返回一个由补丁解析而来的 JSON 对象，该方法适合同`applyPatch`配合使用。该方法返回的内容同`structuredPatch`返回的内容结构上一致。

- **`convertChangesToXML(changes)`** 转换一个 changes 的列表到序列化的 XML 格式

以上的所有可以接受一个可选的回调的方法，在该参数(callback)被省略时该方法工作在同步模式，当这个参数被传入时工作在异步模式。这使得能够处理更大的范围 diff 而不会使得事件流被长期挂起。callback 要么作为最后一个参数被直接传入要么作为 options 中的一个属性被传入。

#### 原理

**`抽象`**

**`寻找 diff 的过程可以被抽象为图搜索。`**

以两个字符串，src=ABCABBA，dst=CBABAC 为例，根据这两个字符串我们可以构造下面一张图，横轴是 src 内容，纵轴是 dst 内容。

那么，图中每一条从左上角到右下角的路径，都表示一个 diff。向右表示“删除”，向下表示”新增“，对角线则表示“原内容保持不动“。

![image](https://user-images.githubusercontent.com/8088864/223632159-33dddec5-7d01-4e88-b0ee-3fe445c4146f.png)

根据图中形成的线路，我们可以选择一条路径看看它的效果。

![image](https://user-images.githubusercontent.com/8088864/223632262-c67ac1b1-8598-4070-acd7-d31e397fc11e.png)

现在，“寻找 diff” 这件事，被抽象成了“寻找图的路径”了。那么，“最短的直观的” diff 对应的路径有什么特点呢？

- 路径长度最短（对角线不算长度）

- 先向右，再向下（先删除，后新增）

**`Myers 算法`**

Myers 算法就是一个能在大部分情况产生”最短的直观的“ diff 的一个算法，算法原理如下。

首先，定义参数 d 和 k，d 代表路径的长度，k 代表当前坐标 x - y 的值。定义一个”最优坐标“的概念，最优坐标表示 d 和 k 值固定的情况下，x 值最大的坐标。x 大，表示向右走的多，表示优先删除。

还是用上面那张图为例。我们从坐标 (0, 0) 开始，此时，d=0，k=0，然后逐步增加 d，计算每个 k 值下对应的最优坐标。

因为每一步要么向右（x + 1），要么向下（y + 1），对角线不影响路径长度，所以，当 d=1 时，k 只可能有两个取值，要么是 1，要么是 -1。

当 d=1，k=1 时，最优坐标是 (1, 0)。

当 d=1，k=-1 时，最优坐标是 (0, 1)。

因为 d=1 时，k 要么是 1，要么是 -1，当 d=2 时，表示在 d=1 的基础上再走一步，k 只有三个可能的取值，分别是 -2，0，2。

当 d=2，k=-2 时，最优坐标是 (2, 4)。

当 d=2，k=0 时，最优坐标是 (2, 2)。

当 d=2，k=2 时，最优坐标是 (3, 1)。

以此类推，直到我们找到一个 d 和 k 值，达到最终的目标坐标 (7, 6)。

下图横轴代表 d，纵轴代表 k，中间是最优坐标，从这张图可以清晰的看出，当 d=5，k=1 时，我们到达了目标坐标 (7, 6)，因此，”最短的直观的“路径就是 (0, 0) -> (1, 0) -> (3, 1) -> (5, 4) -> (7, 5) -> (7, 6)。

![image](https://user-images.githubusercontent.com/8088864/223632436-447c74fa-63a6-4f12-af41-cf11f32cb718.png)

Myers 算法是一个典型的”动态规划“算法，也就是说，父问题的求解归结为子问题的求解。要知道 d=5 时所有 k 对应的最优坐标，必须先要知道 d=4 时所有 k 对应的最优坐标，要知道 d=4 时的答案，必须先求解 d=3，以此类推。

**`Myers 算法基本流程`**

1. 迭代 d，d 的取值范围为 0 到 n+m，其中 n 和 m 分别代表源文本和目标文本的长度（这里我们选择以行为单位）

2. 每个 d 内部，迭代 k，k 的取值范围为 -d 到 d，以 2 为步长，也就是 -d，-d + 2，-d + 2 + 2…

3. 使用一个字典 v，以 k 值为索引，存储最优坐标的 x 值

4. 将每个 d 对应的 v 字典存储起来，后面回溯的时候需要用

5. 当我们找到一个 d 和 k，到达目标坐标 (n, m) 时就跳出循环

6. 使用上面存储的 v 字典（每个 d 对应一个这样的字典），从终点反向得出路径

### diff2html

将差异转化为 html。

#### 安装

```bash
npm install diff2html --save

yarn add diff2html
```

#### 引用

```ts
import { html, parse } from "diff2html";
import {
  Diff2HtmlUI,
  Diff2HtmlUIConfig,
} from "diff2html/lib/ui/js/diff2html-ui";
```

#### 使用

diff2html 提供了 2 种方式展示 diff 效果：

1. parse+html

问题：highlight 语法高亮不生效。

2. diff2html-ui:

> 支持 json、代码高亮。

> 支持文件目录概要显示/隐藏。

> 支持收起已查看文件（side-by-side 模式下，viewed 功能失效）。

diff2html 格式化类型：side-by-side、line-by-line。

**`组件`**

```ts
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

import "highlight.js/styles/googlecode.css";
import "diff2html/bundles/css/diff2html.min.css";

import { Radio } from "antd";
import { createPatch } from "diff";
import { html, parse } from "diff2html";
import {
  Diff2HtmlUI,
  Diff2HtmlUIConfig,
} from "diff2html/lib/ui/js/diff2html-ui";
import yaml from "js-yaml";
import React, { useEffect, useState } from "react";

export interface IDiffCodeProps extends Partial<Diff2HtmlUIConfig> {
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

const DiffCode = ({
  diffDataList,
  isUseUi,
  id,
  title,
  icon,
  headerExtraRender,
  ...config
}: IDiffCodeProps) => {
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
      // eslint-disable-next-line unicorn/prefer-query-selector
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
};

export default DiffCode;
```

效果如下:

![image](https://user-images.githubusercontent.com/8088864/223684264-394600a8-0c9b-46d3-8bb4-8e03c7aa113f.png)

## 参考

- [diff.js 使用指南](https://www.jianshu.com/p/6b8db8b979b3)
- [如何实现 git-diff 效果](https://blog.csdn.net/yeyeye0525/article/details/119897627)
- [文本对比，文本差异并排对比显示实现](https://blog.csdn.net/qq_33697094/article/details/121767084)
