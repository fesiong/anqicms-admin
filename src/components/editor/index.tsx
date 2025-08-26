import React, { useEffect, useRef, useState } from 'react';
import '@wangeditor/editor/dist/css/style.css';
import { Editor, Toolbar } from '@wangeditor/editor-for-react';
import { i18nChangeLanguage } from '@wangeditor/editor';
import { uploadAttachment } from '@/services';
import { message, Button } from 'antd';
import Attachment from '../attachment/dialog';

// Проверка доступности изображения (оставлена для внешних источников, если потребуется)
async function isImageAccessible(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok && response.headers.get('content-type')?.startsWith('image/');
  } catch {
    return false;
  }
}

// Очистка HTML с удалением <a> вокруг <img> и нежелательного контента
function cleanHtmlForWang(input: string): string {
  let html = input || '<p><br/></p>';

  try {
    const parser = new window.DOMParser();
    const doc = parser.parseFromString('<div>' + html + '</div>', 'text/html');
    const wrapper = doc.body.firstChild as HTMLElement;

    // Удаляем <a> вокруг <img>, оставляем только <img>
    wrapper.querySelectorAll('a > img').forEach((img) => {
      const parent = img.parentNode as HTMLElement;
      if (parent && parent.parentNode) {
        parent.parentNode.replaceChild(img, parent);
      }
    });

    // Удаляем <style> и CSS-селекторы
    wrapper.querySelectorAll('style').forEach((el) => el.remove());
    wrapper.innerHTML = wrapper.innerHTML.replace(/{[^{}]*}/g, '').replace(/img\.[^{}<]+/g, '');

    // Удаляем опасные атрибуты
    wrapper.querySelectorAll('img').forEach((el) => {
      [...el.attributes].forEach(attr => {
        if (/^on/i.test(attr.name)) el.removeAttribute(attr.name);
        if (attr.name === 'style' && attr.value.includes('expression')) el.removeAttribute('style');
      });
    });

    return wrapper.innerHTML || '<p><br/></p>';
  } catch (e) {
    return html;
  }
}

// Безопасная обработка контента
async function sanitizeContent(content: any, trustedImages: Set<string> = new Set()): Promise<string> {
  if (typeof content === 'object' && content !== null) {
    if (Array.isArray(content)) {
      return '<p><br/></p>';
    } else if (content.html) {
      return cleanHtmlForWang(content.html);
    } else {
      return '<p><br/></p>';
    }
  }

  if (typeof content === 'string') {
    if (/^\s*</.test(content)) {
      const parser = new window.DOMParser();
      const doc = parser.parseFromString('<div>' + content + '</div>', 'text/html');
      const images = doc.querySelectorAll('img');
      for (const img of images) {
        const src = img.getAttribute('src');
        // Пропускаем изображения из trustedImages без проверки
        if (src && !trustedImages.has(src)) {
          if (!(await isImageAccessible(src))) {
            img.remove();
          }
        }
      }
      return cleanHtmlForWang(doc.body.firstChild.innerHTML);
    }
    try {
      const obj = JSON.parse(content);
      if (
        Array.isArray(obj) ||
        (typeof obj === 'object' && obj !== null && (obj.text || obj.type))
      ) {
        return '<p><br/></p>';
      }
    } catch (e) {
      return `<p>${content.replace(/</g, '<').replace(/>/g, '>')}</p>`;
    }
  }

  return '<p><br/></p>';
}

interface MyEditorProps {
  content?: any;
  setContent?: (content: string) => void;
}

