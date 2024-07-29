import ReplaceKeywords from '@/components/replaceKeywords';
import {
  anqiAiPseudoArchive,
  anqiTranslateArchive,
  deleteArchive,
  getArchives,
  getModules,
  getSettingContent,
  updateArchivesCategory,
  updateArchivesFlag,
  updateArchivesReleasePlan,
  updateArchivesSort,
  updateArchivesStatus,
  updateArchivesTime,
} from '@/services';
import { getCategories } from '@/services/category';
import { PlusOutlined } from '@ant-design/icons';
import {
  ActionType,
  ModalForm,
  PageContainer,
  ProColumnType,
  ProColumns,
  ProFormCheckbox,
  ProFormInstance,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProTable,
} from '@ant-design/pro-components';
import { FormattedMessage, history, useIntl } from '@umijs/max';
import { Alert, Button, Dropdown, Input, Menu, Modal, Select, Space, Tag, message } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useRef, useState } from 'react';
import './index.less';
import QuickEditForm from './quickEdit';

let toLanguage = '';
let updating = false;

let lastParams: any = {
  module_id: 0,
  category_id: 0,
  status: 'ok',
  flag: '',
};

const ArchiveList: React.FC = (props) => {
  const actionRef = useRef<ActionType>();
  const formRef = useRef<ProFormInstance>();
  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([]);
  const [replaceVisible, setReplaceVisible] = useState<boolean>(false);
  const [flagVisible, setFlagVisible] = useState<boolean>(false);
  const [statusVisible, setStatusVisible] = useState<boolean>(false);
  const [categoryVisible, setCategoryVisible] = useState<boolean>(false);
  const [timeVisible, setTimeVisible] = useState<boolean>(false);
  const [releaseVisible, setReleaseVisible] = useState<boolean>(false);
  const [modules, setModules] = useState<any[]>([]);
  const [moduleId, setModuleId] = useState<number>(0);
  const [contentSetting, setContentSetting] = useState<any>({});
  const [currentArchive, setCurrentArchive] = useState<any>({});
  const [quickVisible, setQuickVisible] = useState<boolean>(false);
  const [firstFetch, setFirstFetch] = useState<boolean>(false);
  const intl = useIntl();

  const flagEnum: any = {
    h: intl.formatMessage({ id: 'content.flag.h' }),
    c: intl.formatMessage({ id: 'content.flag.c' }),
    f: intl.formatMessage({ id: 'content.flag.f' }),
    a: intl.formatMessage({ id: 'content.flag.a' }),
    s: intl.formatMessage({ id: 'content.flag.s' }),
    b: intl.formatMessage({ id: 'content.flag.b' }),
    p: intl.formatMessage({ id: 'content.flag.p' }),
    j: intl.formatMessage({ id: 'content.flag.j' }),
  };

  useEffect(() => {
    setModuleId(lastParams.module_id);
    loadModules();
    loadContentSetting();
  }, []);

  const loadContentSetting = () => {
    getSettingContent()
      .then((res) => {
        setContentSetting(res?.data || {});
      })
      .catch();
  };

  const loadModules = async () => {
    let res = await getModules({});
    setModules(
      [{ title: intl.formatMessage({ id: 'content.archive.all' }), id: 0 }].concat(res.data || []),
    );
  };

  const beforeSearch = (params: any) => {
    if (!firstFetch) {
      setFirstFetch(true);
      const searchParams = new URLSearchParams(window.location.search);
      lastParams.module_id = Number(searchParams.get('module_id') || 0);
      lastParams.category_id = Number(searchParams.get('category_id') || 0);
      lastParams.status = searchParams.get('status') || 'ok';
      formRef.current?.setFieldsValue(lastParams);
      params = lastParams;
    } else {
      lastParams = params;
      if (params.module_id != moduleId) {
        onSelectModule(params.module_id);
      }
    }

    return params;
  };

  const onSelectModule = (id: number) => {
    lastParams.module_id = id;
    setModuleId(id);
    formRef.current?.setFieldsValue({
      module_id: id,
      category_id: 0,
    });
    history.replace('/archive/list?module_id=' + id);
    formRef.current?.submit();
  };

  const handleRemove = async (selectedRowKeys: any[]) => {
    Modal.confirm({
      title: intl.formatMessage({ id: 'content.delete.confirm' }),
      onOk: async () => {
        const hide = message.loading(intl.formatMessage({ id: 'content.delete.deletting' }), 0);
        if (!selectedRowKeys) return true;
        try {
          for (let item of selectedRowKeys) {
            await deleteArchive({
              id: item,
            });
          }
          hide();
          message.success(intl.formatMessage({ id: 'content.delete.success' }));
          setSelectedRowKeys([]);
          actionRef.current?.reloadAndRest?.();

          return true;
        } catch (error) {
          hide();
          message.error(intl.formatMessage({ id: 'content.delete.failure' }));
          return true;
        }
      },
    });
  };

  const handleSetFlag = async (values: any) => {
    const hide = message.loading(intl.formatMessage({ id: 'setting.system.submitting' }), 0);
    updateArchivesFlag({
      flag: values.flag.join(','),
      ids: selectedRowKeys,
    })
      .then((res) => {
        message.success(res.msg);
        setFlagVisible(false);
        setSelectedRowKeys([]);
        actionRef.current?.reload?.();
      })
      .finally(() => {
        hide();
      });
  };

  const handleSetStatus = async (values: any) => {
    const hide = message.loading(intl.formatMessage({ id: 'setting.system.submitting' }), 0);
    updateArchivesStatus({
      status: Number(values.status),
      ids: selectedRowKeys,
    })
      .then((res) => {
        message.success(res.msg);
        setStatusVisible(false);
        setSelectedRowKeys([]);
        actionRef.current?.reloadAndRest?.();
      })
      .finally(() => {
        hide();
      });
  };

  const handleSetTime = async (values: any) => {
    const hide = message.loading(intl.formatMessage({ id: 'setting.system.submitting' }), 0);
    updateArchivesTime({
      time: Number(values.time),
      ids: selectedRowKeys,
    })
      .then((res) => {
        message.success(res.msg);
        setTimeVisible(false);
        setSelectedRowKeys([]);
        actionRef.current?.reloadAndRest?.();
      })
      .finally(() => {
        hide();
      });
  };

  const handleSetCategory = async (values: any) => {
    let categoryIds = [];
    let categoryId = 0;
    if (typeof values.category_ids == 'number') {
      // 单分类
      categoryId = Number(values.category_ids);
    } else {
      for (let i in values.category_ids) {
        if (values.category_ids[i] > 0) {
          categoryIds.push(values.category_ids[i]);
        }
      }
      if (categoryIds.length > 0) {
        categoryId = categoryIds[0];
      }
    }
    if (categoryId == 0) {
      message.error(intl.formatMessage({ id: 'content.category.required' }));
      return;
    }
    const hide = message.loading(intl.formatMessage({ id: 'setting.system.submitting' }), 0);
    updateArchivesCategory({
      category_id: categoryId,
      category_ids: categoryIds,
      ids: selectedRowKeys,
    })
      .then((res) => {
        message.success(res.msg);
        setCategoryVisible(false);
        setSelectedRowKeys([]);
        actionRef.current?.reload?.();
      })
      .finally(() => {
        hide();
      });
  };

  const handleEditArchive = async (record: any) => {
    history.push('/archive/detail?id=' + record.id);
  };

  const handleCopyArchive = async (record: any) => {
    history.push('/archive/detail?copyid=' + record.id);
  };

  const handleTranslateArchive = async (record: any) => {
    Modal.confirm({
      title: intl.formatMessage({ id: 'content.translate.confirm' }),
      content: (
        <div>
          <Alert
            className="mb-normal"
            message={intl.formatMessage({ id: 'content.translate.tips' })}
          ></Alert>
          <div className="">{intl.formatMessage({ id: 'content.translate.select-language' })}</div>
          <Select
            style={{ width: '100%' }}
            onChange={(e) => {
              toLanguage = e;
            }}
            options={[
              {
                label: intl.formatMessage({ id: 'content.translate.select' }),
                value: '',
                disabled: true,
              },
              { label: intl.formatMessage({ id: 'content.translate.en' }), value: 'en' },
              { label: intl.formatMessage({ id: 'content.translate.zh-cn' }), value: 'zh-CN' },
              { label: intl.formatMessage({ id: 'content.translate.zh-tw' }), value: 'zh-TW' },
              { label: intl.formatMessage({ id: 'content.translate.vi' }), value: 'vi' },
              { label: intl.formatMessage({ id: 'content.translate.id' }), value: 'id' },
              { label: intl.formatMessage({ id: 'content.translate.hi' }), value: 'hi' },
              { label: intl.formatMessage({ id: 'content.translate.it' }), value: 'it' },
              { label: intl.formatMessage({ id: 'content.translate.el' }), value: 'el' },
              { label: intl.formatMessage({ id: 'content.translate.es' }), value: 'es' },
              { label: intl.formatMessage({ id: 'content.translate.pt' }), value: 'pt' },
              { label: intl.formatMessage({ id: 'content.translate.sr' }), value: 'sr' },
              { label: intl.formatMessage({ id: 'content.translate.my' }), value: 'my' },
              { label: intl.formatMessage({ id: 'content.translate.bn' }), value: 'bn' },
              { label: intl.formatMessage({ id: 'content.translate.th' }), value: 'th' },
              { label: intl.formatMessage({ id: 'content.translate.tr' }), value: 'tr' },
              { label: intl.formatMessage({ id: 'content.translate.ja' }), value: 'ja' },
              { label: intl.formatMessage({ id: 'content.translate.lo' }), value: 'lo' },
              { label: intl.formatMessage({ id: 'content.translate.ko' }), value: 'ko' },
              { label: intl.formatMessage({ id: 'content.translate.ru' }), value: 'ru' },
              { label: intl.formatMessage({ id: 'content.translate.fr' }), value: 'fr' },
              { label: intl.formatMessage({ id: 'content.translate.de' }), value: 'de' },
              { label: intl.formatMessage({ id: 'content.translate.fa' }), value: 'fa' },
              { label: intl.formatMessage({ id: 'content.translate.ar' }), value: 'ar' },
              { label: intl.formatMessage({ id: 'content.translate.ms' }), value: 'ms' },
            ]}
          />
        </div>
      ),
      onOk: async () => {
        const hide = message.loading(
          intl.formatMessage({ id: 'content.translate.translating' }),
          0,
        );
        anqiTranslateArchive({
          id: record.id,
          to_language: toLanguage,
        })
          .then((res) => {
            if (res.code === 0) {
              actionRef.current?.reload?.();
            }
            message.info(res.msg);
          })
          .finally(() => {
            hide();
          });
      },
    });
  };

  const handleAiPseudoArchive = async (record: any) => {
    Modal.confirm({
      title: intl.formatMessage({ id: 'content.pseudo.confirm' }),
      content: intl.formatMessage({ id: 'content.pseudo.content' }),
      onOk: async () => {
        const hide = message.loading(intl.formatMessage({ id: 'setting.system.submitting' }), 0);
        anqiAiPseudoArchive({
          id: record.id,
        })
          .then((res) => {
            if (res.code === 0) {
              actionRef.current?.reload?.();
            }
            message.info(res.msg);
          })
          .finally(() => {
            hide();
          });
      },
    });
  };

  const parseFlag = (flag: string) => {
    let flags = flag.split(',');
    return (
      <span>
        {flags.map((f) => (
          <Tag key={f}>{flagEnum[f] || f}</Tag>
        ))}
      </span>
    );
  };

  const updateSort = (index: number, record: any, value: any) => {
    if (updating) {
      return;
    }
    value = parseInt(value);
    if (isNaN(value)) {
      message.error(intl.formatMessage({ id: 'content.sort.required' }));
      return;
    }
    if (value == record.sort) {
      return;
    }
    if (value < 0) {
      message.error(intl.formatMessage({ id: 'content.sort.required' }));
      return;
    }
    updating = true;
    updateArchivesSort({
      sort: value,
      id: record.id,
    })
      .then((res) => {
        message.success(res.msg);
        actionRef.current?.reload?.();
      })
      .finally(() => {
        updating = false;
      });
  };

  const handleSetReleasePlan = async (values: any) => {
    if (updating) {
      return;
    }
    updating = true;
    const hide = message.loading(intl.formatMessage({ id: 'setting.system.submitting' }), 0);
    updateArchivesReleasePlan({
      daily_limit: Number(values.daily_limit),
      start_hour: Number(values.start_hour),
      end_hour: Number(values.end_hour),
      ids: selectedRowKeys,
    })
      .then((res) => {
        message.success(res.msg);
        setReleaseVisible(false);
        setSelectedRowKeys([]);
        actionRef.current?.reloadAndRest?.();
      })
      .finally(() => {
        hide();
        updating = false;
      });
  };

  const handleQuickEdit = (record: any) => {
    setCurrentArchive(record);
    setQuickVisible(true);
  };

  const sortColumn: ProColumnType = {
    title: intl.formatMessage({ id: 'content.sort.name' }),
    dataIndex: 'sort',
    hideInSearch: true,
    sorter: true,
    tooltip: intl.formatMessage({ id: 'content.sort.tips' }),
    width: 90,
    render: (_, entity: any, index) => {
      return (
        <div>
          <Input
            onBlur={(e: any) => {
              updateSort(index, entity, e.target.value);
            }}
            onPressEnter={(e: any) => {
              updateSort(index, entity, e.target?.value);
            }}
            defaultValue={entity.sort}
          ></Input>
        </div>
      );
    },
  };

  const columns: ProColumns<any>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      hideInSearch: true,
      sorter: true,
    },
    {
      title: intl.formatMessage({ id: 'content.title.name' }),
      dataIndex: 'title',
      render: (dom, entity) => {
        return (
          <div style={{ maxWidth: 400 }}>
            <a href={entity.link} target="_blank">
              {dom} {entity.flag && parseFlag(entity.flag)}
            </a>
          </div>
        );
      },
    },
    {
      title: 'thumb',
      dataIndex: 'thumb',
      hideInSearch: true,
      width: 70,
      render: (text, record) => {
        return text ? <img src={record.thumb} className="list-thumb" /> : null;
      },
    },
    {
      title: intl.formatMessage({ id: 'content.module.name' }),
      dataIndex: 'module_id',
      render: (_: any, entity) => {
        return entity.module_name;
      },
      renderFormItem: () => {
        return (
          <ProFormSelect
            name="module_id"
            request={async () => {
              let res = await getModules({});
              const tmpModules = [
                { title: intl.formatMessage({ id: 'content.archive.all' }), id: 0 },
              ]
                .concat(res.data || [])
                .map((item: any) => ({
                  label: item.title,
                  value: item.id,
                }));
              return tmpModules;
            }}
          />
        );
      },
    },
    {
      title: intl.formatMessage({ id: 'content.category.name' }),
      dataIndex: 'category_titles',
      render: (_: any, entity) => {
        return (
          <div>
            {entity.category_titles?.map((item: string) => (
              <div>{item}</div>
            ))}
          </div>
        );
      },
      renderFormItem: (_, { fieldProps }) => {
        return (
          <ProFormSelect
            name="category_id"
            request={async () => {
              let res = await getCategories({ type: 1 });
              const categories = [
                {
                  spacer: '',
                  title: intl.formatMessage({ id: 'content.category.all' }),
                  id: 0,
                  status: 1,
                },
              ]
                .concat(res.data || [])
                .map((cat: any) => ({
                  spacer: cat.spacer,
                  label:
                    cat.title +
                    (cat.status == 1 ? '' : intl.formatMessage({ id: 'setting.nav.hide' })),
                  value: cat.id,
                }));
              return categories;
            }}
            fieldProps={{
              ...fieldProps,
              optionItemRender(item: any) {
                return <div dangerouslySetInnerHTML={{ __html: item.spacer + item.label }}></div>;
              },
            }}
          />
        );
      },
    },
    {
      title: intl.formatMessage({ id: 'content.views.name' }),
      dataIndex: 'views',
      hideInSearch: true,
      sorter: true,
    },
    {
      title: 'Flag',
      dataIndex: 'flag',
      hideInTable: true,
      renderFormItem: () => {
        return (
          <ProFormSelect
            name="flag"
            valueEnum={Object.assign(
              { '': intl.formatMessage({ id: 'content.unlimit' }) },
              flagEnum,
            )}
          />
        );
      },
    },
    {
      title: intl.formatMessage({ id: 'website.status' }),
      dataIndex: 'status',
      valueEnum: {
        0: {
          text: intl.formatMessage({ id: 'content.status.draft' }),
          status: 'Default',
        },
        1: {
          text: intl.formatMessage({ id: 'content.status.normal' }),
          status: 'Success',
        },
        2: {
          text: intl.formatMessage({ id: 'content.status.plan' }),
          status: 'Warning',
        },
      },
      renderFormItem: () => {
        return (
          <ProFormRadio.Group
            name="status"
            options={[
              { label: intl.formatMessage({ id: 'content.status.normal' }), value: 'ok' },
              { label: intl.formatMessage({ id: 'content.status.draft' }), value: 'draft' },
              { label: intl.formatMessage({ id: 'content.status.plan' }), value: 'plan' },
            ]}
          />
        );
      },
    },
    {
      title: intl.formatMessage({ id: 'content.create-update-time' }),
      hideInSearch: true,
      dataIndex: 'created_time',
      render: (_, record) => {
        return (
          <div>
            <div>{dayjs(record.created_time * 1000).format('YYYY-MM-DD HH:mm')}</div>
            <div>{dayjs(record.updated_time * 1000).format('YYYY-MM-DD HH:mm')}</div>
          </div>
        );
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
              handleEditArchive(record);
            }}
          >
            <FormattedMessage id="setting.action.edit" />
          </a>
          <a onClick={() => handleQuickEdit(record)}>
            <FormattedMessage id="content.action.quick-edit" />
          </a>

          <Dropdown
            overlay={
              <Menu>
                <Menu.Item>
                  <a
                    onClick={() => {
                      handleTranslateArchive(record);
                    }}
                    title={intl.formatMessage({ id: 'content.action.translate.tips' })}
                  >
                    <FormattedMessage id="content.action.translate" />
                  </a>
                </Menu.Item>
                <Menu.Item>
                  <a
                    onClick={() => {
                      handleAiPseudoArchive(record);
                    }}
                    title={intl.formatMessage({ id: 'content.action.aipseudo.tips' })}
                  >
                    <FormattedMessage id="content.action.aipseudo" />
                  </a>
                </Menu.Item>
                <Menu.Item>
                  <a
                    onClick={() => {
                      handleCopyArchive(record);
                    }}
                    title={intl.formatMessage({ id: 'content.action.copy.tips' })}
                  >
                    <FormattedMessage id="content.action.copy" />
                  </a>
                </Menu.Item>
                <Menu.Item danger>
                  <a
                    className="text-red"
                    onClick={async () => {
                      await handleRemove([record.id]);
                    }}
                  >
                    <FormattedMessage id="setting.system.delete" />
                  </a>
                </Menu.Item>
              </Menu>
            }
            key="more"
          >
            <a>
              <FormattedMessage id="content.action.more" />
            </a>
          </Dropdown>
        </Space>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable<any>
        headerTitle={
          <div className="module-tags">
            {modules.map((item: any) => (
              <div
                className={'module-tag ' + (item.id == moduleId ? 'active' : '')}
                key={item.id}
                onClick={() => {
                  onSelectModule(item.id);
                }}
              >
                {item.title}
              </div>
            ))}
          </div>
        }
        actionRef={actionRef}
        rowKey="id"
        search={{
          span: { xs: 24, sm: 12, md: 8, lg: 8, xl: 8, xxl: 8 },
          defaultCollapsed: false,
        }}
        formRef={formRef}
        form={{
          initialValues: lastParams,
        }}
        beforeSearchSubmit={beforeSearch}
        toolBarRender={() => [
          <Button
            key="recycle"
            onClick={() => {
              history.push('/archive/recycle');
            }}
          >
            <FormattedMessage id="content.recycle.name" />
          </Button>,
          <Button
            key="replace"
            onClick={() => {
              setReplaceVisible(true);
            }}
          >
            <FormattedMessage id="content.replace.name" />
          </Button>,
          <Button
            type="primary"
            key="add"
            onClick={() => {
              if (moduleId > 0) {
                history.push('/archive/detail?module_id=' + moduleId);
              } else {
                history.push('/archive/detail');
              }
            }}
          >
            <PlusOutlined /> <FormattedMessage id="content.archive.add" />
          </Button>,
        ]}
        columnsState={{
          persistenceKey: 'archive-table',
          persistenceType: 'localStorage',
        }}
        tableAlertOptionRender={({ selectedRowKeys, onCleanSelected }) => (
          <Space>
            <Button
              size={'small'}
              onClick={async () => {
                await setFlagVisible(true);
              }}
            >
              <FormattedMessage id="content.option.change-flag" />
            </Button>
            <Button
              size={'small'}
              onClick={async () => {
                await setCategoryVisible(true);
              }}
            >
              <FormattedMessage id="content.option.change-category" />
            </Button>
            <Button
              size={'small'}
              onClick={async () => {
                await setTimeVisible(true);
              }}
            >
              <FormattedMessage id="content.option.reflash-time" />
            </Button>
            <Button
              size={'small'}
              onClick={async () => {
                await setStatusVisible(true);
              }}
            >
              <FormattedMessage id="content.option.update-status" />
            </Button>
            <Button
              size={'small'}
              onClick={async () => {
                await setReleaseVisible(true);
              }}
            >
              <FormattedMessage id="content.option.plan-send" />
            </Button>
            <Button
              size={'small'}
              onClick={async () => {
                await handleRemove(selectedRowKeys);
              }}
            >
              <FormattedMessage id="content.option.batch-delete" />
            </Button>
            <Button type="link" size={'small'} onClick={onCleanSelected}>
              <FormattedMessage id="content.option.cancel-selec" />
            </Button>
          </Space>
        )}
        request={(params, sort) => {
          for (let i in sort) {
            params.sort = i;
            params.order = sort[i] == 'ascend' ? 'asc' : 'desc';
          }
          lastParams = params;
          return getArchives(params);
        }}
        columns={contentSetting.use_sort ? (columns.splice(1, 0, sortColumn), columns) : columns}
        rowSelection={{
          preserveSelectedRowKeys: true,
          onChange: (selectedRowKeys) => {
            setSelectedRowKeys(selectedRowKeys);
          },
        }}
        pagination={{
          showSizeChanger: true,
          defaultCurrent: lastParams.current,
          defaultPageSize: lastParams.pageSize,
        }}
      />
      {replaceVisible && (
        <ReplaceKeywords
          open={replaceVisible}
          onCancel={() => {
            setReplaceVisible(false);
          }}
        />
      )}
      {flagVisible && (
        <ModalForm
          width={480}
          title={intl.formatMessage({ id: 'content.flag.select' })}
          open={flagVisible}
          onFinish={handleSetFlag}
          onOpenChange={(e) => setFlagVisible(e)}
        >
          <ProFormCheckbox.Group
            name="flag"
            valueEnum={{
              h: intl.formatMessage({ id: 'content.flag.h' }),
              c: intl.formatMessage({ id: 'content.flag.c' }),
              f: intl.formatMessage({ id: 'content.flag.f' }),
              a: intl.formatMessage({ id: 'content.flag.a' }),
              s: intl.formatMessage({ id: 'content.flag.s' }),
              b: intl.formatMessage({ id: 'content.flag.b' }),
              p: intl.formatMessage({ id: 'content.flag.p' }),
              j: intl.formatMessage({ id: 'content.flag.j' }),
            }}
          />
        </ModalForm>
      )}
      {statusVisible && (
        <ModalForm
          width={480}
          title={intl.formatMessage({ id: 'content.status.select' })}
          open={statusVisible}
          onFinish={handleSetStatus}
          onOpenChange={(e) => setStatusVisible(e)}
        >
          <ProFormRadio.Group
            name="status"
            valueEnum={{
              0: intl.formatMessage({ id: 'content.status.draft' }),
              1: intl.formatMessage({ id: 'content.status.normal' }),
            }}
          />
        </ModalForm>
      )}
      {timeVisible && (
        <ModalForm
          width={480}
          title={intl.formatMessage({ id: 'content.time.select' })}
          open={timeVisible}
          onFinish={handleSetTime}
          onOpenChange={(e) => setTimeVisible(e)}
        >
          <ProFormRadio.Group
            name="time"
            initialValue={1}
            valueEnum={{
              1: intl.formatMessage({ id: 'content.time.create-time' }),
              2: intl.formatMessage({ id: 'content.time.update-time' }),
              3: intl.formatMessage({ id: 'content.time.create-time-all' }),
              4: intl.formatMessage({ id: 'content.time.update-time-all' }),
            }}
          />
        </ModalForm>
      )}
      {categoryVisible && (
        <ModalForm
          width={480}
          title={intl.formatMessage({ id: 'content.category.select' })}
          open={categoryVisible}
          onFinish={handleSetCategory}
          onOpenChange={(e) => setCategoryVisible(e)}
        >
          <ProFormSelect
            name="category_ids"
            request={async () => {
              let res = await getCategories({ type: 1 });
              return [
                { spacer: '', title: intl.formatMessage({ id: 'content.please-select' }), id: 0 },
              ].concat(res.data || []);
            }}
            fieldProps={{
              mode: contentSetting.multi_category == 1 ? 'multiple' : undefined,
              fieldNames: {
                label: 'title',
                value: 'id',
              },
              optionItemRender(item: any) {
                return <div dangerouslySetInnerHTML={{ __html: item.spacer + item.title }}></div>;
              },
            }}
          />
        </ModalForm>
      )}
      {releaseVisible && (
        <ModalForm
          width={480}
          title={intl.formatMessage({ id: 'content.plan.name' })}
          open={releaseVisible}
          onFinish={handleSetReleasePlan}
          onOpenChange={(e) => setReleaseVisible(e)}
        >
          <Alert
            className="mb-normal"
            message={
              <div>
                <div>
                  <FormattedMessage id="content.plan.tips" />
                </div>
                <div>
                  <FormattedMessage id="content.plan.tips.before" />{' '}
                  <span className="text-red">{selectedRowKeys.length}</span>{' '}
                  <FormattedMessage id="content.plan.tips.after" />
                </div>
              </div>
            }
          ></Alert>
          <ProFormText
            name="daily_limit"
            label={intl.formatMessage({ id: 'content.plan.daily-limit' })}
            placeholder={intl.formatMessage({ id: 'content.plan.daily-limit.placeholder' })}
            addonAfter={intl.formatMessage({ id: 'content.plan.daily-limit.suffix' })}
          />
          <ProFormText
            name="start_hour"
            initialValue={8}
            label={intl.formatMessage({ id: 'content.plan.start-hour' })}
            placeholder={intl.formatMessage({ id: 'content.plan.start-hour.placeholder' })}
            addonAfter={intl.formatMessage({ id: 'content.plan.start-hour.suffix' })}
          />
          <ProFormText
            name="end_hour"
            initialValue={20}
            label={intl.formatMessage({ id: 'content.plan.end-hour' })}
            placeholder={intl.formatMessage({ id: 'content.plan.end-hour.placeholder' })}
            addonAfter={intl.formatMessage({ id: 'content.plan.start-hour.suffix' })}
          />
        </ModalForm>
      )}
      {quickVisible && (
        <QuickEditForm
          archive={currentArchive}
          open={quickVisible}
          onSubmit={async () => {
            actionRef.current?.reload?.();
            setQuickVisible(false);
          }}
          onCancel={() => setQuickVisible(false)}
        />
      )}
    </PageContainer>
  );
};

export default ArchiveList;
