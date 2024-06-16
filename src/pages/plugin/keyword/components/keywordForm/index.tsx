import { getCategories } from '@/services/category';
import { pluginSaveKeyword } from '@/services/plugin/keyword';
import { ModalForm, ProFormSelect, ProFormText, ProFormTextArea } from '@ant-design/pro-components';
import React from 'react';

export type KeywordFormProps = {
  onCancel: (flag?: boolean) => void;
  onSubmit: (flag?: boolean) => Promise<void>;
  open: boolean;
  editingKeyword: any;
};

const KeywordForm: React.FC<KeywordFormProps> = (props) => {
  const onSubmit = async (values: any) => {
    let editingKeyword = Object.assign(props.editingKeyword, values);
    let res = await pluginSaveKeyword(editingKeyword);

    props.onSubmit();
  };

  return (
    <ModalForm
      width={800}
      title={props.editingKeyword?.id ? '编辑关键词' : '添加关键词'}
      initialValues={props.editingKeyword}
      open={props.open}
      //layout="horizontal"
      onOpenChange={(flag) => {
        if (!flag) {
          props.onCancel(flag);
        }
      }}
      onFinish={async (values) => {
        onSubmit(values);
      }}
    >
      {props.editingKeyword?.id > 0 ? (
        <ProFormText name="title" label="关键词名称" />
      ) : (
        <ProFormTextArea
          fieldProps={{
            rows: 5,
          }}
          name="title"
          label="关键词名称"
          placeholder={'支持批量添加，一行一个关键词'}
        />
      )}
      <ProFormSelect
        label="文章分类"
        name="category_id"
        width="lg"
        request={async () => {
          let res = await getCategories({ type: 1 });
          return res.data || [];
        }}
        fieldProps={{
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
  );
};

export default KeywordForm;
