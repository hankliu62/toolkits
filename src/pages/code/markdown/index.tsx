import { HourglassOutlined } from "@ant-design/icons";
import { Breadcrumb, Button } from "antd";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useCallback, useState } from "react";

import { getRoutePrefix } from "@/utils/route";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

const Demo = `# toolkit

前端工具库网站

This is a [Next.js](https://nextjs.org/) project bootstrapped with [\`create-next-app\`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

\`\`\`bash
npm run dev
# or
yarn dev
# or
pnpm dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying \`pages/index.tsx\`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in \`pages/api/hello.ts\`.

The \`pages/api\` directory is mapped to \`/api/*\`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [\`next/font\`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
`;

/**
 * 在线Markdown编辑器网站
 *
 * @returns
 */
export default function MarkdownPage() {
  const [content, setContent] = useState<string>();

  /**
   * 设置案例
   */
  const onSetExample = useCallback(() => {
    setContent(Demo);
  }, []);

  return (
    <div className="bg-white pb-6">
      <Breadcrumb
        className="!m-6"
        items={[
          {
            title: <Link href={getRoutePrefix() + "/"}>小工具集合</Link>,
          },
          {
            title: "Markdown 编辑阅读器",
          },
        ]}
      />

      <div className="flex flex-col space-y-6 px-6">
        <div>
          <div className="flex justify-between pb-4">
            <label className="text-base font-normal">案例展示: </label>

            <div className="flex items-center space-x-5">
              <Button
                className="!inline-flex items-center"
                icon={<HourglassOutlined rev={undefined} />}
                onClick={onSetExample}
              >
                案例
              </Button>
            </div>
          </div>

          <div>
            <MDEditor
              height={800}
              value={content}
              onChange={(value) => {
                setContent(value);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
