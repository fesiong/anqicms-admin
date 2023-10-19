import React, { useState, useRef, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import {
  Button,
  Space,
  Modal,
  message,
  Image,
  Upload,
  Tooltip,
  Checkbox,
  Input,
  Avatar,
} from 'antd';
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
import './index.less';

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
  const [detailVisible, setDetailVisible] = useState<boolean>(false);
  const [tempDirs, setTempDirs] = useState<any[]>([]);

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
        message.error('获取模板信息出错');
      });
  };

  const handleShowEdit = (type: string, info: any) => {
    // 可编辑的文件
    if (
      info.path.indexOf('.html') !== -1 ||
      info.path.indexOf('.css') !== -1 ||
      info.path.indexOf('.less') !== -1 ||
      info.path.indexOf('.scss') !== -1 ||
      info.path.indexOf('.sass') !== -1 ||
      info.path.indexOf('.js') !== -1
    ) {
      history.push(`/design/editor?package=${designInfo.package}&type=${type}&path=${info.path}`);
    } else {
      setAddFileType(type);
      setCurrentFile(info);
      setDetailVisible(true);
    }
  };

  const handleRemove = (type: string, info: any) => {
    Modal.confirm({
      title: '确定要删除这个文件吗？',
      onOk: () => {
        deleteDesignFileInfo({
          package: designInfo.package,
          type: type,
          path: info.path,
        })
          .then((res) => {
            message.info(res.msg);
          })
          .finally(() => {
            setDetailVisible(false);
          });
        fetchDesignInfo();
      },
    });
  };

  const handleCopy = (type: string, info: any) => {
    Modal.confirm({
      title: '请填写复制后的文件名',
      content: (
        <div>
          <div style={{ padding: '10px 0' }}>
            <div>新的文件名：</div>
            <div>
              <Input ref={inputRef} defaultValue={info.path} />
            </div>
          </div>
          <div style={{ padding: '10px 0' }}>
            <div>新的文件备注：</div>
            <div>
              <Input ref={inputRef2} defaultValue={info.remark} />
            </div>
          </div>
        </div>
      ),
      onOk: () => {
        const newPath = inputRef.current?.input?.value;
        if (!newPath || newPath == info.path) {
          message.error('新文件名与被复制的文件名一致，请重新修改');
          return false;
        }
        const remark = inputRef2.current?.input?.value;
        copyDesignFileInfo({
          package: designInfo.package,
          type: type,
          path: info.path,
          new_path: newPath,
          remark: remark,
        }).then((res) => {
          message.info(res.msg);
          Modal.destroyAll();
          fetchDesignInfo();
        });
        return true;
      },
    });
  };

  const handleAddFile = (type: string) => {
    onSearchTempDir('');
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
      message.error('文件名不能为空');
      return;
    }
    const hide = message.loading('正在提交中', 0);
    values.package = designInfo.package;
    values.type = addFileType;

    saveDesignFileInfo(values)
      .then((res) => {
        message.info(res.msg);
        fetchDesignInfo();
        setEditVisible(false);
        setAddVisible(false);
        setDetailVisible(false);
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
      title: '确定要打包下载该模板吗？',
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
    let savePath = values.path || '';
    Modal.confirm({
      title: '确定要上传文件吗？',
      content: `你上传的文件将存放到${
        addFileType == 'static' ? '资源' : '模板'
      }目录：${savePath} 中。`,
      onOk: async () => {
        let formData = new FormData();
        formData.append('file', e.file);
        formData.append('package', designInfo.package);
        formData.append('type', addFileType);
        formData.append('path', savePath);

        const hide = message.loading('正在提交中', 0);
        UploadDesignFileInfo(formData)
          .then((res) => {
            if (res.code !== 0) {
              message.info(res.msg);
            } else {
              message.info(res.msg || '上传成功');
              setAddVisible(false);
              fetchDesignInfo();
            }
          })
          .finally(() => {
            hide();
          });
      },
    });
  };

  const handleReplaceFile = (e: any) => {
    let replacePath = currentFile.path?.substring(0, currentFile.path?.lastIndexOf('/') + 1);
    let replaceName = currentFile.path?.substring(currentFile.path?.lastIndexOf('/') + 1);
    let formData = new FormData();
    formData.append('file', e.file);
    formData.append('name', replaceName);
    formData.append('package', designInfo.package);
    formData.append('type', addFileType);
    formData.append('path', replacePath);

    const hide = message.loading('正在提交中', 0);
    UploadDesignFileInfo(formData)
      .then((res) => {
        if (res.code !== 0) {
          message.info(res.msg);
        } else {
          message.info(res.msg || '上传成功');
          setAddVisible(false);
          setDetailVisible(false);
          actionRef.current?.reload();
        }
      })
      .finally(() => {
        hide();
      });
  };

  const onSearchTempDir = (e: string) => {
    let tmpData = addFileType == 'static' ? staticDirs : templateDirs;
    if (e == '') {
      setTempDirs(tmpData);
      return;
    }
    let index = -1;
    for (let i in tmpData) {
      if (tmpData[i].value.indexOf(e) !== -1) {
        index = Number(i);
        break;
      }
    }
    if (index === -1) {
      if (e.lastIndexOf('/') !== e.length - 1) {
        e = e + '/';
      }
      setTempDirs([{ label: '新建目录：' + e, value: e }]);
    }
  };

  const handleRestoreDesignData = () => {
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
      title: '确定要给当前模板增加初始化数据吗？',
      content: (
        <div>
          <p>该操作旨在给当前模板增加一份用于模板初始化的演示数据。</p>
          {designInfo.preview_data && (
            <p>该模板已经存在演示数据，如果再次执行，旧的演示数据将会被覆盖。</p>
          )}
        </div>
      ),
      onOk: async () => {
        const hide = message.loading('正在执行备份中', 0);
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
      title: '名称',
      dataIndex: 'path',
      render: (text: any, record: any) => (
        <a
          title="点击编辑"
          onClick={() => {
            handleShowEdit('template', record);
          }}
        >
          {text}
        </a>
      ),
    },
    {
      title: '备注',
      dataIndex: 'remark',
      width: 200,
    },
    {
      title: '大小',
      dataIndex: 'size',
      width: 150,
      render: (text: any, record: any) => <div>{sizeFormat(text)}</div>,
    },
    {
      title: '修改时间',
      dataIndex: 'last_mod',
      width: 200,
      render: (text: any) => moment((text as number) * 1000).format('YYYY-MM-DD HH:mm'),
    },
    {
      title: '操作',
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
            +备注/重命名
          </Button>
          <Button
            type="link"
            onClick={() => {
              handleCopy('template', record);
            }}
          >
            复制一份
          </Button>
          <Button
            danger
            type="link"
            onClick={() => {
              handleRemove('template', record);
            }}
          >
            删除
          </Button>
        </Space>
      ),
    },
  ];

  const columnsStatic: ProColumns<any>[] = [
    {
      title: '名称',
      dataIndex: 'path',
      render: (text: any, record: any) => (
        <a
          title="点击编辑"
          onClick={() => {
            handleShowEdit('static', record);
          }}
        >
          {text}
        </a>
      ),
    },
    {
      title: '备注',
      dataIndex: 'remark',
      width: 200,
    },
    {
      title: '大小',
      dataIndex: 'size',
      width: 150,
      render: (text: any, record: any) => <div>{sizeFormat(text)}</div>,
    },
    {
      title: '修改时间',
      dataIndex: 'last_mod',
      width: 200,
      render: (text: any) => moment((text as number) * 1000).format('YYYY-MM-DD HH:mm'),
    },
    {
      title: '操作',
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
            +备注/重命名
          </Button>
          <Button
            type="link"
            onClick={() => {
              handleCopy('static', record);
            }}
          >
            复制一份
          </Button>
          <Button
            danger
            type="link"
            onClick={() => {
              handleRemove('static', record);
            }}
          >
            删除
          </Button>
        </Space>
      ),
    },
  ];

  const canShare =
    anqiUser?.auth_id > 0 &&
    (designInfo.template_id == 0 || designInfo.auth_id == anqiUser?.auth_id);

  return (
    <PageContainer title={designInfo.name + ' 文件管理'}>
      <ProTable<any>
        headerTitle="模板文件管理"
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
            <PlusOutlined /> 添加新文件
          </Button>,
          <Button
            key="edit"
            onClick={() => {
              setVisible(true);
            }}
          >
            修改模板信息
          </Button>,
          <Button
            key="download"
            onClick={() => {
              handleDownload();
            }}
          >
            打包下载模板
          </Button>,
          designInfo.status == 1 && (
            <Button key="backup" onClick={handleBackupDesignData}>
              备份模板数据
            </Button>
          ),
          designInfo.preview_data && designInfo.status == 1 && (
            <Tooltip title="安装该模板的演示数据" key="restore">
              <Button onClick={handleRestoreDesignData}>初始化模板数据</Button>
            </Tooltip>
          ),
          (canShare || !anqiUser || anqiUser?.auth_id == 0) && (
            <Tooltip title="将模板上架到AnqiCMS模板市场" key="share">
              <TemplateShare
                designInfo={designInfo}
                canShare={canShare}
                templateId={designInfo.template_id}
                onFinished={() => {
                  actionRef.current?.reload();
                }}
              >
                <Button>分享上架模板</Button>
              </TemplateShare>
            </Tooltip>
          ),
        ]}
        request={async () => {
          return {
            data: designInfo.tpl_files || [],
            success: true,
          };
        }}
        columns={columns}
        pagination={{
          showSizeChanger: true,
        }}
      />
      <ProTable<any>
        headerTitle="资源文件"
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
            <PlusOutlined /> 添加新资源
          </Button>,
        ]}
        request={async () => {
          return {
            data: designInfo.static_files || [],
            success: true,
          };
        }}
        columns={columnsStatic}
        pagination={{
          showSizeChanger: true,
        }}
      />
      {addVisible && (
        <ModalForm
          width={600}
          title={'添加新' + (addFileType == 'static' ? '资源' : '模板') + '文件'}
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
            label="存放目录"
            showSearch
            name="path"
            width="lg"
            fieldProps={{
              onSearch: async (e) => {
                onSearchTempDir(e);
              },
            }}
            options={tempDirs}
          />
          <ProFormText name="tpl" label="模板文件">
            <Upload name="file" showUploadList={false} customRequest={handleUploadTemplate}>
              <Button type="primary">选择文件</Button>
            </Upload>
          </ProFormText>
          <div>
            <p>
              说明：只能上传模板文件(.html)、和资源文件(css,js,图片,字体等)，以及zip的文件。如果上传zip,会自动解压到当前目录。
            </p>
          </div>
        </ModalForm>
      )}
      {editVisible && (
        <ModalForm
          width={600}
          title={currentFile.path + '修改文件'}
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
          <ProFormText name="path" label="文件名" />
          <ProFormText name="remark" label="备注" />
        </ModalForm>
      )}
      {visible && (
        <ModalForm
          width={600}
          title={'修改模板'}
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
          <ProFormText name="name" label="模板名称" />
          <ProFormRadio.Group
            name="template_type"
            label="模板类型"
            extra="自适应类型模板只有一个域名和一套模板；代码适配类型有一个域名和2套模板，电脑端和手机端访问同一个域名会展示不同模板；电脑+手机类型需要2个域名和2套模板，访问电脑域名展示电脑模板，访问手机域名展示手机模板。"
            options={[
              {
                value: 0,
                label: '自适应',
              },
              {
                value: 1,
                label: '代码适配',
              },
              {
                value: 2,
                label: '电脑+手机',
              },
            ]}
          />
        </ModalForm>
      )}
      <Modal
        width={900}
        title={'查看资源详情'}
        onCancel={() => setDetailVisible(false)}
        onOk={() => setDetailVisible(false)}
        visible={detailVisible}
      >
        <div className="attachment-detail">
          <div className="preview">
            {currentFile.path?.indexOf('.png') !== -1 ||
            currentFile.path?.indexOf('.jpg') !== -1 ||
            currentFile.path?.indexOf('.jpeg') !== -1 ||
            currentFile.path?.indexOf('.gif') !== -1 ||
            currentFile.path?.indexOf('.webp') !== -1 ||
            currentFile.path?.indexOf('.bmp') !== -1 ? (
              <Image
                width={'100%'}
                className="img"
                preview={{
                  src:
                    (initialState?.system?.base_url || '') +
                    '/static/' +
                    designInfo.package +
                    '/' +
                    currentFile.path,
                }}
                src={
                  (initialState?.system?.base_url || '') +
                  '/static/' +
                  designInfo.package +
                  '/' +
                  currentFile.path
                }
                alt={currentFile.path}
              />
            ) : (
              <Avatar className="avatar">
                {currentFile.path?.substring(currentFile.path?.lastIndexOf('/') + 1)}
              </Avatar>
            )}
          </div>
          <div className="detail">
            <div className="info">
              <div className="item">
                <div className="name">文件路径:</div>
                <div className="value">{currentFile.path}</div>
              </div>
              <div className="item">
                <div className="name">文件类型:</div>
                <div className="value">
                  {currentFile.path?.substring(currentFile.path?.lastIndexOf('.'))}
                </div>
              </div>
              <div className="item">
                <div className="name">最近修改:</div>
                <div className="value">
                  {moment(currentFile.last_mod * 1000).format('YYYY-MM-DD HH:mm:ss')}
                </div>
              </div>
              <div className="item">
                <div className="name">文件大小:</div>
                <div className="value">{sizeFormat(currentFile.size)}</div>
              </div>
              <div className="item">
                <div className="name">备注:</div>
                <div className="value">{currentFile.remark}</div>
              </div>
            </div>
            <Space size={16} align="center" className="btns">
              <Upload
                name="file"
                showUploadList={false}
                accept={currentFile.path?.substring(currentFile.path?.lastIndexOf('.'))}
                customRequest={handleReplaceFile}
              >
                <Button>替换文件</Button>
              </Upload>
              <Button
                onClick={() => {
                  handleAddRemark('template', currentFile);
                }}
              >
                修改文件名
              </Button>
              <Button
                onClick={() => {
                  handleRemove('template', currentFile);
                }}
              >
                删除
              </Button>
              <Button danger onClick={() => setDetailVisible(false)}>
                关闭
              </Button>
            </Space>
            <div className="tips">
              <p>相关说明：</p>
              <div>1、替换图片时，图片的URL地址不变，图片大小变为新图片的。</div>
              <div>2、图片上传后，如果后台更新了，但前台未更新，请清理本地浏览器缓存。</div>
            </div>
          </div>
        </div>
      </Modal>
    </PageContainer>
  );
};

export default DesignDetail;
