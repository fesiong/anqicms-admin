import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Alert, Button, Input, message, Modal, Steps } from 'antd';
import React, { useEffect, useState } from 'react';
import { ProFormCheckbox, ProFormText, LoginForm } from '@ant-design/pro-form';
import CopyToClipboard from 'react-copy-to-clipboard';
import { history, useModel } from 'umi';
import Footer from '@/components/Footer';
import {
  login,
  getCaptcha,
  findPasswordChoose,
  findPasswordVerify,
  findPasswordReset,
} from '@/services/admin';

import styles from './index.less';
import { setStore } from '@/utils/store';
import { getSiteInfo } from '@/services';

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Login: React.FC = () => {
  const [userLoginState, setUserLoginState] = useState<any>({});
  const [type, setType] = useState<string>('account');
  const { initialState, setInitialState } = useModel('@@initialState');
  const [captcha, setCaptcha] = useState<any>({});
  const [siteInfo, setSiteInfo] = useState<any>({});
  const [findVisible, setFindVisible] = useState<boolean>(false);
  const [findStep, setFindSetp] = useState<number>(0);
  const [findStatus, setFindStatus] = useState<any>({});
  const [resetInfo, setResetInfo] = useState<any>({});

  useEffect(() => {
    handleGetCaptcha();

    initSiteInfo();
  }, []);

  const initSiteInfo = async () => {
    getSiteInfo({}).then((res) => {
      setSiteInfo(res?.data || {});
    });
  };

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    const anqiUser = await initialState?.fetchAnqiUser?.();
    if (userInfo) {
      await setInitialState((s) => ({
        ...s,
        currentUser: userInfo,
        anqiUser: anqiUser,
      }));
    }
  };

  const handleSubmit = async (values: any) => {
    try {
      // 登录
      if (!captcha.captcha_off) {
        values.captcha_id = captcha.captcha_id;
      }
      const res = await login({ ...values, type });
      if (res.code === 0) {
        const defaultLoginSuccessMessage = '登录成功！';
        message.success(defaultLoginSuccessMessage);

        setStore('adminToken', res.data.token);
        await fetchUserInfo();
        /** 此方法会跳转到 redirect 参数所在的位置 */
        if (!history) return;
        const { query } = history.location;
        const { redirect } = query as { redirect: string };
        history.push(redirect || '/');
        return;
      } else {
        //error
        handleGetCaptcha();
      }
      // 如果失败去设置用户错误信息
      setUserLoginState(res);
    } catch (error) {
      const defaultLoginFailureMessage = '登录失败，请重试！';
      message.error(defaultLoginFailureMessage);
    }
  };

  const handleGetCaptcha = async () => {
    try {
      const res = await getCaptcha();
      setCaptcha(res.data || {});
    } catch (e) {
      message.error('获取验证码失败');
    }
  };

  const chooseFindWay = async (way: string) => {
    findPasswordChoose({ way: way })
      .then((res) => {
        setFindStatus(res.data || {});
        setFindSetp(1);
      })
      .catch();
  };

  const onChangeResetInfo = (field: string, e: any) => {
    resetInfo[field] = e.target.value;
    setResetInfo(Object.assign({}, resetInfo));
  };

  const resetPassword = () => {
    if (findStep == 1) {
      // 第二步
      findPasswordVerify()
        .then((res) => {
          if (res.code !== 0) {
            message.error(res.msg || '验证失败');
          } else {
            setFindSetp(2);
          }
        })
        .catch();
    } else if (findStep == 2) {
      // 最后一步
      findPasswordReset(resetInfo)
        .then((res) => {
          if (res.code !== 0) {
            message.error(res.msg || '验证失败');
          } else {
            Modal.info({
              title: '管理员账号密码重置成功',
            });
            setFindSetp(0);
            setFindVisible(false);
          }
        })
        .catch();
    } else {
      // 第一步
      chooseFindWay('file');
    }
  };

  const handleDownloadFile = () => {
    let alink = document.createElement('a');

    alink.href = 'data:text/plan;charset=utf-8,' + encodeURIComponent(findStatus.token);

    alink.download = findStatus.token + '.txt';
    document.body.appendChild(alink);
    alink.click();
    document.body.removeChild(alink);
  };

  const { code = 0, msg } = userLoginState;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <LoginForm
          title="安企CMS"
          subTitle={
            <div>
              <p>欢迎使用安企CMS(AnQiCMS)</p>
              <p>
                您将登录网站：
                <a target="_blank" href={siteInfo.base_url}>
                  {siteInfo.name}
                </a>
              </p>
            </div>
          }
          initialValues={{
            autoLogin: true,
          }}
          onFinish={async (values) => {
            await handleSubmit(values);
          }}
        >
          {code !== 0 && <LoginMessage content={msg || '账户或密码错误'} />}
          <ProFormText
            name="user_name"
            fieldProps={{
              size: 'large',
              prefix: <UserOutlined className={styles.prefixIcon} />,
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
              prefix: <LockOutlined className={styles.prefixIcon} />,
            }}
            placeholder="密码"
            rules={[
              {
                required: true,
                message: '请输入密码！',
              },
            ]}
          />
          {!captcha.captcha_off && (
            <ProFormText
              name="captcha"
              fieldProps={{
                size: 'large',
                addonAfter: (
                  <img
                    className={styles.captcha}
                    onClick={handleGetCaptcha}
                    src={captcha.captcha}
                  />
                ),
              }}
            ></ProFormText>
          )}

          <div
            style={{
              marginBottom: 24,
            }}
          >
            <ProFormCheckbox noStyle name="remember">
              自动登录
            </ProFormCheckbox>
            <a
              style={{
                float: 'right',
              }}
              onClick={() => {
                setFindSetp(0);
                setFindVisible(true);
              }}
            >
              忘记密码
            </a>
          </div>
        </LoginForm>
      </div>
      <Footer />
      <Modal
        width={600}
        title="重置管理员账号密码"
        visible={findVisible}
        onCancel={() => {
          if (findStep === 0) {
            setFindVisible(false);
          } else {
            setFindSetp(findStep - 1);
          }
        }}
        onOk={() => {
          resetPassword();
        }}
        cancelText={findStep == 0 ? '取消' : '上一步'}
        okText={findStep == 1 ? '完成验证' : '提交'}
      >
        <Steps current={findStep}>
          <Steps.Step title="选择验证方式" />
          <Steps.Step title="验证网站权限" />
          <Steps.Step title="重置账号密码" />
        </Steps>
        <div className={styles.resetBox}>
          {findStep === 2 ? (
            <div className={styles.resetPassword}>
              <div className={styles.field}>
                <Input
                  name="user_name"
                  size="large"
                  prefix={<UserOutlined className={styles.prefixIcon} />}
                  placeholder="管理员账号"
                  value={resetInfo.user_name || ''}
                  required
                  onChange={(e) => onChangeResetInfo('user_name', e)}
                />
              </div>
              <div className={styles.field}>
                <Input.Password
                  name="password"
                  size="large"
                  value={resetInfo.password || ''}
                  prefix={<LockOutlined className={styles.prefixIcon} />}
                  placeholder="请输入6位以上的密码"
                  onChange={(e) => onChangeResetInfo('password', e)}
                />
              </div>
            </div>
          ) : findStep == 1 ? (
            <div className={styles.resetTips}>
              {findStatus.way == 'file' ? (
                <div>
                  <h3>文件验证</h3>
                  <p>
                    1. 请<a onClick={handleDownloadFile}>点击下载</a>
                    验证文件获取验证文件
                  </p>
                  <p>2. 将验证文件放置于网站的public目录下</p>
                  <p>3. 确认验证文件可以正常访问</p>
                  <p>4. 请点击“完成验证”按钮</p>
                </div>
              ) : (
                <div>
                  <h3>DNS验证</h3>
                  <p>1. 登录到您的域名提供商网站（例如 wanwang.aliyun.com 和 dns.com）</p>
                  <p>2. 将下面的 TXT 记录复制到 {findStatus.host} 的 DNS 配置中</p>
                  <div className={styles.copyItem}>
                    <span className={styles.copyText}>{findStatus.token}</span>
                    <CopyToClipboard
                      text={findStatus.token}
                      onCopy={() => {
                        message.info('内容已复制');
                      }}
                    >
                      <Button className={styles.copyBtn}>复制</Button>
                    </CopyToClipboard>
                  </div>
                  <p className={styles.copyTips}>
                    请注意：DNS 更改可能要过一段时间才会生效。请解析后等待几分钟再点完成验证。
                  </p>
                  <p>3. 请点击“完成验证”按钮</p>
                </div>
              )}
            </div>
          ) : (
            <div className={styles.chooseItems}>
              <div className={styles.chooseItem}>
                <Button
                  size="large"
                  block
                  onClick={() => {
                    chooseFindWay('file');
                  }}
                >
                  文件验证
                </Button>
                <p className={styles.resetTips}>验证文件放置于网站的public目录下</p>
              </div>
              <div className={styles.chooseItem}>
                <Button
                  size="large"
                  block
                  onClick={() => {
                    chooseFindWay('dns');
                  }}
                >
                  DNS验证
                </Button>
                <p className={styles.resetTips}>添加一条TXT域名解析完成验证</p>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default Login;
