import { AiEditor } from 'aieditor';
import 'aieditor/dist/style.css';

import { uploadAttachment } from '@/services';
import config from '@/services/config';
import { getSessionStore, getStore } from '@/utils/store';
import { useIntl } from '@umijs/max';
import { Button, Input, message, Modal, Space } from 'antd';
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import Attachment from '../attachment/dialog';
import './index.less';
import MaterialSelect, { MaterialElement } from './material';

export type NewAiEditorProps = {
  className: string;
  content: string;
  field: string;
  setContent: (html: any) => Promise<void>;
  ref: any;
};

const NewAiEditor: React.FC<NewAiEditorProps> = forwardRef((props, ref) => {
  const divRef = useRef<HTMLDivElement>(null);
  const aiEditorRef = useRef<AiEditor | null>(null);
  const [videoVisible, setVideoVisible] = useState(false);
  const [curEditor, setCurEditor] = useState<AiEditor | null>(null);
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [materialVisible, setMaterialVisible] = useState(false);
  const intl = useIntl();
  function setInnerContent(content: string) {
    aiEditorRef.current?.setContent(content);
  }

  useImperativeHandle(ref, () => ({
    setInnerContent: setInnerContent,
  }));

  function attachPlugin(editor: AiEditor) {
    const setImage = (item: any) => {
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

    Attachment.show(true, intl).then((res: any) => {
      let addon = [];
      for (let i in res) {
        if (res.hasOwnProperty(i)) {
          addon.push(setImage(res[i]));
        }
      }
      if (!editor.isFocused()) {
        editor.focus();
      }
      editor.insert(addon.join('\n'));
      setVideoVisible(false);
    });
  }

  const handleSelectVideo = () => {
    if (curEditor) {
      attachPlugin(curEditor);
    }
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
    if (res.code !== 200) {
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
          'source-code',
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
          let codes = ed.getHtml();
          // 移除 a标签的 rel 属性，其它属性保留
          codes = codes.replace(/<a(\s[^>]*)?>/gi, (match) => {
            return match.replaceAll(/\srel\s*=\s*["'][^"']*["']/gi, '');
          });
          props.setContent(codes);
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
    <div className={'editor-container ' + props.className}>
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
                handleSelectVideo();
              }}
            >
              {intl.formatMessage({ id: 'component.editor.video.select' })}
            </Button>
          </Space>
        </Modal>
      )}
      {materialVisible && (
        <MaterialSelect
          open={materialVisible}
          onCancel={() => setMaterialVisible(false)}
          onSelect={handleSelectMaterial}
        />
      )}
    </div>
  );
});

export default NewAiEditor;
