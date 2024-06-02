import React, { useState } from 'react';
import { Modal } from 'antd';
import './index.less';
import AttachmentContent from './content';

export type AttachmentProps = {
  onSelect: (row?: any) => void;
  onCancel?: (row?: any) => void;
  visible?: boolean;
  manual?: boolean;
  multiple?: boolean;
  children?: React.ReactNode;
};

const AttachmentSelect: React.FC<AttachmentProps> = (props) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([]);

  const useDetail = (row: any) => {
    if (!props.multiple) {
      props.onSelect(row);
      visibleControl(false);
    } else {
      setSelectedRowKeys(row);
    }
  };

  const visibleControl = (flag: boolean) => {
    props.manual ? (props.onCancel ? props.onCancel(flag) : null) : setVisible(flag);
  };

  const onSubmit = () => {
    if (props.multiple) {
      props.onSelect(selectedRowKeys);
    }
    visibleControl(false);
  };

  return (
    <>
      <div
        style={{ display: 'inline-block' }}
        onClick={() => {
          visibleControl(!visible);
        }}
      >
        {props.children}
      </div>
      <Modal
        className="material-modal"
        width={800}
        visible={props.manual ? props.visible : visible}
        onCancel={() => {
          visibleControl(false);
        }}
        onOk={() => {
          onSubmit();
        }}
      >
        <AttachmentContent
          multiple={props.multiple}
          onSelect={(e: any) => {
            useDetail(e);
          }}
        />
      </Modal>
    </>
  );
};

export default AttachmentSelect;
