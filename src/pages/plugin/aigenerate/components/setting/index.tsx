import React from 'react';
import ProForm, {
  ModalForm,
  ProFormDigit,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-form';
import './index.less';
import { Input, message, Space, Tag, Image, Row, Col } from 'antd';
import {
  getAiGenerateSetting,
  saveAiGenerateSetting,
  checkOpenAIApi,
  getAttachmentCategories,
} from '@/services';
import { getCategories } from '@/services/category';
import AttachmentSelect from '@/components/attachment';
import { PlusOutlined } from '@ant-design/icons';

export type CollectorSettingProps = {
  onCancel: (flag?: boolean) => void;
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
      message.error('统一要求不能超过500个字符');
      return;
    }
    const postData = Object.assign(setting, values);

    const hide = message.loading('正在提交中', 0);
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
    if (field == 'content_replace') {
      if (!tmpInput['from'] || tmpInput['from'] == tmpInput['to']) {
        return;
      }
      let exists = false;
      for (const item of setting[field]) {
        if (item.from == tmpInput['from']) {
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
    } else if (field == 'open_ai_keys') {
      if (!tmpInput['key']) {
        return;
      }
      let exists = false;
      for (const item of setting[field]) {
        if (item.key == tmpInput['key']) {
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
        if (setting['images'][i] == row.logo) {
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
    const hide = message.loading('正在检查中', 0);
    checkOpenAIApi()
      .then((res) => {
        if (res.code == 0) {
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
            title={'AI自动写作设置'}
            initialValues={setting}
            visible={visible}
            //layout="horizontal"
            onVisibleChange={(flag) => {
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
              label="是否自动写作"
              options={[
                { label: '否', value: false },
                { label: '自动按计划写作', value: true },
              ]}
            />
            <ProFormRadio.Group
              name="language"
              label="写作文章语种"
              options={[
                { label: '中文', value: 'zh' },
                { label: '英文', value: 'en' },
              ]}
            />
            <ProFormRadio.Group
              name="double_title"
              label="生成双标题"
              options={[
                { label: '否', value: false },
                { label: '是', value: true },
              ]}
              extra="仅中文支持"
            />
            <ProFormRadio.Group
              name="double_split"
              label="双标题方式"
              options={[
                { label: '主标题(副标题)', value: 0 },
                { label: '主标题-副标题', value: 1 },
                { label: '主标题？副标题', value: 2 },
                { label: '主标题，副标题', value: 3 },
                { label: '主标题：副标题', value: 4 },
                { label: '随机', value: 5 },
              ]}
            />
            <ProFormTextArea
              name="demand"
              label="写作统一要求"
              fieldProps={{
                maxLength: 500,
              }}
              extra="可以定义所有AI写作文章的统一要求，不超过200字符。 默认留空即可"
            />
            <ProFormRadio.Group
              name="ai_engine"
              label="AI写作来源"
              options={[
                { label: '安企CMS官网', value: '' },
                { label: '自备OpenAIKey', value: 'openai', disabled: !setting.api_valid },
                { label: '星火大模型', value: 'spark' },
              ]}
              fieldProps={{
                onChange: (e) => {
                  this.handleChangeAiEngine(e);
                },
              }}
              extra={
                <div>
                  <span>声明：仅有使用安企CMS搭建的海外网站可选自备OpenAIKey。</span>
                  <Tag
                    style={{ marginLeft: 10 }}
                    className="link"
                    onClick={this.handleCheckOpenAIApi}
                  >
                    检查OpenAI接口
                  </Tag>
                </div>
              }
            />
            {aiEngine == 'openai' && (
              <ProFormText
                label="OpenAI Keys"
                extra={
                  <div>
                    <div className="text-muted">
                      <div>
                        <span className="text-red">*</span> OpenAI Key 一般以 <Tag>sk-</Tag>{' '}
                        开头，可以添加多个key，程序会每次会随机选择一个key使用。
                      </div>
                    </div>
                    <div className="tag-lists">
                      <Space size={[12, 12]} wrap>
                        {setting.open_ai_keys?.map((tag: any, index: number) => (
                          <span className="edit-tag" key={index}>
                            <span className="key">{tag.key}</span>
                            <span className="divide">
                              <span className="value">{tag.invalid ? '已失效' : '有效'}</span>
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
                      <a onClick={this.handleAddField.bind(this, 'open_ai_keys')}>按回车添加</a>
                    }
                  />
                </Input.Group>
              </ProFormText>
            )}
            {aiEngine == 'spark' && (
              <>
                <div className="mb-normal">
                  星火大模型API申请地址：
                  <a href="https://xinghuo.xfyun.cn/sparkapi?ch=gjp" target="_blank">
                    https://xinghuo.xfyun.cn/sparkapi?ch=gjp
                  </a>
                </div>
                <ProFormRadio.Group
                  name={['spark', 'version']}
                  label="星火模型版本"
                  options={[
                    { label: 'Spark Lite(免费)', value: '1.5' },
                    { label: 'Spark V2.0', value: '2.0' },
                    { label: 'Spark Pro', value: '3.0' },
                    { label: 'Spark3.5 Max', value: '3.5' },
                  ]}
                />
                <ProFormText name={['spark', 'app_id']} label="星火APPID" />
                <ProFormText name={['spark', 'api_secret']} label="星火APISecret" />
                <ProFormText name={['spark', 'api_key']} label="星火APIKey" />
              </>
            )}
            <ProFormSelect
              label="默认发布文章分类"
              name="category_ids"
              mode="multiple"
              required
              extra={
                <div>
                  如果关键词没设置分类，则采集到的文章默认会被随机归类到其中一个分类下,
                  <span className="text-red">必须设置一个分类否则无法正常采集</span>
                </div>
              }
              request={async () => {
                const res = await getCategories({ type: 1 });
                return res.data || [];
              }}
              fieldProps={{
                fieldNames: {
                  label: 'title',
                  value: 'id',
                },
                optionItemRender(item) {
                  return <div dangerouslySetInnerHTML={{ __html: item.spacer + item.title }}></div>;
                },
              }}
            />
            <ProFormRadio.Group
              name="save_type"
              label="文章处理方式"
              options={[
                { label: '存入草稿箱', value: 0 },
                { label: '正常发布', value: 1 },
              ]}
            />
            <ProForm.Group>
              <ProFormDigit
                name="start_hour"
                label="每天开始时间"
                placeholder=""
                extra="请填写0-23的数字，0表示不限"
              />
              <ProFormDigit
                name="end_hour"
                label="每天结束时间"
                placeholder=""
                extra="请填写0-23的数字，0表示不限"
              />
              <ProFormDigit
                name="daily_limit"
                label="每日发布限额"
                placeholder=""
                extra="每日最大发布文章量，0表示不限"
              />
            </ProForm.Group>
            <ProFormRadio.Group
              name="insert_image"
              label="文章图片处理"
              options={[
                { label: '默认', value: 0 },
                { label: '自定义插入图片', value: 2 },
                { label: '插入指定分类图片', value: 3 },
              ]}
              fieldProps={{
                onChange: (e) => {
                  this.onChangeInsertImage(e);
                },
              }}
            />
            {insertImage == 2 && (
              <ProFormText label="供插入的图片列表">
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
                                移除
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
                              visible={false}
                              multiple={true}
                            >
                              <div className="ant-upload-item">
                                <div className="add">
                                  <PlusOutlined />
                                  <div style={{ marginTop: 8 }}>上传</div>
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
            {insertImage == 3 && (
              <ProFormSelect
                label="图片分类"
                name="image_category_id"
                required
                extra={
                  <div>
                    会自动从指定的图片资源分类中选择图片。如果选择尝试关键词匹配图片名称，则会尝试将文章关键词和图片名称进行匹配，如果匹配成功则使用图片。
                  </div>
                }
                request={async () => {
                  const res = await getAttachmentCategories();
                  const data = (res.data || []).concat(
                    { id: 0, title: '未分类图片' },
                    { id: -1, title: '全部图片' },
                    { id: -2, title: '尝试关键词匹配图片名称' },
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
              label="内容替换"
              extra={
                <div>
                  <div className="text-muted">
                    <p>编辑需要替换的关键词对，会在发布文章的时候自动执行替换。</p>
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
                    <div>
                      <span className="text-red">*</span>{' '}
                      注意：正则表达式规则书写不当很容易造成错误的替换效果，如微信号规则，会同时影响到邮箱地址、网址的完整性。请谨慎使用。
                    </div>
                  </div>
                  <div className="tag-lists">
                    <Space size={[12, 12]} wrap>
                      {setting.content_replace?.map((tag: any, index: number) => (
                        <span className="edit-tag" key={index}>
                          <span className="key">{tag.from}</span>
                          <span className="divide">替换为</span>
                          <span className="value">{tag.to || '空'}</span>
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
                <span className="input-divide">替换为</span>
                <Input
                  style={{ width: '50%' }}
                  value={tmpInput.to || ''}
                  onChange={this.handleChangeTmpInput.bind(this, 'to')}
                  onPressEnter={this.handleAddField.bind(this, 'content_replace')}
                  suffix={
                    <a onClick={this.handleAddField.bind(this, 'content_replace')}>按回车添加</a>
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

export default CollectorSetting;
