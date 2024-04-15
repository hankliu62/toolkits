import { BankOutlined } from "@ant-design/icons";
import { AntdIconProps } from "@ant-design/icons/lib/components/AntdIcon";
import {
  AdjustmentsHorizontalIcon,
  CircleStackIcon,
  CodeBracketSquareIcon,
  CommandLineIcon,
  DocumentTextIcon,
  HashtagIcon,
  IdentificationIcon,
  PlayCircleIcon,
  QrCodeIcon,
  VariableIcon,
} from "@heroicons/react/24/outline";
import { Divider, message, Tooltip } from "antd";
import AOS from "aos";
import React, { useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

import { getRoutePrefix } from "@/utils/route";

enum EIToolkitStatus {
  NORMAL = "normal",
  NEW = "new",
  UPHOLD = "uphold",
  HOT = "hot",
}

interface IToolkit {
  name: string;
  description: string;
  href: string;
  icon: React.ForwardRefExoticComponent<
    | (Omit<AntdIconProps, "ref"> & React.RefAttributes<HTMLSpanElement>)
    | (React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> & {
        title?: string;
        titleId?: string;
      } & React.RefAttributes<SVGSVGElement>)
  >;
  status: EIToolkitStatus;
}

const navigation: {
  type: string;
  name: string;
  bgColor: string;
  children: IToolkit[];
}[] = [
  {
    type: "code",
    name: "编程工具",
    bgColor: "#fff",
    children: [
      {
        name: "内容差异",
        description: "获得文本的差异，并以类似Github Diff效果的方式展示出来。",
        href: "/diff",
        icon: AdjustmentsHorizontalIcon,
        status: EIToolkitStatus.NORMAL,
      },
      {
        name: "代码编辑器",
        description:
          "基于 VS Code 的代码编辑器，运行在浏览器环境中。编辑器提供代码提示，智能建议等功能。供开发人员远程更方便的编写代码。",
        href: "/monaco-editor",
        icon: CodeBracketSquareIcon,
        status: EIToolkitStatus.NORMAL,
      },
      {
        name: "SQL 编辑器",
        description:
          "基于 VS Code 的SQL编辑器，运行在浏览器环境中。编辑器提供SQL命令提示，智能建议等功能。供开发人员远程更方便的编写SQL。",
        href: "/sql-editor",
        icon: CircleStackIcon,
        status: EIToolkitStatus.NORMAL,
      },
      {
        name: "Markdown 编辑阅读器",
        description:
          "Markdown 编辑阅读器，为用户提供了在线编写Markdown文档的平台，用户只需打开网站，就可以在网页上直接编写 Markdown 文档，通过在线编辑器可以让用户快速方便地在线创作、编辑、预览 Markdown 文档，进一步提高编辑效率和文档质量。",
        href: "/markdown",
        icon: DocumentTextIcon,
        status: EIToolkitStatus.NORMAL,
      },
      {
        name: "HTML2Markdown",
        description: "工具主要实现从HTML转Markdown的方法",
        href: "/h2d",
        icon: VariableIcon,
        status: EIToolkitStatus.NORMAL,
      },
      {
        name: "Yaml2Json",
        description: "工具主要实现从Yaml转Json的方法",
        href: "/yaml2json",
        icon: HashtagIcon,
        status: EIToolkitStatus.NORMAL,
      },
      {
        name: "TypeScript 类型生成器",
        description:
          "TypeScript 类型生成器工具将JSON数据转换为TypeScript类型定义，从而让TypeScript项目更高效的开发。",
        href: "/json2ts",
        icon: CommandLineIcon,
        status: EIToolkitStatus.NORMAL,
      },
    ],
  },
  {
    type: "video",
    name: "视频工具",
    bgColor: "#f4f6f8",
    children: [
      {
        name: "VideoPlayer",
        description:
          "支持m3u8格式的在线视频播放器网站提供了便捷的视频播放服务，用户可以在网站上上传或输入m3u8格式的视频链接进行播放，涵盖了丰富的视频分类和资源，满足用户各种需求。同时，该网站还提供了多种播放模式、清晰度选择和画面比例调整等功能，用户可以根据自己的喜好自主进行设置，让视频观看更加舒适，是一款值得推荐的在线视频播放器网站。",
        href: "/video-player",
        icon: PlayCircleIcon,
        status: EIToolkitStatus.NORMAL,
      },
    ],
  },
  {
    type: "life",
    name: "生活工具",
    bgColor: "#fefefe",
    children: [
      {
        name: "身份证生成器",
        description:
          "身份证号码生成器是按身份证验证规则生成虚拟身份证号，非真实身份证，仅供测试使用，请勿用于非法用途。",
        href: "/id-no",
        icon: IdentificationIcon,
        status: EIToolkitStatus.NORMAL,
      },
      {
        name: "银行卡生成器",
        description:
          "银行卡号码生成器是按银行卡验证规则生成虚拟银行卡号，非真实银行卡，仅供测试使用，请勿用于非法用途。",
        href: "/back-no",
        icon: BankOutlined,
        status: EIToolkitStatus.NORMAL,
      },
    ],
  },
  {
    type: "other",
    name: "其他工具",
    bgColor: "#f3f5f7",
    children: [
      {
        name: "QRCode",
        description:
          "把二维码技术变成简单实用的产品，让每个人都可以快速复用成功案例经验，免费制作出能高效解决业务问题的二维码。",
        href: "/qrcode",
        icon: QrCodeIcon,
        status: EIToolkitStatus.NORMAL,
      },
    ],
  },
];

/**
 * 工具
 *
 * @returns
 */
export default function Index() {
  const [location, setLocation] = useState<string>();

  useEffect(() => {
    if (window !== undefined) {
      setLocation(window.location.origin);
    }
  }, []);

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="relative w-full text-white/75">
      <div className="relative z-20 mx-auto w-full max-w-[1920px]">
        <div className="flex flex-col flex-wrap">
          {/* 编程开发 */}
          {navigation.map((item) => (
            <div
              className="px-[24px] py-20 md:px-[48px]"
              style={{ backgroundColor: item.bgColor }}
            >
              <h2 className="mb-6 text-center text-3xl font-medium text-[#333]">
                {item.name}
              </h2>
              <div
                data-aos="fade-up"
                data-aos-offset="200"
                data-aos-delay="50"
                data-aos-duration="1000"
                data-aos-easing="ease-in-out"
                data-aos-mirror="true"
                data-aos-once="true"
                className="info-card group relative flex min-h-[240px] w-full flex-col content-between justify-between gap-[24px] overflow-hidden rounded-[4px] p-[24px] ease-in"
              >
                <div className="relative grid grid-cols-2 gap-4 px-2 py-3 sm:grid-cols-4 sm:gap-6 sm:p-4">
                  {item.children.map((subItem) => {
                    const link =
                      `${getRoutePrefix()}/${item.type}${subItem.href}`.replace(
                        /\/\//g,
                        "/"
                      );
                    const fullLink = `${location}${link}`;
                    // 判断是否为内部链接
                    return (
                      <a
                        key={link}
                        href={link}
                        className="flex flex-col items-stretch rounded-lg bg-white p-5 shadow hover:bg-gray-50"
                      >
                        <div className="flex items-start">
                          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-md bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                            <subItem.icon
                              className="h-6 w-6 justify-center text-xl"
                              aria-hidden="true"
                            />
                          </div>
                          <div className="ml-4 truncate">
                            <p className="truncate text-base font-medium text-gray-900">
                              {subItem.name}
                            </p>
                            <p
                              className="mt-1 truncate text-xs text-gray-500"
                              style={{
                                color: {
                                  [EIToolkitStatus.NORMAL]: "#249ffd",
                                  [EIToolkitStatus.NEW]: "#52de97",
                                  [EIToolkitStatus.UPHOLD]: "#f79817",
                                  [EIToolkitStatus.HOT]: "#fa5477",
                                }[subItem.status],
                              }}
                            >
                              {
                                {
                                  [EIToolkitStatus.NORMAL]: "服务正常",
                                  [EIToolkitStatus.NEW]: "新服务",
                                  [EIToolkitStatus.UPHOLD]: "服务维护",
                                  [EIToolkitStatus.HOT]: "热门服务",
                                }[subItem.status]
                              }
                            </p>
                          </div>
                        </div>
                        <Divider className="!my-3" />
                        <div className="h-[60px] overflow-hidden">
                          <p className="line-clamp-3 text-sm text-gray-800">
                            <Tooltip
                              placement="topLeft"
                              title={subItem.description}
                            >
                              <span>{subItem.description}</span>
                            </Tooltip>
                          </p>
                        </div>

                        <div className="mt-2 flex w-full select-none items-center justify-between">
                          <p className="text-xs text-gray-400">{link}</p>

                          <CopyToClipboard
                            text={fullLink}
                            onCopy={() => message.success("复制成功")}
                          >
                            <div
                              className="group/copy flex cursor-pointer"
                              onClick={(e) => e.preventDefault()}
                            >
                              <span className="bg-gradient-to-r from-[rgb(31_41_55_/_80%)] to-[rgb(31_41_55_/_90%)] bg-[length:0_1px] bg-[left_100%] bg-no-repeat text-xs leading-[18px] text-gray-800 transition-all group-hover/copy:bg-[length:100%_1px]">
                                复制链接
                              </span>
                            </div>
                          </CopyToClipboard>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
