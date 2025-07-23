import { useTranslations } from '@/i18n';

import { Button, message, Rate, Tag } from 'antd';
import React, { Component, JSX } from 'react';
import { addRouterApi } from '@/router';

 


const Index = (props) => {
    const { routePaths, pushRoute } = props;
    const { t } = useTranslations('client-page');
    return (
        <>
             <div>{t('counter_one')}</div>
             <div>{t('counter_other')}</div>
             <div>{t('counter_zero')}</div>
             <h1>{t('h1')}</h1>
             <div>{t('title')}</div>

             <div>{t('to-second-client-page')}</div>

            <Button onClick={()=>{
                pushRoute('/');
            }}>{t('back-to-home')}</Button>
        </>
    );
};

export default addRouterApi(Index);
