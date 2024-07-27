import { history, useIntl, useModel } from '@umijs/max';
import { Menu } from 'antd';
import React from 'react';
import routes from '../../../config/routes';
import './index.less';

const GlobalHeaderContent: React.FC = (props) => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const intl = useIntl();

  const getSelectKey = () => {
    let selectPath = history.location.pathname;
    if (selectPath.indexOf('/system') === 0) {
      // 截取/system 之后的字符
      selectPath = selectPath.substring(7);
    }
    for (let i in routes) {
      if (routes[i].path && selectPath.indexOf(routes[i].path) === 0) {
        return i;
      }
    }

    return '';
  };

  const selectKey: string = getSelectKey();

  if (!initialState || !initialState.settings) {
    return null;
  }

  const onClickMenu = async (current: any) => {
    // preview单独处理
    if (current.key == '/preview') {
      let baseUrl = '';
      if (!initialState.system) {
        const system = await initialState?.fetchSystemSetting?.();
        if (system) {
          await setInitialState((s) => ({
            ...s,
            system: system,
          }));
        }
        baseUrl = system?.base_url || '';
      } else {
        baseUrl = initialState.system?.base_url || '';
      }
      window.open(baseUrl);
      return;
    }
    history.push(current.key);
  };

  let permissions = initialState?.currentUser?.group?.setting?.permissions || [];
  const headerMenu = routes.reduce((pre: any, cur: any) => {
    if (!cur.hideInTop && cur.name) {
      let path = cur.path;
      if (cur.routes) {
        path = cur.routes[0].path;
        for (let j in cur.routes) {
          if (permissions.indexOf(cur.routes[j].path) !== -1) {
            path = cur.routes[j].path;
            break;
          }
        }
      }

      if (permissions.length > 0) {
        for (let j in permissions) {
          if (permissions[j].indexOf(cur.path) === 0) {
            pre.push({
              key: path,
              label: intl.formatMessage({ id: 'menu.' + cur.name }),
            });
            break;
          }
        }
      } else {
        pre.push({
          key: path,
          label: intl.formatMessage({ id: 'menu.' + cur.name }),
        });
      }
    }
    return pre;
  }, []);

  return (
    <div className="header-nav">
      <Menu
        onClick={onClickMenu}
        selectedKeys={[selectKey]}
        mode="horizontal"
        items={headerMenu}
      ></Menu>
    </div>
  );
};
export default GlobalHeaderContent;
