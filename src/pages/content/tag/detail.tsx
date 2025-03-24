import NewContainer from '@/components/NewContainer';
import AttachmentSelect from '@/components/attachment';
import CollapseItem from '@/components/collaspeItem';
import WangEditor from '@/components/editor';
import MarkdownEditor from '@/components/markdown';
import {
  getCategories,
  getDesignTemplateFiles,
  getSettingContent,
  getTagFields,
  getTagInfo,
  saveTag,
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
import { Button, Card, Col, Image, Row, message } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import './index.less';

const ArchiveTagDetail: React.FC = () => {
  const formRef = useRef<ProFormInstance>();
  const intl = useIntl();
  const [content, setContent] = useState<string>('');
  const [contentSetting, setContentSetting] = useState<any>({});
  const [loaded, setLoaded] = useState<boolean>(false);
  const [tag, setTag] = useState<any>({});
  const [tagLogo, setTagLogo] = useState<string>('');
  const [newKey, setNewKey] = useState<string>('');
  const [tagFields, setTagFields] = useState<any>([]);
  const [extraContent, setExtraContent] = useState<any>({});
  const editorRef = useRef(null);

  const initData = async () => {
    const searchParams = new URLSearchParams(window.location.search);
    let id = searchParams.get('id') || 0;
    if (id === 'new') {
      id = 0;
    }
    const res1 = await getTagInfo({ id: id });
    const tag = res1?.data || {};
    if (typeof tag.extra === 'undefined' || tag.extra === null) {
      tag.extra = {};
    }
    console.log(typeof tag.extra);
    setTag(tag);
    setTagLogo(res1?.data?.logo || '');
    setContent(res1?.data?.content || '');
    const resTag = await getTagFields();
    const tagFields = resTag?.data || [];
    setTagFields(tagFields);
    let extraContent: any = {};
    // eslint-disable-next-line guard-for-in
    for (let i in tagFields) {
      let field = tagFields[i];
      if (field.type === 'editor') {
        extraContent[field.field_name] = tag.extra?.[field.field_name] || '';
      }
    }
    setExtraContent(extraContent);

    const res2 = await getSettingContent();
    setContentSetting(res2.data || {});
    setLoaded(true);
  };

  useEffect(() => {
    initData();
  }, []);

  const onTabChange = (key: string) => {
    setLoaded(false);
    initData().then(() => {
      setNewKey(key);
    });
  };

  const handleSelectLogo = (row: any) => {
    setTagLogo(row.logo);
    message.success(
      intl.formatMessage({ id: 'setting.system.upload-success' }),
    );
  };

  const handleCleanLogo = (e: any) => {
    e.stopPropagation();
    setTagLogo('');
  };

  const onSubmit = async (values: any) => {
    let tagInfo = Object.assign(tag, values);
    tagInfo.content = content;
    tagInfo.logo = tagLogo;
    if (tagInfo.title === '') {
      message.error(intl.formatMessage({ id: 'content.title.required' }));
      return;
    }
    // eslint-disable-next-line guard-for-in
    for (let field in extraContent) {
      if (!tagInfo.extra?.[field]) {
        tagInfo.extra[field] = null;
      }
      tagInfo.extra[field] = extraContent[field];
    }
    const res = await saveTag(tagInfo);
    if (res.code === 0) {
      message.info(res.msg);
      history.back();
    } else {
      message.error(res.msg);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 's' && (event.ctrlKey || event.metaKey)) {
      const values = formRef.current?.getFieldsFormatValue?.();
      // 自动保存
      onSubmit(values);

      event.preventDefault();
    }
  };

  const handleCleanExtraField = (field: string) => {
    const extra: any = {};
    extra[field] = null;
    formRef.current?.setFieldsValue({ extra });

    delete tag.extra[field];
    setTag(tag);
  };

  const handleUploadExtraField = (field: string, row: any) => {
    const extra: any = {};
    extra[field] = row.logo;
    formRef.current?.setFieldsValue({ extra });
    if (!tag.extra[field]) {
      tag.extra[field] = null;
    }
    tag.extra[field] = row.logo;

    setTag(tag);
  };

  const handleCleanExtraFieldItem = (field: string, index: number) => {
    tag.extra[field]?.splice(index, 1);
    const extra: any = {};
    extra[field] = tag.extra[field];
    formRef?.current?.setFieldsValue({ extra });

    setTag(Object.assign({}, tag));
  };

  const handleUploadExtraFieldItem = (field: string, rows: any) => {
    console.log(tag.extra);
    if (!tag.extra[field]) {
      tag.extra[field] = [];
    }
    for (const row of rows) {
      let exists = false;
      for (const i in tag.extra[field]) {
        if (tag.extra[field][i] === row.logo) {
          exists = true;
          break;
        }
      }
      if (!exists) {
        tag.extra[field].push(row.logo);
      }
    }
    const extra: any = {};
    extra[field] = tag.extra[field];
    formRef?.current?.setFieldsValue({ extra });

    setTag(Object.assign({}, tag));
  };

  const updateExtraContent = async (field: string, html: string) => {
    extraContent[field] = html;
    setExtraContent(extraContent);
  };

  return (
    <NewContainer
      onTabChange={(key) => onTabChange(key)}
      title={
        tag.id > 0
          ? intl.formatMessage({ id: 'content.tags.edit' })
          : intl.formatMessage({ id: 'content.tags.add' })
      }
    >
      <Card key={newKey} onKeyDown={handleKeyDown}>
        {loaded && (
          <ProForm
            formRef={formRef}
            initialValues={tag}
            layout="horizontal"
            onFinish={onSubmit}
          >
            <Row gutter={20}>
              <Col sm={18} xs={24}>
                <ProFormText
                  name="title"
                  label={intl.formatMessage({ id: 'content.tags.name' })}
                />
                <ProFormText
                  name="keywords"
                  label={intl.formatMessage({ id: 'content.keywords.name' })}
                  extra={intl.formatMessage({
                    id: 'content.keywords.description',
                  })}
                />
                <ProFormTextArea
                  name="description"
                  label={intl.formatMessage({ id: 'content.description.name' })}
                />
                {tagFields && (
                  <CollapseItem
                    header={intl.formatMessage({
                      id: 'content.param.extra-fields',
                    })}
                    open
                    showArrow
                    key="2"
                  >
                    <Row gutter={20}>
                      {tagFields.map(
                        (item: any, index: number) =>
                          item.type !== 'editor' && (
                            <Col sm={12} xs={24} key={index}>
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
                                ''
                              ) : item.type === 'radio' ? (
                                <ProFormRadio.Group
                                  name={['extra', item.field_name]}
                                  label={item.name}
                                  request={async () => {
                                    const tmpData = item.content.split('\n');
                                    const data = [];
                                    for (const item1 of tmpData) {
                                      data.push({
                                        label: item1,
                                        value: item1,
                                      });
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
                                      data.push({
                                        label: item1,
                                        value: item1,
                                      });
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
                                      data.push({
                                        label: item1,
                                        value: item1,
                                      });
                                    }
                                    return data;
                                  }}
                                />
                              ) : item.type === 'image' ? (
                                <ProFormText
                                  name={['extra', item.field_name]}
                                  label={item.name}
                                >
                                  {tag.extra?.[item.field_name] ? (
                                    <div className="ant-upload-item">
                                      <Image
                                        preview={{
                                          src: tag.extra[item.field_name],
                                        }}
                                        src={tag.extra[item.field_name]}
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
                                        handleUploadExtraField(
                                          item.field_name,
                                          row,
                                        )
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
                              ) : item.type === 'images' ? (
                                <ProFormText
                                  name={['extra', item.field_name]}
                                  label={item.name}
                                >
                                  {tag.extra?.[item.field_name]?.length
                                    ? tag.extra[item.field_name]?.map(
                                        (inner: string, idx: number) => (
                                          <div
                                            className="ant-upload-item"
                                            key={idx}
                                          >
                                            <Image
                                              preview={{
                                                src: inner,
                                              }}
                                              src={inner}
                                            />
                                            <span
                                              className="delete"
                                              onClick={() =>
                                                handleCleanExtraFieldItem(
                                                  item.field_name,
                                                  idx,
                                                )
                                              }
                                            >
                                              <DeleteOutlined />
                                            </span>
                                          </div>
                                        ),
                                      )
                                    : null}
                                  <AttachmentSelect
                                    onSelect={(rows) =>
                                      handleUploadExtraFieldItem(
                                        item.field_name,
                                        rows,
                                      )
                                    }
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
                                </ProFormText>
                              ) : item.type === 'file' ? (
                                <ProFormText
                                  name={['extra', item.field_name]}
                                  label={item.name}
                                >
                                  {tag.extra?.[item.field_name] ? (
                                    <div className="ant-upload-item ant-upload-file">
                                      <span>{tag.extra[item.field_name]}</span>
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
                                        handleUploadExtraField(
                                          item.field_name,
                                          row,
                                        )
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
                    </Row>
                    {tagFields.map(
                      (item: any, index: number) =>
                        item.type === 'editor' && (
                          <ProFormText
                            key={index}
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
                        ),
                    )}
                  </CollapseItem>
                )}
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
              </Col>
              <Col sm={6} xs={24}>
                <div className="mb-normal">
                  <Row gutter={[16, 16]}>
                    <Col span={12}>
                      <Button
                        block
                        type="primary"
                        onClick={() => {
                          onSubmit(formRef.current?.getFieldsFormatValue?.());
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
                  title={intl.formatMessage({ id: 'content.category.name' })}
                >
                  <ProFormSelect
                    showSearch
                    name="category_id"
                    request={async () => {
                      const res = await getCategories({ type: 1 });
                      const categories = (res.data || []).map((cat: any) => ({
                        spacer: cat.spacer,
                        label:
                          cat.title +
                          (cat.status === 1
                            ? ''
                            : intl.formatMessage({
                                id: 'setting.nav.hide',
                              })),
                        value: cat.id,
                      }));
                      return [
                        {
                          spacer: '',
                          label: intl.formatMessage({
                            id: 'content.category.top',
                          }),
                          value: 0,
                        },
                      ].concat(categories);
                    }}
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
                    }}
                  />
                </Card>
                <Card
                  className="aside-card"
                  size="small"
                  title={intl.formatMessage({ id: 'content.category.thumb' })}
                >
                  {tagLogo ? (
                    <div className="ant-upload-item">
                      <Image
                        preview={{
                          src: tagLogo,
                        }}
                        src={tagLogo}
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
                  title={intl.formatMessage({ id: 'content.seo-title.name' })}
                >
                  <ProFormText
                    name="seo_title"
                    placeholder={intl.formatMessage({
                      id: 'content.tags.seo-title.placeholder',
                    })}
                    extra={intl.formatMessage({
                      id: 'content.tags.seo-title.description',
                    })}
                  />
                </Card>
                <Card
                  className="aside-card"
                  size="small"
                  title={intl.formatMessage({
                    id: 'content.tags.first-letter.name',
                  })}
                >
                  <ProFormText
                    name="first_letter"
                    placeholder={intl.formatMessage({
                      id: 'content.url-token.placeholder',
                    })}
                    extra={intl.formatMessage({
                      id: 'content.tags.first-letter.description',
                    })}
                  />
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
                        tag/list.html
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

export default ArchiveTagDetail;
