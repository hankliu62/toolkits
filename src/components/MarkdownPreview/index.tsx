import type { MarkdownPreviewProps } from '@uiw/react-markdown-preview/lib/Props';
import { Skeleton } from 'antd';
import dynamic from 'next/dynamic';
import { useLayoutEffect, useRef, useState } from 'react';

const MDPreview = dynamic(() => import('@uiw/react-markdown-preview'), {
  ssr: false,
});

export interface IMarkdownPreviewProps extends MarkdownPreviewProps {
  onLoad?: () => void; // MDPreview渲染完成
  showLoading?: boolean;
}

export default function MarkdownPreview({
  onLoad,
  showLoading,
  ...otherProps
}: IMarkdownPreviewProps) {
  // 是否已经触发Load事件
  const loaded = useRef<boolean>(false);

  const rootElement = useRef<HTMLDivElement>();

  // 是否正在渲染Markdown预览器
  const [loadingMarkdownPreview, setLoadingMarkdownPreview] = useState<boolean>(true);

  useLayoutEffect(() => {
    function checkMDPreviewLoaded() {
      const preview = rootElement.current?.querySelectorAll('.wmde-markdown');
      if (preview && preview.length > 0) {
        if (!loaded.current) {
          setLoadingMarkdownPreview(false);
          onLoad && onLoad();
        }

        loaded.current = true;
      } else {
        setTimeout(checkMDPreviewLoaded, 1000);
      }
    }

    checkMDPreviewLoaded();
  }, [onLoad]);

  return (
    <div ref={rootElement}>
      <MDPreview {...otherProps} />
      {showLoading && loadingMarkdownPreview && <Skeleton active />}
    </div>
  );
}
