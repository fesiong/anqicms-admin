import React, { useEffect, useState } from 'react';
import ProForm, {
  ProFormCheckbox,
  ProFormDigit,
  ProFormSelect,
  ProFormRadio,
} from '@ant-design/pro-form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Alert, Card, message } from 'antd';
import { pluginGetTimefactorSetting, pluginSaveTimefactorSetting } from '@/services';
import { getCategories, getModules } from '@/services';

const PluginTimeFactor: React.FC<any> = () => {
  const [setting, setSetting] = useState<any>({});
  const [fetched, setFetched] = useState<boolean>(false);
  const [modules, setModules] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [renewOpen, setRenewOpen] = useState<boolean>(false);
  const [releaseOpen, setReleaseOpen] = useState<boolean>(false);

  useEffect(() => {
    getSetting();
  }, []);

  const getSetting = async () => {
    getModules().then((res) => {
      const data = res.data || [];
      const tmpData = [];
      for (let i in data) {
        tmpData.push({ label: data[i].title, value: data[i].id });
      }
      setModules(tmpData);
    });
    getCategories({
      type: 1,
    }).then((res) => {
      const data = res.data || [];
      const tmpData = [];
      for (let i in data) {
        tmpData.push({ label: data[i].title, value: data[i].id });
      }
      setCategories(tmpData);
    });
    pluginGetTimefactorSetting().then((res) => {
      let data = res.data || {};
      if (!data.category_ids) {
        data.category_ids = [];
      }
      setSetting(data);
      setRenewOpen(data.open || false);
      setReleaseOpen(data.release_open || false);
      setFetched(true);
    });
  };

  const onSubmit = async (values: any) => {
    const hide = message.loading('正在提交中', 0);
    if (values.open) {
      if (!values.module_ids || values.module_ids.length == 0) {
        message.error('请至少选择一个文档模型');
        return;
      }
      if (!values.types || values.types.length == 0) {
        message.error('请至少选择一个更新类型');
        return;
      }
      if (values.start_day == 0) {
        message.error('触发更新的时间不能为0');
        return;
      }
      if (values.start_day <= values.end_day) {
        message.error('更新结果时间不能早于更新触发时间');
      }
    }
    pluginSaveTimefactorSetting(values)
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
          message={
            <div>
              <div>
                文档时间因子-定时发布功能提供定时更新文档时间的能力。可以设置某些文档定时自动更新为最新的时间，对草稿中的文档按设定的时间定时发布。
                <br />
                程序会每小时尝试检查更新一次。
              </div>
            </div>
          }
        />
        {fetched && (
          <div className="mt-normal">
            <ProForm onFinish={onSubmit} initialValues={setting}>
              <Card size="small" title="文档时间因子-定时发布设置" bordered={false}>
                <ProFormRadio.Group
                  name="open"
                  label="是否启用旧文档时间更新"
                  options={[
                    { label: '否', value: false },
                    { label: '启用', value: true },
                  ]}
                  fieldProps={{
                    onChange: (e) => {
                      setRenewOpen(e.target.value);
                    },
                  }}
                />
                {renewOpen && (
                  <>
                    <ProFormCheckbox.Group
                      name="types"
                      label="更新类型"
                      options={[
                        { value: 'created_time', label: '发布时间' },
                        { value: 'updated_time', label: '更新时间' },
                      ]}
                      extra="至少选择一个"
                    />
                    <ProForm.Group>
                      <ProFormDigit
                        name="start_day"
                        label="超过"
                        placeholder="如：30"
                        addonAfter="天前的文档，"
                        extra="如：30，填写整数数字"
                      />
                      <ProFormDigit
                        name="end_day"
                        label="自动更新到"
                        placeholder="如：1"
                        addonAfter="天内的时间"
                        extra="如果填0，则表示更新到当天"
                      />
                    </ProForm.Group>
                    <ProFormRadio.Group
                      name="do_publish"
                      label="是否重新推送"
                      options={[
                        { label: '否', value: false },
                        { label: '是', value: true },
                      ]}
                      extra="更新文档的同时，重新提交给尝试搜索引擎。"
                    />
                  </>
                )}
                <ProFormRadio.Group
                  name="release_open"
                  label="是否启用草稿箱文档自动发布"
                  options={[
                    { label: '否', value: false },
                    { label: '启用', value: true },
                  ]}
                  fieldProps={{
                    onChange: (e) => {
                      setReleaseOpen(e.target.value);
                    },
                  }}
                />
                {releaseOpen && (
                  <>
                    <div style={{ width: 200 }}>
                      <ProFormDigit
                        name="daily_limit"
                        label="每天自动发布数量"
                        placeholder="如：30"
                        addonAfter="篇"
                        extra="设定后，每天从草稿箱发布指定数量的文章，默认100"
                      />
                    </div>
                    <ProForm.Group>
                      <ProFormDigit
                        name="start_time"
                        label="每天发布开始时间"
                        placeholder="如：8"
                        addonAfter="点"
                        extra="如：8，则每天从8点开始"
                      />
                      <ProFormDigit
                        name="end_time"
                        label="结束时间"
                        placeholder="如：18"
                        addonAfter="点"
                        extra="如果填0，则表示23点结束"
                      />
                    </ProForm.Group>
                  </>
                )}
                <ProFormCheckbox.Group name={'module_ids'} label="开启的模型" options={modules} />
                <ProFormSelect
                  name={'category_ids'}
                  label="不参与更新的分类"
                  mode="multiple"
                  options={categories}
                  placeholder={'如果你想排除某些分类，可以在这里选择'}
                />
              </Card>
            </ProForm>
          </div>
        )}
      </Card>
    </PageHeaderWrapper>
  );
};

export default PluginTimeFactor;
