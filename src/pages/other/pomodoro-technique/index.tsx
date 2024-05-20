import type { ReactElement } from 'react';

import NoHeaderLayout from '@/layouts/no-header';

/**
 * 番茄工作法
 *
 * @returns
 */
const LifePomodoroTechniquePage = () => {
  return (
    <iframe
      title="番茄工作法"
      src="https://hankliu62.github.io/pomodoro-technique?with-footer=1&with-breadcrumb=1"
      width="100%"
      height="100%"
      className="h-[100vh] border-0"
    />
  );
};

// 自定义Layout
LifePomodoroTechniquePage.getLayout = function getLayout(page: ReactElement) {
  return <NoHeaderLayout>{page}</NoHeaderLayout>;
};

export default LifePomodoroTechniquePage;
