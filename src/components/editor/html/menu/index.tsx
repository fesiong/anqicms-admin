import E from 'wangeditor';
const { $, BtnMenu, DropListMenu, PanelMenu, DropList, Panel, Tooltip } = E;
// 定义菜单 class
export class HtmlMenu extends BtnMenu {
  htmlMode = false;

  constructor(editor: any) {
    // data-title属性表示当鼠标悬停在该按钮上时提示该按钮的功能简述
    const $elem = E.$(
      `<div class="w-e-menu" data-title="编辑源码">
      <svg viewBox="64 64 896 896" focusable="false" data-icon="right-square" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M412.7 696.5l246-178c4.4-3.2 4.4-9.7 0-12.9l-246-178c-5.3-3.8-12.7 0-12.7 6.5V381c0 10.2 4.9 19.9 13.2 25.9L558.6 512 413.2 617.2c-8.3 6-13.2 15.6-13.2 25.9V690c0 6.5 7.4 10.3 12.7 6.5z"></path><path d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-40 728H184V184h656v656z"></path></svg>
      </div>`,
    );
    super($elem, editor);
  }

  clickHandler = () => {
    const { setMode, customSetMode } = this.editor.config;
    if (setMode) {
      setMode(!this.htmlMode);
    }
    if (this.htmlMode) {
      this.htmlMode = false;
      // 从这里转换
    } else {
      this.htmlMode = true;
    }
    if (customSetMode) {
      customSetMode((mode: boolean) => {
        this.htmlMode = mode;
        this.tryChangeActive();
      });
    }

    this.tryChangeActive();
  };

  tryChangeActive = () => {
    if (this.htmlMode) {
      this.active();
    } else {
      this.unActive();
    }
  };
}
