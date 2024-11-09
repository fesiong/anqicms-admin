import NewContainer from '@/components/NewContainer';
import AttachmentSelect from '@/components/attachment';
import WangEditor from '@/components/editor';
import MarkdownEditor from '@/components/markdown';
import {
  getCategories,
  getDesignTemplateFiles,
  getSettingContent,
  getTagInfo,
  saveTag,
} from '@/services';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import {
  ProForm,
  ProFormInstance,
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
  const editorRef = useRef(null);

  const initData = async () => {
    const searchParams = new URLSearchParams(window.location.search);
    let id = searchParams.get('id') || 0;
    if (id === 'new') {
      id = 0;
    }
    const res1 = await getTagInfo({ id: id });
    setTag(res1?.data || {});
    setTagLogo(res1?.data?.logo || '');
    setContent(res1?.data?.content || '');
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
