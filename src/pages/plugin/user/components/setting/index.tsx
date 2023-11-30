import React, { useEffect, useRef, useState } from 'react';
import { Button, message, Modal, Space } from 'antd';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { ModalForm, ProFormRadio, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import {
  pluginGetUserFieldsSetting,
  pluginSaveUserFieldsSetting,
  pluginDeleteUserField,
} from '@/services';

export type UserFieldSettingProps = {
  children: React.ReactNode;
};

const UserFieldSetting: React.FC<UserFieldSettingProps> = (props) => {
  const actionRef = useRef<ActionType>();
  const [visible, setVisible] = useState<boolean>(false);
  const [editVisible, setEditVisible] = useState<boolean>(false);
  const [currentField, setCurrentField] = useState<any>({});
  const [setting, setSetting] = useState<any>({ fields: [] });

  const getSetting = async () => {
    const res = await pluginGetUserFieldsSetting();
    setSetting(res.data || { fields: [] });
  };

  useEffect(() => {
    getSetting();
  }, []);

  const handleRemoveItem = (record: any, index: number) => {
    Modal.confirm({
      title: '确定要删除该字段吗？',
      content: '你可以在保存之前，通过刷新页面来恢复。',
      onOk: async () => {
        pluginDeleteUserField({ field_name: record.field_name });
        setting.fields.splice(index, 1);
        setting.fields = [].concat(setting.fields);
        setSetting(setting);
        if (actionRef.current) {
          actionRef.current.reload();
        }
      },
    });
  };

  const handleSaveField = async (values: any) => {
    let exists = false;
    if (!setting.fields) {
      setting.fields = [];
    }
    for (const i in setting.fields) {
      if (setting.fields[i].field_name == values.field_name) {
        exists = true;
        setting.fields[i] = Object.assign(setting.fields[i], values);
      }
    }
    if (!exists) {
      setting.fields.push(values);
    }
    setting.fields = [].concat(setting.fields);
    setSetting(setting);
    if (actionRef.current) {
      actionRef.current.reload();
    }
    setEditVisible(false);
  };

  const handleSaveSetting = async () => {
    const res = await pluginSaveUserFieldsSetting(setting);

    if (res.code === 0) {
      message.success(res.msg);
      setEditVisible(false);
      if (actionRef.current) {
        actionRef.current.reload();
      }
    } else {
      message.error(res.msg);
    }
  };

  const columns: ProColumns<any>[] = [
    {
      title: '参数名称',
      dataIndex: 'name',
    },
    {
      title: '调用字段',
      dataIndex: 'field_name',
    },
    {
      title: '字段类型',
      dataIndex: 'type',
      render: (text: any, record) => (
        <div>
          <span>{record.is_system ? '(内置)' : ''}</span>
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: '操作',
      dataIndex: 'option',
      render: (_, record, index) => (
        <Space size={20}>
          <>
            <a
              onClick={() => {
                setCurrentField(record);
                setEditVisible(true);
              }}
            >
              编辑
            </a>
            {!record.is_system && (
              <a
                className="text-red"
                onClick={() => {
                  handleRemoveItem(record, index);
                }}
              >
                删除
              </a>
            )}
          </>
        </Space>
      ),
    },
  ];

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
        width={800}
        title="用户附加字段设置"
        visible={visible}
        onCancel={() => {
          setVisible(false);
        }}
        okText="保存"
        onOk={() => {
          handleSaveSetting();
        }}
      >
        <ProTable<any>
          rowKey="name"
          search={false}
          actionRef={actionRef}
          toolBarRender={() => [
            <Button
              key="add"
              type="primary"
              onClick={() => {
                setCurrentField({});
                setEditVisible(true);
              }}
            >
              新增字段
            </Button>,
          ]}
          tableAlertRender={false}
          tableAlertOptionRender={false}
          request={async () => {
            return {
              data: setting.fields || [],
              success: true,
            };
          }}
          columns={columns}
          pagination={false}
        />
      </Modal>
      {editVisible && (
        <ModalForm
          width={600}
          title={currentField.name ? currentField.name + '修改字段' : '添加字段'}
          visible={editVisible}
          modalProps={{
            onCancel: () => {
              setEditVisible(false);
            },
          }}
          initialValues={currentField}
          layout="horizontal"
          onFinish={async (values) => {
            handleSaveField(values);
          }}
        >
          <ProFormText name="name" required label="参数名" extra="如：QQ，微信号等" />
          <ProFormText
            name="field_name"
            label="调用字段"
            disabled={currentField.field_name ? true : false}
            extra="英文字母开头，只能填写字母和数字，默认为参数名称的拼音"
          />
          <ProFormRadio.Group
            name="type"
            label="字段类型"
            disabled={currentField.field_name ? true : false}
            valueEnum={{
              text: '单行文本',
              number: '数字',
              textarea: '多行文本',
              radio: '单项选择',
              checkbox: '多项选择',
              select: '下拉选择',
              image: '图片',
              file: '文件',
            }}
          />
          <ProFormTextArea
            label="默认值"
            name="content"
            fieldProps={{
              rows: 4,
            }}
            extra="单选、多选、下拉的多个值，一行一个。"
          />
        </ModalForm>
      )}
    </>
  );
};

export default UserFieldSetting;
