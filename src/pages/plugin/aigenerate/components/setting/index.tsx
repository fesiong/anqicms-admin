import AttachmentSelect from '@/components/attachment';
import {
  checkOpenAIApi,
  getAiGenerateSetting,
  getAttachmentCategories,
  saveAiGenerateSetting,
} from '@/services';
import { getCategories } from '@/services/category';
import { PlusOutlined } from '@ant-design/icons';
import {
  ModalForm,
  ProForm,
  ProFormDigit,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { FormattedMessage, injectIntl } from '@umijs/max';
import { Col, Image, Input, Row, Space, Tag, message } from 'antd';
import React from 'react';
import { IntlShape } from 'react-intl';
import './index.less';

export type CollectorSettingProps = {
  onCancel: (flag?: boolean) => void;
  children?: React.ReactNode;
  intl: IntlShape;
};

class CollectorSetting extends React.Component<CollectorSettingProps> {
  state: { [key: string]: any } = {
    visible: false,
    fetched: false,
    setting: {},
    tmpInput: {},
    insertImage: 0,
    aiEngine: '',
  };

  componentDidMount() {
    getAiGenerateSetting().then((res) => {
      const setting = res.data;
      if (!setting.content_replace) {
        setting.content_replace = [];
      }
      if (!setting.open_ai_keys) {
        setting.open_ai_keys = [];
      }
      if (!setting.images) {
        setting.images = [];
      }
      this.setState({
        setting: setting,
        fetched: true,
        insertImage: setting.insert_image,
        aiEngine: setting.ai_engine || '',
      });
    });
  }

  handleSetVisible = (visible: boolean) => {
    this.setState({
      visible,
    });
  };

  handleSubmit = async (values: any) => {
    const { setting } = this.state;
    if (values.demand.length > 500) {
      message.error(this.props.intl.formatMessage({ id: 'plugin.aigenerate.demand.required' }));
      return;
    }
    const postData = Object.assign(setting, values);

    const hide = message.loading(
      this.props.intl.formatMessage({ id: 'setting.system.submitting' }),
      0,
    );
    saveAiGenerateSetting(postData)
      .then((res) => {
        message.info(res.msg);
        this.handleSetVisible(false);
        this.props.onCancel();
      })
      .finally(() => {
        hide();
      });
  };

  handleRemove = (field: string, index: number) => {
    const { setting } = this.state;
    setting[field].splice(index, 1);
    this.setState({
      setting,
    });
  };

  handleChangeTmpInput = (field: string, e: any) => {
    const { tmpInput } = this.state;
    tmpInput[field] = e.target.value;
    this.setState({
      tmpInput,
    });
  };

  handleAddField = (field: string) => {
    const { tmpInput, setting } = this.state;
    if (field === 'content_replace') {
      if (!tmpInput['from'] || tmpInput['from'] === tmpInput['to']) {
        return;
      }
      let exists = false;
      for (const item of setting[field]) {
        if (item.from === tmpInput['from']) {
          exists = true;
          break;
        }
      }
      if (!exists) {
        setting[field].push({
          from: tmpInput['from'],
          to: tmpInput['to'],
        });

        tmpInput['from'] = '';
        tmpInput['to'] = '';
      }
    } else if (field === 'open_ai_keys') {
      if (!tmpInput['key']) {
        return;
      }
      let exists = false;
      for (const item of setting[field]) {
        if (item.key === tmpInput['key']) {
          exists = true;
          break;
        }
      }
      if (!exists) {
        setting[field].push({
          key: tmpInput['key'],
          invalid: false,
        });

        tmpInput['key'] = '';
      }
    } else {
      setting[field].push(tmpInput[field]);
      tmpInput[field] = '';
    }
    this.setState({
      tmpInput,
      setting,
    });
  };

  onChangeInsertImage = (e: any) => {
    this.setState({
      insertImage: e.target.value,
    });
  };

  handleSelectLogo = (rows: any) => {
    const { setting } = this.state;
    for (const row of rows) {
      let exists = false;
      for (let i in setting['images']) {
        if (setting['images'][i] === row.logo) {
          exists = true;
          break;
        }
      }
      if (!exists) {
        setting['images'].push(row.logo);
      }
    }
    this.setState({
      setting,
    });
  };

  handleChangeAiEngine = (e: any) => {
    this.setState({
      aiEngine: e.target.value,
    });
  };

  handleCheckOpenAIApi = () => {
    const { setting } = this.state;
    const hide = message.loading(
      this.props.intl.formatMessage({ id: 'plugin.aigenerate.checking' }),
      0,
    );
    checkOpenAIApi()
      .then((res) => {
        if (res.code === 0) {
          message.success(res.msg);
          setting.api_valid = true;
        } else {
          message.error(res.msg);
          setting.api_valid = false;
        }
        this.setState({
          setting,
        });
      })
      .finally(() => {
        hide();
      });
  };

  render() {
    const { visible, fetched, setting, tmpInput, insertImage, aiEngine } = this.state;

    return (
      <>
        <div
          onClick={() => {
            this.handleSetVisible(!visible);
          }}
        >
          {this.props.children}
        </div>
        {fetched && (
          <ModalForm
            width={800}
            title={this.props.intl.formatMessage({ id: 'plugin.aigenerate.setting' })}
            initialValues={setting}
            open={visible}
            //layout="horizontal"
            onOpenChange={(flag) => {
              this.handleSetVisible(flag);
              if (!flag) {
                this.props.onCancel(flag);
              }
            }}
            onFinish={async (values) => {
              this.handleSubmit(values);
            }}
          >
            <ProFormRadio.Group
              name="open"
              label={this.props.intl.formatMessage({ id: 'plugin.aigenerate.isopen' })}
              options={[
                {
                  label: this.props.intl.formatMessage({ id: 'plugin.aigenerate.isopen.no' }),
                  value: false,
                },
                {
                  label: this.props.intl.formatMessage({ id: 'plugin.aigenerate.isopen.yes' }),
                  value: true,
                },
              ]}
            />
            <ProFormRadio.Group
              name="language"
              label={this.props.intl.formatMessage({ id: 'plugin.aigenerate.language' })}
              options={[
                {
                  label: this.props.intl.formatMessage({ id: 'content.translate.zh-cn' }),
                  value: 'zh',
                },
                {
                  label: this.props.intl.formatMessage({ id: 'content.translate.en' }),
                  value: 'en',
                },
                {
                  label: this.props.intl.formatMessage({ id: 'content.translate.zh-tw' }),
                  value: 'zh-tw',
                },
                {
                  label: this.props.intl.formatMessage({ id: 'content.translate.vi' }),
                  value: 'vi',
                },
                {
                  label: this.props.intl.formatMessage({ id: 'content.translate.id' }),
                  value: 'id',
                },
                {
                  label: this.props.intl.formatMessage({ id: 'content.translate.hi' }),
                  value: 'hi',
                },
                {
                  label: this.props.intl.formatMessage({ id: 'content.translate.it' }),
                  value: 'it',
                },
                {
                  label: this.props.intl.formatMessage({ id: 'content.translate.el' }),
                  value: 'el',
                },
                {
                  label: this.props.intl.formatMessage({ id: 'content.translate.es' }),
                  value: 'es',
                },
                {
                  label: this.props.intl.formatMessage({ id: 'content.translate.pt' }),
                  value: 'pt',
                },
                {
                  label: this.props.intl.formatMessage({ id: 'content.translate.sr' }),
                  value: 'sr',
                },
                {
                  label: this.props.intl.formatMessage({ id: 'content.translate.my' }),
                  value: 'my',
                },
                {
                  label: this.props.intl.formatMessage({ id: 'content.translate.bn' }),
                  value: 'bn',
                },
                {
                  label: this.props.intl.formatMessage({ id: 'content.translate.th' }),
                  value: 'th',
                },
                {
                  label: this.props.intl.formatMessage({ id: 'content.translate.tr' }),
                  value: 'tr',
                },
                {
                  label: this.props.intl.formatMessage({ id: 'content.translate.ja' }),
                  value: 'ja',
                },
                {
                  label: this.props.intl.formatMessage({ id: 'content.translate.lo' }),
                  value: 'lo',
                },
                {
                  label: this.props.intl.formatMessage({ id: 'content.translate.ko' }),
                  value: 'ko',
                },
                {
                  label: this.props.intl.formatMessage({ id: 'content.translate.ru' }),
                  value: 'ru',
                },
                {
                  label: this.props.intl.formatMessage({ id: 'content.translate.fr' }),
                  value: 'fr',
                },
                {
                  label: this.props.intl.formatMessage({ id: 'content.translate.de' }),
                  value: 'de',
                },
                {
                  label: this.props.intl.formatMessage({ id: 'content.translate.fa' }),
                  value: 'fa',
                },
                {
                  label: this.props.intl.formatMessage({ id: 'content.translate.ar' }),
                  value: 'ar',
                },
                {
                  label: this.props.intl.formatMessage({ id: 'content.translate.ms' }),
                  value: 'ms',
                },
              ]}
            />
            <ProFormRadio.Group
              name="double_title"
              label={this.props.intl.formatMessage({ id: 'plugin.aigenerate.double-title' })}
              options={[
                {
                  label: this.props.intl.formatMessage({ id: 'content.module.field.isfilter.no' }),
                  value: false,
                },
                {
                  label: this.props.intl.formatMessage({ id: 'content.module.field.isfilter.yes' }),
                  value: true,
                },
              ]}
              extra={this.props.intl.formatMessage({
                id: 'plugin.aigenerate.double-title.description',
              })}
            />
            <ProFormRadio.Group
              name="double_split"
              label={this.props.intl.formatMessage({
                id: 'plugin.aigenerate.double-split',
              })}
              options={[
                {
                  label: this.props.intl.formatMessage({
                    id: 'plugin.aigenerate.double-split.bracket',
                  }),
                  value: 0,
                },
                {
                  label: this.props.intl.formatMessage({
                    id: 'plugin.aigenerate.double-split.line',
                  }),
                  value: 1,
                },
                {
                  label: this.props.intl.formatMessage({
                    id: 'plugin.aigenerate.double-split.question',
                  }),
                  value: 2,
                },
                {
                  label: this.props.intl.formatMessage({
                    id: 'plugin.aigenerate.double-split.comma',
                  }),
                  value: 3,
                },
                {
                  label: this.props.intl.formatMessage({
                    id: 'plugin.aigenerate.double-split.colon',
                  }),
                  value: 4,
                },
                {
                  label: this.props.intl.formatMessage({
                    id: 'plugin.aigenerate.double-split.random',
                  }),
                  value: 5,
                },
              ]}
            />
            <ProFormTextArea
              name="demand"
              label={this.props.intl.formatMessage({ id: 'plugin.aigenerate.demand' })}
              fieldProps={{
                maxLength: 500,
              }}
              extra={this.props.intl.formatMessage({ id: 'plugin.aigenerate.demand.description' })}
            />
            <ProFormRadio.Group
              name="ai_engine"
              label={this.props.intl.formatMessage({ id: 'plugin.aigenerate.source' })}
              options={[
                {
                  label: this.props.intl.formatMessage({ id: 'plugin.aigenerate.source.anqicms' }),
                  value: '',
                },
                {
                  label: this.props.intl.formatMessage({ id: 'plugin.aigenerate.source.openai' }),
                  value: 'openai',
                  disabled: !setting.api_valid,
                },
                {
                  label: this.props.intl.formatMessage({ id: 'plugin.aigenerate.source.spark' }),
                  value: 'spark',
                },
              ]}
              fieldProps={{
                onChange: (e) => {
                  this.handleChangeAiEngine(e);
                },
              }}
              extra={
                <div>
                  <span>
                    <FormattedMessage id="plugin.aigenerate.source.description" />
                  </span>
                  <Tag
                    style={{ marginLeft: 10 }}
                    className="link"
                    onClick={this.handleCheckOpenAIApi}
                  >
                    <FormattedMessage id="plugin.aigenerate.source.check-openai" />
                  </Tag>
                </div>
              }
            />
            {aiEngine === 'openai' && (
              <ProFormText
                label="OpenAI Keys"
                extra={
                  <div>
                    <div className="text-muted">
                      <div>
                        <span className="text-red">*</span>
                        <FormattedMessage id="plugin.aigenerate.openai.description" />
                      </div>
                    </div>
                    <div className="tag-lists">
                      <Space size={[12, 12]} wrap>
                        {setting.open_ai_keys?.map((tag: any, index: number) => (
                          <span className="edit-tag" key={index}>
                            <span className="key">{tag.key}</span>
                            <span className="divide">
                              <span className="value">
                                {tag.invalid
                                  ? this.props.intl.formatMessage({
                                      id: 'plugin.aigenerate.openai.invalid',
                                    })
                                  : this.props.intl.formatMessage({
                                      id: 'plugin.aigenerate.openai.valid',
                                    })}
                              </span>
                            </span>
                            <span
                              className="close"
                              onClick={this.handleRemove.bind(this, 'open_ai_keys', index)}
                            >
                              ×
                            </span>
                          </span>
                        ))}
                      </Space>
                    </div>
                  </div>
                }
              >
                <Input.Group compact>
                  <Input
                    value={tmpInput.key || ''}
                    onChange={this.handleChangeTmpInput.bind(this, 'key')}
                    onPressEnter={this.handleAddField.bind(this, 'open_ai_keys')}
                    suffix={
                      <a onClick={this.handleAddField.bind(this, 'open_ai_keys')}>
                        <FormattedMessage id="plugin.aigenerate.enter-to-add" />
                      </a>
                    }
                  />
                </Input.Group>
              </ProFormText>
            )}
            {aiEngine === 'spark' && (
              <>
                <div className="mb-normal">
                  <FormattedMessage id="plugin.aigenerate.spark.description" />:
                  <a href="https://xinghuo.xfyun.cn/sparkapi?ch=gjp" target="_blank">
                    https://xinghuo.xfyun.cn/sparkapi?ch=gjp
                  </a>
                </div>
                <ProFormRadio.Group
                  name={['spark', 'version']}
                  label={this.props.intl.formatMessage({ id: 'plugin.aigenerate.spark.version' })}
                  options={[
                    { label: 'Spark Lite(Free)', value: '1.5' },
                    { label: 'Spark V2.0', value: '2.0' },
                    { label: 'Spark Pro', value: '3.0' },
                    { label: 'Spark3.5 Max', value: '3.5' },
                  ]}
                />
                <ProFormText name={['spark', 'app_id']} label="APPID" />
                <ProFormText name={['spark', 'api_secret']} label="APISecret" />
                <ProFormText name={['spark', 'api_key']} label="APIKey" />
              </>
            )}
            <ProFormSelect
              label={this.props.intl.formatMessage({ id: 'plugin.aigenerate.default-category' })}
              name="category_ids"
              mode="multiple"
              required
              extra={this.props.intl.formatMessage({
                id: 'plugin.aigenerate.default-category.description',
              })}
              request={async () => {
                const res = await getCategories({ type: 1 });
                return res.data || [];
              }}
              fieldProps={{
                fieldNames: {
                  label: 'title',
                  value: 'id',
                },
                optionItemRender(item: any) {
                  return <div dangerouslySetInnerHTML={{ __html: item.spacer + item.title }}></div>;
                },
              }}
            />
            <ProFormRadio.Group
              name="save_type"
              label={this.props.intl.formatMessage({ id: 'plugin.aigenerate.save-type' })}
              options={[
                {
                  label: this.props.intl.formatMessage({ id: 'plugin.aigenerate.save-type.draft' }),
                  value: 0,
                },
                {
                  label: this.props.intl.formatMessage({
                    id: 'plugin.aigenerate.save-type.release',
                  }),
                  value: 1,
                },
              ]}
            />
            <ProForm.Group>
              <ProFormDigit
                name="start_hour"
                label={this.props.intl.formatMessage({ id: 'plugin.aigenerate.start-time' })}
                placeholder=""
                extra={this.props.intl.formatMessage({
                  id: 'plugin.aigenerate.start-time.description',
                })}
              />
              <ProFormDigit
                name="end_hour"
                label={this.props.intl.formatMessage({ id: 'plugin.aigenerate.end-time' })}
                placeholder=""
                extra={this.props.intl.formatMessage({
                  id: 'plugin.aigenerate.end-time.description',
                })}
              />
              <ProFormDigit
                name="daily_limit"
                label={this.props.intl.formatMessage({ id: 'plugin.aigenerate.daily-limit' })}
                placeholder=""
                extra={this.props.intl.formatMessage({
                  id: 'plugin.aigenerate.daily-limit.description',
                })}
              />
            </ProForm.Group>
            <ProFormRadio.Group
              name="insert_image"
              label={this.props.intl.formatMessage({ id: 'plugin.aigenerate.insert-image' })}
              options={[
                {
                  label: this.props.intl.formatMessage({
                    id: 'plugin.aigenerate.insert-image.default',
                  }),
                  value: 0,
                },
                {
                  label: this.props.intl.formatMessage({
                    id: 'plugin.aigenerate.insert-image.diy',
                  }),
                  value: 2,
                },
                {
                  label: this.props.intl.formatMessage({
                    id: 'plugin.aigenerate.insert-image.category',
                  }),
                  value: 3,
                },
              ]}
              fieldProps={{
                onChange: (e) => {
                  this.onChangeInsertImage(e);
                },
              }}
            />
            {insertImage === 2 && (
              <ProFormText
                label={this.props.intl.formatMessage({ id: 'plugin.aigenerate.insert-image.list' })}
              >
                <div className="insert-image">
                  <Row gutter={[16, 16]} className="image-list">
                    {setting.images?.map((item: any, index: number) => (
                      <Col span={4} key={index}>
                        <div className="image-item">
                          <div className="inner">
                            <div className="link">
                              <Image className="img" preview={true} src={item} />
                              <span
                                className="close"
                                onClick={this.handleRemove.bind(this, 'images', index)}
                              >
                                <FormattedMessage id="setting.system.delete" />
                              </span>
                            </div>
                          </div>
                        </div>
                      </Col>
                    ))}
                    <Col span={4}>
                      <div className="image-item">
                        <div className="inner">
                          <div className="link">
                            <AttachmentSelect
                              onSelect={this.handleSelectLogo}
                              open={false}
                              multiple={true}
                            >
                              <div className="ant-upload-item">
                                <div className="add">
                                  <PlusOutlined />
                                  <div style={{ marginTop: 8 }}>
                                    <FormattedMessage id="setting.system.upload" />
                                  </div>
                                </div>
                              </div>
                            </AttachmentSelect>
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </ProFormText>
            )}
            {insertImage === 3 && (
              <ProFormSelect
                label={this.props.intl.formatMessage({ id: 'plugin.aigenerate.image.category' })}
                name="image_category_id"
                required
                extra={this.props.intl.formatMessage({
                  id: 'plugin.aigenerate.image.category.description',
                })}
                request={async () => {
                  const res = await getAttachmentCategories();
                  const data = (res.data || []).concat(
                    {
                      id: 0,
                      title: this.props.intl.formatMessage({
                        id: 'plugin.aigenerate.image.category.default',
                      }),
                    },
                    {
                      id: -1,
                      title: this.props.intl.formatMessage({
                        id: 'plugin.aigenerate.image.category.all',
                      }),
                    },
                    {
                      id: -2,
                      title: this.props.intl.formatMessage({
                        id: 'plugin.aigenerate.image.category.match',
                      }),
                    },
                  );
                  return data;
                }}
                fieldProps={{
                  fieldNames: {
                    label: 'title',
                    value: 'id',
                  },
                }}
              />
            )}
            <ProFormText
              label={this.props.intl.formatMessage({ id: 'plugin.aigenerate.replace' })}
              extra={
                <div>
                  <div className="text-muted">
                    <p>
                      <FormattedMessage id="plugin.aigenerate.replace.tips1" />
                    </p>
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
                    <div>
                      <span className="text-red">*</span>{' '}
                      <FormattedMessage id="plugin.aigenerate.replace.notice" />
                    </div>
                  </div>
                  <div className="tag-lists">
                    <Space size={[12, 12]} wrap>
                      {setting.content_replace?.map((tag: any, index: number) => (
                        <span className="edit-tag" key={index}>
                          <span className="key">{tag.from}</span>
                          <span className="divide">
                            <FormattedMessage id="plugin.aigenerate.replace.to" />
                          </span>
                          <span className="value">
                            {tag.to ||
                              this.props.intl.formatMessage({ id: 'plugin.aigenerate.empty' })}
                          </span>
                          <span
                            className="close"
                            onClick={this.handleRemove.bind(this, 'content_replace', index)}
                          >
                            ×
                          </span>
                        </span>
                      ))}
                    </Space>
                  </div>
                </div>
              }
            >
              <Input.Group compact>
                <Input
                  style={{ width: '40%' }}
                  value={tmpInput.from || ''}
                  onChange={this.handleChangeTmpInput.bind(this, 'from')}
                  onPressEnter={this.handleAddField.bind(this, 'content_replace')}
                />
                <span className="input-divide">
                  <FormattedMessage id="plugin.aigenerate.replace.to" />
                </span>
                <Input
                  style={{ width: '50%' }}
                  value={tmpInput.to || ''}
                  onChange={this.handleChangeTmpInput.bind(this, 'to')}
                  onPressEnter={this.handleAddField.bind(this, 'content_replace')}
                  suffix={
                    <a onClick={this.handleAddField.bind(this, 'content_replace')}>
                      <FormattedMessage id="plugin.aigenerate.enter-to-add" />
                    </a>
                  }
                />
              </Input.Group>
            </ProFormText>
          </ModalForm>
        )}
      </>
    );
  }
}

export default injectIntl(CollectorSetting);
