import dayjs from 'dayjs';

import { locationIDNoMap } from '@/components/Location/location';
import { BankCardTypeName, bankList, EBankCardType } from '@/constants/bank';
import { ESex } from '@/enums/common';

// 身份证加权因子
export const IDNoWeightingFactor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1];
// 身份证验证位值.10代表X
export const IDNoVerifyBitValue = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2];

export interface IParseIDNoInfo {
  isTrue: boolean; // 身份证号是否有效。默认为 false
  year: null | number; // 出生年。默认为null
  month: null | number; // 出生月。默认为null
  day: null | number; // 出生日。默认为null
  birthday: null | string; // 生日。默认为null
  isMale: boolean; // 是否为男性。默认false
  isFemale: boolean; // 是否为女性。默认false
  province: null | string; // 省。默认为null
  city: null | string; // 市。默认为null
  county: null | string; // 县。默认为null
}

/**
 * 根据身份证号码解析信息
 *
 * @param IDNo
 * @returns
 */
export function parseIDNoInfo(IDNo: string) {
  const info: IParseIDNoInfo = {
    isTrue: false, // 身份证号是否有效。默认为 false
    year: null, // 出生年。默认为null
    month: null, // 出生月。默认为null
    day: null, // 出生日。默认为null
    birthday: null, // 生日。默认为null
    isMale: false, // 是否为男性。默认false
    isFemale: false, // 是否为女性。默认false
    province: null, // 省
    city: null, // 市
    county: null, // 县
  };

  /**
   * 根据身份证号码获取地址信息
   * @returns
   */
  function getAddressInfo(): Pick<IParseIDNoInfo, 'province' | 'city' | 'county'> {
    const dataInfo: Pick<IParseIDNoInfo, 'province' | 'city' | 'county'> = {
      province: null, // 省
      city: null, // 市
      county: null, // 县
    };

    // 地址
    const address = IDNo.slice(0, 6);
    const location = locationIDNoMap[address];
    if (location) {
      if (location.superId === '0') {
        dataInfo.province = location.name;
      } else {
        const parentLocation = locationIDNoMap[location.superId];
        if (parentLocation) {
          if (parentLocation.superId === '0') {
            dataInfo.province = parentLocation.name;
            dataInfo.city = location.name;
          } else {
            const rootLocation = locationIDNoMap[parentLocation.superId];
            if (rootLocation?.superId === '0') {
              dataInfo.province = rootLocation.name;
              dataInfo.city = parentLocation.name;
              dataInfo.county = location.name;
            }
          }
        }
      }
    }

    return dataInfo;
  }

  if (!IDNo || (IDNo.length !== 15 && IDNo.length !== 18)) {
    info.isTrue = false;
    return info;
  }

  if (IDNo.length === 15) {
    const year = IDNo.slice(6, 8);
    const month = IDNo.slice(8, 10);
    const day = IDNo.slice(10, 12);
    const p = IDNo.slice(14, 15); // 性别位
    const birthday = new Date(
      Number.parseInt(year, 10),
      Number.parseInt(month, 10) - 1,
      Number.parseInt(day, 10),
    );
    // 对于老身份证中的年龄则不需考虑千年虫问题而使用getYear()方法
    if (
      birthday.getFullYear() !== Number.parseInt(year) ||
      birthday.getMonth() !== Number.parseInt(month) - 1 ||
      birthday.getDate() !== Number.parseInt(day)
    ) {
      info.isTrue = false;
    } else {
      info.isTrue = true;
      info.year = birthday.getFullYear();
      info.month = birthday.getMonth() + 1;
      info.day = birthday.getDate();
      info.birthday = dayjs(birthday).format('YYYY-MM-DD');

      if (Number.parseInt(p, 10) % 2 === 0) {
        info.isFemale = true;
        info.isMale = false;
      } else {
        info.isFemale = false;
        info.isMale = true;
      }

      // 获取身份证地址信息
      const address = getAddressInfo();
      info.province = address.province;
      info.city = address.city;
      info.county = address.county;
    }

    return info;
  }

  if (IDNo.length === 18) {
    const year = IDNo.slice(6, 10);
    const month = IDNo.slice(10, 12);
    const day = IDNo.slice(12, 14);
    const p = IDNo.slice(14, 17);
    const birthday = new Date(
      Number.parseInt(year, 10),
      Number.parseInt(month, 10) - 1,
      Number.parseInt(day, 10),
    );
    // 这里用getFullYear()获取年份，避免千年虫问题
    if (
      birthday.getFullYear() !== Number.parseInt(year, 10) ||
      birthday.getMonth() !== Number.parseInt(month, 10) - 1 ||
      birthday.getDate() !== Number.parseInt(day, 10)
    ) {
      info.isTrue = false;
      return info;
    }

    const Wi = IDNoWeightingFactor; // 加权因子
    const Y = IDNoVerifyBitValue; // 身份证验证位值.10代表X

    // 验证校验位
    let sum = 0; // 声明加权求和变量

    const _IDNo: any[] = IDNo.split('');

    if ((_IDNo[17] as string).toLowerCase() === 'x') {
      _IDNo[17] = '10'; // 将最后位为x的验证码替换为10方便后续操作
    }
    for (let i = 0; i < 17; i++) {
      sum += Wi[i] * _IDNo[i]; // 加权求和
    }
    const i = sum % 11; // 得到验证码所位置

    if (Number(_IDNo[17]) !== Y[i]) {
      info.isTrue = false;
      return info;
    }

    info.isTrue = true;
    info.year = birthday.getFullYear();
    info.month = birthday.getMonth() + 1;
    info.day = birthday.getDate();
    info.birthday = dayjs(birthday).format('YYYY-MM-DD');

    if (Number.parseInt(p, 10) % 2 === 0) {
      info.isFemale = true;
      info.isMale = false;
    } else {
      info.isFemale = false;
      info.isMale = true;
    }

    // 获取身份证地址信息
    const address = getAddressInfo();
    info.province = address.province;
    info.city = address.city;
    info.county = address.county;

    return info;
  }

  return info;
}

