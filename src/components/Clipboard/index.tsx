import { message } from "antd";
import copy from "copy-to-clipboard";
import React from "react";

export interface ClipboardProps {
  tag: string;
  text: string | (() => string);
  onSuccess: (text: string, success: boolean) => void;
  children: React.ReactElement;
  options?: {
    debug?: boolean;
    message?: string;
    format?: string; // MIME type
  };
}

class Clipboard extends React.Component<ClipboardProps, any> {
  static defaultProps = {
    tag: "span",
    text: "",
    onSuccess() {
      message.success("已将内容复制到剪贴板");
    },
    options: {},
  };

  clipboard: any;

  onClick = (event: any) => {
    const { children, text, onSuccess, options } = this.props;
    const elem = React.Children.only(children);
    const copyText = typeof text === "function" ? text() : text;
    const result = copy(copyText, options);

    if (onSuccess) {
      onSuccess(copyText, result);
    }

    if (elem?.props && typeof elem.props.onClick === "function") {
      elem.props.onClick(event);
    }
  };

  render() {
    const { children, tag } = this.props;

    return React.createElement(tag, { onClick: this.onClick }, children);
  }
}

export default Object.assign(Clipboard, {
  copy,
});
