import { Button, message, Modal, Space } from 'antd';
import { LockOutlined, QuestionCircleOutlined, UserOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { useModel } from 'umi';
import Avatar from './AvatarDropdown';
import styles from './index.less';
import { LoginForm, ProFormText } from '@ant-design/pro-form';
import { anqiLogin, anqiRestart } from '@/services';
import moment from 'moment';

export type SiderTheme = 'light' | 'dark';

const GlobalHeaderRight: React.FC = () => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const [visible, setVisible] = useState<boolean>(false);
  const [code] = useState<number>(0);
  const [errorMsg] = useState<string>('');

  if (!initialState || !initialState.settings) {
    return null;
  }

  const { navTheme, layout } = initialState.settings;
  let className = styles.right;
  const anqiUser = initialState.anqiUser;

  if ((navTheme === 'dark' && layout === 'top') || layout === 'mix') {
    className = `${styles.right}  ${styles.dark}`;
  }

  const handleSubmit = async (values: any) => {
    const res = await anqiLogin(values);
    if (res.code !== 0) {
      message.error(res.msg);
      return;
    }
    message.success(res.msg || '登录成功');
    setVisible(false);
    const user = await initialState.fetchAnqiUser?.();
    if (user) {
      await setInitialState((s) => ({
        ...s,
        anqiUser: user,
      }));
    }
  };

  const showDetail = () => {
    Modal.info({
      title: '账号信息',
      icon: false,
      content: (
        <div>
          <p>用户ID：{anqiUser.auth_id}</p>
          <p>用户名：{anqiUser.user_name}</p>
          <p>登录时间：{moment(anqiUser.login_time * 1000).format('yyyy-MM-DD HH:MM')}</p>
        </div>
      ),
    });
  };

  const confirmRestart = () => {
    Modal.confirm({
      title: '重启 AnqiCMS',
      content: '您即将要重启 AnqiCMS，重启期间网站会有短暂的时间无法打开。确定要继续吗？',
      okText: '重启',
      onOk: () => {
        const hide2 = message.loading('正在重新启动中', 0);
        anqiRestart({})
          .then(() => {})
          .catch(() => {})
          .finally(() => {
            setTimeout(() => {
              hide2();
              window.location.reload();
            }, 3000);
          });
      },
    });
  };

  return (
    <>
      <Space className={className}>
        {anqiUser?.auth_id > 0 ? (
          <Button onClick={showDetail}>{anqiUser.user_name}</Button>
        ) : (
          <Button
            onClick={() => {
              setVisible(true);
            }}
          >
            绑定安企账号
          </Button>
        )}
        <span
          style={{ fontSize: 20 }}
          className={styles.action}
          onClick={() => {
            window.open('https://www.anqicms.com/');
          }}
        >
          <QuestionCircleOutlined />
        </span>
        <Avatar menu />
        <div className={styles.restart} onClick={confirmRestart}>
          重启
        </div>
      </Space>

      <Modal
        visible={visible}
        onCancel={() => {
          setVisible(false);
        }}
        maskClosable={false}
        footer={null}
      >
        <LoginForm
          title="绑定安企CMS官网账号"
          subTitle={
            <div>
              AnqiCMS部分功能依赖于官网，绑定仅限于为您提供更好的服务体验
              <br />
              不涉及您网站任何敏感信息，请放心使用。
            </div>
          }
          message={code !== 0 ? errorMsg || '账户或密码错误' : null}
          onFinish={async (values) => {
            await handleSubmit(values);
          }}
        >
          <ProFormText
            name="user_name"
            fieldProps={{
              size: 'large',
              prefix: <UserOutlined />,
            }}
            placeholder="用户名"
            rules={[
              {
                required: true,
                message: '请输入用户名!',
              },
            ]}
          />
          <ProFormText.Password
            name="password"
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined />,
            }}
            placeholder="密码"
            rules={[
              {
                required: true,
                message: '请输入密码！',
              },
            ]}
          />
          <div
            style={{
              paddingBottom: 24,
              textAlign: 'right',
            }}
          >
            <a href="https://www.anqicms.com/register" target={'_blank'} rel="nofollow">
              未有账号，免费注册
            </a>
          </div>
        </LoginForm>
      </Modal>
    </>
  );
};
export default GlobalHeaderRight;
