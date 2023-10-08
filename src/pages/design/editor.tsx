import React, { useState, useRef, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import MonacoEditor from 'react-monaco-editor';
import { Button, Card, Col, message, Row, Space, Collapse, Modal, Tree } from 'antd';
import { history } from 'umi';
import {
  deleteDesignHistoryFile,
  getDesignFileHistories,
  getDesignFileHistoryInfo,
  getDesignFileInfo,
  getDesignInfo,
  restoreDesignFileInfo,
  saveDesignFileInfo,
} from '@/services/design';
import './index.less';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import moment from 'moment';
import TemplateCompare from './components/compare';

var fileType: string = '';

const DesignEditor: React.FC = () => {
  const [fileInfo, setFileInfo] = useState<any>({});
  const [designInfo, setDesignInfo] = useState<any>({});
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const [code, setCode] = useState<string>(``);
  const actionRef = useRef<ActionType>();
  const [loaded, setLoaded] = useState<boolean>(false);
  const [height, setHeight] = useState(0);
  const [tplFiles, setTplFiles] = useState<any[]>([]);
  const [staticFiles, setStaticFiles] = useState<any[]>([]);
  const [showDiff, setShowDiff] = useState<boolean>(false);
  const [historyContent, setHistoryContent] = useState<string>('');

  var unsave = false;

  useEffect(() => {
    fetchDesignInfo();
    getHeight();
    window.addEventListener('resize', getHeight);
    return () => {
      // 组件销毁时移除监听事件
      window.removeEventListener('resize', getHeight);
    };
  }, []);

  const fetchDesignInfo = async () => {
    const packageName = history.location.query?.package;
    getDesignInfo({
      package: packageName,
    })
      .then((res) => {
        setDesignInfo(res.data);

        var path = history.location.query?.path || '';
        var type = history.location.query?.type || '';
        fileType = type + '';

        if (path == '' && res.data.tpl_files?.length > 0) {
          type = 'template';
          path = res.data.tpl_files[0].path;
        }
        let tpls: any[] = [];
        for (let i in res.data.tpl_files) {
          let val = res.data.tpl_files[i].path.split('/');
          if (val.length > 1) {
            // 检查是否存在
            let exist = null;
            for (let j in tpls) {
              if (tpls[j].key === val[0]) {
                exist = tpls[j];
                break;
              }
            }
            if (!exist) {
              exist = {
                key: val[0],
                title: val[0],
                children: [],
              };
              tpls.push(exist);
            }
            let path2 = val.slice(1).join('/');
            exist.children.push({
              path: res.data.tpl_files[i].path,
              remark: res.data.tpl_files[i].remark,
              title: (
                <div>
                  <div className="name">{path2}</div>
                  <div className="extra">{res.data.tpl_files[i].remark}</div>
                </div>
              ),
              key: i,
            });
          } else {
            tpls.push({
              path: res.data.tpl_files[i].path,
              remark: res.data.tpl_files[i].remark,
              title: (
                <div>
                  <div className="name">{res.data.tpl_files[i].path}</div>
                  <div className="extra">{res.data.tpl_files[i].remark}</div>
                </div>
              ),
              key: i,
            });
          }
        }
        setTplFiles(tpls);
        // static
        let statics: any[] = [];
        for (let i in res.data.static_files) {
          if (
            res.data.static_files[i].path.indexOf('.js') !== -1 ||
            res.data.static_files[i].path.indexOf('.ts') !== -1 ||
            res.data.static_files[i].path.indexOf('.css') !== -1 ||
            res.data.static_files[i].path.indexOf('.scss') !== -1 ||
            res.data.static_files[i].path.indexOf('.sass') !== -1 ||
            res.data.static_files[i].path.indexOf('.less') !== -1
          ) {
            let val = res.data.static_files[i].path.split('/');
            if (val.length > 1) {
              // 检查是否存在
              let exist = null;
              for (let j in statics) {
                if (statics[j].key === val[0]) {
                  exist = statics[j];
                  break;
                }
              }
              if (!exist) {
                exist = {
                  key: val[0],
                  title: val[0],
                  children: [],
                };
                statics.push(exist);
              }
              let path2 = val.slice(1).join('/');
              exist.children.push({
                path: res.data.static_files[i].path,
                remark: res.data.static_files[i].remark,
                title: (
                  <div>
                    <div className="name">{path2}</div>
                    <div className="extra">{res.data.static_files[i].remark}</div>
                  </div>
                ),
                key: i,
              });
            } else {
              statics.push({
                path: res.data.static_files[i].path,
                remark: res.data.static_files[i].remark,
                title: (
                  <div>
                    <div className="name">{res.data.static_files[i].path}</div>
                    <div className="extra">{res.data.static_files[i].remark}</div>
                  </div>
                ),
                key: i,
              });
            }
          }
        }
        setStaticFiles(statics);

        fetchDesignFileInfo(path);
      })
      .catch(() => {
        message.error('获取模板信息出错');
      });
  };

  const fetchDesignFileInfo = async (path: any) => {
    const packageName = history.location.query?.package;
    setLoaded(false);
    getDesignFileInfo({
      package: packageName,
      type: fileType,
      path: path,
    })
      .then((res) => {
        setFileInfo(res.data);
        setCode(res.data.content || '');
        setLoaded(true);
        actionRef.current?.reload();
      })
      .catch(() => {
        message.error('获取模板信息出错');
      });
  };

  const editorDidMount = (editor: any, monaco: any) => {
    //console.log('editorDidMount', editor);
    //editor.focus();
  };

  const onChangeCode = (newCode: string) => {
    if (code != newCode) {
      setCode(newCode);
      unsave = true;
    }
  };

  const handleSave = () => {
    fileInfo.content = code;
    fileInfo.package = designInfo.package;
    fileInfo.update_content = true;
    fileInfo.type = fileType;
    unsave = false;
    const hide = message.loading('正在提交中', 0);
    saveDesignFileInfo(fileInfo)
      .then((res) => {
        message.info(res.msg);
        actionRef.current?.reload();
      })
      .finally(() => {
        hide();
      });
  };

  const handleEditFile = (type: string, info: any) => {
    if (unsave) {
      Modal.confirm({
        title: '你有未保存的代码，确定要编辑新文件吗？',
        content: '这么做将会导致未保存的代码丢失。',
        onOk: () => {
          fileType = type;
          fetchDesignFileInfo(info.path);
          scrollToTop();
        },
      });
    } else {
      fileType = type;
      fetchDesignFileInfo(info.path);
      scrollToTop();
    }
  };

  const scrollToTop = () => {
    window.scrollTo(window.pageXOffset, 0);
  };

  const handleCompare = (info: any) => {
    getDesignFileHistoryInfo({
      hash: info.hash,
      package: designInfo.package,
      path: fileInfo.path,
      type: fileType,
    }).then((res) => {
      if (res.code !== 0) {
        message.error(res.msg);
      } else {
        setHistoryContent(res.data);
        setShowDiff(true);
      }
    });
  };

  const handleRestore = (info: any) => {
    Modal.confirm({
      title: '确定要恢复到指定时间的版本吗？',
      content: '这么做将会导致未保存的代码丢失。',
      onOk: () => {
        const hide = message.loading('正在提交中', 0);
        restoreDesignFileInfo({
          hash: info.hash,
          package: designInfo.package,
          path: fileInfo.path,
          type: fileType,
        })
          .then((res) => {
            message.info(res.msg);
            fetchDesignFileInfo(info.path);
          })
          .finally(() => {
            hide();
          });
      },
    });
  };

  const deleteHistoryFile = (info: any) => {
    Modal.confirm({
      title: '确定要删除这个历史记录吗？',
      onOk: () => {
        const hide = message.loading('正在提交中', 0);
        deleteDesignHistoryFile({
          hash: info.hash,
          package: designInfo.package,
          path: fileInfo.path,
          type: fileType,
        })
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

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 's' && (event.ctrlKey || event.metaKey)) {
      // 自动保存
      handleSave();

      event.preventDefault();
    }
  };

  const handleGoBack = () => {
    if (unsave) {
      Modal.confirm({
        title: '你有未保存的代码，确定要返回吗？',
        content: '这么做将会导致未保存的代码丢失。',
        onOk: () => {
          history.goBack();
        },
      });
    } else {
      history.goBack();
    }
  };

  const getSize = (size: any) => {
    if (size < 500) {
      return size + 'B';
    }
    if (size < 1024 * 1024) {
      return (size / 1024).toFixed(2) + 'KB';
    }

    return (size / 1024 / 1024).toFixed(2) + 'MB';
  };

  const getLanguage = (filePath: string) => {
    return filePath.indexOf('.html') !== -1
      ? 'html'
      : filePath.indexOf('.css') !== -1
      ? 'css'
      : 'javascript';
  };

  const getHeight = () => {
    let num = window?.innerHeight - 260;
    if (num < 450) {
      num = 450;
    } else if (num > 900) {
      num = 900;
    }

    setHeight(num);
  };

  const columns: ProColumns<any>[] = [
    {
      title: 'Hash',
      dataIndex: 'hash',
    },
    {
      title: '大小',
      dataIndex: 'size',
      render: (text: any, record: any) => <div>{getSize(text)}</div>,
    },
    {
      title: '修改时间',
      dataIndex: 'last_mod',
      render: (text: any) => moment((text as number) * 1000).format('YYYY-MM-DD HH:mm'),
    },
    {
      title: '操作',
      key: 'action',
      width: 110,
      render: (text: any, record: any) => (
        <Space size={12}>
          <Button
            type="link"
            onClick={() => {
              handleCompare(record);
            }}
          >
            对比
          </Button>
          <Button
            type="link"
            onClick={() => {
              handleRestore(record);
            }}
          >
            恢复
          </Button>
          <Button
            danger
            type="link"
            onClick={() => {
              deleteHistoryFile(record);
            }}
          >
            删除
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <PageContainer title={<div>正在编辑: {fileInfo?.path}</div>}>
      <Card>
        <Row gutter={16}>
          <Col span={18}>
            <div className="code-editor-box" onKeyDown={handleKeyDown}>
              {loaded && (
                <MonacoEditor
                  height={height}
                  language={getLanguage(fileInfo?.path || '')}
                  theme="vs-dark"
                  value={code}
                  options={{
                    selectOnLineNumbers: false,
                    wordWrap: 'on',
                  }}
                  onChange={onChangeCode}
                  editorDidMount={editorDidMount}
                />
              )}
            </div>
            <div className="mt-normal">
              <Space size={16}>
                <Button
                  type="primary"
                  onClick={() => {
                    handleSave();
                  }}
                >
                  保存
                </Button>
                <Button onClick={handleGoBack}>返回</Button>
                <Button
                  onClick={() => {
                    setShowHistory(true);
                  }}
                >
                  查看历史
                </Button>
              </Space>
            </div>
          </Col>
          <Col span={6}>
            <Collapse defaultActiveKey={['1']}>
              <Collapse.Panel className="tpl-file-list" showArrow={false} header="模板文件" key="1">
                <Tree
                  showLine={true}
                  showIcon={false}
                  defaultExpandedKeys={['0-0']}
                  onSelect={(e, a) => {
                    if (a.node.children) {
                      return;
                    }
                    handleEditFile('template', a.node);
                  }}
                  treeData={tplFiles}
                />
              </Collapse.Panel>
              <Collapse.Panel className="tpl-file-list" showArrow={false} header="资源文件" key="2">
                <Tree
                  showLine={true}
                  showIcon={false}
                  defaultExpandedKeys={['0-0']}
                  onSelect={(e, a) => {
                    if (a.node.children) {
                      return;
                    }
                    handleEditFile('static', a.node);
                  }}
                  treeData={staticFiles}
                />
              </Collapse.Panel>
            </Collapse>
          </Col>
        </Row>
      </Card>
      <Modal
        title="文件历史"
        visible={showHistory}
        onCancel={() => {
          setShowHistory(false);
        }}
        onOk={() => {
          setShowHistory(false);
        }}
        width={800}
      >
        <ProTable<any>
          headerTitle="设计文件管理"
          actionRef={actionRef}
          rowKey="path"
          search={false}
          toolBarRender={false}
          request={async (params, sort) => {
            params.package = designInfo.package;
            params.path = fileInfo.path;
            return getDesignFileHistories(params);
          }}
          columns={columns}
        />
      </Modal>
      {showDiff && (
        <TemplateCompare
          visible={showDiff}
          originCode={historyContent}
          language={getLanguage(fileInfo?.path || '')}
          versionCode={code}
          onCancel={() => setShowDiff(false)}
          onFinished={(e) => {
            onChangeCode(e);
            setShowDiff(false);
          }}
        />
      )}
    </PageContainer>
  );
};

export default DesignEditor;
