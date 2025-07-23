/*
 * @Author: your name
 * @Date: 2020-11-11 11:21:09
 * @LastEditTime: 2021-08-23 19:26:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /error-sytem/@/@/common/components/CheckPermission/index.js
 */
import { mapRedux, getState } from '@/redux';
import { CheckDataType } from '@/utils';
import PermissionDenied from '@/components/403';
import React, { Children, cloneElement, Component, createElement } from 'react';

// export const authorKeys = [1, 2, 3, 4, 5];

const checkAuthorKey = (authorKey, props) => {
  const state = getState();
  const { user: { userInfo: { authorKeys } = {} } = {} } = state;



  let flag = true;

  if (authorKey === undefined) {
    return true;
  }

  //如果是函数
  if (props && CheckDataType.isFunction(authorKey)) {
    authorKey = authorKey(props);
  }

  if (authorKeys.has('all')) {
    flag = true;
  } else if (
    CheckDataType.isString(authorKey) ||
    CheckDataType.isNumber(authorKey)
  ) {
    //如果是字符串
    flag = authorKeys.has(authorKey);
  } else if (CheckDataType.isBoolean(authorKey)) {
    // 如果是布尔值
    flag = authorKey;
  } else if (CheckDataType.isArray(authorKey)) {
    // 如果是数组
    flag = authorKey.some((item) => {
      return authorKeys.has(item);
    });
  } else {
    console.error('key数据类型不正确');
  }
  return flag;
};

// 检查函数
const checkAuthor = (authorKey) => {
  return checkAuthorKey(authorKey);
};

// 检查组件授权
const CheckAuthor = (props) => {
  const { authorKey, children } = props;

  return checkAuthorKey(authorKey)
    ? Children.map(children, (child, index) => {
        return child;
      })
    : null;
};

const OntAuth = () => {
  return  <PermissionDenied/>;
};

// 检测页面是否有授权
const checkPageAuthor = (authorKey) => {
  return (C) => {
    class Auth extends Component {
      render() {
        return checkAuthorKey(authorKey, this.props) ? (
          <C {...this.props} />
        ) : (
          <OntAuth {...this.props} />
        );
      }
    }
    return mapRedux()(Auth);
  };
};

export { checkAuthor, CheckAuthor, checkPageAuthor };
