import {
  AlertOutlined,
  BankOutlined,
  BilibiliOutlined,
  CloudOutlined,
  CoffeeOutlined,
  FieldTimeOutlined,
  FunctionOutlined,
  HistoryOutlined,
  PictureFilled,
  SignatureOutlined,
} from "@ant-design/icons";
import type { AntdIconProps } from "@ant-design/icons/lib/components/AntdIcon";
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
  PhotoIcon,
} from "@heroicons/react/24/outline";

export enum EIToolkitStatus {
  NORMAL = "normal",
  NEW = "new",
  UPHOLD = "uphold",
  HOT = "hot",
}

export interface IToolkit {
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

export const navigation: {
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
        description: "在线HTML转Markdown的工具网站，支持HTML转Markdown的功能。",
        href: "/h2d",
        icon: VariableIcon,
        status: EIToolkitStatus.NORMAL,
      },
      {
        name: "Yaml2Json",
        description: "在线Yaml转Json的工具网站，支持Yaml转Json的功能。",
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
      {
        name: "CSS 兼容性处理",
        description:
          "一个在线 CSS 兼容性处理网站，用于解析您的 CSS 并自动添加浏览器兼容性前缀。通过在线 CSS 兼容性处理，可以让网站更具魅力和稳定性，使其在各种环境下都能够提供出色的用户体验。",
        href: "/autoprefixer",
        icon: FunctionOutlined,
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
      {
        name: "解析 bilibili 视频",
        description:
          "在线解析 Bilibili 视频工具网站，包含解析 Bilibili 视频，在线播放，视频下载等功能，让我们一起在 Bilibili 的潮流中畅游，感受创意的火花与热情的迸发",
        href: "/parse-bilibili",
        icon: BilibiliOutlined,
        status: EIToolkitStatus.NORMAL,
      },
    ],
  },
  {
    type: "image",
    name: "图片工具",
    bgColor: "#fefefe",
    children: [
      {
        name: "图片提取文字",
        description:
          "在线图片提取文字网站，用于解析您的上传的图片，自动获取图片中的文字内容。",
        href: "/extract-text",
        icon: PictureFilled,
        status: EIToolkitStatus.NORMAL,
      },
      {
        name: "图片水印",
        description:
          "在线图片添加水印的网站，给图片轻松添加在线水印，让每一张图像都带着您的独特故事，成为永恒的艺术品。",
        href: "/watermark",
        icon: PhotoIcon,
        status: EIToolkitStatus.NORMAL,
      },
    ],
  },
  {
    type: "life",
    name: "生活工具",
    bgColor: "#f3f5f7",
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
      {
        name: "人生一格",
        description:
          "多花一些时间了解自己，少花一些时间在应付他人身上，珍惜时光，陪伴对的人。",
        href: "/count",
        icon: FieldTimeOutlined,
        status: EIToolkitStatus.NORMAL,
      },
      {
        name: "天气预报",
        description:
          "查询每日天气，对未来几天天气进行预报，出门常备伞，没有伞的孩子只能努力奔跑。",
        href: "/weather",
        icon: CloudOutlined,
        status: EIToolkitStatus.NORMAL,
      },
      {
        name: "中午吃什么",
        description: "中午吃什么，不知道？那就吃这个吧！",
        href: "/what-lunch",
        icon: CoffeeOutlined,
        status: EIToolkitStatus.NORMAL,
      },
      {
        name: "懒人选择器",
        description:
          "懒人选择困难证用户的福音，根据天时，地利和人和的因素帮助选择困难证用户快速的做出最优选择，如果结果非最优，可能是你太衰了。",
        href: "/lucky-choose",
        icon: AlertOutlined,
        status: EIToolkitStatus.NORMAL,
      },
    ],
  },
  {
    type: "other",
    name: "其他工具",
    bgColor: "#fefefe",
    children: [
      {
        name: "QRCode",
        description:
          "把二维码技术变成简单实用的产品，让每个人都可以快速复用成功案例经验，免费制作出能高效解决业务问题的二维码。",
        href: "/qrcode",
        icon: QrCodeIcon,
        status: EIToolkitStatus.NORMAL,
      },
      {
        name: "手绘白板",
        description:
          "一款优雅的虚拟合作绘图工具，为您提供了一个舒适的绘画空间，仿佛置身于一片纯净的白板上。在这里，您可以尽情地发挥想象，轻松地绘制出具有手绘韵味的图表和图形。",
        href: "/whiteboard",
        icon: SignatureOutlined,
        status: EIToolkitStatus.NORMAL,
      },
      {
        name: "番茄工作法",
        description:
          "一个在线番茄工作法网站，这个网站旨在向您展示如何有效地运用番茄工作法，提高工作效率，增强工作质量。让我们一起在这个小番茄的世界里，创造更加美好的工作体验吧！",
        href: "/pomodoro-technique",
        icon: HistoryOutlined,
        status: EIToolkitStatus.NORMAL,
      },
    ],
  },
];
