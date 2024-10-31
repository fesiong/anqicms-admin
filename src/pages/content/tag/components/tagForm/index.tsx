import WangEditor from '@/components/editor';
import MarkdownEditor from '@/components/markdown';
import { getCategories, getSettingContent } from '@/services';
import { getTagInfo, saveTag } from '@/services/tag';
import {
  ModalForm,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import React, { useEffect, useRef, useState } from 'react';

export type TagFormProps = {
  onCancel: (flag?: boolean) => void;
  onSubmit: (flag?: boolean) => Promise<void>;
  type: number;
  open: boolean;
  tag: any;
};

const TagForm: React.FC<TagFormProps> = (props) => {
  const intl = useIntl();
  const [content, setContent] = useState<string>('');
  const [contentSetting, setContentSetting] = useState<any>({});
  const [loaded, setLoaded] = useState<boolean>(false);
  const editorRef = useRef(null);

  const initData = async () => {
    const res1 = await getTagInfo({ id: props.tag.id });
    setContent(res1?.data?.content || '');
    const res2 = await getSettingContent();
    setContentSetting(res2.data || {});
    setLoaded(true);
  };

  useEffect(() => {
    initData();
  }, []);

  const onSubmit = async (values: any) => {
    let tag = Object.assign(props.tag, values);
    tag.type = props.type;
    await saveTag(tag);

    props.onSubmit();
  };

  return loaded ? (
    <ModalForm
      width={800}
      title={
        props.tag?.id
          ? intl.formatMessage({ id: 'content.tags.edit' })
          : intl.formatMessage({ id: 'content.tags.add' })
      }
      initialValues={props.tag}
      open={props.open}
      layout="horizontal"
      onOpenChange={(flag) => {
        if (!flag) {
          props.onCancel(flag);
        }
      }}
      onFinish={async (values) => {
        onSubmit(values);
      }}
    >
      <ProFormSelect
        label={intl.formatMessage({ id: 'content.category.name' })}
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
      <ProFormText
        name="title"
        label={intl.formatMessage({ id: 'content.tags.name' })}
      />
      <ProFormText
        name="first_letter"
        label={intl.formatMessage({ id: 'content.tags.first-letter.name' })}
        placeholder={intl.formatMessage({
          id: 'content.url-token.placeholder',
        })}
        extra={intl.formatMessage({
          id: 'content.tags.first-letter.description',
        })}
      />
      <ProFormText
        name="url_token"
        label={intl.formatMessage({ id: 'content.url-token.name' })}
        placeholder={intl.formatMessage({
          id: 'content.url-token.placeholder',
        })}
        extra={intl.formatMessage({ id: 'content.url-token.tips' })}
      />
      <ProFormText
        name="seo_title"
        label={intl.formatMessage({ id: 'content.seo-title.name' })}
        placeholder={intl.formatMessage({
          id: 'content.tags.seo-title.placeholder',
        })}
        extra={intl.formatMessage({ id: 'content.tags.seo-title.description' })}
      />
      <ProFormText
        name="keywords"
        label={intl.formatMessage({ id: 'content.keywords.name' })}
        extra={intl.formatMessage({ id: 'content.keywords.description' })}
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
    </ModalForm>
  ) : null;
};

export default TagForm;
