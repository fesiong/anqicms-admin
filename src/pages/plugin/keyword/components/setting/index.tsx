import React from 'react';
import { ModalForm, ProFormRadio, ProFormText } from '@ant-design/pro-form';
import './index.less';
import { Input, message, Space, Tag } from 'antd';
import { getKeywordSetting, saveKeywordSetting } from '@/services';

export type KeywordSettingProps = {
  onCancel: (flag?: boolean) => void;
};

class KeywordSetting extends React.Component<KeywordSettingProps> {
  state: { [key: string]: any } = {
    visible: false,
    fetched: false,
    setting: {},
    tmpInput: {},
    selectedEngine: '',
  };

  componentDidMount() {
    getKeywordSetting().then((res) => {
      let setting = res.data;
      if (!setting.title_exclude) {
        setting.title_exclude = [];
      }
      if (!setting.title_replace) {
        setting.title_replace = [];
      }
      this.setState({
        setting: setting,
        fetched: true,
        selectedEngine: setting.from_engine,
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
    values = Object.assign(setting, values);

    const hide = message.loading('正在提交中', 0);
    saveKeywordSetting(values)
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

  handleAddField = (field: string, e: any) => {
    const { tmpInput, setting } = this.state;
    if (field == 'title_replace') {
      if (!tmpInput['from'] || tmpInput['from'] == tmpInput['to']) {
        return;
      }
      let exists = false;
      for (let item of setting[field]) {
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

  onChangeEngine = (e: any) => {
    this.setState({
      selectedEngine: e.target.value,
    });
  };

  render() {
    const { visible, fetched, setting, tmpInput, selectedEngine } = this.state;

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
            title={'关键词拓词设置'}
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
              name="auto_dig"
              label="自动拓词"
              options={[
                { label: '否', value: false },
                { label: '自动', value: true },
              ]}
            />
            <ProFormRadio.Group
              name="language"
              label="关键词语种"
              options={[
                { label: '中文', value: 'zh' },
                { label: '英文', value: 'en' },
              ]}
            />
            <ProFormRadio.Group
              name="from_engine"
              label="关键词来源"
              fieldProps={{
                onChange: (e) => {
                  this.onChangeEngine(e);
                },
              }}
              options={[
                { label: '百度', value: 'baidu' },
                { label: '搜搜', value: '360' },
                { label: '搜狗', value: 'sogou' },
                { label: '谷歌', value: 'google' },
                { label: '必应国内', value: 'bingcn' },
                { label: '必应国际', value: 'bing' },
                { label: '其他', value: 'other' },
              ]}
            />
            {selectedEngine == 'other' && (
              <ProFormText
                name="from_website"
                label="自定义来源"
                placeholder="如：https://cn.bing.com/search?q=%s"
                extra={
                  <div>
                    注意自定义来源格式必须是一个搜索列表，搜索的关键词用<Tag>%s</Tag>
                    表示，如搜索链接是：<Tag>https://cn.bing.com/search?q=安企CMS</Tag>，则将
                    <Tag>安企CMS</Tag>替换为<Tag>%s</Tag>后为：
                    <Tag>https://cn.bing.com/search?q=%s</Tag>
                  </div>
                }
              />
            )}
            <ProFormText
              label="关键词排除词"
              fieldProps={{
                value: tmpInput.title_exclude || '',
                onChange: this.handleChangeTmpInput.bind(this, 'title_exclude'),
                onPressEnter: this.handleAddField.bind(this, 'title_exclude'),
                suffix: <a onClick={this.handleAddField.bind(this, 'title_exclude')}>按回车添加</a>,
              }}
              extra={
                <div>
                  <div className="text-muted">拓词的时候，关键词中出现这些关键词，则不会采集</div>
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
              label="关键词替换"
              extra={
                <div>
                  <div className="text-muted">
                    <p>编辑需要替换的关键词对，会在拓词的时候自动执行替换。</p>
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

export default KeywordSetting;
