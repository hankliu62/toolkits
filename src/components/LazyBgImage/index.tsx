import React, { useEffect, useRef } from "react";

import { getRoutePrefix } from "@/utils/route";

const useLazyLoad = (style: React.CSSProperties) => {
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          imgRef.current!.style.backgroundImage = style?.backgroundImage ?? "";
          observer.unobserve(entry.target);
        }
      }
    });

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [style]);

  return { imgRef };
};

interface ILazyBgImageProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  style: React.CSSProperties;
  fallbackSrc?: string;
  children?: React.ReactNode | React.ReactNode[];
}

const LazyBgImage = ({
  style = {},
  fallbackSrc = `${getRoutePrefix()}/images/about/background.png`,
  children,
  ...props
}: ILazyBgImageProps) => {
  const { imgRef } = useLazyLoad(style);

  const { backgroundImage, ...otherStyle } = style;

  return (
    <div
      ref={imgRef}
      style={{ ...otherStyle, backgroundImage: `url(${fallbackSrc})` }}
      {...props}
    >
      {children}
    </div>
  );
};

export default LazyBgImage;
