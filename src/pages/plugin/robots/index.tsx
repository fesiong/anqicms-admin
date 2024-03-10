import React, { useEffect, useState } from 'react';
import ProForm, { ProFormTextArea } from '@ant-design/pro-form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Alert, Button, Card, message } from 'antd';
import { pluginGetRobots, pluginSaveRobots } from '@/services/plugin/robots';
import { useModel } from 'umi';

const PluginRobots: React.FC<any> = (props) => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const [pushSetting, setPushSetting] = useState<any>({});
  const [fetched, setFetched] = useState<boolean>(false);

  useEffect(() => {
    getSetting();
  }, []);

  const getSetting = async () => {
    const res = await pluginGetRobots();
    let setting = res.data || {};
    setPushSetting(setting);
    setFetched(true);
  };

  const onSubmit = async (values: any) => {
    const hide = message.loading('正在提交中', 0);
    pluginSaveRobots(values)
      .then((res) => {
        message.success(res.msg);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        hide();
      });
  };

  const getFrontUrl = async (link: string) => {
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

    return baseUrl + link;
  };

  return (
    <PageHeaderWrapper>
      <Card>
        <Alert
          message={
            <div>
              Robots是网站告诉搜索引擎蜘蛛哪些页面可以抓取，哪些页面不能抓取的配置。Q:{' '}
              <a href="https://baike.baidu.com/item/robots%E5%8D%8F%E8%AE%AE/2483797">
                robots.txt文件的格式
              </a>
            </div>
          }
        />
        <div className="mt-normal">
          {fetched && (
            <ProForm onFinish={onSubmit} initialValues={pushSetting}>
              <ProFormTextArea
                name="robots"
                fieldProps={{
                  rows: 15,
                }}
                label="Robots内容"
                extra={
                  <div>
                    <p>
                      1、robots.txt可以告诉百度您网站的哪些页面可以被抓取，哪些页面不可以被抓取。
                    </p>
                    <p>2、您可以通过Robots工具来创建、校验、更新您的robots.txt文件。</p>
                  </div>
                }
              />
            </ProForm>
          )}
        </div>
        <div className="mt-normal">
          <Button
            onClick={async () => {
              let url = await getFrontUrl('/robots.txt');
              window.open(url);
            }}
          >
            查看Robots
          </Button>
        </div>
      </Card>
    </PageHeaderWrapper>
  );
};

export default PluginRobots;
