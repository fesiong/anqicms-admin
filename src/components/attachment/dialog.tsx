import { Modal } from 'antd';
import './index.less';
import AttachmentContent from './content';

const Attachment = () => {};

Attachment.show = () => {
  let p = new Promise((res, rej) => {
    let close: () => void;
    const onSelect = (val: any) => {
      close();

      res(val);
    };

    const onCancel = () => {
      close();
      rej();
    };

    const { destroy } = Modal.info({
      icon: null,
      maskClosable: true,
      width: 800,
      wrapClassName: 'attachment-dialog',
      okButtonProps: { style: { display: 'none' } },
      content: <AttachmentContent onSelect={onSelect} onCancel={() => onCancel()} />,
      onCancel: () => {
        onCancel();
      },
      onOk: () => {
        onCancel();
      },
    });
    close = destroy;
  });

  return p;
};
export default Attachment;
