import { uploadAttachment } from '@/services';
import config from '@/services/config';
import { getSessionStore, getStore } from '@/utils/store';
import {
  AlignLeftOutlined,
  AuditOutlined,
  CloseOutlined,
  EditOutlined,
  GlobalOutlined,
  ShareAltOutlined,
  StarOutlined,
  ThunderboltOutlined,
} from '@ant-design/icons';
import gfm from '@bytemd/plugin-gfm';
import pmath from '@bytemd/plugin-math';
import mermaid from '@bytemd/plugin-mermaid';
import { Editor } from '@bytemd/react';
import { useIntl } from '@umijs/max';
import { Button, Input, message, Spin } from 'antd';
import { BytemdPlugin } from 'bytemd';
import 'bytemd/dist/index.css';
import zhHans from 'bytemd/locales/zh_Hans.json';
import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import Attachment from '../attachment/dialog';
import './index.less';

// AI Editor Overlay Component
const AiEditorOverlay: React.FC<{
  visible: boolean;
  onClose: () => void;
  getSelection: () => string;
  appendBlock: (text: string) => void;
  replaceSelection: (text: string) => void;
  setContent: (text: string) => void;
  getContent: () => string;
}> = ({
  visible,
  onClose,
  getSelection,
  appendBlock,
  replaceSelection,
  setContent,
  getContent,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [finished, setFinished] = useState(false);
  const abortRef = useRef<AbortController | null>(null);
  const inputRef = useRef<any>(null);

  if (!visible) return null;

  const resetState = () => {
    setInputValue('');
    setSelectedTag('');
    setLoading(false);
    setResult('');
    setFinished(false);
    abortRef.current?.abort();
    abortRef.current = null;
  };

  const handleClose = () => {
    resetState();
    onClose();
  };

  const handleSubmit = async (prompt: string, tag: string) => {
    if (!prompt.trim() && !tag) return;

    setLoading(true);
    setResult('');
    setFinished(false);

    const adminToken = getSessionStore('adminToken') || getStore('adminToken');
    const selection = getSelection();
    const content = getContent();
    const body: any = {
      prompt: prompt || tag,
      instructions: selection
        ? `Selected text:\n${selection}`
        : `Document:\n${content}`,
    };

    const abortController = new AbortController();
    abortRef.current = abortController;

    try {
      const response = await fetch(config.baseUrl + '/anqi/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Admin: adminToken,
        },
        body: JSON.stringify(body),
        signal: abortController.signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const contentType = response.headers.get('Content-Type') || '';
      if (contentType.includes('application/json')) {
        const jsonResp = await response.json();
        throw new Error(jsonResp.msg || '请求失败');
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('No readable stream');
      }

      const decoder = new TextDecoder();
      let buffer = '';
      let tmpContent = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const events = buffer.split('\n\n');
        buffer = events.pop() || '';

        for (const event of events) {
          if (!event.trim()) continue;

          const lines = event.split('\n');
          let eventType = 'message';
          let data = '';

          for (const line of lines) {
            if (line.startsWith('event:')) {
              eventType = line.substring(6).trim();
            } else if (line.startsWith('data:')) {
              data = line.substring(5).trim();
            }
          }

          if (eventType === 'end') {
            setFinished(true);
            setLoading(false);
            return;
          }

          if (eventType === 'error') {
            throw new Error(data || 'AI 请求出错');
          }

          if (data) {
            try {
              const parsed = JSON.parse(data);
              tmpContent += parsed.v || '';
              setResult(tmpContent);
            } catch {}
            setResult(tmpContent);
          }
        }
      }

      setFinished(true);
    } catch (error: any) {
      if (error.name === 'AbortError') return;
      message.error(error.message || 'AI 请求失败');
    } finally {
      setLoading(false);
    }
  };

  const quickTags = [
    {
      id: 'improve',
      label: '改进写作',
      prompt:
        'Improve the writing while preserving its meaning and tone. Return only the revised text.',
      icon: <ThunderboltOutlined />,
    },
    {
      id: 'proofread',
      label: '修正拼写和语法',
      prompt:
        'Correct spelling, grammar, punctuation, and usage. Return only the corrected text.',
      icon: <AuditOutlined />,
    },
    {
      id: 'simplify',
      label: '简化',
      prompt:
        'Make this clearer and easier to understand without losing important information. Return only the revised text.',
      icon: <EditOutlined />,
    },
    {
      id: 'expand',
      label: '扩写',
      prompt:
        'Expand this with useful detail while preserving the original meaning and tone. Return only the revised text.',
      icon: <StarOutlined />,
    },
    {
      id: 'format',
      label: '格式化',
      prompt:
        'Format this as clean, well-structured markdown. Return only the formatted text.',
      icon: <AlignLeftOutlined />,
    },
    {
      id: 'translate',
      label: '翻译',
      prompt:
        'Translate this into English. If it is already English, translate it into Simplified Chinese. Return only the translation.',
      icon: <GlobalOutlined />,
    },
    {
      id: 'summarize',
      label: '总结',
      prompt: 'Summarize this concisely. Return only the summary.',
      icon: <ShareAltOutlined />,
    },
  ];

  const handleAppend = () => {
    appendBlock(result);
    handleClose();
  };

  const handleReplace = () => {
    const selection = getSelection();
    if (selection) {
      replaceSelection(result);
    } else {
      setContent(result);
    }
    handleClose();
  };

  const handleDiscard = () => {
    handleClose();
  };

  return (
    <div className="ai-editor-overlay">
      <div className="ai-editor-panel">
        <div className="ai-editor-header">
          <span>AI 助手</span>
          <CloseOutlined className="ai-editor-close" onClick={handleClose} />
        </div>
        <div className="ai-editor-body">
          <Input.TextArea
            ref={inputRef}
            className="ai-editor-input"
            placeholder="告诉 AI 要做什么..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onPressEnter={(e) => {
              if (!e.shiftKey) {
                e.preventDefault();
                handleSubmit(inputValue, selectedTag);
              }
            }}
            autoSize={{ minRows: 2, maxRows: 4 }}
            disabled={loading}
          />

          {!loading && !finished && (
            <div className="ai-editor-tags">
              <div className="ai-editor-tags-hint">
                <ThunderboltOutlined /> 便捷操作
              </div>
              <div className="ai-editor-tags-list">
                {quickTags.map((tag) => (
                  <div
                    key={tag.id}
                    className={`ai-editor-tag ${
                      selectedTag === tag.id ? 'active' : ''
                    }`}
                    onClick={() => {
                      setSelectedTag(tag.id);
                      handleSubmit(tag.prompt, tag.id);
                    }}
                  >
                    <span className="ai-editor-tag-icon">{tag.icon}</span>
                    {tag.label}
                  </div>
                ))}
              </div>
            </div>
          )}

          {loading && (
            <div className="ai-editor-loading">
              <Spin size="small" />
              <span>AI 处理中...</span>
            </div>
          )}

          {finished && result && (
            <div className="ai-editor-result-section">
              <div className="ai-editor-result-label">AI 输出：</div>
              <div className="ai-editor-result-content">{result}</div>
              <div className="ai-editor-result-check">
                请检查结果，然后选择应用方式：
              </div>
              <div className="ai-editor-result-actions">
                <Button size="small" type="primary" onClick={handleAppend}>
                  追加
                </Button>
                <Button size="small" onClick={handleReplace}>
                  替换
                </Button>
                <Button size="small" danger onClick={handleDiscard}>
                  舍弃
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export type MarkdownEditorProps = {
  className: string;
  content: string;
  setContent: (html: any) => Promise<void>;
  ref: any;
};

const MarkdownEditor: React.FC<MarkdownEditorProps> = forwardRef(
  (props, ref) => {
    const intl = useIntl();
    const [aiVisible, setAiVisible] = useState(false);
    const editorRef = useRef<any>(null);

    const attachPlugin = (intl: any): BytemdPlugin => {
      return {
        actions: [
          {
            title: '媒体库',
            icon: '<svg t="1695784255158" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4033" width="16" height="16"><path d="M416 266.538667m-96 0a96 96 0 1 0 192 0 96 96 0 1 0-192 0Z" p-id="4034" fill="#010000"></path><path d="M721.749333 371.626667A43.818667 43.818667 0 0 0 682.666667 348.074667a42.965333 42.965333 0 0 0-38.058667 25.002666l-66.474667 146.517334a10.624 10.624 0 0 1-18.005333 2.261333l-34.986667-43.690667a42.666667 42.666667 0 0 0-34.688-16.042666 42.965333 42.965333 0 0 0-33.578666 18.176L323.84 670.293333a21.333333 21.333333 0 0 0 17.493333 33.706667h512a21.333333 21.333333 0 0 0 18.133334-10.112 21.333333 21.333333 0 0 0 0.938666-20.736z" p-id="4035" fill="#010000"></path><path d="M938.666667 0H234.666667a85.333333 85.333333 0 0 0-85.333334 85.333333v704a85.333333 85.333333 0 0 0 85.333334 85.333334H938.666667a85.333333 85.333333 0 0 0 85.333333-85.333334V85.333333a85.333333 85.333333 0 0 0-85.333333-85.333333z m-6.186667 783.104a21.333333 21.333333 0 0 1-15.104 6.229333H256a21.333333 21.333333 0 0 1-21.333333-21.333333V106.666667A21.333333 21.333333 0 0 1 256 85.333333h661.333333a21.333333 21.333333 0 0 1 21.333334 21.333334V768a21.333333 21.333333 0 0 1-6.186667 14.976z" p-id="4036" fill="#010000"></path><path d="M832 938.666667h-725.333333a21.333333 21.333333 0 0 1-21.333334-21.333334v-725.333333a42.666667 42.666667 0 0 0-85.333333 0V938.666667a85.333333 85.333333 0 0 0 85.333333 85.333333h746.666667a42.666667 42.666667 0 0 0 0-85.333333z" p-id="4037" fill="#010000"></path></svg>', // 16x16 SVG icon
            handler: {
              type: 'action',
              click({ appendBlock, editor }) {
                const setImage = (item: any) => {
                  if (
                    item.is_image === 1 ||
                    item.file_location.indexOf('.webp') !== -1 ||
                    item.file_location.indexOf('.bmp') !== -1 ||
                    item.file_location.indexOf('.png') !== -1 ||
                    item.file_location.indexOf('.gif') !== -1 ||
                    item.file_location.indexOf('.jpg') !== -1 ||
                    item.file_location.indexOf('.jpeg') !== -1 ||
                    item.file_location.indexOf('.svg') !== -1
                  ) {
                    // img
                    return `![${item.file_name}](${item.file_path})`;
                  } else if (
                    item.is_image === 2 ||
                    item.file_location.indexOf('.mp4') !== -1 ||
                    item.file_location.indexOf('.ogg') !== -1 ||
                    item.file_location.indexOf('.webm') !== -1
                  ) {
                    return `<video controls="controls" controlslist="nodownload" poster="${
                      item.logo
                    }"><source src="${
                      item.file_path
                    }" type="video/${item.file_location.substr(
                      item.file_location.lastIndexOf('.') + 1,
                    )}">您的浏览器不支持 video 标签。</video>`;
                  } else if (
                    item.file_location.indexOf('.mp3') !== -1 ||
                    item.file_location.indexOf('.wav') !== -1
                  ) {
                    return `<audio src="${
                      item.file_path
                    }" controls="controls"><source src="${
                      item.file_path
                    }" type="audio/${item.file_location.substr(
                      item.file_location.lastIndexOf('.') + 1,
                    )}">你的编辑器不支持 audio 标签</audio>`;
                  } else {
                    return `[${item.file_name}](${item.file_path})`;
                  }
                };

                Attachment.show(true, intl).then((res: any) => {
                  let addon = [];
                  for (let i in res) {
                    if (res.hasOwnProperty(i)) {
                      addon.push(setImage(res[i]));
                    }
                  }
                  appendBlock(addon.join('\n'));
                  editor.focus();
                });

                editor.focus();
              },
            },
          },
          {
            title: 'AI助手',
            icon: '<svg t="1788831279632" class="icon" viewBox="0 0 1218 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7265" width="16" height="16"><path d="M326.183722 206.500257c19.568414 0 36.788619 9.523295 47.529504 24.177863a41.528523 41.528523 0 0 1 17.394146 18.698707l1.348046 3.391858 249.910392 711.072687c8.088278 22.916787-6.348863 48.529667-32.17917 57.22674-24.525746 8.262219-50.529994-1.652444-60.009803-22.351478l-1.304561-3.348373-64.793194-184.247491H160.460996l-64.706223 184.247491c-8.088278 22.916787-35.527543 34.440409-61.314364 25.699851-24.569231-8.262219-38.788945-31.787802-33.222819-53.791396l1.000164-3.47883L252.08466 252.81217a43.267938 43.267938 0 0 1 30.439756-26.91744A58.574787 58.574787 0 0 1 326.140237 206.500257h0.043485z m459.553336 201.511181c25.960763 0 47.225106 12.958639 49.312404 29.396106l0.130456 2.609122v549.046217c0 17.698544-22.177536 32.005229-49.44286 32.005229-25.960763 0-47.225106-12.915153-49.268918-29.396107l-0.217427-2.609122V440.060152c0-17.698544 22.177536-32.005229 49.486345-32.005229zM322.226554 350.741212l-127.760002 363.494165h255.563489L322.226554 350.697727zM1038.430514 105.52724a14.958966 14.958966 0 0 1 9.697236 9.56678l38.658489 117.801853 120.889315 42.87657a14.958966 14.958966 0 0 1-0.869708 28.482914l-118.410648 33.266304-36.658163 116.018954a14.958966 14.958966 0 0 1-28.439428 0.130456l-38.701975-117.758368-117.323515-37.223473a14.958966 14.958966 0 0 1-0.217426-28.395943l115.975468-39.049858 36.658162-115.975468a14.958966 14.958966 0 0 1 18.742193-9.740721zM772.387051 0.553569a10.436488 10.436488 0 0 1 6.653261 6.827202l22.04708 70.489776 72.490103 24.569232a10.436488 10.436488 0 0 1-0.391368 19.959782l-72.185706 21.48177-23.569067 70.794174a10.436488 10.436488 0 0 1-19.872812-0.173941l-22.04708-70.489777-70.228865-21.220858a10.436488 10.436488 0 0 1-0.434853-19.872811l70.794174-24.873629 23.525582-70.881145a10.436488 10.436488 0 0 1 13.219551-6.609775z" p-id="7266"></path></svg>',
            handler: {
              type: 'action',
              click({ appendBlock, editor }) {
                editorRef.current = { appendBlock, editor };
                setAiVisible(true);
              },
            },
          },
        ],
      };
    };

    const plugins = [gfm(), pmath(), mermaid(), attachPlugin(intl)];

    function setInnerContent() {
      // how to set
      // setValue(content);
    }

    useImperativeHandle(ref, () => ({
      setInnerContent: setInnerContent,
    }));

    const handleUpload = async (files: File[]) => {
      let result: any[] = [];

      const hide = message.loading('插入中...', 0);
      for (let i in files) {
        if (files.hasOwnProperty(i)) {
          let formData = new FormData();
          formData.append('file', files[i]);
          let res = await uploadAttachment(formData);
          if (res.code !== 0) {
            message.info(res.msg);
          } else {
            result.push({
              url: res.data.file_path,
            });
          }
        }
      }
      hide();
      return result;
    };

    const handleGetSelection = useCallback(() => {
      return editorRef.current?.editor?.getSelection?.() || '';
    }, []);

    const handleAppendBlock = useCallback((text: string) => {
      editorRef.current?.appendBlock?.(text);
    }, []);

    const handleReplaceSelection = useCallback((text: string) => {
      editorRef.current?.editor?.replaceSelection?.(text);
    }, []);

    const handleSetContent = useCallback(
      (text: string) => {
        props.setContent(text);
      },
      [props.setContent],
    );

    const handleGetContent = useCallback(() => {
      return props.content;
    }, [props.content]);

    return (
      <div
        className={'editor-container ' + props.className}
        style={{
          border: '1px solid #ccc',
          marginTop: '10px',
        }}
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
        <AiEditorOverlay
          visible={aiVisible}
          onClose={() => setAiVisible(false)}
          getSelection={handleGetSelection}
          appendBlock={handleAppendBlock}
          replaceSelection={handleReplaceSelection}
          setContent={handleSetContent}
          getContent={handleGetContent}
        />
      </div>
    );
  },
);

export default MarkdownEditor;
