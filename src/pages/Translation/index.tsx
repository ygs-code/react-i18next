import { useTranslations } from '@/i18n';

import { Button, message, Rate, Tag } from 'antd';
import React, { Component, JSX } from 'react';
import { addRouterApi } from '@/router';

 

const Index = () => {
    const { t } = useTranslations('client-page');
    return (
        <>
             
             <h1>{t('h1')}</h1>
             <div>{t('title')}</div>

             <div>{t('welcome')}</div>
             <a href={t('blog.link')}> {t('blog.text')}</a>
 
            <Button>{t('to-client-page')}</Button>
            <Button>{t('to-second-page')}</Button>
   
        </>
    );
};

export default addRouterApi(Index);
