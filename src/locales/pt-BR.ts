import account from './pt-BR/account';
import component from './pt-BR/component';
import content from './pt-BR/content';
import dashboard from './pt-BR/dashboard';
import design from './pt-BR/design';
import menu from './pt-BR/menu';
import pages from './pt-BR/pages';
import plugin from './pt-BR/plugin';
import pwa from './pt-BR/pwa';
import setting from './pt-BR/setting';
import statistic from './pt-BR/statistic';
import tool from './pt-BR/tool';
import website from './pt-BR/website';

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
