import { Button, Drawer, List, Spin } from 'antd';

interface AgentDrawerProps {
  visible: boolean;
  loading: boolean;
  agents: any[];
  onClose: () => void;
  onRun: (agent: any) => void;
  onChat: (agent: any) => void;
  onLogs: (agent: any) => void;
  onToggle: (agent: any, enabled: number) => void;
  onDelete: (agent: any) => void;
}

const AgentDrawer: React.FC<AgentDrawerProps> = ({
  visible,
  loading,
  agents,
  onClose,
  onRun,
  onChat,
  onLogs,
  onToggle,
  onDelete,
}) => {
  return (
    <Drawer
      title="AI 智能体管理"
      placement="right"
      className="agent-drawer"
      open={visible}
      onClose={onClose}
      width={520}
    >
      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px 0' }}>
          <Spin size="small" />
        </div>
      ) : agents.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px 0', color: '#999' }}>
          暂无智能体。
          <br />
          在 AI 聊天中告诉 AI 创建即可，例如：
          <br />
          <em>创建一个每日写作智能体，每天早上8点搜索热词并写3篇文章</em>
        </div>
      ) : (
        <List
          size="small"
          dataSource={agents}
          itemLayout="vertical"
          renderItem={(item: any) => (
            <List.Item
              actions={[
                <Button
                  key="run"
                  type="link"
                  size="small"
                  onClick={() => onRun(item)}
                >
                  执行
                </Button>,
                <Button
                  key="chat"
                  type="link"
                  size="small"
                  onClick={() => onChat(item)}
                >
                  对话
                </Button>,
                <Button
                  key="logs"
                  type="link"
                  size="small"
                  onClick={() => onLogs(item)}
                >
                  日志
                </Button>,
                <Button
                  key="toggle"
                  type="link"
                  size="small"
                  onClick={() => onToggle(item, item.enabled === 1 ? 0 : 1)}
                >
                  {item.enabled === 1 ? '暂停' : '启用'}
                </Button>,
                <Button
                  key="delete"
                  type="link"
                  size="small"
                  danger
                  onClick={() => onDelete(item)}
                >
                  删除
                </Button>,
              ]}
            >
              <List.Item.Meta
                title={
                  <div style={{ fontSize: 13 }}>
                    <span
                      style={{
                        display: 'inline-block',
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        background: item.enabled === 1 ? '#52c41a' : '#d9d9d9',
                        marginRight: 6,
                      }}
                    />
                    {item.name || `智能体 #${item.id}`}
                  </div>
                }
                description={
                  <div style={{ fontSize: 12, color: '#999' }}>
                    {item.cron_expr ? `⏰ ${item.cron_expr}` : '🔘 仅手动'}
                    {' | '}
                    运行 {item.run_count || 0} 次
                    {item.last_run_at > 0
                      ? ` | 上次 ${new Date(
                          item.last_run_at * 1000,
                        ).toLocaleString()}`
                      : ''}
                    {item.last_summary && (
                      <div
                        style={{
                          marginTop: 4,
                          padding: '4px 8px',
                          background: '#f5f5f5',
                          borderRadius: 4,
                          maxHeight: 60,
                          overflow: 'hidden',
                        }}
                      >
                        {item.last_summary.slice(0, 200)}
                      </div>
                    )}
                  </div>
                }
              />
            </List.Item>
          )}
        />
      )}
    </Drawer>
  );
};

export default AgentDrawer;
