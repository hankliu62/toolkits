import dynamic from 'next/dynamic';

const EditorDesktop = dynamic(() => import('./editor'), {
  ssr: false,
});

export const CodeEditor = EditorDesktop;

export default CodeEditor;
