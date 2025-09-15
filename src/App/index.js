/*
 * @Date: 2022-08-05 09:22:30
 * @Author: Yao guan shou
 * @LastEditors: Yao guan shou
 * @LastEditTime: 2022-08-16 19:07:47
 * @FilePath: /react-ssr-lazy-loading/@/App/App.js
 * @Description:
 */
// import "antd/dist/antd.css";
import './index.scss';
// import "@/static/css/katex/katex.css";
// import "./index.css";
import '@/assets/css/base.scss';
import "@/assets/css/tailwind.css";

import { ConfigProvider, Modal, Button } from 'antd';
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from 'antd/es/locale/zh_CN';
import Routers from '@/router';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
// import { getToken, getVersion } from '@/apis';
// import { token } from '@/apis/request';
import RoutesComponentProvider from '@/router/RoutesComponentProvider.js';
import { I18nextProvider } from 'react-i18next';
import { LocalStorage } from '@/storage';
import { i18next } from '@/i18n';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import 'dayjs/locale/zh-hk';
import 'dayjs/locale/en';

// import 'tailwindcss/tailwind.css';
// let {
//   NODE_ENV, // 环境参数
//   HTML_WEBPACK_PLUGIN_OPTIONS = ""
// } = process.env; // 环境参数

class Index extends Component {
    init = async () => {
        // const {history, staticContext} = this.props;
        // const {
        //   data: { version },
        // } = await getVersion();

        // LocalStorage.setItem('version', version);

        this.unlisten = history.listen(async ({ location }) => {
            // let {
            //   data: { version },
            // } = await getVersion();
            // const oldVersion = LocalStorage.getItem('version');
            // if (oldVersion && version && oldVersion !== version) {
            //   // 如果版本号不一致，清除缓存
            //   Modal.confirm({
            //     title: '提示',
            //     content: '网站版本有更新，请点击刷新',
            //     onOk: () => {
            //       window.location.reload(true);
            //     },
            //     footer: (_, { OkBtn, CancelBtn }) => (
            //       <>
            //         {/* <Button>Custom Button</Button> */}
            //         {/* <CancelBtn /> */}
            //         <OkBtn> 确认 </OkBtn>
            //       </>
            //     ),
            //   });
            // }
            // LocalStorage.setItem('version', version);
        });
    };
    componentDidMount() {
        const { history, store, routesComponent } = this.props;
        // const mapLanguage: { [key: string]: string } = {
        //   zh: 'zh-cn',
        //   en: 'en',
        //   hk: 'zh-hk'
        // };
        dayjs.locale('zh-cn');
        // dayjs.extend(updateLocale);
        // dayjs.updateLocale('zh-cn', {
        //   weekStart: 0,
        // });
        // token.get().then((value) => {
        //   if (!value) {
        //     getToken();
        //   }
        // });
        this.init();
    }

    render() {
        const { history, store, routesComponent } = this.props;

        const defaultData = {
            borderRadius: 6,
            colorPrimary: '#d4a767',
        };

        /*
  Warning: Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported.
  来自Provider组件
  */
        return (
            <Provider store={store}>
                <I18nextProvider i18n={i18next}>
                    <ConfigProvider
                        theme={{
                            token: {
                                colorPrimary: defaultData.colorPrimary,
                                borderRadius: defaultData.borderRadius,
                            },
                        }}
                        locale={zhCN}>
                        <RoutesComponentProvider value={routesComponent}>
                            <Routers level={1} history={history} routesComponent={routesComponent} />
                        </RoutesComponentProvider>
                    </ConfigProvider>
                </I18nextProvider>
            </Provider>
        );
    }
    componentDidCatch(error, info) {
        // 只能捕获子组件的渲染错误
        /*
    异步代码中的错误（如 setTimeout、fetch）
    事件处理器中的错误（如 onClick）
    服务端渲染错误
    错误边界组件本身的错误
    */
        console.error('Error：', error);
        console.error('错误发生的文件栈：', info.componentStack);
    }
}

// Index.propTypes = {
//     location: PropTypes.string,
//     store: PropTypes.object,
//     history: PropTypes.object,
//     dispatch: PropTypes.func,
//     state: PropTypes.object,
// };

export default Index;
