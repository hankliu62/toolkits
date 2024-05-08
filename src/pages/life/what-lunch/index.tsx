import { ReactElement } from "react";

import NoHeaderLayout from "@/layouts/no-header";

const LifeWhatLunchPage = () => {
  return (
    <iframe
      title="人生一格"
      src="https://hankliu62.github.io/what-lunch"
      width="100%"
      height="100%"
      className="h-[100vh] border-0"
    />
  );
};

// 自定义Layout
LifeWhatLunchPage.getLayout = function getLayout(page: ReactElement) {
  return <NoHeaderLayout>{page}</NoHeaderLayout>;
};

export default LifeWhatLunchPage;
