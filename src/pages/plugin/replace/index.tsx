import { pluginReplaceValues } from '@/services';
import { PlusOutlined } from '@ant-design/icons';
import {
  PageContainer,
  ProForm,
  ProFormCheckbox,
  ProFormInstance,
} from '@ant-design/pro-components';
import { Alert, Button, Card, Divider, Input, Modal, Space, Tag, message } from 'antd';
import React, { useState } from 'react';
import './index.less';

const PluginReplace: React.FC<any> = (props) => {
  const formRef = React.createRef<ProFormInstance>();
  const [sitemapSetting, setSitemapSetting] = useState<any>({});
  const [fetched, setFetched] = useState<boolean>(false);
  const [keywords, setKeywords] = useState<any[]>([]);
  const [inputVisible, setInputVisible] = useState<boolean>(false);
  const [fromValue, setFromValue] = useState<string>('');
  const [toValue, setToValue] = useState<string>('');

  const handleRemove = (index: number) => {
    keywords.splice(index, 1);
    setKeywords([].concat(...keywords));
  };

  const handleEditInputChange = (field: string, e: any) => {
    if (field == 'from') {
      setFromValue(e.target.value);
    } else if (field == 'to') {
      setToValue(e.target.value);
    }
  };

  const handleEditInputConfirm = () => {
    if (!fromValue) {
      message.error('请填写替换源关键词');
      return;
    }
    let tag: any = {
      from: fromValue,
      to: toValue,
    };
    keywords.push(tag);

    setKeywords([].concat(...keywords));
    setInputVisible(false);
  };

  const showInput = () => {
    setInputVisible(true);
    setFromValue('');
    setToValue('');
  };

  const onSubmit = async (values: any) => {
    if (!values.places || values.places.length == 0) {
      message.error('请选择替换位置');
      return;
    }
    if (keywords.length == 0) {
      message.error('请添加替换规则');
      return;
    }
    Modal.confirm({
      title: '确定要执行全站替换操作吗？',
      onOk: () => {
        const postData = Object.assign({}, values);
        postData.keywords = keywords;
        const hide = message.loading('正在提交中', 0);
        pluginReplaceValues(postData)
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
    <PageContainer>
      <Card>
        <Alert
          message={
            <div>
              <p>
                替换规则支持正则表达式，如果你对正则表达式熟悉，并且通过普通文本无法达成替换需求的，可以尝试使用正则表达式规则来完成替换。
              </p>
              <p>
                正则表达式规则为：由 <Tag>{'{'}</Tag>开始，并以 <Tag>{'}'}</Tag>
                结束，中间书写规则代码，如{' '}
                <Tag>
                  {'{'}[0-9]+{'}'}
                </Tag>{' '}
                代表匹配连续的数字。
              </p>
              <p>
                内置部分规则，可以快速使用，已内置的有：
                <Tag>
                  {'{'}邮箱地址{'}'}
                </Tag>
                、
                <Tag>
                  {'{'}日期{'}'}
                </Tag>
                、
                <Tag>
                  {'{'}时间{'}'}
                </Tag>
                、
                <Tag>
                  {'{'}电话号码{'}'}
                </Tag>
                、
                <Tag>
                  {'{'}QQ号{'}'}
                </Tag>
                、
                <Tag>
                  {'{'}微信号{'}'}
                </Tag>
                、
                <Tag>
                  {'{'}网址{'}'}
                </Tag>
              </p>
              <p className="text-red">
                <span className="text-red">*</span>{' '}
                注意：正则表达式规则书写不当很容易造成错误的替换效果，如微信号规则，会同时影响到邮箱地址、网址的完整性。请谨慎使用。
                <br />
                全站替换是高级操作，有可能会出现替换错误，建议在替换前，先执行内容备份。
              </p>
            </div>
          }
          type="info"
        />
        <div className="mt-normal">
          <ProForm onFinish={onSubmit} layout="horizontal" formRef={formRef}>
            <Card size="small" bordered={false}>
              <Divider orientation={'left'}>替换位置</Divider>
              <ProFormCheckbox.Group
                name="places"
                options={[
                  { value: 'setting', label: '后台设置' },
                  { value: 'archive', label: '文档' },
                  { value: 'category', label: '分类页面' },
                  { value: 'tag', label: '标签Tag' },
                  { value: 'anchor', label: '锚文本' },
                  { value: 'keyword', label: '关键词' },
                  { value: 'comment', label: '评论' },
                  { value: 'attachment', label: '图片资源' },
                ]}
              />
              <ProFormCheckbox label="是否替换标签内容" name="replace_tag" />
              <Divider orientation={'left'}>替换规则</Divider>
              <div className="tag-lists">
                <Space size={[12, 12]} wrap>
                  {keywords.map((tag: any, index: number) => (
                    <div className="edit-tag" key={index}>
                      <span className="key">{tag.from}</span>
                      <span className="divide">替换为</span>
                      <span className="value">{tag.to || '空'}</span>
                      <span
                        className="close"
                        onClick={() => {
                          handleRemove(index);
                        }}
                      >
                        ×
                      </span>
                    </div>
                  ))}
                  {!inputVisible && (
                    <Button className="site-tag-plus" onClick={showInput}>
                      <PlusOutlined /> 新增替换规则
                    </Button>
                  )}
                </Space>
              </div>
              {inputVisible && (
                <Input.Group compact>
                  <Input
                    style={{ width: '35%' }}
                    value={fromValue}
                    onChange={(e) => {
                      handleEditInputChange('from', e);
                    }}
                    onPressEnter={() => {
                      handleEditInputConfirm();
                    }}
                  />
                  <span className="input-divide">替换为</span>
                  <Input
                    style={{ width: '35%' }}
                    value={toValue}
                    onChange={(e) => {
                      handleEditInputChange('to', e);
                    }}
                    onPressEnter={() => {
                      handleEditInputConfirm();
                    }}
                  />
                  <Button
                    onClick={() => {
                      handleEditInputConfirm();
                    }}
                    style={{ width: '15%', minWidth: '90px' }}
                  >
                    回车添加
                  </Button>
                </Input.Group>
              )}
              <p>
                <br />
              </p>
            </Card>
          </ProForm>
        </div>
      </Card>
    </PageContainer>
  );
};

export default PluginReplace;
