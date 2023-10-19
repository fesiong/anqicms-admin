import React, { useRef, useState } from 'react';
import { ModalForm, ProFormText } from '@ant-design/pro-form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Button, message, Modal, Space, Image } from 'antd';
import { deleteSettingBanner, getSettingBanners, saveSettingBanner } from '@/services';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import AttachmentSelect from '@/components/attachment';
import { PlusOutlined } from '@ant-design/icons';

const SettingBannerFrom: React.FC<any> = () => {
  const actionRef = useRef<ActionType>();
  const [editingBanner, setEditingBanner] = useState<any>({});
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const editBanner = (row: any) => {
    setEditingBanner(row);
    setModalVisible(true);
  };

  const removeBanner = (row: any) => {
    Modal.confirm({
      title: '确定要删除该Banner吗',
      onOk: () => {
        deleteSettingBanner(row).then((res) => {
          message.success(res.msg);
          actionRef.current?.reload();
        });
      },
    });
  };

  const handleSelectLogo = (row: any) => {
    editingBanner.logo = row.logo;
    setEditingBanner(Object.assign({}, editingBanner));
  };

  const handleRemoveLogo = (e: any) => {
    e.stopPropagation();
    editingBanner.logo = '';
    setEditingBanner(Object.assign({}, editingBanner));
  };

  const handleShowAdd = () => {
    setEditingBanner({});
    setModalVisible(true);
  };

  const onBannerSubmit = async (values: any) => {
    values = Object.assign(editingBanner, values);
    const hide = message.loading('正在提交中', 0);
    saveSettingBanner(values)
      .then((res) => {
        message.success(res.msg);
        setModalVisible(false);
        actionRef.current?.reload();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        hide();
      });
  };

  const columns: ProColumns<any>[] = [
    {
      title: '图片',
      dataIndex: 'logo',
      width: 800,
      render: (_, record) => (
        <div className="text-center">
          <Image src={record.logo} style={{ height: 150, objectFit: 'contain' }}></Image>
        </div>
      ),
    },
    {
      title: '名称/链接',
      dataIndex: 'link',
      width: 800,
      render: (_, record) => (
        <div>
          <div>链接：{record.link}</div>
          <div>ALT：{record.alt}</div>
          <div>简介：{record.description}</div>
        </div>
      ),
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 180,
      render: (_, record) => (
        <Space size={20}>
          <a
            key="edit"
            onClick={() => {
              editBanner(record);
            }}
          >
            修改
          </a>
          <a
            className="text-red"
            key="delete"
            onClick={async () => {
              removeBanner(record);
            }}
          >
            删除
          </a>
        </Space>
      ),
    },
  ];

  return (
    <PageHeaderWrapper>
      <ProTable
        toolBarRender={() => {
          return [<Button onClick={handleShowAdd}>添加</Button>];
        }}
        rowKey="name"
        headerTitle="Banner 列表"
        columns={columns}
        actionRef={actionRef}
        search={false}
        request={(params) => {
          return getSettingBanners(params);
        }}
        pagination={{
          showSizeChanger: true,
        }}
      />
      {modalVisible && (
        <ModalForm
          width={600}
          title="首页幻灯片"
          visible={modalVisible}
          modalProps={{
            onCancel: () => setModalVisible(false),
          }}
          initialValues={editingBanner}
          onFinish={onBannerSubmit}
        >
          <ProFormText label="选择图片" extra="幻灯片图片">
            <AttachmentSelect onSelect={handleSelectLogo} visible={false}>
              <div className="ant-upload-item">
                {editingBanner.logo ? (
                  <>
                    <img src={editingBanner.logo} style={{ width: '100%' }} />
                    <a className="delete" onClick={handleRemoveLogo}>
                      删除
                    </a>
                  </>
                ) : (
                  <div className="add">
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>上传</div>
                  </div>
                )}
              </div>
            </AttachmentSelect>
          </ProFormText>
          <ProFormText name="link" label="链接地址" />
          <ProFormText name="alt" label="ALT" />
          <ProFormText name="description" label="介绍" />
        </ModalForm>
      )}
    </PageHeaderWrapper>
  );
};

export default SettingBannerFrom;
