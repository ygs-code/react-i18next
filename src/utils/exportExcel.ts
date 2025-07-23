// ExportExcel.js
import React from 'react';
import * as XLSX from 'xlsx';

interface ExportExcelType {
  columns: Array<string>;
  data: Array<Record<string, any>>;
  pageSize: number;
  pageNumber: number;
  workbook?: XLSX.WorkBook; // Optional workbook property
  name?: string; // Optional name property for the sheet
  [key: string]: any; // Allow additional properties
}

// 分页算法函数
interface PaginateParams<T> {
  array: Array<T>;
  pageSize: number;
  pageNumber: number;
}

// 分页算法
const paginate = <T>({
  array,
  pageSize,
  pageNumber,
}: PaginateParams<T>): Array<T> => {
  // 计算分页后的起始索引和结束索引
  const startIndex = (pageNumber - 1) * pageSize;

  let endIndex = pageNumber * pageSize;
  endIndex = array.length >= endIndex ? endIndex : array.length;

  // 返回分页后的数组
  return array.slice(startIndex, endIndex);
};

const ExportExcel = ({
  name = 'data',
  columns,
  data,
  pageSize = 100000,
  pageNumber = 1,
  workbook,
}: ExportExcelType) => {
 

  let $data = paginate({
    array: data,
    pageSize, // 每页数据量
    pageNumber, // 当前页码
  });
  if ((!$data || !$data.length) && workbook) {
    // 导出 Excel 文件
    XLSX.writeFile(workbook, `${name}.xlsx`);
    return;
  }
  // 对象类型导出 但是列名字不能相同
  $data = $data.map((item) => {
    return columns.reduce<Record<string, any>>((acc, column) => {
      const { dataIndex, title, render } = column as unknown as {
        dataIndex: string;
        title: string;
        render?: (value: any, row: Record<string, any>) => any;
      };
      acc[title] = render ? render(item[dataIndex], item) : item[dataIndex];
      return acc;
    }, {});
  });

  // 将 JSON 转换为工作表
  const worksheet = XLSX.utils.json_to_sheet($data);
  // 设置列宽
  const headers = Object.keys($data[0]);
  const colWidths = headers.map((key) => {
    const maxLen = Math.min(
      50,
      Math.max(
        key.length + 3,
        ...$data.map((row) => {
          return (row[key] || '').toString().trim().length;
        }),
      ),
    );
    return { wch: maxLen + 4 }; // 加一点缓冲
  });

  worksheet['!cols'] = colWidths;

  if (!workbook) {
    // 创建工作簿并添加工作表
    workbook = XLSX.utils.book_new();
  }

  XLSX.utils.book_append_sheet(workbook, worksheet, `${name}(${pageNumber})`);
  ExportExcel({
    name,
    columns,
    data,
    pageSize,
    pageNumber: pageNumber + 1,
    workbook,
  });
  // }
};

export default ExportExcel;
