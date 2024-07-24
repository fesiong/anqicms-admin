import account from './ru-RU/account';
import component from './ru-RU/component';
import content from './ru-RU/content';
import dashboard from './ru-RU/dashboard';
import design from './ru-RU/design';
import menu from './ru-RU/menu';
import pages from './ru-RU/pages';
import plugin from './ru-RU/plugin';
import pwa from './ru-RU/pwa';
import setting from './ru-RU/setting';
import statistic from './ru-RU/statistic';
import tool from './ru-RU/tool';
import website from './ru-RU/website';

export default {
  'site.title': 'AnQiCMS',
  ...pages,
  ...menu,
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
