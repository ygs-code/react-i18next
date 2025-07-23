import { useTranslations } from '@/i18n';

import { Button, message, Rate, Tag } from 'antd';
import React, { Component, JSX } from 'react';
import { addRouterApi } from '@/router';

 

const Index = () => {
    const { t } = useTranslations('second-page');
    return (
        <>
             
             <h1>{t('h1')}</h1>
             <div>{t('title')}</div>

             <div>{t('to-second-client-page')}</div>
 
            <Button>{t('back-to-home')}</Button>
        </>
    );
};

export default addRouterApi(Index);
