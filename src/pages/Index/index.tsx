import { useTranslations } from '@/i18n';

import { Button, message, Rate, Tag } from 'antd';
import React, { Component, JSX } from 'react';
import { addRouterApi } from '@/router';

const Index = (props) => {
    const { routePaths, pushRoute } = props;
  

    const { t } = useTranslations('index');
    return (
        <>
            <h1
            
            className='bg-[red]  md:bg-[blue] '
            
            >{t('h1')}</h1>
            <div>{t('title')}</div>

            <div>{t('welcome')}</div>
            <a href={t('blog.link')}> {t('blog.text')}</a>

            <Button
                onClick={() => {
                    pushRoute(routePaths.clientPage);
                }}>
                {t('to-client-page')}
            </Button>
            <Button
                onClick={() => {
                    pushRoute(routePaths.secondPage);
                }}>
                {t('to-second-page')}
            </Button>
        </>
    );
};

export default addRouterApi(Index);
