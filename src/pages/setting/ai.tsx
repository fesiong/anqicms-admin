import NewContainer from '@/components/NewContainer';
import { useVipModal } from '@/components/vipModal';
import { checkOpenAIApi, getSettingAi, saveSettingAi } from '@/services';
import type { ProFormInstance } from '@ant-design/pro-components';
import {
  ModalForm,
  ProForm,
  ProFormDigit,
  ProFormRadio,
  ProFormSwitch,
  ProFormText,
} from '@ant-design/pro-components';
import { FormattedMessage, useIntl, useModel } from '@umijs/max';
import { Button, Card, Input, List, message, Space, Tabs, Tag } from 'antd';
import React, { useEffect, useRef, useState } from 'react';

const SettingContactFrom: React.FC<any> = () => {
  const { initialState } = useModel('@@initialState');
  const { isVip, checkVip, VipModal } = useVipModal();
  const [fetched, setFetched] = useState<boolean>(false);
  const [writeSetting, setWriteSetting] = useState<any>({});
  const [chatSetting, setChatSetting] = useState<any>([]);
  const [mcpSetting, setMcpSetting] = useState<any>({
    enabled: false,
    token: '',
    rate_limit: 0,
    exposed_tools: [],
  });
  const mcpFormRef = useRef<ProFormInstance<any>>();
  const [editChatIndex, setEditChatIndex] = useState<number>(-1);
  const [editChatSetting, setEditChatSetting] = useState<any>({});
  const [editChatOpen, setEditChatOpen] = useState<boolean>(false);
  const [aiEngine, setAiEngine] = useState<string>('');
  const [tmpInput, setTmpInput] = useState<any>({});
  const [newKey, setNewKey] = useState<string>('');
  const intl = useIntl();

  const getSetting = async () => {
    const res = await getSettingAi();
    let setting = res.data || {};
    setAiEngine(setting?.write?.ai_engine || '');
    setWriteSetting(setting.write || {});
    setChatSetting(setting.chat || []);
    if (setting.mcp) {
      setMcpSetting(setting.mcp);
    }
    setFetched(true);
  };

  const onTabChange = (key: string) => {
    getSetting().then(() => {
      setNewKey(key);
    });
  };

  useEffect(() => {
    getSetting();
  }, []);

  const handleChangeAiEngine = (e: any) => {
    setAiEngine(e.target.value);
  };

  const handleCheckOpenAIApi = () => {
    const hide = message.loading(
      intl.formatMessage({ id: 'plugin.aigenerate.checking' }),
      0,
    );
    checkOpenAIApi()
      .then((res) => {
        if (res.code === 0) {
          message.success(res.msg);
          writeSetting.api_valid = true;
        } else {
          message.error(res.msg);
          writeSetting.api_valid = false;
        }
        setWriteSetting({ ...writeSetting });
      })
      .finally(() => {
        hide();
      });
  };

  const handleRemoveOpenAIKey = (index: number) => {
    writeSetting.open_ai_keys?.splice(index, 1);
    setWriteSetting({ ...writeSetting });
  };

  const handleAddOpenAIKey = () => {
    if (!tmpInput['key']) {
      return;
    }
    if (!writeSetting.open_ai_keys) {
      writeSetting.open_ai_keys = [];
    }
    let exists = false;
    for (const item of writeSetting.open_ai_keys) {
      if (item.key === tmpInput['key']) {
        exists = true;
        break;
      }
    }
    if (!exists) {
      writeSetting.open_ai_keys.push({
        key: tmpInput['key'],
        invalid: false,
      });

      tmpInput['key'] = '';
    }
    setWriteSetting({ ...writeSetting });
  };

  const handleChangeTmpInput = (field: string, e: any) => {
    tmpInput[field] = e.target.value;
    setTmpInput({ ...tmpInput });
  };

  const onSubmitWrite = async (values: any) => {
    const postData = Object.assign(writeSetting, values);

    const hide = message.loading(
      intl.formatMessage({ id: 'setting.system.submitting' }),
      0,
    );
    saveSettingAi({ write: postData })
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

  const onAddChatAi = () => {
    setEditChatIndex(-1);
    setEditChatSetting({
      name: '',
      base_url: '',
      api_key: '',
      model: '',
      enable_reasoning: true,
      max_tokens: 8192,
    });
    setEditChatOpen(true);
  };

  const onEditChatSetting = (index: number, item: any) => {
    checkVip(() => {
      setEditChatIndex(index);
      setEditChatSetting(
        item || {
          name: '',
          base_url: '',
          api_key: '',
          model: '',
          enable_reasoning: true,
          max_tokens: 8192,
        },
      );
      setEditChatOpen(true);
    });
  };

  const handleDeleteChatSetting = (index: number) => {
    chatSetting.splice(index, 1);
    saveSettingAi({ chat: chatSetting })
      .then((res: any) => {
        if (res.code === 0) {
          if (Array.isArray(res.data)) {
            setChatSetting(res.data);
          }
          setEditChatSetting(null);
          message.success('删除成功');
        } else {
          message.info(res.msg || '删除失败');
        }
      })
      .catch(() => message.error('删除成功'));
  };

  const onSubmitChat = async (values: any) => {
    if (!values.name || !values.base_url || !values.api_key || !values.model) {
      message.warning('请填写完整的接口信息');
      return;
    }
    const provider = Object.assign({}, editChatSetting, values);
    if (editChatIndex === -1) {
      chatSetting.push(provider);
    } else {
      chatSetting[editChatIndex] = provider;
    }

    saveSettingAi({ chat: chatSetting })
      .then((res: any) => {
        if (res.code === 0) {
          if (Array.isArray(res.data.chat)) setChatSetting(res.data.chat);
          setEditChatOpen(false);
          setEditChatSetting(null);
          message.success('保存成功');
        } else {
          message.info(res.msg || '保存失败');
        }
      })
      .catch(() => message.error('保存失败'));
  };

  const onSubmitMcp = async (values: any) => {
    const postData = {
      ...mcpSetting,
      ...values,
    };
    // 处理 exposed_tools：逗号分隔字符串转数组
    if (typeof postData.exposed_tools === 'string') {
      postData.exposed_tools = postData.exposed_tools
        .split(',')
        .map((s: string) => s.trim())
        .filter(Boolean);
    } else if (!Array.isArray(postData.exposed_tools)) {
      postData.exposed_tools = [];
    }

    const hide = message.loading(
      intl.formatMessage({ id: 'setting.system.submitting' }),
      0,
    );
    saveSettingAi({ mcp: postData })
      .then((res: any) => {
        if (res.code === 0) {
          if (res.data?.mcp) {
            setMcpSetting(res.data.mcp);
          }
          message.success(res.msg);
        } else {
          message.info(res.msg || '保存失败');
        }
      })
      .catch(() => message.error('保存失败'))
      .finally(() => {
        hide();
      });
  };

  const handleGenerateToken = () => {
    // 生成 32 位随机 token
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < 32; i++) {
      token += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    // 直接写入 ProForm 字段，避免表单内部值与 state 不同步
    mcpFormRef.current?.setFieldValue('token', token);
    setMcpSetting({ ...mcpSetting, token });
  };

  const handleCopyMcpConfig = () => {
    const baseUrl = initialState?.system?.base_url || window.location.origin;
    const token = mcpSetting.token || '';
    if (!token) {
      message.warning('请先生成鉴权 Token');
      return;
    }
    const config = {
      mcpServers: {
        anqicms: {
          url: `${baseUrl}/api/mcp`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      },
    };
    const text = JSON.stringify(config, null, 2);
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(
        () => message.success('配置已复制到剪贴板'),
        () => message.error('复制失败，请手动复制'),
      );
    } else {
      // 降级方案
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
        message.success('配置已复制到剪贴板');
      } catch {
        message.error('复制失败，请手动复制');
      }
      document.body.removeChild(textarea);
    }
  };

  return (
    <NewContainer onTabChange={(key) => onTabChange(key)}>
      <Card key={newKey}>
        {fetched && (
          <Tabs
            size="large"
            items={[
              {
                key: 'write',
                label: 'AI接口配置(写作/翻译)',
                children: (
                  <ProForm
                    initialValues={writeSetting}
                    onFinish={onSubmitWrite}
                  >
                    <ProFormRadio.Group
                      name="ai_engine"
                      label={intl.formatMessage({
                        id: 'plugin.aigenerate.source',
                      })}
                      options={[
                        {
                          label: intl.formatMessage({
                            id: 'plugin.aigenerate.source.anqicms',
                          }),
                          value: '',
                        },
                        {
                          label: intl.formatMessage({
                            id: 'plugin.aigenerate.source.openai',
                          }),
                          value: 'openai',
                        },
                        {
                          label: intl.formatMessage({
                            id: 'plugin.aigenerate.source.deepseek',
                          }),
                          value: 'deepseek',
                        },
                        {
                          label: intl.formatMessage({
                            id: 'plugin.aigenerate.source.spark',
                          }),
                          value: 'spark',
                        },
                      ]}
                      fieldProps={{
                        onChange: (e) => {
                          handleChangeAiEngine(e);
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
                            onClick={handleCheckOpenAIApi}
                          >
                            <FormattedMessage id="plugin.aigenerate.source.check-openai" />
                          </Tag>
                        </div>
                      }
                      disabled={isVip === false}
                    />
                    {!isVip ? (
                      <div
                        className="link mb-normal"
                        onClick={() => {
                          checkVip(() => {});
                        }}
                      >
                        更多AI接口为VIP功能，点击查看VIP
                      </div>
                    ) : null}
                    {(aiEngine === 'openai' || aiEngine === 'deepseek') && (
                      <>
                        <ProFormText
                          name={'open_ai_api'}
                          label={intl.formatMessage({
                            id: 'plugin.aigenerate.openai.base-url',
                          })}
                          extra={intl.formatMessage({
                            id:
                              aiEngine === 'deepseek'
                                ? 'plugin.aigenerate.openai.base-url.deepseek'
                                : 'plugin.aigenerate.openai.base-url.openai',
                          })}
                        />
                        <ProFormText
                          name={'open_ai_model'}
                          label={intl.formatMessage({
                            id: 'plugin.aigenerate.openai.model',
                          })}
                          extra={intl.formatMessage({
                            id:
                              aiEngine === 'deepseek'
                                ? 'plugin.aigenerate.openai.model.deepseek'
                                : 'plugin.aigenerate.openai.model.openai',
                          })}
                        />
                        <ProFormText
                          label="API Keys"
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
                                  {writeSetting.open_ai_keys?.map(
                                    (tag: any, index: number) => (
                                      <span className="edit-tag" key={index}>
                                        <span className="key">{tag.key}</span>
                                        <span className="divide">
                                          <span className="value">
                                            {tag.invalid
                                              ? intl.formatMessage({
                                                  id: 'plugin.aigenerate.openai.invalid',
                                                })
                                              : intl.formatMessage({
                                                  id: 'plugin.aigenerate.openai.valid',
                                                })}
                                          </span>
                                        </span>
                                        <span
                                          className="close"
                                          onClick={() =>
                                            handleRemoveOpenAIKey(index)
                                          }
                                        >
                                          ×
                                        </span>
                                      </span>
                                    ),
                                  )}
                                </Space>
                              </div>
                            </div>
                          }
                        >
                          <Input.Group compact>
                            <Input
                              value={tmpInput.key || ''}
                              onChange={(e) => handleChangeTmpInput('key', e)}
                              onPressEnter={() => handleAddOpenAIKey()}
                              suffix={
                                <a onClick={() => handleAddOpenAIKey()}>
                                  <FormattedMessage id="plugin.aigenerate.enter-to-add" />
                                </a>
                              }
                            />
                          </Input.Group>
                        </ProFormText>
                      </>
                    )}
                    {aiEngine === 'spark' && (
                      <>
                        <div className="mb-normal">
                          <FormattedMessage id="plugin.aigenerate.spark.description" />
                          :
                          <a
                            href="https://xinghuo.xfyun.cn/sparkapi?ch=gjp"
                            target="_blank"
                            rel="noreferrer"
                          >
                            https://xinghuo.xfyun.cn/sparkapi?ch=gjp
                          </a>
                        </div>
                        <ProFormRadio.Group
                          name={['spark', 'version']}
                          label={intl.formatMessage({
                            id: 'plugin.aigenerate.spark.version',
                          })}
                          options={[
                            { label: 'Spark Lite(Free)', value: '1.5' },
                            { label: 'Spark Pro', value: '3.0' },
                            { label: 'Spark Max', value: '3.5' },
                            { label: 'Spark4.0 Ultra', value: '4.0' },
                          ]}
                        />
                        <ProFormText name={['spark', 'app_id']} label="APPID" />
                        <ProFormText
                          name={['spark', 'api_secret']}
                          label="APISecret"
                        />
                        <ProFormText
                          name={['spark', 'api_key']}
                          label="APIKey"
                        />
                      </>
                    )}
                  </ProForm>
                ),
              },
              {
                key: 'chat',
                label: 'AI接口配置(AI助手)',
                children: (
                  <div>
                    <div style={{ marginBottom: 12 }}>
                      <Button type="primary" size="small" onClick={onAddChatAi}>
                        添加自定义接口
                      </Button>
                    </div>
                    {chatSetting.length === 0 ? (
                      <div
                        style={{
                          textAlign: 'center',
                          padding: '24px 0',
                          color: '#999',
                        }}
                      >
                        暂无自定义接口
                      </div>
                    ) : (
                      <List
                        size="small"
                        dataSource={chatSetting}
                        renderItem={(item: any, index: number) => (
                          <List.Item
                            actions={[
                              <Button
                                key="edit"
                                type="link"
                                size="small"
                                onClick={() => onEditChatSetting(index, item)}
                              >
                                编辑
                              </Button>,
                              <Button
                                key="delete"
                                type="link"
                                size="small"
                                danger
                                onClick={() => handleDeleteChatSetting(index)}
                              >
                                删除
                              </Button>,
                            ]}
                          >
                            <List.Item.Meta
                              title={item.name}
                              description={
                                <span style={{ fontSize: 12, color: '#999' }}>
                                  {item.base_url} | {item.model}
                                </span>
                              }
                            />
                          </List.Item>
                        )}
                      />
                    )}
                  </div>
                ),
              },
              {
                key: 'mcp',
                label: 'MCP 对外接口',
                children: (
                  <ProForm
                    formRef={mcpFormRef}
                    initialValues={{
                      enabled: mcpSetting.enabled || false,
                      token: mcpSetting.token || '',
                      rate_limit: mcpSetting.rate_limit || 0,
                      exposed_tools: Array.isArray(mcpSetting.exposed_tools)
                        ? mcpSetting.exposed_tools.join(', ')
                        : '',
                    }}
                    onFinish={onSubmitMcp}
                  >
                    <div
                      style={{
                        marginBottom: 16,
                        padding: 12,
                        background: '#f6f8fa',
                        borderRadius: 6,
                        fontSize: 13,
                        color: '#666',
                      }}
                    >
                      启用后，第三方 AI 客户端（Claude Desktop、Cursor、Cherry
                      Studio 等）可通过 MCP 协议调用本站点的 100+ 工具，
                      实现内容管理、SEO 优化等操作。端点地址：
                      <code style={{ marginLeft: 6 }}>
                        {initialState?.system?.base_url || ''}/api/mcp
                      </code>
                      <Button
                        type="link"
                        size="small"
                        onClick={handleCopyMcpConfig}
                        style={{ float: 'right', padding: 0 }}
                      >
                        一键复制配置
                      </Button>
                    </div>
                    <ProFormSwitch
                      name="enabled"
                      label="启用 MCP 对外接口"
                      extra="开启后允许第三方 AI 通过 MCP 协议访问本站点"
                    />
                    <ProFormText
                      name="token"
                      label="鉴权 Token"
                      placeholder="点击右侧按钮生成随机 Token"
                      extra="第三方 AI 调用时需在 Header 中携带 Authorization: Bearer {token}"
                      fieldProps={{
                        addonAfter: (
                          <Button size="small" onClick={handleGenerateToken}>
                            生成随机 Token
                          </Button>
                        ),
                      }}
                    />
                    <ProFormDigit
                      name="rate_limit"
                      label="速率限制（次/分钟）"
                      placeholder="0 表示不限制"
                      min={0}
                      extra="防止第三方 AI 过度调用导致服务压力过大，0 表示不限制"
                    />
                    <ProFormText
                      name="exposed_tools"
                      label="暴露的工具列表"
                      placeholder="留空表示暴露全部工具；多个工具名用英文逗号分隔"
                      extra="可限制第三方 AI 仅能调用指定工具，例如 archive_list, category_list"
                    />
                  </ProForm>
                ),
              },
            ]}
          ></Tabs>
        )}
      </Card>
      <VipModal />
      <ModalForm
        title={editChatIndex !== -1 ? '编辑自定义接口' : '添加自定义接口'}
        open={editChatOpen}
        onOpenChange={(flag) => {
          setEditChatOpen(flag);
        }}
        layout="horizontal"
        initialValues={editChatSetting || {}}
        onFinish={async (values) => {
          onSubmitChat(values);
        }}
        modalProps={{ maskClosable: false }}
        width={520}
      >
        {editChatOpen && (
          <div>
            <ProFormText
              name="name"
              label="接口名称"
              placeholder="例如：我的 DeepSeek"
              rules={[{ required: true, message: '请填写接口名称' }]}
            />
            <ProFormText
              name="base_url"
              label="API 地址"
              placeholder="https://api.openai.com/v1"
              rules={[{ required: true, message: '请填写 API 地址' }]}
            />
            <ProFormText
              name="api_key"
              label="API Key"
              placeholder="sk-xxxxxxxxxxxxxxxx"
              rules={[{ required: true, message: '请填写 API Key' }]}
            />
            <ProFormText
              name="model"
              label="模型"
              placeholder="deepseek-v4-flash"
              rules={[{ required: true, message: '请填写模型名称' }]}
            />
            <ProFormRadio.Group
              name="enable_reasoning"
              label="思考模式"
              options={[
                { label: '开启', value: true },
                { label: '关闭', value: false },
              ]}
            />
            <ProFormDigit
              name="max_tokens"
              label="最大回复长度"
              placeholder="8192"
            />
            <ProFormDigit
              name="timeout_seconds"
              label="请求超时时间"
              placeholder="120"
            />
          </div>
        )}
      </ModalForm>
    </NewContainer>
  );
};

export default SettingContactFrom;
