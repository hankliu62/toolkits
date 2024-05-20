import type { ReactElement } from 'react';

import NoHeaderLayout from '@/layouts/no-header';

const LifeWeatherPage = () => {
  return (
    <iframe
      title="人生一格"
      src="https://hankliu62.github.io/weather?with-footer=1&with-breadcrumb=1"
      width="100%"
      height="100%"
      className="h-[100vh] border-0"
    />
  );
};

// 自定义Layout
LifeWeatherPage.getLayout = function getLayout(page: ReactElement) {
  return <NoHeaderLayout>{page}</NoHeaderLayout>;
};

export default LifeWeatherPage;
