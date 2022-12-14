import React, { useState, useRef, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Button, Space, Modal, message, Image, Upload, Tooltip, Checkbox, Input } from 'antd';
import {
  backupDesignData,
  copyDesignFileInfo,
  deleteDesignFileInfo,
  getDesignInfo,
  restoreDesignData,
  saveDesignFileInfo,
  saveDesignInfo,
  UploadDesignFileInfo,
} from '@/services';
import { history, useModel } from 'umi';
import moment from 'moment';
import { PlusOutlined } from '@ant-design/icons';
import {
  ModalForm,
  ProFormInstance,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-form';
import { downloadFile, sizeFormat } from '@/utils';
import TemplateShare from './components/share';

let autoBackup = false;
const DesignDetail: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  const formRef = React.createRef<ProFormInstance>();
  const [designInfo, setDesignInfo] = useState<any>({});
  const [addVisible, setAddVisible] = useState<boolean>(false);
  const [addFileType, setAddFileType] = useState<string>('');
  const [editVisible, setEditVisible] = useState<boolean>(false);
  const [currentFile, setCurrentFile] = useState<any>({});
  const [visible, setVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const staticActionRef = useRef<ActionType>();
  const [staticDirs, setStaticDirs] = useState<any[]>([]);
  const [templateDirs, setTemplateDirs] = useState<any[]>([]);

  const inputRef = useRef<any>();
  const inputRef2 = useRef<any>();

  const anqiUser = initialState?.anqiUser;

  useEffect(() => {
    fetchDesignInfo();
  }, []);

  const fetchDesignInfo = async () => {
    const packageName = history.location.query?.package;
    getDesignInfo({
      package: packageName,
    })
      .then((res) => {
        setDesignInfo(res.data);
        actionRef.current?.reload();
        staticActionRef.current?.reload();

        let tmpDirs = new Set();
        for (let item of res.data.tpl_files) {
          let path = item.path.substring(0, item.path.lastIndexOf('/') + 1);
          if (!path) {
            path = '/';
          }
          tmpDirs.add(path);
        }
        let tmpList = [];
        for (let key of tmpDirs.keys()) {
          tmpList.push({
            label: key,
            value: key,
          });
        }
        setTemplateDirs(tmpList);

        tmpDirs.clear();
        for (let item of res.data.static_files) {
          let path = item.path.substring(0, item.path.lastIndexOf('/') + 1);
          if (!path) {
            path = '/';
          }
          tmpDirs.add(path);
        }
        let tmpList2 = [];
        for (let key of tmpDirs.keys()) {
          tmpList2.push({
            label: key,
            value: key,
          });
        }
        setStaticDirs(tmpList2);
      })
      .catch((err) => {
        console.log(err);
        message.error('????????????????????????');
      });
  };

  const handleShowEdit = (type: string, info: any) => {
    // ??????????????????
    if (
      info.path.indexOf('.html') !== -1 ||
      info.path.indexOf('.css') !== -1 ||
      info.path.indexOf('.less') !== -1 ||
      info.path.indexOf('.scss') !== -1 ||
      info.path.indexOf('.sass') !== -1 ||
      info.path.indexOf('.js') !== -1
    ) {
      history.push(`/design/editor?package=${designInfo.package}&type=${type}&path=${info.path}`);
    } else if (
      info.path.indexOf('.png') !== -1 ||
      info.path.indexOf('.jpg') !== -1 ||
      info.path.indexOf('.jpeg') !== -1 ||
      info.path.indexOf('.gif') !== -1 ||
      info.path.indexOf('.webp') !== -1 ||
      info.path.indexOf('.bmp') !== -1
    ) {
      Modal.info({
        icon: false,
        width: 400,
        maskClosable: true,
        title: info.path,
        content: (
          <div>
            <Image
              width={340}
              src={
                (initialState?.system?.base_url || '') +
                '/static/' +
                designInfo.package +
                '/' +
                info.path
              }
            />
          </div>
        ),
      });
    } else {
      window.open(
        (initialState?.system?.base_url || '') + '/static/' + designInfo.package + '/' + info.path,
      );
    }
  };

  const handleRemove = (type: string, info: any) => {
    Modal.confirm({
      title: '?????????????????????????????????',
      onOk: () => {
        deleteDesignFileInfo({
          package: designInfo.package,
          type: type,
          path: info.path,
        }).then((res) => {
          message.info(res.msg);
        });
        fetchDesignInfo();
      },
    });
  };

  const handleCopy = (type: string, info: any) => {
    Modal.confirm({
      title: '??????????????????????????????',
      content: (
        <div>
          <div style={{ padding: '10px 0' }}>
            <div>??????????????????</div>
            <div>
              <Input ref={inputRef} defaultValue={info.path} />
            </div>
          </div>
          <div style={{ padding: '10px 0' }}>
            <div>?????????????????????</div>
            <div>
              <Input ref={inputRef2} defaultValue={info.remark} />
            </div>
          </div>
        </div>
      ),
      onOk: () => {
        const newPath = inputRef.current?.state?.value;
        if (!newPath || newPath == info.path) {
          message.error('????????????????????????????????????????????????????????????');
          return false;
        }
        const remark = inputRef2.current?.state?.value;
        copyDesignFileInfo({
          package: designInfo.package,
          type: type,
          path: info.path,
          new_path: newPath,
          remark: remark,
        }).then((res) => {
          message.info(res.msg);
        });
        return true;
      },
    });
  };

  const handleAddFile = (type: string) => {
    setAddFileType(type);
    setAddVisible(true);
  };

  const handleAddRemark = (type: string, info: any) => {
    setAddFileType(type);
    setCurrentFile(info);
    setEditVisible(true);
  };

  const handleSaveFile = (values: any) => {
    values.rename_path = values.path;
    values.path = currentFile.path;
    if (!values.path) {
      values.path = values.rename_path;
    }
    if (values.path.trim() == '') {
      message.error('?????????????????????');
      return;
    }
    const hide = message.loading('???????????????', 0);
    values.package = designInfo.package;
    values.type = addFileType;

    saveDesignFileInfo(values)
      .then((res) => {
        message.info(res.msg);
        fetchDesignInfo();
        setEditVisible(false);
        setAddVisible(false);
      })
      .finally(() => {
        hide();
      });
  };

  const handleSaveInfo = (values: any) => {
    designInfo.name = values.name;
    designInfo.template_type = values.template_type;

    saveDesignInfo(designInfo).then((res) => {
      message.info(res.msg);
      fetchDesignInfo();
      setVisible(false);
    });
  };

  const handleDownload = () => {
    Modal.confirm({
      title: '????????????????????????????????????',
      onOk: async () => {
        downloadFile(
          '/design/download',
          {
            package: designInfo.package,
          },
          designInfo.package,
        );
      },
    });
  };

  const handleUploadTemplate = (e: any) => {
    let values = formRef.current?.getFieldsValue();
    Modal.confirm({
      title: '???????????????????????????',
      content: `??????????????????????????????${addFileType == 'static' ? '??????' : '??????'}?????????${
        values.path
      } ??????`,
      onOk: async () => {
        let formData = new FormData();
        formData.append('file', e.file);
        formData.append('package', designInfo.package);
        formData.append('type', addFileType);
        formData.append('path', values.path);

        const hide = message.loading('???????????????', 0);
        UploadDesignFileInfo(formData)
          .then((res) => {
            if (res.code !== 0) {
              message.info(res.msg);
            } else {
              message.info(res.msg || '????????????');
              setAddVisible(false);
              actionRef.current?.reload();
            }
          })
          .finally(() => {
            hide();
          });
      },
    });
  };

  const handleRestoreDesignData = () => {
    Modal.confirm({
      title: '?????????????????????????????????????????????',
      content: (
        <div>
          <p>????????????????????????????????????????????????????????????????????????</p>
          <p>?????????????????????????????????????????????????????????????????????</p>
          <div>
            <Checkbox
              value={true}
              onChange={(e) => {
                autoBackup = e.target.checked;
              }}
            >
              <span className="text-red">*</span>
              ??????????????????
            </Checkbox>
          </div>
        </div>
      ),
      onOk: () => {
        const hide = message.loading('???????????????', 0);
        restoreDesignData({ package: designInfo.package, auto_backup: autoBackup })
          .then((res) => {
            message.info(res.msg);
          })
          .finally(() => {
            hide();
          });
      },
    });
  };

  const handleBackupDesignData = () => {
    Modal.confirm({
      title: '???????????????????????????????????????????????????',
      content: (
        <div>
          <p>?????????????????????????????????????????????????????????????????????????????????</p>
          {designInfo.preview_data && (
            <p>?????????????????????????????????????????????????????????????????????????????????????????????</p>
          )}
        </div>
      ),
      onOk: async () => {
        const hide = message.loading('?????????????????????', 0);
        backupDesignData({ package: designInfo.package })
          .then((res) => {
            message.info(res.msg);
          })
          .finally(() => {
            hide();
          });
      },
    });
  };

  const columns: ProColumns<any>[] = [
    {
      title: '??????',
      dataIndex: 'path',
      render: (text: any, record: any) => (
        <a
          title="????????????"
          onClick={() => {
            handleShowEdit('template', record);
          }}
        >
          {text}
        </a>
      ),
    },
    {
      title: '??????',
      dataIndex: 'remark',
      width: 200,
    },
    {
      title: '??????',
      dataIndex: 'size',
      width: 150,
      render: (text: any, record: any) => <div>{sizeFormat(text)}</div>,
    },
    {
      title: '????????????',
      dataIndex: 'last_mod',
      width: 200,
      render: (text: any) => moment((text as number) * 1000).format('YYYY-MM-DD HH:mm'),
    },
    {
      title: '??????',
      key: 'action',
      width: 100,
      render: (text: any, record: any) => (
        <Space size={16}>
          <Button
            type="link"
            onClick={() => {
              handleAddRemark('template', record);
            }}
          >
            +??????/?????????
          </Button>
          <Button
            type="link"
            onClick={() => {
              handleCopy('template', record);
            }}
          >
            ????????????
          </Button>
          <Button
            danger
            type="link"
            onClick={() => {
              handleRemove('template', record);
            }}
          >
            ??????
          </Button>
        </Space>
      ),
    },
  ];

  const columnsStatic: ProColumns<any>[] = [
    {
      title: '??????',
      dataIndex: 'path',
      render: (text: any, record: any) => (
        <a
          title="????????????"
          onClick={() => {
            handleShowEdit('static', record);
          }}
        >
          {text}
        </a>
      ),
    },
    {
      title: '??????',
      dataIndex: 'remark',
      width: 200,
    },
    {
      title: '??????',
      dataIndex: 'size',
      width: 150,
      render: (text: any, record: any) => <div>{sizeFormat(text)}</div>,
    },
    {
      title: '????????????',
      dataIndex: 'last_mod',
      width: 200,
      render: (text: any) => moment((text as number) * 1000).format('YYYY-MM-DD HH:mm'),
    },
    {
      title: '??????',
      key: 'action',
      width: 100,
      render: (text: any, record: any) => (
        <Space size={16}>
          <Button
            type="link"
            onClick={() => {
              handleAddRemark('static', record);
            }}
          >
            +??????/?????????
          </Button>
          <Button
            type="link"
            onClick={() => {
              handleCopy('static', record);
            }}
          >
            ????????????
          </Button>
          <Button
            danger
            type="link"
            onClick={() => {
              handleRemove('static', record);
            }}
          >
            ??????
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <PageContainer title={designInfo.name + ' ????????????'}>
      <ProTable<any>
        headerTitle="??????????????????"
        actionRef={actionRef}
        rowKey="path"
        search={false}
        toolBarRender={() => [
          <Button
            type="primary"
            key="add"
            onClick={() => {
              handleAddFile('template');
            }}
          >
            <PlusOutlined /> ???????????????
          </Button>,
          <Button
            key="edit"
            onClick={() => {
              setVisible(true);
            }}
          >
            ??????????????????
          </Button>,
          <Button
            key="download"
            onClick={() => {
              handleDownload();
            }}
          >
            ??????????????????
          </Button>,
          designInfo.status == 1 && (
            <Button key="backup" onClick={handleBackupDesignData}>
              ??????????????????
            </Button>
          ),
          designInfo.preview_data && designInfo.status == 1 && (
            <Tooltip title="??????????????????????????????" key="restore">
              <Button onClick={handleRestoreDesignData}>?????????????????????</Button>
            </Tooltip>
          ),
          <Tooltip title="??????????????????AnqiCMS????????????" key="share">
            <TemplateShare
              designInfo={designInfo}
              canShare={
                anqiUser?.auth_id > 0 &&
                (designInfo.template_id == 0 || designInfo.auth_id == anqiUser?.auth_id)
              }
              onFinished={() => {
                actionRef.current?.reload();
              }}
            >
              <Button>??????????????????</Button>
            </TemplateShare>
          </Tooltip>,
        ]}
        request={async () => {
          return {
            data: designInfo.tpl_files || [],
            success: true,
          };
        }}
        pagination={false}
        columns={columns}
      />
      <ProTable<any>
        headerTitle="????????????"
        actionRef={staticActionRef}
        rowKey="path"
        search={false}
        toolBarRender={() => [
          <Button
            type="primary"
            key="add"
            onClick={() => {
              handleAddFile('static');
            }}
          >
            <PlusOutlined /> ???????????????
          </Button>,
        ]}
        request={async (params, sort) => {
          return {
            data: designInfo.static_files || [],
            success: true,
          };
        }}
        pagination={false}
        columns={columnsStatic}
      />
      {addVisible && (
        <ModalForm
          width={600}
          title={'?????????' + (addFileType == 'static' ? '??????' : '??????') + '??????'}
          formRef={formRef}
          visible={addVisible}
          modalProps={{
            onCancel: () => {
              setAddVisible(false);
            },
          }}
          //layout="horizontal"
          onFinish={async (values) => {
            setAddVisible(false);
          }}
        >
          <ProFormSelect
            label="????????????"
            showSearch
            name="path"
            width="lg"
            request={async () => {
              return addFileType == 'static' ? staticDirs : templateDirs;
            }}
          />
          <ProFormText name="tpl" label="????????????">
            <Upload name="file" showUploadList={false} customRequest={handleUploadTemplate}>
              <Button type="primary">????????????</Button>
            </Upload>
          </ProFormText>
          <div>
            <p>
              ?????????????????????????????????(.html)??????????????????(css,js,??????,?????????)?????????zip????????????????????????zip,?????????????????????????????????
            </p>
          </div>
        </ModalForm>
      )}
      {editVisible && (
        <ModalForm
          width={600}
          title={currentFile.name + '????????????'}
          visible={editVisible}
          modalProps={{
            onCancel: () => {
              setEditVisible(false);
            },
          }}
          initialValues={currentFile}
          //layout="horizontal"
          onFinish={async (values) => {
            handleSaveFile(values);
          }}
        >
          <ProFormText name="path" label="?????????" />
          <ProFormText name="remark" label="??????" />
        </ModalForm>
      )}
      {visible && (
        <ModalForm
          width={600}
          title={'????????????'}
          visible={visible}
          modalProps={{
            onCancel: () => {
              setVisible(false);
            },
          }}
          initialValues={designInfo}
          //layout="horizontal"
          onFinish={async (values) => {
            handleSaveInfo(values);
          }}
        >
          <ProFormText name="name" label="????????????" />
          <ProFormRadio.Group
            name="template_type"
            label="????????????"
            extra="?????????????????????????????????????????????????????????????????????????????????????????????2????????????????????????????????????????????????????????????????????????????????????+??????????????????2????????????2??????????????????????????????????????????????????????????????????????????????????????????"
            options={[
              {
                value: 0,
                label: '?????????',
              },
              {
                value: 1,
                label: '????????????',
              },
              {
                value: 2,
                label: '??????+??????',
              },
            ]}
          />
        </ModalForm>
      )}
    </PageContainer>
  );
};

export default DesignDetail;
