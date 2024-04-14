import React, { useEffect, useRef } from "react";

import { getRoutePrefix } from "@/utils/route";

const useLazyLoad = (src: string) => {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          imgRef.current!.src = src;
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
  }, [src]);

  return { imgRef };
};

interface ILazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  fallbackSrc?: string;
}

const LazyImage = ({
  src,
  fallbackSrc = `${getRoutePrefix()}/images/about/loading.gif`,
  ...props
}: ILazyImageProps) => {
  const { imgRef } = useLazyLoad(src);

  return <img ref={imgRef} src={fallbackSrc} alt="" {...props} />;
};

export default LazyImage;
