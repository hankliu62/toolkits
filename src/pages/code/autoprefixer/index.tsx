import type { ReactElement } from 'react';

import NoHeaderLayout from '@/layouts/no-header';

/**
 * CSS 兼容性处理
 *
 * @returns
 */
const LifeAutoprefixerPage = () => {
  return (
    <iframe
      title="CSS 兼容性处理"
      src="https://hankliu62.github.io/autoprefixer?with-footer=1&with-breadcrumb=1"
      width="100%"
      height="100%"
      className="h-[100vh] border-0"
    />
  );
};

// 自定义Layout
LifeAutoprefixerPage.getLayout = function getLayout(page: ReactElement) {
  return <NoHeaderLayout>{page}</NoHeaderLayout>;
};

export default LifeAutoprefixerPage;
