import type { ReactElement } from 'react';

import NoHeaderLayout from '@/layouts/no-header';

/**
 * 图片提取文字
 */
const ExtractTextPage = () => {
  return (
    <iframe
      title="图片提取文字"
      src="https://hankliu62.github.io/image-extract-text?with-footer=1&with-breadcrumb=1"
      width="100%"
      height="100%"
      className="h-[100vh] border-0"
    />
  );
};

// 自定义Layout
ExtractTextPage.getLayout = function getLayout(page: ReactElement) {
  return <NoHeaderLayout>{page}</NoHeaderLayout>;
};

export default ExtractTextPage;
