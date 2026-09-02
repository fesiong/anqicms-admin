import {
  ModalForm,
  ProFormDigit,
  ProFormRadio,
  ProFormText,
} from '@ant-design/pro-components';
import { Button, List, Modal } from 'antd';
import { AiProviderConfig } from '../types';

interface SettingsPanelProps {
  visible: boolean;
  onClose: () => void;
  customProviders: AiProviderConfig[];
  onAdd: () => void;
  onEdit: (index: number, provider: AiProviderConfig) => void;
  onDelete: (index: number) => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({
  visible,
  onClose,
  customProviders,
  onAdd,
  onEdit,
  onDelete,
}) => {
  return (
    <Modal
      title="AI 设置"
      open={visible}
      onCancel={onClose}
      footer={null}
      width={560}
    >
      <div style={{ marginBottom: 12 }}>
        <Button type="primary" size="small" onClick={onAdd}>
          添加自定义接口
        </Button>
      </div>
      {customProviders.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '24px 0', color: '#999' }}>
          暂无自定义接口
        </div>
      ) : (
        <List
          size="small"
          dataSource={customProviders}
          renderItem={(item: AiProviderConfig, index: number) => (
            <List.Item
              actions={[
                <Button
                  key="edit"
                  type="link"
                  size="small"
                  onClick={() => onEdit(index, item)}
                >
                  编辑
                </Button>,
                <Button
                  key="delete"
                  type="link"
                  size="small"
                  danger
                  onClick={() => onDelete(index)}
                >
                  删除
                </Button>,
              ]}
            >
              <List.Item.Meta
                title={item.name}
                description={
                  <span style={{ fontSize: 12, color: '#999' }}>
                    {item.base_url} | {item.model}
                  </span>
                }
              />
            </List.Item>
          )}
        />
      )}
    </Modal>
  );
};

export default SettingsPanel;

// -------------------------------------------------------------------------
// 编辑自定义接口表单
// -------------------------------------------------------------------------

interface ProviderFormModalProps {
  visible: boolean;
  editProvider: AiProviderConfig | null;
  editIndex: number;
  onClose: () => void;
  onSave: (values: any) => void;
}

export const ProviderFormModal: React.FC<ProviderFormModalProps> = ({
  visible,
  editProvider,
  editIndex,
  onClose,
  onSave,
}) => {
  return (
    <ModalForm
      title={editIndex !== -1 ? '编辑自定义接口' : '添加自定义接口'}
      open={visible}
      onOpenChange={(flag) => {
        if (!flag) onClose();
      }}
      layout="horizontal"
      initialValues={editProvider || {}}
      onFinish={async (values) => {
        onSave(values);
      }}
      width={520}
    >
      {editProvider && (
        <div>
          <ProFormText
            name="name"
            label="接口名称"
            placeholder="例如：我的 DeepSeek"
            rules={[{ required: true, message: '请填写接口名称' }]}
          />
          <ProFormText
            name="base_url"
            label="API 地址"
            placeholder="https://api.openai.com/v1"
            rules={[{ required: true, message: '请填写 API 地址' }]}
          />
          <ProFormText
            name="api_key"
            label="API Key"
            placeholder="sk-xxxxxxxxxxxxxxxx"
            rules={[{ required: true, message: '请填写 API Key' }]}
          />
          <ProFormText
            name="model"
            label="模型"
            placeholder="deepseek-v4-flash"
            rules={[{ required: true, message: '请填写模型名称' }]}
          />
          <ProFormRadio.Group
            name="enable_reasoning"
            label="思考模式"
            options={[
              { label: '开启', value: true },
              { label: '关闭', value: false },
            ]}
          />
          <ProFormDigit
            name="max_tokens"
            label="最大回复长度"
            placeholder="8192"
          />
          <ProFormDigit
            name="timeout_seconds"
            label="请求超时时间"
            placeholder="120"
          />
        </div>
      )}
    </ModalForm>
  );
};
