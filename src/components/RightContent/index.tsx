import { anqiLogin, anqiRestart, checkAnqiInfo, getSiteInfo } from '@/services';
import {
  GlobalOutlined,
  LockOutlined,
  QuestionCircleOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { LoginForm, ProFormText } from '@ant-design/pro-components';
import {
  FormattedMessage,
  SelectLang as UmiSelectLang,
  useIntl,
  useModel,
} from '@umijs/max';
import { Badge, Button, Modal, Space, Tag, Tooltip, message } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import HeaderSearch from '../HeaderSearch';
import Avatar from './AvatarDropdown';
import './index.less';

export type SiderTheme = 'light' | 'dark';

const GlobalHeaderRight: React.FC = () => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const [visible, setVisible] = useState<boolean>(false);
  const [detailVisible, setDetailVisible] = useState<boolean>(false);
  const [orderVisible, setOrderVisible] = useState<boolean>(false);
  const [aiChatVisible, setAiChatVisible] = useState<boolean>(false);
  const [code] = useState<number>(0);
  const [errorMsg] = useState<string>('');
  const [siteInfo, setSiteInfo] = useState<any>({});
  const intl = useIntl();

  const initSiteInfo = async () => {
    getSiteInfo({}).then((res) => {
      setSiteInfo(res?.data || {});
    });
  };

  useEffect(() => {
    initSiteInfo();
  }, []);

  if (!initialState || !initialState.settings) {
    return null;
  }

  const { navTheme, layout } = initialState.settings;
  let className = 'right';
  const anqiUser = initialState.anqiUser;

  if ((navTheme === 'realDark' && layout === 'top') || layout === 'mix') {
    className = `right  dark`;
  }

  const handleSubmit = async (values: any) => {
    const res = await anqiLogin(values);
    if (res.code !== 0) {
      message.error(res.msg);
      return;
    }
    message.success(
      res.msg ||
        intl.formatMessage({ id: 'component.right-content.login.success' }),
    );
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
    setDetailVisible(true);
  };

  const handleLoginNew = () => {
    setDetailVisible(false);
    setVisible(true);
  };

  const handleOrderVip = () => {
    setOrderVisible(true);
    window.open('https://www.anqicms.com/account/vip');
  };

  const reloadAccount = async () => {
    setOrderVisible(false);
    checkAnqiInfo({})
      .then(async (res) => {
        await setInitialState((s) => ({
          ...s,
          anqiUser: res.data,
        }));
      })
      .catch(() => {});
  };

  const confirmRestart = () => {
    Modal.confirm({
      title: intl.formatMessage({
        id: 'component.right-content.restart.confirm',
      }),
      content: intl.formatMessage({
        id: 'component.right-content.restart.confirm.content',
      }),
      onOk: () => {
        const hide2 = message.loading(
          intl.formatMessage({ id: 'component.right-content.restart.doing' }),
          0,
        );
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

  const handleOpenAiChat = () => {
    setAiChatVisible(true);
  };

  return (
    <>
      <Space className={className}>
        <HeaderSearch
          placeholder={intl.formatMessage({
            id: 'component.right-content.search.placeholder',
          })}
        />
        {anqiUser?.auth_id > 0 ? (
          <span className="site-info-item action" onClick={showDetail}>
            {anqiUser.user_name}
            {anqiUser.is_owe_fee === 1 && <Badge dot />}
          </span>
        ) : (
          <a
            className="site-info-item action"
            onClick={() => {
              setVisible(true);
            }}
          >
            <FormattedMessage id="component.right-content.bind.account" />
            <Badge dot />
          </a>
        )}
        <a
          href={siteInfo.base_url}
          target={'_blank'}
          className="site-info-item action"
          rel="noreferrer"
        >
          <GlobalOutlined style={{ marginRight: 5 }} />
          {siteInfo.name || siteInfo.base_url}
        </a>
        <span
          style={{ fontSize: 18 }}
          className="action"
          onClick={() => {
            window.open('https://www.anqicms.com/');
          }}
        >
          <QuestionCircleOutlined />
        </span>
        <UmiSelectLang />
        <Avatar menu />
        <div className="restart" onClick={confirmRestart}>
          <FormattedMessage id="component.right-content.restart" />
        </div>
      </Space>

      {/* AI Chat Floating Button */}
      <div className="ai-chat" onClick={handleOpenAiChat}>
        <svg
          className="ai-icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          width="128"
          height="128"
        >
          <path
            d="M521.47 859.38c-63.86 0-127.41-8.29-189.15-24.55h-125.9c-15.16 0.1-29.61-6.37-39.51-17.78s-14.35-26.57-12.23-41.63l14.25-100.74c-22.94-37.49-36.48-96.5-40.32-176.02-10.1-183.8 109.23-349.81 286.76-398.71 39-9.9 79.22-14.85 119.43-14.65 118.52 0 217.64 37.08 286.56 107.51s107.71 176.52 106.09 294.64c-0.3 57.39-12.93 114.08-37.08 166.11-80.22 167.63-239.97 205.62-368.9 205.82z m-308.48-82.35h121.15c4.75 0 9.4 0.61 13.94 1.92 38.6 10.61 372.24 96.5 489.75-149.54 20.61-44.66 31.42-93.26 31.83-142.37 1.92-102.46-29.91-192.99-89.52-253.01s-140.45-90.74-245.23-90.74c-35.36-0.2-70.63 4.04-104.98 12.73-150.75 41.93-252 183.19-243.31 339.4 3.23 70.02 14.65 121.96 32.84 149.95 6.47 9.7 9.19 21.42 7.48 33.04l-13.95 98.62z"
            fill="#ffffff"
          ></path>
          <path
            d="M540.57 574.74l-13.14-34.76H415.18l-13.34 35.26c-3.23 9.8-7.58 19.2-13.14 27.99-4.34 5.25-11.11 7.98-17.99 7.38-7.17 0.2-14.25-2.63-19.3-7.68a23.851 23.851 0 0 1-8.08-17.58c0.1-3.94 0.71-7.78 1.92-11.62 1.31-4.04 3.23-9.7 6.16-16.77l70.83-179.45c1.92-5.25 4.45-11.42 7.17-19.3 2.32-6.37 5.36-12.33 9.09-17.99 3.23-4.85 7.48-8.79 12.53-11.62 17.48-10.41 40.01-5.36 51.53 11.42 3.23 4.65 5.96 9.6 8.08 14.85l8.49 21.42 72.25 178.44c5.05 9.4 8.29 19.7 9.7 30.31-0.1 6.77-2.93 13.14-7.88 17.78-5.05 5.15-12.02 7.98-19.3 7.88-3.94 0.1-7.78-0.71-11.42-2.32-3.03-1.52-5.76-3.64-7.88-6.37-2.83-3.84-5.05-8.08-6.77-12.53-3.32-5.44-4.73-10.49-7.26-14.74z m-110.74-77.19h82.35l-41.53-114.08-40.82 114.08z m213.8 78.91V358.82a36.171 36.171 0 0 1 7.68-25.26c4.95-5.46 11.92-8.59 19.3-8.49 7.68-0.3 15.16 2.73 20.41 8.29 5.66 7.17 8.49 16.27 7.68 25.46v217.64c0.81 9.19-2.02 18.39-7.68 25.66-5.25 5.66-12.73 8.79-20.41 8.49-7.38 0-14.35-3.03-19.3-8.49-5.66-7.27-8.39-16.36-7.68-25.66z"
            fill="#ffffff"
          ></path>
        </svg>
      </div>

      <Modal
        open={visible}
        onCancel={() => {
          setVisible(false);
        }}
        maskClosable={false}
        footer={null}
      >
        <LoginForm
          title={intl.formatMessage({
            id: 'component.right-content.bind.account.name',
          })}
          subTitle={
            <div>
              <FormattedMessage id="component.right-content.bind.account.tips" />
            </div>
          }
          message={
            code !== 0
              ? errorMsg ||
                intl.formatMessage({
                  id: 'component.right-content.bind.account.error',
                })
              : null
          }
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
            placeholder={intl.formatMessage({
              id: 'component.right-content.username',
            })}
            rules={[
              {
                required: true,
                message: intl.formatMessage({
                  id: 'component.right-content.username.required',
                }),
              },
            ]}
          />
          <ProFormText.Password
            name="password"
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined />,
            }}
            placeholder={intl.formatMessage({
              id: 'component.right-content.password',
            })}
            rules={[
              {
                required: true,
                message: intl.formatMessage({
                  id: 'component.right-content.password.required',
                }),
              },
            ]}
          />
          <div
            style={{
              paddingBottom: 24,
              textAlign: 'right',
            }}
          >
            <a
              href="https://www.anqicms.com/register"
              target={'_blank'}
              rel="nofollow noreferrer"
            >
              <FormattedMessage id="component.right-content.register" />
            </a>
          </div>
        </LoginForm>
      </Modal>
      <Modal
        open={detailVisible}
        onCancel={() => {
          setDetailVisible(false);
        }}
        width={700}
        title={
          <div>
            <Tooltip
              title={
                <Space>
                  <Button
                    onClick={() => {
                      handleLoginNew();
                    }}
                  >
                    <FormattedMessage id="component.right-content.switch-account" />
                  </Button>
                </Space>
              }
            >
              {intl.formatMessage({ id: 'component.right-content.account' })}
            </Tooltip>
          </div>
        }
        maskClosable={false}
        footer={null}
      >
        {anqiUser?.valid ? (
          <div>
            <p>
              <FormattedMessage id="component.right-content.hello" />
              {anqiUser.user_name ||
                intl.formatMessage({ id: 'component.right-content.friend' })}
              <FormattedMessage id="component.right-content.welcome" />
            </p>
            <div className="account-info">
              <div className="item">
                <label>
                  <FormattedMessage id="component.right-content.auth-id" />
                </label>
                <div>{anqiUser.auth_id}</div>
              </div>
              <div className="item">
                <label>
                  <FormattedMessage id="component.right-content.account-name" />
                </label>
                <div>{anqiUser.user_name}</div>
              </div>
              <div className="item">
                <label>
                  <FormattedMessage id="component.right-content.expire-time" />
                </label>
                <Space>
                  <span>
                    {dayjs(anqiUser.expire_time * 1000).format('YYYY-MM-DD')}
                  </span>
                  {anqiUser.valid === false && (
                    <Tag color="red">
                      {intl.formatMessage({
                        id: 'component.right-content.invalid',
                      })}
                    </Tag>
                  )}
                </Space>
              </div>
              <div className="item">
                <label>
                  <FormattedMessage id="component.right-content.integral" />
                </label>
                <div>{anqiUser.integral}</div>
              </div>
              <div className="item">
                <label>
                  <FormattedMessage id="component.right-content.free-token" />
                </label>
                <Space direction="vertical">
                  <div>{anqiUser.free_token}</div>
                  <div className="text-muted">
                    <FormattedMessage id="component.right-content.free_token.description" />
                  </div>
                </Space>
              </div>
              <div className="item">
                <label>
                  <FormattedMessage id="component.right-content.total-token" />
                </label>
                <Space direction="vertical">
                  <div>{anqiUser.total_token}</div>
                  <div className="text-muted">
                    <FormattedMessage id="component.right-content.total-token.description" />
                  </div>
                </Space>
              </div>
              <div className="item">
                <label>
                  <FormattedMessage id="component.right-content.un-pay-token" />
                </label>
                <Space>
                  <span>{anqiUser.un_pay_token}</span>
                  {anqiUser.is_owe_fee === 1 && (
                    <Tag color="red">
                      <FormattedMessage id="component.right-content.is-owe-fee" />
                    </Tag>
                  )}
                </Space>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <p>
              <FormattedMessage id="component.right-content.vip-tips" />
            </p>
            <p>
              <span className="optional">*</span>
              <FormattedMessage id="component.right-content.download-prefix" />
              <a
                href="https://www.anqicms.com/anqibox.html"
                target="_blank"
                rel="noreferrer"
              >
                <FormattedMessage id="component.right-content.download-name" />
              </a>
            </p>
            <p>
              <FormattedMessage id="component.right-content.vip-prefix" />
              <a
                href="https://www.anqicms.com/account/vip"
                target="_blank"
                rel="noreferrer"
              >
                <FormattedMessage id="component.right-content.vip-name" />
              </a>
              <FormattedMessage id="component.right-content.vip-suffix" />
            </p>
          </div>
        )}
        {anqiUser && (
          <div className="account-info">
            <div className="item">
              <label>
                <FormattedMessage id="component.right-content.account-name" />
              </label>
              <div>{anqiUser.user_name}</div>
            </div>
            {anqiUser?.valid && (
              <>
                <div className="item">
                  <label>
                    <FormattedMessage id="component.right-content.auth-id" />
                  </label>
                  <div>{anqiUser.auth_id}</div>
                </div>
                <div className="item">
                  <label>
                    <FormattedMessage id="component.right-content.expire-time" />
                  </label>
                  <Space>
                    <span>
                      {dayjs(anqiUser.expire_time * 1000).format('YYYY-MM-DD')}
                    </span>
                    {anqiUser.valid === false && (
                      <Tag color="red">
                        {intl.formatMessage({
                          id: 'component.right-content.invalid',
                        })}
                      </Tag>
                    )}
                  </Space>
                </div>
              </>
            )}
            <div className="item">
              <label>
                <FormattedMessage id="component.right-content.integral" />
              </label>
              <div>{anqiUser.integral}</div>
            </div>
            <div className="item">
              <label>
                <FormattedMessage id="component.right-content.free-token" />
              </label>
              <Space direction="vertical">
                <div>{anqiUser.free_token}</div>
                <div className="text-muted">
                  <FormattedMessage id="component.right-content.free_token.description" />
                </div>
              </Space>
            </div>
            <div className="item">
              <label>
                <FormattedMessage id="component.right-content.total-token" />
              </label>
              <Space direction="vertical">
                <div>{anqiUser.total_token}</div>
                <div className="text-muted">
                  <FormattedMessage id="component.right-content.total-token.description" />
                </div>
              </Space>
            </div>
            <div className="item">
              <label>
                <FormattedMessage id="component.right-content.un-pay-token" />
              </label>
              <Space>
                <span>{anqiUser.un_pay_token}</span>
                {anqiUser.is_owe_fee === 1 && (
                  <Tag color="red">
                    <FormattedMessage id="component.right-content.is-owe-fee" />
                  </Tag>
                )}
              </Space>
            </div>
          </div>
        )}
        <div className="order-control">
          <Space align="center">
            <Button
              onClick={() => {
                setDetailVisible(false);
              }}
            >
              <FormattedMessage id="component.close" />
            </Button>
            <Button type="primary" onClick={handleOrderVip}>
              <FormattedMessage id="component.right-content.order" />
            </Button>
          </Space>
        </div>
      </Modal>
      <Modal
        open={orderVisible}
        onCancel={() => {
          setOrderVisible(false);
        }}
        title={intl.formatMessage({
          id: 'component.right-content.order.confirm',
        })}
        maskClosable={false}
        footer={null}
      >
        <div className="order-control">
          <Space align="center">
            <Button onClick={reloadAccount}>
              <FormattedMessage id="component.close" />
            </Button>
            <Button type="primary" onClick={reloadAccount}>
              <FormattedMessage id="component.right-content.update" />
            </Button>
          </Space>
        </div>
      </Modal>

      <Modal
        open={aiChatVisible}
        onCancel={() => setAiChatVisible(false)}
        title={intl.formatMessage({ id: 'component.ai-chat.title' })}
        footer={[
          <Button key="close" onClick={() => setAiChatVisible(false)}>
            <FormattedMessage id="component.close" />
          </Button>,
        ]}
      >
        <div style={{ textAlign: 'center', padding: '20px 0' }}>
          <p>{intl.formatMessage({ id: 'component.ai-chat.tips' })}</p>
        </div>
      </Modal>
    </>
  );
};
export default GlobalHeaderRight;
