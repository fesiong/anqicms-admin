import React, { useEffect, useState } from 'react';
import { ModalForm, ProFormText } from '@ant-design/pro-form';
import { Button, Divider, message, Upload } from 'antd';
import { pluginGetPayConfig, pluginPayUploadFile, pluginSavePayConfig } from '@/services';

export type PayConfigProps = {
  onCancel: (flag?: boolean) => void;
};

const PayConfig: React.FC<PayConfigProps> = (props) => {
  const [setting, setSetting] = useState<any>(null);
  const [visible, setVisible] = useState<boolean>(false);
  const [fetched, setFetched] = useState<boolean>(false);

  const getSetting = async () => {
    const res = await pluginGetPayConfig();
    setSetting(res.data || {});
    setFetched(true);
  };

  useEffect(() => {
    getSetting();
  }, []);

  const onSubmit = async (values: any) => {
    const hide = message.loading('正在提交中', 0);
    pluginSavePayConfig(values)
      .then((res) => {
        message.success(res.msg);
        setVisible(false);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        hide();
      });
  };

  const handleUploadFile = (field: string, e: any) => {
    const formData = new FormData();
    formData.append('file', e.file);
    formData.append('name', field);
    const hide = message.loading('正在提交中', 0);
    pluginPayUploadFile(formData)
      .then((res) => {
        message.success(res.msg);
        setting[field] = res.data;
        setSetting(Object.assign({}, setting));
      })
      .finally(() => {
        hide();
      });
  };

  return (
    <>
      <div
        onClick={() => {
          setVisible(!visible);
        }}
      >
        {props.children}
      </div>
      {fetched && (
        <ModalForm
          title="支付配置"
          visible={visible}
          initialValues={setting}
          onVisibleChange={(flag) => {
            setVisible(flag);
          }}
          onFinish={onSubmit}
        >
          <Divider>微信支付</Divider>
          <ProFormText name="weixin_app_id" label="微信服务号AppID" width="lg" />
          <ProFormText name="weixin_app_secret" label="微信服务号AppSecret" width="lg" />
          <ProFormText name="weapp_app_id" label="微信小程序AppID" width="lg" />
          <ProFormText name="weapp_app_secret" label="微信小程序AppSecret" width="lg" />
          <ProFormText name="weixin_mch_id" label="微信商户ID" width="lg" />
          <ProFormText name="weixin_api_key" label="微信商户APIKey" width="lg" />
          <ProFormText name="weixin_cert_path" label="微信商户证书Cert">
            <Upload
              name="file"
              className="logo-uploader"
              showUploadList={false}
              accept=".crt,.pem"
              customRequest={async (e) => handleUploadFile('weixin_cert_path', e)}
            >
              <Button type="primary">上传文件</Button>
            </Upload>
            {setting.weixin_cert_path && (
              <div className="upload-file">{setting.weixin_cert_path}</div>
            )}
          </ProFormText>
          <ProFormText name="weixin_key_path" label="微信商户证书Key">
            <Upload
              name="file"
              className="logo-uploader"
              showUploadList={false}
              accept=".crt,.pem"
              customRequest={async (e) => handleUploadFile('weixin_key_path', e)}
            >
              <Button type="primary">上传文件</Button>
            </Upload>
            {setting.weixin_key_path && (
              <div className="upload-file">{setting.weixin_key_path}</div>
            )}
          </ProFormText>
          <Divider>支付宝支付</Divider>
          <ProFormText name="alipay_app_id" label="支付宝AppID" width="lg" />
          <ProFormText name="alipay_private_key" label="支付宝PrivteKey" width="lg" />
          <ProFormText name="alipay_cert_path" label="应用公钥证书">
            <Upload
              name="file"
              className="logo-uploader"
              showUploadList={false}
              accept=".crt,.pem"
              customRequest={async (e) => handleUploadFile('alipay_cert_path', e)}
            >
              <Button type="primary">上传文件</Button>
            </Upload>
            {setting.alipay_cert_path && (
              <div className="upload-file">{setting.alipay_cert_path}</div>
            )}
          </ProFormText>
          <ProFormText name="alipay_root_cert_path" label="支付宝根证书">
            <Upload
              name="file"
              className="logo-uploader"
              showUploadList={false}
              accept=".crt,.pem"
              customRequest={async (e) => handleUploadFile('alipay_root_cert_path', e)}
            >
              <Button type="primary">上传文件</Button>
            </Upload>
            {setting.alipay_root_cert_path && (
              <div className="upload-file">{setting.alipay_root_cert_path}</div>
            )}
          </ProFormText>
          <ProFormText name="alipay_public_cert_path" label="支付宝公钥证书">
            <Upload
              name="file"
              className="logo-uploader"
              showUploadList={false}
              accept=".crt,.pem"
              customRequest={async (e) => handleUploadFile('alipay_public_cert_path', e)}
            >
              <Button type="primary">上传文件</Button>
            </Upload>
            {setting.alipay_public_cert_path && (
              <div className="upload-file">{setting.alipay_public_cert_path}</div>
            )}
          </ProFormText>
        </ModalForm>
      )}
    </>
  );
};

export default PayConfig;
