import { Popover } from 'antd';
import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { getRoutePrefix } from '@/utils/route';

/**
 * 网页底部
 */
export default function Footer({ className }: { className?: string }) {
  return (
    <footer
      className={classNames(
        'md:pb z-[98] mx-auto w-full bg-black px-5 pb-6 pt-6 sm:pt-24 md:px-10 md:pb-[24px] md:pt-[70px]',
        {
          [className]: className,
        },
      )}
    >
      <div className="md:px-24">
        <div className="md:pb-[36px] xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="flex flex-col items-center justify-start space-y-3 md:flex-row md:items-start md:space-x-3 md:space-y-0">
            <Link href="/">
              <Image
                className=" overflow-hidden rounded bg-white shadow-[0_0_1px_1px_white]"
                src={`${getRoutePrefix()}/logo.svg`}
                alt="卡鲁秋"
                width={62}
                height={62}
              />
            </Link>
            <span className="text-sm text-white md:block md:text-base md:leading-9">
              工具提升效率，创建美好未来
            </span>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-2 md:mt-16 md:grid md:gap-8 xl:col-span-2 xl:mt-0">
            <div className="gap-2 md:grid md:grid-cols-5 md:gap-8">
              <div className="md:col-span-2">
                <h3 className="text-sm font-normal leading-6 text-[#C4C4C4] md:text-base">
                  矩阵产品
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2">
                  <li className="col-span-1">
                    <ul className="mt-2 space-y-1 md:mt-6 md:space-y-4">
                      <li className="font-wix font-normal">
                        <a
                          href="https://hankliu62.github.io/icss/"
                          className="text-sm leading-6 text-white transition-colors hover:text-white/80 md:text-base"
                        >
                          设计动画
                        </a>
                      </li>
                      <li className="font-wix font-normal">
                        <a
                          href="https://hankliu62.github.io/resume/"
                          className="text-sm leading-6 text-white transition-colors hover:text-white/80 md:text-base"
                        >
                          个人简历
                        </a>
                      </li>
                      <li className="font-wix font-normal">
                        <a
                          href="https://hankliu62.github.io/interview/"
                          className="text-sm leading-6 text-white transition-colors hover:text-white/80 md:text-base"
                        >
                          面试宝典
                        </a>
                      </li>
                    </ul>
                  </li>

                  <li className="col-span-1">
                    <ul className="mt-1 space-y-1 md:mt-6 md:space-y-4">
                      <li className="font-wix font-normal">
                        <a
                          href="https://hankliu62.github.io/what-lunch/"
                          className="text-sm leading-6 text-white transition-colors hover:text-white/80 md:text-base"
                        >
                          中午吃什么
                        </a>
                      </li>
                      <li className="font-wix font-normal">
                        <a
                          href="https://hankliu62.github.io/lucky-choose/"
                          className="text-sm leading-6 text-white transition-colors hover:text-white/80 md:text-base"
                        >
                          懒人选择器
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
              <div className="mt-5 md:col-span-2 md:mt-0">
                <h3 className="text-sm font-normal leading-6 text-[#C4C4C4] md:text-base">
                  联系我们
                </h3>
                <ul className="mt-2 space-y-1 md:mt-6 md:space-y-4">
                  <li className="font-wix font-normal">
                    <a
                      className="text-sm leading-6 text-white transition-colors hover:text-white/80 md:text-base"
                      href="mailto:hankliu62@163.com"
                    >
                      hankliu62@163.com
                    </a>
                  </li>
                  <li className="font-wix font-normal">
                    <a
                      className="text-sm leading-6 text-white transition-colors hover:text-white/80 md:text-base"
                      target="_blank"
                      rel="noreferrer"
                      href="https://map.baidu.com/search/%E6%96%B0%E6%98%9F%E8%8A%B1%E5%9B%AD/@12466930.237928296,3192596.045944,19z?querytype=s&da_src=shareurl&wd=%E6%96%B0%E6%98%9F%E8%8A%B1%E5%9B%AD&c=221&src=0&pn=0&sug=0&l=13&b=(12445334,3179929.25;12490838,3203193.25)&from=webmap&biz_forward=%7B%22scaler%22:2,%22styles%22:%22pl%22%7D&device_ratio=2"
                      aria-hidden
                    >
                      湖南省娄底市娄星区新星花园
                    </a>
                  </li>
                  <li className="font-wix font-normal">
                    <div className="text-sm leading-6 text-white md:text-base">
                      <Popover
                        content={
                          <div className="flex flex-col items-center">
                            <Image
                              src={`${getRoutePrefix()}/images/home/wechat.jpg`}
                              width={200}
                              height={200}
                              alt="wechat"
                            />
                            <p className="mt-1 text-center text-[14px] font-normal leading-5 text-[#888]">
                              扫码添加个人微信号
                            </p>
                            <p className="mt-1 text-center text-[12px] font-normal leading-4 text-[#aaa]">
                              (你只管扫码，我不一定看得到)
                            </p>
                          </div>
                        }
                      >
                        <span>个人微信</span>
                      </Popover>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="mt-5 md:col-span-1 md:mt-0">
                <h3 className="text-sm font-normal leading-6 text-[#C4C4C4] md:text-base">
                  关于产品
                </h3>
                <ul className="mt-2 space-y-1 md:mt-6 md:space-y-4">
                  <li className="font-wix font-normal">
                    <Link
                      className="text-sm leading-6 text-white transition-colors hover:text-white/80 md:text-base"
                      href="/terms"
                    >
                      服务协议
                    </Link>
                  </li>
                  <li className="font-wix font-normal">
                    <Link
                      className="text-sm leading-6 text-white transition-colors hover:text-white/80 md:text-base"
                      href="/privacy"
                    >
                      隐私政策
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-center space-x-3 border-b-0 border-l-0 border-r-0 border-t border-solid border-white/60 pt-6">
          <p className="mt-0 text-center text-xs leading-5 text-white/40 md:order-1 md:mt-0">
            &copy; {new Date().getFullYear()} 卡鲁秋, Inc.
          </p>
          <p className="mt-0 flex items-center justify-center space-x-1 text-center text-xs leading-5 text-white/40 md:order-1 md:ml-0 md:mt-0 md:justify-start">
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
