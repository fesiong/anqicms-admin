import {
  deleteSettingNav,
  getArchives,
  getCategories,
  getModules,
  getSettingNav,
  getSettingNavTypes,
  saveSettingNav,
} from '@/services';
import {
  ModalForm,
  PageContainer,
  ProFormDigit,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProList,
} from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Button, Card, Modal, Space, Tag, message } from 'antd';
import React, { useEffect, useState } from 'react';
import NavTypes from './components/navType';

const SettingNavFrom: React.FC<any> = () => {
  const [navs, setNavList] = useState<any>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [modules, setModules] = useState<any[]>([]);
  const [editingNav, setEditingNav] = useState<any>({ nav_type: 0 });
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [nav_type, setNavType] = useState<number>(0);
  const [innerOptions, setInnerOptions] = useState<any[]>([]);
  const [navTypes, setNavTypes] = useState<any[]>([]);
  const [typeId, setTypeId] = useState<number>(1);
  const [archives, setArchives] = useState<any[]>([]);
  const [defaultTitle, setDefaultTitle] = useState<string>('');
  const intl = useIntl();

  const getNavList = async (typeId: number) => {
    const res = await getSettingNav({
      type_id: typeId,
    });
    let navs = res.data || [];
    setNavList(navs);
  };

  const getNavTypes = async () => {
    const res = await getSettingNavTypes();
    let types = res.data || [];
    setNavTypes(types);
  };

  const getCategoryList = async () => {
    const res = await getCategories();
    const pages = await getCategories({ type: 3 });
    let categories = (res.data || []).concat(pages.data || []);
    setCategories(categories);
  };

  const getModuleList = async () => {
    const res = await getModules();
    let modules = res.data || [];
    setModules(modules);
    let options = [
      {
        value: 0,
        label: intl.formatMessage({ id: 'setting.nav.home' }),
      },
    ];

    for (let item of modules) {
      options.push({
        value: item.id,
        label: item.title + intl.formatMessage({ id: 'setting.nav.home' }),
      });
    }

    setInnerOptions(options);
  };

  useEffect(() => {
    getNavList(typeId);
    getCategoryList();
    getModuleList();
    getNavTypes();
  }, []);

  const editNav = (row: any) => {
    setEditingNav(row);
    setNavType(row.nav_type);
    setModalVisible(true);
  };

  const removeNav = (row: any) => {
    Modal.confirm({
      title: intl.formatMessage({ id: 'setting.nav.confirm-delete' }),
      onOk: () => {
        deleteSettingNav(row).then((res) => {
          message.success(res.msg);
          getNavList(typeId);
        });
      },
    });
  };

  const handleShowAddNav = () => {
    setNavType(0);
    setEditingNav({ nav_type: 0 });
    setModalVisible(true);
  };

  const onNavSubmit = async (data: any) => {
    let values = Object.assign(editingNav, data);
    values.type_id = typeId;
    if (!values.title) {
      values.title = defaultTitle;
    }
    const hide = message.loading(
      intl.formatMessage({ id: 'setting.system.submitting' }),
      0,
    );
    saveSettingNav(values)
      .then((res) => {
        message.success(res.msg);
        setModalVisible(false);
        getNavList(typeId);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        hide();
      });
  };

  const getModuleName = (moduleId: number) => {
    for (let item of modules) {
      if (item.id === moduleId) {
        return item.title;
      }
    }
  };

  const onSearchArchives = (e: any) => {
    getArchives({ title: e, pageSize: 10 }).then((res) => {
      setArchives(res.data || []);
    });
  };

  const handleChangeNavType = (typeId: number) => {
    setTypeId(typeId);
    getNavList(typeId);
  };

  return (
    <PageContainer>
      <Card
        title={
          <div>
            <Space>
              {navTypes.map((item) => (
                <Button
                  key={item.id}
                  type={typeId === item.id ? 'primary' : 'default'}
                  onClick={() => {
                    handleChangeNavType(item.id);
                  }}
                >
                  {item.title}
                </Button>
              ))}
              <NavTypes
                onCancel={() => {
                  getNavTypes();
                }}
              >
                <Button>
                  <FormattedMessage id="setting.nav.types" />
                </Button>
              </NavTypes>
            </Space>
          </div>
        }
      >
        <ProList<any>
          toolBarRender={() => {
            return [
              <Button key="add" onClick={handleShowAddNav}>
                <FormattedMessage id="setting.nav.add" />
              </Button>,
            ];
          }}
          rowKey="name"
          headerTitle={intl.formatMessage({ id: 'setting.nav.list' })}
          dataSource={navs}
          showActions="hover"
          showExtra="hover"
          metas={{
            title: {
              render: (text: any, row: any) => {
                return (row.spacer || '') + text;
              },
              dataIndex: 'title',
            },
            description: {
              dataIndex: 'description',
            },
            subTitle: {
              render: (_: any, row: any) => {
                return (
                  <Space size={0}>
                    {row.sub_title && <Tag>{row.sub_title}</Tag>}
                    <Tag color="blue">
                      {row.nav_type === 2
                        ? intl.formatMessage({ id: 'setting.nav.outlink' }) +
                          ': ' +
                          row.link
                        : row.nav_type === 3
                        ? intl.formatMessage({ id: 'setting.nav.archive' }) +
                          ': ' +
                          row.page_id
                        : row.nav_type === 1
                        ? intl.formatMessage({ id: 'setting.nav.category' }) +
                          ': ' +
                          row.page_id
                        : intl.formatMessage({ id: 'setting.nav.internal' }) +
                          ': ' +
                          (row.page_id > 0
                            ? getModuleName(row.page_id)
                            : intl.formatMessage({ id: 'setting.nav.home' }))}
                    </Tag>
                  </Space>
                );
              },
            },
            actions: {
              render: (_: any, row: any) => [
                row.parent_id === 0 && (
                  <a onClick={() => editNav({ parent_id: row.id })} key="add">
                    <FormattedMessage id="setting.nav.children.add" />
                  </a>
                ),
                <a onClick={() => editNav(row)} key="edit">
                  <FormattedMessage id="setting.action.edit" />
                </a>,
                <a onClick={() => removeNav(row)} key="warning">
                  <FormattedMessage id="setting.system.delete" />
                </a>,
              ],
            },
          }}
        />
      </Card>
      {modalVisible && (
        <ModalForm
          title={intl.formatMessage({ id: 'menu.setting.nav' })}
          open={modalVisible}
          modalProps={{
            onCancel: () => setModalVisible(false),
          }}
          initialValues={editingNav}
          onFinish={onNavSubmit}
        >
          <ProFormSelect
            name="parent_id"
            width="lg"
            label={intl.formatMessage({ id: 'setting.nav.parent' })}
            fieldProps={{
              fieldNames: {
                label: 'title',
                value: 'id',
              },
            }}
            request={async () => {
              let newNavs = [
                {
                  title: intl.formatMessage({ id: 'setting.nav.top' }),
                  id: 0,
                },
              ];
              for (let item of navs) {
                if (item.parent_id === 0) {
                  newNavs.push(item);
                  for (let sub of navs) {
                    if (sub.parent_id === item.id) {
                      sub.spacer = (item.spacer || '') + '└  ';
                      sub.title = sub.spacer + sub.title;
                      newNavs.push(sub);
                    }
                  }
                }
              }
              return newNavs;
            }}
          />
          <ProFormText
            name="title"
            label={intl.formatMessage({ id: 'setting.nav.title' })}
            width="lg"
            extra={intl.formatMessage({ id: 'setting.nav.title.description' })}
          />
          <ProFormText
            name="sub_title"
            label={intl.formatMessage({ id: 'setting.nav.subtitle' })}
            width="lg"
            extra={intl.formatMessage({
              id: 'setting.nav.subtitle.description',
            })}
          />
          <ProFormText
            name="description"
            label={intl.formatMessage({ id: 'setting.nav.description' })}
            width="lg"
          />
          <ProFormRadio.Group
            name="nav_type"
            label={intl.formatMessage({ id: 'setting.nav.type' })}
            fieldProps={{
              onChange: (e: any) => {
                setNavType(e.target.value);
              },
            }}
            options={[
              {
                value: 0,
                label: intl.formatMessage({ id: 'setting.nav.internal' }),
              },
              {
                value: 1,
                label: intl.formatMessage({ id: 'setting.nav.category' }),
              },
              {
                value: 3,
                label: intl.formatMessage({ id: 'setting.nav.archive' }),
              },
              {
                value: 2,
                label: intl.formatMessage({ id: 'setting.nav.outlink' }),
              },
            ]}
          />
          {nav_type === 0 && (
            <ProFormRadio.Group
              name="page_id"
              label={intl.formatMessage({ id: 'setting.nav.internal.name' })}
              options={innerOptions}
            />
          )}
          {nav_type === 1 && (
            <ProFormSelect
              name="page_id"
              width="lg"
              label={intl.formatMessage({ id: 'setting.nav.select-page' })}
              options={categories.map((cat: any) => ({
                spacer: cat.spacer,
                title: cat.title,
                label:
                  cat.title +
                  (cat.status === 1
                    ? ''
                    : intl.formatMessage({ id: 'setting.nav.hide' })),
                value: cat.id,
                disabled: cat.status !== 1,
              }))}
              fieldProps={{
                optionItemRender(item: any) {
                  return (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: item.spacer + item.label,
                      }}
                    ></div>
                  );
                },
                onChange: (_, a: any) => {
                  setDefaultTitle(a.title);
                },
              }}
            />
          )}
          {nav_type === 3 && (
            <ProFormSelect
              name="page_id"
              width="lg"
              label={intl.formatMessage({ id: 'setting.nav.select-archive' })}
              showSearch
              options={archives.map((a: any) => ({
                title: a.title,
                label: a.title,
                value: a.id,
              }))}
              fieldProps={{
                onSearch: (e) => {
                  onSearchArchives(e);
                },
                onChange: (_, a: any) => {
                  setDefaultTitle(a.title);
                },
              }}
            />
          )}
          {nav_type === 2 && (
            <ProFormText
              name="link"
              label={intl.formatMessage({ id: 'setting.nav.link' })}
              width="lg"
              extra={intl.formatMessage({ id: 'setting.nav.link.description' })}
            />
          )}
          <ProFormDigit
            name="sort"
            label={intl.formatMessage({ id: 'setting.nav.sort' })}
            width="lg"
            extra={intl.formatMessage({ id: 'setting.nav.sort.description' })}
          />
        </ModalForm>
      )}
    </PageContainer>
  );
};

export default SettingNavFrom;
