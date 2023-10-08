import React, { Suspense, useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Row, Col, Statistic, Tabs, Tooltip, Button } from 'antd';
import './index.less';
import StatisticsRow from './components/statistics';
import {
  getDashboardInfo,
  getStatisticInclude,
  getStatisticSpider,
  getStatisticSummary,
  getStatisticTraffic,
  checkVersion,
} from '@/services';
import { history, useModel } from 'umi';
import { Line } from '@ant-design/plots';
import moment from 'moment';
import { getStore, setStore } from '@/utils/store';

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

  const getSetting = async () => {
    getStatisticSummary().then((res) => {
      setData(res.data || {});
      let needShow = res.data?.show_guide || false;
      // 读取localStorage
      let hasClose = getStore('close_guide') || false;
      if (hasClose) {
        needShow = false;
      }
      setShowGuide(needShow);
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
    checkVersion().then((res) => {
      setNewVersion(res.data || null);
    });
  };

  useEffect(() => {
    getSetting();
  }, []);

  const handleJump = (str: string) => {
    history.push(str);
  };

  const handlePreview = async () => {
    let baseUrl = '';
    if (!initialState.system) {
      const system = await initialState?.fetchSystemSetting?.();
      if (system) {
        await setInitialState((s) => ({
          ...s,
          system: system,
        }));
      }
      baseUrl = system?.base_url || '';
    } else {
      baseUrl = initialState.system?.base_url || '';
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
      {showGuide && (
        <Suspense fallback={null}>
          <Card className="guide-card" style={{ marginBottom: 24 }}>
            <div className="guide-header">
              <h1>欢迎使用安企CMS(AnQiCMS)</h1>
              <p>我们准备了几个链接供你开始使用！</p>
              <span className="guild-close" onClick={handleCloseGuide}>
                关闭
              </span>
            </div>
            <Row gutter={16}>
              <Col flex={1}>
                <div className="guide-start">
                  <h2>开始使用</h2>
                  <div className="main-start">
                    <Button
                      size="large"
                      type="primary"
                      onClick={() => handleJump('/setting/system')}
                    >
                      自定义您的站点
                    </Button>
                  </div>
                  <div>
                    或
                    <span className="link" onClick={() => handleJump('/design/index')}>
                      调整模板设计
                    </span>
                    ，
                    <a className="link" href="https://www.anqicms.com/help" target="_blank">
                      查看使用帮助
                    </a>
                  </div>
                </div>
              </Col>
              <Col flex={1}>
                <div className="guide-start">
                  <h2>接下来</h2>
                  <ul className="guide-list">
                    <li className="link" onClick={() => handleJump('/archive/category')}>
                      添加一个文档分类
                    </li>
                    <li className="link" onClick={() => handleJump('/archive/detail')}>
                      撰写一篇新文档
                    </li>
                    <li className="link" onClick={() => handleJump('/archive/page')}>
                      添加“关于”页面
                    </li>
                    <li className="link" onClick={() => handleJump('/setting/tdk')}>
                      设置首页TDK
                    </li>
                    <li className="link" onClick={handlePreview}>
                      查看站点
                    </li>
                  </ul>
                </div>
              </Col>
              <Col flex={1}>
                <div className="guide-start">
                  <h2>新站点操作指南</h2>
                  <Row>
                    <Col flex={1}>
                      <ul className="guide-list split">
                        <li>
                          1. 修改
                          <span className="link" onClick={() => handleJump('/setting/system')}>
                            全局设置
                          </span>
                          站点信息；
                        </li>
                        <li>
                          2. 修改
                          <span className="link" onClick={() => handleJump('/setting/content')}>
                            内容设置
                          </span>
                          图片设置；
                        </li>
                        <li>
                          3. 修改
                          <span className="link" onClick={() => handleJump('/setting/tdk')}>
                            首页TDK
                          </span>
                          设置；
                        </li>
                        <li>
                          4. 创建
                          <span className="link" onClick={() => handleJump('/archive/category')}>
                            文档分类
                          </span>
                          ；{' '}
                        </li>
                        <li>
                          5.{' '}
                          <span className="link" onClick={() => handleJump('/archive/page')}>
                            添加
                          </span>
                          “关于”、“联系我们”页面；
                        </li>
                      </ul>
                    </Col>
                    <Col flex={1}>
                      <ul className="guide-list split">
                        <li>
                          6. 修改
                          <span className="link" onClick={() => handleJump('/setting/nav')}>
                            导航设置
                          </span>
                          ；
                        </li>
                        <li>
                          7. 修改
                          <span className="link" onClick={() => handleJump('/plugin/rewrite')}>
                            伪静态规则
                          </span>
                          伪静态规则；
                        </li>
                        <li>
                          8. 修改
                          <span className="link" onClick={() => handleJump('/plugin/robots')}>
                            站点Robots
                          </span>
                          .txt；
                        </li>
                        <li>
                          9. 修改
                          <span className="link" onClick={() => handleJump('/plugin/sitemap')}>
                            Sitemap
                          </span>
                          配置；
                        </li>
                        <li>
                          10.{' '}
                          <span className="link" onClick={() => handleJump('/archive/detail')}>
                            发布文章
                          </span>
                          。
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
        <StatisticsRow loading={false} data={data} />
      </Suspense>
      <Row gutter={20}>
        <Col span={18}>
          <Card
            title="快捷操作"
            extra={<Button onClick={() => handleJump('/archive/detail')}>去发文章</Button>}
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
                  <Statistic className="link" title={item.name} value={item.total} />
                </Col>
              ))}
              <Col
                flex={1}
                onClick={() => {
                  handleJump('/archive/category');
                }}
              >
                <Statistic className="link" title="文档分类" value={data.category_count} />
              </Col>
              <Col
                flex={1}
                onClick={() => {
                  handleJump('/plugin/friendlink');
                }}
              >
                <Statistic className="link" title="友情链接" value={data.link_count} />
              </Col>
              <Col
                flex={1}
                onClick={() => {
                  handleJump('/plugin/guestbook');
                }}
              >
                <Statistic className="link" title="网站留言" value={data.guestbook_count} />
              </Col>
              <Col
                flex={1}
                onClick={() => {
                  handleJump('/content/page');
                }}
              >
                <Statistic className="link" title="单页管理" value={data.page_count} />
              </Col>
              <Col
                flex={1}
                onClick={() => {
                  handleJump('/content/attachment');
                }}
              >
                <Statistic className="link" title="图片管理" value={data.attachment_count} />
              </Col>
              <Col
                flex={1}
                onClick={() => {
                  handleJump('/design/index');
                }}
              >
                <Statistic className="link" title="模板设计" value={data.template_count} />
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
                  <TabPane tab="访问量" key="traffic">
                    <div className="statistic-bar">
                      <Line {...trafficConfig} />
                    </div>
                  </TabPane>
                  <TabPane tab="蜘蛛爬行" key="spider">
                    <div className="statistic-bar">
                      <Line {...spiderConfig} />
                    </div>
                  </TabPane>
                  <TabPane tab="网站收录" key="include">
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
          <Card title="登录信息">
            <Row gutter={24}>
              <Col span={12}>
                <div className="info-card">
                  <div className="title">本次登录</div>
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
                  <div className="title">上次登录</div>
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
          <Card style={{ marginTop: '24px' }} title="网站信息">
            <Row gutter={[16, 24]}>
              <Col span={12}>
                <div className="info-card">
                  <div className="title">网站名称</div>
                  <div>{infoData.system?.site_name}</div>
                </div>
              </Col>
              <Col span={12}>
                <div className="info-card">
                  <div className="title">网站类型</div>
                  <div>
                    {infoData.system?.template_type == 2
                      ? '电脑+手机'
                      : infoData.system?.template_type == 1
                      ? '代码适配'
                      : '自适应'}
                  </div>
                </div>
              </Col>
              <Col span={24}>
                <div className="info-card">
                  <div className="title">网站地址</div>
                  <div>{infoData.system?.base_url}</div>
                </div>
              </Col>
            </Row>
          </Card>
          <Card
            style={{ marginTop: '24px' }}
            title="软件信息"
            extra={
              newVersion && (
                <Tooltip title="点击前往系统升级">
                  <span onClick={() => handleJump('/tool/upgrade')} className="new-version-tips">
                    发现新版：<span className="version">{newVersion.version}</span>
                  </span>
                </Tooltip>
              )
            }
          >
            <p>软件版本：{infoData.version}</p>
            <p>占用内存：{(infoData.memory_usage / 1024 / 1024).toFixed(1)} MB</p>
            <p>
              官网地址：
              <a href="https://www.anqicms.com/" target={'_blank'} rel="noreferrer">
                https://www.anqicms.com
              </a>
            </p>
            <div>
              安企内容管理系统(AnqiCMS)，是一款使用 GoLang
              开发的企业站内容管理系统，它部署简单，软件安全，界面优雅，小巧，执行速度飞快，使用
              AnqiCMS 搭建的网站可以防止众多安全问题发生。
            </div>
          </Card>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default Dashboard;
