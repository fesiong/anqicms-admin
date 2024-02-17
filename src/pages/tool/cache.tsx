import React, { useEffect, useState } from 'react';
import ProForm, { ProFormRadio, ProFormText } from '@ant-design/pro-form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Alert, Button, Card, Modal, message } from 'antd';
import { getSettingCache, saveSettingCache, saveSettingMigrateDB } from '@/services/setting';
import moment from 'moment';
import { removeStore } from '@/utils/store';

const ToolCacheForm: React.FC<any> = (props) => {
  const [setting, setSetting] = useState<any>(null);
  useEffect(() => {
    getSetting();
  }, []);

  const getSetting = async () => {
    const res = await getSettingCache();
    let setting = res.data || null;
    setSetting(setting);
  };

  const onSubmit = async (values: any) => {
    const hide = message.loading('正在提交中', 0);
    removeStore('unsaveArchive');
    saveSettingCache(values)
      .then((res) => {
        message.success(res.msg);
        getSetting();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        hide();
      });
  };

  const onSubmitUpdate = async (values: any) => {
    const hide = message.loading('正在提交中', 0);
    values.update = true;
    saveSettingCache(values)
      .then((res) => {
        message.success(res.msg);
        getSetting();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        hide();
      });
  };

  const onSubmitMigrate = () => {
    Modal.confirm({
      title: '确认更新数据库表结构吗？',
      okText: '确认更新',
      okType: 'primary',
      cancelText: '取消',
      onOk: () => {
        const hide = message.loading('正在提交中', 0);
        saveSettingMigrateDB({})
          .then((res) => {
            message.success(res.msg);
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            hide();
          });
      },
    });
  };

  return (
    <PageHeaderWrapper>
      <Card title="更新临时缓存">
        {setting && (
          <ProForm submitter={false}>
            <ProFormText
              name="last_update"
              fieldProps={{
                value:
                  setting.last_update > 0
                    ? moment(setting.last_update * 1000).format('YYYY-MM-DD HH:mm')
                    : '未曾更新',
              }}
              label="上次更新时间"
              width="lg"
              readonly
            />
            <ProFormText>
              <Button onClick={() => onSubmit({})} type="primary">
                更新缓存
              </Button>
            </ProFormText>
          </ProForm>
        )}
      </Card>
      <div className="mt-normal">
        <Card title="临时缓存方式设置">
          {setting && (
            <ProForm onFinish={onSubmitUpdate} initialValues={setting}>
              <ProFormRadio.Group
                name="cache_type"
                label="临时缓存方式"
                options={[
                  {
                    value: '',
                    label: '自动处理',
                  },
                  {
                    value: 'file',
                    label: '文件缓存',
                  },
                  {
                    value: 'memory',
                    label: '内存缓存',
                  },
                ]}
                extra="默认自动处理，服务器内存小于2G的采用文件缓存，大于等于2G的采用内存缓存"
              />
            </ProForm>
          )}
        </Card>
      </div>
      <div className="mt-normal">
        <Card title="更新数据库表">
          <ProForm submitter={false}>
            <Alert
              className="mb-normal"
              message="如果你发现缺少某个表或表字段不正确的时候，则可能需要点击下方的更新数据库表结构按钮来更正"
            />
            <ProFormText>
              <Button onClick={() => onSubmitMigrate()} type="primary">
                更新数据库表结构
              </Button>
            </ProFormText>
          </ProForm>
        </Card>
      </div>
    </PageHeaderWrapper>
  );
};

export default ToolCacheForm;
