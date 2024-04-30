import { HourglassOutlined } from "@ant-design/icons";
import {
  Alert,
  Breadcrumb,
  Button,
  DatePicker,
  Divider,
  Input,
  InputNumber,
  message,
  Popover,
  Radio,
} from "antd";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import SplitPane from "react-split-pane";

import Location from "@/components/Location";
import {
  locationNameIDNoMap,
  locations,
  TLocation,
} from "@/components/Location/location";
import { ESex } from "@/enums/common";
import { getRoutePrefix } from "@/utils/route";
import { IParseIDNoInfo, parseIDNoInfo, randomIDNo } from "@/utils/tools";

/**
 * 在线身份证生成和解析工具
 *
 * @returns
 */
export default function IDNoPage() {
  // 出生地址(默认湖南省 - 娄底市 - 涟源市)
  const [location, setLocation] = useState<string[]>([
    "430000",
    "431300",
    "431382",
  ]);
  // 生日
  const [birthday, setBirthday] = useState<Dayjs>(
    dayjs("1993-09-26", "YYYY-MM-DD")
  );
  // 性别
  const [sex, setSex] = useState<ESex>(ESex.Male);
  // 生成数量
  const [count, setCount] = useState<number>(5);
  // 生成的身份证号码列表
  const [result, setResult] = useState<string[]>();

  /**
   * 开始生成身份证号码
   */
  const onCreateIDNo = useCallback(() => {
    if (!location || location.length === 0 || !location.at(-1)) {
      message.error("请先选择出生地址");
      return;
    }

    // 身份证号码列表
    const idNos = [];
    const address = location.at(-1); // 住址
    for (let i = 0; i < count; i++) {
      idNos.push(randomIDNo(address, birthday.toDate(), sex));
    }

    setResult(idNos);
  }, [location, birthday, sex, count]);

  // 省级列表
  const provinces = useMemo<TLocation[]>(() => {
    return locations.filter((item) => item.superId === "0");
  }, []);

  // 需要解析的身份证号码
  const [parseIDNo, setParseIDNo] = useState<string>();

  // 解析身份证信息
  const [parseIDNoInfoResult, setParseIDNoInfoResult] =
    useState<IParseIDNoInfo>();
  const [parseIDNoInfoError, setParseIDNoInfoError] = useState<string>();

  /**
   * 解析身份证
   */
  const onSearchIDNo = useCallback(() => {
    // 将结果先置空
    setParseIDNoInfoResult(undefined);
    setParseIDNoInfoError(undefined);

    // 如果身份证号码不是18位，提示错误
    if (parseIDNo?.length !== 18) {
      message.error("请输入18位二代身份证号码");
      return;
    }

    // 解析获得身份证信息
    const IDNoInfo = parseIDNoInfo(parseIDNo);
    // 判断身份证是否正确
    if (IDNoInfo.isTrue) {
      setParseIDNoInfoResult(IDNoInfo);
    } else {
      setParseIDNoInfoError("输入的二代身份证号码不正确");
    }
  }, [parseIDNo]);

  /**
   * 设置案例
   */
  const onSetExample = useCallback(() => {
    setParseIDNo("110101200006128958");
  }, []);

  return (
    <div className="relative flex min-h-[100vh] flex-1 flex-col bg-white">
      <Breadcrumb
        className="!m-6"
        items={[
          {
            title: <Link href={getRoutePrefix() + "/"}>小工具集合</Link>,
          },
          {
            title: "身份证生成器",
          },
        ]}
      />

      {/* @ts-ignore */}
      <SplitPane className="flex-1" split="vertical" minSize={50} maxSize={75}>
        <div className="overflow-y-auto">
          <div className="flex justify-between border-b border-black/20 px-6 py-4">
            <h2 className="text-lg font-medium leading-[32px]">生成身份证</h2>
          </div>

          <div className="m-4 rounded border border-common-border">
            <div className="bg-[#d3ccd6] px-4 py-3 text-sm text-[#6f4b3e]">
              在线随机身份证号码生成器
            </div>
            <div className="space-y-3 p-4">
              <div>
                <h2 className="text-lg text-[#cd5e3c]">随机身份证号码生成</h2>
                <Divider className="!my-2" />
                <div className="flex items-center gap-4">
                  <label className="w-32 text-right">出生地址</label>
                  <div className="flex-1">
                    <Location
                      className="!w-80"
                      value={location}
                      onChange={(value) => setLocation(value)}
                    />
                  </div>
                </div>
                <Divider className="!my-2" />
                <div className="flex items-center gap-4">
                  <label className="w-32 text-right">出生日期</label>
                  <div className="flex-1">
                    <DatePicker
                      className="w-80"
                      value={birthday}
                      onChange={(value) => setBirthday(value)}
                    />
                  </div>
                </div>
                <Divider className="!my-2" />
                <div className="flex items-center gap-4">
                  <label className="w-32 text-right">性别</label>
                  <div className="flex-1">
                    <Radio.Group
                      className="text-sm"
                      onChange={(e) => setSex(e.target.value)}
                      value={sex}
                    >
                      <Radio value={ESex.Male}>男</Radio>
                      <Radio value={ESex.Female}>女</Radio>
                    </Radio.Group>
                  </div>
                </div>
                <Divider className="!my-2" />
                <div className="flex items-center gap-4">
                  <label className="w-32 text-right">生成个数</label>
                  <div className="flex-1">
                    <InputNumber
                      className="!w-80"
                      value={count}
                      onChange={(value) => setCount(value)}
                      min={1}
                    />
                  </div>
                </div>
                <Divider className="!my-2" />
                <div className="flex items-center gap-4">
                  <label className="w-32 text-right" />
                  <div className="flex-1">
                    <Button size="large" type="primary" onClick={onCreateIDNo}>
                      开始生成
                    </Button>
                  </div>
                </div>
              </div>

              {!!result?.length && (
                <div>
                  <Divider dashed className="!my-5" />
                  <h2 className="text-lg text-[#cd5e3c]">生成结果：</h2>
                  {result?.map((item) => (
                    <div key={item}>
                      <Divider className="!my-2" />
                      <div className="flex items-center gap-4">
                        <label className="w-32 text-right" />
                        <div className="flex-1">{item}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <Divider dashed className="!my-5" />

              <div>
                <h2 className="text-lg text-[#cd5e3c]">身份证生成器说明：</h2>
                <div className="mt-1 text-xs">
                  身份证号码生成器是按身份证验证规则生成虚拟身份证号，非真实身份证，仅供测试使用，请勿用于非法用途。
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-y-auto">
          <div className="flex justify-between border-b border-black/20 px-6 py-4">
            <h2 className="text-lg font-medium leading-[32px]">解析身份证</h2>

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

          <div className="m-4 rounded border border-common-border">
            <div className="bg-[#d3ccd6] px-4 py-3 text-sm text-[#6f4b3e]">
              身份证号大全
            </div>
            <div className="space-y-3 p-4">
              <div>
                <h2 className="text-lg text-[#cd5e3c]">身份证号码查询</h2>
                <Divider className="!my-2" />
                <div className="flex items-center gap-4">
                  <label className="w-32 text-right">身份证号码</label>
                  <div className="flex-1">
                    <Input
                      maxLength={18}
                      className="!w-80"
                      value={parseIDNo}
                      onChange={(e) => setParseIDNo(e.target.value)}
                      placeholder="请输入18位二代身份证号码"
                      size="large"
                    />
                  </div>
                </div>
                <Divider className="!my-2" />
                <div className="flex items-center gap-4">
                  <label className="w-32 text-right" />
                  <div className="flex-1">
                    <Button size="large" type="primary" onClick={onSearchIDNo}>
                      查询
                    </Button>
                  </div>
                </div>
              </div>

              {!!(parseIDNoInfoResult || parseIDNoInfoError) && (
                <div>
                  <Divider dashed className="!my-5" />
                  <h2 className="text-lg text-[#cd5e3c]">生成结果：</h2>

                  {parseIDNoInfoError ? (
                    <Alert
                      message="Error"
                      description={parseIDNoInfoError}
                      type="error"
                      showIcon
                      closable
                      onClose={() => setParseIDNoInfoError(undefined)}
                    />
                  ) : (
                    <div>
                      <Divider className="!my-2" />
                      <div className="flex items-center gap-4">
                        <div className="w-52">{parseIDNo}</div>
                        <div className="w-10">
                          {parseIDNoInfoResult.isMale
                            ? "男"
                            : parseIDNoInfoResult.isFemale
                              ? "女"
                              : "未知"}
                        </div>
                        <div className="w-32">
                          {parseIDNoInfoResult.birthday}
                        </div>
                        <div className="flex-1">
                          {parseIDNoInfoResult.province && (
                            <Popover
                              content={
                                locationNameIDNoMap[
                                  parseIDNoInfoResult.province
                                ] ? (
                                  <div className="text-lg">
                                    {parseIDNoInfoResult.province}
                                    身份证开头前6位:{" "}
                                    <span className="text-red-500">
                                      {
                                        locationNameIDNoMap[
                                          parseIDNoInfoResult.province
                                        ]
                                      }
                                    </span>
                                  </div>
                                ) : null
                              }
                              trigger="click"
                              placement="topRight"
                            >
                              <Button
                                type="link"
                                size="small"
                                className="!px-1"
                              >
                                {parseIDNoInfoResult.province}
                              </Button>
                            </Popover>
                          )}
                          {parseIDNoInfoResult.city && (
                            <>
                              <Button type="link" size="small" className="!p-0">
                                ·
                              </Button>
                              <Popover
                                content={
                                  locationNameIDNoMap[
                                    parseIDNoInfoResult.city
                                  ] ? (
                                    <div className="text-lg">
                                      {parseIDNoInfoResult.province}·
                                      {parseIDNoInfoResult.city}
                                      身份证开头前6位:{" "}
                                      <span className="text-red-500">
                                        {
                                          locationNameIDNoMap[
                                            parseIDNoInfoResult.city
                                          ]
                                        }
                                      </span>
                                    </div>
                                  ) : null
                                }
                                trigger="click"
                                placement="topRight"
                              >
                                <Button
                                  type="link"
                                  size="small"
                                  className="!px-1"
                                >
                                  {parseIDNoInfoResult.city}
                                </Button>
                              </Popover>
                            </>
                          )}
                          {parseIDNoInfoResult.county && (
                            <>
                              <Button type="link" size="small" className="!p-0">
                                ·
                              </Button>
                              <Popover
                                content={
                                  locationNameIDNoMap[
                                    parseIDNoInfoResult.county
                                  ] ? (
                                    <div className="text-lg">
                                      {parseIDNoInfoResult.province}·
                                      {parseIDNoInfoResult.city}·
                                      {parseIDNoInfoResult.county}
                                      身份证开头前6位:{" "}
                                      <span className="text-red-500">
                                        {
                                          locationNameIDNoMap[
                                            parseIDNoInfoResult.county
                                          ]
                                        }
                                      </span>
                                    </div>
                                  ) : null
                                }
                                trigger="click"
                                placement="topRight"
                              >
                                <Button
                                  type="link"
                                  size="small"
                                  className="!px-1"
                                >
                                  {parseIDNoInfoResult.county}
                                </Button>
                              </Popover>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              <Divider dashed className="!my-5" />

              <div>
                <h2 className="text-lg text-[#cd5e3c]">身份证号码大全说明：</h2>
                <div className="mt-1 text-xs">
                  <p>
                    本站提供的身份证号码和姓名由系统随机组合而成，并非现实生活中真实的身份证号码和真实姓名，可用于网站开发测试时期的初级身份证号码验证，男女满18岁成年人身份证游戏防沉迷注册等软件程序测试。
                  </p>
                  <p>
                    请勿用于任何其他用途。若因使用这些身份证号码而产生任何问题和纠纷，本网站不承担任何直接或间接的责任！
                  </p>
                </div>
              </div>

              <Divider dashed className="!my-5" />

              <div>
                <h2 className="text-lg text-[#cd5e3c]">身份证查询系统说明：</h2>
                <div className="mt-1 text-xs">
                  <p>
                    输入不合法格式的身份证号码会提示身份证号码错误，本身份证号码查询系统也可作为身份证号码验证。
                  </p>
                  <p>
                    身份证号码和姓名格式科普：前1-6位为行政区划代码即归属地，第7-14位为出生年月日，第15-17位为顺序代码，在同一个地区出生同一个出生的人通过顺序号码区分，第17位奇数表示男性，偶数表示女性，第18位为校验码，用于校验身份证号码是否合法
                  </p>
                </div>
              </div>

              <Divider dashed className="!my-5" />

              <div>
                <h2 className="text-lg text-[#cd5e3c]">
                  其它地区身份证号码大全
                </h2>
                <div className="mt-1">
                  <div className="grid grid-cols-3">
                    {provinces.map(({ id, name }) => (
                      <div key={id}>
                        <Divider className="!my-2" />
                        <Popover
                          content={
                            <div className="text-lg">
                              {name}身份证开头前6位:{" "}
                              <span className="text-red-500">{id}</span>
                            </div>
                          }
                          trigger="click"
                        >
                          <Button type="link" size="small">
                            {name}
                          </Button>
                        </Popover>
                      </div>
                    ))}
                    {Array.from({ length: 3 - (provinces.length % 3) })
                      .fill(1)
                      .map((item, index) => (
                        <div key={index}>
                          <Divider className="!my-2" />
                          <Button
                            className="!opacity-0"
                            type="link"
                            size="small"
                          >
                            1
                          </Button>
                        </div>
                      ))}
                  </div>
                  <Divider className="!my-2" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </SplitPane>
    </div>
  );
}
