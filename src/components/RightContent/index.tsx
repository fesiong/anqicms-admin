import { Button, message, Modal, Space } from 'antd';
import {
  GlobalOutlined,
  LockOutlined,
  QuestionCircleOutlined,
  UserOutlined,
} from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { useModel } from 'umi';
import Avatar from './AvatarDropdown';
import './index.less';
import { LoginForm, ProFormText } from '@ant-design/pro-form';
import { anqiLogin, anqiRestart, checkAnqiInfo, getSiteInfo } from '@/services';
import moment from 'moment';
import HeaderSearch from '../HeaderSearch';

export type SiderTheme = 'light' | 'dark';

const GlobalHeaderRight: React.FC = () => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const [visible, setVisible] = useState<boolean>(false);
  const [detailVisible, setDetailVisible] = useState<boolean>(false);
  const [orderVisible, setOrderVisible] = useState<boolean>(false);
  const [code] = useState<number>(0);
  const [errorMsg] = useState<string>('');
  const [siteInfo, setSiteInfo] = useState<any>({});

  useEffect(() => {
    initSiteInfo();
  }, []);

  const initSiteInfo = async () => {
    getSiteInfo({}).then((res) => {
      setSiteInfo(res?.data || {});
    });
  };

  if (!initialState || !initialState.settings) {
    return null;
  }

  const { navTheme, layout } = initialState.settings;
  let className = 'right';
  const anqiUser = initialState.anqiUser;

  if ((navTheme === 'dark' && layout === 'top') || layout === 'mix') {
    className = `right  dark`;
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
        <HeaderSearch placeholder="搜索功能" />
        {anqiUser?.auth_id > 0 ? (
          <a onClick={showDetail} style={{ color: 'white' }}>
            {anqiUser.user_name}
          </a>
        ) : (
          <a
            onClick={() => {
              setVisible(true);
            }}
            style={{ color: 'white' }}
          >
            绑定安企账号
          </a>
        )}
        <a href={siteInfo.base_url} target={'_blank'} className="action" style={{ color: 'white' }}>
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
        <Avatar menu />
        <div className="restart" onClick={confirmRestart}>
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
      <Modal
        visible={detailVisible}
        onCancel={() => {
          setDetailVisible(false);
        }}
        width={700}
        title="账号信息"
        maskClosable={false}
        footer={null}
      >
        {anqiUser?.valid ? (
          <div>
            <p>您好：{anqiUser.user_name || '朋友'}，欢迎使用安企CMS。</p>
            <div className="account-info">
              <div className="item">
                <label>授权ID：</label>
                <div>{anqiUser.auth_id}</div>
              </div>
              <div className="item">
                <label>登录账号：</label>
                <div>{anqiUser.user_name}</div>
              </div>
              <div className="item">
                <label>VIP有效期：</label>
                <div>{moment(anqiUser.expire_time * 1000).format('YYYY-MM-DD')}</div>
              </div>
              <div className="item">
                <label>伪原创剩余额度：</label>
                <div>{anqiUser.pseudo_remain} 篇/天</div>
              </div>
              <div className="item">
                <label>翻译剩余额度：</label>
                <div>{anqiUser.free_trans_remain} 字/天</div>
              </div>
              <div className="item">
                <label>翻译资源包余量：</label>
                <div>{anqiUser.translate_remain} 字</div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <p>
              您尚未成为VIP会员，部分软件功能将受限。购买会员可以使用更丰富的安企盒子和安企CMS功能。
            </p>
            <p>
              <span className="optional">*</span>表示该功能为安企盒子功能。更多的VIP功能使用，请下载{' '}
              <a href="https://www.anqicms.com/anqibox.html" target="_blank">
                安企盒子
              </a>
              。
            </p>
            <div className="compare">
              <div className="item">
                <div className="inner free">
                  <h3>免费用户</h3>
                  <div className="info">
                    <ul>
                      <li>
                        最多管理2个站点<span className="optional">*</span>
                      </li>
                      <li>
                        最多2个/1万关键词导出任务<span className="optional">*</span>
                      </li>
                      <li>
                        最多2个采集文章任务<span className="optional">*</span>
                      </li>
                      <li>
                        最多2个文章组合任务<span className="optional">*</span>
                      </li>
                      <li>
                        最多2个文章监控任务<span className="optional">*</span>
                      </li>
                      <li>
                        整站采集/下载不可用<span className="optional">*</span>
                      </li>
                      <li>
                        累计10万字数文章翻译
                        <div className="extra">可额外购买 10 积分1000字</div>
                      </li>
                      <li>
                        累计伪原创额度 100 篇<div className="extra">超出数量 5 积分一篇</div>
                      </li>
                      <li>
                        累计AI写作额度 10 篇<div className="extra">超出数量 10 积分一篇</div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="inner vip">
                  <h3>VIP会员</h3>
                  <div className="info">
                    <ul>
                      <li>
                        不限制管理站点数量<span className="optional">*</span>
                      </li>
                      <li>
                        不限制关键词任务<span className="optional">*</span>
                      </li>
                      <li>
                        不限制采集文章任务<span className="optional">*</span>
                      </li>
                      <li>
                        不限制文章组合任务<span className="optional">*</span>
                      </li>
                      <li>
                        不限制文章监控任务<span className="optional">*</span>
                      </li>
                      <li>
                        可用整站采集/下载<span className="optional">*</span>
                      </li>
                      <li>
                        每天10万字数文章翻译
                        <div className="extra">可额外购买 10 积分1000字</div>
                      </li>
                      <li>
                        每天100篇文章伪原创
                        <div className="extra">超出数量 5 积分一篇</div>
                      </li>
                      <li>
                        每天AI写作额度 100 篇<div className="extra">超出数量 10 积分一篇</div>
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
              关闭
            </Button>
            <Button type="primary" onClick={handleOrderVip}>
              前往购买
            </Button>
          </Space>
        </div>
      </Modal>
      <Modal
        visible={orderVisible}
        onCancel={() => {
          setOrderVisible(false);
        }}
        title="已购买？"
        maskClosable={false}
        footer={null}
      >
        <div className="order-control">
          <Space align="center">
            <Button onClick={reloadAccount}>关闭</Button>
            <Button type="primary" onClick={reloadAccount}>
              更新账号状态
            </Button>
          </Space>
        </div>
      </Modal>
    </>
  );
};
export default GlobalHeaderRight;
