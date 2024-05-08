import { defaultKeymap } from "@codemirror/commands";
import { javascript } from "@codemirror/lang-javascript";
import { json } from "@codemirror/lang-json";
import { EditorState } from "@codemirror/state";
import { EditorView, keymap } from "@codemirror/view";
import { basicSetup } from "codemirror";
import * as React from "react";

interface ICodeMirror {
  language?: any;
  value?: string;
  onChange: (content: string) => void;
}

/**
 * 代码编辑器
 * @constructor
 */
function CodeMirror(props: ICodeMirror) {
  // 编辑器挂载点
  const editorRef = React.useRef(null);

  React.useEffect(() => {
    if (!editorRef || !editorRef.current) {
      return;
    }
    // 初始状态
    const startState = EditorState.create({
      doc:
        props.language === "json"
          ? JSON.stringify(props.value, null, 2)
          : props.value,
      extensions: [
        basicSetup,
        keymap.of(defaultKeymap),
        props.language === "json" ? json() : javascript(),
        EditorView.updateListener.of((v) => {
          if (v.docChanged) {
            props.onChange(v.state.toJSON().doc);
          }
        }),
      ],
    });
    const view = new EditorView({
      state: startState,
      parent: editorRef.current,
    });
    return () => view.destroy();
  }, [editorRef]);

  const render = () => {
    return <div ref={editorRef} />;
  };

  return render();
}

export default CodeMirror;
