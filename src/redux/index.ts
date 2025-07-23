import * as models from './models/index';
import { useDispatch, useSelector, connect } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import createConfigStore from './createConfigStore';

declare global {
  interface Window {
    __PRELOADED_STATE__?: any;
  }
}

const {
  NODE_ENV, // 环境参数
  WEB_ENV, // 环境参数
  DOMAIN_NAME,
  DOMAIN_MIDDLE,
} = process.env; // 环境参数

//   是否是测试开发环境
const isEnvDevelopment = NODE_ENV === 'development';

const isBrowser = () => {
  return typeof window !== 'undefined';
};

const { store, actions, dispatch, mapRedux } = createConfigStore({
  models,
  initialStates: {},
  asyncInitialStates: isBrowser() ? window.__PRELOADED_STATE__ : {},
  // applyMiddleware: isEnvDevelopment ? applyMiddleware(logger) : undefined,
  applyMiddleware: applyMiddleware(logger),
});

const {
  getState, // 服务端取值
  replaceReducer,
  subscribe,
} = store;

export {
  useSelector,
  useDispatch,
  getState, // 服务端取值
  replaceReducer,
  subscribe,
  actions, // actions
  dispatch, // 服务端组件更新reudx
  createConfigStore,
  mapRedux,
};
export default store;
