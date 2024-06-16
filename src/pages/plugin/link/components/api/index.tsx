import { pluginGetImportApiSetting, pluginUpdateApiToken } from '@/services';
import { ModalForm, ProCard, ProFormText } from '@ant-design/pro-components';
import { history } from '@umijs/max';
import { Alert, Button, Modal, Space, Table, Tag, Tooltip, message } from 'antd';
import React, { useEffect, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import './index.less';

const PluginLinkApi: React.FC<any> = (props) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [tokenVidible, setTokenVisible] = useState<boolean>(false);
  const [tab, setTab] = useState('1');
  const [setting, setSetting] = useState<any>({});

  const getSetting = async () => {
    const res = await pluginGetImportApiSetting();
    setSetting(res.data || {});
  };

  useEffect(() => {
    getSetting();
    let hash = history.location.hash || '';
    if (hash) {
      hash = hash.replaceAll('#', '');
      setTab(hash);
    }
  }, []);

  const handleUpdateToken = async (values: any) => {
    if (values.link_token == '') {
      message.error('请填写Token，128字符以内');
      return;
    }
    Modal.confirm({
      title: '确定要更新Token吗？',
      content: '更新后，原Token失效，请使用新api地址操作。',
      onOk: async () => {
        const res = await pluginUpdateApiToken(values);
        message.info(res.msg);
        getSetting();
        setTokenVisible(false);
      },
    });
  };

  const handleCopied = () => {
    message.success('复制成功');
  };

  return (
    <>
      <div
        onClick={() => {
          setVisible(!visible);
        }}
      >
        {props.children}
      </div>
      <Modal
        width={1000}
        zIndex={10}
        open={visible}
        onCancel={() => {
          setVisible(false);
        }}
        footer={null}
        title="友情链接API"
      >
        <Alert
          message={
            <div>
              <div>
                <Space>
                  <span>我的Token：</span>
                  <Tag>
                    <CopyToClipboard text={setting.link_token} onCopy={handleCopied}>
                      <Tooltip title="点击复制">{setting.link_token}</Tooltip>
                    </CopyToClipboard>
                  </Tag>
                  <Button
                    size="small"
                    onClick={() => {
                      setTokenVisible(true);
                    }}
                  >
                    更新Token
                  </Button>
                </Space>
              </div>
            </div>
          }
        />
        <div className="mt-normal">
          <ProCard
            tabs={{
              tabPosition: 'left',
              activeKey: tab,
              onChange: (key: string) => {
                setTab(key);
              },
            }}
          >
            <ProCard.TabPane key="1" tab="获取友情链接列表接口">
              <div className="import-fields">
                <div className="field-item">
                  <div className="name">接口地址：</div>
                  <div className="value">
                    <CopyToClipboard
                      text={setting.base_url + '/api/friendlink/list?token=' + setting.link_token}
                      onCopy={handleCopied}
                    >
                      <Tooltip title="点击复制">
                        {setting.base_url}/api/friendlink/list?token={setting.link_token}
                      </Tooltip>
                    </CopyToClipboard>
                  </div>
                </div>
                <div className="field-item">
                  <div className="name">请求方式：</div>
                  <div className="value">POST / GET</div>
                </div>
                <div className="field-item">
                  <div className="name">请求类型：</div>
                  <div className="value">form-data / query params</div>
                </div>
                <div className="field-item">
                  <div className="name">
                    POST表单 /<br /> Query Params 字段：
                  </div>
                  <div className="value">无</div>
                </div>
                <div className="field-item">
                  <div className="name">返回格式：</div>
                  <div className="value">JSON</div>
                </div>
                <div className="field-item">
                  <div className="name">正确结果示例：</div>
                  <div className="value">
                    <Alert
                      message={
                        <pre>
                          <code>
                            {
                              '{\n    "code": 200,   //返回200表示数据正确，其他值均为错误\n    "msg": "",   //如果有错误，则这里会描述错误的原因\n    "data": {\n'
                            }

                            {'      [\n'}
                            {
                              '        {\n          "id": 1,\n          "link": "https://www.anqicms.com/",\n          "title": "AnqiCMS",\n        },\n'
                            }
                            {
                              '        {\n          "id": 2,\n          "link": "https://www.baidu.com/",\n          "title": "百度",\n        }\n'
                            }
                            {'      ]\n'}

                            {'    }\n}'}
                          </code>
                        </pre>
                      }
                    />
                  </div>
                </div>
                <div className="field-item">
                  <div className="name">错误结果示例：</div>
                  <div className="value">
                    <Alert
                      message={
                        <pre>
                          <code>
                            {
                              '{\n    "code": -1,   //返回200表示数据正确，其他值均为错误\n    "msg": "Token错误",   //如果有错误，则这里会描述错误的原因\n}'
                            }
                          </code>
                        </pre>
                      }
                    />
                  </div>
                </div>
              </div>
            </ProCard.TabPane>

            <ProCard.TabPane key="2" tab="验证接口">
              <div className="import-fields">
                <div className="field-item">
                  <div className="name">接口地址：</div>
                  <div className="value">
                    <CopyToClipboard
                      text={setting.base_url + '/api/friendlink/check?token=' + setting.link_token}
                      onCopy={handleCopied}
                    >
                      <Tooltip title="点击复制">
                        {setting.base_url}/api/friendlink/check?token={setting.link_token}
                      </Tooltip>
                    </CopyToClipboard>
                  </div>
                </div>
                <div className="field-item">
                  <div className="name">请求方式：</div>
                  <div className="value">POST / GET</div>
                </div>
                <div className="field-item">
                  <div className="name">请求类型：</div>
                  <div className="value">form-data / query params</div>
                </div>
                <div className="field-item">
                  <div className="name">
                    POST表单 /<br /> Query Params 字段：
                  </div>
                  <div className="value">无</div>
                </div>
                <div className="field-item">
                  <div className="name">返回格式：</div>
                  <div className="value">JSON</div>
                </div>
                <div className="field-item">
                  <div className="name">正确结果示例：</div>
                  <div className="value">
                    <Alert
                      message={
                        <pre>
                          <code>
                            {
                              '{\n    "code": 200,   //返回200表示数据正确，其他值均为错误\n    "msg": "",   //如果有错误，则这里会描述错误的原因'
                            }
                            {'\n}'}
                          </code>
                        </pre>
                      }
                    />
                  </div>
                </div>
                <div className="field-item">
                  <div className="name">错误结果示例：</div>
                  <div className="value">
                    <Alert
                      message={
                        <pre>
                          <code>
                            {
                              '{\n    "code": -1,   //返回200表示数据正确，其他值均为错误\n    "msg": "Token错误",   //如果有错误，则这里会描述错误的原因\n}'
                            }
                          </code>
                        </pre>
                      }
                    />
                  </div>
                </div>
              </div>
            </ProCard.TabPane>
            <ProCard.TabPane key="3" tab="添加友情链接接口">
              <div className="import-fields">
                <div className="field-item">
                  <div className="name">接口地址：</div>
                  <div className="value">
                    <CopyToClipboard
                      text={setting.base_url + '/api/friendlink/create?token=' + setting.link_token}
                      onCopy={handleCopied}
                    >
                      <Tooltip title="点击复制">
                        {setting.base_url}/api/friendlink/create?token={setting.link_token}
                      </Tooltip>
                    </CopyToClipboard>
                  </div>
                </div>
                <div className="field-item">
                  <div className="name">请求方式：</div>
                  <div className="value">POST</div>
                </div>
                <div className="field-item">
                  <div className="name">请求类型：</div>
                  <div className="value">form-data</div>
                </div>
                <div className="field-item">
                  <div className="name">POST表单字段：</div>
                  <div className="value">
                    <Table
                      size="small"
                      pagination={false}
                      columns={[
                        {
                          title: '字段名',
                          dataIndex: 'title',
                          width: 150,
                        },
                        {
                          title: '是否必填',
                          dataIndex: 'required',
                          width: 100,
                          render: (text: number) => <span>{text ? '必填' : '否'}</span>,
                        },
                        {
                          title: '说明',
                          dataIndex: 'remark',
                        },
                      ]}
                      dataSource={[
                        {
                          title: 'title',
                          required: true,
                          remark: '对方关键词',
                        },
                        {
                          title: 'link',
                          required: true,
                          remark: '对方链接',
                        },
                        {
                          title: 'nofollow',
                          required: false,
                          remark: '是否添加nofollow，可选值：0 不添加, 1 添加',
                        },
                        {
                          title: 'back_link',
                          required: false,
                          remark: '对方反链页',
                        },
                        {
                          title: 'my_title',
                          required: false,
                          remark: '我的关键词',
                        },
                        {
                          title: 'my_link',
                          required: false,
                          remark: '我的链接',
                        },
                        {
                          title: 'contact',
                          required: false,
                          remark: '对方联系方式',
                        },
                        {
                          title: 'remark',
                          required: false,
                          remark: '备注信息',
                        },
                      ]}
                      key="title"
                    />
                  </div>
                </div>
                <div className="field-item">
                  <div className="name">返回格式：</div>
                  <div className="value">JSON</div>
                </div>
                <div className="field-item">
                  <div className="name">正确结果示例：</div>
                  <div className="value">
                    <Alert
                      message={
                        <pre>
                          <code>
                            {
                              '{\n    "code": 200,   //返回200表示数据正确，其他值均为错误\n    "msg": "链接已保存",   //如果有错误，则这里会描述错误的原因\n}'
                            }
                          </code>
                        </pre>
                      }
                    />
                  </div>
                </div>
                <div className="field-item">
                  <div className="name">错误结果示例：</div>
                  <div className="value">
                    <Alert
                      message={
                        <pre>
                          <code>
                            {
                              '{\n    "code": -1,   //返回200表示数据正确，其他值均为错误\n    "msg": "Token错误",   //如果有错误，则这里会描述错误的原因\n}'
                            }
                          </code>
                        </pre>
                      }
                    />
                  </div>
                </div>
              </div>
            </ProCard.TabPane>
            <ProCard.TabPane key="4" tab="删除友情链接接口">
              <div className="import-fields">
                <div className="field-item">
                  <div className="name">接口地址：</div>
                  <div className="value">
                    <CopyToClipboard
                      text={setting.base_url + '/api/friendlink/delete?token=' + setting.link_token}
                      onCopy={handleCopied}
                    >
                      <Tooltip title="点击复制">
                        {setting.base_url}/api/friendlink/delete?token={setting.link_token}
                      </Tooltip>
                    </CopyToClipboard>
                  </div>
                </div>
                <div className="field-item">
                  <div className="name">请求方式：</div>
                  <div className="value">POST</div>
                </div>
                <div className="field-item">
                  <div className="name">请求类型：</div>
                  <div className="value">form-data</div>
                </div>
                <div className="field-item">
                  <div className="name">POST表单字段：</div>
                  <div className="value">
                    <Table
                      size="small"
                      pagination={false}
                      columns={[
                        {
                          title: '字段名',
                          dataIndex: 'title',
                          width: 150,
                        },
                        {
                          title: '是否必填',
                          dataIndex: 'required',
                          width: 100,
                          render: (text: number) => <span>{text ? '必填' : '否'}</span>,
                        },
                        {
                          title: '说明',
                          dataIndex: 'remark',
                        },
                      ]}
                      dataSource={[
                        {
                          title: 'link',
                          required: true,
                          remark: '对方链接',
                        },
                      ]}
                      key="title"
                    />
                  </div>
                </div>
                <div className="field-item">
                  <div className="name">返回格式：</div>
                  <div className="value">JSON</div>
                </div>
                <div className="field-item">
                  <div className="name">正确结果示例：</div>
                  <div className="value">
                    <Alert
                      message={
                        <pre>
                          <code>
                            {
                              '{\n    "code": 200,   //返回200表示数据正确，其他值均为错误\n    "msg": "链接已删除",   //如果有错误，则这里会描述错误的原因\n}'
                            }
                          </code>
                        </pre>
                      }
                    />
                  </div>
                </div>
                <div className="field-item">
                  <div className="name">错误结果示例：</div>
                  <div className="value">
                    <Alert
                      message={
                        <pre>
                          <code>
                            {
                              '{\n    "code": -1,   //返回200表示数据正确，其他值均为错误\n    "msg": "Token错误",   //如果有错误，则这里会描述错误的原因\n}'
                            }
                          </code>
                        </pre>
                      }
                    />
                  </div>
                </div>
              </div>
            </ProCard.TabPane>
          </ProCard>
        </div>
      </Modal>
      <ModalForm
        width={600}
        modalProps={{
          zIndex: 100,
        }}
        title={'重置友情链接Token'}
        open={tokenVidible}
        layout="horizontal"
        onOpenChange={(flag) => {
          setTokenVisible(flag);
        }}
        onFinish={handleUpdateToken}
      >
        <ProFormText
          name="link_token"
          label="新的Token"
          placeholder={'请填写新的Token'}
          extra="Token一般由数字、字母组合构成，长于10位，小于128位"
        />
      </ModalForm>
    </>
  );
};
export default PluginLinkApi;
