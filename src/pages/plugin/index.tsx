import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Row, Col } from 'antd';
import './index.less';
import routes from '../../../config/routes';
import { history, useModel } from 'umi';

const PluginIndex: React.FC = () => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const jumpToPlugin = (item: any) => {
    history.push(item.path);
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
      <Card title="功能列表">
        <Row gutter={[20, 20]}>
          {routes.map((item: any, index) => {
            if (item.path == '/plugin') {
              return item.routes.map((inner: any, i: number) => {
                if (!inner.hideInMenu && inner.name && !inner.unaccessible) {
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
