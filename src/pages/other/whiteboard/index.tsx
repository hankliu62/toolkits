import type { ReactElement } from 'react';

import NoHeaderLayout from '@/layouts/no-header';

const OtherWhiteboardPage = () => {
  return (
    <iframe
      title="手绘白板"
      src="https://hankliu62.github.io/whiteboard"
      width="100%"
      height="100%"
      className="h-[100vh] border-0"
    />
  );
};

// 自定义Layout
OtherWhiteboardPage.getLayout = function getLayout(page: ReactElement) {
  return <NoHeaderLayout>{page}</NoHeaderLayout>;
};

export default OtherWhiteboardPage;
