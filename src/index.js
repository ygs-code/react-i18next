/*
 * @Date: 2022-08-04 09:21:17
 * @Author: Yao guan shou
 * @LastEditors: Yao guan shou
 * @LastEditTime: 2022-08-16 19:12:21
 * @FilePath: /react-ssr-lazy-loading/@/index.js
 * @Description:
 */
import store from '@/redux';

import { getBrowserHistory } from '@/router/history';

import routesComponent from '@/router/routesComponent';
import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';

import App from './App/index.js';

import getLastEvent from '@/utils/getLastEvent';
import getSelector from '@/utils/getSelector';
import getStackLines from '@/utils/getStackLines';

// 如果是开发环境 先拷贝 服务器文件到 dist
let {
  RENDER, // 环境参数
} = process.env; // 环境参数

const isSsr = RENDER === 'ssr';

const renderApp = (App) => {
  const history = getBrowserHistory();

  if (isSsr && !module.hot) {
    return hydrateRoot(
      document.getElementById('root'),
      <App
        {...{
          history,
          store,
          routesComponent,
        }}
      />,
    );
  } else {
    const $root = createRoot(document.getElementById('root'));
    $root.render(
      <App
        {...{
          history,
          store,
          routesComponent,
        }}
      />,
    );

    return $root;
  }
};

// node 服务器中只能在这个页面使用window
window.main = () => {
  // preloadReady().then(() => {
  window.$root = renderApp(App);
  // });
};

// 监听热更新
if (module.hot) {
  module.hot.accept((err) => {
    if (err) {
      console.error('Cannot apply hot update.', err);
    }
  });
  if (window.$root) {
    /* eslint-disable */
    let App = require('./App').default;

    renderApp(App);
  }
}

// if (module.hot) {
//   // accept 函数的第一个参数指出当前文件接受哪些子模块的替换，这里表示只接受 ./AppComponent 这个子模块
//   // 第2个参数用于在新的子模块加载完毕后需要执行的逻辑
//   module.hot.accept(
//     // ["./App/index.js"],
//     () => {
//       // 新的 AppComponent 加载成功后重新执行下组建渲染逻辑
//       // let App = require('./App').default;
//       // renderApp(App);
//       //   ReactDOM.render(<App />, document.getElementById('root'));
//     });
// }

// window.store = store;

// // 监听全局未捕获的错误
// window.addEventListener(
//   'error',
//   (event,...ags) => {

//     console.log('ags===',ags)

//     console.log('error+++++++++++', event);
//     let lastEvent = getLastEvent(); // 获取到最后一个交互事件


//     let message = {};


//     // 脚本加载错误
//     if (event.target && (event.target.src || event.target.href)) {
//       message = {
//         kind: 'stability', // 监控指标的大类，稳定性
//         type: 'error', // 小类型，这是一个错误
//         errorType: 'resourceError', // js执行错误
//         filename: event.target.src || event.target.href, // 哪个文件报错了
//         tagName: event.target.tagName,
//         selector: getSelector(event.target), // 代表最后一个操作的元素
//       };
//     } else {
    
//       console.log('event.message==', event.message);
//       console.log(' event.filename==',  event.filename);
//       console.log('position==', `${event.lineno}:${event.colno}`);
//       console.log('event.error.stack==', event.error.stack);
//       console.log('lastEvent.path==', lastEvent.path);
//       console.log('lastEvent==', lastEvent);
  
  
//       message = {
//         kind: 'stability', // 监控指标的大类，稳定性
//         type: 'error', // 小类型，这是一个错误
//         errorType: 'jsError', // js执行错误
//         message: event.message, // 报错信息
//         filename: event.filename, // 哪个文件报错了
//         position: `${event.lineno}:${event.colno}`, // 报错的行列位置
//         stack: getStackLines(event.error.stack || ''),
//         selector: lastEvent ? getSelector(lastEvent.path) : '', // 代表最后一个操作的元素
//       };


//     }

//     console.log('message error1====', message);
//   },
//   true,
// );

// window.addEventListener(
//   'unhandledrejection',
//   (event) => {
//     console.log('unhandledrejection-------- ', event);
//     let lastEvent = getLastEvent(); // 获取到最后一个交互事件
//     let message;
//     let filename;
//     let line = 0;
//     let column = 0;
//     let stack = '';
//     let reason = event.reason;


//     const error = event.reason;
//     if (error && error.name === 'ChunkLoadError') {
//       console.error('捕获到 Chunk 加载失败：', error);
//       // 你可以在这里做上报、刷新页面、重试等处理
//     }
//     message = reason;
//     if (typeof reason === 'string') {
//       message = reason;

//       console.log('string=====')

//     } else if (typeof reason === 'object') {
//       console.log('object=====')

//       message = reason.message;

//       console.log('reason.message=====' ,reason.message)
//       console.log('reason.stack=====' ,reason.stack)


//       if (reason.stack) {
//         let matchResult = reason.stack.match(/at\s+(.+):(\d+):(\d+)/);

//         console.log('matchResult===',matchResult)

//         filename = matchResult[1];
//         line = matchResult[2];
//         column = matchResult[3];
//       }


//       console.log('reason.stack===',reason.stack)

//       stack = getStackLines(reason.stack);


//       console.log('stack 22222==',stack)

//     }



//     console.log('message===', message);
 
//     console.log('position===', `${line}:${column}`);

//     let errorMessage = {
//       kind: 'stability', // 监控指标的大类，稳定性
//       type: 'error', // 小类型，这是一个错误
//       errorType: 'promiseError', // js执行错误
//       message, // 报错信息
//       filename, // 哪个文件报错了
//       position: `${line}:${column}`, // 报错的行列位置
//       stack,
//       selector: lastEvent ? getSelector(lastEvent.path) : '', // 代表最后一个操作的元素
//     };

//     console.log('message error2====', errorMessage);
//   },
//   true,
// );