/**
 * 随机生成身份证号码
 *
 * @param addressNo 地区身份证前缀
 * @param birthday 生日
 * @param sex 性别
 */
export function randomIDNo(addressNo: string, birthday: Date, sex: ESex): string {
  const day = dayjs(birthday).format('YYYYMMDD'); // 生日

  let s = '';
  while (!s) {
    const randomStr =
      Math.floor(Math.random() * 10).toString() +
      Math.floor(Math.random() * 10).toString() +
      Math.floor(Math.random() * 10).toString();

    if (sex === ESex.Female && Number.parseInt(randomStr, 10) % 2 === 0) {
      s = randomStr;
    } else if (sex === ESex.Male && Number.parseInt(randomStr, 10) % 2 !== 0) {
      s = randomStr;
    }
  }

  const idNoCodes = (addressNo + day + s).split('');
  let total = 0;
  for (let index = 0, len = idNoCodes.length; index < len; index++) {
    total = total + Number.parseInt(idNoCodes[index]) * IDNoWeightingFactor[index];
  }
  const lastCode = IDNoVerifyBitValue[total % 11];

  return addressNo + day + s + (lastCode === 10 ? 'X' : lastCode);
}

/**
 * Luhn校验算法校验银行卡号；Luhn校验规则：16位银行卡号（19位通用）:1、将未带校验位的 15（或18）位卡号从右依次编号 1 到 15（18），位于奇数位号上的数字乘以 2；2、将奇位乘积的个十位全部相加，再加上所有偶数位上的数字。
 *
 * @param {string} bankNo 银行卡号
 *
 * @returns 是否为正确的银行卡号
 */
