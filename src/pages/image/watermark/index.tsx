import type { ReactElement } from "react";

import NoHeaderLayout from "@/layouts/no-header";

/**
 * 图片水印
 */
const WatermarkPage = () => {
  return (
    <iframe
      title="图片水印"
      src="https://hankliu62.github.io/image-watermark?with-footer=1&with-breadcrumb=1"
      width="100%"
      height="100%"
      className="h-[100vh] border-0"
    />
  );
};

// 自定义Layout
WatermarkPage.getLayout = function getLayout(page: ReactElement) {
  return <NoHeaderLayout>{page}</NoHeaderLayout>;
};

export default WatermarkPage;
