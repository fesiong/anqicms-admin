import React, { useEffect, useState } from 'react';
import { Button, Divider, message, Modal, Space } from 'antd';
import { anqiAiGenerateStream, getAnqiInfo, getCollectCombineArticle } from '@/services';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import './index.less';

export type AiGenerateProps = {
  onCancel: (flag?: boolean) => void;
  onSubmit: (values: any) => Promise<void>;
  visible: boolean;
  title: string;
};

const AiGenerate: React.FC<AiGenerateProps> = (props) => {
  const [anqiUser, setAnqiUser] = useState<any>({});
  const [aiTitle, setAiTitle] = useState<string>('');
  const [aiDemand, setAiDemand] = useState<string>('');
  const [aiContent, setAiContent] = useState<string>('');
  const [aiFinished, setAiFinished] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  // 临时的
  let tmpContent = '';

  useEffect(() => {
    // 获取AIremain
    getAnqiInfo().then((res) => {
      setAnqiUser(res.data || {});
    });
    setAiTitle(props.title);
  }, []);

  const onChangeAiTitle = (e: any) => {
    setAiTitle(e.target.value);
  };

  const onChangeAiDemand = (e: any) => {
    setAiDemand(e.target.value);
  };

  const finishedGenerate = () => {
    Modal.confirm({
      title: '提示',
      content: '提交后，会自动将标题和内容回填到文章标题和内容编辑框中',
      onOk: () => {
        props.onSubmit({
          title: aiTitle,
          content: aiContent,
        });
      },
    });
  };

  const startCombine = () => {
    if (loading) {
      return;
    }
    if (aiTitle.length < 2) {
      message.error('请填写文章标题');
      return;
    }
    setLoading(true);
    getCollectCombineArticle({
      title: aiTitle,
      demand: aiDemand,
    })
      .then(async (res) => {
        if (res.code !== 0) {
          message.error(res.msg);
          return;
        }
        setAiTitle(res.data.title);
        setAiContent(res.data.content);
        setAiFinished(true);
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
  };

  const startGenerate = () => {
    if (loading) {
      return;
    }
    if (aiTitle.length < 2) {
      message.error('请填写文章标题');
      return;
    }
    setLoading(true);
    anqiAiGenerateStream(
      {
        keyword: aiTitle,
        demand: aiDemand,
      },
      {
        getResponse: true,
        prefix: 'https://www.anqicms.com/auth',
        responseType: 'stream',
        headers: {
          token: anqiUser.token,
        },
      },
    )
      .then(async (res) => {
        // 重置
        tmpContent = '';
        const reader = res.body?.getReader();
        if (reader) {
          while (true) {
            const decoder = new TextDecoder('utf-8');
            let { done, value } = await reader.read();
            const text = decoder.decode(value, { stream: true });
            console.log(text);
            const texts = text.trim().split('\n');
            for (let i in texts) {
              try {
                let data = JSON.parse(texts[i]);
                if (data.code != 0) {
                  message.error(data.msg);
                }
                if (data && data.data) {
                  if (!tmpContent) {
                    tmpContent += '<p>';
                  }
                  tmpContent += data.data.replace(/\n+/g, '</p>\n<p>');
                  setAiContent(tmpContent);
                }
                if (data.msg == 'finished') {
                  done = true;
                  break;
                }
              } catch (e) {}
            }
            if (done) {
              if (tmpContent) {
                tmpContent += '</p>';
                setAiFinished(true);
              }
              break;
            }
          }
        }
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Modal
      width={800}
      title={
        <div>
          <span>AI生成文章</span>
          <div className="extra-text">
            剩余AI生成额度 <span className="text-primary">{anqiUser.ai_remain}</span> 篇
          </div>
        </div>
      }
      visible={props.visible}
      onCancel={() => {
        props.onCancel();
      }}
      footer={null}
    >
      <ProForm layout="horizontal" submitter={false}>
        <ProFormText
          label="文章标题"
          name="title"
          placeholder="请填写文章标题，AI将根据标题生成内容。"
          fieldProps={{
            value: aiTitle,
            onChange: onChangeAiTitle,
          }}
        />
        <ProFormText
          label="其他要求"
          name="demand"
          placeholder="如果有其他要求，不能超过150字"
          fieldProps={{
            maxLength: 150,
            value: aiDemand,
            onChange: onChangeAiDemand,
          }}
        />
        <div className="generate-btn mb-normal">
          <Space size={20}>
            <Button onClick={startGenerate} loading={loading} disabled={aiFinished}>
              开始AI生成(收费)
            </Button>
            <Button onClick={startCombine} loading={loading} disabled={aiFinished}>
              问答组合生成
            </Button>
            {aiFinished && (
              <Button onClick={finishedGenerate} loading={loading}>
                完成
              </Button>
            )}
          </Space>
        </div>
        <Divider />
        <div
          className="article-detail"
          dangerouslySetInnerHTML={{ __html: aiContent || 'AI生成结果将会在这里显示' }}
        ></div>
      </ProForm>
    </Modal>
  );
};

export default AiGenerate;