export function verifyBankNo(bankNo: string) {
  const lastNum = bankNo.slice(-1, bankNo.length - 1 + 1); //取出最后一位（与Luhn进行比较）
  const firstNumbers = bankNo.slice(0, Math.max(0, bankNo.length - 1)); //前15或18位
  const prefixNumbers = [];
  for (let i = firstNumbers.length - 1; i > -1; i--) {
    //前15或18位倒序存进数组
    prefixNumbers.push(firstNumbers.substr(i, 1));
  }
  // 奇数位，且其值 * 2 < 9 的值组成数组
  const minOddNumbers = []; // 奇数位*2的积 < 9
  // 奇数位，且其值 * 2 > 9 的值组成数组
  const maxOddNumbers = []; //奇数位*2的积 >9
  // 偶数位值组成数组
  const evenNumbers = [];
  for (const [j, num] of prefixNumbers.entries()) {
    // 奇数位
    if ((j + 1) % 2 === 1) {
      if (Number.parseInt(num) * 2 < 9) {
        minOddNumbers.push(Number.parseInt(num) * 2);
      } else {
        maxOddNumbers.push(Number.parseInt(num) * 2);
      }
    } else {
      // 偶数位
      evenNumbers.push(num);
    }
  }
  // 奇数位，且其值 * 2 > 9 的值, 值的个位组成的数组
  const maxOddNumberOnesPlaces = []; // 奇数位*2 >9 的分割之后的数组个位数
  // 奇数位，且其值 * 2 > 9 的值, 值的十位组成的数组
  const maxOddNumberDecades = []; // 奇数位*2 >9 的分割之后的数组十位数
  for (const num of maxOddNumbers) {
    maxOddNumberOnesPlaces.push(Number.parseInt(num) % 10);
    maxOddNumberDecades.push(Number.parseInt(num) / 10);
  }
  // 奇数位，且其值 * 2 < 9 的值组成数组之和
  let sumMinOddNumber = 0; // 奇数位*2 < 9 的数组之和
  // 偶数位值组成数组之和
  let sumEvenNumber = 0; // 偶数位数组之和
  // 奇数位，且其值 * 2 > 9 的值, 值的个位组成的数组之和
  let sumMaxOddNumberOnesPlaces = 0; // 奇数位*2 >9 的分割之后的数组个位数之和
  // 奇数位，且其值 * 2 > 9 的值, 值的十位组成的数组之和
  let sumMaxOddNumberDecades = 0; //奇数位*2 >9 的分割之后的数组十位数之和
  let sumTotal = 0;
  for (const num of minOddNumbers) {
    sumMinOddNumber = sumMinOddNumber + Number.parseInt(num);
  }
  for (const num of evenNumbers) {
    sumEvenNumber = sumEvenNumber + Number.parseInt(num);
  }
  for (const [i, num] of maxOddNumberOnesPlaces.entries()) {
    sumMaxOddNumberOnesPlaces = sumMaxOddNumberOnesPlaces + Number.parseInt(num);
    sumMaxOddNumberDecades = sumMaxOddNumberDecades + Number.parseInt(maxOddNumberDecades[i]);
  }
  //计算总和
  sumTotal = sumMinOddNumber + sumEvenNumber + sumMaxOddNumberOnesPlaces + sumMaxOddNumberDecades;
  //计算Luhn值
  const k = sumTotal % 10 === 0 ? 10 : sumTotal % 10;
  // 是否通过Luhn验证
  return Number.parseInt(lastNum) === 10 - k;
}

export interface IBankNoInfo {
  bankName: string; // 银行名称
  bankCode: string; // 银行代码
  cardType: EBankCardType; // 银行卡类型
  cardTypeName: string; // 银行卡类型名称
  isValidateLuhn: boolean; // 是否符合Luhn(“模10算法”)校验
}
/**
 * 通过用户输入的银行卡号识别该银行卡所属开户行银行名称
 *
 * @param {string} bankNo 银行卡号
 * @returns 返回银行信息对象：{bankName: '银行名称', bankCode: '银行代码', cardType: '银行卡类型', cardTypeName: '银行卡类型名称', isValidateLuhn: false}
 */
export function parseBankNoInfo(bankNo: string): IBankNoInfo {
  for (let i = 0, len = bankList.length; i < len; i++) {
    const bankcard = bankList[i];
    const patterns = bankcard.patterns;
    for (let j = 0, jLen = patterns.length; j < jLen; j++) {
      const pattern = patterns[j];
      if (new RegExp(pattern.reg).test(bankNo)) {
        const info: IBankNoInfo = {
          bankName: bankcard.bankName, // 银行名称
          bankCode: bankcard.bankCode, // 银行代码
          cardType: pattern.cardType as IBankNoInfo['cardType'], // 银行卡类型
          cardTypeName: BankCardTypeName[pattern.cardType], // 银行卡类型名称
          isValidateLuhn: verifyBankNo(bankNo), // 是否符合Luhn(“模10算法”)校验
        };
        return info;
      }
    }
  }

  return undefined;
}

/**
 * 随机银行卡号
 *
 * @param bankCode 银行代码(银行简称)
 * @param bankCardType 银行卡类型
 * @returns
 */
export function randomBankNo(bankCode: string, bankCardType: EBankCardType) {
  let prefix = '622200'; // 中国工商银行
  let suffixCount = 13; // 后面code长度
  const bankType = bankCardType || EBankCardType.DC;
  const back = bankList.find((item) => item.bankCode === bankCode) || bankList[0];

  const patterns = back.patterns;
  if (patterns && patterns.length > 0) {
    const pattern = patterns.find((item) => item.cardType === bankType);
    if (pattern?.reg) {
      const matched = /^\^\(([\d|]+)[^)]+\)\\d{(\d+)}\$$/.exec(pattern.reg);
      if (matched && matched.length > 0 && matched[1] && matched[2]) {
        const prefixes = matched[1].split('|');
        prefix = prefixes.sort(() => Math.random() - 0.5).pop();
        suffixCount = Number.parseInt(matched[2]);
      }
    }
  }

  let bankNo = prefix;
  for (let j = 0; j < suffixCount; j++) {
    bankNo = bankNo + Math.floor(Math.random() * 10);
  }

  return bankNo;
}
