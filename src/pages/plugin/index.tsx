import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Row, Col } from 'antd';
import './index.less';
import routes from '../../../config/routes';
import { history, useModel } from 'umi';

const PluginIndex: React.FC = () => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const [type, setType] = useState<string>('');
  const jumpToPlugin = (item: any) => {
    history.push(item.path);
  };

  const onChangeType = (val: string) => {
    setType(val);
  };

  let permissions = initialState?.currentUser?.group?.setting?.permissions || [];
  if (initialState?.currentUser?.id != 1 && initialState?.currentUser?.group_id != 1) {
    for (let i in routes) {
      if (routes[i].path == '/plugin') {
        // 需要处理
        for (let j in routes[i].routes) {
          if (permissions.indexOf(routes[i].routes[j].path) === -1) {
            routes[i].routes[j].unaccessible = true;
          }
        }
      }
    }
  }

  return (
    <PageContainer>
      <Card
        title={
          <div className="module-tags">
            <div
              className={'module-tag ' + (!type ? 'active' : '')}
              onClick={() => {
                onChangeType('');
              }}
            >
              全部功能
            </div>
            <div
              className={'module-tag ' + (type === 'normal' ? 'active' : '')}
              onClick={() => {
                onChangeType('normal');
              }}
            >
              常用功能
            </div>
            <div
              className={'module-tag ' + (type === 'content' ? 'active' : '')}
              onClick={() => {
                onChangeType('content');
              }}
            >
              文档功能
            </div>
            <div
              className={'module-tag ' + (type === 'shop' ? 'active' : '')}
              onClick={() => {
                onChangeType('shop');
              }}
            >
              用户/商城
            </div>
            <div
              className={'module-tag ' + (type === 'system' ? 'active' : '')}
              onClick={() => {
                onChangeType('system');
              }}
            >
              系统功能
            </div>
          </div>
        }
      >
        <Row gutter={[20, 20]}>
          {routes.map((item: any, index) => {
            if (item.path == '/plugin') {
              return item.routes.map((inner: any, i: number) => {
                if (
                  !inner.hideInMenu &&
                  inner.name &&
                  !inner.unaccessible &&
                  (!type || type == inner.type)
                ) {
                  return (
                    <Col key={i} span={6}>
                      <div
                        className="plugin-item"
                        onClick={() => {
                          jumpToPlugin(inner);
                        }}
                      >
                        <div
                          className="avatar"
                          dangerouslySetInnerHTML={{ __html: inner.icon }}
                        ></div>
                        <div className="info">
                          <div className="title">{inner.name}</div>
                        </div>
                      </div>
                    </Col>
                  );
                } else {
                  return null;
                }
              });
            } else {
              return null;
            }
          })}
        </Row>
      </Card>
    </PageContainer>
  );
};

export default PluginIndex;
