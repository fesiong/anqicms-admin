import NewContainer from '@/components/NewContainer';
import AttachmentSelect from '@/components/attachment';
import WangEditor from '@/components/editor';
import MarkdownEditor from '@/components/markdown';
import {
  getCategoryInfo,
  getDesignTemplateFiles,
  getModules,
  getSettingContent,
  saveCategory,
} from '@/services';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import {
  ProForm,
  ProFormDigit,
  ProFormInstance,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { FormattedMessage, history, useIntl } from '@umijs/max';
import { Button, Card, Col, Image, Row, message } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import '../index.less';

const categoryType = 3;

const PageCategoryDetail: React.FC = () => {
  const formRef = useRef<ProFormInstance>();
  const editorRef = useRef(null);
  const [content, setContent] = useState<string>('');
  const [categoryImages, setCategoryImages] = useState<string[]>([]);
  const [categoryLogo, setCategoryLogo] = useState<string>('');
  const [currentModule, setCurrentModule] = useState<any>({});
  const [contentSetting, setContentSetting] = useState<any>({});
  const [loaded, setLoaded] = useState<boolean>(false);
  const [category, setCategory] = useState<any>({ status: 1 });
  const [modules, setModules] = useState<any[]>([]);
  const [newKey, setNewKey] = useState<string>('');
  const intl = useIntl();

  const changeModule = (e: any) => {
    for (let item of modules) {
      if (item.id === e) {
        setCurrentModule(item);
        break;
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
    changeModule(moduleId);

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
      message.error(intl.formatMessage({ id: 'content.page.input.required' }));
      return;
    }
    let res = await saveCategory(cat);
    if (res.code === 0) {
      message.info(res.msg);
      history.back();
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
          ? intl.formatMessage({ id: 'content.page.edit' })
          : intl.formatMessage({ id: 'content.page.new' })
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
                <ProFormText
                  name="title"
                  label={intl.formatMessage({ id: 'content.page.name' })}
                />
                <ProFormTextArea
                  name="description"
                  label={intl.formatMessage({ id: 'content.page.description' })}
                />
                <ProFormText
                  name="seo_title"
                  label={intl.formatMessage({ id: 'content.seo-title.name' })}
                  placeholder={intl.formatMessage({
                    id: 'content.page.seo-title.placeholder',
                  })}
                  extra={intl.formatMessage({
                    id: 'content.page.seo-title.description',
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
                  extra={intl.formatMessage({ id: 'content.page.status.tips' })}
                />
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
                    label=""
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
                  title={intl.formatMessage({ id: 'content.page.template' })}
                >
                  <ProFormSelect
                    label=""
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
                        <FormattedMessage id="content.category.default" />:
                        page/detail.html
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

export default PageCategoryDetail;
