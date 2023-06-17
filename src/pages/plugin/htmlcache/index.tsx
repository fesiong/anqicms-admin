import React, { useEffect, useState } from 'react';
import ProForm, { ProFormDigit, ProFormRadio } from '@ant-design/pro-form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Alert, Card, message, Divider, Modal, Button, Space } from 'antd';
import {
  pluginBuildHtmlCache,
  pluginCleanHtmlCache,
  pluginGetBuildHtmlCacheStatus,
  pluginGetHtmlCache,
  pluginSaveHtmlCache,
} from '@/services';
import moment from 'moment';

let xhr: any = null;

const PluginHtmlCache: React.FC<any> = () => {
  const [status, setStatus] = useState<any>(null);

  useEffect(() => {
    return () => {
      clearInterval(xhr);
    };
  }, []);

  const getStatus = () => {
    pluginGetBuildHtmlCacheStatus().then((res) => {
      setStatus(res.data || null);
      if (!res.data || res.data.finished_time > 0) {
        clearInterval(xhr);
        return;
      }
    });
  };

  const startBuild = () => {
    Modal.confirm({
      title: '确定要生成全站的静态缓存吗？',
      onOk: () => {
        pluginBuildHtmlCache().then((res) => {
          getStatus();
          setInterval(() => {
            getStatus();
          }, 1500);
        });
      },
    });
  };

  const cleanHtmlCache = () => {
    Modal.confirm({
      title: '确定要清理全站的静态缓存吗？如果缓存文件很多，可能需要花费较长时间。',
      onOk: () => {
        pluginCleanHtmlCache().then((res) => {
          message.success('清理成功');
        });
      },
    });
  };

  const onSubmit = async (values: any) => {
    const hide = message.loading('正在提交中', 0);
    pluginSaveHtmlCache(values)
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

  return (
    <PageHeaderWrapper>
      <Card>
        <Alert
          style={{ marginBottom: 20 }}
          description="开启静态页面缓存后，会将首页、列表页、详情页缓存起来，加快网站的打开速度，但会需要更多的服务器空间来存储缓存文件。"
        />
        <ProForm
          request={async () => {
            const res = await pluginGetHtmlCache();
            return res.data || [];
          }}
          onFinish={onSubmit}
          title="静态页面缓存"
        >
          <ProFormRadio.Group
            name={'open'}
            label="是否开启静态页面缓存"
            options={[
              { label: '关闭', value: false },
              { label: '开启', value: true },
            ]}
          />

          <ProFormDigit
            name="index_cache"
            label="首页缓存时间"
            wrapperCol={{ span: 6 }}
            fieldProps={{ addonAfter: '秒' }}
            extra="如果填写0秒，则不缓存"
          />
          <ProFormDigit
            name="category_cache"
            label="列表缓存时间"
            wrapperCol={{ span: 6 }}
            fieldProps={{ addonAfter: '秒' }}
            extra="如果填写0秒，则不缓存"
          />
          <ProFormDigit
            name="detail_cache"
            label="详情缓存时间"
            wrapperCol={{ span: 6 }}
            fieldProps={{ addonAfter: '秒' }}
            extra="如果填写0秒，则不缓存"
          />
        </ProForm>
        <Divider>生成操作</Divider>
        <div>
          <Space size={20}>
            <Button onClick={() => startBuild()}>手动生成缓存</Button>
            <Button onClick={() => cleanHtmlCache()}>清理所有缓存</Button>
          </Space>
        </div>
        {status && (
          <div>
            <Divider>生成进度</Divider>
            <Space direction="vertical" size={10}>
              <div className="field-item">
                <div className="field-label">开始时间：</div>
                <div className="field-value">
                  {moment(status.start_time * 1000).format('YYYY-MM-DD HH:mm:ss')}
                </div>
              </div>
              <div className="field-item">
                <div className="field-label">完成时间：</div>
                <div className="field-value">
                  {status.finished_time > 0
                    ? moment(status.finished_time * 1000).format('YYYY-MM-DD HH:mm:ss')
                    : '未完成'}
                </div>
              </div>
              <div className="field-item">
                <div className="field-label">已发现数量：</div>
                <div className="field-value">{status.total}</div>
              </div>
              <div className="field-item">
                <div className="field-label">已处理数量：</div>
                <div className="field-value">{status.finished_count}</div>
              </div>
              <div className="field-item">
                <div className="field-label">当前执行任务：</div>
                <div className="field-value">{status.current}</div>
              </div>
              {status.error_msg && (
                <div className="field-item">
                  <div className="field-label">错误信息：</div>
                  <div className="field-value">{status.error_msg}</div>
                </div>
              )}
            </Space>
          </div>
        )}
      </Card>
    </PageHeaderWrapper>
  );
};

export default PluginHtmlCache;
