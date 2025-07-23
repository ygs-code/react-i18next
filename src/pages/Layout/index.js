import { Skeleton } from 'antd';
import Layout from '@/components/Layout';
import Spin from '@/components/Spin';

import { mapRedux } from '@/redux';
import Routers, { addRouterApi } from '@/router';
import React, { useCallback, useEffect, useState } from 'react';
 

const Index = (props) => {
  const {
    dispatch: { user: { setUserInfo } = {} } = {},
    pushRoute,
    routePaths,
  } = props;

  const { history } = props;
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    
      setLoading(false);
    
  }, []);
  return loading ? (
    <Spin isLoading={loading} style={{ height: '100%' }}>
      {' '}
    </Spin>
  ) : (
    <Layout>
      <Routers level={2} history={history} />
    </Layout>
  );
};

export default mapRedux()(addRouterApi(Index));
