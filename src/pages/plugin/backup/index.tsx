import {
  pluginBackupCleanup,
  pluginBackupData,
  pluginBackupDelete,
  pluginBackupImport,
  pluginBackupRestore,
  pluginGetBackupList,
  pluginGetBackupStatus,
} from '@/services';
import { downloadFile, sizeFormat } from '@/utils';
import {
  ActionType,
  PageContainer,
  ProColumns,
  ProTable,
} from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Button, Modal, Progress, Radio, Space, Upload, message } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useRef, useState } from 'react';

let running = false;
let intXhr: any = null;

const PluginUserGroup: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [task, setTask] = useState<any>(null);

  let cleanUploads = false;
  const intl = useIntl();

  const syncTask = async () => {
    pluginGetBackupStatus().then((res) => {
      if (res.data) {
        running = true;
        setTask(res.data);
      } else {
        if (running) {
          running = false;
          actionRef.current?.reload();
        }
        setTask(null);
      }
    });
  };

  useEffect(() => {
    // 进入页面的时候查询一次task
    syncTask();
    // 定时查询task
    intXhr = setInterval(() => {
      syncTask();
    }, 1500);
    return () => {
      running = false;
      clearInterval(intXhr);
    };
  }, []);

  const handleBackupData = async () => {
    if (running) {
      return;
    }

    Modal.confirm({
      title: intl.formatMessage({ id: 'plugin.backup.confirm' }),
      onOk: () => {
        running = true;
        const hide = message.loading(
          intl.formatMessage({ id: 'plugin.backup.backuping' }),
          0,
        );
        pluginBackupData({})
          .then((res) => {
            message.info(res.msg);
            // 马上执行一遍
            syncTask();
          })
          .finally(() => {
            hide();
          });
      },
    });
  };

  const handleBackupRestore = async (record: any) => {
    if (running) {
      return;
    }
    Modal.confirm({
      title: intl.formatMessage({ id: 'plugin.backup.restore.confirm' }),
      content: intl.formatMessage({ id: 'plugin.backup.restore.content' }),
      onOk: () => {
        running = true;
        const hide = message.loading(
          intl.formatMessage({ id: 'plugin.backup.restoring' }),
          0,
        );
        pluginBackupRestore(record)
          .then(async (res) => {
            message.info(res.msg);
            // 马上执行一遍
            syncTask();
          })
          .finally(() => {
            hide();
          });
      },
    });
  };

  const handleDelete = (row: any) => {
    Modal.confirm({
      title: intl.formatMessage({ id: 'plugin.backup.delete.confirm' }),
      onOk: () => {
        pluginBackupDelete(row).then((res) => {
          message.info(res.msg);
          actionRef.current?.reload();
        });
      },
    });
  };

  const handleDownloadBackup = (record: any) => {
    Modal.confirm({
      title: intl.formatMessage({ id: 'plugin.backup.download.confirm' }),
      onOk: () => {
        downloadFile(
          '/plugin/backup/export',
          {
            name: record.name,
          },
          record.name,
        );
      },
    });
  };

  const handleUploadFile = async (e: any) => {
    const formData = new FormData();
    formData.append('file', e.file);
    const hide = message.loading(
      intl.formatMessage({ id: 'setting.system.submitting' }),
      0,
    );
    pluginBackupImport(formData)
      .then((res) => {
        message.success(res.msg);
        actionRef.current?.reload();
      })
      .finally(() => {
        hide();
      });
  };

  const onChangeData = (e: any) => {
    cleanUploads = e.target.value;
  };

  const handleCleanup = async () => {
    if (running) {
      return;
    }
    Modal.confirm({
      title: intl.formatMessage({ id: 'plugin.backup.cleanup.confirm' }),
      content: (
        <div>
          <p>{intl.formatMessage({ id: 'plugin.backup.cleanup.tips1' })}</p>
          <p>{intl.formatMessage({ id: 'plugin.backup.cleanup.tips2' })}</p>
          <Radio.Group onChange={onChangeData}>
            <Radio value={false}>
              {intl.formatMessage({ id: 'plugin.backup.cleanup.upload.false' })}
            </Radio>
            <Radio value={true}>
              {intl.formatMessage({ id: 'plugin.backup.cleanup.upload.true' })}
            </Radio>
          </Radio.Group>
        </div>
      ),
      onOk: () => {
        running = true;
        const hide = message.loading(
          intl.formatMessage({ id: 'plugin.backup.cleaning' }),
          0,
        );
        pluginBackupCleanup({
          clean_uploads: cleanUploads,
        })
          .then((res) => {
            message.success(res.msg);
          })
          .finally(() => {
            hide();
            running = false;
          });
      },
    });
  };

  const columns: ProColumns<any>[] = [
    {
      title: intl.formatMessage({ id: 'plugin.backup.time' }),
      hideInSearch: true,
      dataIndex: 'last_mod',
      render: (item) => {
        if (`${item}` === '0') {
          return false;
        }
        return dayjs((item as number) * 1000).format('YYYY-MM-DD HH:mm');
      },
    },
    {
      title: intl.formatMessage({ id: 'plugin.backup.name' }),
      dataIndex: 'name',
    },
    {
      title: intl.formatMessage({ id: 'plugin.backup.size' }),
      dataIndex: 'size',
      render: (item) => {
        return sizeFormat(item as number);
      },
    },
    {
      title: intl.formatMessage({ id: 'setting.action' }),
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <Space size={20}>
          <a
            key="edit"
            onClick={() => {
              handleBackupRestore(record);
            }}
          >
            <FormattedMessage id="plugin.backup.restore" />
          </a>
          <a
            key="edit"
            onClick={() => {
              handleDownloadBackup(record);
            }}
          >
            <FormattedMessage id="plugin.backup.download" />
          </a>
          <a
            onClick={() => {
              handleDelete(record);
            }}
          >
            <FormattedMessage id="setting.system.delete" />
          </a>
        </Space>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable<any>
        headerTitle={intl.formatMessage({ id: 'menu.plugin.backup' })}
        actionRef={actionRef}
        rowKey="id"
        toolBarRender={() => [
          <Button type="primary" key="add" onClick={() => handleBackupData()}>
            <FormattedMessage id="plugin.backup.new" />
          </Button>,
          <Upload
            key="upload"
            name="file"
            className="logo-uploader"
            showUploadList={false}
            accept=".sql"
            customRequest={handleUploadFile}
          >
            <Button type="primary">
              <FormattedMessage id="plugin.backup.import" />
            </Button>
          </Upload>,
          <Button key="clean" onClick={() => handleCleanup()}>
            <FormattedMessage id="plugin.backup.cleanup" />
          </Button>,
        ]}
        search={false}
        tableAlertOptionRender={false}
        request={(params) => {
          return pluginGetBackupList(params);
        }}
        columnsState={{
          persistenceKey: 'backup-table',
          persistenceType: 'localStorage',
        }}
        columns={columns}
        rowSelection={false}
        pagination={{
          showSizeChanger: true,
        }}
        summary={() => (
          <div style={{ marginTop: 10 }}>
            <FormattedMessage id="plugin.backup.tips" />
          </div>
        )}
      />
      {task !== null && (
        <Modal
          title={
            task.type === 'backup'
              ? intl.formatMessage({ id: 'plugin.backup.new' })
              : intl.formatMessage({ id: 'plugin.backup.restore' })
          }
          open={true}
          footer={null}
        >
          <div className="task-progress">
            <Progress percent={task.finished ? 100 : task.percent} />
          </div>
          <div className="task-message">{task.message}</div>
        </Modal>
      )}
    </PageContainer>
  );
};

export default PluginUserGroup;
