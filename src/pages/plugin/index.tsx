import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Row, Col } from 'antd';
import './index.less';
import routes from '../../../config/routes';
import { history, useModel } from 'umi';

import icon01 from '@/images/icon_01.png';
import icon02 from '@/images/icon_02.png';
import icon03 from '@/images/icon_03.png';
import icon04 from '@/images/icon_04.png';
import icon05 from '@/images/icon_05.png';
import icon06 from '@/images/icon_06.png';
import icon07 from '@/images/icon_07.png';
import icon08 from '@/images/icon_08.png';
import icon09 from '@/images/icon_09.png';
import icon10 from '@/images/icon_10.png';
import icon11 from '@/images/icon_11.png';
import icon12 from '@/images/icon_12.png';
import icon13 from '@/images/icon_13.png';
import icon14 from '@/images/icon_14.png';
import icon15 from '@/images/icon_15.png';
import icon16 from '@/images/icon_16.png';
import icon17 from '@/images/icon_17.png';
import icon18 from '@/images/icon_18.png';
import icon19 from '@/images/icon_19.png';
import icon20 from '@/images/icon_20.png';
import icon21 from '@/images/icon_21.png';
import icon22 from '@/images/icon_22.png';
import icon23 from '@/images/icon_23.png';
import icon24 from '@/images/icon_24.png';
import icon25 from '@/images/icon_25.png';
import icon26 from '@/images/icon_26.png';
import icon27 from '@/images/icon_27.png';
import icon28 from '@/images/icon_28.png';

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

  const getIcon = (icon: string) => {
    switch (icon) {
      case 'icon01':
        return icon01;
      case 'icon02':
        return icon02;
      case 'icon03':
        return icon03;
      case 'icon04':
        return icon04;
      case 'icon05':
        return icon05;
      case 'icon06':
        return icon06;
      case 'icon07':
        return icon07;
      case 'icon08':
        return icon08;
      case 'icon09':
        return icon09;
      case 'icon10':
        return icon10;
      case 'icon11':
        return icon11;
      case 'icon12':
        return icon12;
      case 'icon13':
        return icon13;
      case 'icon14':
        return icon14;
      case 'icon15':
        return icon15;
      case 'icon16':
        return icon16;
      case 'icon17':
        return icon17;
      case 'icon18':
        return icon18;
      case 'icon19':
        return icon19;
      case 'icon20':
        return icon20;
      case 'icon21':
        return icon21;
      case 'icon22':
        return icon22;
      case 'icon23':
        return icon23;
      case 'icon24':
        return icon24;
      case 'icon25':
        return icon25;
      case 'icon26':
        return icon26;
      case 'icon27':
        return icon27;
      case 'icon28':
        return icon28;
    }
  };

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
                        <img className="avatar" src={getIcon(inner.icon)} />
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
