import {
  archiveQuickImport,
  getCategories,
  getQuickImportArchiveStatus,
} from '@/services';
import { calculateFileMd5 } from '@/utils';
import {
  ModalForm,
  ProFormDigit,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Button, Divider, Modal, Progress, Upload, message } from 'antd';
import React, { useEffect, useState } from 'react';

export type quickImportProps = {
  open: boolean;
  onOpenChange: (flag: boolean) => void;
};

let running = false;
let intXhr: any;

const QuickImportModal: React.FC<quickImportProps> = (props) => {
  const [planType, setPlanType] = useState<number>(0);
  const [uploadedFile, setUploadedFile] = useState<any>(null);
  const [task, setTask] = useState<any>(null);
  const intl = useIntl();

  const syncTask = async () => {
    getQuickImportArchiveStatus().then((res) => {
      if (res.data) {
        running = true;
        setTask(res.data);
      } else {
        if (running) {
          running = false;
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
    }, 1000);
    return () => {
      running = false;
      clearInterval(intXhr);
    };
  }, []);

  const handleSelectUploadZip = (e: any) => {
    setUploadedFile(e.file);
  };

  const handleSubmit = async (values: any) => {
    if (!uploadedFile) {
      message.info(
        intl.formatMessage({
          id: 'content.quick-import.upload-file-required',
        }),
      );
      return;
    }
    if (!values['category_id']) {
      message.info(
        intl.formatMessage({
          id: 'content.quick-import.category-required',
        }),
      );
      return;
    }
    const formData = new FormData();
    let hide = message.loading({
      content: intl.formatMessage({
        id: 'setting.system.submitting',
      }),
      duration: 0,
      key: 'uploading',
    });
    // eslint-disable-next-line guard-for-in
    for (let key in values) {
      formData.append(key, values[key]);
    }
    const size = uploadedFile.size;
    const md5Value = await calculateFileMd5(uploadedFile);
    const chunkSize = 2 * 1024 * 1024; // 每个分片大小 2MB
    const totalChunks = Math.ceil(size / chunkSize);
    formData.append('file_name', uploadedFile.name);
    formData.append('md5', md5Value as string);
    if (totalChunks > 1) {
      // 大于 chunkSize 的，使用分片上传
      formData.append('chunks', totalChunks + '');
      for (let i = 0; i < totalChunks; i++) {
        const chunk = uploadedFile.slice(i * chunkSize, (i + 1) * chunkSize);
        chunk.name = uploadedFile.name;
        chunk.uid = uploadedFile.uid;
        formData.set('chunk', i + '');
        formData.set('file', chunk);
        try {
          const res = await archiveQuickImport(formData);
          if (res.code !== 0) {
            message.info(res.msg);
            hide();
          } else {
            hide = message.loading({
              content:
                intl.formatMessage({
                  id: 'setting.system.submitting',
                }) +
                ' - ' +
                Math.ceil(((i + 1) * 100) / totalChunks) +
                '%',
              duration: 0,
              key: 'uploading',
            });
            if (res.data) {
              // 上传完成
              hide();
              message.info(
                res.msg ||
                  intl.formatMessage({
                    id: 'setting.system.upload-success',
                  }),
              );
              syncTask();
            }
          }
        } catch (err) {
          hide();
          message.info(
            intl.formatMessage({ id: 'content.quick-import.upload-failed' }),
          );
        }
      }
    } else {
      // 小于 chunkSize 的，直接上传
      formData.append('file', uploadedFile);
      archiveQuickImport(formData)
        .then((res) => {
          message.success(res.msg);
          syncTask();
        })
        .finally(() => {
          hide();
        });
    }
  };

  return (
    <>
      <ModalForm
        open={props.open}
        width={600}
        title={intl.formatMessage({ id: 'content.quick-import.name' })}
        layout="horizontal"
        onOpenChange={(flag) => {
          props.onOpenChange(flag);
        }}
        onFinish={handleSubmit}
      >
        <Divider>
          <FormattedMessage id="content.quick-import.step1" />
        </Divider>
        <ProFormRadio.Group
          name="plan_type"
          width="lg"
          label={intl.formatMessage({
            id: 'content.quick-import.type',
          })}
          valueEnum={{
            0: intl.formatMessage({
              id: 'content.quick-import.type.normal',
            }),
            1: intl.formatMessage({
              id: 'content.quick-import.type.draft',
            }),
            2: intl.formatMessage({
              id: 'content.quick-import.type.plan',
            }),
          }}
          fieldProps={{
            onChange: (e) => {
              setPlanType(e.target.value);
            },
          }}
        />
        {Number(planType) === 2 && (
          <>
            <ProFormSelect
              name="plan_start"
              label={intl.formatMessage({
                id: 'content.quick-import.plan_start',
              })}
              valueEnum={{
                0: intl.formatMessage({
                  id: 'content.quick-import.plan_start.0',
                }),
                1: intl.formatMessage({
                  id: 'content.quick-import.plan_start.1',
                }),
                2: intl.formatMessage({
                  id: 'content.quick-import.plan_start.2',
                }),
                3: intl.formatMessage({
                  id: 'content.quick-import.plan_start.3',
                }),
                4: intl.formatMessage({
                  id: 'content.quick-import.plan_start.4',
                }),
                5: intl.formatMessage({
                  id: 'content.quick-import.plan_start.5',
                }),
                6: intl.formatMessage({
                  id: 'content.quick-import.plan_start.6',
                }),
                7: intl.formatMessage({
                  id: 'content.quick-import.plan_start.7',
                }),
                8: intl.formatMessage({
                  id: 'content.quick-import.plan_start.8',
                }),
                9: intl.formatMessage({
                  id: 'content.quick-import.plan_start.9',
                }),
                10: intl.formatMessage({
                  id: 'content.quick-import.plan_start.10',
                }),
                11: intl.formatMessage({
                  id: 'content.quick-import.plan_start.11',
                }),
                12: intl.formatMessage({
                  id: 'content.quick-import.plan_start.12',
                }),
                13: intl.formatMessage({
                  id: 'content.quick-import.plan_start.13',
                }),
              }}
            />
            <ProFormDigit
              name="days"
              required
              label={intl.formatMessage({
                id: 'content.quick-import.days',
              })}
              width="lg"
              fieldProps={{
                addonAfter: intl.formatMessage({
                  id: 'content.quick-import.days.suffix',
                }),
              }}
            />
          </>
        )}
        <ProFormRadio.Group
          name="title_type"
          width="lg"
          label={intl.formatMessage({
            id: 'content.quick-import.title-type',
          })}
          valueEnum={{
            0: intl.formatMessage({
              id: 'content.quick-import.title-type.title',
            }),
            1: intl.formatMessage({
              id: 'content.quick-import.title-type.content',
            }),
          }}
        />
        <ProFormRadio.Group
          name="check_duplicate"
          width="lg"
          label={intl.formatMessage({
            id: 'content.quick-import.check_duplicate',
          })}
          valueEnum={{
            0: intl.formatMessage({
              id: 'content.quick-import.check_duplicate.default',
            }),
            1: intl.formatMessage({
              id: 'content.quick-import.check_duplicate.check',
            }),
          }}
        />
        <ProFormSelect
          name="category_id"
          required
          label={intl.formatMessage({
            id: 'content.quick-import.category_id.title',
          })}
          request={async () => {
            let res = await getCategories({ type: 1 });
            return [
              {
                spacer: '',
                title: intl.formatMessage({ id: 'content.please-select' }),
                id: 0,
              },
            ].concat(res.data || []);
          }}
          fieldProps={{
            fieldNames: {
              label: 'title',
              value: 'id',
            },
            optionItemRender(item: any) {
              return (
                <div
                  dangerouslySetInnerHTML={{
                    __html: item.spacer + item.title,
                  }}
                ></div>
              );
            },
          }}
        />
        <Divider>
          <FormattedMessage id="content.quick-import.step2" />
        </Divider>
        <ProFormText
          label={intl.formatMessage({
            id: 'content.quick-import.upload',
          })}
          extra={intl.formatMessage({
            id: 'content.quick-import.upload.description',
          })}
        >
          <Upload
            name="file"
            multiple
            showUploadList={false}
            accept=".zip"
            customRequest={(e) => {
              handleSelectUploadZip(e);
            }}
          >
            <Button>
              <FormattedMessage id="content.quick-import.upload.btn" />
            </Button>
          </Upload>
          {uploadedFile && (
            <div className="mt-normal">
              <FormattedMessage id="content.quick-import.upload.selected" />
              {uploadedFile.name}
            </div>
          )}
        </ProFormText>
      </ModalForm>
      {task !== null && (
        <Modal
          title={intl.formatMessage({ id: 'content.quick-import.status' })}
          open={true}
          footer={null}
        >
          <div className="task-progress">
            <Progress
              percent={
                task.is_finished
                  ? 100
                  : Math.ceil((task.finished * 100) / task.total)
              }
            />
          </div>
          <div className="task-message">{task.message}</div>
        </Modal>
      )}
    </>
  );
};

export default QuickImportModal;
