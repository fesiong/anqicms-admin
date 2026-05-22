import { getAiHistories } from '@/services';
import config from '@/services/config';
import { getSessionStore, getStore, setStore } from '@/utils/store';
import { CloseOutlined, FullscreenOutlined, FullscreenExitOutlined, PlusOutlined, SendOutlined } from '@ant-design/icons';
import gfm from '@bytemd/plugin-gfm';
import { Viewer } from '@bytemd/react';
import { useIntl } from '@umijs/max';
import { Button, Input, Spin, message } from 'antd';
import 'bytemd/dist/index.css';
import { useEffect, useRef, useState } from 'react';
import './index.less';

interface ToolCallItem {
  name: string;
  arguments: string;
  tool_call_id: string;
  status: 'calling' | 'completed';
  result?: string;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  thinking?: string;
  toolCalls?: ToolCallItem[];
}

interface AiChatProps {
  visible: boolean;
  onClose: () => void;
}

/** 思维链条折叠展示组件 */
const ThinkingBlock: React.FC<{ thinking: string }> = ({ thinking }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="ai-chat-thinking">
      <div
        className="ai-chat-thinking-header"
        onClick={() => setExpanded(!expanded)}
      >
        <span className={`ai-chat-thinking-arrow ${expanded ? 'expanded' : ''}`}>
          ▶
        </span>
        <span className="ai-chat-thinking-label">已思考</span>
      </div>
      {expanded && (
        <div className="ai-chat-thinking-body">
          <pre>{thinking}</pre>
        </div>
      )}
    </div>
  );
};

