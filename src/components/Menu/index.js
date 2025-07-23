import { matchPath } from '@/router/react-lazy-router-dom/matchPath.js';
import routesComponent from '@/router/routesComponent.js';
import config from './config';
import { mapTree, findTreePath } from '@/utils';
import { mapRedux } from '@/redux';

import { Menu } from 'antd';
import React, {
  forwardRef,
  memo,
  use,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import Spin from '@/components/Spin';

export default mapRedux()((props) => {
  const {
    match: { path, params: { id } = {} } = {},
    routePaths = {},
    pushRoute,
    location,
    dispatch: {
      common: {
        setMenuId,
        setMenuLoading,
        setTablePageSearchParams = () => {},
      } = {},
    } = {},
  } = props;
  const [selectedKeys, setSelectedKeys] = useState('-1');
  const [menuData, setMenuData] = useState([]);
  const [openKeys, setOpenKeys] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const goTo = useCallback((url) => {
    // params = {}, // 地址传参
    // query = {}, // get 传参
    pushRoute({
      url,
    });
  }, []);

  const getItems = useCallback((menuData, index = null) => {
    return menuData.map((item, _index) => {
      const menuKey = index === null ? _index : `${index}_${_index}`;
      const {
        title,
        iconComponent = null,
        children = [],
        url,
        authorKey,
        includePaths,
      } = item;
      // 获取组件的配置
      let { exact, path, strict, sensitive } =
        routesComponent.find((_item) => {
          return _item.path === item.url;
        }) || {};

      return {
        includePaths,
        authorKey,
        exact,
        path,
        strict,
        sensitive,
        url,
        label: title,
        key: `${menuKey}`,
        icon: iconComponent,
        children: children.length ? getItems(children, menuKey) : null,
      };
    });
  }, []);

  const getMenuData = async () => {
    setIsLoading(true);
    const data = await config(routePaths);
    let menuData = getItems(data);

    setMenuData(menuData);
    //

    // 等待请求完毕
    findMenuSelectedKey(menuData, (data) => {
      const { key, authorKey } = data;
      setSelectedKeys(key);

      let paths = findTreePath({
        treeData: menuData,
        value: key,
        valueKey: 'key',
      });

      setMenuId(authorKey);
      // setMenuLoading(false);
      setOpenKeys(paths.map((item) => item.key));
    });

    setIsLoading(false);
    setMenuLoading(false);
  };

  useEffect(() => {
    getMenuData();
  }, []);

  // const menuData = useMemo(
  //   async () => {
  //     return getItems(await config(routePaths));
  //   },
  //   [
  //     // routePaths
  //   ],
  // );

  const findMenuSelectedKey = useCallback((data, callback = () => {}) => {
    for (let item of data) {
      const {
        exact,
        strict,
        sensitive,
        children = [],
        includePaths = [],
        url,
      } = item;
      let menu = null;
      menu = matchPath(location.pathname, {
        path: url,
        exact: exact,
        strict: strict,
        sensitive: sensitive,
      });

      if (!menu) {
        for (let path of includePaths) {
          menu = matchPath(location.pathname, {
            path: path || url,
            exact: exact,
            strict: strict,
            sensitive: sensitive,
          });
          if (menu) {
            break;
          }
        }
      }

      if (menu) {
        callback({
          ...menu,
          ...item,
        });
      } else if (children && children.length) {
        findMenuSelectedKey(children, callback);
      }
    }
  }, []);

  useEffect(() => {
    // findMenuSelectedKey(menuData, (data) => {
    //   const { key, authorKey } = data;
    //   setSelectedKeys(key);
    //   let paths = findTreePath({
    //     treeData: menuData,
    //     value: key,
    //     valueKey: 'key',
    //   });
    //   setMenuId(authorKey);
    //   setOpenKeys(paths.map((item) => item.key));
    // });
    // setTimeout(() => {
    //   setMenuLoading(false);
    // }, 300);
  }, [menuData]);
  return (
    <Spin
      isLoading={isLoading}
      style={{
        height: '100%',
      }}>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[selectedKeys]}
        openKeys={openKeys}
        onOpenChange={(keyPath) => {
          setOpenKeys(keyPath);
        }}
        onSelect={(value) => {
          const {
            key: selectedKeys,
            keyPath,
            item: { props: { url, authorKey } = {} } = {},
          } = value;
          setSelectedKeys(selectedKeys);
          setOpenKeys(keyPath);
          setMenuId(authorKey);
          setTablePageSearchParams({});

          setTimeout(() => {
            goTo(url);
          }, 50);
        }}
        items={mapTree(menuData, (item) => {
          return {
            ...item,
            exact: undefined,
          };
        })}
        defaultSelectedKeys={[selectedKeys]}></Menu>
    </Spin>
  );
});
