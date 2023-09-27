import { forwardRef, useImperativeHandle } from 'react';
import './index.less';
import { message, Modal, Image, Avatar } from 'antd';
import { getAttachmentCategories, getAttachments, uploadAttachment } from '@/services';
import gfm from '@bytemd/plugin-gfm';
import pmath from '@bytemd/plugin-math';
import mermaid from '@bytemd/plugin-mermaid';
import { Editor } from '@bytemd/react';
import 'bytemd/dist/index.css';
import zhHans from 'bytemd/locales/zh_Hans.json';
import { BytemdPlugin } from 'bytemd';
import ProList from '@ant-design/pro-list';

export type MarkdownEditorProps = {
  className: string;
  content: string;
  setContent: (html: any) => Promise<void>;
  ref: any;
};

export function attachPlugin(): BytemdPlugin {
  return {
    actions: [
      {
        title: '图片库',
        icon: '<svg t="1695784255158" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4033" width="16" height="16"><path d="M416 266.538667m-96 0a96 96 0 1 0 192 0 96 96 0 1 0-192 0Z" p-id="4034" fill="#010000"></path><path d="M721.749333 371.626667A43.818667 43.818667 0 0 0 682.666667 348.074667a42.965333 42.965333 0 0 0-38.058667 25.002666l-66.474667 146.517334a10.624 10.624 0 0 1-18.005333 2.261333l-34.986667-43.690667a42.666667 42.666667 0 0 0-34.688-16.042666 42.965333 42.965333 0 0 0-33.578666 18.176L323.84 670.293333a21.333333 21.333333 0 0 0 17.493333 33.706667h512a21.333333 21.333333 0 0 0 18.133334-10.112 21.333333 21.333333 0 0 0 0.938666-20.736z" p-id="4035" fill="#010000"></path><path d="M938.666667 0H234.666667a85.333333 85.333333 0 0 0-85.333334 85.333333v704a85.333333 85.333333 0 0 0 85.333334 85.333334H938.666667a85.333333 85.333333 0 0 0 85.333333-85.333334V85.333333a85.333333 85.333333 0 0 0-85.333333-85.333333z m-6.186667 783.104a21.333333 21.333333 0 0 1-15.104 6.229333H256a21.333333 21.333333 0 0 1-21.333333-21.333333V106.666667A21.333333 21.333333 0 0 1 256 85.333333h661.333333a21.333333 21.333333 0 0 1 21.333334 21.333334V768a21.333333 21.333333 0 0 1-6.186667 14.976z" p-id="4036" fill="#010000"></path><path d="M832 938.666667h-725.333333a21.333333 21.333333 0 0 1-21.333334-21.333334v-725.333333a42.666667 42.666667 0 0 0-85.333333 0V938.666667a85.333333 85.333333 0 0 0 85.333333 85.333333h746.666667a42.666667 42.666667 0 0 0 0-85.333333z" p-id="4037" fill="#010000"></path></svg>', // 16x16 SVG icon
        handler: {
          type: 'action',
          click({ appendBlock, editor }) {
            const useImage = (item: any) => {
              materialModal?.destroy();
              appendBlock(`![${item.file_name}](${item.logo})`);
              editor.focus();
            };

            const materialModal = Modal.confirm({
              width: 800,
              icon: '',
              okButtonProps: {
                className: 'hidden',
              },
              className: 'material-modal',
              onOk: () => {},
              content: (
                <ProList<any>
                  className="material-table"
                  rowKey="id"
                  request={(params) => {
                    // params.category_id = categoryId;
                    // params.q = keyword;
                    return getAttachments(params);
                  }}
                  grid={{ gutter: 16, column: 6 }}
                  pagination={{
                    defaultPageSize: 18,
                  }}
                  showActions="hover"
                  showExtra="hover"
                  search={{
                    span: 12,
                    labelWidth: 120,
                  }}
                  rowClassName="image-row"
                  metas={{
                    content: {
                      search: false,
                      render: (text: any, row: any) => {
                        return (
                          <div className="image-item">
                            <div className="inner" title={row.file_name}>
                              {row.thumb ? (
                                <Image
                                  className="img"
                                  preview={{
                                    src: row.logo,
                                  }}
                                  src={row.thumb}
                                  alt={row.file_name}
                                />
                              ) : (
                                <a href={row.logo} target={'_blank'}>
                                  <Avatar className="default-img" size={100}>
                                    {row.file_location.substring(
                                      row.file_location.lastIndexOf('.'),
                                    )}
                                  </Avatar>
                                </a>
                              )}
                              <div className="info name">{row.file_name}</div>
                              <div
                                className="info link"
                                onClick={() => {
                                  useImage(row);
                                }}
                              >
                                点击使用
                              </div>
                            </div>
                          </div>
                        );
                      },
                    },
                    category_id: {
                      title: '分类筛选',
                      valueType: 'select',
                      request: async () => {
                        let res = await getAttachmentCategories();
                        let data = [{ value: 0, label: '全部' }];
                        for (let i in res.data) {
                          data.push({ value: res.data[i].id, label: res.data[i].title });
                        }

                        return data;
                      },
                    },
                  }}
                />
              ),
            });

            editor.focus();
          },
        },
      },
    ],
  };
}

const plugins = [gfm(), pmath(), mermaid(), attachPlugin()];

const MarkdownEditor: React.FC<MarkdownEditorProps> = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    setInnerContent: setInnerContent,
  }));
  function setInnerContent(content: string) {
    // how to set
    // setValue(content);
  }

  const handleUpload = async (files: File[]) => {
    let result: any[] = [];

    const hide = message.loading('插入中...', 0);
    for (let i in files) {
      let formData = new FormData();
      formData.append('file', files[i]);
      let res = await uploadAttachment(formData);
      if (res.code !== 0) {
        message.info(res.msg);
      } else {
        result.push({
          url: res.data.logo,
        });
      }
    }
    hide();
    return result;
  };

  return (
    <div
      className={'editor-container ' + props.className}
      style={{ border: '1px solid #ccc', marginTop: '10px' }}
    >
      <Editor
        value={props.content}
        plugins={plugins}
        locale={zhHans}
        onChange={(v) => {
          props.setContent(v);
        }}
        uploadImages={handleUpload}
      />
    </div>
  );
});

export default MarkdownEditor;
