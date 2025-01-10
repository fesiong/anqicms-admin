import { Modal } from 'antd';
import AttachmentContent from './content';
import './index.less';

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
      content: (
        <AttachmentContent
          onSelect={onSelect}
          onCancel={() => onCancel()}
          multiple={multiple}
        />
      ),
      okText: 'OK',
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
