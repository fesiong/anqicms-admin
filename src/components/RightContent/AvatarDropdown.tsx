import { removeStore } from '@/utils/store';
import { GroupOutlined, LogoutOutlined, ProfileOutlined, UserOutlined } from '@ant-design/icons';
import { FormattedMessage, history, useModel } from '@umijs/max';
import { Menu, Spin } from 'antd';
import type { MenuInfo } from 'rc-menu/lib/interface';
import React, { useCallback } from 'react';
import HeaderDropdown from '../HeaderDropdown';
import './index.less';

export type GlobalHeaderRightProps = {
  menu?: boolean;
};

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({ menu }) => {
  const { initialState, setInitialState } = useModel('@@initialState');

  const onMenuClick = useCallback(
    (event: MenuInfo) => {
      const { key } = event;
      if (key === 'logout') {
        setInitialState((s) => ({ ...s, currentUser: undefined }));
        removeStore('adminToken');
        history.replace({
          pathname: '/login',
        });
        return;
      }
      if (!key) {
        history.push(`/account/index`);
        return;
      }
      history.push(`/account/${key}`);
    },
    [setInitialState],
  );

  const loading = (
    <span className={`action account`}>
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    </span>
  );

  if (!initialState) {
    return loading;
  }

  const { currentUser } = initialState;

  if (!currentUser || !currentUser.user_name) {
    return loading;
  }

  const menuHeaderDropdown = (
    <Menu className="menu" selectedKeys={[]} onClick={onMenuClick}>
      {menu && (
        <Menu.Item key="">
          <UserOutlined />
          <FormattedMessage id="component.right-content.admin-info" />
        </Menu.Item>
      )}
      <Menu.Item key="logs/login">
        <GroupOutlined />
        <FormattedMessage id="component.right-content.login-log" />
      </Menu.Item>
      <Menu.Item key="logs/action">
        <ProfileOutlined />
        <FormattedMessage id="component.right-content.action-log" />
      </Menu.Item>
      {menu && <Menu.Divider />}

      <Menu.Item key="logout">
        <LogoutOutlined />
        <FormattedMessage id="component.right-content.logout" />
      </Menu.Item>
    </Menu>
  );
  return (
    <HeaderDropdown overlay={menuHeaderDropdown}>
      <span className={`action account`}>
        <span className={`name anticon`}>{currentUser.user_name}</span>
      </span>
    </HeaderDropdown>
  );
};

export default AvatarDropdown;
