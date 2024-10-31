import NewContainer from '@/components/NewContainer';
import AttachmentSelect from '@/components/attachment';
import WangEditor from '@/components/editor';
import MarkdownEditor from '@/components/markdown';
import {
  getCategories,
  getCategoryInfo,
  getDesignTemplateFiles,
  getModules,
  getSettingContent,
  saveCategory,
} from '@/services';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import {
  ProForm,
  ProFormCheckbox,
  ProFormDigit,
  ProFormInstance,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { FormattedMessage, history, useIntl } from '@umijs/max';
import { Button, Card, Col, Image, Modal, Row, message } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import '../index.less';

const categoryType = 1;

const ArchiveCategoryDetail: React.FC = () => {
  const formRef = useRef<ProFormInstance>();
  const editorRef = useRef(null);
  const [content, setContent] = useState<string>('');
  const [categoryImages, setCategoryImages] = useState<string[]>([]);
  const [categoryLogo, setCategoryLogo] = useState<string>('');
  const [currentModule, setCurrentModule] = useState<any>({
    category_fields: [],
  });
  const [extraContent, setExtraContent] = useState<any>({});
  const [contentSetting, setContentSetting] = useState<any>({});
  const [loaded, setLoaded] = useState<boolean>(false);
  const [category, setCategory] = useState<any>({ status: 1 });
  const [modules, setModules] = useState<any[]>([]);
  const [newKey, setNewKey] = useState<string>('');
  const intl = useIntl();

  const changeModule = (e: any, tmpModels?: any) => {
    let newModules = tmpModels || modules;
    for (let item of newModules) {
      if (item.id === e) {
        setCurrentModule(item);
        return item;
      }
    }
  };

  const initData = async () => {
    const searchParams = new URLSearchParams(window.location.search);
    let id = searchParams.get('id') || 0;
    if (id === 'new') {
      id = 0;
    }
    let parent_id = Number(searchParams.get('parent_id') || 0);

    let modRes = await getModules();
    setModules(modRes.data || []);
    let catRes = await getCategoryInfo({
      id: id,
    });
    let cat = catRes.data || { status: 1, parent_id: parent_id };
    let moduleId = cat.module_id || 1;
    if (parent_id > 0) {
      let parentRes = await getCategoryInfo({
        id: parent_id,
      });
      if (parentRes.data) {
        moduleId = parentRes.data.module_id;
      }
      cat.module_id = moduleId;
    }
    let module = changeModule(moduleId, modRes.data);
    let extraContent: any = {};
    for (let i in module.category_fields) {
      if (module.category_fields[i].type === 'editor') {
        extraContent[module.category_fields[i].field_name] =
          cat.extra[module.category_fields[i].field_name] || '';
      }
    }
    setExtraContent(extraContent);
    setCategory(cat);

    setContent(cat.content || '');
    setCategoryImages(cat.images || []);
    setCategoryLogo(cat.logo || '');

    getSettingContent().then((res) => {
      setContentSetting(res.data || {});
      setLoaded(true);
    });
  };

  const onTabChange = (key: string) => {
    setLoaded(false);
    initData().then(() => {
      setNewKey(key);
    });
  };

  useEffect(() => {
    initData();
  }, []);

  const onSubmit = async (values: any) => {
    let cat = Object.assign(category, values);
    cat.content = content;
    cat.type = categoryType;
    cat.images = categoryImages;
    cat.logo = categoryLogo;
    if (cat.title === '') {
      message.error(
        intl.formatMessage({ id: 'content.category.input.required' }),
      );
      return;
    }
    // eslint-disable-next-line guard-for-in
    for (let field in extraContent) {
      if (!cat.extra[field]) {
        cat.extra[field] = null;
      }
      cat.extra[field] = extraContent[field];
    }
    let res = await saveCategory(cat);
    if (res.code === 0) {
      message.info(res.msg);
      history.back();
    } else if (res.msg === 'token duplication') {
      Modal.confirm({
        content:
          intl.formatMessage({ id: 'content.url-token.name' }) +
          '"' +
          cat.url_token +
          '"' +
          intl.formatMessage({ id: 'content.url-token.dublicate.tips' }),
        okText: intl.formatMessage({ id: 'content.submit.ok-force' }),
        okType: 'danger',
        cancelText: intl.formatMessage({ id: 'content.submit.cancel' }),
        onOk: () => {
          cat.force = true;
          onSubmit(cat);
        },
      });
    } else {
      message.error(res.msg);
    }
  };

  const handleSelectImages = (rows: any) => {
    for (const row of rows) {
      let exists = false;
      for (let i in categoryImages) {
        if (categoryImages[i] === row.logo) {
          exists = true;
          break;
        }
      }
      if (!exists) {
        categoryImages.push(row.logo);
      }
    }
    setCategoryImages([].concat(categoryImages));
    message.success(
      intl.formatMessage({ id: 'setting.system.upload-success' }),
    );
  };

  const handleCleanImages = (index: number, e: any) => {
    e.stopPropagation();
    categoryImages.splice(index, 1);
    setCategoryImages([].concat(categoryImages));
  };

  const handleSelectLogo = (row: any) => {
    setCategoryLogo(row.logo);
    message.success(
      intl.formatMessage({ id: 'setting.system.upload-success' }),
    );
  };

  const handleCleanLogo = (e: any) => {
    e.stopPropagation();
    setCategoryLogo('');
  };

  const updateExtraContent = async (field: string, html: string) => {
    extraContent[field] = html;
    setExtraContent(extraContent);
  };

  const handleCleanExtraField = (field: string) => {
    const extra: any = {};
    extra[field] = null;
    formRef.current?.setFieldsValue({ extra });

    delete category.extra[field];
    setCategory(category);
  };

  const handleUploadExtraField = (field: string, row: any) => {
    const extra: any = {};
    extra[field] = row.logo;
    formRef.current?.setFieldsValue({ extra });
    if (!category.extra[field]) {
      category.extra[field] = null;
    }
    category.extra[field] = row.logo;

    setCategory(category);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 's' && (event.ctrlKey || event.metaKey)) {
      const values = formRef.current?.getFieldsValue();
      // 自动保存
      onSubmit(values);

      event.preventDefault();
    }
  };

  return (
    <NewContainer
      onTabChange={(key) => onTabChange(key)}
      title={
        category.id > 0
          ? intl.formatMessage({ id: 'content.category.edit' })
          : intl.formatMessage({ id: 'content.category.new' })
      }
    >
      <Card key={newKey} onKeyDown={handleKeyDown}>
        {loaded && (
          <ProForm
            formRef={formRef}
            initialValues={category}
            layout="horizontal"
            onFinish={onSubmit}
          >
            <Row gutter={20}>
              <Col sm={18} xs={24}>
                <ProFormSelect
                  name="module_id"
                  label={intl.formatMessage({ id: 'content.module.name' })}
                  width="lg"
                  request={async () => {
                    return modules;
                  }}
                  readonly={
                    category.id || category.module_id > 0 ? true : false
                  }
                  fieldProps={{
                    fieldNames: {
                      label: 'title',
                      value: 'id',
                    },
                    onChange: (e) => {
                      changeModule(e);
                    },
                  }}
                />
                <ProFormSelect
                  label={intl.formatMessage({ id: 'content.category.parent' })}
                  name="parent_id"
                  width="lg"
                  request={async () => {
                    let res = await getCategories({ type: categoryType });
                    let categories = res.data || [];
                    // 排除自己
                    if (category.id) {
                      let tmpCategory = [];
                      for (let i in categories) {
                        if (
                          categories[i].id === category.id ||
                          categories[i].parent_id === category.id ||
                          categories[i].module_id !== category.module_id
                        ) {
                          continue;
                        }
                        tmpCategory.push(categories[i]);
                      }
                      categories = tmpCategory;
                    }
                    categories = [
                      {
                        id: 0,
                        title: intl.formatMessage({
                          id: 'content.category.top',
                        }),
                        spacer: '',
                      },
                    ].concat(categories);
                    return categories;
                  }}
                  readonly={
                    category.id || category.module_id > 0 ? false : true
                  }
                  fieldProps={{
                    fieldNames: {
                      label: 'title',
                      value: 'id',
                    },
                    optionItemRender(item: any) {
                      return (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: (item.spacer || '') + item.title,
                          }}
                        ></div>
                      );
                    },
                  }}
                />
                <ProFormText
                  name="title"
                  label={intl.formatMessage({ id: 'content.category.title' })}
                />
                <ProFormTextArea
                  name="description"
                  label={intl.formatMessage({
                    id: 'content.category.description',
                  })}
                />
                <ProFormText
                  name="seo_title"
                  label={intl.formatMessage({ id: 'content.seo-title.name' })}
                  placeholder={intl.formatMessage({
                    id: 'content.category.seo-title.placeholder',
                  })}
                  extra={intl.formatMessage({
                    id: 'content.category.seo-title.description',
                  })}
                />
                <ProFormText
                  name="keywords"
                  label={intl.formatMessage({ id: 'content.keywords.name' })}
                  extra={intl.formatMessage({
                    id: 'content.keywords.description',
                  })}
                />
                <ProFormRadio.Group
                  name="status"
                  label={intl.formatMessage({ id: 'content.category.status' })}
                  options={[
                    {
                      value: 0,
                      label: intl.formatMessage({
                        id: 'content.category.status.hide',
                      }),
                    },
                    {
                      value: 1,
                      label: intl.formatMessage({
                        id: 'content.category.status.ok',
                      }),
                    },
                  ]}
                  extra={intl.formatMessage({
                    id: 'content.category.status.description',
                  })}
                />
                {currentModule.category_fields?.map(
                  (item: any, index: number) => (
                    <Col
                      sm={item.type === 'editor' ? 24 : 12}
                      xs={24}
                      key={index}
                    >
                      {item.type === 'text' ? (
                        <ProFormText
                          name={['extra', item.field_name]}
                          label={item.name}
                          required={item.required ? true : false}
                          placeholder={
                            item.content &&
                            intl.formatMessage({
                              id: 'content.param.default',
                            }) + item.content
                          }
                        />
                      ) : item.type === 'number' ? (
                        <ProFormDigit
                          name={['extra', item.field_name]}
                          label={item.name}
                          required={item.required ? true : false}
                          placeholder={
                            item.content &&
                            intl.formatMessage({
                              id: 'content.param.default',
                            }) + item.content
                          }
                        />
                      ) : item.type === 'textarea' ? (
                        <ProFormTextArea
                          name={['extra', item.field_name]}
                          label={item.name}
                          required={item.required ? true : false}
                          placeholder={
                            item.content &&
                            intl.formatMessage({
                              id: 'content.param.default',
                            }) + item.content
                          }
                        />
                      ) : item.type === 'editor' ? (
                        <ProFormText
                          label={item.name}
                          required={item.required ? true : false}
                          extra={
                            item.content &&
                            intl.formatMessage({
                              id: 'content.param.default',
                            }) + item.content
                          }
                        >
                          {contentSetting.editor === 'markdown' ? (
                            <MarkdownEditor
                              className="mb-normal"
                              setContent={(html) =>
                                updateExtraContent(item.field_name, html)
                              }
                              content={extraContent[item.field_name] || ''}
                              ref={null}
                            />
                          ) : (
                            <WangEditor
                              className="mb-normal"
                              setContent={(html) =>
                                updateExtraContent(item.field_name, html)
                              }
                              content={extraContent[item.field_name] || ''}
                              key={item.field_name}
                              field={item.field_name}
                              ref={null}
                            />
                          )}
                        </ProFormText>
                      ) : item.type === 'radio' ? (
                        <ProFormRadio.Group
                          name={['extra', item.field_name]}
                          label={item.name}
                          request={async () => {
                            const tmpData = item.content.split('\n');
                            const data = [];
                            for (const item1 of tmpData) {
                              data.push({ label: item1, value: item1 });
                            }
                            return data;
                          }}
                        />
                      ) : item.type === 'checkbox' ? (
                        <ProFormCheckbox.Group
                          name={['extra', item.field_name]}
                          label={item.name}
                          request={async () => {
                            const tmpData = item.content.split('\n');
                            const data = [];
                            for (const item1 of tmpData) {
                              data.push({ label: item1, value: item1 });
                            }
                            return data;
                          }}
                        />
                      ) : item.type === 'select' ? (
                        <ProFormSelect
                          name={['extra', item.field_name]}
                          label={item.name}
                          request={async () => {
                            const tmpData = item.content.split('\n');
                            const data = [];
                            for (const item1 of tmpData) {
                              data.push({ label: item1, value: item1 });
                            }
                            return data;
                          }}
                        />
                      ) : item.type === 'image' ? (
                        <ProFormText
                          name={['extra', item.field_name]}
                          label={item.name}
                        >
                          {category.extra[item.field_name] ? (
                            <div className="ant-upload-item">
                              <Image
                                preview={{
                                  src: category.extra[item.field_name],
                                }}
                                src={category.extra[item.field_name]}
                              />
                              <span
                                className="delete"
                                onClick={() =>
                                  handleCleanExtraField(item.field_name)
                                }
                              >
                                <DeleteOutlined />
                              </span>
                            </div>
                          ) : (
                            <AttachmentSelect
                              onSelect={(row) =>
                                handleUploadExtraField(item.field_name, row)
                              }
                              open={false}
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
                          )}
                        </ProFormText>
                      ) : item.type === 'file' ? (
                        <ProFormText
                          name={['extra', item.field_name]}
                          label={item.name}
                        >
                          {category.extra[item.field_name] ? (
                            <div className="ant-upload-item ant-upload-file">
                              <span>{category.extra[item.field_name]}</span>
                              <span
                                className="delete"
                                onClick={() =>
                                  handleCleanExtraField(item.field_name)
                                }
                              >
                                <DeleteOutlined />
                              </span>
                            </div>
                          ) : (
                            <AttachmentSelect
                              onSelect={(row) =>
                                handleUploadExtraField(item.field_name, row)
                              }
                              open={false}
                            >
                              <Button>
                                <FormattedMessage id="setting.system.upload" />
                              </Button>
                            </AttachmentSelect>
                          )}
                        </ProFormText>
                      ) : (
                        ''
                      )}
                    </Col>
                  ),
                )}
                {loaded && (
                  <>
                    {contentSetting.editor === 'markdown' ? (
                      <MarkdownEditor
                        className="mb-normal"
                        setContent={async (html: string) => {
                          setContent(html);
                        }}
                        content={content}
                        ref={editorRef}
                      />
                    ) : (
                      <WangEditor
                        className="mb-normal"
                        setContent={async (html: string) => {
                          setContent(html);
                        }}
                        key="content"
                        field="content"
                        ref={editorRef}
                        content={content}
                      />
                    )}
                  </>
                )}
              </Col>
              <Col sm={6} xs={24}>
                <div className="mb-normal">
                  <Row gutter={[16, 16]}>
                    <Col span={12}>
                      <Button
                        block
                        type="primary"
                        onClick={() => {
                          onSubmit(formRef.current?.getFieldsValue());
                        }}
                      >
                        <FormattedMessage id="content.submit.ok" />
                      </Button>
                    </Col>
                    <Col span={12}>
                      <Button
                        block
                        onClick={() => {
                          history.back();
                        }}
                      >
                        <FormattedMessage id="design.back" />
                      </Button>
                    </Col>
                  </Row>
                </div>
                <Card
                  className="aside-card"
                  size="small"
                  title={intl.formatMessage({ id: 'content.category.banner' })}
                >
                  {categoryImages.length
                    ? categoryImages.map((item: string, index: number) => (
                        <div className="ant-upload-item" key={index}>
                          <Image
                            preview={{
                              src: item,
                            }}
                            src={item}
                          />
                          <span
                            className="delete"
                            onClick={handleCleanImages.bind(this, index)}
                          >
                            <DeleteOutlined />
                          </span>
                        </div>
                      ))
                    : null}
                  <AttachmentSelect
                    onSelect={handleSelectImages}
                    open={false}
                    multiple={true}
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
                </Card>
                <Card
                  className="aside-card"
                  size="small"
                  title={intl.formatMessage({ id: 'content.category.thumb' })}
                >
                  {categoryLogo ? (
                    <div className="ant-upload-item">
                      <Image
                        preview={{
                          src: categoryLogo,
                        }}
                        src={categoryLogo}
                      />
                      <span className="delete" onClick={handleCleanLogo}>
                        <DeleteOutlined />
                      </span>
                    </div>
                  ) : (
                    <AttachmentSelect onSelect={handleSelectLogo} open={false}>
                      <div className="ant-upload-item">
                        <div className="add">
                          <PlusOutlined />
                          <div style={{ marginTop: 8 }}>
                            <FormattedMessage id="setting.system.upload" />
                          </div>
                        </div>
                      </div>
                    </AttachmentSelect>
                  )}
                </Card>
                <Card
                  className="aside-card"
                  size="small"
                  title={intl.formatMessage({ id: 'content.url-token.name' })}
                >
                  <ProFormText
                    name="url_token"
                    placeholder={intl.formatMessage({
                      id: 'content.url-token.placeholder',
                    })}
                    extra={intl.formatMessage({ id: 'content.url-token.tips' })}
                  />
                </Card>
                <Card
                  className="aside-card"
                  size="small"
                  title={intl.formatMessage({ id: 'content.category.sort' })}
                >
                  <ProFormDigit
                    name="sort"
                    extra={intl.formatMessage({
                      id: 'content.category.sort.description',
                    })}
                  />
                </Card>
                <Card
                  className="aside-card"
                  size="small"
                  title={intl.formatMessage({
                    id: 'content.category.template',
                  })}
                >
                  <ProFormSelect
                    showSearch
                    name="template"
                    request={async () => {
                      const res = await getDesignTemplateFiles({});
                      const data = [
                        {
                          path: '',
                          remark: intl.formatMessage({
                            id: 'content.default-template',
                          }),
                        },
                      ].concat(res.data || []);
                      for (const i in data) {
                        if (!data[i].remark) {
                          data[i].remark = data[i].path;
                        } else {
                          data[i].remark =
                            data[i].path + '(' + data[i].remark + ')';
                        }
                      }
                      return data;
                    }}
                    fieldProps={{
                      fieldNames: {
                        label: 'remark',
                        value: 'path',
                      },
                    }}
                    extra={
                      <div>
                        <FormattedMessage id="content.category.default" />:{' '}
                        {currentModule.table_name}/list.html
                      </div>
                    }
                  />
                </Card>
                <Card
                  className="aside-card"
                  size="small"
                  title={intl.formatMessage({ id: 'content.category.inherit' })}
                >
                  <ProFormRadio.Group
                    name="is_inherit"
                    options={[
                      {
                        value: 0,
                        label: intl.formatMessage({
                          id: 'content.category.inherit.false',
                        }),
                      },
                      {
                        value: 1,
                        label: intl.formatMessage({
                          id: 'content.category.inherit.true',
                        }),
                      },
                    ]}
                    extra={intl.formatMessage({
                      id: 'content.category.inherit.description',
                    })}
                  />
                </Card>
                <Card
                  className="aside-card"
                  size="small"
                  title={intl.formatMessage({
                    id: 'content.archive-template.name',
                  })}
                >
                  <ProFormSelect
                    showSearch
                    name="detail_template"
                    request={async () => {
                      const res = await getDesignTemplateFiles({});
                      const data = [
                        {
                          path: '',
                          remark: intl.formatMessage({
                            id: 'content.default-template',
                          }),
                        },
                      ].concat(res.data || []);
                      for (const i in data) {
                        if (!data[i].remark) {
                          data[i].remark = data[i].path;
                        } else {
                          data[i].remark =
                            data[i].path + '(' + data[i].remark + ')';
                        }
                      }
                      return data;
                    }}
                    fieldProps={{
                      fieldNames: {
                        label: 'remark',
                        value: 'path',
                      },
                    }}
                    extra={
                      <div>
                        <FormattedMessage id="content.category.default" />:{' '}
                        {currentModule.table_name}/detail.html
                      </div>
                    }
                  />
                </Card>
              </Col>
            </Row>
          </ProForm>
        )}
      </Card>
    </NewContainer>
  );
};

export default ArchiveCategoryDetail;