/** 工具调用链折叠展示组件 */
const ToolCallsBlock: React.FC<{ toolCalls: ToolCallItem[] }> = ({ toolCalls }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="ai-chat-thinking" style={{ marginBottom: 8 }}>
      <div
        className="ai-chat-thinking-header"
        onClick={() => setExpanded(!expanded)}
      >
        <span className={`ai-chat-thinking-arrow ${expanded ? 'expanded' : ''}`}>
          ▶
        </span>
        <span className="ai-chat-thinking-label">
          调用了 {toolCalls.length} 个工具
          {toolCalls.some(t => t.status === 'calling') ? '（进行中...）' : ''}
        </span>
      </div>
      {expanded && (
        <div className="ai-chat-thinking-body">
          {toolCalls.map((tc, idx) => (
            <div key={tc.tool_call_id} style={{ marginBottom: 8, padding: '4px 0', borderBottom: idx < toolCalls.length - 1 ? '1px solid #eee' : 'none' }}>
              <div style={{ fontWeight: 500, fontSize: 13, color: '#1890ff' }}>
                {tc.status === 'calling' ? '🔄' : '✅'} {tc.name}
              </div>
              <pre style={{ fontSize: 12, background: '#f5f5f5', padding: 4, borderRadius: 4, margin: '4px 0', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
                {tc.arguments.length > 200 ? tc.arguments.slice(0, 200) + '...' : tc.arguments}
              </pre>
              {tc.result && (
                <pre style={{ fontSize: 12, background: '#f6ffed', padding: 4, borderRadius: 4, margin: '4px 0', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
                  {tc.result.length > 300 ? tc.result.slice(0, 300) + '...' : tc.result}
                </pre>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const AiChat: React.FC<AiChatProps> = ({ visible, onClose }) => {
  const intl = useIntl();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [sessionId, setSessionId] = useState(getStore('aiSessionId') || '');
  const [maximized, setMaximized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const welcomeShownRef = useRef(false);
  const handleNewSession = () => { setMessages([]); setSessionId(''); setStore('aiSessionId', ''); welcomeShownRef.current = false; };

  // 打开组件时检查 sessionId，不存在则显示欢迎消息，存在则从服务器加载历史记录
  useEffect(() => {
    if (!visible) return;
    if (welcomeShownRef.current) return;
    welcomeShownRef.current = true;

    const cachedSessionId = getStore('aiSessionId');
    if (cachedSessionId) {
      setHistoryLoading(true);
      getAiHistories({ session_id: cachedSessionId })
        .then((res) => {
          setMessages(res.data || []);
        })
        .finally(() => {
          setHistoryLoading(false);
        });
    } else {
      const welcomeMessage: Message = {
        role: 'assistant',
        content:
          '你好！我是安企 CMS AI 助手。我可以帮你管理文章、分类、标签和附件。\n\n输入 help 查看可用命令。',
        timestamp: Date.now(),
      };
      setMessages([welcomeMessage]);
    }
  }, [visible]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim() || loading) return;

    const messageContent = inputValue.trim();
    setInputValue('');
    setLoading(true);

    const userMessage: Message = {
      role: 'user',
      content: messageContent,
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, userMessage]);

    try {
      let adminToken = getStore('adminToken');
      const sessionToken = getSessionStore('adminToken');
      if (sessionToken) {
        adminToken = sessionToken;
      }

      const response = await fetch(config.baseUrl + '/anqi/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Admin: adminToken,
        },
        body: JSON.stringify({
          session_id: sessionId,
          message: messageContent,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('No readable stream');
      }

      const decoder = new TextDecoder();
      let buffer = '';
      let assistantMessage: Message | null = null;

      const readStream = async () => {
        try {
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

              console.log('readBuffer data', data);

              if (eventType === 'session' && data) {
                setSessionId(data);
                setStore('aiSessionId', data);
              } else if (eventType === 'reasoning' && data) {
                try {
                  const parsed = JSON.parse(data);
                  if (parsed.v !== undefined) {
                    if (!assistantMessage) {
                      assistantMessage = {
                        role: 'assistant',
                        content: '',
                        thinking: parsed.v,
                        timestamp: parsed.timestamp || Date.now(),
                      };
                      setMessages((prev) => [...prev, assistantMessage!]);
                    } else {
                      assistantMessage.thinking = (assistantMessage.thinking || '') + parsed.v;
                      setMessages((prev) => {
                        const newMessages = [...prev];
                        newMessages[newMessages.length - 1] = assistantMessage!;
                        return newMessages;
                      });
                    }
                  }
                } catch (e) {
                  console.error('Failed to parse reasoning data:', e);
                }
              } else if (eventType === 'tool_call' && data) {
                try {
                  const parsed = JSON.parse(data);
                  // tool_call format: {"name":"xxx","arguments":"{...}","tool_call_id":"xxx"}
                  const toolCall: ToolCallItem = {
                    name: parsed.name || '',
                    arguments: typeof parsed.arguments === 'object' ? JSON.stringify(parsed.arguments) : (parsed.arguments || ''),
                    tool_call_id: parsed.tool_call_id || '',
                    status: 'calling',
                  };
                  if (!assistantMessage) {
                    assistantMessage = {
                      role: 'assistant',
                      content: '',
                      timestamp: parsed.timestamp || Date.now(),
                      toolCalls: [toolCall],
                    };
                    setMessages((prev) => [...prev, assistantMessage!]);
                  } else {
                    if (!assistantMessage.toolCalls) {
                      assistantMessage.toolCalls = [];
                    }
                    assistantMessage.toolCalls.push(toolCall);
                    setMessages((prev) => {
                      const newMessages = [...prev];
                      newMessages[newMessages.length - 1] = assistantMessage!;
                      return newMessages;
                    });
                  }
                } catch (e) {
                  console.error('Failed to parse tool_call data:', e);
                }
              } else if (eventType === 'tool_result' && data) {
                try {
                  const parsed = JSON.parse(data);
                  // tool_result format: {"tool_call_id":"xxx","result":"..."}
                  if (assistantMessage && assistantMessage.toolCalls) {
                    const idx = assistantMessage.toolCalls.findIndex(
                      (tc) => tc.tool_call_id === parsed.tool_call_id
                    );
                    if (idx !== -1) {
                      assistantMessage.toolCalls[idx].status = 'completed';
                      assistantMessage.toolCalls[idx].result = typeof parsed.result === 'object' ? JSON.stringify(parsed.result) : (parsed.result || '');
                      setMessages((prev) => {
                        const newMessages = [...prev];
                        newMessages[newMessages.length - 1] = assistantMessage!;
                        return newMessages;
                      });
                    }
                  }
                } catch (e) {
                  console.error('Failed to parse tool_result data:', e);
                }
              } else if (eventType === 'message' && data) {
                try {
                  const parsed = JSON.parse(data);
                  // SSE stream data format: {"v":"text_chunk","timestamp":...}
                  if (parsed.v !== undefined) {
                    if (!assistantMessage) {
                      assistantMessage = {
                        role: 'assistant',
                        content: parsed.v,
                        timestamp: parsed.timestamp || Date.now(),
                      };
                      setMessages((prev) => [...prev, assistantMessage!]);
                    } else {
                      assistantMessage.content += parsed.v;
                      setMessages((prev) => {
                        const newMessages = [...prev];
                        newMessages[newMessages.length - 1] =
                          assistantMessage!;
                        return newMessages;
                      });
                    }
                  }
                } catch (e) {
                  console.error('Failed to parse SSE data:', e);
                }
              } else if (eventType === 'error' && data) {
                try {
                  const parsed = JSON.parse(data);
                  const errMsg = parsed.message?.content || 'An error occurred';
                  if (!assistantMessage) {
                    assistantMessage = {
                      role: 'assistant',
                      content: errMsg,
                      timestamp: parsed.timestamp || Date.now(),
                    };
                    setMessages((prev) => [...prev, assistantMessage!]);
                  } else {
                    assistantMessage.content = errMsg;
                    setMessages((prev) => {
                      const newMessages = [...prev];
                      newMessages[newMessages.length - 1] = assistantMessage!;
                      return newMessages;
                    });
                  }
                } catch (e) {
                  console.error('Failed to parse error data:', e);
                }
              }
            }
          }
        } finally {
          reader.releaseLock();
          setLoading(false);
        }
      };

      await readStream();
    } catch (error: any) {
      console.error('Chat error:', error);
      message.error(error.message || '发送失败，请重试');
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!visible) return null;

  return (
    <div className={`ai-chat-modal${maximized ? ' maximized' : ''}`}>
      <div className="ai-chat-header">
        <div className="ai-chat-title">
          <svg
            className="ai-chat-icon"
            viewBox="0 0 1024 1024"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
          >
            <path
              d="M521.47 859.38c-63.86 0-127.41-8.29-189.15-24.55h-125.9c-15.16 0.1-29.61-6.37-39.51-17.78s-14.35-26.57-12.23-41.63l14.25-100.74c-22.94-37.49-36.48-96.5-40.32-176.02-10.1-183.8 109.23-349.81 286.76-398.71 39-9.9 79.22-14.85 119.43-14.65 118.52 0 217.64 37.08 286.56 107.51s107.71 176.52 106.09 294.64c-0.3 57.39-12.93 114.08-37.08 166.11-80.22 167.63-239.97 205.62-368.9 205.82z"
              fill="#1890ff"
            />
            <path
              d="M540.57 574.74l-13.14-34.76H415.18l-13.34 35.26c-3.23 9.8-7.58 19.2-13.14 27.99-4.34 5.25-11.11 7.98-17.99 7.38-7.17 0.2-14.25-2.63-19.3-7.68a23.851 23.851 0 0 1-8.08-17.58c0.1-3.94 0.71-7.78 1.92-11.62 1.31-4.04 3.23-9.7 6.16-16.77l70.83-179.45c1.92-5.25 4.45-11.42 7.17-19.3 2.32-6.37 5.36-12.33 9.09-17.99 3.23-4.85 7.48-8.79 12.53-11.62 17.48-10.41 40.01-5.36 51.53 11.42 3.23 4.65 5.96 9.6 8.08 14.85l8.49 21.42 72.25 178.44c5.05 9.4 8.29 19.7 9.7 30.31-0.1 6.77-2.93 13.14-7.88 17.78-5.05 5.15-12.02 7.98-19.3 7.88-3.94 0.1-7.78-0.71-11.42-2.32-3.03-1.52-5.76-3.64-7.88-6.37-2.83-3.84-5.05-8.08-6.77-12.53-3.32-5.44-4.73-10.49-7.26-14.74z m-110.74-77.19h82.35l-41.53-114.08-40.82 114.08z m213.8 78.91V358.82a36.171 36.171 0 0 1 7.68-25.26c4.95-5.46 11.92-8.59 19.3-8.49 7.68-0.3 15.16 2.73 20.41 8.29 5.66 7.17 8.49 16.27 7.68 25.46v217.64c0.81 9.19-2.02 18.39-7.68 25.66-5.25 5.66-12.73 8.79-20.41 8.49-7.38 0-14.35-3.03-19.3-8.49-5.66-7.27-8.39-16.36-7.68-25.66z"
              fill="#1890ff"
            />
          </svg>
          <span>AI 助手</span>
        </div>
        <div className="ai-chat-header-actions" style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
          <Button
            type="text"
            icon={<PlusOutlined />}
            onClick={handleNewSession}
          />
          <Button
            type="text"
            icon={maximized ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
            onClick={() => setMaximized(!maximized)}
          />
          <Button
            type="text"
            icon={<CloseOutlined />}
            onClick={onClose}
            className="ai-chat-close"
          />
        </div>
      </div>

      <div className="ai-chat-messages">
        {historyLoading && (
          <div className="ai-chat-message assistant">
            <div className="ai-chat-message-content">
              <Spin size="small" /> 加载历史记录...
            </div>
          </div>
        )}
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`ai-chat-message ${
              msg.role === 'user' ? 'user' : 'assistant'
            }`}
          >
            <div className="ai-chat-message-content">
              {msg.role === 'assistant' && msg.thinking ? (
                <ThinkingBlock thinking={msg.thinking} />
              ) : null}
              {msg.role === 'assistant' && msg.toolCalls && msg.toolCalls.length > 0 ? (
                <ToolCallsBlock toolCalls={msg.toolCalls} />
              ) : null}
              {msg.role === 'assistant' ? (
                msg.content ? (
                  <Viewer value={msg.content} plugins={[gfm()]} />
                ) : msg.thinking ? null : (
                  <Spin size="small" />
                )
              ) : (
                msg.content
              )}
            </div>
          </div>
        ))}
        {loading &&
          !messages.some(
            (m) => m.role === 'assistant' && m.content.length > 0,
          ) && (
            <div className="ai-chat-message assistant">
              <div className="ai-chat-message-content">
                <Spin size="small" />
              </div>
            </div>
          )}
        <div ref={messagesEndRef} />
      </div>

      <div className="ai-chat-input">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onPressEnter={handleSend}
          placeholder="输入消息..."
          disabled={loading}
          allowClear
        />
        <Button
          type="primary"
          icon={<SendOutlined />}
          onClick={handleSend}
          loading={loading}
          disabled={!inputValue.trim()}
          className="ai-chat-send"
        />
      </div>
    </div>
  );
};

export default AiChat;
