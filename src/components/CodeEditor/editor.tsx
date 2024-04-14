import classNames from "classnames";
import type { editor as MonacoEditor } from "monaco-editor";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import { CommandsRegistry } from "monaco-editor/esm/vs/platform/commands/common/commands";
import React, {
  forwardRef,
  ForwardRefRenderFunction,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";

import { TEditorLanguage } from "@/types/editor";
import { getTheme, onDidChangeTheme } from "@/utils/themes";

import { registerDocumentFormattingEditProviders } from "./format";

function setupKeybindings(editor) {
  const formatCommandId = "editor.action.formatDocument";
  const { handler, when } = CommandsRegistry.getCommand(formatCommandId);
  // 监听保存，进行代码格式化
  editor._standaloneKeybindingService.addDynamicKeybinding(
    formatCommandId,
    monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS,
    handler,
    when
  );
}

export type Monaco = typeof monaco;

export interface ICodeEditorImperativeHandles {
  getEditor: () => monaco.editor.IStandaloneCodeEditor | null;
  monaco: Monaco;
}

interface ICodeEditorProps {
  value?: string;
  defaultValue?: string; // 初始值
  className?: string;
  language: TEditorLanguage;
  options?: monaco.editor.IStandaloneEditorConstructionOptions;
  onChange?: (value: string) => void;
  onMount?: (
    editor: monaco.editor.IStandaloneCodeEditor,
    monaco: Monaco
  ) => void;
}

/**
 * Code编辑器
 *
 * @param props
 * @returns
 */
const SqlEditor: ForwardRefRenderFunction<
  ICodeEditorImperativeHandles,
  ICodeEditorProps
> = (
  {
    value = "",
    defaultValue = "",
    className,
    language = "html",
    options = {},
    onChange = () => {},
    onMount = (
      editor: monaco.editor.IStandaloneCodeEditor,
      monaco: Monaco
    ) => {},
  }: ICodeEditorProps,
  ref
) => {
  const editorContainer = useRef<HTMLDivElement | null>(null);
  const editor = useRef<MonacoEditor.IStandaloneCodeEditor | null>(null);

  function getEditor(): MonacoEditor.IStandaloneCodeEditor | null {
    return editor.current;
  }

  /**
   * 导出方法
   */
  useImperativeHandle(
    ref,
    () => ({
      getEditor,
      monaco,
    }),
    []
  );

  useEffect(() => {
    if (editorContainer.current && language) {
      editor.current = monaco.editor.create(editorContainer.current!, {
        readOnly: false, // 是否可编辑 // 是否为只读模式
        language: language, // 语言类型
        acceptSuggestionOnCommitCharacter: true, // 接受关于提交字符的建议
        acceptSuggestionOnEnter: "on", // 接受输入建议 "on" | "off" | "smart" //-如果设置off 编辑器上的代码补全显示了,但却不补上
        accessibilityPageSize: 10, // 辅助功能页面大小 Number 说明：控制编辑器中可由屏幕阅读器读出的行数。警告：这对大于默认值的数字具有性能含义。
        accessibilitySupport: "off", // 辅助功能支持 控制编辑器是否应在为屏幕阅读器优化的模式下运行。
        autoClosingBrackets: "always", // 是否自动添加结束括号(包括中括号) "always" | "languageDefined" | "beforeWhitespace" | "never"
        autoClosingDelete: "always", // 是否自动删除结束括号(包括中括号) "always" | "never" | "auto"
        autoClosingOvertype: "always", // 是否关闭改写 即使用insert模式时是覆盖后面的文字还是不覆盖后面的文字 "always" | "never" | "auto"
        autoClosingQuotes: "always", // 是否自动添加结束的单引号 双引号 "always" | "languageDefined" | "beforeWhitespace" | "never"
        autoIndent: "none", // 控制编辑器在用户键入、粘贴、移动或缩进行时是否应自动调整缩进
        automaticLayout: true, // 自动布局
        foldingStrategy: "indentation", // 折叠方式  auto | indentation
        codeLens: false, // 是否显示codeLens 通过 CodeLens，你可以在专注于工作的同时了解代码所发生的情况 – 而无需离开编辑器。 可以查找代码引用、代码更改、关联的 Bug、工作项、代码评审和单元测试。
        codeLensFontFamily: "", // codeLens的字体样式
        codeLensFontSize: 14, // codeLens的字体大小
        colorDecorators: false, // 呈现内联色彩装饰器和颜色选择器
        comments: {
          ignoreEmptyLines: true, // 插入行注释时忽略空行。默认为真。
          insertSpace: true, // 在行注释标记之后和块注释标记内插入一个空格。默认为真。
        }, // 注释配置
        contextmenu: true, // 启用上下文菜单
        columnSelection: false, // 启用列编辑 按下shift键位然后按↑↓键位可以实现列选择 然后实现列编辑
        autoSurround: "never", // 是否应自动环绕选择
        copyWithSyntaxHighlighting: true, // 是否应将语法突出显示复制到剪贴板中 即 当你复制到word中是否保持文字高亮颜色
        cursorBlinking: "blink", // 光标动画样式
        cursorSmoothCaretAnimation: "off", // 是否启用光标平滑插入动画  当你在快速输入文字的时候 光标是直接平滑的移动还是直接"闪现"到当前文字所处位置
        cursorStyle: "line", // "Block"|"BlockOutline"|"Line"|"LineThin"|"Underline"|"UnderlineThin" 光标样式
        cursorSurroundingLines: 0, // 光标环绕行数 当文字输入超过屏幕时 可以看见右侧滚动条中光标所处位置是在滚动条中间还是顶部还是底部 即光标环绕行数 环绕行数越大 光标在滚动条中位置越居中
        cursorSurroundingLinesStyle: "all", // "default" | "all" 光标环绕样式
        cursorWidth: 2, // <=25 光标宽度
        minimap: {
          enabled: false, // 是否启用预览图
        }, // 预览图设置
        folding: true, // 是否启用代码折叠
        links: true, // 是否点击链接
        overviewRulerBorder: false, // 是否应围绕概览标尺绘制边框
        renderLineHighlight: "line", // 当前行突出显示方式 'none' | 'gutter' | 'line' | 'all';
        roundedSelection: false, // 选区是否有圆角
        scrollBeyondLastLine: false, // 设置编辑器是否可以滚动到最后一行之后
        theme: getTheme() === "light" ? "vs-dark" : "vs-light",
        tabSize: 2, // tab的空格个数
        renderWhitespace: "all", // 始终显示空格
        ...options, // 自定义选项
      });

      // 监听文件内容修改
      editor.current.onDidChangeModelContent(() => {
        onChange(editor.current.getValue());
      });

      setupKeybindings(editor.current);

      onMount(editor.current, monaco);
    }

    // 注册代码格式化提供者
    const { dispose } = registerDocumentFormattingEditProviders();

    return () => {
      if (editor.current) editor.current!.dispose();

      dispose();
    };
  }, []);

  useEffect(() => {
    if (editor.current) {
      const model = editor.current.getModel();
      monaco.editor.setModelLanguage(model, language);
    }
  }, [language]);

  useEffect(() => {
    if (editor?.current) {
      const val = editor.current?.getValue();

      if (defaultValue && val !== defaultValue) {
        editor.current.setValue(defaultValue);
      }
    }
  }, [defaultValue]);

  useEffect(() => {
    if (editor?.current) {
      const val = editor.current?.getValue();

      if (val !== value) {
        editor.current.setValue(value);
      }
    }
  }, [value]);

  useEffect(() => {
    function handleThemeChange(theme) {
      monaco.editor.setTheme(
        options?.theme || theme === "light" ? "vs-dark" : "vs-light"
      );
    }
    const dispose = onDidChangeTheme(handleThemeChange);
    return () => dispose();
  }, [options]);

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      window.setTimeout(() => editor.current!.layout(), 0);
    });
    observer.observe(editorContainer.current!);
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={editorContainer}
      className={classNames("relative min-h-[600px] flex-auto", {
        [className]: className,
      })}
    />
  );
};

export default forwardRef(SqlEditor);
