import E from 'wangeditor';
import ReactWEditor from 'wangeditor-for-react';
import { useRef, useState } from 'react';
import config from '@/services/config';
import { getStore } from '@/utils/store';
import AttachmentSelect from '../attachment';
import MonacoEditor from 'react-monaco-editor';
import './index.less';
import { message, Tooltip } from 'antd';
import { HtmlMenu } from './html/menu';
import { MaterialMenu } from './material/menu';
import { ArrowLeftOutlined } from '@ant-design/icons';

// 注册。要在创建编辑器之前注册
E.registerMenu('html', HtmlMenu);
E.registerMenu('material', MaterialMenu);

export type WangEditorProps = {
  className: string;
  content: string;
  setContent: (html: any) => Promise<void>;
};

var customSetMode: (mode: boolean) => void;
var code = '';

const WangEditor: React.FC<WangEditorProps> = (props) => {
  const editorRef = useRef(null);
  const [attachVisible, setAttachVisible] = useState<boolean>(false);
  const [htmlMode, setHtmlMode] = useState<boolean>(false);

  const handleSelectImages = (e: any) => {
    editorRef.current?.editor.cmd.do('insertHTML', `<img src="${e.logo}" alt="${e.file_name}"/>`);
    setAttachVisible(false);
  };

  const onChangeCode = (newCode: string) => {
    if (code != newCode) {
      code = newCode;
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
          // 上传图片处理
          uploadImgFromMedia: () => {
            setAttachVisible(true);
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
              editorRef.current?.editor.txt.html(code);
            }
          },
        }}
        onChange={(html) => {
          props.setContent(html);
          code = html;
        }}
        onBlur={(html) => {
          code = html;
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
            language={'html'}
            theme="vs-dark"
            value={code}
            options={{
              selectOnLineNumbers: false,
              wordWrap: 'on',
            }}
            onChange={onChangeCode}
            editorDidMount={() => {}}
          />
        )}
      </div>
      <AttachmentSelect
        onSelect={(row) => {
          handleSelectImages(row);
        }}
        onCancel={(flag) => {
          setAttachVisible(flag);
        }}
        visible={attachVisible}
        manual={true}
      />
    </div>
  );
};

export default WangEditor;
