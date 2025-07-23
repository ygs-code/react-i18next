import _ from 'lodash';

import { CheckDataType } from './CheckDataType';

const mapTree = (
  data,
  callback = () => {},
  childrenKey = 'children',
  parentData = {},
) => {
  for (let [index, item] of data.entries()) {
    data[index] = {
      ...item,
      ...(callback(item, index, parentData) || {}),
    };
    if (data[index][childrenKey] && data[index][childrenKey].length) {
      data[index] = {
        ...data[index],
        children: mapTree(
          data[index][childrenKey],
          callback,
          childrenKey,
          parentData,
        ),
      };
    }
  }

  return data;
};

// 递归treeData
interface TreeNode {
  [key: string]: any;
  children?: TreeNode[];
}

type CallbackFunction = (
  item: TreeNode,
  index: number,
) => Partial<TreeNode> | void;

const mapData = (
  data: TreeNode[],
  callback: CallbackFunction = () => {},
  nextKey: string = 'children',
): TreeNode[] => {
  for (let [index, item] of data.entries()) {
    data[index] = {
      ...item,
      ...(callback(item, index) || {}),
    };
    if (data[index][nextKey] && data[index][nextKey].length) {
      data[index] = {
        ...data[index],
        children: mapData(data[index][nextKey], callback, nextKey),
      };
    }
  }

  return data;
};

const getPrefixTreeData = (
  data,
  filter = () => true,
  nextKey = 'children',
  treeData = [],
) => {
  for (let [index, item] of [...data].entries()) {
    if (filter(item)) {
      treeData.push({ ...item });
      if (item[nextKey].length) {
        let childrenData = getPrefixTreeData(
          item[nextKey],
          filter,
          nextKey,
          [],
        );
        if (childrenData.length) {
          treeData[treeData.length - 1][nextKey] = childrenData;
        } else {
          delete treeData[treeData.length - 1][nextKey];
        }
      }
    }
  }
  return treeData;
};

interface TreeNodeWithPath {
  [key: string]: any;
  children?: TreeNodeWithPath[];
}

type Path = TreeNodeWithPath[];

export const getTreeItemPaths = (
  node: TreeNodeWithPath,
  path: Path,
  paths: Path[],
  nextKey: string = 'children',
): Path[] => {
  path.push(node);

  if (node[nextKey] && node[nextKey].length) {
    for (const child of node[nextKey]) {
      getTreeItemPaths(child, [...path], paths, nextKey);
    }
  } else {
    paths.push(path);
  }

  return paths;
};

// 获取所有路径的函数
interface TreeNodeWithChildren {
  [key: string]: any;
  children?: TreeNodeWithChildren[];
}

export const getTreeAllPaths = (
  treeData: TreeNodeWithChildren[],
  nextKey: string = 'children',
): TreeNodeWithChildren[][][] => {
  let paths: TreeNodeWithChildren[][][] = [];
  for (let item of treeData) {
    paths.push(getTreeItemPaths(item, [], [], nextKey));
  }
  return paths;
};

// const sortData = (data: any[]) => {
//   return data.sort((a, b) => {
//     const aSortKey = (a.sortKey || '').split('-').join('') || 0;
//     const bSortKey = (b.sortKey || '').split('-').join('') || 0;

//     if (new Number(aSortKey) === new Number(bSortKey)) {
//       return 0;
//     } else if (new Number(aSortKey) < new Number(bSortKey)) {
//       return -1;
//     } else {
//       return 1;
//     }
//   });
// };

