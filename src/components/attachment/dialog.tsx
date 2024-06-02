import { Modal } from 'antd';
import './index.less';
import AttachmentContent from './content';

const Attachment = () => {};

Attachment.show = (multiple?: boolean) => {
  let p = new Promise((res, rej) => {
    let selectedKeys: any[] = [];
    let close: () => void;
    const onSelect = (val: any) => {
      if (!multiple) {
        close();
        res(val);
      } else {
        selectedKeys = val;
      }
    };

    const onCancel = () => {
      close();
      rej();
    };

    const onSubmit = () => {
      if (multiple) {
        res(selectedKeys);
      }
      close();
    };

    const { destroy } = Modal.info({
      icon: null,
      maskClosable: true,
      width: 800,
      wrapClassName: 'attachment-dialog',
      okText: '确定',
      content: (
        <AttachmentContent onSelect={onSelect} onCancel={() => onCancel()} multiple={multiple} />
      ),
      onCancel: () => {
        onCancel();
      },
      onOk: () => {
        onSubmit();
      },
    });
    close = destroy;
  });

  return p;
};
export default Attachment;
