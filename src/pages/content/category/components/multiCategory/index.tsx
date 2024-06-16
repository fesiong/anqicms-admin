import { getCategories, saveCategory } from '@/services';
import {
  ModalForm,
  ProFormInstance,
  ProFormSelect,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { message } from 'antd';
import React, { useEffect, useState } from 'react';

export type MultiCategoryProps = {
  onCancel: (flag?: boolean) => void;
  onSubmit: (flag?: boolean) => Promise<void>;
  type: number;
  open: boolean;
  category: any;
  modules: any[];
};

const MultiCategory: React.FC<MultiCategoryProps> = (props) => {
  const formRef = React.createRef<ProFormInstance>();
  const [currentModule, setCurrentModule] = useState<any>({});
  const intl = useIntl();

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
      title={intl.formatMessage({ id: 'content.category.batch-add' })}
      initialValues={props.category}
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
        label={intl.formatMessage({ id: 'content.module.name' })}
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
        label={intl.formatMessage({ id: 'content.category.top' })}
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
          categories = [
            { id: 0, title: intl.formatMessage({ id: 'content.category.top' }), spacer: '' },
          ].concat(categories);
          return categories;
        }}
        readonly={props.category?.id || props.category?.module_id > 0 ? false : true}
        fieldProps={{
          fieldNames: {
            label: 'title',
            value: 'id',
          },
          optionItemRender(item: any) {
            return (
              <div dangerouslySetInnerHTML={{ __html: (item.spacer || '') + item.title }}></div>
            );
          },
        }}
      />
      <ProFormTextArea
        name="inputs"
        width="lg"
        label={intl.formatMessage({ id: 'content.category.batch-name' })}
        placeholder={intl.formatMessage({ id: 'content.category.batch-name.placeholder' })}
        fieldProps={{
          rows: 10,
        }}
        extra={
          <div>
            <div>
              <FormattedMessage id="content.category.batch-name.tips1" />
            </div>
            <div>
              <FormattedMessage id="content.category.batch-name.tips2" />
            </div>
            <div>
              <code>
                <div>
                  <FormattedMessage id="content.category.batch-name.tips3" />
                  <br />
                  <FormattedMessage id="content.category.batch-name.tips4" />
                </div>
              </code>
            </div>
          </div>
        }
      />
    </ModalForm>
  );
};

export default MultiCategory;