export const listTransformTreeData = (
  data: any[],
  parentValueKey: string, // 上级菜单id
  valueKey: string, // 上级菜单id
  nextKey: string = 'children', // 下一级的key
  // 递归转换树形数据
  treeData: any[] = [],
  count: number = 0,
  maxCount: number = 0, // 最大递归次数，防止死循环
  initCount?: any, // 初始化计数
): any[] => {
  if (initCount === undefined) {
    initCount = data.length;
  }
  if (initCount <= 0) {
    initCount = 0;
  }

  maxCount += initCount;

  if (!data.length) {
    return treeData;
  } else if (data.length && count > maxCount + 1) {
    console.error('进入死循环：', data);
    return treeData.concat(data);
  }

  const addIds: string[] = [];

  for (const item of data) {
    if (!item[parentValueKey]) {
      addIds.push(item[valueKey]);
      treeData.push(item);
    } else {
      const data = findTreeData(
        treeData,
        item[parentValueKey],
        valueKey,
        nextKey,
      );

      if (data) {
        const { children = [] } = data;
        data.children = [...children, item];
        addIds.push(item[valueKey]);
      }
    }
  }

  data = data.filter((item) => {
    return !addIds.includes(item[valueKey]);
  });

  return listTransformTreeData(
    data,
    parentValueKey,
    valueKey,
    nextKey,
    treeData,
    count + 1,
    maxCount,
    initCount - 1,
  );
};

// const getTreesPaths = (treeData) => {
//   let paths = [];
//   for (let item of treeData) {
//     paths.push(getTreePaths(item));
//   }

//   return paths;
// };

// const getTreePaths = (treeData, path = []) => {
//   path.push(treeData);

//   if (treeData.children) {
//     for (const children of treeData.children) {
//       getTreePaths(children, [...path]);
//     }
//   }

//   return path;
// };

// 用于 查找 树 形结构数据，形成一个路劲数组
const findTreePath = (
  options: {
    treeData: any[];
    value: any;
    valueKey: string;
    nextKey?: string;
    callback?: (result: any[]) => void;
  },
  path: any[] = [],
): any[] | undefined => {
  const {
    treeData,
    value,
    valueKey,
    nextKey = 'children',
    callback = () => {},
  } = options;
  for (var i = 0; i < treeData.length; i++) {
    var tempPath = [...path];

    tempPath.push(treeData[i]);

    if (treeData[i][valueKey] === value) {
      return tempPath;
    }
    if (treeData[i][nextKey] && treeData[i][nextKey].length) {
      const reuslt = findTreePath(
        {
          treeData: treeData[i][nextKey],
          value,
          valueKey,
          callback,
        },
        tempPath,
      );
      if (reuslt) {
        callback(reuslt);
        return reuslt;
      }
    }
  }
};

// 过滤数据 可以用于搜索，包括父层的数据树形结构
const filterTreeData = (tree, predicate, nextKey = 'children') => {
  const result = [];

  for (const node of tree) {
    const { ...rest } = node;
    let matchedChildren = [];

    if (node[nextKey] && node[nextKey].length > 0) {
      matchedChildren = filterTreeData(node[nextKey], predicate);
    }

    if (predicate(node) || matchedChildren.length > 0) {
      result.push({
        ...rest,
        children: matchedChildren.length > 0 ? matchedChildren : undefined,
      });
    }
  }

  return result;
};

// 复杂类型数据，深拷贝
const deepCopy = (
  source, // 来源数据
  target, // 新的数据 如果是数组则为 [], 如果是对象传参则为{}
) => {
  target = target || {};
  for (let i in source) {
    if (source[i] && source.hasOwnProperty(i)) {
      if (typeof source[i] === 'object') {
        target[i] = source[i] && source[i].constructor === Array ? [] : {};
        deepCopy(source[i], target[i]);
      } else {
        target[i] = source[i];
      }
    }
  }
  return target;
};

// 搜索到树数据的某一条数据单条 不包括父层数据的
const findTreeData = (
  treeData: any[], // 树形数组或者数组数据
  value: any, // 需要查找的value
  key: string, //需要查找数组对象的key
  nextKey = 'children', // 下一级的key，这个不用传
  findValue = null, //获取到的值，这个不用传
) => {
  for (let item of treeData) {
    if (value != undefined && item[key] != undefined && item[key] == value) {
      return item;
    }

    if (item && item[nextKey] && item[nextKey].length >= 1) {
      findValue = findTreeData(item[nextKey], value, key, nextKey, findValue);
    }
  }
  return findValue;
};

