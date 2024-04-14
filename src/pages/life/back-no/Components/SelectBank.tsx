import { Select, SelectProps } from "antd";
import { useCallback, useMemo } from "react";

import { bankList } from "@/constants/bank";

export type TBackInfo = (typeof bankList)[number];

interface ISelectBankProps extends Omit<SelectProps, "onChange"> {
  className?: string;
  value?: string;
  onChange?: (
    value: string | undefined,
    backInfo: TBackInfo | undefined
  ) => void;
}

type TBackInfoMap = Record<TBackInfo["bankCode"], TBackInfo>;

/**
 * 银行选择器
 *
 * @param param0
 * @returns
 */
export default function SelectBank({
  className,
  value,
  disabled,
  onChange,
  ...rest
}: ISelectBankProps) {
  const backMap = useMemo<TBackInfoMap>(() => {
    // 银行简称 - 银行信息Map
    const backInfoMap: TBackInfoMap = {};
    // eslint-disable-next-line unicorn/no-array-reduce
    bankList.reduce(
      (record: TBackInfoMap, item) => ((record[item.bankCode] = item), record),
      backInfoMap
    );

    return backInfoMap;
  }, []);

  const options = useMemo(() => {
    return (bankList || []).map(({ bankName, bankCode }) => ({
      label: bankName,
      value: bankCode,
      description: bankCode || "",
      filterLabel: bankName + "|" + (bankCode || ""),
    }));
  }, []);

  /**
   * 修改选中的银行
   */
  const onChangeBack = useCallback(
    (val: string | undefined) => {
      if (val) {
        onChange(val, backMap[val]);
      } else {
        onChange(val, undefined);
      }
    },
    [backMap, onChange]
  );

  return (
    <div className={className}>
      <Select
        {...rest}
        className="w-full"
        value={value || null}
        onChange={onChangeBack}
        placeholder="选择银行"
        disabled={disabled ?? false}
        showSearch
      >
        {options.map((option) => (
          <Select.Option
            key={option.value}
            value={option.value}
            label={option.filterLabel}
          >
            <div className="inline-flex w-full items-center truncate">
              {option.label}
              <span className="description text-lighter ml-2 flex-1 truncate text-xs">
                {option.description}
              </span>
            </div>
          </Select.Option>
        ))}
      </Select>
    </div>
  );
}
