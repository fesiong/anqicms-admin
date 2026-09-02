import { Viewer } from '@bytemd/react';
import { Drawer, List, Spin, Tag } from 'antd';

interface AgentLogDrawerProps {
  visible: boolean;
  loading: boolean;
  agent: any;
  logs: any[];
  onClose: () => void;
}

const statusColor: Record<number, string> = {
  1: 'success',
  2: 'error',
};

const statusText: Record<number, string> = {
  1: '成功',
  2: '失败',
};

const AgentLogDrawer: React.FC<AgentLogDrawerProps> = ({
  visible,
  loading,
  agent,
  logs,
  onClose,
}) => {
  return (
    <Drawer
      title={agent ? `执行日志 - ${agent.name || `#${agent.id}`}` : '执行日志'}
      open={visible}
      onClose={onClose}
      width={560}
    >
      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px 0' }}>
          <Spin size="small" />
        </div>
      ) : logs.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px 0', color: '#999' }}>
          暂无执行日志
        </div>
      ) : (
        <List
          size="small"
          dataSource={logs}
          renderItem={(item: any, index: number) => (
            <List.Item>
              <List.Item.Meta
                title={
                  <div style={{ fontSize: 13 }}>
                    <Tag color={statusColor[item.status] || 'processing'}>
                      {statusText[item.status] || '执行中'}
                    </Tag>
                    {item.created_time
                      ? new Date(item.created_time * 1000).toLocaleString()
                      : ''}
                    {item.tool_calls > 0 && ` | ${item.tool_calls} 次工具调用`}
                  </div>
                }
                description={
                  <div style={{ fontSize: 12, color: '#666' }}>
                    {item.summary && (
                      <div style={{ marginBottom: 4 }}>
                        <Viewer key={`seg-${index}`} value={item.summary} />
                      </div>
                    )}
                    {item.error && (
                      <div style={{ color: '#ff4d4f' }}>{item.error}</div>
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

export default AgentLogDrawer;
