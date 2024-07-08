import { PageContainer } from '@ant-design/pro-components';
import { FormattedMessage, history, useIntl, useModel } from '@umijs/max';
import { Card, Col, Row } from 'antd';
import React, { useState } from 'react';
import routes from '../../../config/routes';
import './index.less';

import icon_ai from '@/images/icon_ai.png';
import icon_anchor from '@/images/icon_anchor.png';
import icon_backup from '@/images/icon_backup.png';
import icon_collector from '@/images/icon_collector.png';
import icon_comment from '@/images/icon_comment.png';
import icon_fileupload from '@/images/icon_fileupload.png';
import icon_finance from '@/images/icon_finance.png';
import icon_friendlink from '@/images/icon_friendlink.png';
import icon_fulltext from '@/images/icon_fulltext.png';
import icon_group from '@/images/icon_group.png';
import icon_guestbook from '@/images/icon_guestbook.png';
import icon_htmlcache from '@/images/icon_htmlcache.png';
import icon_importapi from '@/images/icon_importapi.png';
import icon_interference from '@/images/icon_interference.png';
import icon_keyword from '@/images/icon_keyword.png';
import icon_material from '@/images/icon_material.png';
import icon_order from '@/images/icon_order.png';
import icon_pay from '@/images/icon_pay.png';
import icon_push from '@/images/icon_push.png';
import icon_redirect from '@/images/icon_redirect.png';
import icon_replace from '@/images/icon_replace.png';
import icon_retailer from '@/images/icon_retailer.png';
import icon_rewrite from '@/images/icon_rewrite.png';
import icon_robots from '@/images/icon_robots.png';
import icon_sendmail from '@/images/icon_sendmail.png';
import icon_sitemap from '@/images/icon_sitemap.png';
import icon_storage from '@/images/icon_storage.png';
import icon_timefactor from '@/images/icon_timefactor.png';
import icon_titleimage from '@/images/icon_titleimage.png';
import icon_transfer from '@/images/icon_transfer.png';
import icon_user from '@/images/icon_user.png';
import icon_watermark from '@/images/icon_watermark.png';
import icon_weapp from '@/images/icon_weapp.png';
import icon_wechat from '@/images/icon_wechat.png';

const PluginIndex: React.FC = () => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const [type, setType] = useState<string>('');
  const intl = useIntl();
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
      case 'anchor':
        return icon_anchor;
      case 'backup':
        return icon_backup;
      case 'collector':
        return icon_collector;
      case 'comment':
        return icon_comment;
      case 'fileupload':
        return icon_fileupload;
      case 'finance':
        return icon_finance;
      case 'friendlink':
        return icon_friendlink;
      case 'fulltext':
        return icon_fulltext;
      case 'group':
        return icon_group;
      case 'guestbook':
        return icon_guestbook;
      case 'importapi':
        return icon_importapi;
      case 'keyword':
        return icon_keyword;
      case 'material':
        return icon_material;
      case 'order':
        return icon_order;
      case 'pay':
        return icon_pay;
      case 'push':
        return icon_push;
      case 'redirect':
        return icon_redirect;
      case 'replace':
        return icon_replace;
      case 'retailer':
        return icon_retailer;
      case 'rewrite':
        return icon_rewrite;
      case 'robots':
        return icon_robots;
      case 'sendmail':
        return icon_sendmail;
      case 'sitemap':
        return icon_sitemap;
      case 'storage':
        return icon_storage;
      case 'transfer':
        return icon_transfer;
      case 'user':
        return icon_user;
      case 'weapp':
        return icon_weapp;
      case 'wechat':
        return icon_wechat;
      case 'titleimage':
        return icon_titleimage;
      case 'htmlcache':
        return icon_htmlcache;
      case 'ai':
        return icon_ai;
      case 'timefactor':
        return icon_timefactor;
      case 'interference':
        return icon_interference;
      case 'watermark':
        return icon_watermark;
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
              <FormattedMessage id="plugin.type.all" />
            </div>
            <div
              className={'module-tag ' + (type === 'normal' ? 'active' : '')}
              onClick={() => {
                onChangeType('normal');
              }}
            >
              <FormattedMessage id="plugin.type.normal" />
            </div>
            <div
              className={'module-tag ' + (type === 'content' ? 'active' : '')}
              onClick={() => {
                onChangeType('content');
              }}
            >
              <FormattedMessage id="plugin.type.archive" />
            </div>
            <div
              className={'module-tag ' + (type === 'shop' ? 'active' : '')}
              onClick={() => {
                onChangeType('shop');
              }}
            >
              <FormattedMessage id="plugin.type.user-mall" />
            </div>
            <div
              className={'module-tag ' + (type === 'system' ? 'active' : '')}
              onClick={() => {
                onChangeType('system');
              }}
            >
              <FormattedMessage id="plugin.type.system" />
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
                    <Col key={i} sm={6} xs={12}>
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
