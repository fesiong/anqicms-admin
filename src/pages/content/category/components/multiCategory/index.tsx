import React, { useEffect, useState } from 'react';
import { ModalForm, ProFormInstance, ProFormSelect, ProFormTextArea } from '@ant-design/pro-form';

import { getCategories, saveCategory } from '@/services';
import { message } from 'antd';

export type CategoryFormProps = {
  onCancel: (flag?: boolean) => void;
  onSubmit: (flag?: boolean) => Promise<void>;
  type: number;
  visible: boolean;
  category: any;
  modules: any[];
};

const CategoryForm: React.FC<CategoryFormProps> = (props) => {
  const formRef = React.createRef<ProFormInstance>();
  const [currentModule, setCurrentModule] = useState<any>({});

  useEffect(() => {
    let moduleId = props.category?.module_id || 1;
    changeModule(moduleId);
  }, []);

  const onSubmit = async (values: any) => {
    let categoryData = {
      parent_id: values.parent_id,
      module_id: values.module_id,
      type: props.type,
      title: '',
      url_token: '',
      status: 1,
    };
    let splitData = values.inputs.split('\n');
    for (let item of splitData) {
      let names = item.trim().split('|');
      categoryData.title = names[0];
      categoryData.url_token = '';
      if (names.length > 1) {
        categoryData.url_token = names[1];
      }
      if (categoryData.title.length > 0) {
        let res = await saveCategory(categoryData);
        message.info(res.msg);
      }
    }
    props.onSubmit();
  };

  const changeModule = (e: any) => {
    for (let item of props.modules) {
      if (item.id == e) {
        setCurrentModule(item);
        break;
      }
    }
  };

  return (
    <ModalForm
      formRef={formRef}
      width={600}
      title={'批量添加分类'}
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
      <ProFormSelect
        label="内容模型"
        name="module_id"
        width="lg"
        request={async () => {
          return props.modules;
        }}
        readonly={props.category?.id || props.category?.module_id > 0 ? true : false}
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
        label="上级分类"
        name="parent_id"
        width="lg"
        request={async () => {
          let res = await getCategories({ type: props.type });
          let categories = res.data || [];
          // 排除自己
          if (props.category.id) {
            let tmpCategory = [];
            for (let i in categories) {
              if (
                categories[i].id == props.category.id ||
                categories[i].parent_id == props.category.id ||
                categories[i].module_id != props.category.module_id
              ) {
                continue;
              }
              tmpCategory.push(categories[i]);
            }
            categories = tmpCategory;
          }
          categories = [{ id: 0, title: '顶级分类', spacer: '' }].concat(categories);
          return categories;
        }}
        readonly={props.category?.id || props.category?.module_id > 0 ? false : true}
        fieldProps={{
          fieldNames: {
            label: 'title',
            value: 'id',
          },
          optionItemRender(item) {
            return (
              <div dangerouslySetInnerHTML={{ __html: (item.spacer || '') + item.title }}></div>
            );
          },
        }}
      />
      <ProFormTextArea
        name="inputs"
        width="lg"
        label="批量分类名称"
        placeholder="如：使用帮助|help"
        fieldProps={{
          rows: 10,
        }}
        extra={
          <div>
            <div>可以批量输入分类名称，一行一个。</div>
            <div>如需自定义分类URL别名，请用竖线|与分类名称隔开。 如：</div>
            <div>
              <code>
                <div>
                  使用帮助|help
                  <br />
                  文档中心
                </div>
              </code>
            </div>
          </div>
        }
      />
    </ModalForm>
  );
};

export default CategoryForm;
