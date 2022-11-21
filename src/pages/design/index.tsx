import React, { useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Button, Space, Modal, message, Upload, Tooltip, Checkbox } from 'antd';
import {
  deleteDesignInfo,
  getDesignList,
  UploadDesignInfo,
  activeDesignInfo,
  restoreDesignData,
} from '@/services';
import { history } from 'umi';
import { ModalForm, ProFormText } from '@ant-design/pro-form';

let autoBackup = false;
const DesignIndex: React.FC = () => {
  const [addVisible, setAddVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();

  const handleUseTemplate = (template: any) => {
    Modal.confirm({
      title: '确定要启用这套设计模板吗？',
      onOk: () => {
        const hide = message.loading('正在切换模板', 0);
        activeDesignInfo({ package: template.package });
        setTimeout(() => {
          hide();
          actionRef.current?.reload();
        }, 2000);
      },
    });
  };

  const handleManage = (template: any) => {
    history.push('/design/detail?package=' + template.package);
  };

  const handleShowEdit = (template: any) => {
    history.push('/design/editor?package=' + template.package);
  };

  const handleRemove = (packageName: string) => {
    if (packageName == 'default') {
      message.error('默认模板不能删除');
      return;
    }
    Modal.confirm({
      title: '确定要删除这套设计模板吗？',
      onOk: () => {
        const hide = message.loading('正在提交中', 0);
        deleteDesignInfo({ package: packageName })
          .then((res) => {
            message.info(res.msg);
            actionRef.current?.reload();
          })
          .finally(() => {
            hide();
          });
      },
    });
  };

  const handleUploadZip = (e: any) => {
    const formData = new FormData();
    formData.append('file', e.file);
    const hide = message.loading('正在提交中', 0);
    UploadDesignInfo(formData)
      .then((res) => {
        if (res.code !== 0) {
          message.info(res.msg);
        } else {
          message.info(res.msg || '上传成功');
          setAddVisible(false);
          actionRef.current?.reload();
        }
      })
      .finally(() => {
        hide();
      });
  };

  const handleRestoreDesignData = (record: any) => {
    Modal.confirm({
      title: '确定要安装该模板的演示数据吗？',
      content: (
        <div>
          <p>该安装操作将会用模板的演示数据覆盖，请谨慎操作。</p>
          <p>在执行安装演示数据前，建议先备份网站原有数据。</p>
          <div>
            <Checkbox
              value={true}
              onChange={(e) => {
                autoBackup = e.target.checked;
              }}
            >
              <span className="text-red">*</span>
              自动执行备份
            </Checkbox>
          </div>
        </div>
      ),
      onOk: () => {
        const hide = message.loading('正在提交中', 0);
        restoreDesignData({ package: record.package, auto_backup: autoBackup })
          .then((res) => {
            message.info(res.msg);
            actionRef.current?.reload();
          })
          .finally(() => {
            hide();
          });
      },
    });
  };

  const columns: ProColumns<any>[] = [
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '文件夹',
      dataIndex: 'package',
    },
    {
      title: '类型',
      dataIndex: 'template_type',
      valueEnum: {
        0: '自适应',
        1: '代码适配',
        2: '电脑+手机',
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueEnum: {
        0: {
          text: '未启用',
          status: 'Default',
        },
        1: {
          text: '已启用',
          status: 'Success',
        },
      },
    },
    {
      title: '时间',
      dataIndex: 'created',
    },
    {
      title: '操作',
      key: 'action',
      width: 300,
      render: (_, record: any) => (
        <Space size={16}>
          {record.status != 1 && (
            <Button
              type="link"
              onClick={() => {
                handleUseTemplate(record);
              }}
            >
              启用
            </Button>
          )}
          {record.preview_data && record.status == 1 && (
            <Tooltip title="安装该模板的演示数据">
              <Button
                type="link"
                onClick={() => {
                  handleRestoreDesignData(record);
                }}
              >
                初始化
              </Button>
            </Tooltip>
          )}
          <Button
            type="link"
            onClick={() => {
              handleManage(record);
            }}
          >
            管理
          </Button>
          <Button
            type="link"
            onClick={() => {
              handleShowEdit(record);
            }}
          >
            编辑
          </Button>
          {record.package !== 'default' && (
            <Button
              danger
              type="link"
              onClick={() => {
                handleRemove(record.package);
              }}
            >
              删除
            </Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable<any>
        headerTitle="设计模板列表"
        toolBarRender={() => [
          <Button
            key="upload"
            onClick={() => {
              setAddVisible(true);
            }}
          >
            上传新模板
          </Button>,
        ]}
        actionRef={actionRef}
        rowKey="package"
        search={false}
        request={(params) => {
          return getDesignList(params);
        }}
        pagination={false}
        columns={columns}
      />
      {addVisible && (
        <ModalForm
          width={600}
          title={'上传模板'}
          visible={addVisible}
          modalProps={{
            onCancel: () => {
              setAddVisible(false);
            },
          }}
          //layout="horizontal"
          onFinish={async () => {
            setAddVisible(false);
          }}
        >
          <ProFormText name="tpl" label="模板压缩包">
            <Upload
              name="file"
              showUploadList={false}
              accept=".zip"
              customRequest={handleUploadZip}
            >
              <Button type="primary">选择Zip压缩包</Button>
            </Upload>
          </ProFormText>
          <div>
            <p>
              说明：只能上传从我的模板详情打包下载的模板，或设计市场的模板，本地制作的模板，请通过我的模板详情打包下载来制作成压缩包。
            </p>
          </div>
        </ModalForm>
      )}
    </PageContainer>
  );
};

export default DesignIndex;
