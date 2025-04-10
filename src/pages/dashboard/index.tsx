import {
  checkVersion,
  getDashboardInfo,
  getStatisticInclude,
  getStatisticSpider,
  getStatisticSummary,
  getStatisticTraffic,
} from '@/services';
import { getStore, setStore } from '@/utils/store';
import { Line } from '@ant-design/plots';
import { PageContainer } from '@ant-design/pro-components';
import { FormattedMessage, history, useIntl, useModel } from '@umijs/max';
import {
  Button,
  Card,
  Col,
  Row,
  Statistic,
  Tabs,
  Tooltip,
  message,
} from 'antd';
import dayjs from 'dayjs';
import React, { Suspense, useEffect, useState } from 'react';
import StatisticsRow from './components/statistics';
import './index.less';

const { TabPane } = Tabs;

const Dashboard: React.FC = () => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const [data, setData] = useState<any>({});
  const [includeData, setIncludeData] = useState<any[]>([]);
  const [spiderData, setSpiderData] = useState<any[]>([]);
  const [trafficData, setTrafficData] = useState<any[]>([]);
  const [infoData, setInfoData] = useState<any>({});
  const [newVersion, setNewVersion] = useState<any>(null);
  const [showGuide, setShowGuide] = useState<boolean>(false);
  const [exact, setExact] = useState<boolean>(true);
  const intl = useIntl();

  const getSummary = (ex: boolean) => {
    const hide = message.loading(
      {
        content: 'loading...',
        key: 'loading',
      },
      0,
    );
    getStatisticSummary({
      exact: ex,
    })
      .then((res) => {
        setData(res.data || {});
        setExact(res.data?.exact || false);
        let needShow = res.data?.show_guide || false;
        // 读取localStorage
        let hasClose = getStore('close_guide') || false;
        if (hasClose) {
          needShow = false;
        }
        setShowGuide(needShow);
      })
      .catch(() => {})
      .finally(() => {
        hide();
      });
  };

  const getSetting = async () => {
    getSummary(false);
    getStatisticInclude()
      .then((res) => {
        setIncludeData(res.data || []);
      })
      .catch(() => {});
    getStatisticTraffic()
      .then((res) => {
        setTrafficData(res.data || []);
      })
      .catch(() => {});
    getStatisticSpider()
      .then((res) => {
        setSpiderData(res.data || []);
      })
      .catch(() => {});
    getDashboardInfo()
      .then((res) => {
        setInfoData(res.data || []);
      })
      .catch(() => {});
    checkVersion()
      .then((res) => {
        setNewVersion(res.data || null);
      })
      .catch(() => {});
  };

  useEffect(() => {
    getSetting();
  }, []);

  const handleJump = (str: string) => {
    history.push(str);
  };

  const handlePreview = async () => {
    let baseUrl = '';
    if (!initialState?.system) {
      const system = await initialState?.fetchSystemSetting?.();
      if (system) {
        await setInitialState((s) => ({
          ...s,
          system: system,
        }));
      }
      baseUrl = system?.base_url || '';
    } else {
      baseUrl = initialState?.system?.base_url || '';
    }
    window.open(baseUrl);
    return;
  };

  const handleCloseGuide = () => {
    setStore('close_guide', true);
    setShowGuide(false);
  };

  const includeConfig = {
    data: includeData,
    //padding: 'auto',
    xField: 'date',
    yField: 'value',
    seriesField: 'label',
    colorField: 'label',
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
    colorField: 'label',
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
    colorField: 'label',
    xAxis: {
      // type: 'timeCat',
      tickCount: 5,
    },
    smooth: true,
  };

  return (
    <PageContainer extra={<div></div>}>
      {showGuide && (
        <Suspense fallback={null}>
          <Card className="guide-card" style={{ marginBottom: 24 }}>
            <div className="guide-header">
              <h1>
                <FormattedMessage id="dashboard.guide.welcome" />
              </h1>
              <p>
                <FormattedMessage id="dashboard.guide.description" />
              </p>
              <span className="guild-close" onClick={handleCloseGuide}>
                <FormattedMessage id="component.close" />
              </span>
            </div>
            <Row gutter={16}>
              <Col flex={1}>
                <div className="guide-start">
                  <h2>
                    <FormattedMessage id="dashboard.guide.welcome" />
                  </h2>
                  <div className="main-start">
                    <Button
                      size="large"
                      type="primary"
                      onClick={() => handleJump('/setting/system')}
                    >
                      <FormattedMessage id="dashboard.guide.system" />
                    </Button>
                  </div>
                  <div>
                    <FormattedMessage id="dashboard.guide.or" />
                    <span
                      className="link"
                      onClick={() => handleJump('/design/index')}
                    >
                      <FormattedMessage id="dashboard.guide.design" />
                    </span>
                    <FormattedMessage id="dashboard.guide.comma" />
                    <a
                      className="link"
                      href="https://www.anqicms.com/help"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FormattedMessage id="dashboard.guide.help" />
                    </a>
                  </div>
                </div>
              </Col>
              <Col flex={1}>
                <div className="guide-start">
                  <h2>
                    <FormattedMessage id="dashboard.guide.next" />
                  </h2>
                  <ul className="guide-list">
                    <li
                      className="link"
                      onClick={() => handleJump('/archive/category')}
                    >
                      <FormattedMessage id="dashboard.guide.new-category" />
                    </li>
                    <li
                      className="link"
                      onClick={() => handleJump('/archive/detail')}
                    >
                      <FormattedMessage id="dashboard.guide.new-archive" />
                    </li>
                    <li
                      className="link"
                      onClick={() => handleJump('/archive/page')}
                    >
                      <FormattedMessage id="dashboard.guide.new-page" />
                    </li>
                    <li
                      className="link"
                      onClick={() => handleJump('/setting/tdk')}
                    >
                      <FormattedMessage id="dashboard.guide.tdk" />
                    </li>
                    <li className="link" onClick={handlePreview}>
                      <FormattedMessage id="dashboard.guide.preview" />
                    </li>
                  </ul>
                </div>
              </Col>
              <Col flex={1}>
                <div className="guide-start">
                  <h2>
                    <FormattedMessage id="dashboard.guide.step" />
                  </h2>
                  <Row>
                    <Col flex={1}>
                      <ul className="guide-list split">
                        <li>
                          1.{' '}
                          <FormattedMessage id="dashboard.guide.step.change" />
                          <span
                            className="link"
                            onClick={() => handleJump('/setting/system')}
                          >
                            <FormattedMessage id="menu.setting.system" />
                          </span>
                          <FormattedMessage id="dashboard.guide.step.website" />
                        </li>
                        <li>
                          2.{' '}
                          <FormattedMessage id="dashboard.guide.step.change" />
                          <span
                            className="link"
                            onClick={() => handleJump('/setting/content')}
                          >
                            <FormattedMessage id="menu.setting.content" />
                          </span>
                          <FormattedMessage id="dashboard.guide.step.website" />
                        </li>
                        <li>
                          3.{' '}
                          <FormattedMessage id="dashboard.guide.step.change" />
                          <span
                            className="link"
                            onClick={() => handleJump('/setting/tdk')}
                          >
                            <FormattedMessage id="menu.setting.tdk" />
                          </span>
                          <FormattedMessage id="dashboard.guide.step.semicolon" />
                        </li>
                        <li>
                          4.{' '}
                          <FormattedMessage id="dashboard.guide.step.create" />
                          <span
                            className="link"
                            onClick={() => handleJump('/archive/category')}
                          >
                            <FormattedMessage id="menu.archive.category" />
                          </span>
                          ；{' '}
                        </li>
                        <li>
                          5.{' '}
                          <span
                            className="link"
                            onClick={() => handleJump('/archive/page')}
                          >
                            <FormattedMessage id="dashboard.guide.step.create" />
                          </span>
                          <FormattedMessage id="dashboard.guide.step.page" />
                        </li>
                      </ul>
                    </Col>
                    <Col flex={1}>
                      <ul className="guide-list split">
                        <li>
                          6.{' '}
                          <FormattedMessage id="dashboard.guide.step.change" />
                          <span
                            className="link"
                            onClick={() => handleJump('/setting/nav')}
                          >
                            <FormattedMessage id="menu.setting.nav" />
                          </span>
                          <FormattedMessage id="dashboard.guide.step.semicolon" />
                        </li>
                        <li>
                          7.{' '}
                          <FormattedMessage id="dashboard.guide.step.change" />
                          <span
                            className="link"
                            onClick={() => handleJump('/plugin/rewrite')}
                          >
                            <FormattedMessage id="menu.plugin.rewrite" />
                          </span>
                          <FormattedMessage id="dashboard.guide.step.semicolon" />
                        </li>
                        <li>
                          8.{' '}
                          <FormattedMessage id="dashboard.guide.step.change" />
                          <span
                            className="link"
                            onClick={() => handleJump('/plugin/robots')}
                          >
                            <FormattedMessage id="menu.plugin.robots" />
                          </span>
                          <FormattedMessage id="dashboard.guide.step.semicolon" />
                        </li>
                        <li>
                          9.{' '}
                          <FormattedMessage id="dashboard.guide.step.change" />
                          <span
                            className="link"
                            onClick={() => handleJump('/plugin/sitemap')}
                          >
                            <FormattedMessage id="menu.plugin.sitemap" />
                          </span>
                          <FormattedMessage id="dashboard.guide.step.semicolon" />
                        </li>
                        <li>
                          10.{' '}
                          <span
                            className="link"
                            onClick={() => handleJump('/archive/detail')}
                          >
                            <FormattedMessage id="dashboard.guide.step.publish" />
                          </span>
                          <FormattedMessage id="dashboard.guide.step.dot" />
                        </li>
                      </ul>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </Card>
        </Suspense>
      )}
      <Suspense fallback={null}>
        <StatisticsRow
          loading={false}
          data={data}
          exact={exact}
          getExactCount={() => {
            getSummary(true);
          }}
        />
      </Suspense>
      <Row gutter={20}>
        <Col sm={18} xs={24}>
          <Card
            title={intl.formatMessage({ id: 'dashboard.quick' })}
            extra={
              <Button onClick={() => handleJump('/archive/detail')}>
                <FormattedMessage id="dashboard.guide.step.publish" />
              </Button>
            }
          >
            <Row gutter={16}>
              {data.archive_counts?.map((item: any, index: number) => (
                <Col
                  flex={1}
                  key={index}
                  onClick={() => {
                    handleJump('/archive/list?module_id=' + item.id);
                  }}
                >
                  <Statistic
                    className="link"
                    title={item.name}
                    value={item.total}
                  />
                </Col>
              ))}
              <Col
                flex={1}
                onClick={() => {
                  handleJump('/archive/category');
                }}
              >
                <Statistic
                  className="link"
                  title={intl.formatMessage({ id: 'menu.archive.category' })}
                  value={data.category_count}
                />
              </Col>
              <Col
                flex={1}
                onClick={() => {
                  handleJump('/plugin/friendlink');
                }}
              >
                <Statistic
                  className="link"
                  title={intl.formatMessage({ id: 'menu.plugin.friendlink' })}
                  value={data.link_count}
                />
              </Col>
              <Col
                flex={1}
                onClick={() => {
                  handleJump('/plugin/guestbook');
                }}
              >
                <Statistic
                  className="link"
                  title={intl.formatMessage({ id: 'menu.plugin.guestbook' })}
                  value={data.guestbook_count}
                />
              </Col>
              <Col
                flex={1}
                onClick={() => {
                  handleJump('/archive/page');
                }}
              >
                <Statistic
                  className="link"
                  title={intl.formatMessage({ id: 'menu.archive.page' })}
                  value={data.page_count}
                />
              </Col>
              <Col
                flex={1}
                onClick={() => {
                  handleJump('/archive/attachment');
                }}
              >
                <Statistic
                  className="link"
                  title={intl.formatMessage({ id: 'menu.archive.attachment' })}
                  value={data.attachment_count}
                />
              </Col>
              <Col
                flex={1}
                onClick={() => {
                  handleJump('/design/index');
                }}
              >
                <Statistic
                  className="link"
                  title={intl.formatMessage({ id: 'menu.design' })}
                  value={data.template_count}
                />
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
                  <TabPane
                    tab={intl.formatMessage({ id: 'menu.statistic.traffic' })}
                    key="traffic"
                  >
                    <div className="statistic-bar">
                      <Line {...trafficConfig} />
                    </div>
                  </TabPane>
                  <TabPane
                    tab={intl.formatMessage({ id: 'menu.statistic.spider' })}
                    key="spider"
                  >
                    <div className="statistic-bar">
                      <Line {...spiderConfig} />
                    </div>
                  </TabPane>
                  <TabPane
                    tab={intl.formatMessage({ id: 'menu.statistic.includes' })}
                    key="include"
                  >
                    <div className="statistic-bar">
                      <Line {...includeConfig} />
                    </div>
                  </TabPane>
                </Tabs>
              </div>
            </Card>
          </Suspense>
        </Col>
        <Col sm={6} xs={24}>
          <Card title={intl.formatMessage({ id: 'dashboard.login-info' })}>
            <Row gutter={24}>
              <Col span={12}>
                <div className="info-card">
                  <div className="title">
                    <FormattedMessage id="dashboard.login-info.this-time" />
                  </div>
                  <p>
                    {infoData.now_login
                      ? dayjs(infoData.now_login.created_time * 1000).format(
                          'MM-DD HH:mm',
                        )
                      : '-'}
                  </p>
                  <div>{infoData.now_login?.ip}</div>
                </div>
              </Col>
              <Col span={12}>
                <div className="info-card">
                  <div className="title">
                    <FormattedMessage id="dashboard.login-info.last-time" />
                  </div>
                  <p>
                    {infoData.last_login
                      ? dayjs(infoData.last_login.created_time * 1000).format(
                          'MM-DD HH:mm',
                        )
                      : '-'}
                  </p>
                  <div>{infoData.last_login?.ip}</div>
                </div>
              </Col>
            </Row>
          </Card>
          <Card
            style={{ marginTop: '24px' }}
            title={intl.formatMessage({ id: 'dashboard.web-info' })}
          >
            <Row gutter={[16, 24]}>
              <Col span={12}>
                <div className="info-card">
                  <div className="title">
                    <FormattedMessage id="setting.system.site-name" />
                  </div>
                  <div>{infoData.system?.site_name}</div>
                </div>
              </Col>
              <Col span={12}>
                <div className="info-card">
                  <div className="title">
                    <FormattedMessage id="setting.system.template-type" />
                  </div>
                  <div>
                    {infoData.system?.template_type === 2
                      ? intl.formatMessage({
                          id: 'setting.system.template-type.pc-m',
                        })
                      : infoData.system?.template_type === 1
                      ? intl.formatMessage({
                          id: 'setting.system.template-type.code',
                        })
                      : intl.formatMessage({
                          id: 'setting.system.template-type.auto',
                        })}
                  </div>
                </div>
              </Col>
              <Col span={24}>
                <div className="info-card">
                  <div className="title">
                    <FormattedMessage id="setting.system.base-url" />
                  </div>
                  <div>{infoData.system?.base_url}</div>
                </div>
              </Col>
            </Row>
          </Card>
          <Card
            style={{ marginTop: '24px' }}
            title={intl.formatMessage({ id: 'dashboard.soft-info' })}
            extra={
              newVersion && (
                <Tooltip
                  title={intl.formatMessage({
                    id: 'dashboard.soft-info.click-to-upgrade',
                  })}
                >
                  <span
                    onClick={() => handleJump('/tool/upgrade')}
                    className="new-version-tips"
                  >
                    <FormattedMessage id="dashboard.soft-info.new-version" />
                    <span className="version">{newVersion.version}</span>
                  </span>
                </Tooltip>
              )
            }
          >
            <p>
              <FormattedMessage id="dashboard.soft-info.version" />
              {infoData.version}
            </p>
            <p>
              <FormattedMessage id="dashboard.soft-info.memory-usage" />
              {(infoData.memory_usage / 1024 / 1024).toFixed(1)} MB
            </p>
            <p>
              <FormattedMessage id="dashboard.soft-info.official-web" />
              <a
                href="https://www.anqicms.com/"
                target={'_blank'}
                rel="noreferrer"
              >
                https://www.anqicms.com
              </a>
            </p>
            <div>
              <FormattedMessage id="dashboard.soft-info.description" />
            </div>
          </Card>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default Dashboard;
