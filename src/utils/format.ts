import dayjs from 'dayjs';
import { CheckDataType } from './CheckDataType';


export const formatDate = ({
  startDate,
  endDate,
}: {
  startDate: Date | string | undefined | null;
  endDate: Date | string | undefined | null;
}): {
  startDate: Date | string | undefined | null;
  endDate: Date | string | undefined | null;
} => {
  return {
    startDate: startDate
      ? dayjs(dayjs(startDate).format('YYYY-MM-DD 00:00:00')).toISOString()
      : undefined,
    endDate: endDate
      ? dayjs(dayjs(endDate).format('YYYY-MM-DD 23:59:59')).toISOString()
      : undefined,
  };
};


// 数字分割
export const toThousands = (num) => {
  num = (num || 0).toString();
  var re = /(\d{1,3})(?=(\d{3})+(?:$|\.))/g;
  return num.replace(re, '$1,');
};

// 数字分割包含判断是否是数字和默认值
export const numToThousands = (num, defaultSymbol = '---') => {
  return CheckDataType.isStringNumber(num) || CheckDataType.isNumber(num) ? toThousands(num) : defaultSymbol;
};