import React, { useState, useRef, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import MonacoEditor, { monaco } from 'react-monaco-editor';
import { Button, Card, Col, message, Row, Space, Modal, Tree, Input, Popover } from 'antd';
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
import CollapseItem from '@/components/collaspeItem';
import { getDesignTplHelpers } from '@/services';

let fileType: string = '';
let helperEvent: any;

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
  const [tplSelect, setTplSelect] = useState<React.Key[]>([]);
  const [staticSelect, setStaticSelect] = useState<React.Key[]>([]);
  const [showTplHelper, setShowTplHelper] = useState<boolean>(false);
  const [tplHelpers, setTplHelpers] = useState<any[]>();
  const [addCodeVisible, setAddCodeVisible] = useState<boolean>(false);
  const [addCode, setAddCode] = useState<any>({});
  const [codeValue, setCodeValue] = useState<string>('');

  let unsave = false;

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
    let showTplHelperAction = editor.createContextKey('showTplHelperAction', true);
    editor.addAction({
      // id
      id: 'tpl-helper',
      // 该菜单键显示文本
      label: '模板标签助手',
      // 控制该菜单键显示
      precondition: 'showTplHelperAction',
      // 该菜单键位置
      contextMenuGroupId: 'navigation',
      contextMenuOrder: 1.5,
      // 点击该菜单键后运行
      run: (event: any) => {
        // 光标位置
        helperEvent = event;
        setShowTplHelper(true);
        getTplHelpers();
      },
    });
  };

  const getTplHelpers = () => {
    if (!tplHelpers) {
      getDesignTplHelpers().then((res: any) => {
        setTplHelpers(res.data || null);
      });
    }
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

  const handleAddCode = (addCode: any, docLink: string) => {
    if (docLink) {
      addCode.link = docLink;
    }
    setAddCode(addCode);
    setCodeValue(addCode.code);
    setAddCodeVisible(true);
  };

  const onSubmitAddCode = () => {
    if (helperEvent) {
      let position = helperEvent.getPosition();
      helperEvent?.executeEdits('', [
        {
          range: new monaco.Range(
            position.lineNumber,
            position.column,
            position.lineNumber,
            position.column,
          ),
          text: codeValue,
        },
      ]);

      helperEvent.focus();
    }

    setAddCodeVisible(false);
    setShowTplHelper(false);
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
                <div className="text-muted">编辑框内点击右键可以快捷插入模板标签代码</div>
              </Space>
            </div>
          </Col>
          <Col span={6}>
            <CollapseItem
              className="tpl-file-list"
              showArrow={false}
              open
              header="模板文件"
              key="1"
            >
              <Tree
                showLine={true}
                showIcon={false}
                expandedKeys={tplSelect}
                onSelect={(_, a) => {
                  if (a.node.children) {
                    let key = a.node.key;
                    let tmpItems = tplSelect.flat();
                    let index = tmpItems.indexOf(key);
                    if (index === -1) {
                      tmpItems.push(key);
                    } else {
                      tmpItems.splice(index, 1);
                    }
                    setTplSelect(tmpItems);
                    return;
                  }
                  handleEditFile('template', a.node);
                }}
                onExpand={(k) => {
                  setTplSelect(k);
                }}
                treeData={tplFiles}
              />
            </CollapseItem>
            <CollapseItem className="tpl-file-list" showArrow={false} header="资源文件" key="2">
              <Tree
                showLine={true}
                showIcon={false}
                expandedKeys={staticSelect}
                onSelect={(_, a) => {
                  if (a.node.children) {
                    let key = a.node.key;
                    let tmpItems = staticSelect.flat();
                    let index = tmpItems.indexOf(key);
                    if (index === -1) {
                      tmpItems.push(key);
                    } else {
                      tmpItems.splice(index, 1);
                    }
                    setStaticSelect(tmpItems);
                    return;
                  }
                  handleEditFile('static', a.node);
                }}
                onExpand={(k) => {
                  console.log(k);
                  setStaticSelect(k);
                }}
                treeData={staticFiles}
              />
            </CollapseItem>
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
          request={async (params) => {
            params.package = designInfo.package;
            params.path = fileInfo.path;
            return getDesignFileHistories(params);
          }}
          columnsState={{
            persistenceKey: 'design-file-history-table',
            persistenceType: 'localStorage',
          }}
          columns={columns}
          pagination={{
            showSizeChanger: true,
          }}
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
      <Modal
        open={showTplHelper}
        onCancel={() => {
          setShowTplHelper(false);
        }}
        onOk={() => {
          setShowTplHelper(false);
        }}
        width={800}
      >
        {tplHelpers?.map((item: any, index: number) => {
          return (
            <div key={index} className="design-helper">
              <h3 className="helper-header">{item.title}</h3>
              <Row gutter={16} wrap>
                {item.docs?.map((doc: any, index2: number) => (
                  <Col key={index2}>
                    {doc.docs ? (
                      <Popover
                        content={
                          <div className="helper-popover">
                            <Row gutter={16} wrap>
                              {doc.docs.map((child: any, index3: number) => (
                                <Col key={index3}>
                                  <span
                                    className="popover-item link"
                                    onClick={() => handleAddCode(child, child.link || doc.link)}
                                  >
                                    {child.title}
                                  </span>
                                </Col>
                              ))}
                            </Row>
                          </div>
                        }
                        trigger="click"
                      >
                        <span className="helper-item">{doc.title}</span>
                      </Popover>
                    ) : (
                      <span
                        className="helper-item link"
                        onClick={() => handleAddCode(doc, doc.link)}
                      >
                        {doc.title}
                      </span>
                    )}
                  </Col>
                ))}
              </Row>
            </div>
          );
        })}
      </Modal>
      <Modal
        title="代码片段"
        open={addCodeVisible}
        onCancel={() => {
          setAddCodeVisible(false);
        }}
        okText="插入"
        onOk={onSubmitAddCode}
        width={600}
      >
        {(addCode.content || addCode.link) && (
          <div className="helper-code-desc">
            {addCode.content && <span>说明：{addCode.content}</span>}
            {addCode.link && (
              <a href={addCode.link} target="_blank">
                查看文档
              </a>
            )}
          </div>
        )}
        {addCodeVisible && (
          <Input.TextArea
            placeholder="代码片段"
            rows={10}
            value={codeValue}
            onChange={(e) => setCodeValue(e.target.value)}
          />
        )}
      </Modal>
    </PageContainer>
  );
};

export default DesignEditor;
