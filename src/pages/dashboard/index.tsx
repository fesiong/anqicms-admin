import React, { Suspense, useEffect, useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Row, Col, Statistic, Tabs, Button, Modal } from 'antd';
import './index.less';
import StatisticsRow from './components/statistics';
import {
  getDashboardInfo,
  getStatisticInclude,
  getStatisticSpider,
  getStatisticSummary,
  getStatisticTraffic,
} from '@/services';
import { history } from 'umi';
import { Line } from '@ant-design/plots';
import moment from 'moment';
import {
  LoginForm,
  ModalForm,
  ProFormInstance,
  ProFormRadio,
  ProFormText,
} from '@ant-design/pro-form';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;

const Dashboard: React.FC = () => {
  const formRef = useRef<
    ProFormInstance<{
      name: string;
      company?: string;
      useMode?: string;
    }>
  >();
  const [data, setData] = useState<any>({});
  const [includeData, setIncludeData] = useState<any[]>([]);
  const [spiderData, setSpiderData] = useState<any[]>([]);
  const [trafficData, setTrafficData] = useState<any[]>([]);
  const [infoData, setInfoData] = useState<any>({});

  const getSetting = async () => {
    getStatisticSummary().then((res) => {
      setData(res.data || {});
    });
    getStatisticInclude().then((res) => {
      setIncludeData(res.data || []);
    });
    getStatisticTraffic().then((res) => {
      setTrafficData(res.data || []);
    });
    getStatisticSpider().then((res) => {
      setSpiderData(res.data || []);
    });
    getDashboardInfo().then((res) => {
      setInfoData(res.data || []);
    });
  };

  useEffect(() => {
    getSetting();
  }, []);

  const handleJump = (str: string) => {
    history.push(str);
  };

  const includeConfig = {
    data: includeData,
    //padding: 'auto',
    xField: 'date',
    yField: 'value',
    seriesField: 'label',
    xAxis: {
      // type: 'timeCat',
      tickCount: 5,
    },
    smooth: true,
  };

  const trafficConfig = {
    data: trafficData,
    //padding: 'auto',
    xField: 'date',
    yField: 'value',
    seriesField: 'label',
    xAxis: {
      // type: 'timeCat',
      tickCount: 5,
    },
    smooth: true,
  };

  const spiderConfig = {
    data: spiderData,
    //padding: 'auto',
    xField: 'date',
    yField: 'value',
    seriesField: 'label',
    xAxis: {
      // type: 'timeCat',
      tickCount: 5,
    },
    smooth: true,
  };

  return (
    <PageContainer extra={<div></div>}>
      <Suspense fallback={null}>
        <StatisticsRow loading={false} data={data} />
      </Suspense>
      <Row gutter={20}>
        <Col span={18}>
          <Card title="????????????">
            <Row gutter={16}>
              {data.archive_counts?.map((item: any, index: number) => (
                <Col
                  flex={1}
                  key={index}
                  onClick={() => {
                    handleJump('/archive/list');
                  }}
                >
                  <Statistic className="link" title={item.name} value={item.total} />
                </Col>
              ))}
              <Col
                flex={1}
                onClick={() => {
                  handleJump('/archive/category');
                }}
              >
                <Statistic className="link" title="????????????" value={data.category_count} />
              </Col>
              <Col
                flex={1}
                onClick={() => {
                  handleJump('/plugin/friendlink');
                }}
              >
                <Statistic className="link" title="????????????" value={data.link_count} />
              </Col>
              <Col
                flex={1}
                onClick={() => {
                  handleJump('/plugin/guestbook');
                }}
              >
                <Statistic className="link" title="????????????" value={data.guestbook_count} />
              </Col>
              <Col
                flex={1}
                onClick={() => {
                  handleJump('/content/page');
                }}
              >
                <Statistic className="link" title="????????????" value={data.page_count} />
              </Col>
              <Col
                flex={1}
                onClick={() => {
                  handleJump('/content/attachment');
                }}
              >
                <Statistic className="link" title="????????????" value={data.attachment_count} />
              </Col>
              <Col
                flex={1}
                onClick={() => {
                  handleJump('/design/index');
                }}
              >
                <Statistic className="link" title="????????????" value={data.template_count} />
              </Col>
            </Row>
          </Card>
          <Suspense fallback={null}>
            <Card
              style={{ marginTop: '24px' }}
              bordered={false}
              bodyStyle={{ padding: '0 24px 24px' }}
            >
              <div className="statistic-card">
                <Tabs size="large" tabBarStyle={{ marginBottom: 24 }}>
                  <TabPane tab="?????????" key="traffic">
                    <div className="statistic-bar">
                      <Line {...trafficConfig} />
                    </div>
                  </TabPane>
                  <TabPane tab="????????????" key="spider">
                    <div className="statistic-bar">
                      <Line {...spiderConfig} />
                    </div>
                  </TabPane>
                  <TabPane tab="????????????" key="include">
                    <div className="statistic-bar">
                      <Line {...includeConfig} />
                    </div>
                  </TabPane>
                </Tabs>
              </div>
            </Card>
          </Suspense>
        </Col>
        <Col span={6}>
          <Card title="????????????">
            <Row gutter={24}>
              <Col span={12}>
                <div className="info-card">
                  <div className="title">????????????</div>
                  <p>
                    {infoData.now_login
                      ? moment(infoData.now_login.created_time * 1000).format('MM-DD HH:mm')
                      : '-'}
                  </p>
                  <div>{infoData.now_login?.ip}</div>
                </div>
              </Col>
              <Col span={12}>
                <div className="info-card">
                  <div className="title">????????????</div>
                  <p>
                    {infoData.last_login
                      ? moment(infoData.last_login.created_time * 1000).format('MM-DD HH:mm')
                      : '-'}
                  </p>
                  <div>{infoData.last_login?.ip}</div>
                </div>
              </Col>
            </Row>
          </Card>
          <Card style={{ marginTop: '24px' }} title="????????????">
            <Row gutter={[16, 24]}>
              <Col span={12}>
                <div className="info-card">
                  <div className="title">????????????</div>
                  <div>{infoData.system?.site_name}</div>
                </div>
              </Col>
              <Col span={12}>
                <div className="info-card">
                  <div className="title">????????????</div>
                  <div>
                    {infoData.system?.template_type == 2
                      ? '??????+??????'
                      : infoData.system?.template_type == 1
                      ? '????????????'
                      : '?????????'}
                  </div>
                </div>
              </Col>
              <Col span={24}>
                <div className="info-card">
                  <div className="title">????????????</div>
                  <div>{infoData.system?.base_url}</div>
                </div>
              </Col>
            </Row>
          </Card>
          <Card style={{ marginTop: '24px' }} title="????????????">
            <p>???????????????{infoData.version}</p>
            <p>???????????????{(infoData.memory_usage / 1024 / 1024).toFixed(1)} MB</p>
            <p>
              ???????????????
              <a href="https://www.anqicms.com/" target={'_blank'} rel="noreferrer">
                https://www.anqicms.com
              </a>
            </p>
            <div>
              ????????????????????????(AnqiCMS)?????????????????? GoLang
              ???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
              AnqiCMS ??????????????????????????????????????????????????????
            </div>
          </Card>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default Dashboard;
