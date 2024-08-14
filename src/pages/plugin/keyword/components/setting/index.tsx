import { getKeywordSetting, saveKeywordSetting } from '@/services';
import { ModalForm, ProFormDigit, ProFormRadio, ProFormText } from '@ant-design/pro-components';
import { Input, Space, Tag, message } from 'antd';
import React from 'react';
import './index.less';
import { IntlShape } from 'react-intl';
import { FormattedMessage, injectIntl } from '@umijs/max';

export type intlProps = {
  intl: IntlShape;
};

export type KeywordSettingProps = {
  onCancel: (flag?: boolean) => void;
  children?: React.ReactNode;
};

class KeywordSetting extends React.Component<KeywordSettingProps & intlProps> {
  state: { [key: string]: any } = {
    visible: false,
    fetched: false,
    setting: {},
    tmpInput: {},
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
      });
    });
  }

  handleSetVisible = (visible: boolean) => {
    this.setState({
      visible,
    });
  };

  handleSubmit = async (data: any) => {
    const { setting } = this.state;
    let values = Object.assign(setting, data);
    values.max_count = Number(values.max_count);

    const hide = message.loading(this.props.intl.formatMessage({ id: 'setting.system.submitting' }), 0);
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

  handleAddField = (field: string) => {
    const { tmpInput, setting } = this.state;
    if (field === 'title_replace') {
      if (!tmpInput['from'] || tmpInput['from'] === tmpInput['to']) {
        return;
      }
      let exists = false;
      for (let item of setting[field]) {
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
    } else {
      setting[field].push(tmpInput[field]);
      tmpInput[field] = '';
    }
    this.setState({
      tmpInput,
      setting,
    });
  };

  render() {
    const { visible, fetched, setting, tmpInput } = this.state;

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
            title={this.props.intl.formatMessage({ id: 'plugin.keyword.dig-setting' })}
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
              name="auto_dig"
              label={this.props.intl.formatMessage({ id: 'plugin.keyword.dig-setting.auto-dig' })}
              options={[
                { label: this.props.intl.formatMessage({ id: 'plugin.keyword.dig-setting.auto-dig.no' }), value: false },
                { label: this.props.intl.formatMessage({ id: 'plugin.keyword.dig-setting.auto-dig.yes' }), value: true },
              ]}
            />
            <ProFormDigit
              name="max_count"
              label={this.props.intl.formatMessage({ id: 'plugin.keyword.dig-setting.max-count' })}
              extra={this.props.intl.formatMessage({ id: 'plugin.keyword.dig-setting.max-count.description' })}
              placeholder={this.props.intl.formatMessage({ id: 'plugin.keyword.dig-setting.max-count.placeholder' })}
            />
            <ProFormRadio.Group
              name="language"
              label={this.props.intl.formatMessage({ id: 'plugin.keyword.dig-setting.language' })}
              options={[
                { label: this.props.intl.formatMessage({ id: 'content.translate.zh-cn' }), value: 'zh' },
                { label: this.props.intl.formatMessage({ id: 'content.translate.en' }), value: 'en' },
              ]}
            />
            <ProFormText
              label={this.props.intl.formatMessage({ id: 'plugin.keyword.dig-setting.title-exclude' })}
              fieldProps={{
                value: tmpInput.title_exclude || '',
                onChange: this.handleChangeTmpInput.bind(this, 'title_exclude'),
                onPressEnter: this.handleAddField.bind(this, 'title_exclude'),
                suffix: <a onClick={this.handleAddField.bind(this, 'title_exclude')}><FormattedMessage id="plugin.aigenerate.enter-to-add" /></a>,
              }}
              extra={
                <div>
                  <div className="text-muted"><FormattedMessage id="plugin.keyword.dig-setting.title-exclude.description" /></div>
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
              label={this.props.intl.formatMessage({ id: 'plugin.keyword.dig-setting.replace' })}
              extra={
                <div>
                  <div className="text-muted">
                    <p><FormattedMessage id="plugin.keyword.dig-setting.replace.tips1" /></p>
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
                          <span className="divide"><FormattedMessage id="plugin.aigenerate.replace.to" /></span>
                          <span className="value">{tag.to || this.props.intl.formatMessage({ id: 'plugin.aigenerate.empty' })}</span>
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
                <span className="input-divide"><FormattedMessage id="plugin.aigenerate.replace.to" /></span>
                <Input
                  style={{ width: '50%' }}
                  value={tmpInput.to || ''}
                  onChange={this.handleChangeTmpInput.bind(this, 'to')}
                  onPressEnter={this.handleAddField.bind(this, 'content_replace')}
                  suffix={
                    <a onClick={this.handleAddField.bind(this, 'content_replace')}><FormattedMessage id="plugin.aigenerate.enter-to-add" /></a>
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

export default injectIntl(KeywordSetting);
