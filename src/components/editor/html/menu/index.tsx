import { IDomEditor, IToolbarMenu, ToolbarMenuFactory } from '@wangeditor/editor'
import { DomEditor } from '@wangeditor/editor'
import { jsx } from 'react/jsx-runtime'
import { CodeOutlined } from '@ant-design/icons'

const HtmlMenu: IToolbarMenu = {
  key: 'html-mode',
  factory: (editor: IDomEditor) => {
    return {
      getValue: () => '',
      isActive: () => false,
      isDisabled: () => false,
      exec: () => {
        // Получаем пользовательские конфиги из редактора
        const config = editor.getConfig() as any
        if (config.setMode && typeof config.setMode === 'function') {
          config.setMode(true) // включаем htmlMode
        }
      },
      render: () => {
        return (
          <div className="w-e-menu" title="HTML mode">
            <CodeOutlined />
          </div>
        )
      },
    }
  },
}

export { HtmlMenu }
