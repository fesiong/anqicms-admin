import NewContainer from '@/components/NewContainer';
import AttachmentSelect from '@/components/attachment';
import WangEditor from '@/components/editor';
import MarkdownEditor from '@/components/markdown';
import {
  getSettingContent,
  getSettingDiyFields,
  saveSettingDiyFields,
} from '@/services';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import {
  ModalForm,
  ProForm,
  ProFormCheckbox,
  ProFormDigit,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Button, Card, Col, Image, Modal, Row, Space, message } from 'antd';
import React, { useEffect, useState } from 'react';
import './index.less';

const SettingDiyFieldFrom: React.FC<any> = () => {
  const [addFieldOpen, setAddFieldOpen] = useState<boolean>(false);
  const [currentField, setCurrentField] = useState<any>({});
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [contentSetting, setContentSetting] = useState<any>({});
  const [setting, setSetting] = useState<any[]>([]);
  const [newKey, setNewKey] = useState<string>('');
  const intl = useIntl();

  const getSetting = async () => {
    getSettingContent().then(async (res) => {
      setContentSetting(res.data || {});
      const res2 = await getSettingDiyFields();
      setSetting(res2.data || []);
    });
  };

  const onTabChange = (key: string) => {
    getSetting().then(() => {
      setNewKey(key);
    });
  };

  useEffect(() => {
    getSetting();
  }, []);

  const handleEditField = (index: number) => {
    if (index === -1) {
      setCurrentField({});
    } else {
      setCurrentField(setting[index]);
    }
    setCurrentIndex(index);
    setAddFieldOpen(true);
  };

  const capitalizeFirstLetter = (str: string) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const handleSaveField = (values: any) => {
    let name = (values.name || '').trim();
    if (name.length === 0) {
      return false;
    }
    values.name = capitalizeFirstLetter(values.name);
    if (!values.type) {
      values.type = 'text';
    }
    if (currentIndex === -1) {
      // 不允许重复
      for (const i in setting) {
        if (setting[i].name === values.name) {
          message.error(
            intl.formatMessage({ id: 'setting.diyfield.name-duplicate' }),
          );
          return false;
        }
      }
      setting.push(values);
    } else {
      setting[currentIndex] = Object.assign(setting[currentIndex], values);
    }
    setSetting([].concat(...setting));
    setAddFieldOpen(false);
  };

  const handleCleanExtraField = (index: number) => {
    setting[index].value = '';
    setSetting([].concat(...setting));
  };

  const handleUpdateFieldValue = (index: number, val: any) => {
    const values = setting[index];
    setting[index].value = val;
    if (values.type !== 'editor') {
      setSetting([].concat(...setting));
    }
  };

  const updateExtraContent = async (index: number, html: string) => {
    handleUpdateFieldValue(index, html);
  };

  const handleUploadExtraField = (index: number, row: any) => {
    handleUpdateFieldValue(index, row.logo);
  };

  const handleDeleteField = (index: number) => {
    Modal.confirm({
      title: intl.formatMessage({
        id: 'setting.system.confirm-delete-param',
      }),
      onOk: () => {
        setting.splice(index, 1);
        setSetting([].concat(...setting));
      },
    });
  };

  const onSubmit = () => {
    // 提交
    saveSettingDiyFields(setting).then((res) => {
      message.success(res.msg);
    });
  };

  return (
    <NewContainer onTabChange={(key) => onTabChange(key)}>
      <Card
        key={newKey}
        title={
          <Space size={16}>
            <div>{intl.formatMessage({ id: 'menu.setting.diy' })}</div>
            <Button
              onClick={() => {
                handleEditField(-1);
              }}
            >
              <FormattedMessage id="setting.system.add-param" />
            </Button>
          </Space>
        }
      >
        <ProForm layout="vertical" onFinish={onSubmit}>
          <Row>
            {setting.map((item: any, index: number) => (
              <Col sm={24} xs={24} key={index}>
                {item.type === 'text' ? (
                  <ProFormText
                    name={[index, 'value']}
                    width="lg"
                    label={
                      <Space size={16}>
                        <span>
                          {item.remark} (
                          {intl.formatMessage({
                            id: 'setting.system.param-name',
                          })}
                          :{item.name})
                        </span>
                        <Button
                          size="small"
                          onClick={() => handleEditField(index)}
                        >
                          <FormattedMessage id="plugin.diyfield.setting" />
                        </Button>
                        <span
                          className="delete-icon"
                          onClick={() => handleDeleteField(index)}
                        >
                          <DeleteOutlined />
                        </span>
                      </Space>
                    }
                    fieldProps={{
                      value: item.value,
                      onChange: (e: any) => {
                        handleUpdateFieldValue(index, e.target.value);
                      },
                    }}
                    placeholder={
                      item.content &&
                      intl.formatMessage({
                        id: 'content.param.default',
                      }) + item.content
                    }
                  />
                ) : item.type === 'number' ? (
                  <ProFormDigit
                    name={[index, 'value']}
                    width="lg"
                    label={
                      <Space size={16}>
                        <span>
                          {item.remark} (
                          {intl.formatMessage({
                            id: 'setting.system.param-name',
                          })}
                          :{item.name})
                        </span>
                        <Button
                          size="small"
                          onClick={() => handleEditField(index)}
                        >
                          <FormattedMessage id="plugin.diyfield.setting" />
                        </Button>
                        <span
                          className="delete-icon"
                          onClick={() => handleDeleteField(index)}
                        >
                          <DeleteOutlined />
                        </span>
                      </Space>
                    }
                    fieldProps={{
                      value: item.value,
                      onChange: (e: any) => {
                        handleUpdateFieldValue(index, e);
                      },
                    }}
                    placeholder={
                      item.content &&
                      intl.formatMessage({
                        id: 'content.param.default',
                      }) + item.content
                    }
                  />
                ) : item.type === 'textarea' ? (
                  <ProFormTextArea
                    name={[index, 'value']}
                    width="lg"
                    label={
                      <Space size={16}>
                        <span>
                          {item.remark} (
                          {intl.formatMessage({
                            id: 'setting.system.param-name',
                          })}
                          :{item.name})
                        </span>
                        <Button
                          size="small"
                          onClick={() => handleEditField(index)}
                        >
                          <FormattedMessage id="plugin.diyfield.setting" />
                        </Button>
                        <span
                          className="delete-icon"
                          onClick={() => handleDeleteField(index)}
                        >
                          <DeleteOutlined />
                        </span>
                      </Space>
                    }
                    fieldProps={{
                      value: item.value,
                      onChange: (e: any) => {
                        handleUpdateFieldValue(index, e.target.value);
                      },
                    }}
                    placeholder={
                      item.content &&
                      intl.formatMessage({
                        id: 'content.param.default',
                      }) + item.content
                    }
                  />
                ) : item.type === 'editor' ? (
                  <ProFormText
                    label={
                      <Space size={16}>
                        <span>
                          {item.remark} (
                          {intl.formatMessage({
                            id: 'setting.system.param-name',
                          })}
                          :{item.name})
                        </span>
                        <Button
                          size="small"
                          onClick={() => handleEditField(index)}
                        >
                          <FormattedMessage id="plugin.diyfield.setting" />
                        </Button>
                        <span
                          className="delete-icon"
                          onClick={() => handleDeleteField(index)}
                        >
                          <DeleteOutlined />
                        </span>
                      </Space>
                    }
                    extra={
                      item.content &&
                      intl.formatMessage({
                        id: 'content.param.default',
                      }) + item.content
                    }
                  >
                    {contentSetting.editor === 'markdown' ? (
                      <MarkdownEditor
                        className="mb-normal"
                        setContent={async (val) =>
                          updateExtraContent(index, val)
                        }
                        content={item.value || ''}
                        ref={null}
                      />
                    ) : (
                      <WangEditor
                        className="mb-normal"
                        setContent={async (val) => {
                          updateExtraContent(index, val);
                        }}
                        content={item.value || ''}
                        key={item.name}
                        field={item.name}
                        ref={null}
                      />
                    )}
                  </ProFormText>
                ) : item.type === 'radio' ? (
                  <ProFormRadio.Group
                    name={[index, 'value']}
                    label={
                      <Space size={16}>
                        <span>
                          {item.remark} (
                          {intl.formatMessage({
                            id: 'setting.system.param-name',
                          })}
                          :{item.name})
                        </span>
                        <Button
                          size="small"
                          onClick={() => handleEditField(index)}
                        >
                          <FormattedMessage id="plugin.diyfield.setting" />
                        </Button>
                        <span
                          className="delete-icon"
                          onClick={() => handleDeleteField(index)}
                        >
                          <DeleteOutlined />
                        </span>
                      </Space>
                    }
                    fieldProps={{
                      value: item.value,
                      onChange: (e: any) => {
                        handleUpdateFieldValue(index, e.target.value);
                      },
                    }}
                    request={async () => {
                      const tmpData = item.content.split('\n');
                      const data = [];
                      for (const item1 of tmpData) {
                        data.push({ label: item1, value: item1 });
                      }
                      return data;
                    }}
                  />
                ) : item.type === 'checkbox' ? (
                  <ProFormCheckbox.Group
                    name={[index, 'value']}
                    label={
                      <Space size={16}>
                        <span>
                          {item.remark} (
                          {intl.formatMessage({
                            id: 'setting.system.param-name',
                          })}
                          :{item.name})
                        </span>
                        <Button
                          size="small"
                          onClick={() => handleEditField(index)}
                        >
                          <FormattedMessage id="plugin.diyfield.setting" />
                        </Button>
                        <span
                          className="delete-icon"
                          onClick={() => handleDeleteField(index)}
                        >
                          <DeleteOutlined />
                        </span>
                      </Space>
                    }
                    fieldProps={{
                      value: item.value,
                      onChange: (e: any) => {
                        handleUpdateFieldValue(index, e);
                      },
                    }}
                    request={async () => {
                      const tmpData = item.content.split('\n');
                      const data = [];
                      for (const item1 of tmpData) {
                        data.push({ label: item1, value: item1 });
                      }
                      return data;
                    }}
                  />
                ) : item.type === 'select' ? (
                  <ProFormSelect
                    name={[index, 'value']}
                    width="lg"
                    label={
                      <Space size={16}>
                        <span>
                          {item.remark} (
                          {intl.formatMessage({
                            id: 'setting.system.param-name',
                          })}
                          :{item.name})
                        </span>
                        <Button
                          size="small"
                          onClick={() => handleEditField(index)}
                        >
                          <FormattedMessage id="plugin.diyfield.setting" />
                        </Button>
                        <span
                          className="delete-icon"
                          onClick={() => handleDeleteField(index)}
                        >
                          <DeleteOutlined />
                        </span>
                      </Space>
                    }
                    fieldProps={{
                      value: item.value,
                      onChange: (e: any) => {
                        handleUpdateFieldValue(index, e);
                      },
                    }}
                    request={async () => {
                      const tmpData = item.content.split('\n');
                      const data = [];
                      for (const item1 of tmpData) {
                        data.push({ label: item1, value: item1 });
                      }
                      return data;
                    }}
                  />
                ) : item.type === 'image' ? (
                  <ProFormText
                    name={[index, 'value']}
                    label={
                      <Space size={16}>
                        <span>
                          {item.remark} (
                          {intl.formatMessage({
                            id: 'setting.system.param-name',
                          })}
                          :{item.name})
                        </span>
                        <Button
                          size="small"
                          onClick={() => handleEditField(index)}
                        >
                          <FormattedMessage id="plugin.diyfield.setting" />
                        </Button>
                        <span
                          className="delete-icon"
                          onClick={() => handleDeleteField(index)}
                        >
                          <DeleteOutlined />
                        </span>
                      </Space>
                    }
                  >
                    {item.value ? (
                      <div className="ant-upload-item">
                        <Image
                          preview={{
                            src: item.value,
                          }}
                          src={item.value}
                        />
                        <span
                          className="delete"
                          onClick={() => handleCleanExtraField(index)}
                        >
                          <DeleteOutlined />
                        </span>
                      </div>
                    ) : (
                      <AttachmentSelect
                        onSelect={(row) => handleUploadExtraField(index, row)}
                        open={false}
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
                    )}
                  </ProFormText>
                ) : item.type === 'file' ? (
                  <ProFormText
                    name={[index, 'value']}
                    label={
                      <Space size={16}>
                        <span>
                          {item.remark} (
                          {intl.formatMessage({
                            id: 'setting.system.param-name',
                          })}
                          :{item.name})
                        </span>
                        <Button
                          size="small"
                          onClick={() => handleEditField(index)}
                        >
                          <FormattedMessage id="plugin.diyfield.setting" />
                        </Button>
                        <span
                          className="delete-icon"
                          onClick={() => handleDeleteField(index)}
                        >
                          <DeleteOutlined />
                        </span>
                      </Space>
                    }
                  >
                    {item.value ? (
                      <div className="ant-upload-item ant-upload-file">
                        <div className="field-value">{item.value}</div>
                        <span
                          className="delete"
                          onClick={() => handleCleanExtraField(index)}
                        >
                          <DeleteOutlined />
                        </span>
                      </div>
                    ) : (
                      <AttachmentSelect
                        onSelect={(row) => handleUploadExtraField(index, row)}
                        open={false}
                      >
                        <Button>
                          <FormattedMessage id="setting.system.upload" />
                        </Button>
                      </AttachmentSelect>
                    )}
                  </ProFormText>
                ) : (
                  ''
                )}
              </Col>
            ))}
          </Row>
        </ProForm>
      </Card>
      {addFieldOpen && (
        <ModalForm
          width={600}
          title={
            currentField.name
              ? currentField.name +
                intl.formatMessage({ id: 'content.module.field.edit' })
              : intl.formatMessage({ id: 'content.module.field.add' })
          }
          open={addFieldOpen}
          modalProps={{
            onCancel: () => {
              setAddFieldOpen(false);
            },
          }}
          initialValues={currentField}
          layout="horizontal"
          onFinish={async (values) => {
            handleSaveField(values);
          }}
        >
          <ProFormText
            name="remark"
            label={intl.formatMessage({
              id: 'setting.system.remark',
            })}
          />
          <ProFormText
            name="name"
            required
            label={intl.formatMessage({
              id: 'setting.system.param-name',
            })}
            disabled={currentField.name ? true : false}
            extra={intl.formatMessage({
              id: 'setting.system.param-name-description',
            })}
          />
          <ProFormRadio.Group
            name="type"
            label={intl.formatMessage({ id: 'content.module.field.type' })}
            disabled={currentField.name ? true : false}
            valueEnum={{
              text: intl.formatMessage({
                id: 'content.module.field.type.text',
              }),
              number: intl.formatMessage({
                id: 'content.module.field.type.number',
              }),
              textarea: intl.formatMessage({
                id: 'content.module.field.type.textarea',
              }),
              editor: intl.formatMessage({
                id: 'content.module.field.type.editor',
              }),
              radio: intl.formatMessage({
                id: 'content.module.field.type.radio',
              }),
              checkbox: intl.formatMessage({
                id: 'content.module.field.type.checkbox',
              }),
              select: intl.formatMessage({
                id: 'content.module.field.type.select',
              }),
              image: intl.formatMessage({
                id: 'content.module.field.type.image',
              }),
              file: intl.formatMessage({
                id: 'content.module.field.type.file',
              }),
            }}
          />
          <ProFormTextArea
            label={intl.formatMessage({ id: 'content.category.default' })}
            name="content"
            fieldProps={{
              rows: 4,
            }}
            extra={intl.formatMessage({
              id: 'content.module.field.default.description',
            })}
          />
        </ModalForm>
      )}
    </NewContainer>
  );
};

export default SettingDiyFieldFrom;
