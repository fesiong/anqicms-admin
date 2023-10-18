import React from 'react';
import ProForm, {
  ModalForm,
  ProFormDigit,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-form';
import './index.less';
import { Input, message, Space, Tag, Image, Row, Col } from 'antd';
import { getCollectorSetting, saveCollectorSetting } from '@/services/collector';
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
  };

  componentDidMount() {
    getCollectorSetting().then((res) => {
      const setting = res.data;
      if (!setting.title_exclude) {
        setting.title_exclude = [];
      }
      if (!setting.title_exclude_prefix) {
        setting.title_exclude_prefix = [];
      }
      if (!setting.title_exclude_suffix) {
        setting.title_exclude_suffix = [];
      }
      if (!setting.content_exclude_line) {
        setting.content_exclude_line = [];
      }
      if (!setting.content_exclude) {
        setting.content_exclude = [];
      }
      if (!setting.link_exclude) {
        setting.link_exclude = [];
      }
      if (!setting.content_replace) {
        setting.content_replace = [];
      }
      if (!setting.images) {
        setting.images = [];
      }
      this.setState({
        setting: setting,
        fetched: true,
        insertImage: setting.insert_image,
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
    const postData = Object.assign(setting, values);

    const hide = message.loading('正在提交中', 0);
    saveCollectorSetting(postData)
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

  handleSelectLogo = (row: any) => {
    const { setting } = this.state;
    setting['images'].push(row.logo);
    this.setState({
      setting,
    });
  };

  render() {
    const { visible, fetched, setting, tmpInput, insertImage } = this.state;

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
            title={'采集和AI改写设置'}
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
              name="auto_collect"
              label="是否自动采集"
              options={[
                { label: '否', value: false },
                { label: '自动按计划采集', value: true },
              ]}
            />
            <ProFormRadio.Group
              name="language"
              label="采集文章语种"
              options={[
                { label: '中文', value: 'zh' },
                { label: '英文', value: 'en' },
              ]}
            />
            <ProFormRadio.Group
              name="collect_mode"
              label="采集模式"
              options={[
                { label: '文章采集', value: 0 },
                { label: '问答组合', value: 1 },
              ]}
              extra={
                <div>
                  文章采集模式，会按原文采集整篇文章；问答组合模式，会从搜索问答列表中采集并组合成文章。
                </div>
              }
            />
            <ProFormText
              name="from_website"
              label="自定义来源"
              placeholder="如：https://cn.bing.com/search?q=%s"
              extra={
                <div>
                  文章采集可用，注意自定义来源格式必须是一个搜索列表，搜索的关键词用<Tag>%s</Tag>
                  表示，如搜索链接是：<Tag>https://cn.bing.com/search?q=安企CMS</Tag>，则将
                  <Tag>安企CMS</Tag>替换为<Tag>%s</Tag>后为：
                  <Tag>https://cn.bing.com/search?q=%s</Tag>
                </div>
              }
            />
            <ProFormSelect
              label="默认发布文章分类"
              name="category_id"
              required
              extra={
                <div>
                  如果关键词没设置分类，则采集到的文章默认会被归类到这个分类下,
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
            <ProFormDigit
              name="title_min_length"
              label="标题最少字数"
              placeholder="默认10个字"
              extra="采集文章的时候，标题字数少于指定的字数，则不会采集"
            />
            <ProFormDigit
              name="content_min_length"
              label="内容最少字数"
              placeholder="默认400个字"
              extra="采集文章的时候，文章内容字数少于指定的字数，则不会采集"
            />
            <ProFormRadio.Group
              name="auto_pseudo"
              label="是否AI改写"
              options={[
                { label: '否', value: false },
                { label: '进行AI改写', value: true },
              ]}
              extra="AI改写只支持文章采集和问答组合。需要付费。"
            />
            <ProFormRadio.Group
              name="auto_translate"
              label="是否翻译"
              options={[
                { label: '否', value: false },
                { label: '进行翻译', value: true },
              ]}
              extra="翻译需要付费。注意：AI改写和翻译不能同时启用，否则结果会出错"
            />
            <ProFormSelect
              label="翻译目标语言"
              name="to_language"
              extra="选择自动翻译后有效"
              valueEnum={{
                en: '英语',
                'zh-CN': '简体中文',
                'zh-TW': '繁体中文',
                vi: '越南语',
                id: '印尼语',
                hi: '印地语',
                it: '意大利语',
                el: '希腊语',
                es: '西班牙语',
                pt: '葡萄牙语',
                sr: '塞尔维亚语',
                my: '缅甸语',
                bn: '孟加拉语',
                th: '泰语',
                tr: '土耳其语',
                ja: '日语',
                lo: '老挝语',
                ko: '韩语',
                ru: '俄语',
                fr: '法语',
                de: '德语',
                fa: '波斯语',
                ar: '阿拉伯语',
                ms: '马来语',
              }}
            />
            <ProForm.Group>
              <ProFormDigit
                name="start_hour"
                label="每天开始时间"
                placeholder="默认8点开始"
                extra="请填写0-23的数字，0表示不限"
              />
              <ProFormDigit
                name="end_hour"
                label="每天结束时间"
                placeholder="默认22点结束"
                extra="请填写0-23的数字，0表示不限"
              />
              <ProFormDigit
                name="daily_limit"
                label="每日采集限额"
                placeholder="默认1000"
                extra="每日最大发布文章量，0表示不限"
              />
            </ProForm.Group>
            <ProFormRadio.Group
              name="insert_image"
              label="采集图片处理"
              options={[
                { label: '移除图片', value: 0 },
                { label: '保留原图片', value: 1 },
                { label: '自定义插入图片', value: 2 },
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
                            <AttachmentSelect onSelect={this.handleSelectLogo} visible={false}>
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
            <ProFormText
              label="标题排除词"
              fieldProps={{
                value: tmpInput.title_exclude || '',
                onChange: this.handleChangeTmpInput.bind(this, 'title_exclude'),
                onPressEnter: this.handleAddField.bind(this, 'title_exclude'),
                suffix: <a onClick={this.handleAddField.bind(this, 'title_exclude')}>按回车添加</a>,
              }}
              extra={
                <div>
                  <div className="text-muted">采集文章的时候，标题出现这些关键词，则不会采集</div>
                  <div className="tag-lists">
                    <Space size={[12, 12]} wrap>
                      {setting.title_exclude?.map((tag: any, index: number) => (
                        <span className="edit-tag" key={index}>
                          <span className="key">{tag}</span>
                          <span
                            className="close"
                            onClick={this.handleRemove.bind(this, 'title_exclude', index)}
                          >
                            ×
                          </span>
                        </span>
                      ))}
                    </Space>
                  </div>
                </div>
              }
            />
            <ProFormText
              label="标题开头排除词"
              fieldProps={{
                value: tmpInput.title_exclude_prefix || '',
                onChange: this.handleChangeTmpInput.bind(this, 'title_exclude_prefix'),
                onPressEnter: this.handleAddField.bind(this, 'title_exclude_prefix'),
                suffix: (
                  <a onClick={this.handleAddField.bind(this, 'title_exclude_prefix')}>按回车添加</a>
                ),
              }}
              extra={
                <div>
                  <div className="text-muted">
                    采集文章的时候，标题开头出现这些关键词，则不会采集
                  </div>
                  <div className="tag-lists">
                    <Space size={[12, 12]} wrap>
                      {setting.title_exclude_prefix?.map((tag: any, index: number) => (
                        <span className="edit-tag" key={index}>
                          <span className="key">{tag}</span>
                          <span
                            className="close"
                            onClick={this.handleRemove.bind(this, 'title_exclude_prefix', index)}
                          >
                            ×
                          </span>
                        </span>
                      ))}
                    </Space>
                  </div>
                </div>
              }
            />
            <ProFormText
              label="标题结尾排除词"
              fieldProps={{
                value: tmpInput.title_exclude_suffix || '',
                onChange: this.handleChangeTmpInput.bind(this, 'title_exclude_suffix'),
                onPressEnter: this.handleAddField.bind(this, 'title_exclude_suffix'),
                suffix: (
                  <a onClick={this.handleAddField.bind(this, 'title_exclude_suffix')}>按回车添加</a>
                ),
              }}
              extra={
                <div>
                  <div className="text-muted">
                    采集文章的时候，标题结尾出现这些关键词，则不会采集
                  </div>
                  <div className="tag-lists">
                    <Space size={[12, 12]} wrap>
                      {setting.title_exclude_suffix?.map((tag: any, index: number) => (
                        <span className="edit-tag" key={index}>
                          <span className="key">{tag}</span>
                          <span
                            className="close"
                            onClick={this.handleRemove.bind(this, 'title_exclude_suffix', index)}
                          >
                            ×
                          </span>
                        </span>
                      ))}
                    </Space>
                  </div>
                </div>
              }
            />
            <ProFormText
              label="内容忽略行"
              fieldProps={{
                value: tmpInput.content_exclude_line || '',
                onChange: this.handleChangeTmpInput.bind(this, 'content_exclude_line'),
                onPressEnter: this.handleAddField.bind(this, 'content_exclude_line'),
                suffix: (
                  <a onClick={this.handleAddField.bind(this, 'content_exclude_line')}>按回车添加</a>
                ),
              }}
              extra={
                <div>
                  <div className="text-muted">
                    采集文章的时候，内容出现这些词的那一行，将会被移除
                  </div>
                  <div className="tag-lists">
                    <Space size={[12, 12]} wrap>
                      {setting.content_exclude_line?.map((tag: any, index: number) => (
                        <span className="edit-tag" key={index}>
                          <span className="key">{tag}</span>
                          <span
                            className="close"
                            onClick={this.handleRemove.bind(this, 'content_exclude_line', index)}
                          >
                            ×
                          </span>
                        </span>
                      ))}
                    </Space>
                  </div>
                </div>
              }
            />
            <ProFormText
              label="链接忽略"
              fieldProps={{
                value: tmpInput.link_exclude || '',
                onChange: this.handleChangeTmpInput.bind(this, 'link_exclude'),
                onPressEnter: this.handleAddField.bind(this, 'link_exclude'),
                suffix: <a onClick={this.handleAddField.bind(this, 'link_exclude')}>按回车添加</a>,
              }}
              extra={
                <div>
                  <div className="text-muted">采集文章的时候，链接出现这些关键词的，则不会采集</div>
                  <div className="tag-lists">
                    <Space size={[12, 12]} wrap>
                      {setting.link_exclude?.map((tag: any, index: number) => (
                        <span className="edit-tag" key={index}>
                          <span className="key">{tag}</span>
                          <span
                            className="close"
                            onClick={this.handleRemove.bind(this, 'link_exclude', index)}
                          >
                            ×
                          </span>
                        </span>
                      ))}
                    </Space>
                  </div>
                </div>
              }
            />
            <ProFormText
              label="内容排除"
              fieldProps={{
                value: tmpInput.content_exclude || '',
                onChange: this.handleChangeTmpInput.bind(this, 'content_exclude'),
                onPressEnter: this.handleAddField.bind(this, 'content_exclude'),
                suffix: (
                  <a onClick={this.handleAddField.bind(this, 'content_exclude')}>按回车添加</a>
                ),
              }}
              extra={
                <div>
                  <div className="text-muted">采集文章的时候，内容出现这些词，则整篇文章都丢弃</div>
                  <div className="tag-lists">
                    <Space size={[12, 12]} wrap>
                      {setting.content_exclude?.map((tag: any, index: number) => (
                        <span className="edit-tag" key={index}>
                          <span className="key">{tag}</span>
                          <span
                            className="close"
                            onClick={this.handleRemove.bind(this, 'content_exclude', index)}
                          >
                            ×
                          </span>
                        </span>
                      ))}
                    </Space>
                  </div>
                </div>
              }
            />
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
