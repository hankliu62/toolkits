import classNames from "classnames";
import React, { useLayoutEffect } from "react";

import { getRoutePrefix } from "@/utils/route";

export interface IHeaderProps {
  className?: string;
}

/**
 * 网页头部
 */
export default function Header({ className }: IHeaderProps) {
  // CSS + SVG Text Smoke Hover Effect
  useLayoutEffect(() => {
    let requestAnimationFrameTimer: number;
    const filter = document.querySelector("#turbulence");
    let frames = 1;
    const rad = Math.PI / 180;
    let bfx, bfy;

    function freqAnimation() {
      frames += 0.2;

      bfx = 0.03;
      bfy = 0.03;

      bfx += 0.005 * Math.cos(frames * rad);
      bfy += 0.005 * Math.sin(frames * rad);

      const bf = bfx.toString() + " " + bfy.toString();
      // displacement.setAttributeNS(null, 'scale', frames);
      filter && filter.setAttributeNS(null, "baseFrequency", bf);

      requestAnimationFrameTimer = window.requestAnimationFrame(freqAnimation);
    }

    requestAnimationFrameTimer = window.requestAnimationFrame(freqAnimation);

    return () => {
      requestAnimationFrameTimer &&
        window.cancelAnimationFrame(requestAnimationFrameTimer);
    };
  }, []);

  return (
    <header
      className={classNames(
        "group relative h-[520px] flex justify-center items-center",
        { [className]: className }
      )}
    >
      {/* 背景 */}
      <div className="z-0 absolute inset-0 blur-[0]">
        <img
          className="h-full w-full object-cover"
          src={`${getRoutePrefix()}/images/index/bg.jpeg`}
          alt="H.L Toolkits - 小工具集合"
        />
        <div className="absolute inset-0 bg-gradient-to-r" />
      </div>

      {/* 标题 */}
      <div className="z-10 relative px-6 py-16 sm:py-24 lg:px-8 lg:py-32">
        <h1 className="toolkits-title select-none animate__animated animate__bounceInDown tracking-tight group/title hover:cursor-pointer">
          <span className="block font-[about-title] text-center text-4xl font-bold sm:text-5xl lg:text-6xl text-white cursor-pointer hover:animate-[title-blur-change_2s_ease-out_forwards]">
            H.L Toolkits - 小工具集合
          </span>

          <svg className="hidden" width="0" height="0">
            <filter id="filter">
              <feTurbulence
                id="turbulence"
                type="fractalNoise"
                baseFrequency=".03 .03"
                numOctaves="20"
              />
              <feDisplacementMap in="SourceGraphic" scale="70" />
            </filter>
          </svg>
        </h1>

        <p className="animate__animated animate__bounceInLeft mx-auto mt-6 max-w-2xl break-all text-center text-xl text-white/60 sm:max-w-3xl">
          一个有趣的小功能和小工具集合，提供了一系列实用的生活功能和开发工具，旨在帮助开发者更加高效地进行前端网页开发，提供日常生活小妙招。
        </p>
      </div>

      {/* 烟花 */}
      <div className="z-[5] absolute w-full h-full top-0 left-0 hidden group-hover:block">
        <div
          className="fireworks absolute h-[150px] w-[150px] left-[15%] top-[5%]"
          style={{
            mask: `url(${getRoutePrefix()}/images/index/fireworks.png) right top / auto 150px no-repeat`,
          }}
        />
        <div
          className="fireworks absolute h-[150px] w-[150px] left-[30%] top-[13%]"
          style={{
            mask: `url(${getRoutePrefix()}/images/index/fireworks.png) right top / auto 150px no-repeat`,
            animationDelay: "-0.4s",
          }}
        />
        <div
          className="fireworks absolute h-[150px] w-[150px] left-[5%] top-[23%]"
          style={{
            mask: `url(${getRoutePrefix()}/images/index/fireworks.png) right top / auto 150px no-repeat`,
            animationDelay: "-1.7s",
          }}
        />
        <div
          className="fireworks absolute h-[150px] w-[150px] left-[45%] top-[8%]"
          style={{
            mask: `url(${getRoutePrefix()}/images/index/fireworks.png) right top / auto 150px no-repeat`,
            animationDelay: "-3.1s",
          }}
        />
      </div>
    </header>
  );
}
