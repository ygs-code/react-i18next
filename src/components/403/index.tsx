import React from 'react';
import { Button, Result } from 'antd';
import { addRouterApi } from '@/router';
const App: React.FC = (props) => {
  const { pushRoute } = props;

  return (
    <Result
      status="403"
      title="403"
      subTitle="抱歉你没有权限访问此页面"
      extra={
        <Button
          type="primary"
          onClick={() => {
            pushRoute({ pathname: '/' });
          }}>
          返回首页
        </Button>
      }
    />
  );
};

export default addRouterApi(App);
