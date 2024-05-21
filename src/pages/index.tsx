import { Divider, message, Tooltip } from 'antd';
import AOS from 'aos';
import React, { useEffect, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import useTopWindow from '@/hooks/useTopWindow';
import { getRoutePrefix } from '@/utils/route';
import { EIToolkitStatus, navigation } from '@/constants/navigations';

/**
 * 工具
 *
 * @returns
 */
export default function Index() {
  const [location, setLocation] = useState<string>();
  const isTop = useTopWindow();

  useEffect(() => {
    if (window !== undefined) {
      setLocation(window.location.origin);
    }
  }, []);

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="relative w-full text-white/75">
      <div className="relative z-20 mx-auto w-full max-w-[1920px]">
        <div className="flex flex-col flex-wrap">
          {/* 编程开发 */}
          {navigation.map((item) => (
            <div className="px-[24px] py-20 md:px-[48px]" style={{ backgroundColor: item.bgColor }}>
              <h2 className="mb-6 text-center text-3xl font-medium text-[#333]">{item.name}</h2>
              <div
                data-aos="fade-up"
                data-aos-offset="200"
                data-aos-delay="50"
                data-aos-duration="1000"
                data-aos-easing="ease-in-out"
                data-aos-mirror="true"
                data-aos-once="true"
                className="info-card group relative flex min-h-[240px] w-full flex-col content-between justify-between gap-[24px] overflow-hidden rounded-[4px] p-[24px] ease-in"
              >
                <div className="relative grid grid-cols-2 gap-4 px-2 py-3 sm:grid-cols-4 sm:gap-6 sm:p-4">
                  {item.children.map((subItem, index) => {
                    const link = `${getRoutePrefix()}/${item.type}${subItem.href}`.replace(
                      /\/\//g,
                      '/',
                    );
                    const fullLink = `${location}${link}`;
                    // 判断是否为内部链接
                    return (
                      <a
                        key={link + index}
                        href={link}
                        className="flex flex-col items-stretch rounded-lg bg-white p-5 shadow hover:bg-gray-50"
                        onClick={(e) => {
                          if (!isTop) {
                            if (window.top.location) {
                              window.top.location.href = fullLink;
                            } else if (window.top.open) {
                              window.top.open(fullLink, '_blank');
                            }
                            e.preventDefault();
                          }
                        }}
                      >
                        <div className="flex items-start">
                          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-md bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                            <subItem.icon
                              className="h-6 w-6 justify-center text-xl"
                              aria-hidden="true"
                            />
                          </div>
                          <div className="ml-4 truncate">
                            <p className="truncate text-base font-medium text-gray-900">
                              {subItem.name}
                            </p>
                            <p
                              className="mt-1 truncate text-xs text-gray-500"
                              style={{
                                color: {
                                  [EIToolkitStatus.NORMAL]: '#249ffd',
                                  [EIToolkitStatus.NEW]: '#52de97',
                                  [EIToolkitStatus.UPHOLD]: '#f79817',
                                  [EIToolkitStatus.HOT]: '#fa5477',
                                }[subItem.status],
                              }}
                            >
                              {
                                {
                                  [EIToolkitStatus.NORMAL]: '服务正常',
                                  [EIToolkitStatus.NEW]: '新服务',
                                  [EIToolkitStatus.UPHOLD]: '服务维护',
                                  [EIToolkitStatus.HOT]: '热门服务',
                                }[subItem.status]
                              }
                            </p>
                          </div>
                        </div>
                        <Divider className="!my-3" />
                        <div className="h-[60px] overflow-hidden">
                          <p className="line-clamp-3 text-sm text-gray-800">
                            <Tooltip placement="topLeft" title={subItem.description}>
                              <span>{subItem.description}</span>
                            </Tooltip>
                          </p>
                        </div>

                        <div className="mt-2 flex w-full select-none items-center justify-between overflow-hidden">
                          <p className="mr-2 truncate text-xs text-gray-400">{link}</p>

                          <CopyToClipboard
                            text={fullLink}
                            onCopy={() => message.success('复制成功')}
                          >
                            <div
                              className="group/copy flex cursor-pointer"
                              onClick={(e) => e.preventDefault()}
                            >
                              <span className="whitespace-nowrap bg-gradient-to-r from-[rgb(31_41_55_/_80%)] to-[rgb(31_41_55_/_90%)] bg-[length:0_1px] bg-[left_100%] bg-no-repeat text-xs leading-[18px] text-gray-800 transition-all group-hover/copy:bg-[length:100%_1px]">
                                复制链接
                              </span>
                            </div>
                          </CopyToClipboard>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
