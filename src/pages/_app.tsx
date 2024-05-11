import "@/styles/globals.css";
// monaco-editor
import "highlight.js/styles/googlecode.css";
import "diff2html/bundles/css/diff2html.min.css";
// video.js
import "video.js/dist/video-js.min.css";
import "nprogress/nprogress.css";
// markdown-editor
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
// 页面滚动元素动画
import "aos/dist/aos.css";
// footer组件
import "@hankliu/rc-footer/assets/index.css";
// exception组件
import "@hankliu/rc-exception/assets/index.css";
import "dayjs/locale/zh-cn";

import { ConfigProvider, Watermark } from "antd";
import dayjs from "dayjs";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import Head from "next/head";
import { ReactElement, ReactNode } from "react";

import useTopWindow from "@/hooks/useTopWindow";
import DefaultLayout from "@/layouts/index";
import theme from "@/theme/themeConfig";
import { getRoutePrefix } from "@/utils/route";

dayjs.locale("zh_CN");

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

/**
 * 网站入口APP类
 * @param param0
 * @returns
 */
export default function App({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout =
    Component.getLayout ?? ((page) => <DefaultLayout>{page}</DefaultLayout>);

  const isTop = useTopWindow();

  return (
    <>
      <Head>
        <title>小工具集合 - H.L Toolkits</title>
        <link rel="icon" href={`${getRoutePrefix()}/favicon.ico`} />
        <meta
          name="description"
          content="一个有趣的小功能和小工具集合，提供了一系列实用的生活功能和开发工具，旨在帮助开发者更加高效地进行前端网页开发，提供日常生活小妙招。"
        />
        <meta
          name="keywords"
          content="toolkit,toolkits,前端开发,前端开发工具,前端开发工具集合,在线工具,toolbox,frontend,卡鲁秋,Hank,HankLiu"
        />
        <meta name="author" content="Hank.Liu" />
        <meta name="copyright" content="卡鲁秋" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
      </Head>

      {getLayout(
        <ConfigProvider theme={theme}>
          <Watermark
            content={isTop ? "HankLiu Toolkits" : ""}
            font={{ color: "rgba(0, 0, 0, 0.1)" }}
            className="flex h-full flex-1 flex-col"
          >
            <Component {...pageProps} />
          </Watermark>
        </ConfigProvider>
      )}
    </>
  );
}