// 深度比较两个数据
const diffData = (oldData: any, newData: any) => {
  let flag = true;
  if (oldData !== newData) {
    return false;
  }
  if (
    (CheckDataType.isObject(oldData) && CheckDataType.isObject(newData)) ||
    (CheckDataType.isArray(oldData) && CheckDataType.isArray(newData))
  ) {
    const oldDataKeys =
      CheckDataType.isObject(oldData) && CheckDataType.isObject(newData)
        ? Object.keys(oldData)
        : oldData;
    const newDataKeys =
      CheckDataType.isObject(oldData) && CheckDataType.isObject(newData)
        ? Object.keys(newData)
        : newData;
    if (oldDataKeys.length !== oldDataKeys.length) {
      return false;
    }
    for (let [index, elem] of oldDataKeys.entries()) {
      if (elem !== newDataKeys[index]) {
        return false;
      }
      if (
        (CheckDataType.isObject(elem) &&
          CheckDataType.isObject(newDataKeys[index])) ||
        (CheckDataType.isArray(elem) &&
          CheckDataType.isArray(newDataKeys[index]))
      ) {
        flag = diffData(elem, newDataKeys[index]);
      }
    }
  }
  return flag;
};

const transformData = (source: any, path = '', obj = {}, type = 'object') => {
  type = CheckDataType.isArray(source) ? 'array' : 'object';

  if (source && typeof source === 'object') {
    for (let key in source) {
      if (source.hasOwnProperty(key)) {
        type = CheckDataType.isArray(source) ? 'array' : 'object';
        if (CheckDataType.isArray(source) || CheckDataType.isObject(source)) {
          transformData(
            source[key],
            type === 'object'
              ? path
                ? `${path}.${key}`
                : key
              : path
                ? `${path}[${key}]`
                : `[${key}]`,
            obj,
            type,
          );
        }

        if (
          !(
            CheckDataType.isArray(source[key]) ||
            CheckDataType.isObject(source[key])
          )
        ) {
          obj[
            type === 'object'
              ? path
                ? `${path}.${key}`
                : key
              : path
                ? `${path}[${key}]`
                : `[${key}]`
          ] = source[key];
        }
      }
    }
  }

  return obj;
};

const mergeData = (old, source) => {
  let obj = {
    ...transformData(old),
    ...transformData(source),
  };
  let data = CheckDataType.isArray(old) ? [] : {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      _.set(data, key, obj[key]);
    }
  }
  return data;
};

function findParent(options, path = []) {
  const { data = [], value, valueKey, childrenKey = 'children' } = options;

  for (const item of data) {
    // 当前路径包含这个项的code
    const newPath = [...path, item];

    if (item[valueKey] === value) {
      // 找到目标code，返回当前路径
      return newPath;
    }

    // 如果有子项，递归查找子项
    if (item[childrenKey] && item[childrenKey].length > 0) {
      const result = findParent(
        { data: item[childrenKey], value, valueKey, childrenKey },
        newPath,
      );
      if (result) return result; // 如果在子项中找到目标，返回结果
    }
  }
  // 如果在当前路径下没有找到目标，返回null
  return null;
}

// // 复杂类型数据，深拷贝
// const deepCopy = (
//   source, // 来源数据
//   target // 新的数据 如果是数组则为 [], 如果是对象传参则为{}
// ) => {
//   target = target || {};
//   for (let i in source) {
//     if (source[i] && source.hasOwnProperty(i)) {
//       if (typeof source[i] === "object") {
//         target[i] = source[i] && source[i].constructor === Array ? [] : {};
//         deepCopy(source[i], target[i]);
//       } else {
//         target[i] = source[i];
//       }
//     }
//   }
//   return target;
// };

export {
  transformData,
  getPrefixTreeData,
  mergeData,
  mapData,
  filterTreeData,
  deepCopy,
  diffData,
  findTreeData,
  findTreePath,
  findParent,
  mapTree,
};
