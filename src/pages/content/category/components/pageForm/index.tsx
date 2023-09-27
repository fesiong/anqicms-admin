import React, { useEffect, useRef, useState } from 'react';
import {
  ModalForm,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-form';

import { saveCategory } from '@/services/category';
import WangEditor from '@/components/editor';
import { Image, message, Collapse } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import AttachmentSelect from '@/components/attachment';
import MarkdownEditor from '@/components/markdown';
import { getDesignTemplateFiles, getSettingContent } from '@/services';

export type CategoryFormProps = {
  onCancel: (flag?: boolean) => void;
  onSubmit: (flag?: boolean) => Promise<void>;
  type: number;
  visible: boolean;
  category: any;
};

const PageForm: React.FC<CategoryFormProps> = (props) => {
  const editorRef = useRef(null);
  const [content, setContent] = useState<string>('');
  const [categoryImages, setCategoryImages] = useState<string[]>([]);
  const [categoryLogo, setCategoryLogo] = useState<string>('');
  const [contentSetting, setContentSetting] = useState<any>({});
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    setCategoryImages(props.category?.images || []);
    setCategoryLogo(props.category?.logo || '');
    getSettingContent().then((res) => {
      setContentSetting(res.data || {});
      setLoaded(true);
    });
  }, []);

  const onSubmit = async (values: any) => {
    let category = Object.assign(props.category, values);
    category.content = content;
    category.type = props.type;
    category.images = categoryImages;
    category.logo = categoryLogo;
    let res = await saveCategory(category);
    message.info(res.msg);

    props.onSubmit();
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

  return (
    <ModalForm
      width={900}
      title={props.category?.id ? '编辑页面' : '添加页面'}
      initialValues={props.category}
      visible={props.visible}
      layout="horizontal"
      onVisibleChange={(flag) => {
        if (!flag) {
          props.onCancel(flag);
        }
      }}
      onFinish={async (values) => {
        onSubmit(values);
      }}
    >
      <ProFormText name="title" label="页面名称" />
      <ProFormTextArea name="description" label="页面简介" />
      <ProFormText
        name="url_token"
        label="URL别名"
        placeholder="默认会自动生成，无需填写"
        extra="注意：URL别名只能填写字母、数字和下划线，不能带空格"
      />
      <Collapse>
        <Collapse.Panel header="其他参数" key="1">
          <ProFormText
            name="seo_title"
            label="SEO标题"
            placeholder="默认为页面名称，无需填写"
            extra="注意：如果你希望页面的title标签的内容不是页面名称，可以通过SEO标题设置"
          />
          <ProFormText name="keywords" label="关键词" extra="你可以单独设置关键词" />
          <ProFormDigit name="sort" label="显示顺序" extra={'默认99，数字越小越靠前'} />
          <ProFormSelect
            label="页面模板"
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
          <ProFormText label="Banner图">
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
          </ProFormText>
          <ProFormText label="缩略图">
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
          </ProFormText>
        </Collapse.Panel>
      </Collapse>
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
              content={props.category.content}
            />
          )}
        </>
      )}
    </ModalForm>
  );
};

export default PageForm;