const MyEditor: React.FC<MyEditorProps> = (props) => {
  const editorRef = useRef<any>(null);
  const [editor, setEditor] = useState<any>(null);
  const [html, setHtml] = useState<string>('');
  const [trustedImages, setTrustedImages] = useState<Set<string>>(new Set());
  const [isHtmlMode, setIsHtmlMode] = useState<boolean>(false);

  useEffect(() => {
    i18nChangeLanguage('en');
    return () => {
      if (editor) {
        editor.destroy();
        setEditor(null);
      }
    };
  }, [editor]);

  useEffect(() => {
    const initContent = async () => {
      const clean = await sanitizeContent(props.content, trustedImages);
      setHtml(clean);
      if (editor && clean !== editor.getHtml()) {
        editor.setHtml(clean);
      }
    };
    initContent();
  }, [props.content, editor, trustedImages]);

  const handleCustomUpload = async (file: File, insertFn: (url: string, alt?: string, href?: string) => void) => {
    const formData = new FormData();
    formData.append('file', file);

    const hide = message.loading('Загрузка...', 0);
    try {
      const res = await uploadAttachment(formData);
      if (res.code !== 0) {
        message.error(res.msg || 'Ошибка загрузки');
        return;
      }
      const imageUrl = res.data?.logo || res.data?.url || res.data?.imageUrl;
      if (!imageUrl) {
        message.error('URL изображения не получен от сервера');
        return;
      }
      setTrustedImages((prev) => new Set(prev).add(imageUrl));
      insertFn(imageUrl, file.name);
      message.success(res.msg || 'Успешно загружено');
    } catch (error) {
      message.error('Ошибка загрузки: ' + error.message);
    } finally {
      hide();
    }
  };

  const handleSelectImages = (selectedFiles: any) => {
    if (!editor) {
      message.error('Редактор не инициализирован');
      return;
    }

    // Преобразуем selectedFiles в массив, если это одиночный объект
    const filesArray = Array.isArray(selectedFiles) ? selectedFiles : selectedFiles ? [selectedFiles] : [];
    
    if (filesArray.length === 0) {
      message.error('Не выбраны файлы');
      return;
    }

    // Добавляем все logo в trustedImages
    setTrustedImages((prev) => {
      const newSet = new Set(prev);
      filesArray.forEach((file) => {
        if (file?.logo) {
          newSet.add(file.logo);
        }
      });
      return newSet;
    });

    filesArray.forEach((file, index) => {
      if (!file || !file.logo || !file.file_name) {
        message.error(`Некорректные данные файла на позиции ${index + 1}`);
        return;
      }
      let el = `<a href="${file.logo}" target="_blank">${file.file_name}</a>`;
      if (
        file.is_image ||
        file.file_location?.match(/\.(webp|bmp|png|gif|jpg|jpeg|svg)$/i)
      ) {
        el = `<img src="${file.logo}" alt="${file.file_name}"/>`;
      }
      try {
        editor.dangerouslyInsertHtml(el);
      } catch (error) {
        message.error(`Ошибка при вставке изображения: ${error.message}`);
      }
    });
    const newHtml = editor.getHtml();
    setHtml(newHtml);
    props.setContent?.(newHtml);
  };

  const openMediaDialog = () => {
    Attachment.show(true).then((res) => {
      console.log('Attachment response:', res); // Для отладки
      if (res) {
        handleSelectImages(res);
      } else {
        message.error('Не выбраны файлы');
      }
    }).catch((error) => {
      message.error('Ошибка при открытии каталога медиа: ' + error.message);
    });
  };

  const handleChange = (editor: any) => {
    const newHtml = editor.getHtml();
    if (newHtml && newHtml !== '<p><br></p>' && !/^\s*(<p><br\/?><\/p>\s*)+$/.test(newHtml)) {
      setHtml(newHtml);
      props.setContent?.(newHtml);
    } else if (editor && html) {
      editor.setHtml(html);
    }
  };

  const toggleHtmlMode = () => {
    setIsHtmlMode((prev) => !prev);
    if (!isHtmlMode && editor) {
      setHtml(editor.getHtml());
    }
  };

  const handleHtmlChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newHtml = e.target.value;
    setHtml(newHtml);
    props.setContent?.(newHtml);
    if (editor && !isHtmlMode) {
      editor.setHtml(newHtml);
    }
  };

  return (
    <div className="editor-wrapper">
      <div style={{ border: '1px solid #ccc', zIndex: 100, borderBottom: 'none', display: 'flex', alignItems: 'center' }}>
        <Toolbar editor={editor} defaultConfig={{}} mode="default" />
        <Button onClick={toggleHtmlMode} style={{ marginLeft: 10 }}>
          {isHtmlMode ? 'visual editor' : 'HTML editor'}
        </Button>
        <Button onClick={openMediaDialog} style={{ marginLeft: 10 }}>
          Select from catalog
        </Button>
      </div>
      <div style={{ border: '1px solid #ccc', height: '500px', overflowY: 'hidden' }}>
        {isHtmlMode ? (
          <textarea
            value={html}
            onChange={handleHtmlChange}
            style={{ width: '100%', height: '100%', resize: 'none', padding: '10px' }}
            placeholder="Введите HTML код здесь..."
          />
        ) : (
          <Editor
            defaultConfig={{
              placeholder: 'Введите ваш текст здесь...',
              lang: 'en',
              MENU_CONF: {
                uploadImage: {
                  customUpload: handleCustomUpload,
                  maxFileSize: 10 * 1024 * 1024, // 10MB
                  allowedFileTypes: ['image/*'], // Только изображения
                },
              },
            }}
            value={html}
            onCreated={(editor) => {
              editorRef.current = editor;
              setEditor(editor);
              editor.setHtml(html);
            }}
            onChange={handleChange}
            mode="default"
            style={{ height: '100%', overflowY: 'auto' }}
          />
        )}
      </div>
    </div>
  );
};

export default MyEditor;