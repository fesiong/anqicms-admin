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
import { FormattedMessage, useIntl } from '@umijs/max';

const PluginReplace: React.FC<any> = () => {
  const formRef = React.createRef<ProFormInstance>();
  const [keywords, setKeywords] = useState<any[]>([]);
  const [inputVisible, setInputVisible] = useState<boolean>(false);
  const [fromValue, setFromValue] = useState<string>('');
  const [toValue, setToValue] = useState<string>('');
  const intl = useIntl();

  const handleRemove = (index: number) => {
    keywords.splice(index, 1);
    setKeywords([].concat(...keywords));
  };

  const handleEditInputChange = (field: string, e: any) => {
    if (field === 'from') {
      setFromValue(e.target.value);
    } else if (field === 'to') {
      setToValue(e.target.value);
    }
  };

  const handleEditInputConfirm = () => {
    if (!fromValue) {
      message.error(intl.formatMessage({ id: 'plugin.replace.add.required' }));
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
    if (!values.places || values.places.length === 0) {
      message.error(intl.formatMessage({ id: 'plugin.replace.place.required' }));
      return;
    }
    if (keywords.length === 0) {
      message.error(intl.formatMessage({ id: 'plugin.replace.keyword.required' }));
      return;
    }
    Modal.confirm({
      title: intl.formatMessage({ id: 'plugin.replace.confirm' }),
      onOk: () => {
        const postData = Object.assign({}, values);
        postData.keywords = keywords;
        const hide = message.loading(intl.formatMessage({ id: 'setting.system.submitting' }), 0);
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
                <FormattedMessage id="plugin.aigenerate.replace.tips2" />
              </p>
              <p>
                <FormattedMessage id="plugin.aigenerate.replace.tips3" />
              </p>
              <p>
                <FormattedMessage id="plugin.aigenerate.replace.rules" />
                <Tag>
                  <FormattedMessage id="plugin.aigenerate.replace.rule.email" />
                </Tag>
                、
                <Tag>
                  <FormattedMessage id="plugin.aigenerate.replace.rule.date" />
                </Tag>
                、
                <Tag>
                  <FormattedMessage id="plugin.aigenerate.replace.rule.time" />
                </Tag>
                、
                <Tag>
                  <FormattedMessage id="plugin.aigenerate.replace.rule.cellphone" />
                </Tag>
                、
                <Tag>
                  <FormattedMessage id="plugin.aigenerate.replace.rule.qq" />
                </Tag>
                、
                <Tag>
                  <FormattedMessage id="plugin.aigenerate.replace.rule.wechat" />
                </Tag>
                、
                <Tag>
                  <FormattedMessage id="plugin.aigenerate.replace.rule.website" />
                </Tag>
              </p>
              <p className="text-red">
                <span className="text-red">*</span>{' '}
                <FormattedMessage id="plugin.aigenerate.replace.notice" />
                <br />
                <FormattedMessage id="plugin.replace.tips" />
              </p>
            </div>
          }
          type="info"
        />
        <div className="mt-normal">
          <ProForm onFinish={onSubmit} layout="horizontal" formRef={formRef}>
            <Card size="small" bordered={false}>
              <Divider orientation={'left'}><FormattedMessage id="plugin.replace.place" /></Divider>
              <ProFormCheckbox.Group
                name="places"
                options={[
                  { value: 'setting', label: intl.formatMessage({ id: 'plugin.replace.place.setting' }) },
                  { value: 'archive', label: intl.formatMessage({ id: 'plugin.replace.place.archive' }) },
                  { value: 'category', label: intl.formatMessage({ id: 'plugin.replace.place.category' }) },
                  { value: 'tag', label: intl.formatMessage({ id: 'plugin.replace.place.tag' }) },
                  { value: 'anchor', label: intl.formatMessage({ id: 'plugin.replace.place.anchor' }) },
                  { value: 'keyword', label: intl.formatMessage({ id: 'plugin.replace.place.keyword' }) },
                  { value: 'comment', label: intl.formatMessage({ id: 'plugin.replace.place.comment' }) },
                  { value: 'attachment', label: intl.formatMessage({ id: 'plugin.replace.place.attachment' }) },
                ]}
              />
              <ProFormCheckbox label={intl.formatMessage({ id: 'plugin.replace.replace-tag' })} name="replace_tag" />
              <Divider orientation={'left'}><FormattedMessage id="plugin.replace.keyword" /></Divider>
              <div className="tag-lists">
                <Space size={[12, 12]} wrap>
                  {keywords.map((tag: any, index: number) => (
                    <div className="edit-tag" key={index}>
                      <span className="key">{tag.from}</span>
                      <span className="divide"><FormattedMessage id="plugin.aigenerate.replace.to" /></span>
                      <span className="value">{tag.to || intl.formatMessage({ id: 'plugin.aigenerate.empty' })}</span>
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
                      <PlusOutlined /> <FormattedMessage id="plugin.replace.add" />
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
                  <span className="input-divide"><FormattedMessage id="plugin.aigenerate.replace.to" /></span>
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
                    <FormattedMessage id="plugin.aigenerate.enter-to-add" />
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
