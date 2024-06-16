import account from './zh-CN/account';
import component from './zh-CN/component';
import content from './zh-CN/content';
import dashboard from './zh-CN/dashboard';
import design from './zh-CN/design';
import globalHeader from './zh-CN/globalHeader';
import menu from './zh-CN/menu';
import pages from './zh-CN/pages';
import plugin from './zh-CN/plugin';
import pwa from './zh-CN/pwa';
import setting from './zh-CN/setting';
import settingDrawer from './zh-CN/settingDrawer';
import statistic from './zh-CN/statistic';
import tool from './zh-CN/tool';
import website from './zh-CN/website';

export default {
  'site.title': '安企CMS',
  'navBar.lang': '语言',
  'layout.user.link.help': '帮助',
  'layout.user.link.privacy': '隐私',
  'layout.user.link.terms': '条款',
  'app.preview.down.block': '下载此页面到本地项目',
  'app.welcome.link.fetch-blocks': '获取全部区块',
  'app.welcome.link.block-list': '基于 block 开发，快速构建标准页面',
  ...pages,
  ...globalHeader,
  ...menu,
  ...settingDrawer,
  ...setting,
  ...pwa,
  ...component,
  ...dashboard,
  ...tool,
  ...website,
  ...account,
  ...statistic,
  ...design,
  ...content,
  ...plugin,
};
