import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import { MonacoDiffEditor } from 'react-monaco-editor';

export type TemplateCompareProps = {
  originCode: string;
  versionCode: string;
  language: string;
  visible: boolean;
  onFinished?: (code: string) => void;
  onCancel: () => void;
};

const TemplateCompare: React.FC<TemplateCompareProps> = (props) => {
  const [code, setCode] = useState<string>(``);

  useEffect(() => {
    setCode(props.versionCode);
  }, []);

  const editorDidMount = (editor: any, monaco: any) => {
    //console.log('editorDidMount', editor);
    //editor.focus();
  };

  const onChangeCode = (newCode: string) => {
    if (code != newCode) {
      setCode(newCode);
    }
  };

  const handleSave = () => {
    props.onFinished?.(code);
  };

  return (
    <Modal
      title="文件历史"
      visible={props.visible}
      onCancel={() => {
        props.onCancel();
      }}
      onOk={() => {
        handleSave();
      }}
      width={1000}
    >
      <MonacoDiffEditor
        width="950"
        height="600"
        language={props.language}
        original={props.originCode}
        value={code}
        options={{
          selectOnLineNumbers: false,
          renderSideBySide: false,
          // originalEditable: true,
          automaticLayout: true,
          wordWrap: 'on',
        }}
        onChange={onChangeCode}
        editorDidMount={editorDidMount}
      />
    </Modal>
  );
};

export default TemplateCompare;
