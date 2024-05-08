import { ReactElement } from "react";
import NoHeaderLayout from "@/layouts/no-header";

const LifeLuckyChoosePage = () => {
  return (
    <iframe
      title="人生一格"
      src="https://hankliu62.github.io/lucky-choose"
      width="100%"
      height="100%"
      className="h-[100vh] border-0"
    />
  );
};

// 自定义Layout
LifeLuckyChoosePage.getLayout = function getLayout(page: ReactElement) {
  return <NoHeaderLayout>{page}</NoHeaderLayout>;
};

export default LifeLuckyChoosePage;
