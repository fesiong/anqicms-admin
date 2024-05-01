import { message, Image, Card, Row, Col, Button } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProForm, {
  ProFormDigit,
  ProFormInstance,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-form';
import {
  getCategories,
  getCategoryInfo,
  getDesignTemplateFiles,
  getModules,
  getSettingContent,
  saveCategory,
} from '@/services';
import '../index.less';
import { history } from 'umi';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import WangEditor from '@/components/editor';
import AttachmentSelect from '@/components/attachment';
import MarkdownEditor from '@/components/markdown';

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

  useEffect(() => {
    initData();
  }, []);

  const initData = async () => {
    let id = history.location.query?.id || 0;
    if (id == 'new') {
      id = 0;
    }
    let parent_id = Number(history.location.query?.parent_id || 0);

    let modRes = await getModules();
    setModules(modRes.data || []);
    let catRes = await getCategoryInfo({
      id: id,
    });
    let cat = catRes.data || { status: 1, parent_id: parent_id };
    let moduleId = cat.module_id || 1;
    if (Number(parent_id) > 0) {
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

    console.log(cat);

    setContent(cat.content || '');
    setCategoryImages(cat.images || []);
    setCategoryLogo(cat.logo || '');

    getSettingContent().then((res) => {
      setContentSetting(res.data || {});
      setLoaded(true);
    });
  };

  const onSubmit = async (values: any) => {
    let cat = Object.assign(category, values);
    cat.content = content;
    cat.type = categoryType;
    cat.images = categoryImages;
    cat.logo = categoryLogo;
    if (cat.title == '') {
      message.error('请填写分类名称');
      return;
    }
    let res = await saveCategory(cat);
    if (res.code === 0) {
      message.info(res.msg);
      history.goBack();
    } else {
      message.error(res.msg);
    }
  };

  const handleSelectImages = (row: any) => {
    let exists = false;

    for (let i in categoryImages) {
      if (categoryImages[i] == row.logo) {
        exists = true;
        break;
      }
    }
    if (!exists) {
      categoryImages.push(row.logo);
    }
    setCategoryImages([].concat(categoryImages));
    message.success('上传完成');
  };

  const handleCleanImages = (index: number, e: any) => {
    e.stopPropagation();
    categoryImages.splice(index, 1);
    setCategoryImages([].concat(categoryImages));
  };

  const handleSelectLogo = (row: any) => {
    setCategoryLogo(row.logo);
    message.success('上传完成');
  };

  const handleCleanLogo = (e: any) => {
    e.stopPropagation();
    setCategoryLogo('');
  };

  const changeModule = (e: any) => {
    for (let item of modules) {
      if (item.id == e) {
        setCurrentModule(item);
        break;
      }
    }
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
    <PageContainer title={(category.id > 0 ? '修改' : '添加') + '页面'}>
      <Card onKeyDown={handleKeyDown}>
        {loaded && (
          <ProForm
            formRef={formRef}
            initialValues={category}
            layout="horizontal"
            onFinish={onSubmit}
          >
            <Row gutter={20}>
              <Col sm={18} xs={24}>
                <ProFormText name="title" label="页面名称" />
                <ProFormTextArea name="description" label="页面简介" />
                <ProFormText
                  name="seo_title"
                  label="SEO标题"
                  placeholder="默认为页面名称，无需填写"
                  extra="注意：如果你希望页面的title标签的内容不是页面名称，可以通过SEO标题设置"
                />
                <ProFormText name="keywords" label="关键词" extra="你可以单独设置关键词" />
                <ProFormRadio.Group
                  name="status"
                  label="显示状态"
                  options={[
                    {
                      value: 0,
                      label: '隐藏',
                    },
                    {
                      value: 1,
                      label: '显示',
                    },
                  ]}
                  extra="设置隐藏后，前台不会出现这个页面"
                />
                {loaded && (
                  <>
                    {contentSetting.editor == 'markdown' ? (
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
                        提交
                      </Button>
                    </Col>
                    <Col span={12}>
                      <Button
                        block
                        onClick={() => {
                          history.goBack();
                        }}
                      >
                        返回
                      </Button>
                    </Col>
                  </Row>
                </div>
                <Card className="aside-card" size="small" title="Banner图">
                  {categoryImages.length
                    ? categoryImages.map((item: string, index: number) => (
                        <div className="ant-upload-item" key={index}>
                          <Image
                            preview={{
                              src: item,
                            }}
                            src={item}
                          />
                          <span className="delete" onClick={handleCleanImages.bind(this, index)}>
                            <DeleteOutlined />
                          </span>
                        </div>
                      ))
                    : null}
                  <AttachmentSelect onSelect={handleSelectImages} visible={false}>
                    <div className="ant-upload-item">
                      <div className="add">
                        <PlusOutlined />
                        <div style={{ marginTop: 8 }}>上传</div>
                      </div>
                    </div>
                  </AttachmentSelect>
                </Card>
                <Card className="aside-card" size="small" title="缩略图">
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
                    <AttachmentSelect onSelect={handleSelectLogo} visible={false}>
                      <div className="ant-upload-item">
                        <div className="add">
                          <PlusOutlined />
                          <div style={{ marginTop: 8 }}>上传</div>
                        </div>
                      </div>
                    </AttachmentSelect>
                  )}
                </Card>
                <Card className="aside-card" size="small" title="URL别名">
                  <ProFormText
                    name="url_token"
                    label=""
                    placeholder="默认会自动生成，无需填写"
                    extra="注意：URL别名只能填写字母、数字和下划线，不能带空格"
                  />
                </Card>
                <Card className="aside-card" size="small" title="显示顺序">
                  <ProFormDigit name="sort" extra={'默认99，数字越小越靠前'} />
                </Card>
                <Card className="aside-card" size="small" title="页面模板">
                  <ProFormSelect
                    label=""
                    showSearch
                    name="template"
                    request={async () => {
                      const res = await getDesignTemplateFiles({});
                      const data = [{ path: '', remark: '默认模板' }].concat(res.data || []);
                      for (const i in data) {
                        if (!data[i].remark) {
                          data[i].remark = data[i].path;
                        } else {
                          data[i].remark = data[i].path + '(' + data[i].remark + ')';
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
                    extra={<div>页面默认值：page/detail.html</div>}
                  />
                </Card>
              </Col>
            </Row>
          </ProForm>
        )}
      </Card>
    </PageContainer>
  );
};

export default PageCategoryDetail;
