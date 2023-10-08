import React, { useEffect, useState } from 'react';
import {
  ModalForm,
  ProFormCheckbox,
  ProFormDateTimePicker,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-form';

import { getArchiveInfo, getCategories, getSettingContent, getTags, saveArchive } from '@/services';
import { message, Row, Col, Modal } from 'antd';
import { history } from 'umi';
import moment from 'moment';

export type CategoryFormProps = {
  onCancel: (flag?: boolean) => void;
  onSubmit: (flag?: boolean) => Promise<void>;
  visible: boolean;
  archive: any;
};

const QuickEditForm: React.FC<CategoryFormProps> = (props) => {
  const [searchedTags, setSearchedTags] = useState<any>({});
  const [contentSetting, setContentSetting] = useState<any>({});
  const [archive, setArchive] = useState<any>({});
  const [fetched, setFetched] = useState<boolean>(false);

  useEffect(() => {
    getArchive(props.archive.id);
    getSettingContent().then((res) => {
      setContentSetting(res.data || {});
    });
  }, []);

  const getArchive = async (id: number) => {
    const res = await getArchiveInfo({
      id: id,
    });
    const data = res.data || { extra: {}, flag: null };
    data.flag = data.flag?.split(',') || [];
    data.created_moment = moment(data.created_time * 1000);
    setArchive(data);
    setFetched(true);
  };

  const onSubmit = async (values: any) => {
    let postData = Object.assign(archive, values);
    if (postData.title == '') {
      message.error('请填写标题');
      return;
    }
    let categoryIds = [];
    let categoryId = 0;
    if (typeof values.category_ids == 'number') {
      // 单分类
      categoryId = Number(values.category_ids);
    } else {
      for (let i in values.category_ids) {
        if (values.category_ids[i] > 0) {
          categoryIds.push(values.category_ids[i]);
        }
      }
      if (categoryIds.length > 0) {
        categoryId = categoryIds[0];
      }
    }
    if (categoryId == 0) {
      message.error('请选择文档分类');
      return;
    }
    postData.category_id = categoryId;
    postData.category_ids = categoryIds;
    if (typeof postData.flag === 'object') {
      postData.flag = postData.flag.join(',');
    }
    // 保留，防止低版本出问题
    postData.content = archive.data?.content || '';
    // 标记为快速保存
    postData.quick_save = true;
    const hide = message.loading('正在提交中', 0);
    const res = await saveArchive(postData);
    hide();
    if (res.code != 0) {
      message.error(res.msg);
    } else {
      message.success(res.msg);
    }
    props.onSubmit();
  };

  const onChangeTagInput = (e: any) => {
    const value = e.target?.value || '';
    getTags({
      type: 1,
      title: value,
      pageSize: 10,
    }).then((res) => {
      const data = res.data || [];
      const result: any = {};
      for (const item of data) {
        result[item.title] = item.title;
      }
      setSearchedTags(result);
    });
  };

  return (
    fetched && (
      <ModalForm
        width={900}
        title={'快速编辑'}
        initialValues={archive}
        visible={props.visible}
        layout="vertical"
        onVisibleChange={(flag) => {
          if (!flag) {
            props.onCancel(flag);
          }
        }}
        onFinish={async (values) => {
          onSubmit(values);
        }}
      >
        <Row gutter={16}>
          <Col span={12}>
            <ProFormText name="title" label={'文档标题'} />
            <ProFormText name="keywords" label="文档关键词" />
            <ProFormTextArea name="description" label="文档简介" />
            <ProFormCheckbox.Group
              name="flag"
              label="推荐属性"
              valueEnum={{
                h: '头条[h]',
                c: '推荐[c]',
                f: '幻灯[f]',
                a: '特荐[a]',
                s: '滚动[s]',
                b: '加粗[b]',
                p: '图片[p]',
                j: '跳转[j]',
              }}
            />
          </Col>
          <Col span={12}>
            <ProFormSelect
              label="所属分类"
              showSearch
              name="category_ids"
              width="lg"
              mode={contentSetting.multi_category == 1 ? 'multiple' : ''}
              request={async () => {
                const res = await getCategories({ type: 1 });
                const categories = res.data || [];
                if (categories.length == 0) {
                  Modal.error({
                    title: '请先创建分类，再来发布文档',
                    onOk: () => {
                      history.push('/archive/category');
                    },
                  });
                }
                return categories;
              }}
              fieldProps={{
                fieldNames: {
                  label: 'title',
                  value: 'id',
                },
                optionItemRender(item) {
                  return <div dangerouslySetInnerHTML={{ __html: item.spacer + item.title }}></div>;
                },
              }}
            />
            <ProFormSelect
              label="Tag标签"
              mode="tags"
              name="tags"
              valueEnum={searchedTags}
              placeholder="可以输入或选择标签，多个标签可用,分隔"
              fieldProps={{
                tokenSeparators: [',', '，'],
                onInputKeyDown: onChangeTagInput,
                onFocus: onChangeTagInput,
              }}
              extra="可以输入或选择标签，多个标签可用,分隔"
            />
            <ProFormText
              label="URL别名"
              name="url_token"
              placeholder="默认会自动生成，无需填写"
              extra="注意：URL别名只能填写字母、数字和下划线，不能带空格"
            />
            <ProFormDateTimePicker
              name="created_moment"
              placeholder="默认会自动生成，无需填写"
              extra="如果你选择的是未来的时间，则会被放入到待发布列表，等待时间到了才会正式发布"
              transform={(value) => {
                return {
                  created_time: value ? moment(value).unix() : 0,
                };
              }}
            />
          </Col>
        </Row>
      </ModalForm>
    )
  );
};

export default QuickEditForm;
