import { Boot, IDomEditor, IButtonMenu } from '@wangeditor/editor'

class MaterialMenu implements IButtonMenu {
  readonly title = 'Insert Material'
  readonly iconSvg = `
    <svg viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor">
      <path d="M128 128h768v768H128z" fill="#E6E6E6"></path>
      <path d="M256 256h512v512H256z" fill="#B3B3B3"></path>
    </svg>
  `
  readonly tag = 'button'

  getValue(editor: IDomEditor): string | boolean {
    return ''
  }

  isActive(editor: IDomEditor): boolean {
    return false
  }

  isDisabled(editor: IDomEditor): boolean {
    return false
  }

  exec(editor: IDomEditor, value: string | boolean) {
    // Вставка тестового изображения, можно изменить на свою логику
    editor.insertNode({
      type: 'image',
      src: 'https://example.com/material-image.jpg',
      alt: 'Material Image',
      href: '',
      children: [{ text: '' }]
    })
  }
}

Boot.registerMenu({
  key: 'materialMenu',
  factory() {
    return new MaterialMenu()
  },
})
export { MaterialMenu };
