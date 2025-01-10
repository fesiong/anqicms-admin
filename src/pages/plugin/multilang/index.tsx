import AttachmentSelect from '@/components/attachment';
import WebsiteForm from '@/pages/website/components/form';
import {
  getSubsiteAdminLoginUrl,
  pluginGetMultiLangConfig,
  pluginGetMultiLangSites,
  pluginGetMultiLangSyncStatus,
  pluginGetMultiLangValidSites,
  pluginRemoveMultiLangSite,
  pluginSaveMultiLangConfig,
  pluginSaveMultiLangSite,
  pluginSyncMultiLangSiteContent,
} from '@/services';
import { getLanguageIcon, supportLanguages } from '@/utils';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import {
  ActionType,
  ModalForm,
  PageContainer,
  ProColumns,
  ProForm,
  ProFormInstance,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProTable,
} from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import {
  Avatar,
  Button,
  Card,
  Divider,
  Image,
  Modal,
  Progress,
  Space,
  Tag,
  message,
} from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useRef, useState } from 'react';

let running = false;
let intXhr: any = null;

const PluginMultiLang: React.FC<any> = () => {
  const formRef = React.createRef<ProFormInstance>();
  const actionRef = useRef<ActionType>();
  const [limiterSetting, setLimiterSetting] = useState<any>({});
  const [fetched, setFetched] = useState<boolean>(false);
  const [currentSite, setCurrentSite] = useState<any>({});
  const [editVisible, setEditVisible] = useState<boolean>(false);
  const [addNewSiteVisible, setAddNewSiteVisible] = useState<boolean>(false);
  const [defaultSite, setDefaultSite] = useState<any>({});
  const [langOptions, setLangOptions] = useState<any[]>([]);
  const [task, setTask] = useState<any>(null);

  const intl = useIntl();

  const syncTask = async () => {
    pluginGetMultiLangSyncStatus().then((res) => {
      if (res.data) {
        running = true;
        setTask(res.data);
      } else {
        if (running) {
          running = false;
          actionRef.current?.reload();
        }
        clearInterval(intXhr);
        setTask(null);
      }
    });
  };

  const getSetting = async () => {
    const res = await pluginGetMultiLangConfig();
    let setting = res.data || {};
    // 需要转换数组成字符串
    setting.white_ips = setting.white_ips?.join('\n') || '';
    setting.black_ips = setting.black_ips?.join('\n') || '';
    setting.block_agents = setting.block_agents?.join('\n') || '';
    setting.allow_prefixes = setting.allow_prefixes?.join('\n') || '';

    setLimiterSetting(setting);
    setFetched(true);
  };

  useEffect(() => {
    getSetting();
    setLangOptions(
      supportLanguages.map((item) => {
        return {
          label: intl.formatMessage({
            id: 'content.translate.' + item.label,
          }),
          value: item.value,
        };
      }),
    );
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

  const onSubmit = async (values: any) => {
    const hide = message.loading(
      intl.formatMessage({ id: 'setting.system.submitting' }),
      0,
    );
    let setting = values;

    pluginSaveMultiLangConfig(setting)
      .then((res) => {
        message.success(res.msg);
        actionRef.current?.reloadAndRest?.();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        hide();
      });
  };

  const handleRemoveItem = (record: any) => {
    // remove site
    Modal.confirm({
      title: intl.formatMessage({
        id: 'content.multilang.remove.confirm',
      }),
      onOk: () => {
        pluginRemoveMultiLangSite(record)
          .then((res) => {
            message.success(res.msg);
            actionRef.current?.reloadAndRest?.();
          })
          .catch((err) => {
            console.log(err);
          });
      },
    });
  };

  const onSubmitSite = async (values: any) => {
    const hide = message.loading(
      intl.formatMessage({ id: 'setting.system.submitting' }),
      0,
    );

    const postData = Object.assign(currentSite, values);
    pluginSaveMultiLangSite(postData)
      .then((res) => {
        message.success(res.msg);
        setEditVisible(false);
        actionRef.current?.reloadAndRest?.();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        hide();
      });
  };

  const syncSiteData = (record: any) => {
    // sync website data
    Modal.confirm({
      title: intl.formatMessage({
        id: 'content.multilang.sync.confirm',
      }),
      onOk: () => {
        pluginSyncMultiLangSiteContent(record)
          .then((res) => {
            message.success(res.msg);
            actionRef.current?.reloadAndRest?.();
            // 马上执行一遍
            intXhr = setInterval(() => {
              syncTask();
            }, 1000);
          })
          .catch((err) => {
            console.log(err);
          });
      },
    });
  };

  const handleSearchLang = (val: string) => {
    // 如果没有匹配到，则才添加
    if (langOptions.length > supportLanguages.length) {
      langOptions.splice(langOptions.length - 1, 1);
    }
    if (
      !langOptions.find(
        (item) =>
          item.value.indexOf(val) !== -1 || item.label.indexOf(val) !== -1,
      )
    ) {
      langOptions.push({
        label: val,
        value: val,
      });
      setLangOptions([...langOptions]);
    }
  };

  const handleChangeLanguage = (val: string) => {
    currentSite.language = val;
    setCurrentSite({ ...currentSite });
  };

  const handleLoginAdmin = (record: any) => {
    getSubsiteAdminLoginUrl({ site_id: record.id }).then((res) => {
      if (res.code !== 0) {
        message.error(res.msg);
      } else {
        window.open(res.data);
      }
    });
  };

  const handleCleanLogo = () => {
    currentSite.language_icon = '';
    setCurrentSite({ ...currentSite });
  };

  const handleSelectImage = (row: any) => {
    currentSite.language_icon = row.logo;
    setCurrentSite({ ...currentSite });
  };

  const handleSelectSite = (val: any) => {
    if (val === 0) {
      setEditVisible(false);
      setAddNewSiteVisible(true);
    }
  };

  const onSubmitNewSite = async () => {
    setAddNewSiteVisible(false);
    setEditVisible(true);
  };

  const columns: ProColumns<any>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: intl.formatMessage({ id: 'content.multilang.name' }),
      dataIndex: 'name',
    },
    {
      title: intl.formatMessage({ id: 'content.multilang.domain' }),
      dataIndex: 'base_url',
    },
    {
      title: intl.formatMessage({ id: 'content.multilang.language' }),
      dataIndex: 'language',
      render: (text: any) => (
        <div>
          {intl.formatMessage({
            id:
              'content.translate.' +
              (supportLanguages.find((item) => item.value === text)?.label ||
                text),
          })}
        </div>
      ),
    },
    {
      title: intl.formatMessage({ id: 'plugin.multilang.icon' }),
      dataIndex: 'language_icon',
      render: (_, record) => (
        <div style={{ fontSize: 24 }}>
          {record.language_icon ? (
            <img src={record.language_icon} style={{ width: 30, height: 30 }} />
          ) : (
            getLanguageIcon(record.language)
          )}
        </div>
      ),
    },
    {
      title: intl.formatMessage({ id: 'content.multilang.sync-time' }),
      dataIndex: 'sync_time',
      render: (_, record) => {
        return (
          <div>
            <div>
              {record.sync_time > 0
                ? dayjs(record.sync_time * 1000).format('YYYY-MM-DD HH:mm')
                : '-'}
            </div>
          </div>
        );
      },
    },
    {
      title: intl.formatMessage({ id: 'setting.action' }),
      dataIndex: 'option',
      render: (text: any, record) => (
        <Space size={20}>
          <a
            onClick={() => {
              setCurrentSite(record);
              setEditVisible(true);
            }}
          >
            <FormattedMessage id="setting.action.edit" />
          </a>
          {!record.is_main ? (
            <>
              <a
                onClick={() => {
                  syncSiteData(record);
                }}
              >
                <FormattedMessage id="setting.multilang.sync" />
              </a>
              <a
                onClick={() => {
                  handleLoginAdmin(record);
                }}
              >
                <FormattedMessage id="setting.multilang.login" />
              </a>
              <a
                className="text-red"
                onClick={() => {
                  handleRemoveItem(record);
                }}
              >
                <FormattedMessage id="setting.system.delete" />
              </a>
            </>
          ) : (
            <Tag>
              <FormattedMessage id="content.multilang.is-main" />
            </Tag>
          )}
        </Space>
      ),
    },
  ];

  return (
    <PageContainer>
      <Card bordered={false}>
        {fetched && (
          <div className="mt-normal">
            <ProForm
              onFinish={onSubmit}
              initialValues={limiterSetting}
              formRef={formRef}
            >
              <ProFormRadio.Group
                name={'open'}
                label={intl.formatMessage({
                  id: 'plugin.multilang.open.name',
                })}
                options={[
                  {
                    label: intl.formatMessage({
                      id: 'plugin.multilang.open.false',
                    }),
                    value: false,
                  },
                  {
                    label: intl.formatMessage({
                      id: 'plugin.multilang.open.true',
                    }),
                    value: true,
                  },
                ]}
                extra={intl.formatMessage({
                  id: 'plugin.multilang.open.description',
                })}
              />
              <ProFormRadio.Group
                name="type"
                label={intl.formatMessage({
                  id: 'plugin.multilang.type',
                })}
                options={[
                  {
                    value: 'domain',
                    label: intl.formatMessage({
                      id: 'plugin.multilang.type.domain',
                    }),
                  },
                  {
                    value: 'directory',
                    label: intl.formatMessage({
                      id: 'plugin.multilang.type.direction',
                    }),
                  },
                  {
                    value: 'same',
                    label: intl.formatMessage({
                      id: 'plugin.multilang.type.same-url',
                    }),
                  },
                ]}
                extra={intl.formatMessage({
                  id: 'plugin.multilang.type.description',
                })}
              />
              <ProFormSelect
                name="default_language"
                label={intl.formatMessage({
                  id: 'plugin.multilang.default_language',
                })}
                style={{ width: '100%' }}
                options={supportLanguages.map((item) => {
                  return {
                    label: intl.formatMessage({
                      id: 'content.translate.' + item.label,
                    }),
                    value: item.value,
                  };
                })}
              />
              <ProFormRadio.Group
                name="auto_translate"
                label={intl.formatMessage({
                  id: 'plugin.multilang.auto_translate',
                })}
                options={[
                  {
                    value: false,
                    label: intl.formatMessage({
                      id: 'plugin.multilang.auto_translate.false',
                    }),
                  },
                  {
                    value: true,
                    label: intl.formatMessage({
                      id: 'plugin.multilang.auto_translate.true',
                    }),
                  },
                ]}
                extra={intl.formatMessage({
                  id: 'plugin.multilang.auto_translate.description',
                })}
              />
            </ProForm>
            <Divider>
              <FormattedMessage id="plugin.multilang.sites" />
            </Divider>
            <ProTable<any>
              rowKey="id"
              search={false}
              actionRef={actionRef}
              toolBarRender={() => [
                limiterSetting.open && (
                  <Button
                    key="add"
                    type="primary"
                    onClick={() => {
                      setCurrentSite({});
                      setEditVisible(true);
                    }}
                  >
                    <FormattedMessage id="content.multilang.add" />
                  </Button>
                ),
              ]}
              tableAlertRender={false}
              tableAlertOptionRender={false}
              request={async (params) => {
                const res = await pluginGetMultiLangSites(params);
                setDefaultSite(res.data?.[0] || {});
                return res;
              }}
              columns={columns}
              pagination={false}
            />
          </div>
        )}
      </Card>
      {editVisible && (
        <ModalForm
          width={550}
          title={intl.formatMessage({
            id: 'content.multilang.edit',
          })}
          open={editVisible}
          initialValues={currentSite}
          layout="horizontal"
          onOpenChange={(flag) => {
            setEditVisible(flag);
          }}
          onFinish={onSubmitSite}
        >
          <ProFormSelect
            label={intl.formatMessage({
              id: 'content.multilang.select',
            })}
            disabled={currentSite.is_main}
            showSearch
            name="id"
            request={async () => {
              const res = await pluginGetMultiLangValidSites({});
              const data = res.data.map((item: any) => {
                return {
                  label: item.name + '(ID:' + item.id + ')',
                  value: item.id,
                  disabled: item.parent_id > 0 || item.status !== 1,
                };
              });
              data.push({
                label: intl.formatMessage({
                  id: 'content.multilang.add',
                }),
                value: 0,
              });
              return data;
            }}
            fieldProps={{
              onSelect: handleSelectSite,
            }}
            extra={intl.formatMessage({
              id: 'content.multilang.select.description',
            })}
          />
          <ProFormSelect
            name="language"
            label={intl.formatMessage({
              id: 'plugin.multilang.language',
            })}
            disabled={currentSite.is_main}
            style={{ width: '100%' }}
            showSearch
            fieldProps={{
              onSearch: handleSearchLang,
              onChange: handleChangeLanguage,
            }}
            options={langOptions}
          />
          <ProFormText
            label={intl.formatMessage({ id: 'plugin.multilang.icon' })}
          >
            {currentSite.language_icon ? (
              <div className="ant-upload-item">
                <Image
                  preview={{
                    src: currentSite.language_icon,
                  }}
                  src={currentSite.language_icon}
                />
                <span className="delete" onClick={handleCleanLogo}>
                  <DeleteOutlined />
                </span>
              </div>
            ) : (
              <div className="ant-upload-item">
                <Avatar size={100} style={{ fontSize: 48 }}>
                  {getLanguageIcon(currentSite.language)}
                </Avatar>
              </div>
            )}
            <AttachmentSelect
              onSelect={handleSelectImage}
              open={false}
              multiple={false}
            >
              <div className="ant-upload-item">
                <div className="add">
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>
                    <FormattedMessage id="setting.system.upload" />
                  </div>
                </div>
              </div>
            </AttachmentSelect>
          </ProFormText>
        </ModalForm>
      )}
      {addNewSiteVisible && (
        <WebsiteForm
          onCancel={() => setAddNewSiteVisible(false)}
          onSubmit={onSubmitNewSite}
          open={addNewSiteVisible}
          website={{
            status: 1,
            mysql: { use_default: true },
            initialed: false,
          }}
          rootPath={defaultSite.root_path}
        />
      )}
      {task !== null && (
        <Modal
          title={intl.formatMessage({ id: 'plugin.multilang.syncing' })}
          open={true}
          footer={null}
        >
          <div className="task-progress">
            <Progress percent={task.finished ? 100 : task.percent}>
              {task.finish_count}/{task.total_count}
            </Progress>
          </div>
          <div className="task-message">{task.message}</div>
        </Modal>
      )}
    </PageContainer>
  );
};

export default PluginMultiLang;
