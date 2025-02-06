import CollapseItem from '@/components/collaspeItem';
import { getDesignTplHelpers } from '@/services';
import {
  deleteDesignHistoryFile,
  getDesignFileHistories,
  getDesignFileHistoryInfo,
  getDesignFileInfo,
  getDesignInfo,
  restoreDesignFileInfo,
  saveDesignFileInfo,
} from '@/services/design';
import {
  ActionType,
  PageContainer,
  ProColumns,
  ProTable,
} from '@ant-design/pro-components';
import { FormattedMessage, history, useIntl } from '@umijs/max';
import {
  Button,
  Card,
  Col,
  Input,
  Modal,
  Popover,
  Row,
  Space,
  Tree,
  message,
} from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useRef, useState } from 'react';
import MonacoEditor, { monaco } from 'react-monaco-editor';
import TemplateCompare from './components/compare';
import './index.less';

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
  const intl = useIntl();

  let unsave = false;

  const fetchDesignFileInfo = async (path: any) => {
    const searchParams = new URLSearchParams(window.location.search);
    const packageName = searchParams.get('package') || '';
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
        message.error(intl.formatMessage({ id: 'design.editor.get.error' }));
      });
  };

  const fetchDesignInfo = async () => {
    const searchParams = new URLSearchParams(window.location.search);
    const packageName = searchParams.get('package') || '';
    getDesignInfo({
      package: packageName,
    })
      .then((res) => {
        setDesignInfo(res.data);

        let path = searchParams.get('path') || '';
        let type = searchParams.get('type') || '';
        fileType = type + '';

        if (path === '' && res.data.tpl_files?.length > 0) {
          type = 'template';
          path = res.data.tpl_files[0].path;
        }
        let tpls: any[] = [];
        // eslint-disable-next-line guard-for-in
        for (let i in res.data.tpl_files) {
          let filePath = res.data.tpl_files[i].path;
          let remark = res.data.tpl_files[i].remark;
          let parts = filePath.split('/');
          if (parts.length > 1) {
            let firstLevelKey = parts[0];
            let secondLevelKey =
              parts.length > 2 ? parts[0] + '/' + parts[1] : null;
            let firstLevelNode = tpls.find(
              (item) => item.key === firstLevelKey,
            );
            if (!firstLevelNode) {
              firstLevelNode = {
                key: firstLevelKey,
                title: firstLevelKey,
                children: [],
              };
              tpls.push(firstLevelNode);
            }
            if (secondLevelKey && parts.length > 2) {
              let secondLevelNode = firstLevelNode.children.find(
                (item: any) => item.key === secondLevelKey,
              );

              if (!secondLevelNode) {
                secondLevelNode = {
                  key: secondLevelKey,
                  title: parts[1],
                  children: [],
                };
                firstLevelNode.children.push(secondLevelNode);
              }
              secondLevelNode.children.push({
                key: filePath,
                path: filePath,
                remark: remark,
                title: (
                  <div>
                    <div className="name">{parts.slice(2).join('/')}</div>
                    <div className="extra">{remark}</div>
                  </div>
                ),
              });
            } else {
              firstLevelNode.children.push({
                key: filePath,
                path: filePath,
                remark: remark,
                title: (
                  <div>
                    <div className="name">{parts.slice(1).join('/')}</div>
                    <div className="extra">{remark}</div>
                  </div>
                ),
              });
            }
          } else {
            tpls.push({
              path: filePath,
              remark: remark,
              title: (
                <div>
                  <div className="name">{filePath}</div>
                  <div className="extra">{remark}</div>
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
            let filePath = res.data.static_files[i].path;
            let remark = res.data.static_files[i].remark;
            let parts = filePath.split('/');
            if (parts.length > 1) {
              let firstLevelKey = parts[0];
              let secondLevelKey =
                parts.length > 2 ? parts[0] + '/' + parts[1] : null;
              let firstLevelNode = statics.find(
                (item) => item.key === firstLevelKey,
              );
              if (!firstLevelNode) {
                firstLevelNode = {
                  key: firstLevelKey,
                  title: firstLevelKey,
                  children: [],
                };
                statics.push(firstLevelNode);
              }
              if (secondLevelKey && parts.length > 2) {
                let secondLevelNode = firstLevelNode.children.find(
                  (item: any) => item.key === secondLevelKey,
                );

                if (!secondLevelNode) {
                  secondLevelNode = {
                    key: secondLevelKey,
                    title: parts[1],
                    children: [],
                  };
                  firstLevelNode.children.push(secondLevelNode);
                }
                secondLevelNode.children.push({
                  key: filePath,
                  path: filePath,
                  remark: remark,
                  title: (
                    <div>
                      <div className="name">{parts.slice(2).join('/')}</div>
                      <div className="extra">{remark}</div>
                    </div>
                  ),
                });
              } else {
                firstLevelNode.children.push({
                  key: filePath,
                  path: filePath,
                  remark: remark,
                  title: (
                    <div>
                      <div className="name">{parts.slice(1).join('/')}</div>
                      <div className="extra">{remark}</div>
                    </div>
                  ),
                });
              }
            } else {
              statics.push({
                path: filePath,
                remark: remark,
                title: (
                  <div>
                    <div className="name">{filePath}</div>
                    <div className="extra">{remark}</div>
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
        message.error(intl.formatMessage({ id: 'design.editor.get.error' }));
      });
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

  useEffect(() => {
    fetchDesignInfo();
    getHeight();
    window.addEventListener('resize', getHeight);
    return () => {
      // 组件销毁时移除监听事件
      window.removeEventListener('resize', getHeight);
    };
  }, []);

  const getTplHelpers = () => {
    if (!tplHelpers) {
      getDesignTplHelpers().then((res: any) => {
        setTplHelpers(res.data || null);
      });
    }
  };

  const editorDidMount = (editor: any) => {
    editor.createContextKey('showTplHelperAction', true);
    editor.addAction({
      // id
      id: 'tpl-helper',
      // 该菜单键显示文本
      label: intl.formatMessage({ id: 'design.editor.helper' }),
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

  const onChangeCode = (newCode: string) => {
    if (code !== newCode) {
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
    const hide = message.loading(
      intl.formatMessage({ id: 'setting.system.submitting' }),
      0,
    );
    saveDesignFileInfo(fileInfo)
      .then((res) => {
        message.info(res.msg);
        actionRef.current?.reload();
      })
      .finally(() => {
        hide();
      });
  };

  const scrollToTop = () => {
    window.scrollTo(window.pageXOffset, 0);
  };

  const handleEditFile = (type: string, info: any) => {
    if (unsave) {
      Modal.confirm({
        title: intl.formatMessage({ id: 'design.editor.confirm-giveup' }),
        content: intl.formatMessage({
          id: 'design.editor.confirm-giveup.content',
        }),
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
      title: intl.formatMessage({ id: 'design.editor.confirm-restore' }),
      content: intl.formatMessage({
        id: 'design.editor.confirm-restore.content',
      }),
      onOk: () => {
        const hide = message.loading(
          intl.formatMessage({ id: 'setting.system.submitting' }),
          0,
        );
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
      title: intl.formatMessage({ id: 'design.editor.history.confirm-delete' }),
      onOk: () => {
        const hide = message.loading(
          intl.formatMessage({ id: 'setting.system.submitting' }),
          0,
        );
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
        title: intl.formatMessage({ id: 'design.editor.confirm-goback' }),
        content: intl.formatMessage({
          id: 'design.editor.confirm-giveup.content',
        }),
        onOk: () => {
          history.back();
        },
      });
    } else {
      history.back();
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
      : filePath.indexOf('.yml') !== -1
      ? 'yaml'
      : 'javascript';
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
      title: intl.formatMessage({ id: 'design.size' }),
      dataIndex: 'size',
      render: (text: any) => <div>{getSize(text)}</div>,
    },
    {
      title: intl.formatMessage({ id: 'design.update-time' }),
      dataIndex: 'last_mod',
      render: (text: any) =>
        dayjs((text as number) * 1000).format('YYYY-MM-DD HH:mm'),
    },
    {
      title: intl.formatMessage({ id: 'setting.action' }),
      key: 'action',
      width: 110,
      render: (_: any, record: any) => (
        <Space size={12}>
          <Button
            type="link"
            onClick={() => {
              handleCompare(record);
            }}
          >
            <FormattedMessage id="design.compare" />
          </Button>
          <Button
            type="link"
            onClick={() => {
              handleRestore(record);
            }}
          >
            <FormattedMessage id="design.restore" />
          </Button>
          <Button
            danger
            type="link"
            onClick={() => {
              deleteHistoryFile(record);
            }}
          >
            <FormattedMessage id="setting.system.delete" />
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <PageContainer
      title={
        <div>
          <FormattedMessage id="design.editing" />: {fileInfo?.path}
        </div>
      }
    >
      <Card className="design-editor-card">
        <Row gutter={16}>
          <Col sm={18} xs={24}>
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
                  <FormattedMessage id="design.save" />
                </Button>
                <Button onClick={handleGoBack}>
                  <FormattedMessage id="design.back" />
                </Button>
                <Button
                  onClick={() => {
                    setShowHistory(true);
                  }}
                >
                  <FormattedMessage id="design.history.view" />
                </Button>
                <div className="text-muted">
                  <FormattedMessage id="design.editor.tips" />
                </div>
              </Space>
            </div>
          </Col>
          <Col sm={6} xs={24}>
            <CollapseItem
              className="tpl-file-list"
              showArrow={false}
              open
              header={intl.formatMessage({ id: 'design.tempalte.name' })}
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
            <CollapseItem
              className="tpl-file-list"
              showArrow={false}
              header={intl.formatMessage({ id: 'design.static.name' })}
              key="2"
            >
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
        title={intl.formatMessage({ id: 'design.history.name' })}
        open={showHistory}
        onCancel={() => {
          setShowHistory(false);
        }}
        onOk={() => {
          setShowHistory(false);
        }}
        width={800}
      >
        <ProTable<any>
          headerTitle={intl.formatMessage({ id: 'design.manage.name' })}
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
          open={showDiff}
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
                                    onClick={() =>
                                      handleAddCode(
                                        child,
                                        child.link || doc.link,
                                      )
                                    }
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
        title={intl.formatMessage({ id: 'design.segment.name' })}
        open={addCodeVisible}
        onCancel={() => {
          setAddCodeVisible(false);
        }}
        okText={intl.formatMessage({ id: 'design.insert' })}
        onOk={onSubmitAddCode}
        width={600}
      >
        {(addCode.content || addCode.link) && (
          <div className="helper-code-desc">
            {addCode.content && (
              <span>
                <FormattedMessage id="design.explain" />: {addCode.content}
              </span>
            )}
            {addCode.link && (
              <a href={addCode.link} target="_blank" rel="noreferrer">
                <FormattedMessage id="design.view-doc" />
              </a>
            )}
          </div>
        )}
        {addCodeVisible && (
          <Input.TextArea
            placeholder={intl.formatMessage({ id: 'design.segment.name' })}
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
