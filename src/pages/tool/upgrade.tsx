import React, { useEffect, useState } from 'react';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Button, Card, message, Modal } from 'antd';
import { checkVersion, getVersion, upgradeVersion, anqiRestart } from '@/services';

var loading = false;

const ToolUpgradeForm: React.FC<any> = (props) => {
  const [setting, setSetting] = useState<any>(null);
  const [newVersion, setNewVersion] = useState<any>(null);
  useEffect(() => {
    getSetting();
  }, []);

  const getSetting = async () => {
    const res = await getVersion();
    let setting = res.data || null;

    setSetting(setting);

    checkVersion().then((res) => {
      setNewVersion(res.data || null);
    });
  };

  const upgradeSubmit = async () => {
    if (loading) {
      return;
    }
    Modal.confirm({
      title: '确定要升级到最新版吗？',
      onOk: () => {
        loading = true;
        const hide = message.loading('正在升级中,请勿刷新页面', 0);
        upgradeVersion({ version: newVersion.version })
          .then((res) => {
            Modal.info({
              content: res.msg,
              okText: '重启运行新版',
              onOk() {
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
            getSetting();
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            loading = false;
            hide();
          });
      },
    });
  };

  return (
    <PageHeaderWrapper>
      <Card>
        {setting && (
          <ProForm submitter={false} title="系统升级">
            <ProFormText
              name="old_version"
              fieldProps={{
                value: setting.version,
              }}
              label="当前版本"
              width="lg"
              readonly
            />
            {newVersion ? (
              <div>
                <ProFormText label="最新版本" width="lg" readonly>
                  <div className="text-primary">{newVersion.version}</div>
                </ProFormText>
                <ProFormText label="版本说明" width="lg" readonly>
                  <div
                    className="elem-quote"
                    dangerouslySetInnerHTML={{ __html: newVersion.description }}
                  ></div>
                </ProFormText>
                <div className="mt-normal">
                  <Button type="primary" onClick={upgradeSubmit}>
                    升级到最新版
                  </Button>
                </div>
              </div>
            ) : (
              <div>
                你的系统已经是最新版。如果不确定，你可以访问{' '}
                <a href="https://www.anqicms.com/download" target={'_blank'}>
                  https://www.anqicms.com/download
                </a>{' '}
                获取最新版
              </div>
            )}
          </ProForm>
        )}
      </Card>
    </PageHeaderWrapper>
  );
};

export default ToolUpgradeForm;
