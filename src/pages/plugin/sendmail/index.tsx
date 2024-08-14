import {
  pluginGetSendmailSetting,
  pluginGetSendmails,
  pluginTestSendmail,
} from '@/services/plugin/sendmail';
import { ActionType, PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import { Alert, Button, message } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useRef, useState } from 'react';
import SendmailSetting from './components/setting';
import { FormattedMessage, useIntl } from '@umijs/max';

const PluginSendmail: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [setting, setSetting] = useState<any>({});
  const intl = useIntl();

  const getSetting = async () => {
    let res = await pluginGetSendmailSetting();
    setSetting(res.data || {});
  };

  useEffect(() => {
    getSetting();
  }, []);

  const handleSendTest = async () => {
    const hide = message.loading(intl.formatMessage({ id: 'plugin.sendmail.test.sending' }), 0);

    let res = await pluginTestSendmail();
    actionRef?.current?.reload();
    hide();
    message.info(res.msg);
  };

  const columns: ProColumns<any>[] = [
    {
      title: intl.formatMessage({ id: 'plugin.sendmail.send-time' }),
      width: 160,
      dataIndex: 'created_time',
      render: (text, record) => dayjs(record.created_time * 1000).format('YYYY-MM-DD HH:mm'),
    },
    {
      title: intl.formatMessage({ id: 'plugin.sendmail.recipient' }),
      dataIndex: 'address',
    },
    {
      title: intl.formatMessage({ id: 'plugin.sendmail.subject' }),
      dataIndex: 'subject',
    },
    {
      title: intl.formatMessage({ id: 'plugin.sendmail.status' }),
      width: 160,
      dataIndex: 'status',
    },
  ];

  return (
    <PageContainer>
      <Alert className="mb-normal" message={intl.formatMessage({ id: 'plugin.sendmail.tips' })} />
      <ProTable<any>
        headerTitle={intl.formatMessage({ id: 'menu.plugin.sendmail' })}
        rowKey="id"
        actionRef={actionRef}
        search={false}
        pagination={false}
        toolBarRender={() => [
          <div key="sender">
            <span><FormattedMessage id="plugin.sendmail.recipient" />: </span>
            <span>
              {setting.recipient || setting.account
                ? setting.recipient || setting.account
                : intl.formatMessage({ id: 'plugin.sendmail.recipient.required' })}
            </span>
            {(setting.recipient || setting.account) && (
              <span>
                &nbsp;&nbsp;&nbsp;<Button onClick={() => handleSendTest()}><FormattedMessage id="plugin.sendmail.test.send" /></Button>
              </span>
            )}
          </div>,
          <SendmailSetting
            key="setting"
            onCancel={() => {
              getSetting();
            }}
          >
            <Button><FormattedMessage id="plugin.sendmail.setting" /></Button>
          </SendmailSetting>,
        ]}
        request={(params) => {
          return pluginGetSendmails(params);
        }}
        columnsState={{
          persistenceKey: 'sendmail-log-table',
          persistenceType: 'localStorage',
        }}
        columns={columns}
      />
    </PageContainer>
  );
};

export default PluginSendmail;
