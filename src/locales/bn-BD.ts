import account from './bn-BD/account';
import component from './bn-BD/component';
import content from './bn-BD/content';
import dashboard from './bn-BD/dashboard';
import design from './bn-BD/design';
import menu from './bn-BD/menu';
import pages from './bn-BD/pages';
import plugin from './bn-BD/plugin';
import pwa from './bn-BD/pwa';
import setting from './bn-BD/setting';
import statistic from './bn-BD/statistic';
import tool from './bn-BD/tool';
import website from './bn-BD/website';

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
