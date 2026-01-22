import { AiEditor } from 'aieditor';
import 'aieditor/dist/style.css';

import { uploadAttachment } from '@/services';
import config from '@/services/config';
import { getSessionStore, getStore } from '@/utils/store';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useIntl } from '@umijs/max';
import { Button, Input, message, Modal, Space, Tooltip } from 'antd';
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import MonacoEditor from 'react-monaco-editor';
import AttachmentSelect from '../attachment';
import './index.less';
import MaterialSelect, { MaterialElement } from './material';

export type NewAiEditorProps = {
  className: string;
  content: string;
  field: string;
  setContent: (html: any) => Promise<void>;
  ref: any;
};

let codes: any = {};

const NewAiEditor: React.FC<NewAiEditorProps> = forwardRef((props, ref) => {
  const divRef = useRef<HTMLDivElement>(null);
  const aiEditorRef = useRef<AiEditor | null>(null);
  const [videoVisible, setVideoVisible] = useState(false);
  const [curEditor, setCurEditor] = useState<AiEditor | null>(null);
  const [htmlMode, setHtmlMode] = useState<boolean>(false);
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [materialVisible, setMaterialVisible] = useState(false);
  const [attachVisible, setAttachVisible] = useState(false);
  const intl = useIntl();
  function setInnerContent(content: string) {
    // 判断是不是Markdown
    if (content.indexOf('<') !== -1 && content.indexOf('>') !== -1) {
      aiEditorRef.current?.setContent(content);
    } else {
      aiEditorRef.current?.setMarkdownContent(content);
    }
  }

  useImperativeHandle(ref, () => ({
    setInnerContent: setInnerContent,
  }));

  const getImagehtml = (item: any) => {
    if (
      item.is_image ||
      item.file_location.indexOf('.webp') !== -1 ||
      item.file_location.indexOf('.bmp') !== -1 ||
      item.file_location.indexOf('.png') !== -1 ||
      item.file_location.indexOf('.gif') !== -1 ||
      item.file_location.indexOf('.jpg') !== -1 ||
      item.file_location.indexOf('.jpeg') !== -1 ||
      item.file_location.indexOf('.svg') !== -1
    ) {
      // img
      return `<img src="${item.logo}" alt="${item.file_name}" title="${item.file_name}" />`;
      //return `![${item.file_name}](${item.logo})`;
    } else if (
      item.is_image === 2 ||
      item.file_location.indexOf('.mp4') !== -1 ||
      item.file_location.indexOf('.ogg') !== -1 ||
      item.file_location.indexOf('.webm') !== -1
    ) {
      return `<video controls="controls" controlslist="nodownload" poster=""><source src="${
        item.logo
      }" type="video/${item.file_location.substr(
        item.file_location.lastIndexOf('.') + 1,
      )}">Your browser does not support video tags.</video>`;
    } else if (
      item.file_location.indexOf('.mp3') !== -1 ||
      item.file_location.indexOf('.wav') !== -1
    ) {
      return `<audio src="${item.logo}" controls="controls"><source src="${
        item.logo
      }" type="audio/${item.file_location.substr(
        item.file_location.lastIndexOf('.') + 1,
      )}">Your browser does not support audio tags.</audio>`;
    } else if (item.is_image === 3) {
      return `<iframe src="${item.file_location}" title="${item.file_name}" width="100%" height="480px" frameborder="0" allowfullscreen="true"></iframe>`;
    } else {
      return `<a href="${item.logo}" target="_blank" title="${item.file_name}">${item.file_name}</a>`;
    }
  };
  function attachPlugin(editor: AiEditor) {
    setCurEditor(editor);
    setAttachVisible(true);
  }

  const handleSelectVideo = () => {
    if (curEditor) {
      attachPlugin(curEditor);
    }
  };

  const handleSelectAttachment = (rows: any[]) => {
    let addon = [];
    for (let i = 0; i < rows.length; i++) {
      addon.push(getImagehtml(rows[i]));
    }
    if (!curEditor?.isFocused()) {
      curEditor?.focus();
    }
    curEditor?.insert(addon.join('\n'));
    setAttachVisible(false);
    setVideoVisible(false);
  };

  const showVideo = (editor: AiEditor) => {
    setVideoUrl('');
    setVideoVisible(true);
    setCurEditor(editor);
  };

  const showMaterial = (ev: MouseEvent, editor: AiEditor) => {
    setCurEditor(editor);
    setMaterialVisible(true);
  };

  const handleSelectMaterial = (row: MaterialElement) => {
    if (curEditor) {
      const insertData = `<div data-w-e-type="material" data-w-e-is-void data-material="${row.id}" data-title="${row.title}">${row.content}</div>`;

      curEditor.insert(insertData);
      setMaterialVisible(false);
    }
  };

  const handleUpload = async (file: File) => {
    const result: any = {
      errorCode: 0,
      data: {},
    };
    const hide = message.loading(
      intl.formatMessage({ id: 'component.footer.submitting' }),
      0,
    );
    let formData = new FormData();
    formData.append('file', file);
    let res = await uploadAttachment(formData);
    hide();
    if (res.code !== 0) {
      message.info(res.msg);
      result.errorCode = res.code;
      result.msg = res.msg;
      return Promise.reject(result);
    } else {
      result.data.src = res.data.logo;
      result.data.alt = res.data.file_name;
    }
    return result;
  };

  const showSourceCode = (ev: MouseEvent, editor: AiEditor) => {
    setCurEditor(editor);
    let htmlCode = editor.getHtml();
    // 移除 a标签的 rel 属性，其它属性保留
    htmlCode = htmlCode.replace(/<a(\s[^>]*)?>/gi, (match) => {
      return match.replaceAll(/\srel\s*=\s*["'][^"']*["']/gi, '');
    });
    codes[props.field] = htmlCode;
    setHtmlMode(true);
  };

  const hideSourceCode = () => {
    curEditor?.setContent(codes[props.field]);
    setHtmlMode(false);
  };

  const onChangeCode = (newCode: string) => {
    if (codes[props.field] !== newCode) {
      codes[props.field] = newCode;
      props.setContent(codes[props.field]);
    }
  };

  const initEditor = async () => {
    if (!divRef.current) return;
    // 官方默认
    let cfg: any = {
      custom: {
        url: config.baseUrl + '/anqi/ai/chat',
        headers: () => {
          let adminToken = getStore('adminToken');
          const sessionToken = getSessionStore('adminToken');
          if (sessionToken) {
            adminToken = sessionToken;
          }
          return {
            admin: adminToken,
          };
        },
        wrapPayload: (message: string) => {
          return JSON.stringify({ prompt: message });
        },
        parseMessage: (message: string) => {
          let res = JSON.parse(message) || {};
          return {
            role: 'assistant',
            content: res.content || '',
            status: res.status,
            // //0 代表首个文本结果；1 代表中间文本结果；2 代表最后一个文本结果。
            // status: 0|1|2,
          };
        },
        protocol: 'sse',
      },
    };

    if (!aiEditorRef.current) {
      const aiEditor = new AiEditor({
        element: divRef.current,
        placeholder: intl.formatMessage({ id: 'component.editor.placeholder' }),
        content: props.content,
        toolbarKeys: [
          'undo',
          'redo',
          'brush',
          'eraser',
          '|',
          'heading',
          'font-family',
          'font-size',
          '|',
          'bold',
          'italic',
          'underline',
          'strike',
          'link',
          'code',
          'subscript',
          'superscript',
          'hr',
          'todo',
          'emoji',
          '|',
          'highlight',
          'font-color',
          '|',
          'align',
          'line-height',
          '|',
          'bullet-list',
          'ordered-list',
          'indent-decrease',
          'indent-increase',
          'break',
          '|',
          'image',
          'video',
          'attachment',
          {
            icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M4 5H20V3H4V5ZM20 9H4V7H20V9ZM9 13H15V11H21V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V11H9V13Z"></path></svg>',
            onClick: showMaterial,
            tip: 'material',
          },
          'quote',
          'container',
          'code-block',
          'table',
          '|',
          {
            icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M2 4C2 3.44772 2.44772 3 3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4ZM4 19H20V9H4V19ZM11 13H6V17H11V13Z"></path></svg>',
            onClick: showSourceCode,
            tip: 'source-code',
          },
          'printer',
          'fullscreen',
          'ai',
        ],
        // htmlPasteConfig: {
        //   pasteAsText: false,
        //   pasteClean: true,
        // },
        link: {
          autolink: true,
          rel: '',
          class: '',
          bubbleMenuItems: ['Edit', 'UnLink', 'visit'],
        },
        i18n: {
          zh: {
            material: '内容片段',
          },
          en: {
            material: 'Content snippets',
          },
        },
        ai: {
          models: cfg,
        },
        onChange: (ed: AiEditor) => {
          let htmlCode = ed.getHtml();
          // 移除 a标签的 rel 属性，其它属性保留
          htmlCode = htmlCode.replace(/<a(\s[^>]*)?>/gi, (match) => {
            return match.replaceAll(/\srel\s*=\s*["'][^"']*["']/gi, '');
          });
          props.setContent(htmlCode);
          codes[props.field] = htmlCode;
        },
        image: {
          customMenuInvoke: (editor: AiEditor) => {
            attachPlugin(editor);
          },
          uploader: (file: File) => {
            return handleUpload(file);
          },
        },
        attachment: {
          customMenuInvoke: (editor: AiEditor) => {
            attachPlugin(editor);
          },
          uploader: (file: File) => {
            return handleUpload(file);
          },
        },
        video: {
          customMenuInvoke: (editor: AiEditor) => {
            showVideo(editor);
          },
          uploader: (file: File) => {
            return handleUpload(file);
          },
        },
        textSelectionBubbleMenu: {
          enable: true,
          items: [
            'ai',
            {
              id: 'h2',
              title: 'h2',
              icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M4 4V11H11V4H13V20H11V13H4V20H2V4H4ZM18.5 8C20.5711 8 22.25 9.67893 22.25 11.75C22.25 12.6074 21.9623 13.3976 21.4781 14.0292L21.3302 14.2102L18.0343 18H22V20H15L14.9993 18.444L19.8207 12.8981C20.0881 12.5908 20.25 12.1893 20.25 11.75C20.25 10.7835 19.4665 10 18.5 10C17.5818 10 16.8288 10.7071 16.7558 11.6065L16.75 11.75H14.75C14.75 9.67893 16.4289 8 18.5 8Z"></path></svg>',
              onClick: ({ innerEditor }) => {
                if (innerEditor.isActive('heading', { level: 2 })) {
                  return innerEditor.chain().setParagraph().focus().run();
                }
                return innerEditor
                  .chain()
                  .setHeading({ level: 2 as any })
                  .focus()
                  .run();
              },
              isActive: (innerEditor) => {
                return innerEditor.isActive('heading', { level: 2 });
              },
            },
            {
              id: 'h3',
              title: 'h3',
              icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M22 8L21.9984 10L19.4934 12.883C21.0823 13.3184 22.25 14.7728 22.25 16.5C22.25 18.5711 20.5711 20.25 18.5 20.25C16.674 20.25 15.1528 18.9449 14.8184 17.2166L16.7821 16.8352C16.9384 17.6413 17.6481 18.25 18.5 18.25C19.4665 18.25 20.25 17.4665 20.25 16.5C20.25 15.5335 19.4665 14.75 18.5 14.75C18.214 14.75 17.944 14.8186 17.7056 14.9403L16.3992 13.3932L19.3484 10H15V8H22ZM4 4V11H11V4H13V20H11V13H4V20H2V4H4Z"></path></svg>',
              onClick: ({ innerEditor }) => {
                if (innerEditor.isActive('heading', { level: 3 })) {
                  return innerEditor.chain().setParagraph().focus().run();
                }
                return innerEditor
                  .chain()
                  .setHeading({ level: 3 as any })
                  .focus()
                  .run();
              },
              isActive: (innerEditor) => {
                return innerEditor.isActive('heading', { level: 3 });
              },
            },
            'Bold',
            'Italic',
            'Underline',
            'Strike',
            'link',
            'heading',
            'code',
          ],
        },
      });

      aiEditorRef.current = aiEditor;
    }
  };

  useEffect(() => {
    if (!divRef.current) return;

    initEditor();

    return () => {
      if (aiEditorRef.current) {
        aiEditorRef.current.destroy();
        aiEditorRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (ref) {
      if (typeof ref === 'function') {
        ref(divRef.current);
      } else {
        ref.current = divRef.current;
      }
    }
  }, [ref]);

  useEffect(() => {
    if (
      aiEditorRef.current &&
      props.content !== aiEditorRef.current.getHtml()
    ) {
      //  aiEditorRef.current.setContent(props.content || "");
    }
  }, [props.content]);

  const handleSubmitVideo = () => {
    if (!videoUrl) {
      message.error(
        intl.formatMessage({ id: 'component.editor.video.required' }),
      );
      return;
    }
    if (curEditor) {
      if (!curEditor.isFocused()) {
        curEditor.focus();
      }
      let videoHtml: string = videoUrl;
      if (videoUrl.indexOf('http') === 0) {
        videoHtml = `<video controls="controls" controlslist="nodownload" poster=""><source src="${videoUrl}" type="video/mp4">Your browser does not support video tags.</video>`;
      }
      curEditor.insert(videoHtml);
    }
    setVideoVisible(false);
  };

  return (
    <div
      className={'editor-container ' + props.className}
      style={{ border: '1px solid #ccc', marginTop: '10px' }}
    >
      <div ref={divRef} {...props} style={{ height: '100%' }} />
      {videoVisible && (
        <Modal
          title={intl.formatMessage({ id: 'component.editor.video.title' })}
          open={videoVisible}
          onCancel={() => setVideoVisible(false)}
          width={600}
          footer={null}
        >
          <div className="mb-normal">
            <Input.TextArea
              placeholder={intl.formatMessage({
                id: 'component.editor.video.required',
              })}
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
            />
          </div>
          <Space
            align="center"
            style={{ width: '100%', justifyContent: 'center' }}
          >
            <Button type="primary" onClick={() => handleSubmitVideo()}>
              {intl.formatMessage({ id: 'component.editor.submit' })}
            </Button>
            <Button
              onClick={() => {
                setVideoVisible(false);
                handleSelectVideo();
              }}
            >
              {intl.formatMessage({ id: 'component.editor.video.select' })}
            </Button>
          </Space>
        </Modal>
      )}
      <div
        style={{ display: htmlMode ? 'block' : 'none' }}
        className="tmp-editor"
      >
        <div className="html-menus">
          <div className="menu-item" onClick={() => hideSourceCode()}>
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
              minimap: {
                enabled: false,
              },
              selectOnLineNumbers: false,
              wordWrap: 'on',
            }}
            onChange={onChangeCode}
            editorDidMount={() => {}}
          />
        )}
      </div>
      {materialVisible && (
        <MaterialSelect
          open={materialVisible}
          onCancel={() => setMaterialVisible(false)}
          onSelect={handleSelectMaterial}
        />
      )}
      {attachVisible && (
        <AttachmentSelect
          open={attachVisible}
          onCancel={() => setAttachVisible(false)}
          onSelect={handleSelectAttachment}
          multiple={true}
          manual={true}
        />
      )}
    </div>
  );
});

export default NewAiEditor;
