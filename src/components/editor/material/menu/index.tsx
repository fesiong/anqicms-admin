import ProList from '@ant-design/pro-list';
import { pluginGetMaterialCategories, pluginGetMaterials } from '@/services/plugin/material';
import { Modal, Space, Tag } from 'antd';
import './index.less';
import { FileSearchOutlined, PlusSquareOutlined } from '@ant-design/icons';
import E from 'wangeditor';
const { $, BtnMenu, DropListMenu, PanelMenu, DropList, Panel, Tooltip } = E;

//【注意】需要把自定义的 Element 引入到最外层的 custom-types.d.ts

export type MaterialElement = {
  type: 'material';
  id: string;
  title: string;
  content: string;
};

// 定义菜单 class
export class MaterialMenu extends BtnMenu {
  constructor(editor: any) {
    // data-title属性表示当鼠标悬停在该按钮上时提示该按钮的功能简述
    const $elem = E.$(
      `<div class="w-e-menu" data-title="插入内容素材">
      <svg viewBox="64 64 896 896" focusable="false" data-icon="reconciliation" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M676 623c-18.8 0-34 15.2-34 34s15.2 34 34 34 34-15.2 34-34-15.2-34-34-34zm204-455H668c0-30.9-25.1-56-56-56h-80c-30.9 0-56 25.1-56 56H264c-17.7 0-32 14.3-32 32v200h-88c-17.7 0-32 14.3-32 32v448c0 17.7 14.3 32 32 32h336c17.7 0 32-14.3 32-32v-16h368c17.7 0 32-14.3 32-32V200c0-17.7-14.3-32-32-32zM448 848H176V616h272v232zm0-296H176v-88h272v88zm20-272v-48h72v-56h64v56h72v48H468zm180 168v56c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8v-56c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8zm28 301c-50.8 0-92-41.2-92-92s41.2-92 92-92 92 41.2 92 92-41.2 92-92 92zm92-245c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8v-96c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v96zm-92 61c-50.8 0-92 41.2-92 92s41.2 92 92 92 92-41.2 92-92-41.2-92-92-92zm0 126c-18.8 0-34-15.2-34-34s15.2-34 34-34 34 15.2 34 34-15.2 34-34 34z"  fill="#595959"></path></svg>
      </div>`,
    );
    super($elem, editor);
  }

  clickHandler = async () => {
    console.log(this.isActive);
    let res = await pluginGetMaterialCategories();
    let categories = (res.data || []).reduce((pre: Object, cur: any) => {
      pre[cur.id] = cur.title;
      return pre;
    }, []);

    const useDetail = (detail: any) => {
      this.editor.cmd.do(
        'insertHTML',
        `<div data-w-e-type="material" data-w-e-is-void data-material="${detail.id}" data-title="${detail.title}">${detail.content}</div><p><br/></p>`,
      );

      materialModal.destroy();
    };

    const materialModal = Modal.confirm({
      width: 800,
      icon: '',
      title: false,
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
            return pluginGetMaterials(params);
          }}
          pagination={{
            defaultPageSize: 6,
          }}
          showActions="hover"
          showExtra="hover"
          search={{
            span: 12,
            labelWidth: 120,
          }}
          metas={{
            title: {
              search: false,
              dataIndex: 'title',
            },
            description: {
              dataIndex: 'content',
              search: false,
              render: (text: any) => {
                return (
                  <div
                    className="material-description"
                    dangerouslySetInnerHTML={{ __html: text }}
                  ></div>
                );
              },
            },
            subTitle: {
              search: false,
              render: (text: any, row: any) => {
                return (
                  <Space size={0}>
                    <Tag
                      className="link"
                      onClick={() => {
                        this.previewDetail(row);
                      }}
                    >
                      <FileSearchOutlined /> 预览
                    </Tag>
                    <Tag
                      color="blue"
                      className="link"
                      onClick={() => {
                        useDetail(row);
                      }}
                    >
                      <PlusSquareOutlined /> 使用
                    </Tag>
                  </Space>
                );
              },
            },
            category_id: {
              title: '分类筛选',
              valueType: 'select',
              valueEnum: categories,
            },
          }}
        />
      ),
    });
  };

  tryChangeActive = () => {
    if (this.isActive) {
      this.active();
    } else {
      this.unActive();
    }
  };

  previewDetail = (detail: any) => {
    Modal.info({
      title: detail.title,
      icon: '',
      width: 600,
      content: <div dangerouslySetInnerHTML={{ __html: detail.content }}></div>,
    });
  };
}
