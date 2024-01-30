import { PlusOutlined } from '@ant-design/icons';
import { Alert, Button, Dropdown, Input, Menu, message, Modal, Select, Space, Tag } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType, ProColumnType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import {
  ModalForm,
  ProFormCheckbox,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-form';
import { getCategories } from '@/services/category';
import moment from 'moment';
import { history } from 'umi';
import ReplaceKeywords from '@/components/replaceKeywords';
import './index.less';
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
import QuickEditForm from './quickEdit';

const flagEnum: any = {
  h: '头条[h]',
  c: '推荐[c]',
  f: '幻灯[f]',
  a: '特荐[a]',
  s: '滚动[s]',
  b: '加粗[b]',
  p: '图片[p]',
  j: '跳转[j]',
};

let toLanguage = '';
let updating = false;

const ArchiveList: React.FC = (props) => {
  const actionRef = useRef<ActionType>();
  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([]);
  const [replaceVisible, setReplaceVisible] = useState<boolean>(false);
  const [flagVisible, setFlagVisible] = useState<boolean>(false);
  const [statusVisible, setStatusVisible] = useState<boolean>(false);
  const [categoryVisible, setCategoryVisible] = useState<boolean>(false);
  const [timeVisible, setTimeVisible] = useState<boolean>(false);
  const [releaseVisible, setReleaseVisible] = useState<boolean>(false);
  const [modules, setModules] = useState<any[]>([]);
  const [moduleId, setModuleId] = useState<Number>(0);
  const [contentSetting, setContentSetting] = useState<any>({});
  const [currentArchive, setCurrentArchive] = useState<any>({});
  const [quickVisible, setQuickVisible] = useState<boolean>(false);

  useEffect(() => {
    setModuleId(Number(history.location.query?.module_id || 0));
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
    setModules([{ title: '所有文档', id: 0 }].concat(res.data || []));
  };

  const onSelectModule = (id: Number) => {
    setModuleId(id);
    history.replace('/archive/list?module_id=' + id);
    actionRef.current?.reload();
  };

  const handleRemove = async (selectedRowKeys: any[]) => {
    Modal.confirm({
      title: '确定要删除选中的文档吗？',
      onOk: async () => {
        const hide = message.loading('正在删除', 0);
        if (!selectedRowKeys) return true;
        try {
          for (let item of selectedRowKeys) {
            await deleteArchive({
              id: item,
            });
          }
          hide();
          message.success('删除成功');
          setSelectedRowKeys([]);
          actionRef.current?.reloadAndRest?.();

          return true;
        } catch (error) {
          hide();
          message.error('删除失败');
          return true;
        }
      },
    });
  };

  const handleSetFlag = async (values: any) => {
    const hide = message.loading('正在处理', 0);
    updateArchivesFlag({
      flag: values.flag.join(','),
      ids: selectedRowKeys,
    })
      .then((res) => {
        message.success(res.msg);
        setFlagVisible(false);
        setSelectedRowKeys([]);
        actionRef.current?.reloadAndRest?.();
      })
      .finally(() => {
        hide();
      });
  };

  const handleSetStatus = async (values: any) => {
    const hide = message.loading('正在处理', 0);
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
    const hide = message.loading('正在处理', 0);
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
      message.error('请选择分类');
      return;
    }
    const hide = message.loading('正在处理', 0);
    updateArchivesCategory({
      category_id: categoryId,
      category_ids: categoryIds,
      ids: selectedRowKeys,
    })
      .then((res) => {
        message.success(res.msg);
        setCategoryVisible(false);
        setSelectedRowKeys([]);
        actionRef.current?.reloadAndRest?.();
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
      title: '确定要翻译选中的文档吗？',
      content: (
        <div>
          <Alert className="mb-normal" message="需要使用文档翻译服务，请先绑定安企账号。"></Alert>
          <div className="">请选择翻译目标语言</div>
          <Select
            style={{ width: '100%' }}
            onChange={(e) => {
              toLanguage = e;
            }}
            options={[
              { label: '请选择', value: '', disabled: true },
              { label: '英语', value: 'en' },
              { label: '简体中文', value: 'zh-CN' },
              { label: '繁体中文', value: 'zh-TW' },
              { label: '越南语', value: 'vi' },
              { label: '印尼语', value: 'id' },
              { label: '印地语', value: 'hi' },
              { label: '意大利语', value: 'it' },
              { label: '希腊语', value: 'el' },
              { label: '西班牙语', value: 'es' },
              { label: '葡萄牙语', value: 'pt' },
              { label: '塞尔维亚语', value: 'sr' },
              { label: '缅甸语', value: 'my' },
              { label: '孟加拉语', value: 'bn' },
              { label: '泰语', value: 'th' },
              { label: '土耳其语', value: 'tr' },
              { label: '日语', value: 'ja' },
              { label: '老挝语', value: 'lo' },
              { label: '韩语', value: 'ko' },
              { label: '俄语', value: 'ru' },
              { label: '法语', value: 'fr' },
              { label: '德语', value: 'de' },
              { label: '波斯语', value: 'fa' },
              { label: '阿拉伯语', value: 'ar' },
              { label: '马来语', value: 'ms' },
            ]}
          />
        </div>
      ),
      onOk: async () => {
        const hide = message.loading('正在翻译', 0);
        anqiTranslateArchive({
          id: record.id,
          to_language: toLanguage,
        })
          .then((res) => {
            if (res.code === 0) {
              actionRef.current?.reloadAndRest?.();
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
      title: '确定要AI改写选中的文档吗？',
      content: '需要使用文档AI改写服务，请先绑定安企账号。',
      onOk: async () => {
        const hide = message.loading('正在处理中', 0);
        anqiAiPseudoArchive({
          id: record.id,
        })
          .then((res) => {
            if (res.code === 0) {
              actionRef.current?.reloadAndRest?.();
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
      message.error('请填写大于0的数字');
      return;
    }
    if (value == record.sort) {
      return;
    }
    if (value < 0) {
      message.error('请填写大于0的数字');
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
    const hide = message.loading('正在处理', 0);
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
    title: '排序',
    dataIndex: 'sort',
    hideInSearch: true,
    sorter: true,
    tooltip: '数值越大，越靠前',
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
      title: '编号',
      dataIndex: 'id',
      hideInSearch: true,
      sorter: true,
    },
    {
      title: '标题',
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
      title: '内容模型',
      dataIndex: 'module_id',
      hideInSearch: true,
      render: (_: any, entity) => {
        return entity.module_name;
      },
    },
    {
      title: '所属分类',
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
              const categories = [{ spacer: '', title: '所有分类', id: 0, status: 1 }]
                .concat(res.data || [])
                .map((cat: any) => ({
                  spacer: cat.spacer,
                  label: cat.title + (cat.status == 1 ? '' : '(隐藏)'),
                  value: cat.id,
                }));
              return categories;
            }}
            fieldProps={{
              ...fieldProps,
              optionItemRender(item) {
                return <div dangerouslySetInnerHTML={{ __html: item.spacer + item.label }}></div>;
              },
            }}
          />
        );
      },
    },
    {
      title: '浏览',
      dataIndex: 'views',
      hideInSearch: true,
      sorter: true,
    },
    {
      title: 'Flag',
      dataIndex: 'flag',
      hideInTable: true,
      renderFormItem: () => {
        return <ProFormSelect name="flag" valueEnum={Object.assign({ '': '不限' }, flagEnum)} />;
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueEnum: {
        0: {
          text: '草稿',
          status: 'Default',
        },
        1: {
          text: '正常',
          status: 'Success',
        },
        2: {
          text: '待发布',
          status: 'Warning',
        },
      },
      renderFormItem: () => {
        return (
          <ProFormSelect
            name="status"
            initialValue={'ok'}
            request={async () => {
              return [
                { label: '正常', value: 'ok' },
                { label: '草稿', value: 'draft' },
                { label: '待发布', value: 'plan' },
              ];
            }}
          />
        );
      },
    },
    {
      title: '发布/更新时间',
      hideInSearch: true,
      dataIndex: 'created_time',
      render: (_, record) => {
        return (
          <div>
            <div>{moment(record.created_time * 1000).format('YYYY-MM-DD HH:mm')}</div>
            <div>{moment(record.updated_time * 1000).format('YYYY-MM-DD HH:mm')}</div>
          </div>
        );
      },
    },
    {
      title: '操作',
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
            编辑
          </a>
          <a onClick={() => handleQuickEdit(record)}>快速编辑</a>

          <Dropdown
            overlay={
              <Menu>
                <Menu.Item>
                  <a
                    key="edit"
                    onClick={() => {
                      handleTranslateArchive(record);
                    }}
                    title="将内容翻译成英文/中文"
                  >
                    翻译
                  </a>
                </Menu.Item>
                <Menu.Item>
                  <a
                    key="edit"
                    onClick={() => {
                      handleAiPseudoArchive(record);
                    }}
                    title="AI改写这篇文章"
                  >
                    AI 改写
                  </a>
                </Menu.Item>
                <Menu.Item>
                  <a
                    key="edit"
                    onClick={() => {
                      handleCopyArchive(record);
                    }}
                    title="复制文本新发一篇"
                  >
                    复制
                  </a>
                </Menu.Item>
                <Menu.Item danger>
                  <a
                    className="text-red"
                    key="delete"
                    onClick={async () => {
                      await handleRemove([record.id]);
                    }}
                  >
                    删除
                  </a>
                </Menu.Item>
              </Menu>
            }
            key="more"
          >
            <a>更多</a>
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
          span: 8,
          defaultCollapsed: false,
        }}
        toolBarRender={() => [
          <Button
            key="recycle"
            onClick={() => {
              history.push('/archive/recycle');
            }}
          >
            回收站
          </Button>,
          <Button
            key="replace"
            onClick={() => {
              setReplaceVisible(true);
            }}
          >
            批量替换关键词
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
            <PlusOutlined /> 添加文档
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
              批量更改Flag
            </Button>
            <Button
              size={'small'}
              onClick={async () => {
                await setCategoryVisible(true);
              }}
            >
              批量更改分类
            </Button>
            <Button
              size={'small'}
              onClick={async () => {
                await setTimeVisible(true);
              }}
            >
              刷新时间
            </Button>
            <Button
              size={'small'}
              onClick={async () => {
                await setStatusVisible(true);
              }}
            >
              批量更新状态
            </Button>
            <Button
              size={'small'}
              onClick={async () => {
                await setReleaseVisible(true);
              }}
            >
              批量定时发布
            </Button>
            <Button
              size={'small'}
              onClick={async () => {
                await handleRemove(selectedRowKeys);
              }}
            >
              批量删除
            </Button>
            <Button type="link" size={'small'} onClick={onCleanSelected}>
              取消选择
            </Button>
          </Space>
        )}
        request={(params, sort) => {
          let categoryId = history.location.query?.category_id || 0;
          if (Number(categoryId) > 0) {
            params = Object.assign({ category_id: categoryId }, params);
          }
          if (Number(moduleId) > 0) {
            params = Object.assign({ module_id: moduleId }, params);
          }
          for (let i in sort) {
            params.sort = i;
            params.order = sort[i] == 'ascend' ? 'asc' : 'desc';
          }
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
        }}
      />
      {replaceVisible && (
        <ReplaceKeywords
          visible={replaceVisible}
          onCancel={() => {
            setReplaceVisible(false);
          }}
        />
      )}
      {flagVisible && (
        <ModalForm
          width={480}
          title="请选择新的推荐属性"
          visible={flagVisible}
          onFinish={handleSetFlag}
          onVisibleChange={(e) => setFlagVisible(e)}
        >
          <ProFormCheckbox.Group
            name="flag"
            valueEnum={{
              h: '头条[h]',
              c: '推荐[c]',
              f: '幻灯[f]',
              a: '特荐[a]',
              s: '滚动[s]',
              b: '加粗[b]',
              p: '图片[p]',
              j: '跳转[j]',
            }}
          />
        </ModalForm>
      )}
      {statusVisible && (
        <ModalForm
          width={480}
          title="请选择新的状态"
          visible={statusVisible}
          onFinish={handleSetStatus}
          onVisibleChange={(e) => setStatusVisible(e)}
        >
          <ProFormRadio.Group
            name="status"
            valueEnum={{
              0: '草稿',
              1: '正常',
            }}
          />
        </ModalForm>
      )}
      {timeVisible && (
        <ModalForm
          width={480}
          title="请选择新的文档时间"
          visible={timeVisible}
          onFinish={handleSetTime}
          onVisibleChange={(e) => setTimeVisible(e)}
        >
          <ProFormRadio.Group
            name="time"
            initialValue={1}
            valueEnum={{
              1: '更新所选文档的发布时间(首发时间)',
              2: '更新所选文章的最后编辑时间(更新时间)',
              3: '更新所有文档的发布时间(首发时间)',
              4: '更新所有文章的最后编辑时间(更新时间)',
            }}
          />
        </ModalForm>
      )}
      {categoryVisible && (
        <ModalForm
          width={480}
          title="请选择转移到的分类"
          visible={categoryVisible}
          onFinish={handleSetCategory}
          onVisibleChange={(e) => setCategoryVisible(e)}
        >
          <ProFormSelect
            name="category_ids"
            request={async () => {
              let res = await getCategories({ type: 1 });
              return [{ spacer: '', title: '请选择', id: 0 }].concat(res.data || []);
            }}
            fieldProps={{
              mode: contentSetting.multi_category == 1 ? 'multiple' : '',
              fieldNames: {
                label: 'title',
                value: 'id',
              },
              optionItemRender(item) {
                return <div dangerouslySetInnerHTML={{ __html: item.spacer + item.title }}></div>;
              },
            }}
          />
        </ModalForm>
      )}
      {releaseVisible && (
        <ModalForm
          width={480}
          title="定时发布任务"
          visible={releaseVisible}
          onFinish={handleSetReleasePlan}
          onVisibleChange={(e) => setReleaseVisible(e)}
        >
          <Alert
            className="mb-normal"
            message={
              <div>
                <div>只有草稿箱的文档会被定时发布，选择正常文章不会发生改变</div>
                <div>
                  你选择了 <span className="text-red">{selectedRowKeys.length}</span> 篇文档
                </div>
              </div>
            }
          ></Alert>
          <ProFormText
            name="daily_limit"
            label="每天数量"
            placeholder="填整数，不填则当天发完"
            addonAfter="篇"
          />
          <ProFormText
            name="start_hour"
            initialValue={8}
            label="每天开始时间"
            placeholder="默认8点"
            addonAfter="时"
          />
          <ProFormText
            name="end_hour"
            initialValue={20}
            label="每天结束时间"
            placeholder="默认20点"
            addonAfter="时"
          />
        </ModalForm>
      )}
      {quickVisible && (
        <QuickEditForm
          archive={currentArchive}
          visible={quickVisible}
          onSubmit={async () => {
            actionRef.current?.reloadAndRest?.();
            setQuickVisible(false);
          }}
          onCancel={() => setQuickVisible(false)}
        />
      )}
    </PageContainer>
  );
};

export default ArchiveList;
