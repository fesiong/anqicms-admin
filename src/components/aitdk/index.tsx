import { anqiAiChat, getAnqiInfo } from '@/services';
import {
  ProForm,
  ProFormInstance,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Button, Checkbox, Modal, Space, Tag, message } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import './index.less';

export type AiGetTdkProps = {
  onCancel: (flag?: boolean) => void;
  onSubmit: (values: any) => Promise<void>;
  open: boolean;
  content: string;
};

const AiGetTdk: React.FC<AiGetTdkProps> = (props) => {
  const formRef = useRef<ProFormInstance>();
  const [anqiUser, setAnqiUser] = useState<any>({});
  const [plainText, setPlainText] = useState<string>('');
  const [tdk, setTdk] = useState<any>({});
  const [aiContent, setAiContent] = useState<string>('');
  const [parseOk, setParseOk] = useState<boolean>(false);
  const [aiFinished, setAiFinished] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const intl = useIntl();

  const prompt = `<content>{content}</content>\n请帮我根据以上内容生成TDK，并按 {"title": "标题", "description": "描述", "keywords": "关键词"} 的JSON格式返回结果\n注意：你应该先判断一下这句话是中文还是英文，如果是中文，请给我返回中文的内容，如果是英文，请给我返回英文内容，只需要返回JSON内容即可，不需要告知我是中文还是英文。`;

  let tmpContent = '';

  useEffect(() => {
    // 获取AIremain
    getAnqiInfo().then((res) => {
      setAnqiUser(res.data || {});
    });
    setPlainText(props.content.replace(/<[^>]*>/g, ''));
  }, []);

  const finishedGenerate = () => {
    let newTdk = {
      description: tdk.description,
      keywords: tdk.keywords_ok ? tdk.keywords : '',
      title: tdk.title_ok ? tdk.title : '',
    };
    props.onSubmit(newTdk);
  };

  const startGenerate = () => {
    if (loading) {
      return;
    }
    if (props.content.length < 200) {
      message.error(
        intl.formatMessage({ id: 'component.aitdk.content.required' }),
      );
      return;
    }
    setLoading(true);
    setAiContent('');
    anqiAiChat(
      {
        prompt: prompt.replace('{content}', plainText),
        type: 3, // 使用普通ai来做总结
      },
      {
        //responseType: 'stream',
        onDownloadProgress: (progressEvent: any) => {
          // 处理 SSE 数据
          const chunks = progressEvent.target.response.split('\n');
          tmpContent = '';

          for (const chunk of chunks) {
            if (chunk.startsWith('data: ')) {
              let data = chunk.slice(6); // 移除 'data: ' 前缀

              try {
                const parsed = JSON.parse(data);
                tmpContent += parsed.content;
              } catch (e) {
                console.error('Error parsing SSE data:', e);
              }
            }
          }
          setAiContent(tmpContent);
        },
      },
    )
      .then(async (res) => {
        if (res.code) {
          Modal.error({
            title: res.msg,
          });
        }
        setAiFinished(true);
        setLoading(false);
        if (tmpContent) {
          if (tmpContent.includes('{') && tmpContent.includes('}')) {
            let idx1 = tmpContent.indexOf('{');
            let idx2 = tmpContent.lastIndexOf('}');
            let parsed: any = JSON.parse(tmpContent.slice(idx1, idx2 + 1));
            if (typeof parsed.keywords === 'object') {
              parsed.keywords = parsed.keywords.join(',');
            }
            if (parsed.title) {
              setParseOk(true);
            }
            parsed.title_ok = true;
            parsed.description_ok = true;
            parsed.keywords_ok = true;
            setTdk(parsed);
          }
        }
      })
      .catch(() => {})
      .finally(() => {});
  };

  return (
    <Modal
      width={800}
      title={<FormattedMessage id="component.aitdk.name" />}
      open={props.open}
      onCancel={() => {
        props.onCancel();
      }}
      footer={null}
    >
      <div className="mb-normal">
        <div className="extra-text">
          <Space>
            <span>
              <FormattedMessage id="component.right-content.integral" />
              {anqiUser.integral}
            </span>
            <span>
              <FormattedMessage id="component.right-content.free-token" />
              {anqiUser.free_token}
            </span>
            <span>
              <FormattedMessage id="component.right-content.total-token" />
              {anqiUser.total_token}
            </span>
            <span>
              <FormattedMessage id="component.right-content.un-pay-token" />
              {anqiUser.un_pay_token}
            </span>
            {anqiUser.is_owe_fee === 1 && (
              <Tag color="red">
                <FormattedMessage id="component.right-content.is-owe-fee" />
              </Tag>
            )}
          </Space>
          <div>
            <FormattedMessage id="component.right-content.total-token.description" />
          </div>
        </div>
      </div>
      <ProForm layout="horizontal" formRef={formRef} submitter={false}>
        {aiContent && ((aiFinished && !parseOk) || !aiFinished) && (
          <ProFormTextArea
            label={intl.formatMessage({ id: 'component.aitdk.ai-result' })}
            fieldProps={{
              value: aiContent,
            }}
            extra={
              !parseOk
                ? intl.formatMessage({ id: 'component.aitdk.parse-fail' })
                : ''
            }
          />
        )}
        {aiFinished && (
          <>
            <ProFormText
              label={intl.formatMessage({ id: 'content.title.name' })}
              name={['tdk', 'title']}
              fieldProps={{
                value: tdk.title,
                onChange: (e) => {
                  setTdk({
                    ...tdk,
                    title: e.target.value,
                  });
                },
                suffix: (
                  <Checkbox
                    checked={tdk.title_ok}
                    onChange={(e) => {
                      setTdk({
                        ...tdk,
                        title_ok: e.target.checked,
                      });
                    }}
                  />
                ),
              }}
            />
            <ProFormText
              label={intl.formatMessage({ id: 'content.keywords.name' })}
              name={['tdk', 'keywords']}
              fieldProps={{
                value: tdk.keywords,
                onChange: (e) => {
                  setTdk({
                    ...tdk,
                    keywords: e.target.value,
                  });
                },
                suffix: (
                  <Checkbox
                    checked={tdk.keywords_ok}
                    onChange={(e) => {
                      setTdk({
                        ...tdk,
                        keywords_ok: e.target.checked,
                      });
                    }}
                  />
                ),
              }}
            />
            <ProFormTextArea
              label={intl.formatMessage({ id: 'content.description.name' })}
              name={['tdk', 'description']}
              fieldProps={{
                value: tdk.description,
                onChange: (e) => {
                  setTdk({
                    ...tdk,
                    description: e.target.value,
                  });
                },
              }}
            />
          </>
        )}
        <div className="generate-btn mb-normal">
          <Space size={20}>
            <Button
              onClick={startGenerate}
              loading={loading}
              disabled={aiFinished}
            >
              <FormattedMessage id="component.aitdk.btn.generate" />
            </Button>
            {aiFinished && (
              <>
                <Button onClick={finishedGenerate} loading={loading}>
                  <FormattedMessage id="component.aigenerate.btn.finish" />
                </Button>
                <Button onClick={() => props.onCancel()} loading={loading}>
                  <FormattedMessage id="component.aigenerate.btn.abundant" />
                </Button>
              </>
            )}
          </Space>
        </div>
      </ProForm>
    </Modal>
  );
};

export default AiGetTdk;
