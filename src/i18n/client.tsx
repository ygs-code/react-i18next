 

// 这里
import i18next from './i18next';
// import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
// import { useTranslation, Trans } from "react-i18next";

const runsOnServerSide = typeof window === 'undefined';
  


// 引入HOC高阶函数 withTranslation
//  i18n 的ts类型定义 WithTranslation  const Component: React.FC<WithTranslation> = (props) => {}
import {
    // withTranslation,
    // WithTranslation,
    useTranslation,
    Trans,
} from 'react-i18next';
// const { t } = useTranslation();
//   const { t } = props;

// 这个是客户端加载
/*
这个是客户端加载
useTranslation


 // 同时使用通用文本和表单专用文本  可以是数组
  const { t } = useTranslation(['common', 'contact_form']);

*/
export const useTranslations = (ns, options) => {
    const lng = i18next.language;

        // 从url中获取语言·
    // const lng = useParams()?.locale;

    // if (typeof lng !== 'string') {
    //     throw new Error('useT is only available inside /app/[locale]');
    // }

    // 如果是服务器
    if (runsOnServerSide && i18next.resolvedLanguage !== lng) {
        // 设置语言
        i18next.changeLanguage(lng);
    } else {
        // 如果是客户端
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [activeLng, setActiveLng] = useState(i18next.resolvedLanguage);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            // 异步加载语言
            if (activeLng === i18next.resolvedLanguage) {
                return;
            }
            setActiveLng(i18next.resolvedLanguage);
        }, [activeLng, i18next.resolvedLanguage]);

        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            if (!lng || i18next.resolvedLanguage === lng) {
                return;
            }
            i18next.changeLanguage(lng);
        }, [lng, i18next]);
    }

    // 如果没有加载过命名空间，则加载
    return useTranslation(ns, options);
};
