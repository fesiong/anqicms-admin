import { anqiLogin, anqiRestart, checkAnqiInfo, getSiteInfo } from '@/services';
import {
  GlobalOutlined,
  LockOutlined,
  QuestionCircleOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { LoginForm, ProFormText } from '@ant-design/pro-components';
import { FormattedMessage, SelectLang as UmiSelectLang, useIntl, useModel } from '@umijs/max';
import { Button, Modal, Space, message } from 'antd';
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
    message.success(res.msg || intl.formatMessage({ id: 'component.right-content.login.success' }));
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
      title: intl.formatMessage({ id: 'component.right-content.restart.confirm' }),
      content: intl.formatMessage({ id: 'component.right-content.restart.confirm.content' }),
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

  return (
    <>
      <Space className={className}>
        <HeaderSearch
          placeholder={intl.formatMessage({ id: 'component.right-content.search.placeholder' })}
        />
        {anqiUser?.auth_id > 0 ? (
          <span className="site-info-item action" onClick={showDetail}>
            {anqiUser.user_name}
          </span>
        ) : (
          <a
            className="site-info-item action"
            onClick={() => {
              setVisible(true);
            }}
          >
            <FormattedMessage id="component.right-content.bind.account" />
          </a>
        )}
        <a href={siteInfo.base_url} target={'_blank'} className="site-info-item action" rel="noreferrer">
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

      <Modal
        open={visible}
        onCancel={() => {
          setVisible(false);
        }}
        maskClosable={false}
        footer={null}
      >
        <LoginForm
          title={intl.formatMessage({ id: 'component.right-content.bind.account.name' })}
          subTitle={
            <div>
              <FormattedMessage id="component.right-content.bind.account.tips" />
            </div>
          }
          message={
            code !== 0
              ? errorMsg || intl.formatMessage({ id: 'component.right-content.bind.account.error' })
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
            placeholder={intl.formatMessage({ id: 'component.right-content.username' })}
            rules={[
              {
                required: true,
                message: intl.formatMessage({ id: 'component.right-content.username.required' }),
              },
            ]}
          />
          <ProFormText.Password
            name="password"
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined />,
            }}
            placeholder={intl.formatMessage({ id: 'component.right-content.password' })}
            rules={[
              {
                required: true,
                message: intl.formatMessage({ id: 'component.right-content.password.required' }),
              },
            ]}
          />
          <div
            style={{
              paddingBottom: 24,
              textAlign: 'right',
            }}
          >
            <a href="https://www.anqicms.com/register" target={'_blank'} rel="nofollow noreferrer">
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
        title={intl.formatMessage({ id: 'component.right-content.account' })}
        maskClosable={false}
        footer={null}
      >
        {anqiUser?.valid ? (
          <div>
            <p>
              <FormattedMessage id="component.right-content.hello" />
              {anqiUser.user_name || intl.formatMessage({ id: 'component.right-content.friend' })}
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
                <div>{dayjs(anqiUser.expire_time * 1000).format('YYYY-MM-DD')}</div>
              </div>
              <div className="item">
                <label>
                  <FormattedMessage id="component.right-content.remain" />
                </label>
                <div>
                  {anqiUser.ai_remain}{' '}
                  <FormattedMessage id="component.right-content.remain.suffix" />
                </div>
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
              <a href="https://www.anqicms.com/anqibox.html" target="_blank" rel="noreferrer">
                <FormattedMessage id="component.right-content.download-name" />
              </a>
            </p>
            <div className="compare">
              <div className="item">
                <div className="inner free">
                  <h3>
                    <FormattedMessage id="component.right-content.user-free" />
                  </h3>
                  <div className="info">
                    <ul>
                      <li>
                        <FormattedMessage id="component.right-content.user-free.option1" />
                        <span className="optional">*</span>
                      </li>
                      <li>
                        <FormattedMessage id="component.right-content.user-free.option2" />
                        <span className="optional">*</span>
                      </li>
                      <li>
                        <FormattedMessage id="component.right-content.user-free.option3" />
                        <span className="optional">*</span>
                      </li>
                      <li>
                        <FormattedMessage id="component.right-content.user-free.option4" />
                        <span className="optional">*</span>
                      </li>
                      <li>
                        <FormattedMessage id="component.right-content.user-free.option5" />
                        <span className="optional">*</span>
                      </li>
                      <li>
                        <FormattedMessage id="component.right-content.user-free.option6" />
                        <span className="optional">*</span>
                      </li>
                      <li>
                        <FormattedMessage id="component.right-content.user-free.option7" />
                        <div className="extra">
                          <FormattedMessage id="component.right-content.user-free.option7.suffix" />
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="inner vip">
                  <h3>
                    <FormattedMessage id="component.right-content.user-vip" />
                  </h3>
                  <div className="info">
                    <ul>
                      <li>
                        <FormattedMessage id="component.right-content.user-vip.option1" />
                        <span className="optional">*</span>
                      </li>
                      <li>
                        <FormattedMessage id="component.right-content.user-vip.option2" />
                        <span className="optional">*</span>
                      </li>
                      <li>
                        <FormattedMessage id="component.right-content.user-vip.option3" />
                        <span className="optional">*</span>
                      </li>
                      <li>
                        <FormattedMessage id="component.right-content.user-vip.option4" />
                        <span className="optional">*</span>
                      </li>
                      <li>
                        <FormattedMessage id="component.right-content.user-vip.option5" />
                        <span className="optional">*</span>
                      </li>
                      <li>
                        <FormattedMessage id="component.right-content.user-vip.option6" />
                        <span className="optional">*</span>
                      </li>
                      <li>
                        <FormattedMessage id="component.right-content.user-vip.option7" />
                        <div className="extra">
                          <FormattedMessage id="component.right-content.user-free.option7.suffix" />
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
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
        title={intl.formatMessage({ id: 'component.right-content.order.confirm' })}
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
    </>
  );
};
export default GlobalHeaderRight;
