import { uploadAttachment } from '@/services';
import config from '@/services/config';
import { getStore } from '@/utils/store';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useIntl } from '@umijs/max';
import { Tooltip, message } from 'antd';
import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import MonacoEditor from 'react-monaco-editor';
import E from 'wangeditor';
import ReactWEditor from 'wangeditor-for-react';
import Attachment from '../attachment/dialog';
import { HtmlMenu } from './html/menu';
import './index.less';
import { MaterialMenu } from './material/menu';

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

type InsertImgFn = (url: string) => void;

let customSetMode: (mode: boolean) => void;
let codes: any = {};

const WangEditor: React.FC<WangEditorProps> = forwardRef((props, ref) => {
  const editorRef = useRef(null);
  const [htmlMode, setHtmlMode] = useState<boolean>(false);
  const intl = useIntl();

  function setInnerContent(content: string) {
    editorRef.current?.editor.txt.html(content);
  }

  useImperativeHandle(ref, () => ({
    setInnerContent: setInnerContent,
  }));

  const handleSelectImages = (e: any) => {
    for (let i in e) {
      if (e.hasOwnProperty(i)) {
        let el = `<a href="${e[i].logo}" target="_blank">${e[i].file_name}</a>`;
        if (
          e[i].is_image ||
          e[i].file_location.indexOf('.webp') !== -1 ||
          e[i].file_location.indexOf('.bmp') !== -1 ||
          e[i].file_location.indexOf('.png') !== -1 ||
          e[i].file_location.indexOf('.gif') !== -1 ||
          e[i].file_location.indexOf('.jpg') !== -1 ||
          e[i].file_location.indexOf('.jpeg') !== -1 ||
          e[i].file_location.indexOf('.svg') !== -1
        ) {
          el = `<img src="${e[i].logo}" alt="${e[i].file_name}"/>`;
        } else if (
          e[i].file_location.indexOf('.mp4') !== -1 ||
          e[i].file_location.indexOf('.ogg') !== -1 ||
          e[i].file_location.indexOf('.webm') !== -1
        ) {
          el = `<video controls="controls" controlslist="nodownload" poster=""><source src="${
            e[i].logo
          }" type="video/${e[i].file_location.substr(
            e[i].file_location.lastIndexOf('.') + 1,
          )}">${intl.formatMessage({
            id: 'component.markdown.video.unsupport',
          })}</video>`;
        } else if (
          e[i].file_location.indexOf('.mp3') !== -1 ||
          e[i].file_location.indexOf('.wav') !== -1
        ) {
          el = `<audio src="${e[i].logo}" controls="controls"><source src="${
            e[i].logo
          }" type="audio/${e[i].file_location.substr(
            e[i].file_location.lastIndexOf('.') + 1,
          )}">${intl.formatMessage({
            id: 'component.markdown.audio.unsupport',
          })}</audio>`;
        }
        editorRef.current?.editor.cmd.do('insertHTML', el);
      }
    }
  };

  const onChangeCode = (newCode: string) => {
    if (codes[props.field] !== newCode) {
      codes[props.field] = newCode;
      props.setContent(codes[props.field]);
    }
  };

  const handleUpload = async (resultFiles: any[], insertImgFn: InsertImgFn) => {
    for (let i in resultFiles) {
      if (resultFiles.hasOwnProperty(i)) {
        const hide = message.loading(
          intl.formatMessage({ id: 'component.editor.inserting' }),
          0,
        );
        let formData = new FormData();
        formData.append('file', resultFiles[i]);
        uploadAttachment(formData)
          .then((res) => {
            if (res.code !== 0) {
              message.info(res.msg);
            } else {
              message.info(
                res.msg ||
                  intl.formatMessage({ id: 'component.footer.uploaded' }),
              );
              insertImgFn(res.data.logo);
            }
          })
          .finally(() => {
            hide();
          });
      }
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
          customUploadImg: (resultFiles: any[], insertImgFn: InsertImgFn) => {
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
                message.info(
                  res.msg ||
                    intl.formatMessage({ id: 'component.footer.uploaded' }),
                );
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
      <div
        style={{ display: htmlMode ? 'block' : 'none' }}
        className="tmp-editor"
      >
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
            <Tooltip
              title={intl.formatMessage({
                id: 'component.editor.mode.return-view',
              })}
            >
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
