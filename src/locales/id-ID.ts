import account from './id-ID/account';
import component from './id-ID/component';
import content from './id-ID/content';
import dashboard from './id-ID/dashboard';
import design from './id-ID/design';
import menu from './id-ID/menu';
import pages from './id-ID/pages';
import plugin from './id-ID/plugin';
import pwa from './id-ID/pwa';
import setting from './id-ID/setting';
import statistic from './id-ID/statistic';
import tool from './id-ID/tool';
import website from './id-ID/website';

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
