import {
  CopyOutlined,
  DeleteOutlined,
  FileAddOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Alert, Breadcrumb, Button, Image, Input, message, Upload } from "antd";
import Link from "next/link";
import QRCode from "qrcode";
import QrCodeParser from "qrcode-parser";
import { useCallback, useState } from "react";
import SplitPane from "react-split-pane";
import { v4 as uuidv4 } from "uuid";

import Clipboard from "@/components/Clipboard";
import MonacoEditor from "@/components/CodeEditor";
import { getRoutePrefix } from "@/utils/route";

const { Dragger } = Upload;

/**
 * 在线二维码生成和解析工具
 *
 * @returns
 */
export default function QRCodePage() {
  const [content, setContent] = useState<string>();

  const [qrCodes, setQrCodes] =
    useState<{ uuid: string; content: string; image: string }[]>();

  // 解析的二维码内容
  const [parsedContent, setParsedContent] = useState<string>();
  // 解析的二维码路径
  const [parsedQrCode, setParsedQrCode] = useState<string>();
  // 解析二维码时错误信息
  const [parsedError, setParsedError] = useState<string>();

  function resetParsedState() {
    setParsedError(undefined);
    setParsedContent(undefined);
    setParsedQrCode(undefined);
  }

  /**
   * 粘贴图片
   */
  const onParseClipboardImage = useCallback(async () => {
    resetParsedState();

    try {
      const clipboardItems = await navigator.clipboard.read();

      for (const clipboardItem of clipboardItems) {
        if (!clipboardItem.types.includes("image/png")) {
          throw new Error("Clipboard contains non-image data.");
        }

        const blob = await clipboardItem.getType("image/png");
        const url = URL.createObjectURL(blob);
        const qrCodeContent = await QrCodeParser(url);

        setParsedContent(qrCodeContent);
        setParsedQrCode(url);
      }
    } catch (error) {
      setParsedError(error.message);
      message.error(error.message);
    }
  }, []);

  /**
   * 监听上传文件修改事件
   */
  const onUploadChange = useCallback(async (info) => {
    resetParsedState();

    const { status, originFileObj } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      const file = originFileObj;

      try {
        const qrCodeContent = await QrCodeParser(file);
        setParsedContent(qrCodeContent);

        const reader = new FileReader();
        reader.onloadend = () => {
          setParsedQrCode(reader.result.toString());

          message.success(`${info.file.name} 文件上传成功。`);
        };

        reader.onerror = (error) => {
          setParsedError(error?.target?.error?.message);
          console.error(error);
        };
        reader.readAsDataURL(file);
      } catch (error) {
        setParsedError(error.message);
        console.error(error);
      }
    } else if (status === "error") {
      message.error(`${info.file.name} 文件上传失败。`);
    }
  }, []);

  /**
   * 生成QrCode
   */
  const onCreateQrCode = useCallback(async () => {
    try {
      const image = await QRCode.toDataURL(content, {
        width: 300,
      });

      setQrCodes((prev) => [
        ...(prev || []),
        { uuid: uuidv4(), content, image },
      ]);
    } catch (error) {
      message.error(error.message);
    }
  }, [content]);

  /**
   * 删除QrCode
   */
  const onDeleteQrCode = useCallback((index: number) => {
    setQrCodes((prev) =>
      (prev || []).filter((item, innerIndex) => index !== innerIndex)
    );
  }, []);

  return (
    <div className="relative flex min-h-[100vh] flex-1 flex-col bg-white">
      <Breadcrumb
        className="!m-6"
        items={[
          {
            title: <Link href="/">小工具集合</Link>,
          },
          {
            title: "QRCode",
          },
        ]}
      />

      {}
      {/* @ts-ignore */}
      <SplitPane className="flex-1" split="vertical" minSize={50} maxSize={75}>
        <div className="overflow-y-auto">
          <div className="flex justify-between border-b border-black/20 px-6 py-4">
            <h2 className="text-lg font-medium leading-[32px]">生成二维码</h2>

            <div className="flex items-center space-x-5">
              <Button
                className="!inline-flex items-center"
                icon={<FileAddOutlined rev={undefined} />}
                onClick={onCreateQrCode}
              >
                生成
              </Button>
            </div>
          </div>
          <MonacoEditor
            className="h-60 min-h-0"
            value={content}
            language={"plaintext" as any}
            onChange={(val) => {
              setContent(val);
            }}
            options={{ theme: "vs-dark" }}
          />

          <div className="m-5 space-y-5">
            {qrCodes?.map(({ uuid, content, image }, index) => (
              <div
                key={uuid}
                className="flex items-start justify-between gap-2"
              >
                <div className="flex flex-1 items-stretch gap-2">
                  <Image
                    className="rounded border border-common-border"
                    width={156}
                    height={156}
                    src={image}
                    alt={content}
                  />
                  <div className="flex flex-1">
                    <Input.TextArea
                      className="h-full w-full flex-1 !bg-black/5"
                      value={content}
                      autoSize={false}
                      readOnly
                    />
                  </div>
                </div>
                <div
                  className="group p-2 text-[0px]"
                  onClick={() => onDeleteQrCode(index)}
                  aria-hidden="true"
                >
                  <DeleteOutlined
                    className="cursor-pointer text-base group-hover:text-red-600"
                    rev={undefined}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="overflow-y-auto">
          <div className="flex justify-between border-b border-black/20 px-6 py-4">
            <h2 className="text-lg font-medium leading-[32px]">解析二维码</h2>

            <div className="flex items-center space-x-5">
              <Button
                className="!inline-flex items-center"
                icon={<FileAddOutlined rev={undefined} />}
                onClick={onParseClipboardImage}
              >
                粘贴图片
              </Button>
            </div>
          </div>

          <div className="m-5 space-y-5">
            <Dragger
              accept="image/*"
              className="block"
              name="file"
              multiple={false}
              onChange={onUploadChange}
              onDrop={(e) => {
                console.log("Dropped files", e.dataTransfer.files);
              }}
              showUploadList={false}
            >
              <p className="ant-upload-drag-icon">
                <UploadOutlined rev={undefined} />
              </p>
              <p className="ant-upload-text">点击选择图片文件 或 拖进来</p>
              <p className="ant-upload-hint">
                仅支持jpg、jpeg、png等图片格式，单个文件大小不超过10M
              </p>
            </Dragger>

            {parsedError && (
              <Alert
                message="Error"
                description={parsedError}
                type="error"
                showIcon
                closable
                onClose={() => setParsedError(undefined)}
              />
            )}

            {parsedQrCode && (
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-stretch gap-2">
                  <Image
                    className="rounded border border-common-border"
                    width={168}
                    height={168}
                    src={parsedQrCode}
                    alt={parsedContent}
                  />
                  <div className="h-[168px] flex-1 overflow-y-auto whitespace-pre-wrap break-all rounded border border-common-border bg-black/5 px-3 py-1 leading-[20px]">
                    {parsedContent}
                  </div>
                </div>

                <Clipboard
                  text={parsedContent}
                  onSuccess={() => {
                    message.success("复制成功");
                  }}
                >
                  <div className="group p-2 text-[0px]">
                    <CopyOutlined
                      className="cursor-pointer text-base group-hover:text-blue-500"
                      rev={undefined}
                    />
                  </div>
                </Clipboard>
              </div>
            )}
          </div>
        </div>
      </SplitPane>
    </div>
  );
}
