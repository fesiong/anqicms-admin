import WangEditor from '@/components/editor';
import { pluginGetMaterialCategories, pluginSaveMaterial } from '@/services/plugin/material';
import { ModalForm, ProFormSelect } from '@ant-design/pro-components';
import React, { useState } from 'react';

export type MaterialFormProps = {
  onCancel: (flag?: boolean) => void;
  onSubmit: (flag?: boolean) => Promise<void>;
  open: boolean;
  editingMaterial: any;
};

const MaterialForm: React.FC<MaterialFormProps> = (props) => {
  const [content, setContent] = useState<string>('');

  const onSubmit = async (values: any) => {
    let editingMaterial = Object.assign(props.editingMaterial, values);
    editingMaterial.content = content;
    let res = await pluginSaveMaterial(editingMaterial);

    props.onSubmit();
  };

  return (
    <ModalForm
      width={800}
      title={'编辑内容素材'}
      initialValues={props.editingMaterial}
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
      <ProFormSelect
        label="素材板块"
        name="category_id"
        width="lg"
        request={async () => {
          let res = await pluginGetMaterialCategories({});
          return res.data || [];
        }}
        fieldProps={{
          fieldNames: {
            label: 'title',
            value: 'id',
          },
          optionItemRender(item: any) {
            return item.title;
          },
        }}
      />
      <WangEditor
        className="mb-normal"
        setContent={async (html: string) => {
          setContent(html);
        }}
        key="content"
        field="content"
        content={props.editingMaterial.content}
      />
    </ModalForm>
  );
};

export default MaterialForm;
