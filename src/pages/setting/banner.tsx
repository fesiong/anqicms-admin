import React, { useEffect, useRef, useState } from 'react';
import { ModalForm, ProFormSelect, ProFormText } from '@ant-design/pro-form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Button, message, Modal, Space, Image, Card, Divider, Input, InputRef } from 'antd';
import { deleteSettingBanner, getSettingBanners, saveSettingBanner } from '@/services';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import AttachmentSelect from '@/components/attachment';
import { PlusOutlined } from '@ant-design/icons';

const SettingBannerFrom: React.FC<any> = () => {
  const actionRef = useRef<ActionType>();
  const [editingBanner, setEditingBanner] = useState<any>({});
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [banners, setBanners] = useState<any[]>([]);
  const [currentType, setCurrentType] = useState<string>('default');

  const [name, setName] = useState('');
  const inputRef = useRef<InputRef>(null);

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const addItem = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    e.preventDefault();
    if (!name) {
      message.error('请填写分组名称');
      return;
    }
    setBanners([...banners, { type: name, list: [] }]);
    setName('');
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  useEffect(() => {
    getBanners();
  }, []);

  const getBanners = () => {
    getSettingBanners().then((res) => {
      let data = res.data || [];
      setBanners(data);
      if (currentType == 'default' && data.length > 0) {
        setCurrentType(data[0].type);
      }
    });
  };

  const handleChangeType = (type: string) => {
    setCurrentType(type);
  };

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
          getBanners();
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
        getBanners();
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
      <Card
        title={
          <div>
            <Space>
              {banners.map((item: any) => (
                <Button
                  key={item.type}
                  type={currentType == item.type ? 'primary' : 'default'}
                  onClick={() => {
                    handleChangeType(item.type);
                  }}
                >
                  {item.type}
                </Button>
              ))}
            </Space>
          </div>
        }
      >
        {banners.map((item: any) =>
          item.type == currentType ? (
            <ProTable
              toolBarRender={() => {
                return [<Button onClick={handleShowAdd}>添加</Button>];
              }}
              rowKey="name"
              headerTitle={currentType + '分组 Banner 列表'}
              columnsState={{
                persistenceKey: 'banner-table',
                persistenceType: 'localStorage',
              }}
              columns={columns}
              actionRef={actionRef}
              search={false}
              dataSource={item.list}
              pagination={false}
            />
          ) : null,
        )}
        {modalVisible && (
          <ModalForm
            width={600}
            title="幻灯片"
            visible={modalVisible}
            modalProps={{
              onCancel: () => setModalVisible(false),
            }}
            initialValues={editingBanner}
            onFinish={onBannerSubmit}
          >
            <ProFormSelect
              name="type"
              label="幻灯片分组"
              options={banners.map((a: any) => ({ label: a.type, value: a.type }))}
              fieldProps={{
                dropdownRender: (menu) => (
                  <>
                    {menu}
                    <Divider style={{ margin: '8px 0' }} />
                    <Space style={{ padding: '0 8px 4px' }}>
                      <Input
                        placeholder="请填写分组名"
                        ref={inputRef}
                        value={name}
                        onChange={onNameChange}
                        onKeyDown={(e) => e.stopPropagation()}
                      />
                      <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                        添加分组
                      </Button>
                    </Space>
                  </>
                ),
              }}
            />
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
      </Card>
    </PageHeaderWrapper>
  );
};

export default SettingBannerFrom;
