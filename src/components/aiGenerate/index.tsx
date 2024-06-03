import React, { useEffect, useState } from 'react';
import { Button, Divider, message, Modal, Space } from 'antd';
import {
  anqiAiGenerateStream,
  anqiAiGenerateStreamData,
  getAnqiInfo,
  getCollectCombineArticle,
} from '@/services';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import './index.less';

export type AiGenerateProps = {
  onCancel: (flag?: boolean) => void;
  onSubmit: (values: any) => Promise<void>;
  visible: boolean;
  title: string;
  editor?: string;
};

let xhr: any = null;

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
    setAiTitle(props.title || '');

    return () => {
      clearInterval(xhr);
    };
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
      .then((res) => {
        if (!res || res.code !== 0) {
          message.error(res?.msg || '出错啦');
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
    anqiAiGenerateStream({
      title: aiTitle,
      demand: aiDemand,
    })
      .then(async (res) => {
        if (res.code !== 0) {
          setLoading(false);
          message.error(res.msg);
          return;
        }
        // 重置
        tmpContent = '';
        let streamId = res.data;
        xhr = setInterval(() => {
          getStreamData(streamId);
        }, 1000);
      })
      .catch(() => {})
      .finally(() => {});
  };

  const getStreamData = (streamId: string) => {
    anqiAiGenerateStreamData({
      stream_id: streamId,
    }).then((res) => {
      if (res.code != 0) {
        setLoading(false);
        clearInterval(xhr);
        Modal.error({
          title: res.msg,
        });
        return;
      }
      setAiFinished(true);
      if (res.data) {
        if (!tmpContent && props.editor !== 'markdown') {
          tmpContent += '<p>';
        }
        if (props.editor == 'markdown') {
          tmpContent += res.data;
        } else {
          tmpContent += res.data.replace(/\n+/g, '</p>\n<p>');
        }
        setAiContent(tmpContent);
      }

      if (res.msg == 'finished') {
        if (tmpContent && props.editor !== 'markdown') {
          tmpContent += '</p>';
          setAiContent(tmpContent);
        }
        setLoading(false);
        clearInterval(xhr);
      }
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
          dangerouslySetInnerHTML={{
            __html: aiContent
              ? props.editor == 'markdown'
                ? aiContent.replace(/\n+/g, '</p>\n<p>')
                : aiContent
              : 'AI生成结果将会在这里显示',
          }}
        ></div>
      </ProForm>
    </Modal>
  );
};

export default AiGenerate;
