import isMobile from "is-mobile";
import dynamic from "next/dynamic";

const EditorMobile = dynamic(() => import("./EditorMirror"), {
  ssr: false,
});

const EditorDesktop = dynamic(() => import("./EditorDesktop"), {
  ssr: false,
});

export const CodeEditor = isMobile() ? EditorMobile : EditorDesktop;
