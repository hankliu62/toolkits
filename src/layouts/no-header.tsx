import { ReactNode } from "react";
import useTopWindow from "@/hooks/useTopWindow";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

const Footer = dynamic(() => import("@hankliu/rc-footer"), {
  ssr: false,
});

interface LayoutProps {
  children: ReactNode;
}

export default function NoHeaderLayout({ children }: LayoutProps) {
  const router = useRouter();
  const isTop = useTopWindow();

  return (
    <>
      <div
        className="flex h-full min-h-[100vh] w-full flex-col"
        style={{ flexDirection: "column", minHeight: "100vh" }}
      >
        {/* Main content */}
        <main className="flex flex-1 grow-[1] flex-col" style={{ flex: 1 }}>
          {children}
        </main>

        {/* footer */}
        {!!(isTop || router.query?.["with-footer"]) && <Footer />}
      </div>
    </>
  );
}
