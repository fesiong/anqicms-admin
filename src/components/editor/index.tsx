import E from 'wangeditor';
import ReactWEditor from 'wangeditor-for-react';
import { useRef, useState, forwardRef, useImperativeHandle } from 'react';
import config from '@/services/config';
import { getStore } from '@/utils/store';
import MonacoEditor from 'react-monaco-editor';
import './index.less';
import { message, Tooltip } from 'antd';
import { HtmlMenu } from './html/menu';
import { MaterialMenu } from './material/menu';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { uploadAttachment } from '@/services';
import Attachment from '../attachment/dialog';

// 注册。要在创建编辑器之前注册
E.registerMenu('html', HtmlMenu);
E.registerMenu('material', MaterialMenu);

export type WangEditorProps = {
  className: string;
  content: string;
  field: string;
  setContent: (html: any) => Promise<void>;
  ref: any;
};

var customSetMode: (mode: boolean) => void;
let codes: any = {};

const WangEditor: React.FC<WangEditorProps> = forwardRef((props, ref) => {
  const editorRef = useRef(null);
  const [htmlMode, setHtmlMode] = useState<boolean>(false);

  useImperativeHandle(ref, () => ({
    setInnerContent: setInnerContent,
  }));
  function setInnerContent(content: string) {
    editorRef.current?.editor.txt.html(content);
  }

  const handleSelectImages = (e: any) => {
    for (let i in e) {
      editorRef.current?.editor.cmd.do(
        'insertHTML',
        `<img src="${e[i].logo}" alt="${e[i].file_name}"/>`,
      );
    }
  };

  const onChangeCode = (newCode: string) => {
    if (codes[props.field] != newCode) {
      codes[props.field] = newCode;
      props.setContent(codes[props.field]);
    }
  };

  const handleUpload = async (resultFiles: any[], insertImgFn: Function) => {
    for (let i in resultFiles) {
      const hide = message.loading('插入中...', 0);
      let formData = new FormData();
      formData.append('file', resultFiles[i]);
      uploadAttachment(formData)
        .then((res) => {
          if (res.code !== 0) {
            message.info(res.msg);
          } else {
            message.info(res.msg || '上传成功');
            insertImgFn(res.data.logo);
          }
        })
        .finally(() => {
          hide();
        });
    }
  };

  return (
    <div
      className={'editor-container ' + props.className}
      style={{ border: '1px solid #ccc', marginTop: '10px' }}
    >
      <ReactWEditor
        ref={editorRef}
        defaultValue={props.content}
        config={{
          height: 500,
          // 支持拖拽上传图片
          customUploadImg: (resultFiles: Function[], insertImgFn: Function) => {
            handleUpload(resultFiles, insertImgFn);
          },
          uploadImgAccept: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
          // 上传图片处理
          uploadImgFromMedia: () => {
            Attachment.show(true).then((res) => {
              handleSelectImages(res);
            });
          },
          // 上传视频处理
          uploadVideoServer: config.baseUrl + '/attachment/upload',
          uploadVideoAccept: ['mp4'],
          uploadVideoName: 'file',
          uploadVideoHeaders: {
            admin: getStore('adminToken'),
          },
          uploadVideoHooks: {
            customInsert: (insertFn: any, res: any) => {
              let data = res.data || {};
              if (res.code !== 0) {
                message.info(res.msg);
              } else {
                message.info(res.msg || '上传成功');
                insertFn(data.logo);
              }
            },
          },
          customSetMode: (fn: any) => {
            customSetMode = fn;
          },
          setMode: (mode: boolean) => {
            setHtmlMode(mode);
            if (!mode) {
              editorRef.current?.editor.txt.html(codes[props.field]);
            }
          },
        }}
        onChange={(html) => {
          props.setContent(html);
          codes[props.field] = html;
        }}
        onBlur={(html) => {
          codes[props.field] = html;
        }}
      />
      <div style={{ display: htmlMode ? 'block' : 'none' }} className="tmp-editor">
        <div className="html-menus">
          <div
            className="menu-item"
            onClick={() => {
              if (customSetMode) {
                customSetMode(false);
              }
              setHtmlMode(false);
            }}
          >
            <Tooltip title="返回视图模式">
              <ArrowLeftOutlined className="icon" />
            </Tooltip>
          </div>
        </div>
        {htmlMode && (
          <MonacoEditor
            height={563}
            language={'markdown'}
            theme="vs-dark"
            value={codes[props.field]}
            options={{
              selectOnLineNumbers: false,
              wordWrap: 'on',
            }}
            onChange={onChangeCode}
            editorDidMount={() => {}}
          />
        )}
      </div>
    </div>
  );
});

export default WangEditor;
