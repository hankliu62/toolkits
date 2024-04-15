import { HourglassOutlined } from "@ant-design/icons";
import {
  Alert,
  Breadcrumb,
  Button,
  Divider,
  Input,
  InputNumber,
  message,
  Select,
} from "antd";
import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import SplitPane from "react-split-pane";

import { BankCardTypeName, EBankCardType } from "@/constants/bank";
import { getRoutePrefix } from "@/utils/route";
import { IBankNoInfo, parseBankNoInfo, randomBankNo } from "@/utils/tools";

import SelectBank, { TBackInfo } from "./Components/SelectBank";

/**
 * 在线银行卡号生成和解析工具
 *
 * @returns
 */
export default function BackNoPage() {
  const [selectedBackInfo, setSelectedBackInfo] = useState<TBackInfo>();
  // 银行简称
  const [bankCode, setBankCode] = useState<string>();
  // 银行卡类型
  const [bankCardType, setBankCardType] = useState<EBankCardType>();
  // 生成数量
  const [count, setCount] = useState<number>(5);
  // 生成的银行卡号码列表
  const [result, setResult] = useState<string[]>();

  // 银行卡类型选项
  const cardTypeOptions = useMemo<{ label: string; value: string }[]>(() => {
    if (!selectedBackInfo) {
      return [];
    }

    return (
      selectedBackInfo.patterns?.map(({ cardType }) => ({
        label: BankCardTypeName[cardType],
        value: cardType,
      })) || []
    );
  }, [selectedBackInfo]);

  /**
   * 开始生成银行卡号
   */
  const onCreateBankNo = useCallback(() => {
    if (!bankCode) {
      message.error("请先选择银行简称");
      return;
    }

    if (!bankCardType) {
      message.error("请先选择银行卡类型");
      return;
    }

    const cardNos = [];
    for (let i = 0; i < count; i++) {
      cardNos.push(randomBankNo(bankCode, bankCardType));
    }

    setResult(cardNos);
  }, [bankCode, bankCardType, count]);

  // 需要解析的银行卡号码
  const [parseBankNo, setParseBankNo] = useState<string>();

  // 解析银行卡信息
  const [parseBankNoInfoResult, setParseBankNoInfoResult] =
    useState<IBankNoInfo>();
  const [parseBankNoInfoError, setParseBankNoInfoError] = useState<string>();

  /**
   * 解析银行卡号
   */
  const onSearchBankNo = useCallback(() => {
    setParseBankNoInfoResult(undefined);
    setParseBankNoInfoError(undefined);

    const bankNoInfo = parseBankNoInfo(parseBankNo);
    if (bankNoInfo) {
      setParseBankNoInfoResult(bankNoInfo);
    } else {
      setParseBankNoInfoError("输入的银行卡号不正确");
    }
  }, [parseBankNo]);

  /**
   * 设置案例
   */
  const onSetExample = useCallback(() => {
    setParseBankNo("110101200006128958");
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
            title: "银行卡生成器",
          },
        ]}
      />

      {}
      {/* @ts-ignore */}
      <SplitPane className="flex-1" split="vertical" minSize={50} maxSize={75}>
        <div className="overflow-y-auto">
          <div className="flex justify-between border-b border-black/20 px-6 py-4">
            <h2 className="text-lg font-medium leading-[32px]">生成银行卡号</h2>
          </div>

          <div className="m-4 rounded border border-common-border">
            <div className="bg-[#d3ccd6] px-4 py-3 text-sm text-[#6f4b3e]">
              在线随机银行卡号生成器
            </div>
            <div className="space-y-3 p-4">
              <div>
                <h2 className="text-lg text-[#cd5e3c]">随机银行卡号生成</h2>
                <Divider className="!my-2" />
                <div className="flex items-center gap-4">
                  <label className="w-32 text-right">所属银行</label>
                  <div className="flex-1">
                    <SelectBank
                      className="w-80"
                      value={bankCode}
                      onChange={(val, bankInfo) => {
                        setBankCode(val);
                        setSelectedBackInfo(bankInfo);
                      }}
                    />
                  </div>
                </div>
                <Divider className="!my-2" />
                <div className="flex items-center gap-4">
                  <label className="w-32 text-right">银行卡类型</label>
                  <div className="flex-1">
                    <Select
                      className="w-80"
                      value={bankCardType}
                      options={cardTypeOptions}
                      onChange={(val) => setBankCardType(val)}
                    />
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
                    <Button
                      size="large"
                      type="primary"
                      onClick={onCreateBankNo}
                    >
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
                <h2 className="text-lg text-[#cd5e3c]">银行卡生成器说明：</h2>
                <div className="mt-1 text-xs">
                  银行卡号码生成器是按银行卡验证规则生成虚拟银行卡号，非真实银行卡，仅供测试使用，请勿用于非法用途。
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-y-auto">
          <div className="flex justify-between border-b border-black/20 px-6 py-4">
            <h2 className="text-lg font-medium leading-[32px]">解析银行卡</h2>

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
              银行卡号大全
            </div>
            <div className="space-y-3 p-4">
              <div>
                <h2 className="text-lg text-[#cd5e3c]">银行卡号码查询</h2>
                <Divider className="!my-2" />
                <div className="flex items-center gap-4">
                  <label className="w-32 text-right">银行卡号码</label>
                  <div className="flex-1">
                    <Input
                      maxLength={18}
                      className="!w-80"
                      value={parseBankNo}
                      onChange={(e) => setParseBankNo(e.target.value)}
                      placeholder="请输入银行卡号码"
                      size="large"
                    />
                  </div>
                </div>
                <Divider className="!my-2" />
                <div className="flex items-center gap-4">
                  <label className="w-32 text-right" />
                  <div className="flex-1">
                    <Button
                      size="large"
                      type="primary"
                      onClick={onSearchBankNo}
                    >
                      查询
                    </Button>
                  </div>
                </div>
              </div>

              {!!(parseBankNoInfoResult || parseBankNoInfoError) && (
                <div>
                  <Divider dashed className="!my-5" />
                  <h2 className="text-lg text-[#cd5e3c]">生成结果：</h2>

                  {parseBankNoInfoError ? (
                    <Alert
                      message="Error"
                      description={parseBankNoInfoError}
                      type="error"
                      showIcon
                      closable
                      onClose={() => setParseBankNoInfoError(undefined)}
                    />
                  ) : (
                    <div>
                      <Divider className="!my-2" />
                      <div className="flex items-center gap-4">
                        <div className="w-52">{parseBankNo}</div>
                        <div className="w-10">
                          {parseBankNoInfoResult.bankCode}
                        </div>
                        <div className="w-32">
                          {parseBankNoInfoResult.bankName}
                        </div>
                        <div className="w-10">
                          {parseBankNoInfoResult.cardType}
                        </div>
                        <div className="w-32">
                          {parseBankNoInfoResult.cardTypeName}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              <Divider dashed className="!my-5" />

              <div>
                <h2 className="text-lg text-[#cd5e3c]">银行卡号码大全说明：</h2>
                <div className="mt-1 text-xs">
                  <p>
                    本站提供的银行卡号码和姓名由系统随机组合而成，并非现实生活中真实的银行卡号码和真实姓名，可用于网站开发测试时期的初级银行卡号码验证，男女满18岁成年人银行卡游戏防沉迷注册等软件程序测试。
                  </p>
                  <p>
                    请勿用于任何其他用途。若因使用这些银行卡号码而产生任何问题和纠纷，本网站不承担任何直接或间接的责任！
                  </p>
                </div>
              </div>

              <Divider dashed className="!my-5" />

              <div>
                <h2 className="text-lg text-[#cd5e3c]">银行卡查询系统说明：</h2>
                <div className="mt-1 text-xs">
                  <p>
                    输入不合法格式的银行卡号码会提示银行卡号码错误，本银行卡号码查询系统也可作为银行卡号码验证。
                  </p>
                  <div>
                    银行卡号码格式科普：本网站使用Luhn校验算法校验银行卡号，校验过程大致如下：
                    <p>
                      1.
                      从右到左给卡号字符串编号，最右边第一位是1，最右边第二位是2，最右边第三位是3….
                    </p>
                    <p>
                      2.
                      从右向左遍历，对每一位字符t执行第三个步骤，并将每一位的计算结果相加得到一个数s。
                    </p>
                    <p>
                      3.
                      对每一位的计算规则：如果这一位是奇数位，则返回t本身，如果是偶数位，则先将t乘以2得到一个数n，如果n是一位数（小于10），直接返回n，否则将n的个位数和十位数相加返回。
                    </p>
                    <p>4. 如果s能够整除10，则此号码有效，否则号码无效。</p>
                    <p>
                      因为最终的结果会对10取余来判断是否能够整除10，所以又叫做模10算法。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SplitPane>
    </div>
  );
}
