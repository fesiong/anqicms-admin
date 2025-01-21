export default {
  'plugin.aigenerate.demand.required':
    'Единое требование не может превышать 500 символов.',
  'plugin.aigenerate.checking': 'Проверка',
  'plugin.aigenerate.setting': 'Настройки автоматического письма AI',
  'plugin.aigenerate.isopen': 'Записывать ли автоматически',
  'plugin.aigenerate.isopen.no': 'нет',
  'plugin.aigenerate.isopen.yes': 'Автоматически писать по плану',
  'plugin.aigenerate.language': 'Язык написания статей',
  'plugin.aigenerate.double-title': 'Генерируйте двойные заголовки',
  'plugin.aigenerate.double-title.description': 'Только китайская поддержка',
  'plugin.aigenerate.double-split': 'Метод двойного заголовка',
  'plugin.aigenerate.double-split.bracket': 'Основное название (подзаголовок)',
  'plugin.aigenerate.double-split.line': 'Основной заголовок-подзаголовок',
  'plugin.aigenerate.double-split.question': 'Основное название? субтитры',
  'plugin.aigenerate.double-split.comma': 'основной заголовок, подзаголовок',
  'plugin.aigenerate.double-split.colon': 'Основное название: Подзаголовок',
  'plugin.aigenerate.double-split.random': 'случайный',
  'plugin.aigenerate.demand': 'Единые требования к написанию',
  'plugin.aigenerate.demand.description':
    'Можно определить единые требования для всех статей по написанию ИИ, не более 200 символов. Оставьте это поле пустым по умолчанию',
  'plugin.aigenerate.source': 'Источник написания ИИ',
  'plugin.aigenerate.source.anqicms': 'Официальный сайт Anqi CMS',
  'plugin.aigenerate.source.openai': 'Принесите свой собственный OpenAIKey',
  'plugin.aigenerate.source.spark': 'Модель искры',
  'plugin.aigenerate.source.description':
    'Заявление: Только зарубежные веб-сайты, созданные с использованием Anqi CMS, могут подготовить собственный OpenAIKey.',
  'plugin.aigenerate.source.check-openai': 'Проверьте интерфейс OpenAI',
  'plugin.aigenerate.openai.description':
    'Ключ OpenAI обычно начинается с sk-, вы можете добавить несколько ключей, и программа каждый раз будет случайным образом выбирать один ключ для использования.',
  'plugin.aigenerate.openai.valid': 'эффективный',
  'plugin.aigenerate.openai.invalid': 'истекший',
  'plugin.aigenerate.enter-to-add': 'Нажмите Enter, чтобы добавить',
  'plugin.aigenerate.spark.description':
    'Адрес приложения API большой модели Spark',
  'plugin.aigenerate.spark.version': 'Большая версия модели Spark',
  'plugin.aigenerate.default-category': 'Категория публикации по умолчанию',
  'plugin.aigenerate.default-category.description':
    'Если ключевые слова не распределены по категориям, собранные статьи по умолчанию будут случайным образом отнесены к одной из категорий. Необходимо установить категорию, иначе собранные статьи не смогут быть собраны нормально.',
  'plugin.aigenerate.save-type': 'Метод обработки статьи',
  'plugin.aigenerate.save-type.draft': 'Сохранить в ящик черновиков',
  'plugin.aigenerate.save-type.release': 'Обычный выпуск',
  'plugin.aigenerate.start-time': 'время начала каждый день',
  'plugin.aigenerate.start-time.placeholder':
    'По умолчанию начинается в 8 часов.',
  'plugin.aigenerate.start-time.description':
    'Пожалуйста, введите число от 0 до 23, 0 означает отсутствие ограничений.',
  'plugin.aigenerate.end-time': 'конец дня',
  'plugin.aigenerate.end-time.placeholder':
    'По умолчанию заканчивается в 22:00.',
  'plugin.aigenerate.end-time.description':
    'Пожалуйста, введите число от 0 до 23, 0 означает отсутствие ограничений.',
  'plugin.aigenerate.daily-limit': 'Ежедневные выпуски',
  'plugin.aigenerate.daily-limit.description':
    'Максимальное количество статей, публикуемых в день, 0 означает отсутствие ограничений.',
  'plugin.aigenerate.insert-image': 'Обработка изображений статьи',
  'plugin.aigenerate.insert-image.default': 'по умолчанию',
  'plugin.aigenerate.insert-image.diy': 'Пользовательские вставки изображений',
  'plugin.aigenerate.insert-image.category': 'Из классификации фотографий',
  'plugin.aigenerate.insert-image.list': 'Список картинок для вставки',
  'plugin.aigenerate.replace': 'замена контента',
  'plugin.aigenerate.replace.tips1':
    'Отредактируйте пары ключевых слов, которые необходимо заменить, и замена будет выполнена автоматически при публикации документа.',
  'plugin.aigenerate.replace.tips2':
    'Правила замены поддерживают регулярные выражения. Если вы знакомы с регулярными выражениями и не можете добиться замены с помощью обычного текста, вы можете попробовать использовать правила регулярных выражений для завершения замены.',
  'plugin.aigenerate.replace.tips3':
    'Правила регулярных выражений: начинаются с { и заканчиваются }, а код правила пишется посередине, например {[0-9]+}, чтобы соответствовать последовательным числам.',
  'plugin.aigenerate.replace.rules':
    'Некоторые встроенные правила можно использовать быстро. Встроенные:',
  'plugin.aigenerate.replace.rule.email': '{Адрес электронной почты}',
  'plugin.aigenerate.replace.rule.date': '{дата}',
  'plugin.aigenerate.replace.rule.time': '{время}',
  'plugin.aigenerate.replace.rule.cellphone': '{номер телефона}',
  'plugin.aigenerate.replace.rule.qq': '{номер QQ}',
  'plugin.aigenerate.replace.rule.wechat': '{Мы общаемся по номеру}',
  'plugin.aigenerate.replace.rule.website': '{URL}',
  'plugin.aigenerate.replace.notice':
    'Примечание. Неправильное написание правил регулярных выражений может легко привести к неправильным эффектам замены. Например, правила WeChat ID повлияют на целостность адресов электронной почты и URL-адресов. Пожалуйста, используйте с осторожностью.',
  'plugin.aigenerate.replace.to': 'Заменить',
  'plugin.aigenerate.empty': 'нулевой',
  'plugin.aigenerate.start': 'Начните писать AI вручную',
  'plugin.aigenerate.start.confirm': 'Вы уверены, что хотите начать писать ИИ?',
  'plugin.aigenerate.start.description':
    'При этом немедленно начнется выполнение операции записи ИИ.',
  'plugin.aigenerate.image.category': 'Классификация изображений',
  'plugin.aigenerate.image.category.description':
    'Изображения будут автоматически выбраны из указанной категории ресурсов изображений. Если вы решите попробовать сопоставление ключевых слов с названием изображения, оно попытается сопоставить ключевые слова статьи с названием изображения, и если сопоставление окажется успешным, будет использовано изображение.',
  'plugin.aigenerate.image.category.default': 'Фотографии без категорий',
  'plugin.aigenerate.image.category.all': 'Все фотографии',
  'plugin.aigenerate.image.category.match':
    'Попробуйте ключевое слово, соответствующее названию изображения.',
  'plugin.aigenerate.type': 'тип',
  'plugin.aigenerate.type.undefine': 'неопределенный',
  'plugin.aigenerate.type.generate': 'ИИ сгенерировал',
  'plugin.aigenerate.type.translate': 'переводить',
  'plugin.aigenerate.type.pseudo': 'переписывание ИИ',
  'plugin.aigenerate.type.media': 'Переписано средствами массовой информации',
  'plugin.aigenerate.status': 'состояние',
  'plugin.aigenerate.waiting': 'Не обработан',
  'plugin.aigenerate.doing': 'в ходе выполнения',
  'plugin.aigenerate.finish': 'завершенный',
  'plugin.aigenerate.error': 'Ошибка',
  'plugin.aigenerate.time': 'время',
  'plugin.aigenerate.tips1':
    'Автоматическое письмо ИИ вызовет интерфейс записи ИИ для записи, что требует оплаты.',
  'plugin.aigenerate.tips2':
    'Автоматическое написание ИИ автоматически вызовет ключевые слова в библиотеке ключевых слов для завершения написания и напишет статью для каждого ключевого слова. Убедитесь, что количество статей в базе данных ключевых слов достаточно.',
  'plugin.aigenerate.tips3':
    'Функции автоматического написания статей с помощью ИИ и сбора статей используют общую библиотеку ключевых слов. Если ключевые слова были собраны для статей, они больше не будут использоваться для написания ИИ.',
  'plugin.aigenerate.tips4':
    'Сгенерированные статьи автоматически попадут в управление контентом.',
  'plugin.anchor.edit': 'Изменить текст привязки',
  'plugin.anchor.new': 'Добавить текст привязки',
  'plugin.anchor.title': 'Название текста привязки',
  'plugin.anchor.title.placeholder':
    'Поиск якорного текста или якорных текстовых ссылок',
  'plugin.anchor.link': 'анкорная текстовая ссылка',
  'plugin.anchor.link.description':
    'Поддерживает относительные и абсолютные ссылки, например: /a/123.html или https://www.anqicms.com/.',
  'plugin.anchor.weight': 'Вес текста привязки',
  'plugin.anchor.weight.description':
    'Введите число от 0 до 9. Чем больше число, тем выше вес. Более высокие веса имеют приоритет при замене.',
  'plugin.anchor.import': 'Импортировать текст привязки',
  'plugin.anchor.import.description':
    'Примечание. Для загрузки и импорта поддерживаются только файлы в формате CSV.',
  'plugin.anchor.step1': 'первый шаг',
  'plugin.anchor.step2': 'Шаг 2',
  'plugin.anchor.step1.download': 'Скачать файл шаблона csv',
  'plugin.anchor.step2.upload': 'Загрузить CSV-файл',
  'plugin.anchor.setting': 'Настройки текста привязки',
  'plugin.anchor.density': 'Плотность текста привязки',
  'plugin.anchor.density.description':
    'Например: каждые 100 слов для замены текста привязки заполняйте 100, по умолчанию — 100.',
  'plugin.anchor.replace-way': 'Метод замены',
  'plugin.anchor.replace-way.auto': 'автоматическая замена',
  'plugin.anchor.replace-way.manual': 'Ручная замена',
  'plugin.anchor.replace-way.description': 'Как контент заменяет якорный текст',
  'plugin.anchor.extract': 'Метод экстракции',
  'plugin.anchor.extract.auto': 'Автоматическое извлечение',
  'plugin.anchor.extract.manual': 'Ручное извлечение',
  'plugin.anchor.extract.description':
    'Выберите способ извлечения ключевых слов привязки текста из тегов ключевых слов контента.',
  'plugin.anchor.delete.confirm':
    'Вы уверены, что хотите удалить выделенный текст привязки?',
  'plugin.anchor.batch-update': 'Пакетное обновление текста привязки',
  'plugin.anchor.export': 'Экспортировать текст привязки',
  'plugin.anchor.export.confirm':
    'Вы уверены, что хотите экспортировать весь якорный текст?',
  'plugin.anchor.replace': 'заменять',
  'plugin.anchor.replace.confirm':
    'Вы уверены, что хотите выполнить операцию с пакетным обновлением якорного текста?',
  'plugin.anchor.replace-count': 'Сроки замены',
  'plugin.backup.confirm':
    'Вы уверены, что хотите выполнить резервное копирование базы данных?',
  'plugin.backup.backuping':
    'Выполняется операция резервного копирования данных, подождите. .',
  'plugin.backup.restore': 'восстанавливаться',
  'plugin.backup.restore.confirm':
    'Вы уверены, что хотите восстановить данные из текущей резервной копии?',
  'plugin.backup.restore.content':
    'После восстановления существующие данные будут заменены текущими данными резервной копии. Пожалуйста, действуйте осторожно.',
  'plugin.backup.restoring':
    'Выполняется операция восстановления данных, подождите. .',
  'plugin.backup.delete.confirm':
    'Вы уверены, что хотите удалить этот фрагмент данных?',
  'plugin.backup.download': 'скачать',
  'plugin.backup.download.confirm':
    'Вы уверены, что хотите скачать его локально?',
  'plugin.backup.cleanup.confirm':
    'Вы уверены, что хотите удалить данные сайта?',
  'plugin.backup.cleaning': 'Выполняется операция очистки, подождите. .',
  'plugin.backup.cleanup.tips1':
    'Эта операция удалит все статьи. В целях безопасности обязательно сначала выполните резервное копирование на случай непредвиденных обстоятельств.',
  'plugin.backup.cleanup.tips2':
    'Папка «Загрузки» не очищается по умолчанию. Если вам нужно ее очистить, проверьте ее.',
  'plugin.backup.cleanup.upload.false': 'Не мыть фотографии',
  'plugin.backup.cleanup.upload.true': 'Очистить загруженные изображения',
  'plugin.backup.time': 'Время резервного копирования',
  'plugin.backup.name': 'Имя резервной копии',
  'plugin.backup.size': 'Размер резервной копии',
  'plugin.backup.new': 'Добавить резервную копию',
  'plugin.backup.import': 'Импортировать локальную резервную копию',
  'plugin.backup.cleanup': 'Очистить данные сайта',
  'plugin.backup.tips':
    'Примечание. Если файл резервной копии слишком велик и вам необходимо загрузить файл резервной копии, используйте инструменты FTP для загрузки файла резервной копии. Файл резервной копии находится в каталоге /data/backup/ корневого каталога веб-сайта.',
  'plugin.collector.setting': 'Настройки сбора данных и переопределения AI',
  'plugin.collector.auto-collect': 'Следует ли автоматически собирать',
  'plugin.collector.auto-collect.yes': 'Автоматический сбор по плану',
  'plugin.collector.auto-collect.no': 'нет',
  'plugin.collector.language': 'Собрать языки статей',
  'plugin.collector.mode': 'Режим сбора данных',
  'plugin.collector.mode.article': 'Коллекция статей',
  'plugin.collector.mode.ask': 'Комбинация вопросов и ответов',
  'plugin.collector.mode.description':
    'Режим сбора статей соберет всю статью в соответствии с исходным текстом; режим комбинирования вопросов и ответов соберет и объединит ее в статьи из поискового списка вопросов и ответов.',
  'plugin.collector.source': 'пользовательские источники',
  'plugin.collector.source.description':
    'Доступен сборник статей. Обратите внимание, что пользовательский формат источника должен быть списком поиска, а ключевые слова для поиска представлены %s. Например, ссылка для поиска: https://cn.bing.com/search?q=. Anqi CMS, затем "Anqi CMS" заменяется на "%s", а затем: https://cn.bing.com/search?q=%s',
  'plugin.collector.category.description':
    'Если для ключевого слова не задана категория, собранные статьи по умолчанию будут отнесены к этой категории.',
  'plugin.collector.category.notice':
    'Категория должна быть установлена, иначе нормальный сбор будет невозможен.',
  'plugin.collector.min-title': 'Минимальное количество слов в заголовке',
  'plugin.collector.min-title.placeholder': 'По умолчанию 10 символов',
  'plugin.collector.min-title.description':
    'При сборе статьи, если количество слов в заголовке меньше указанного количества слов, она не будет собрана.',
  'plugin.collector.min-content': 'Минимальное количество слов в контенте',
  'plugin.collector.min-content.placeholder': 'По умолчанию 400 слов',
  'plugin.collector.min-content.description':
    'При сборе статей, если количество слов в содержании статьи меньше указанного количества слов, она не будет собрана.',
  'plugin.collector.pseudo': 'Переписывает ли ИИ',
  'plugin.collector.pseudo.no': 'нет',
  'plugin.collector.pseudo.yes': 'Выполнить переписывание ИИ',
  'plugin.collector.pseudo.description':
    'Переписывание ИИ поддерживает только сбор статей и комбинации вопросов и ответов. Требуется плата.',
  'plugin.collector.translate': 'Стоит ли переводить',
  'plugin.collector.translate.no': 'нет',
  'plugin.collector.translate.yes': 'Переводить',
  'plugin.collector.translate.description':
    'За перевод взимается плата. Примечание. Переписывание и перевод ИИ нельзя включить одновременно, иначе результаты будут неверными.',
  'plugin.collector.to-language': 'Перевести целевой язык',
  'plugin.collector.to-language.description':
    'Действительно после выбора автоматического перевода',
  'plugin.collector.daily-limit': 'Ежедневный объем сбора',
  'plugin.collector.daily-limit.description':
    'Максимальное количество статей, собираемых в день, 0 означает отсутствие ограничений.',
  'plugin.collector.insert-image': 'Сбор и обработка изображений',
  'plugin.collector.insert-image.remove': 'Удалить изображение',
  'plugin.collector.insert-image.contain': 'Сохранить исходное изображение',
  'plugin.collector.insert-image.insert': 'Сохранить исходное изображение',
  'plugin.collector.title-exclude': 'Исключающие слова в заголовке',
  'plugin.collector.title-exclude.tips':
    'Если при сборе статей эти ключевые слова встречаются в заголовке, они не будут собраны.',
  'plugin.collector.title-prefix': 'Исключить слова в начале заголовка',
  'plugin.collector.title-prefix.tips':
    'Если при сборе статей эти ключевые слова появляются в начале заголовка, они не будут собраны.',
  'plugin.collector.title-suffix': 'Исключить слова в конце заголовка',
  'plugin.collector.title-suffix.tips':
    'Если при сборе статей эти ключевые слова появляются в конце заголовка, они не будут собраны.',
  'plugin.collector.content-exclude-line': 'строка игнорирования содержимого',
  'plugin.collector.content-exclude-line.tips':
    'При сборе статей строки, в которых встречаются эти слова, будут удалены.',
  'plugin.collector.content-exclude': 'Исключение контента',
  'plugin.collector.content-exclude.tips':
    'При сборе статей, если эти слова встречаются в содержании, вся статья будет удалена.',
  'plugin.collector.link-exclude': 'Ссылка проигнорирована',
  'plugin.collector.link-exclude.tips':
    'При сборе статей, если эти ключевые слова встречаются в ссылке, они не будут собраны.',
  'plugin.collector.start': 'Начать сбор вручную',
  'plugin.collector.start.confirm':
    'Вы уверены, что хотите начать коллекционировать?',
  'plugin.collector.start.content':
    'Это немедленно начнет выполнение операции задачи сбора данных.',
  'plugin.collector.tips':
    'Чтобы собирать статьи, вам необходимо сначала установить основные ключевые слова. Пожалуйста, проверьте функцию «Управление базой данных ключевых слов» и добавьте соответствующие ключевые слова.',
  'plugin.collector.replace': 'Пакетная замена ключевых слов',
  'plugin.collector.proxy_config.name': 'Enable proxy',
  'plugin.collector.proxy_config.close': 'Disable',
  'plugin.collector.proxy_config.open': 'Enable',
  'plugin.collector.proxy_config.platform': 'Proxy platform',
  'plugin.collector.proxy_config.platform.juliang': 'Massive IP',
  'plugin.collector.proxy_config.platform.description':
    'Only supports massive IP proxy service, please purchase the unlimited dynamic proxy package. Proxy purchase address:',
  'plugin.collector.proxy_config.api_url': 'API extraction link',
  'plugin.collector.proxy_config.api_url.description':
    'Please fill in the generated API extraction link here directly',
  'plugin.collector.concurrent': 'Concurrent number',
  'plugin.collector.concurrent.placeholder': 'Default 10',
  'plugin.collector.concurrent.description':
    'Please set the number of API extraction links that can be accessed per second according to the actual situation of the purchased package',
  'plugin.collector.expire': 'IP validity period',
  'plugin.collector.expire.addon': 'seconds',
  'plugin.collector.expire.placeholder': 'Default 0',
  'plugin.collector.expire.description':
    'Set the expiration time of the IP according to the actual situation of the purchased package. If the expiration time is set, the program can release the IP in advance to improve efficiency',
  'plugin.comment.new': 'добавить комментарий',
  'plugin.comment.edit': 'Редакционные комментарии',
  'plugin.comment.item-title': 'Заголовок документа',
  'plugin.comment.time': 'Время комментирования',
  'plugin.comment.ip': 'Комментарий IP',
  'plugin.comment.parent': 'Превосходные комментарии',
  'plugin.comment.user-id': 'ID пользователя',
  'plugin.comment.user-name': 'имя пользователя',
  'plugin.comment.content': 'Комментарии',
  'plugin.comment.new-status': 'Пожалуйста, выберите новый статус',
  'plugin.comment.batch-update-status': 'Статус пакетного обновления',
  'plugin.comment.view-edit': 'Посмотреть/Редактировать',
  'plugin.comment.delete.confirm':
    'Вы уверены, что хотите удалить выбранные комментарии?',
  'plugin.fileupload.delete.confirm':
    'Вы уверены, что хотите удалить выбранные файлы?',
  'plugin.fileupload.upload.name': 'Загрузить новый файл',
  'plugin.fileupload.upload.support':
    'Примечание. Разрешается загружать только файлы подтверждения в формате txt/htm/html/xml.',
  'plugin.fileupload.upload.btn': 'загрузить файлы',
  'plugin.fileupload.view': 'Проверять',
  'plugin.fileupload.create-time': 'Время загрузки',
  'plugin.finance.commission': 'Комиссионное управление',
  'plugin.finance.withdraw': 'Ручной вывод',
  'plugin.finance.time': 'время',
  'plugin.finance.amount': 'Количество',
  'plugin.finance.after-amount': 'Сумма после изменения',
  'plugin.finance.status.unwithdraw': 'Не снято',
  'plugin.finance.status.withdraw': 'снято',
  'plugin.finance.withdraw.confirm':
    'Вы уверены, что хотите обработать вывод средств вручную?',
  'plugin.finance.withdraw.confirm.content':
    'Это эквивалентно подаче заявки на вывод средств со стороны пользователя.',
  'plugin.finance.order-id': 'номер заказа',
  'plugin.finance.direction': 'Направление финансирования',
  'plugin.finance.direction.in': 'Зарабатывать',
  'plugin.finance.direction.out': 'Урегулирование',
  'plugin.finance.flow': 'Учет доходов и расходов',
  'plugin.finance.type': 'Тип фонда',
  'plugin.finance.type.sale': 'продавать',
  'plugin.finance.type.buy': 'Купить',
  'plugin.finance.type.refund': 'Возвращать деньги',
  'plugin.finance.type.charge': 'пополнить',
  'plugin.finance.type.withdraw': 'отзывать',
  'plugin.finance.type.spread': 'повышение',
  'plugin.finance.type.cashback': 'Возврат наличных',
  'plugin.finance.type.commission': 'комиссия',
  'plugin.finance.withdraw.finish.confirm':
    'Вы уверены, что хотите завершить вывод средств вручную?',
  'plugin.finance.withdraw.finish.content':
    'Если вы заплатили пользователю в автономном режиме, вы можете нажать здесь, чтобы завершить оплату.',
  'plugin.finance.withdraw.amount': 'Сумма вывода',
  'plugin.finance.withdraw.status.waiting': 'Ожидание обработки',
  'plugin.finance.withdraw.status.agree': 'одобренный',
  'plugin.finance.withdraw.status.finish': 'снято',
  'plugin.finance.withdraw.apply-time': 'время подачи заявки',
  'plugin.finance.withdraw.success-time': 'время успеха',
  'plugin.finance.withdraw.agree': 'Согласен на снятие наличных',
  'plugin.finance.withdraw.finish': 'Полный вывод',
  'plugin.finance.withdraw.name': 'Управление выводом средств',
  'plugin.finance.withdraw.apply': 'Заявка на вывод средств',
  'plugin.fulltext.tips':
    'После включения полнотекстового поиска вы можете осуществлять поиск по содержимому документа. Однако полнотекстовый поиск будет занимать много памяти сервера. Если на вашем сервере мало памяти, не рекомендуется включать полнотекстовый поиск.',
  'plugin.fulltext.open.name': 'Включить ли полнотекстовый поиск',
  'plugin.fulltext.open.false': 'закрытие',
  'plugin.fulltext.open.true': 'включать',
  'plugin.fulltext.use_content.false': 'Только название и введение',
  'plugin.fulltext.use_content.true': 'Включить содержимое документа',
  'plugin.fulltext.use_content.name': 'Индексировать содержимое',
  'plugin.fulltext.modules.name': 'Открытая модель',
  'plugin.fulltext.search.name': 'Тип поиска',
  'plugin.fulltext.search.archive': 'Поиск документов',
  'plugin.fulltext.search.category': 'Поиск по категориям',
  'plugin.fulltext.search.tag': 'Поиск по тегам',
  'plugin.group.edit': 'Изменить группу пользователей',
  'plugin.group.add': 'Добавить группу пользователей',
  'plugin.group.name': 'имя',
  'plugin.group.description': 'представлять',
  'plugin.group.level': 'Уровень группы',
  'plugin.group.level.suffix': 'сорт',
  'plugin.group.level.description':
    'Например, обычные участники имеют уровень 0, промежуточные участники — уровень 1, старшие члены — уровень 2, основные члены — уровень 3 и т. д. Заполните числа.',
  'plugin.group.price': 'Цена группы пользователей',
  'plugin.group.price.suffix': 'точка',
  'plugin.group.price.description':
    'Цена, которую необходимо заплатить за приобретение VIP для этой группы пользователей. Обратите внимание, что единица измерения — цент. Например, 1 юань, введите здесь 100.',
  'plugin.group.expire_day': 'Срок действия группы пользователей',
  'plugin.group.expire_day.suffix': 'небо',
  'plugin.group.expire_day.description':
    'После покупки VIP он будет действителен в течение скольких дней. Введите 365 на 1 год. По истечении срока действия он вернется в первую группу пользователей.',
  'plugin.group.content_safe': 'Безопасность контента',
  'plugin.group.content_safe.no-verify':
    'Публикация комментариев/контента освобождается от проверки.',
  'plugin.group.content_safe.no-captcha':
    'Публикация комментариев/контента без кода подтверждения',
  'plugin.group.share_reward': 'Срок действия группы пользователей',
  'plugin.group.share_reward.description':
    'Рекомендуется установить 5%-20, десятичная точка не может быть установлена. Приоритет коэффициента комиссии: коэффициент комиссии, установленный продуктом > коэффициент комиссии группы пользователей > коэффициент комиссии по умолчанию.',
  'plugin.group.parent_reward': 'Коэффициент вознаграждения за приглашение',
  'plugin.group.parent_reward.description':
    'Рекомендуется установить 1%-5%, десятичная точка не может быть установлена. Превосходное соотношение комиссий. Дистрибьютор a приглашает b стать дистрибьютором, и b становится следующим продавцом a. Когда b успешно продвигает заказ, b может получить комиссию за распространение, а a получает только вознаграждение за приглашение.',
  'plugin.group.discount': 'Скидка пользователя',
  'plugin.group.discount.description':
    'Рекомендуется установить 90%-100%. После того, как пользователи перейдут на страницу по ссылке, предоставленной дистрибьютором, они смогут воспользоваться скидкой при оформлении заказа.',
  'plugin.group.permission': 'Настройки разрешения на распространение',
  'plugin.group.delete.confirm':
    'Вы уверены, что хотите удалить этот фрагмент данных?',
  'plugin.guestbook.reply.required':
    'Сначала настройте напоминание по электронной почте и найдите в функции «Напоминание по электронной почте».',
  'plugin.guestbook.replysubmit.required':
    'Пожалуйста, заполните заголовок и содержание электронного письма.',
  'plugin.guestbook.replysubmit.success': 'Письмо успешно отправлено',
  'plugin.guestbook.view': 'Посмотреть сообщение',
  'plugin.guestbook.user-name': 'имя пользователя',
  'plugin.guestbook.contact': 'Контактная информация',
  'plugin.guestbook.reply': 'Ответное письмо',
  'plugin.guestbook.content': 'Содержание сообщения',
  'plugin.guestbook.click-preview': 'Нажмите, чтобы просмотреть',
  'plugin.guestbook.refer': 'источник',
  'plugin.guestbook.create-time': 'Время сообщения',
  'plugin.guestbook.reply.subject': 'заголовок письма',
  'plugin.guestbook.reply.message': 'содержание электронного письма',
  'plugin.guestbook.field.delete.confirm':
    'Вы уверены, что хотите удалить это поле?',
  'plugin.guestbook.field.delete.confirm.content':
    'Вы можете восстановить, обновив страницу перед сохранением.',
  'plugin.guestbook.setting': 'Настройки сообщений на сайте',
  'plugin.guestbook.return-message': 'Советы для успешного сообщения:',
  'plugin.guestbook.return-message.placeholder':
    'По умолчанию: Спасибо за ваше сообщение!',
  'plugin.guestbook.return-message.description':
    'Подсказка, которую пользователи видят после отправки сообщения. Например: Спасибо за ваше сообщение!',
  'plugin.guestbook.delete.confirm':
    'Вы уверены, что хотите удалить выбранное сообщение?',
  'plugin.guestbook.export': 'Экспортировать сообщения',
  'plugin.guestbook.export.confirm':
    'Вы уверены, что хотите экспортировать все сообщения?',
  'plugin.htmlcache.remote-file': 'удаленный файл',
  'plugin.htmlcache.local-file': 'локальные файлы',
  'plugin.htmlcache.push-status': 'push-статус',
  'plugin.htmlcache.push-status.success': 'успех',
  'plugin.htmlcache.push-status.failure': 'неудача',
  'plugin.htmlcache.re-push': 'Отправить',
  'plugin.htmlcache.push-log': 'нажать запись',
  'plugin.htmlcache.generate.all.confirm':
    'Вы уверены, что хотите создать статический кеш для всего сайта?',
  'plugin.htmlcache.generate.home.confirm':
    'Вы уверены, что хотите создать статический кеш главной страницы?',
  'plugin.htmlcache.generate.category.confirm':
    'Вы уверены, что хотите создать статический кеш столбца?',
  'plugin.htmlcache.generate.archive.confirm':
    'Вы уверены, что хотите создать статический кэш документа?',
  'plugin.htmlcache.generate.tag.confirm':
    'Вы уверены, что хотите создать статический кеш тегов?',
  'plugin.htmlcache.clean.confirm':
    'Вы уверены, что хотите очистить статический кеш всего сайта? Если кэшированных файлов много, это может занять много времени.',
  'plugin.htmlcache.clean.confirm.content':
    'Эта операция очищает только файлы локального кэша сервера и не может очистить статические файлы сервера.',
  'plugin.htmlcache.clean.success': 'Очистка прошла успешно',
  'plugin.htmlcache.push.all.confirm':
    'Вы уверены, что хотите отправить все статические файлы на статический сервер?',
  'plugin.htmlcache.push.all.confirm.content':
    'Он доступен только в том случае, если настроен статический сервер. Полная передача занимает много времени. Если глобальные изменения не вносятся, можно использовать инкрементную отправку.',
  'plugin.htmlcache.push.addon.confirm':
    'Вы уверены, что хотите постепенно отправлять статические файлы на статический сервер?',
  'plugin.htmlcache.push.addon.confirm.content':
    'Доступно только в том случае, если настроен статический сервер. Инкрементная передача будет отправлять только обновленные файлы статического кэша.',
  'plugin.htmlcache.isopen': 'Включить ли статическое кэширование страниц',
  'plugin.htmlcache.index-time': 'Время кэширования главной страницы',
  'plugin.htmlcache.index-time.suffix': 'Второй',
  'plugin.htmlcache.index-time.description':
    'Если вы заполните 0 секунд, оно не будет кэшироваться.',
  'plugin.htmlcache.category-time': 'Список времени кэширования',
  'plugin.htmlcache.archive-time': 'Время кэширования подробностей',
  'plugin.htmlcache.storage-type': 'Статический сервер веб-сайта',
  'plugin.htmlcache.storage-type.close': 'закрытие',
  'plugin.htmlcache.storage-type.aliyun': 'Облачное хранилище Алибаба',
  'plugin.htmlcache.storage-type.tencent': 'Облачное хранилище Tencent',
  'plugin.htmlcache.storage-type.qiniu': 'Облачное хранилище Qiniu',
  'plugin.htmlcache.storage-type.upyun': 'Еще один снимок облачного хранилища',
  'plugin.htmlcache.storage-type.ftp': 'FTP-передача',
  'plugin.htmlcache.storage-type.ssh': 'SFTP (SSH) передача',
  'plugin.htmlcache.storage-url': 'Статический адрес сайта',
  'plugin.htmlcache.storage-url.placeholder':
    'Например: https://www.anqicms.com',
  'plugin.htmlcache.aliyun.endpoint': 'Облачный узел Alibaba',
  'plugin.htmlcache.aliyun.endpoint.placeholder':
    'Например: http://oss-cn-hangzhou.aliyuncs.com.',
  'plugin.htmlcache.aliyun.bucket-name': 'Название облачного сегмента Alibaba',
  'plugin.htmlcache.tencent.bucket-url':
    'Адрес сегмента хранилища Tencent Cloud',
  'plugin.htmlcache.tencent.bucket-url.placeholder':
    'Например: https://aa-1257021234.cos.ap-guangzhou.myqcloud.com',
  'plugin.htmlcache.qiniu.bucket-name':
    'Имя сегмента облачного хранилища Qiniu',
  'plugin.htmlcache.qiniu.bucket-name.placeholder': 'Например: анкимс',
  'plugin.htmlcache.qiniu.region': 'Облачное хранилище Qiniu',
  'plugin.htmlcache.qiniu.region.z0': 'Восточный Китай',
  'plugin.htmlcache.qiniu.region.z1': 'Северный Китай',
  'plugin.htmlcache.qiniu.region.z2': 'Южный Китай',
  'plugin.htmlcache.qiniu.region.na0': 'Северная Америка',
  'plugin.htmlcache.qiniu.region.as0': 'Юго-Восточная Азия',
  'plugin.htmlcache.qiniu.region.cn-east2': 'Восточный Китай-Чжэцзян2',
  'plugin.htmlcache.qiniu.region.fog-cn-east1':
    'Хранение тумана Восточно-Китайский регион',
  'plugin.htmlcache.upyun.operator': 'Еще один кадр облачного оператора',
  'plugin.htmlcache.upyun.password':
    'Возьмите пароль оператора облака еще раз.',
  'plugin.htmlcache.upyun.bucket':
    'Также обратите внимание на название службы облачного хранения.',
  'plugin.htmlcache.ftp.tips':
    'Примечание. После тестирования PureFtp, поставляемый с Pagoda, нельзя использовать нормально.',
  'plugin.htmlcache.ftp.host': 'IP-адрес FTP',
  'plugin.htmlcache.ftp.port': 'FTP-порт',
  'plugin.htmlcache.ftp.username': 'Имя пользователя FTP',
  'plugin.htmlcache.ftp.password': 'FTP-пароль',
  'plugin.htmlcache.ftp.webroot': 'Корневой каталог загрузки по FTP',
  'plugin.htmlcache.ssh.host': 'IP-адрес SSH',
  'plugin.htmlcache.ssh.port': 'SSH-порт',
  'plugin.htmlcache.ssh.username': 'Имя пользователя SSH',
  'plugin.htmlcache.ssh.password': 'SSH-пароль',
  'plugin.htmlcache.ssh.or-key': 'или SSH-ключ',
  'plugin.htmlcache.ssh.or-key.description':
    'Если ваш SSH-сервер использует ключ для входа в систему, загрузите его.',
  'plugin.htmlcache.ssh.or-key.upload': 'загрузить файлы',
  'plugin.htmlcache.ssh.webroot': 'SSH загрузить корневой каталог',
  'plugin.htmlcache.generate.name': 'Операция сборки',
  'plugin.htmlcache.generate.last-time': 'Время последней ручной генерации:',
  'plugin.htmlcache.generate.last-time.empty': 'Не создается вручную',
  'plugin.htmlcache.clean.all': 'очистить весь кеш',
  'plugin.htmlcache.build.all': 'Генерировать все кеши вручную',
  'plugin.htmlcache.build.home': 'Создать кеш домашней страницы вручную',
  'plugin.htmlcache.build.category': 'Создание кэша столбцов вручную',
  'plugin.htmlcache.build.archive': 'Создать кэш документов вручную',
  'plugin.htmlcache.build.tag': 'Создать кэш тегов вручную',
  'plugin.htmlcache.push.name': 'Статические серверные операции',
  'plugin.htmlcache.push.last-time': 'Время последнего ручного нажатия:',
  'plugin.htmlcache.push.last-time.empty': 'Не нажимается вручную',
  'plugin.htmlcache.push.all':
    'Отправьте все статические файлы на статический сервер.',
  'plugin.htmlcache.push.addon':
    'Отправляйте на статический сервер только обновленные файлы.',
  'plugin.htmlcache.push.log.all': 'Все push-записи',
  'plugin.htmlcache.push.log.error': 'Отправить запись об ошибке',
  'plugin.htmlcache.build.process': 'Прогресс сборки',
  'plugin.htmlcache.build.start-time': 'Время начала:',
  'plugin.htmlcache.build.end-time': 'Полное время:',
  'plugin.htmlcache.build.unfinished': 'отменено',
  'plugin.htmlcache.build.total': 'Найдено количество:',
  'plugin.htmlcache.build.finished-count': 'Обработанное количество:',
  'plugin.htmlcache.build.current': 'На данный момент выполняем задачи:',
  'plugin.htmlcache.build.error-count': 'Количество ошибок:',
  'plugin.htmlcache.build.error-msg': 'сообщение об ошибке:',
  'plugin.htmlcache.push.process': 'Нажимайте на прогресс',
  'plugin.htmlcache.description.1':
    'После включения статического кэширования страниц домашняя страница, страница списка и страница сведений будут кэшироваться для ускорения открытия веб-сайта, но для хранения файлов кэша потребуется больше места на сервере.',
  'plugin.htmlcache.description.2':
    'Если вам нужно включить статический веб-сайт, тип шаблона должен быть адаптивным. Чтобы открыть статический веб-сайт, вам необходимо заполнить информацию о сервере статического веб-сайта. После успешной связи система автоматически передаст статическую страницу на сервер статического веб-сайта.',
  'plugin.htmlcache.description.3':
    'Прежде чем включать статический веб-сайт, вам необходимо включить кеширование статических страниц. После включения статического веб-сайта поиск, сообщение, комментарий, переход 301 и другие функции, требующие отправки данных на серверную часть, будут недействительны, и веб-сайт будет иметь только эффекты отображения.',
  'plugin.htmlcache.description.4':
    'После включения статического веб-сайта следующие операции не будут автоматически перегенерированы, и операции по созданию статических страниц необходимо выполнять вручную: Настройка шаблонов (изменение шаблонов, включение шаблонов), Изменение настроек фона (глобальные настройки, настройки контента, контактная информация, навигация). и т.д.), модифицированные псевдостатические правила и другие изменения, влияющие на глобальную ситуацию.',
  'plugin.importapi.token.required':
    'Пожалуйста, введите токен длиной не более 128 символов.',
  'plugin.importapi.token.confirm': 'Вы уверены, что хотите обновить токен?',
  'plugin.importapi.token.confirm.content':
    'После обновления исходный токен становится недействительным, для работы используйте новый адрес API.',
  'plugin.importapi.token.copy.success': 'Скопировано успешно',
  'plugin.importapi.tips':
    'Контент, созданный с помощью сторонних платформ, таких как написание ИИ, можно импортировать в эту систему через API.',
  'plugin.importapi.token.name': 'Мой токен:',
  'plugin.importapi.token.copy': 'Нажмите, чтобы скопировать',
  'plugin.importapi.token.update': 'UpdateToken',
  'plugin.importapi.archive-api': 'Интерфейс импорта документов',
  'plugin.importapi.api-url': 'адрес интерфейса:',
  'plugin.importapi.method': 'Метод запроса:',
  'plugin.importapi.request-type': 'Тип запроса:',
  'plugin.importapi.post-fields': 'Поля POST-формы:',
  'plugin.importapi.field.remark': 'иллюстрировать',
  'plugin.importapi.field.archive-id':
    'Идентификатор документа, автоматически генерируется по умолчанию',
  'plugin.importapi.field.title': 'Заголовок документа',
  'plugin.importapi.field.content': 'Содержание документа',
  'plugin.importapi.field.category-id': 'Идентификатор категории',
  'plugin.importapi.field.keywords': 'Ключевые слова документа',
  'plugin.importapi.field.description': 'Введение документа',
  'plugin.importapi.field.url-token':
    'Пользовательский псевдоним URL-адреса, поддерживает только цифры и английские буквы.',
  'plugin.importapi.field.images':
    'Изображения статьи могут быть установлены до 9 изображений.',
  'plugin.importapi.field.logo':
    'Миниатюра документа может представлять собой абсолютный адрес, например: https://www.anqicms.com/logo.png, или относительный адрес, например: /logo.png.',
  'plugin.importapi.field.publish-time':
    'Формат: 2006-01-02 15:04:05 Время выпуска документа может быть в будущем. Если это произойдет, документ не будет официально выпущен, пока время не истечет.',
  'plugin.importapi.field.tag':
    'Тег документа. Несколько тегов разделяются английскими запятыми, например: aaa, bbb, ccc.',
  'plugin.importapi.field.diy': 'Другие настраиваемые поля',
  'plugin.importapi.field.diy.remark':
    'Если вы передаете другие настраиваемые поля и они существуют в таблице документа, они также поддерживаются.',
  'plugin.importapi.field.draft':
    'Сохранять ли в черновик. Поддерживаемые значения: false|true. Если указано значение true, опубликованный документ будет сохранен в черновике.',
  'plugin.importapi.field.cover':
    'Когда один и тот же заголовок, ID документ существует, чтобы покрыть или нет, поддерживаемые значения: 0 / 1 / 2, при заполнении 1, будут покрыты до последнего содержимого, при установке 0 или без передачи, будет подсказать ошибку, заполнить 2, не делать суждения',
  'plugin.importapi.return-type': 'Формат возврата:',
  'plugin.importapi.return-example.success': 'Пример правильного результата:',
  'plugin.importapi.return-example.failure': 'Пример неправильных результатов:',
  'plugin.importapi.category-api': 'Получить интерфейс классификации',
  'plugin.importapi.category-api.fields': 'Поля формы POST/Параметры запроса:',
  'plugin.importapi.category-api.fields.empty': 'никто',
  'plugin.importapi.category-api.module-id':
    'Идентификатор модели классификации, которую необходимо получить. Введите число. Поддерживаемые значения: 0 = все, 1,2... соответствующий идентификатор модели.',
  'plugin.importapi.train-mopdule': 'Издательский модуль «Локомотив»',
  'plugin.importapi.train-mopdule.url': 'Адрес веб-сайта:',
  'plugin.importapi.train-mopdule.token': 'Глобальные переменные:',
  'plugin.importapi.train-mopdule.download': 'Загрузка модуля:',
  'plugin.importapi.train-mopdule.download.text': 'нажмите, чтобы скачать',
  'plugin.importapi.train-mopdule.support-version': 'Поддерживаемые версии:',
  'plugin.importapi.train-mopdule.support-version.text':
    'Поддержка сборщика локомотивов версии 9.0 или выше для импорта и использования модуля выпуска.',
  'plugin.importapi.train-mopdule.example': 'Пример конфигурации:',
  'plugin.importapi.token.reset': 'СбросТокен',
  'plugin.importapi.token.new': 'Новый токен',
  'plugin.importapi.token.new.placeholder': 'Пожалуйста, заполните новый токен',
  'plugin.importapi.token.new.description':
    'Токен обычно состоит из комбинации цифр и букв длиной более 10 и менее 128 цифр.',
  'plugin.interference.isopen': 'Включите сбор кода защиты от помех',
  'plugin.interference.isopen.description':
    'Следующие настройки действуют только в том случае, если эта функция включена.',
  'plugin.interference.isopen.no': 'закрытие',
  'plugin.interference.isopen.yes': 'включать',
  'plugin.interference.mode': 'Режим защиты от помех',
  'plugin.interference.mode.class': 'Добавить случайный класс',
  'plugin.interference.mode.text': 'Добавить случайный скрытый текст',
  'plugin.interference.disable-selection': 'Отключить выделение текста',
  'plugin.interference.disable-selection.no': 'Не отключено',
  'plugin.interference.disable-selection.yes': 'Запрещать',
  'plugin.interference.disable-copy': 'Отключить репликацию',
  'plugin.interference.disable-right-click':
    'Отключить щелчок правой кнопкой мыши',
  'plugin.keyword.batch-import': 'Импортируйте ключевые слова пакетно.',
  'plugin.keyword.batch-import.tips':
    'Примечание. Для загрузки и импорта поддерживаются только файлы в формате CSV.',
  'plugin.keyword.batch-import.step1':
    'Первый шаг — загрузить файл шаблона CSV.',
  'plugin.keyword.batch-import.step1.btn': 'Скачать файл шаблона csv',
  'plugin.keyword.batch-import.step2': 'Второй шаг — загрузить CSV-файл.',
  'plugin.keyword.batch-import.step2.btn': 'Загрузить CSV-файл',
  'plugin.keyword.edit': 'Изменить ключевые слова',
  'plugin.keyword.add': 'Добавить ключевые слова',
  'plugin.keyword.title': 'Название ключевого слова',
  'plugin.keyword.title.placeholder':
    'Поддерживает пакетное добавление, по одному ключевому слову в строке.',
  'plugin.keyword.archive-category': 'Классификация документов',
  'plugin.keyword.archive-category-id': 'Идентификатор классификации документа',
  'plugin.keyword.manual-dig': 'Ручная топология',
  'plugin.keyword.dig-setting': 'Настройки расширения слов',
  'plugin.keyword.dig-setting.auto-dig': 'Автоматическое расширение слов',
  'plugin.keyword.dig-setting.auto-dig.no': 'нет',
  'plugin.keyword.dig-setting.auto-dig.yes': 'Автоматический',
  'plugin.keyword.dig-setting.max-count': 'Количество расширений',
  'plugin.keyword.dig-setting.max-count.description':
    'Если выбрано автоматическое расширение слов, количество расширений слов будет действительным.',
  'plugin.keyword.dig-setting.max-count.placeholder': 'По умолчанию 100000',
  'plugin.keyword.dig-setting.language': 'Язык ключевых слов',
  'plugin.keyword.dig-setting.title-exclude':
    'слова для исключения ключевых слов',
  'plugin.keyword.dig-setting.title-exclude.description':
    'При расширении слов, если эти ключевые слова встречаются в ключевых словах, они не будут собраны.',
  'plugin.keyword.dig-setting.replace': 'Замена ключевых слов',
  'plugin.keyword.dig-setting.replace.tips1':
    'Отредактируйте пары ключевых слов, которые необходимо заменить, и замена будет выполнена автоматически при раскрытии слов.',
  'plugin.keyword.delete.confirm':
    'Вы уверены, что хотите удалить выбранные ключевые слова?',
  'plugin.keyword.export.confirm':
    'Вы уверены, что хотите экспортировать все ключевые слова?',
  'plugin.keyword.collect.confirm':
    'Вы уверены, что хотите собрать это ключевое слово?',
  'plugin.keyword.collect.doing': 'Сейчас собираю',
  'plugin.keyword.aigenerate.confirm':
    'Вы уверены, что хотите выполнить операции записи ИИ по этому ключевому слову?',
  'plugin.keyword.aigenerate.content':
    'Автоматическое написание AI требует оплаты. Убедитесь, что вы привязали свою учетную запись Anqi.',
  'plugin.keyword.aigenerate.doing': 'Создание',
  'plugin.keyword.cleanup.confirm':
    'Вы уверены, что хотите удалить все ключевые слова?',
  'plugin.keyword.cleanup.content':
    'Эта операция удалит все ключевые слова и не сможет быть восстановлена. Действуйте осторожно.',
  'plugin.keyword.level': 'Иерархия',
  'plugin.keyword.article-count': 'Сборник статей',
  'plugin.keyword.collect': 'Ручной сбор',
  'plugin.keyword.aigenerate': 'ИИ письмо',
  'plugin.keyword.aigenerate.view-archive': 'Посмотреть документацию по ИИ',
  'plugin.keyword.export': 'Экспортировать ключевые слова',
  'plugin.keyword.import': 'Импортировать ключевые слова',
  'plugin.keyword.cleanup': 'Очистить базу ключевых слов',
  'plugin.link.api.title': 'Дружественный API ссылок',
  'plugin.link.api.list': 'Получите удобный интерфейс списка ссылок',
  'plugin.link.api.verify': 'Интерфейс аутентификации',
  'plugin.link.api.add': 'Добавить удобный интерфейс ссылок',
  'plugin.link.field.other-title': 'Ключевые слова другой стороны',
  'plugin.link.field.other-link': 'Другая ссылка',
  'plugin.link.field.other-link.description':
    'Например: https://www.anqicms.com/',
  'plugin.link.field.nofollow':
    'Добавлять ли nofollow, необязательные значения: 0 — не добавлять, 1 — добавлять.',
  'plugin.link.field.back-link': 'Страница с противоположной ссылкой',
  'plugin.link.field.back-link.description':
    'URL-адрес страницы, на которой другая сторона разместила ссылку на этот сайт.',
  'plugin.link.field.self-title': 'мои ключевые слова',
  'plugin.link.field.self-title.description':
    'Ключевые слова, которые я размещаю на странице другого абонента',
  'plugin.link.field.self-link': 'моя ссылка',
  'plugin.link.field.self-link.description':
    'Ссылка, которую я разместил на странице другой стороны',
  'plugin.link.field.contact': 'Контактная информация другой стороны',
  'plugin.link.field.contact.description':
    'Заполните QQ, WeChat, номер телефона и т. д., чтобы облегчить последующий контакт.',
  'plugin.link.field.remark': 'Примечания',
  'plugin.link.api.delete': 'Удалить интерфейс дружественной ссылки',
  'plugin.link.edit': 'Редактировать дружеские ссылки',
  'plugin.link.add': 'Добавьте дружественные ссылки',
  'plugin.link.nofollow.description': 'Добавлять ли тег nofollow',
  'plugin.link.nofollow.no': 'нет добавленного',
  'plugin.link.nofollow.yes': 'добавить в',
  'plugin.link.more': 'больше вариантов',
  'plugin.link.delete.confirm':
    'Вы уверены, что хотите удалить выбранную дружескую ссылку?',
  'plugin.link.status.wait': 'Для проверки',
  'plugin.link.status.ok': 'нормальный',
  'plugin.link.status.wrong-keyword': 'Ключевые слова несовместимы',
  'plugin.link.status.no-back-url': 'У другой стороны нет обратной ссылки',
  'plugin.link.other-title-link': 'Ключевые слова/ссылки другой стороны',
  'plugin.link.other-contact-remark':
    'Контактная информация/замечания другой стороны',
  'plugin.link.status-check-time':
    'Контактная информация/замечания другой стороны',
  'plugin.link.create-time': 'добавить время',
  'plugin.link.check': 'исследовать',
  'plugin.material.category.delete.confirm':
    'Вы уверены, что хотите удалить его?',
  'plugin.material.category.title': 'Название раздела',
  'plugin.material.category.count': 'Количество материала',
  'plugin.material.category.add': 'Новый раздел',
  'plugin.material.category.edit': 'Переименовать раздел:',
  'plugin.material.category.manage': 'Управление сектором',
  'plugin.material.category.title.tips':
    'Пожалуйста, заполните название раздела',
  'plugin.material.import.selected': 'выбранный',
  'plugin.material.import.segment': 'фрагмент',
  'plugin.material.import.clear':
    'Вы уверены, что хотите удалить материалы контента, выбранные для загрузки?',
  'plugin.material.delete.confirm':
    'Вы уверены, что хотите удалить выбранный материал?',
  'plugin.material.import.submit.tips.before':
    'Среди выбранных вами материалов есть',
  'plugin.material.import.submit.tips.after':
    'Для этого материала не выбран раздел. Хотите продолжить отправку?',
  'plugin.material.import.upload-error':
    'Ошибка загрузки. Повторите попытку позже.',
  'plugin.material.import.batch-add': 'Добавляйте материалы партиями',
  'plugin.material.import.batch-add.tips':
    'Примечание. Вы можете загружать статьи, хранящиеся в формате txt или html.',
  'plugin.material.import.default-category': 'По умолчанию импортируется в:',
  'plugin.material.import.default-category.placeholder':
    'Выберите раздел для импорта',
  'plugin.material.import.default-category.all': 'все',
  'plugin.material.import.select-file': 'Выберите для загрузки:',
  'plugin.material.import.select-file.btn':
    'Выберите файл статьи в формате Txt или html.',
  'plugin.material.import.paste': 'Или нажмите, чтобы вставить текст',
  'plugin.material.import.selected.count': 'Выбран материал абзаца:',
  'plugin.material.import.paste.clear': 'Прозрачный',
  'plugin.material.import.category.select': 'Выберите раздел',
  'plugin.material.import.merge-to-next': 'Слить',
  'plugin.material.import.paste.title':
    'Пожалуйста, вставьте сюда содержание статьи',
  'plugin.material.import.paste.analysis': 'анализировать контент',
  'plugin.material.import.paste.description':
    'По умолчанию контент будет фильтровать все теги HTML и сохранять только текст. Если вам нужно сохранить html-теги, пожалуйста, проверьте',
  'plugin.material.import.paste.description.btn': 'сохранять html-теги',
  'plugin.material.edit': 'Редактировать контент',
  'plugin.material.add': 'Добавить материал',
  'plugin.material.content': 'содержание',
  'plugin.material.user-count': 'Количество цитирований',
  'plugin.material.preview': 'Предварительный просмотр',
  'plugin.material.category-filter': 'Классификационный фильтр',
  'plugin.material.all': 'Все ресурсы',
  'plugin.order.status': 'Статус заказа',
  'plugin.order.status.wait': 'Ожидает платежа',
  'plugin.order.status.paid': 'быть доставленным',
  'plugin.order.status.delivery': 'Ожидание получения',
  'plugin.order.status.finished': 'удалось',
  'plugin.order.status.refunding': 'Возврат',
  'plugin.order.status.refunded': 'возвращен',
  'plugin.order.status.closed': 'заказ закрыт',
  'plugin.order.status.all': 'все',
  'plugin.order.detail': 'запросить информацию',
  'plugin.order.type': 'Тип заказа',
  'plugin.order.type.vip': 'VIP',
  'plugin.order.type.goods': 'товар',
  'plugin.order.order-id': 'номер заказа',
  'plugin.order.create-time': 'время заказа',
  'plugin.order.pay-time': 'Время оплаты',
  'plugin.order.deliver-time': 'Время доставки',
  'plugin.order.finished-time': 'Полное время',
  'plugin.order.payment-id': 'Номер транзакции',
  'plugin.order.terrace-id': 'Серийный номер продавца',
  'plugin.order.pay-amount': 'Общая уплаченная цена',
  'plugin.order.order-amount': 'сумма заказа',
  'plugin.order.origin-amount': 'первоначальная общая цена',
  'plugin.order.buy.user-name': 'подписчик',
  'plugin.order.share.user-name': 'Пользователи распространения',
  'plugin.order.share.amount': 'Комиссия за распределение',
  'plugin.order.share.parent.user-name': 'Главный пользователь распределения',
  'plugin.order.share.parent.amount': 'Высшая комиссия за вознаграждение',
  'plugin.order.remark': 'примечания к заказу',
  'plugin.order.vip': 'Купить VIP',
  'plugin.order.goods': 'заказать товар',
  'plugin.order.detail.title': 'имя',
  'plugin.order.detail.price': 'цена за единицу товара',
  'plugin.order.detail.quantity': 'Заказанное Количество',
  'plugin.order.detail.amount': 'Итоговая цена',
  'plugin.order.recipient.name': 'получатель',
  'plugin.order.recipient.contact': 'Получение номера телефона',
  'plugin.order.recipient.address': 'Адрес получателя',
  'plugin.order.setting': 'Настройки заказа',
  'plugin.order.setting.progress': 'Способ обработки заказа',
  'plugin.order.setting.progress.yes': 'Обычный процесс транзакции',
  'plugin.order.setting.progress.no': 'Транзакция завершается напрямую',
  'plugin.order.setting.progress.description':
    'Обычные транзакции требуют, чтобы пользователь подтвердил получение или завершил заказ по истечении срока действия. Транзакция завершается непосредственно после оплаты пользователем и завершения заказа.',
  'plugin.order.setting.auto-finish': 'Заказ выполнен автоматически',
  'plugin.order.setting.auto-finish.placeholder': 'По умолчанию 10 дней',
  'plugin.order.setting.auto-finish.suffix': 'небо',
  'plugin.order.setting.auto-close': 'Тайм-аут заказа закрыт',
  'plugin.order.setting.auto-close.description':
    'Не закрывается автоматически по умолчанию',
  'plugin.order.setting.auto-close.suffix': 'минута',
  'plugin.order.setting.seller-percent': 'Доход от торговых продаж',
  'plugin.order.setting.seller-percent.description':
    'Процент выручки от продаж продавца',
  'plugin.order.loading': 'загрузка',
  'plugin.order.finish.confirm':
    'Вы уверены, что хотите выполнить заказ вручную?',
  'plugin.order.finish.content': 'Эта операция необратима.',
  'plugin.order.apply-refund.confirm':
    'Вы уверены, что хотите подать заявку на возврат средств за этот заказ?',
  'plugin.order.apply-refund.content':
    'После возврата средства будут возвращены по первоначальному маршруту.',
  'plugin.order.delivery': 'Корабль',
  'plugin.order.delivery-process': 'Обработка доставки',
  'plugin.order.finish-order': 'Полный заказ',
  'plugin.order.refund-process': 'Обработка возврата',
  'plugin.order.refund': 'Возвращать деньги',
  'plugin.order.refund.disagree': 'Не согласен на возврат денег',
  'plugin.order.refund.agree': 'Согласитесь на возврат средств',
  'plugin.order.apply-refund': 'Запросить возврат средств',
  'plugin.order.pay': 'Оплата',
  'plugin.order.pay-process': 'Обработка платежа',
  'plugin.order.pay-way': 'способ оплаты',
  'plugin.order.pay-way.offline': 'Оффлайн оплата',
  'plugin.order.view': 'Проверять',
  'plugin.order.export': 'Экспортные заказы',
  'plugin.order.export.status': 'Экспорт содержимого заказа',
  'plugin.order.export.start-date': 'Дата начала',
  'plugin.order.export.end-date': 'Дата окончания',
  'plugin.order.export.end-date.description': 'По умолчанию сегодня',
  'plugin.order.express-company': 'Курьерская компания',
  'plugin.order.express-company.empty': 'никто',
  'plugin.order.express-company.sf': 'SF экспресс',
  'plugin.order.express-company.ems': 'Почтовый экспресс',
  'plugin.order.express-company.jd': 'Джей Ди Экспресс',
  'plugin.order.express-company.sto': 'СТО Экспресс',
  'plugin.order.express-company.yto': 'Юаньтун Экспресс',
  'plugin.order.express-company.zto': 'ЗТО Экспресс',
  'plugin.order.express-company.yunda': 'Доставка ЮнДа',
  'plugin.order.express-company.jitu': 'Джиту Экспресс',
  'plugin.order.express-company.baishi': 'Лучший Хуйтун',
  'plugin.order.tracking-number': 'идентификационный номер',
  'plugin.pay.wechat': 'WeChat Pay',
  'plugin.pay.alipay': 'Оплатить с помощью Ali-Pay',
  'plugin.pay.paypal': 'PayPal',
  'plugin.pay.paypal.client-id': 'Client ID',
  'plugin.pay.paypal.secret': 'Client Secret',
  'plugin.pay.wechat.wechat.appid': 'AppID учетной записи службы WeChat',
  'plugin.pay.wechat.wechat.app-secret': 'Сервисный аккаунт WeChat AppSecret',
  'plugin.pay.wechat.weapp.appid': 'AppID мини-программы WeChat',
  'plugin.pay.wechat.weapp.app-secret': 'Мини-программа WeChat AppSecret',
  'plugin.pay.wechat.mchid': 'Идентификатор продавца WeChat',
  'plugin.pay.wechat.apikey': 'API-ключ WeChat Merchant',
  'plugin.pay.wechat.cert-path': 'Сертификат продавца WeChat',
  'plugin.pay.upload': 'загрузить файлы',
  'plugin.pay.wechat.key-path': 'Ключ сертификата продавца WeChat',
  'plugin.pay.alipay.appid': 'AlipayAppID',
  'plugin.pay.alipay.private-key': 'AlipayPrivateKey',
  'plugin.pay.alipay.cert-path': 'Применить сертификат открытого ключа',
  'plugin.pay.alipay.root-cert-path': 'Корневой сертификат Alipay',
  'plugin.pay.alipay.public-cert-path': 'Сертификат открытого ключа Alipay',
  'plugin.push.engine': 'поисковый движок',
  'plugin.push.result': 'Нажмите результаты',
  'plugin.push.name': 'имя',
  'plugin.push.code': 'код',
  'plugin.push.tips':
    'Функция push в поисковой системе поддерживает активную отправку с помощью поиска Baidu и поиска Bing. Хотя другие поисковые системы не имеют функции активной отправки, некоторые поисковые системы все равно могут использовать JS push.',
  'plugin.push.view-log': 'Просмотр последних записей push-уведомлений',
  'plugin.push.baidu': 'Проактивный поиск Baidu',
  'plugin.push.bing': 'Проактивный поиск в Bing',
  'plugin.push.api-link': 'Нажмите адрес интерфейса',
  'plugin.push.baidu.api-link.description':
    'Например: http://data.zz.baidu.com/urls?site=https://www.anqicms.com&token=DTHpH8Xn99BrJLBY.',
  'plugin.push.bing.api-link.description':
    'Например: http://data.zz.baidu.com/urls?site=https://www.anqicms.com&token=DT Например: https://ssl.bing.com/webmaster/api.svc/json /SubmitUrlbatch ?apikey=sampleapikeyEDECC1EA4AE341CC8B6 (обратите внимание, что этот API-ключ задается в настройках в правом верхнем углу инструмента Bing)',
  'plugin.push.google': 'Ключ аккаунта Google в формате JSON',
  'plugin.push.google.json': 'JSON-контент',
  'plugin.push.google.description':
    'Не доступен внутри страны. Чтобы получить JSON, обратитесь к документу: https://www.anqicms.com/google-indexing-help.html.',
  'plugin.push.other-js': '360/Toutiao и другие JS автоматически отправляют',
  'plugin.push.other-js.add': 'Добавить JS-код',
  'plugin.push.other-js.tips1':
    'Вы можете разместить коды JS, такие как автоматическая отправка Baidu JS, автоматическое включение 360° и автоматическое включение Toutiao.',
  'plugin.push.other-js.tips2':
    'Эти коды необходимо вызывать вручную в шаблоне. Добавьте код `{{- плагинJsCode|safe }}` в конце общедоступного шаблона для вызова.',
  'plugin.push.other-js.tips3':
    'Всплывающие окна, такие как сообщения/комментарии, автоматически загружают эти JS-коды.',
  'plugin.push.other-js.name': 'кодовое имя',
  'plugin.push.other-js.name.placeholder': 'Например: статистика Baidu',
  'plugin.push.other-js.code': 'JS-код',
  'plugin.push.other-js.code.placeholder': 'Нужно включить окончание',
  'plugin.redirect.import': 'Импортировать ссылку',
  'plugin.redirect.import.tips':
    'Примечание. Для загрузки и импорта поддерживаются только файлы в формате CSV.',
  'plugin.redirect.import.step1': 'Первый шаг — загрузить файл шаблона CSV.',
  'plugin.redirect.import.step1.download': 'Скачать файл шаблона csv',
  'plugin.redirect.import.step2': 'Второй шаг — загрузить CSV-файл.',
  'plugin.redirect.import.step2.upload': 'Загрузить CSV-файл',
  'plugin.redirect.edit': 'Изменить ссылку',
  'plugin.redirect.add': 'Добавить ссылку',
  'plugin.redirect.from-url': 'Ссылка на источник',
  'plugin.redirect.to-url': 'Ссылка для перехода',
  'plugin.redirect.from-url.description':
    'Это может быть абсолютный адрес, начинающийся с «http(https)», или относительный адрес, начинающийся с «/».',
  'plugin.redirect.delete.confirm':
    'Вы уверены, что хотите удалить выбранную ссылку?',
  'plugin.replace.add.required':
    'Пожалуйста, заполните ключевые слова источника замены',
  'plugin.replace.place.required':
    'Пожалуйста, выберите альтернативное местоположение',
  'plugin.replace.keyword.required': 'Добавьте пожалуйста правила замены',
  'plugin.replace.confirm':
    'Вы уверены, что хотите выполнить полную замену сайта?',
  'plugin.replace.tips':
    'Замена всего сайта — это сложная операция, поэтому при замене могут возникнуть ошибки. Перед заменой рекомендуется выполнить резервное копирование содержимого.',
  'plugin.replace.replace-tag': 'Заменять ли содержимое ярлыка',
  'plugin.replace.place': 'заменить позицию',
  'plugin.replace.keyword': 'Правила замены',
  'plugin.replace.add': 'Добавить правила замены',
  'plugin.replace.place.setting': 'Настройки фона',
  'plugin.replace.place.archive': 'документ',
  'plugin.replace.place.category': 'Страница категории',
  'plugin.replace.place.tag': 'Ярлык',
  'plugin.replace.place.anchor': 'Я не знаю',
  'plugin.replace.place.keyword': 'Ключевые слова',
  'plugin.replace.place.comment': 'Комментарий',
  'plugin.replace.place.attachment': 'Ресурсы изображений',
  'plugin.retailer.setting': 'конфигурация распределения',
  'plugin.retailer.allow-self':
    'Дистрибьюторы получают комиссионные от собственных покупок.',
  'plugin.retailer.allow-self.description':
    'Если комиссия за самозакупку включена, дистрибьютор может получить соответствующую комиссию, если он сам приобретет распространяемый товар. Если она отключена, дистрибьютор не сможет получить комиссию, если он сам приобретет распространяемый товар. Если вы автоматически становитесь дистрибьютором, не включайте комиссию за самостоятельную покупку.',
  'plugin.retailer.allow-self.no': 'закрытие',
  'plugin.retailer.allow-self.yes': 'включать',
  'plugin.retailer.become-retailer': 'Как стать дистрибьютором',
  'plugin.retailer.become-retailer.manual': 'Ручная обработка',
  'plugin.retailer.become-retailer.auto': 'автоматически стать',
  'plugin.retailer.become-retailer.description':
    'Если вы выбираете ручную обработку, вам необходимо настроить ее в управлении пользователями.',
  'plugin.retailer.cancel.confirm':
    'Вы уверены, что хотите отменить квалификацию дистрибьютора этого пользователя?',
  'plugin.retailer.cancel.content':
    'Если порог дистрибьютора должен автоматически стать дистрибьютором, отмена будет недействительной.',
  'plugin.retailer.user-id': 'ID пользователя',
  'plugin.retailer.user-name': 'имя пользователя',
  'plugin.retailer.real-name': 'настоящее имя',
  'plugin.retailer.balance': 'Баланс пользователя',
  'plugin.retailer.total-reward': 'Совокупный доход',
  'plugin.retailer.create-time': 'Присоединяйтесь',
  'plugin.retailer.change-name': 'Изменить настоящее имя',
  'plugin.retailer.cancel': 'Отмена',
  'plugin.retailer.add': 'Добавить дистрибьютора',
  'plugin.retailer.add.name':
    'Заполните идентификатор пользователя и настройте дистрибьютора',
  'plugin.retailer.change-name.new': 'новое настоящее имя',
  'plugin.rewrite.formula.archive-detail': 'Детали документа:',
  'plugin.rewrite.formula.archive-list': 'Список документов:',
  'plugin.rewrite.formula.module-index': 'Домашняя страница модели:',
  'plugin.rewrite.formula.page-detail': 'Детали одной страницы:',
  'plugin.rewrite.formula.tag-list': 'Список тегов:',
  'plugin.rewrite.formula.tag-detail': 'Детали тега:',
  'plugin.rewrite.formula1':
    'Вариант 1: Цифровой режим (простой, рекомендуется)',
  'plugin.rewrite.formula2':
    'Вариант 2. Образец именования 1 (английский или пиньинь).',
  'plugin.rewrite.formula3':
    'Вариант 3. Схема именования 2 (английский или пиньинь + цифры).',
  'plugin.rewrite.formula4':
    'Вариант 4: Схема именования 3 (английский или пиньинь)',
  'plugin.rewrite.formula5':
    'Вариант 5: Пользовательский режим (расширенный режим, используйте его с осторожностью, если он настроен неправильно, главная страница не откроется)',
  'plugin.rewrite.setting': 'Настройки псевдостатической схемы',
  'plugin.rewrite.setting.select': 'Выберите псевдостатическое решение',
  'plugin.rewrite.setting.diy': 'Пользовательские псевдостатические правила',
  'plugin.rewrite.setting.diy.explain':
    'Описание пользовательского псевдостатического правила',
  'plugin.rewrite.setting.diy.tips':
    'Скопируйте следующие правила в поле ввода для изменения. Всего имеется 6 строк, а именно сведения о документе, список документов, домашняя страница модели, страница, список тегов и сведения о тегах. === и предыдущую часть нельзя изменить.',
  'plugin.rewrite.variable.tips':
    'Переменные заключаются в фигурные скобки `{}`, например `{id}`. Доступные переменные: идентификатор данных `{id}`; имя пользовательской ссылки классификации документа `{filename}`; имя пользовательской ссылки многоуровневой классификации `{multicatname}`, `{ Только один из можно использовать multicatname}` и `{catname}`; идентификатор классификации `{catid}`; имя таблицы модели `{module}`; год `{year}`, месяц `{month}`, день `{day} `; , час `{hour}`, минута `{минута}`, секунда `{секунда}`, год, месяц, день, час, минута и секунда доступны только в архиве с номером страницы пейджинга `{page}`, пейджинг; необходимо помещать в круглые скобки, например: `(/{page})` .',
  'plugin.rewrite.formula.direct1': 'Готовое решение 1',
  'plugin.rewrite.formula.direct2': 'Готовое решение 2',
  'plugin.rewrite.formula.direct3': 'Готовое решение 3',
  'plugin.rewrite.formula.direct4': 'Готовое решение 4',
  'plugin.robots.tips.before':
    'Роботы — это конфигурация веб-сайта, которая сообщает роботам поисковых систем, какие страницы можно сканировать, а какие нет. Вопрос:',
  'plugin.robots.tips.after': 'Формат файла robots.txt',
  'plugin.robots.content': 'Содержание роботов',
  'plugin.robots.content.tips1':
    '1. Robots.txt может сообщить Baidu, какие страницы вашего веб-сайта можно сканировать, а какие нельзя.',
  'plugin.robots.content.tips2':
    '2. Вы можете использовать инструмент Robots для создания, проверки и обновления файла robots.txt.',
  'plugin.robots.view': 'Посмотреть роботов',
  'plugin.sendmail.setting': 'Настройки электронной почты',
  'plugin.sendmail.server': 'SMTP-сервер',
  'plugin.sendmail.server.description':
    'Например, почтовый ящик QQ — smtp.qq.com.',
  'plugin.sendmail.use-ssl': 'Используйте SSL/TLS',
  'plugin.sendmail.use-ssl.no': 'Не использовать',
  'plugin.sendmail.port': 'SMTP-порт',
  'plugin.sendmail.port.description':
    'Порт сервера по умолчанию — 25, порт по умолчанию при использовании протокола SSL — 465, а порт по умолчанию при использовании протокола TLS — 587. Подробные параметры уточняйте у своего поставщика услуг электронной почты.',
  'plugin.sendmail.account': 'SMTP-аккаунт',
  'plugin.sendmail.account.description':
    'По умолчанию используется учетная запись электронной почты, например адрес электронной почты QQ, например 123456@qq.com.',
  'plugin.sendmail.password': 'SMTP-пароль',
  'plugin.sendmail.password.description':
    'Код авторизации генерируется в настройках электронной почты.',
  'plugin.sendmail.recipient': 'Электронная почта получателя',
  'plugin.sendmail.recipient.required':
    'Пожалуйста, сначала настройте электронную почту',
  'plugin.sendmail.recipient.description':
    'По умолчанию оно отправляется отправителю. Если вам нужно отправить его другим людям, заполните его здесь. Разделите нескольких получателей запятыми.',
  'plugin.sendmail.auto-reply': 'Автоматически отвечать клиентам',
  'plugin.sendmail.auto-reply.no': 'Нет ответа',
  'plugin.sendmail.auto-reply.yes': 'автоматический ответ',
  'plugin.sendmail.auto-reply.description':
    'Если автоматический ответ клиентам включен, когда клиент оставляет сообщение, электронное письмо с автоматическим ответом будет автоматически отправлено на адрес электронной почты, указанный клиентом.',
  'plugin.sendmail.auto-reply.title': 'Заголовок автоответа',
  'plugin.sendmail.auto-reply.title.description':
    'Пожалуйста, заполните заголовок автоответчика',
  'plugin.sendmail.auto-reply.message': 'Содержание автоматического ответа',
  'plugin.sendmail.auto-reply.message.description':
    'Пожалуйста, заполните содержание автоматического ответа',
  'plugin.sendmail.send-type': 'Отправить сцену',
  'plugin.sendmail.send-type.guestbook': 'На сайте новые сообщения',
  'plugin.sendmail.send-type.report': 'Ежедневный сайт Ежедневно',
  'plugin.sendmail.send-type.new-order': 'На сайте новые заказы',
  'plugin.sendmail.send-type.pay-order': 'На сайте есть платежное поручение',
  'plugin.sendmail.send-type.description':
    'После выбора электронные письма будут отправляться по выбранному сценарию.',
  'plugin.sendmail.test.sending': 'Отправка тестового письма',
  'plugin.sendmail.send-time': 'Отправить время',
  'plugin.sendmail.subject': 'заголовок письма',
  'plugin.sendmail.status': 'отправить статус',
  'plugin.sendmail.tips':
    'Напоминания по электронной почте могут отправлять сообщения с веб-сайта на ваш почтовый ящик по электронной почте.',
  'plugin.sendmail.test.send': 'Отправить тестовое письмо',
  'plugin.sitemap.tips1':
    'В настоящее время все основные поисковые системы поддерживают файлы карты сайта в формате txt при отправке файлов карты сайта, а размер файлов карты сайта txt меньше, чем у файлов карты сайта xml. Поэтому рекомендуется использовать карты сайта формата txt.',
  'plugin.sitemap.tips2':
    'Поскольку отправка карты сайта каждой поисковой системы ограничена 50 000 элементами или размером 10 МБ, эта функция карты сайта сгенерирует файл карты сайта с 50 000 элементов.',
  'plugin.sitemap.type': 'Формат карты сайта',
  'plugin.sitemap.auto-build': 'Метод создания карты сайта',
  'plugin.sitemap.auto-build.manual': 'Руководство',
  'plugin.sitemap.auto-build.auto': 'автоматический',
  'plugin.sitemap.exclude-tag': 'Генерация тегов документа',
  'plugin.sitemap.exclude-tag.no': 'генерировать',
  'plugin.sitemap.exclude-tag.yes': 'Не создано',
  'plugin.sitemap.exculde-module': 'Исключенные модели документов',
  'plugin.sitemap.exculde-module.description':
    'Если вы хотите исключить определенные модели документов, вы можете выбрать это здесь.',
  'plugin.sitemap.exculde-category': 'Исключенные категории',
  'plugin.sitemap.exculde-category.description':
    'Если вы хотите исключить определенные категории, вы можете выбрать здесь',
  'plugin.sitemap.exculde-page': 'Исключенная отдельная страница',
  'plugin.sitemap.exculde-page.description':
    'Если вы хотите исключить определенные отдельные страницы, вы можете выбрать здесь',
  'plugin.sitemap.action': 'ручная операция',
  'plugin.sitemap.action.tips':
    'Совет: После изменения конфигурации Sitemap создайте его вручную, чтобы конфигурация вступила в силу.',
  'plugin.sitemap.last-time': 'Время последнего создания',
  'plugin.sitemap.build': 'Создать карту сайта вручную',
  'plugin.sitemap.view': 'Посмотреть карту сайта',
  'plugin.storage.tips':
    'Переключение методов хранения ресурсов не приводит к автоматической синхронизации ранее загруженных ресурсов. Обычно не рекомендуется переключать методы хранения во время использования.',
  'plugin.storage.base': 'базовая конфигурация',
  'plugin.storage.type': 'Способ хранения',
  'plugin.storage.type.local': 'локальное хранилище',
  'plugin.storage.url': 'Адрес ресурса',
  'plugin.storage.keep-local': 'местный архив',
  'plugin.storage.keep-local.no': 'Не сохранено',
  'plugin.storage.keep-local.yes': 'бронировать',
  'plugin.storage.keep-local.description':
    'При использовании облачного хранилища вы можете сохранить локальные архивы.',
  'plugin.timefactor.module.required':
    'Пожалуйста, выберите хотя бы одну модель документа',
  'plugin.timefactor.types.required':
    'Пожалуйста, выберите хотя бы один тип обновления',
  'plugin.timefactor.start-day.required':
    'Время запуска обновления не может быть равно 0.',
  'plugin.timefactor.end-day.error':
    'Время результата обновления не может быть раньше времени запуска обновления.',
  'plugin.timefactor.tips':
    'Функция публикации по расписанию с учетом временного фактора документа обеспечивает возможность регулярного обновления времени документа. Вы можете настроить автоматическое обновление определенных документов до последней версии по расписанию, а документы в черновиках можно публиковать регулярно в соответствии с установленным временем. Программа будет пытаться проверять наличие обновлений каждый час.',
  'plugin.timefactor.setting':
    'Настройки запланированного выпуска документа с учетом временного фактора',
  'plugin.timefactor.open': 'Включить ли обновление времени старого документа',
  'plugin.timefactor.open.no': 'нет',
  'plugin.timefactor.open.yes': 'давать возможность',
  'plugin.timefactor.types': 'Тип обновления',
  'plugin.timefactor.types.created-time': 'время выпуска',
  'plugin.timefactor.types.updated-time': 'Время обновления',
  'plugin.timefactor.types.description': 'Выберите хотя бы один',
  'plugin.timefactor.start-day': 'Превосходить',
  'plugin.timefactor.start-day.suffix': 'Документы многодневной давности,',
  'plugin.timefactor.start-day.description':
    'Например: 30, введите целое число',
  'plugin.timefactor.start-day.placeholder': 'Например: 30',
  'plugin.timefactor.end-day': 'Автоматически обновляться до',
  'plugin.timefactor.end-day.placeholder': 'Такие как: 1',
  'plugin.timefactor.end-day.suffix': 'время в днях',
  'plugin.timefactor.end-day.description':
    'Если вы заполните 0, это означает, что он будет обновлен до текущего дня.',
  'plugin.timefactor.daily-update': 'Максимальное количество обновлений в день',
  'plugin.timefactor.daily-update.placeholder': 'Например: 100',
  'plugin.timefactor.daily-update.suffix': 'статья',
  'plugin.timefactor.daily-update.description':
    'Рекомендуется указать значение больше 0, в противном случае все подходящие статьи будут обновлены',
  'plugin.timefactor.republish': 'Стоит ли повторно нажимать',
  'plugin.timefactor.republish.no': 'нет',
  'plugin.timefactor.republish.yes': 'да',
  'plugin.timefactor.republish.description':
    'При обновлении документа повторно отправьте его в поисковые системы.',
  'plugin.timefactor.release-draft':
    'Включить ли автоматическую публикацию документов черновиков',
  'plugin.timefactor.release-draft.no': 'нет',
  'plugin.timefactor.release-draft.yes': 'давать возможность',
  'plugin.timefactor.daily-limit': 'Количество автоматических выпусков в день',
  'plugin.timefactor.daily-limit.suffix': 'Глава',
  'plugin.timefactor.daily-limit.description':
    'После настройки публиковать указанное количество статей из черновика каждый день, значение по умолчанию — 100.',
  'plugin.timefactor.daily-limit.placeholder': 'Например: 30',
  'plugin.timefactor.start-time': 'Время начала ежедневной публикации',
  'plugin.timefactor.start-time.placeholder': 'Такие как: 8',
  'plugin.timefactor.start-time.suffix': 'точка',
  'plugin.timefactor.start-time.description':
    'Например: 8, тогда каждый день начинается в 8 часов.',
  'plugin.timefactor.end-time': 'Время окончания',
  'plugin.timefactor.end-time.placeholder': 'Такие как: 18',
  'plugin.timefactor.end-time.description':
    'Если вы вставите 0, это значит, что оно закончится в 23:00.',
  'plugin.timefactor.module': 'Открытая модель',
  'plugin.timefactor.category': 'Категории, которые не участвуют в обновлениях',
  'plugin.timefactor.category.placeholder':
    'Если вы хотите исключить определенные категории, вы можете выбрать здесь',
  'plugin.titleimage.open': 'Автоматическая настройка изображения заголовка',
  'plugin.titleimage.open.no': 'закрытие',
  'plugin.titleimage.open.yes': 'включать',
  'plugin.titleimage.open.description':
    'Если этот параметр включен, то если в документе нет изображения, изображение, содержащее заголовок документа, будет автоматически создано в качестве миниатюры документа.',
  'plugin.titleimage.draw-sub':
    'Создавать ли вторичное изображение заголовка для документа',
  'plugin.titleimage.draw-sub.description':
    'После его включения, если в документе нет изображения, изображение будет автоматически сгенерировано для тега h2 документа и вставлено в документ.',
  'plugin.titleimage.size': 'Создать размер изображения',
  'plugin.titleimage.width': 'Ширина пикселя',
  'plugin.titleimage.width.placeholder':
    'Создавать ли текст с 800 дополнительными заголовками и изображениями по умолчанию.',
  'plugin.titleimage.height': 'Высота пикселя',
  'plugin.titleimage.height.placeholder': 'По умолчанию 600',
  'plugin.titleimage.color': 'Цвет шрифта',
  'plugin.titleimage.color.default': 'По умолчанию белый',
  'plugin.titleimage.select': 'выбирать',
  'plugin.titleimage.font-size': 'Размер текста по умолчанию',
  'plugin.titleimage.font-size.placeholder': 'По умолчанию 32',
  'plugin.titleimage.noise': 'Добавить пятна интерференции',
  'plugin.titleimage.noise.no': 'нет добавленного',
  'plugin.titleimage.noise.yes': 'добавить в',
  'plugin.titleimage.noise.description':
    'Работает только в том случае, если используется фон по умолчанию.',
  'plugin.titleimage.bg-image': 'пользовательский фон',
  'plugin.titleimage.bg-image.description':
    'Вы можете настроить фон. Если вы не загрузите собственный фон, система автоматически создаст сплошной цветной фон.',
  'plugin.titleimage.bg-image.upload': 'загрузить изображение',
  'plugin.titleimage.font': 'Пользовательский шрифт',
  'plugin.titleimage.font.upload': 'Загрузите шрифт .ttf',
  'plugin.titleimage.preview.text': 'Предварительный просмотр текста',
  'plugin.titleimage.preview.text.edit':
    'Изменить текст предварительного просмотра',
  'plugin.transfer.provider.required': 'Пожалуйста, выберите систему веб-сайта',
  'plugin.transfer.token.required':
    'Пожалуйста, заполните токен связи, который может быть любым символом.',
  'plugin.transfer.base-url.required': 'Пожалуйста, заполните адрес сайта',
  'plugin.transfer.signal.error': 'Ошибка связи',
  'plugin.transfer.signal.success': 'Коммуникация прошла успешно',
  'plugin.transfer.transfering': 'Выполнение',
  'plugin.transfer.tips':
    'В настоящее время поддерживается перенос содержимого веб-сайтов DedeCMS/WordPress/PbootCMS/EmpireCMS на anqicms.',
  'plugin.transfer.step1': 'первый шаг',
  'plugin.transfer.step2': 'Шаг 2',
  'plugin.transfer.step3': 'третий шаг',
  'plugin.transfer.step4': 'четвертый шаг',
  'plugin.transfer.step5': 'пятый шаг',
  'plugin.transfer.step1.description':
    'Выберите систему веб-сайта, которую необходимо перенести.',
  'plugin.transfer.step2.description': 'Скачать файл интерфейса связи',
  'plugin.transfer.step3.description':
    'Заполните информацию для связи на сайте',
  'plugin.transfer.step4.description': 'Выберите, что перенести',
  'plugin.transfer.step5.description': 'Начать перенос содержимого веб-сайта',
  'plugin.transfer.step.prev': 'Предыдущий',
  'plugin.transfer.step.next': 'Следующий шаг',
  'plugin.transfer.step.download': 'скачать',
  'plugin.transfer.step2.tips':
    'Пожалуйста, загрузите загруженный файл в корневой каталог вашего сайта. После загрузки и размещения его в корневом каталоге вашего веб-сайта нажмите «Далее», чтобы продолжить.',
  'plugin.transfer.step3.tips':
    'Для каждого веб-сайта можно настроить только один токен. Если появится сообщение об ошибке, вручную удалите файл anqicms.config.php в корневом каталоге веб-сайта, чтобы настроить его заново.',
  'plugin.transfer.base-url': 'адрес веб-сайта',
  'plugin.transfer.base-url.placeholder':
    'URL-адрес, начинающийся с http или https',
  'plugin.transfer.token': 'Токен связи',
  'plugin.transfer.token.placeholder': 'Может быть любой персонаж',
  'plugin.transfer.step4.tips':
    'По умолчанию переносится все. Вы можете перенести только определенные части.',
  'plugin.transfer.types': 'Выберите, что перенести',
  'plugin.transfer.module': 'Выберите модель миграции',
  'plugin.transfer.step5.tips':
    'Во время процесса миграции не обновляйте эту страницу.',
  'plugin.transfer.base-url.name': 'Сайты, которые необходимо перенести:',
  'plugin.transfer.status': 'Текущий статус задачи:',
  'plugin.transfer.status.finished': 'завершенный',
  'plugin.transfer.status.doing': 'в ходе выполнения',
  'plugin.transfer.status.wait': 'не началось',
  'plugin.transfer.current-task': 'Текущий ход выполнения задачи: Миграция',
  'plugin.transfer.current-task.count': ',Объем данных:',
  'plugin.transfer.task-error': 'Ошибка задачи:',
  'plugin.transfer.restart': 'перезапуск',
  'plugin.transfer.start': 'Начать миграцию',
  'plugin.user.setting': 'Настройки дополнительных полей пользователя',
  'plugin.user.setting.new': 'Добавить поле',
  'plugin.user.setting.name.description': 'Такие как: QQ, WeChat ID и т. д.',
  'plugin.user.edit': 'Изменить пользователя',
  'plugin.user.add': 'Добавить пользователя',
  'plugin.user.user-name': 'имя пользователя',
  'plugin.user.real-name': 'настоящее имя',
  'plugin.user.phone': 'Номер телефона',
  'plugin.user.email': 'Адрес электронной почты',
  'plugin.user.password': 'пароль',
  'plugin.user.password.description':
    'Если вам необходимо изменить пароль для этого пользователя, введите его здесь, не менее 6 символов.',
  'plugin.user.is-retailer': 'Это дистрибьютор?',
  'plugin.user.is-retailer.no': 'нет',
  'plugin.user.is-retailer.yes': 'да',
  'plugin.user.invite-code': 'Код приглашения',
  'plugin.user.invite-code.description':
    'Пожалуйста, не меняйте его по своему желанию',
  'plugin.user.parent.user-id': 'Улучшенный идентификатор пользователя',
  'plugin.user.group': 'Группа пользователей VIP',
  'plugin.user.group.all': 'Все группы',
  'plugin.user.expire': 'Срок действия группы пользователей истек',
  'plugin.user.expire.description':
    'По истечении срока действия группа пользователей вернется к первой группе.',
  'plugin.user.extra-fields': 'дополнительные поля',
  'plugin.user.extra-fields.default': 'значение по умолчанию:',
  'plugin.user.delete.confirm':
    'Вы уверены, что хотите удалить этот фрагмент данных?',
  'plugin.watermark.generate.confirm':
    'Вы уверены, что хотите добавить водяной знак ко всем изображениям в библиотеке изображений?',
  'plugin.watermark.generate.content':
    'Изображения с водяными знаками не будут добавлены повторно.',
  'plugin.watermark.open': 'Включить ли водяной знак',
  'plugin.watermark.open.no': 'закрытие',
  'plugin.watermark.open.yes': 'включать',
  'plugin.watermark.open.description':
    'Если эта функция включена, водяные знаки будут автоматически добавляться к загруженным изображениям.',
  'plugin.watermark.type': 'Тип водяного знака',
  'plugin.watermark.type.image': 'Изображение водяного знака',
  'plugin.watermark.type.text': 'текстовый водяной знак',
  'plugin.watermark.image': 'изображение водяного знака',
  'plugin.watermark.text': 'текст водяного знака',
  'plugin.watermark.position': 'положение водяного знака',
  'plugin.watermark.position.center': 'центр',
  'plugin.watermark.position.left-top': 'в левом верхнем углу',
  'plugin.watermark.position.right-top': 'верхний правый угол',
  'plugin.watermark.position.left-bottom': 'нижний левый угол',
  'plugin.watermark.position.right-bottom': 'нижний правый угол',
  'plugin.watermark.size': 'Размер водяного знака',
  'plugin.watermark.opacity': 'прозрачность водяного знака',
  'plugin.watermark.batch-add':
    'Пакетное добавление водяных знаков к изображениям в библиотеке изображений.',
  'plugin.watermark.min-size': 'Минимальное изображение водяного знака',
  'plugin.watermark.min-size.suffix': 'Пиксель',
  'plugin.watermark.min-size.description':
    'Изображения, длина и ширина которых меньше этого размера, не будут добавляться с водяным знаком.',
  'plugin.weapp.appid': 'Мини-программа AppID',
  'plugin.weapp.app-secret': 'Мини-программаAppSecret',
  'plugin.weapp.push.setting': 'Конфигурация отправки сообщений',
  'plugin.weapp.server-url': 'адрес сервера',
  'plugin.weapp.token': 'Токен сервисного аккаунта',
  'plugin.weapp.encoding-aes-key': 'Сервисный номерКодировкаAESKey',
  'plugin.weapp.encoding-aes-key.description':
    'Если методом шифрования и дешифрования сообщения является текстовый режим, не заполняйте это поле, иначе будет сообщено об ошибке.',
  'plugin.weapp.default': 'Апплет по умолчанию',
  'plugin.weapp.default.tips':
    'Мини-программа AnQiCMS по умолчанию также поддерживает мини-программу Baidu Smart, мини-программу WeChat, мини-программу QQ, мини-программу Alipay и мини-программу Toutiao.',
  'plugin.weapp.default.help': 'Помощь по использованию мини программы:',
  'plugin.weapp.default.source':
    'Адрес исходного кода мини-программы: https://github.com/fesiong/anqicms-app/releases',
  'plugin.weapp.default.download': 'Загрузите апплет по умолчанию',
  'plugin.wechat.menu.delete.confirm':
    'Вы уверены, что хотите удалить это меню?',
  'plugin.wechat.menu.submit.error': 'Ошибка отправки',
  'plugin.wechat.menu.submit.confirm':
    'Вы уверены, что хотите обновить официальное меню аккаунта?',
  'plugin.wechat.menu.submit.content':
    'Эта операция синхронизирует вновь установленное меню с сервером WeChat.',
  'plugin.wechat.menu.name': 'Название меню',
  'plugin.wechat.menu.type': 'тип',
  'plugin.wechat.menu.type.click': 'Текстовое меню',
  'plugin.wechat.menu.type.view': 'меню ссылок',
  'plugin.wechat.menu.value': 'ценить',
  'plugin.wechat.menu.value.description':
    'Пожалуйста, заполните текст текстового меню и URL-адрес меню ссылок, не более 128 символов.',
  'plugin.wechat.menu': 'Меню WeChat',
  'plugin.wechat.menu.tips':
    'Примечание. Для каждого меню первого уровня существует максимум 3 меню первого уровня и максимум 5 меню второго уровня.',
  'plugin.wechat.menu.submit': 'Обновить меню официального аккаунта',
  'plugin.wechat.menu.add': 'Добавить меню',
  'plugin.wechat.menu.top': 'верхнее меню',
  'plugin.wechat.sort.description': 'Чем меньше значение, тем выше сортировка.',
  'plugin.wechat.reply': 'отвечать',
  'plugin.wechat.reply.delete.confirm':
    'Вы уверены, что хотите удалить этот фрагмент данных?',
  'plugin.wechat.reply.keyword': 'Ключевые слова',
  'plugin.wechat.reply.content': 'Содержимое ответа',
  'plugin.wechat.reply.content.description':
    'Если вы хотите ответить, введите его здесь',
  'plugin.wechat.reply.time': 'Время отклика',
  'plugin.wechat.reply.default': 'Ответ по умолчанию',
  'plugin.wechat.reply.default.yes': 'да',
  'plugin.wechat.reply.default.description':
    'Если после выбора в качестве ответа по умолчанию ключевое слово не соответствует, на этот контент будет дан ответ.',
  'plugin.wechat.reply.default.set-no': 'нет',
  'plugin.wechat.reply.default.set-yes': 'установить по умолчанию',
  'plugin.wechat.reply.rule': 'Правила автоответа',
  'plugin.wechat.reply.rule.add': 'Добавить правила',
  'plugin.wechat.reply.rule.edit': 'Добавить правила',
  'plugin.wechat.reply.keyword.description':
    'Пользователь отправляет ключевое слово триггера',
  'plugin.wechat.setting': 'Настройка учетной записи службы WeChat',
  'plugin.wechat.appid': 'Сервисный аккаунтAppID',
  'plugin.wechat.app-secret': 'Сервисный аккаунтAppSecret',
  'plugin.wechat.verify-setting': 'Конфигурация кода подтверждения',
  'plugin.wechat.verify-key': 'Ключевые слова кода подтверждения',
  'plugin.wechat.verify-key.placeholder': 'По умолчанию: код подтверждения',
  'plugin.wechat.verify-key.description':
    'Пользователи могут получить код подтверждения, ответив на это ключевое слово.',
  'plugin.wechat.verify-msg': 'Шаблон информации о коде подтверждения',
  'plugin.wechat.verify-msg.placeholder':
    'По умолчанию: код подтверждения: {code}, действителен в течение 30 минут.',
  'plugin.wechat.verify-msg.description':
    'Примечание. Шаблон должен содержать `{code}`.',
  'plugin.wechat.auto-reply.setting': 'Настройки автоответа',
  'plugin.wechat.menu.setting': 'Настройки меню',
  'plugin.wechat.official.setting': 'Официальные настройки аккаунта',
  'plugin.type.all': 'Все функции',
  'plugin.type.normal': 'Общие функции',
  'plugin.type.archive': 'Функция документа',
  'plugin.type.user-mall': 'Пользователь/торговый центр',
  'plugin.type.system': 'Системные функции',
  'plugin.limiter.open.name': 'Включить защиту сайта',
  'plugin.limiter.open.false': 'Закрыть',
  'plugin.limiter.open.true': 'Открыть',
  'plugin.limiter.description':
    'После включения следующие настройки вступят в силу',
  'plugin.limiter.max_requests': 'Временно заблокировать IP',
  'plugin.limiter.max_requests.prefix':
    'Достигнуто количество посещений за последние 5 минут',
  'plugin.limiter.max_requests.suffix': 'раз',
  'plugin.limiter.max_requests.description':
    'Если не заполнено, по умолчанию используется 100 раз',
  'plugin.limiter.block_hours': 'Продолжительность временного бана',
  'plugin.limiter.block_hours.prefix': 'Временный бан',
  'plugin.limiter.block_hours.suffix': 'часы',
  'plugin.limiter.block_hours.description':
    'Если не заполнено, значение по умолчанию составляет 1 час',
  'plugin.limiter.white_ips': 'IP-адрес из белого списка',
  'plugin.limiter.white_ips.description':
    'По одному на строку, поддерживает IP и сегменты IP, например: 192.168.2.0/24',
  'plugin.limiter.black_ips': 'IP-адреса из черного списка',
  'plugin.limiter.black_ips.description':
    'По одному на строку, поддерживает IP и сегменты IP, например: 192.168.2.0/24',
  'plugin.limiter.block_agents': 'Ограничить определенный UserAgent',
  'plugin.limiter.block_agents.description':
    'По одному на строку, доступ с использованием этих UserAgents будет запрещен',
  'plugin.limiter.allow_prefixes': 'Исключить определенные префиксы пути',
  'plugin.limiter.allow_prefixes.placeholder': 'например:/api',
  'plugin.limiter.allow_prefixes.description':
    'По одному на строку, использование путей, содержащих эти префиксы, будет разрешено',
  'plugin.limiter.is_allow_spider': 'Разрешить ли пауков',
  'plugin.limiter.is_allow_spider.no': 'Нет',
  'plugin.limiter.is_allow_spider.yes': 'Да',
  'plugin.limiter.is_allow_spider.description':
    'Если выбрано «Да», доступ паука будет разрешен. Чтобы не влиять на включение паука, выберите «Да»',
  'plugin.limiter.blocked_ips': 'Временно заблокированные IP-адреса',
  'plugin.limiter.blocked_ips.remove': 'Разблокировать',
  'plugin.limiter.blocked_ips.remove.yes': 'Удалить',
  'plugin.limiter.blocked_ips.ended': 'Истекло:',
  'content.multilang.remove.confirm':
    'Вы уверены, что хотите удалить этот многоязычный сайт? ',
  'content.multilang.sync.confirm':
    'Вы уверены, что хотите синхронизировать содержимое сайта? ',
  'content.multilang.name': 'имя',
  'content.multilang.is-main': 'основной сайт',
  'content.multilang.domain': 'Доменное имя',
  'content.multilang.language': 'Язык',
  'content.multilang.sync-time': 'Время синхронизации контента',
  'setting.multilang.sync': 'Синхронизированный контент',
  'setting.multilang.login': 'Фон входа в систему',
  'plugin.multilang.open.name': 'Включить ли поддержку многоязычного сайта',
  'plugin.multilang.open.false': 'Нет',
  'plugin.multilang.open.true': 'Да',
  'plugin.multilang.open.description':
    'После включения поддержки многоязычного сайта вы сможете поддерживать многоязычное отображение на своем веб-сайте',
  'plugin.multilang.type': 'Форма отображения нескольких сайтов',
  'plugin.multilang.type.domain': 'Независимое доменное имя',
  'plugin.multilang.type.direction': 'Независимый каталог',
  'plugin.multilang.type.same-url': 'URL-адрес не изменился',
  'plugin.multilang.type.description':
    'Результаты отображения различаются в разных формах. Форма независимого доменного имени представляет собой отдельное доменное имя для каждого языка, форма независимого каталога представляет собой каталог для каждого языка, а форма константы URL-адреса. заключается в том, что все языки указывают на один и тот же URL',
  'plugin.multilang.default_language': 'Основной язык сайта',
  'plugin.multilang.auto_translate': 'Выполнять автоматический перевод',
  'plugin.multilang.auto_translate.false': 'Нет',
  'plugin.multilang.auto_translate.true': 'Да',
  'plugin.multilang.auto_translate.description':
    'Автоматический перевод является платной функцией, цены уточняйте на официальном сайте',
  'plugin.multilang.sites': 'Список сайтов на нескольких языках',
  'content.multilang.add': 'Добавить сайт',
  'content.multilang.edit': 'Редактировать многоязычный сайт',
  'content.multilang.select': 'Выбрать сайт',
  'content.multilang.select.description':
    'Выбрать уже созданный сайт как многоязычный',
  'plugin.multilang.language': 'язык сайта',
  'plugin.multilang.syncing': 'Синхронизация',
  'plugin.multilang.icon': 'значок сайта',
  'plugin.translate.lang': 'Перевести язык',
  'content.translate.origin-content': 'исходный текст',
  'plugin.translate.result': 'Результат перевода',
  'plugin.translate.tips':
    'Интерфейс перевода по умолчанию использует официальный интерфейс. Baidu Translation и Youdao Translation не являются обязательными и их необходимо настроить самостоятельно',
  'plugin.translate.view-log': 'Просмотреть запись перевода',
  'plugin.translate.engine': 'Выбрать интерфейс перевода',
  'plugin.translate.engine.anqicms': 'Официальный интерфейс',
  'plugin.translate.engine.baidu': 'Baidu Translate',
  'plugin.translate.engine.youdao': 'Перевод Youdao',
  'plugin.translate.engine.baidu.app-id': 'APPID',
  'plugin.translate.engine.baidu.app-secret': 'Ключ',
  'plugin.translate.engine.youdao.app-id': 'Идентификатор приложения',
  'plugin.translate.engine.youdao.app-secret': 'Секретный ключ приложения',
  'plugin.translate.engine.deepl': 'Deepl',
  'plugin.translate.engine.deepl.auth-key': 'Auth Key',
  'plugin.translate.logs': 'Записи перевода',
  'plugin.jsonld.tips.1':
    'После включения система автоматически пометит структурированные данные веб-сайта в формате JSON-LD и вставит их в нижнюю часть страницы, чтобы поисковые системы могли лучше понять содержимое веб-сайта. ',
  'plugin.jsonld.tips.2':
    'Информацию о разметке структурированных данных, поддерживаемой Google, см. в документации: https://developers.google.com/search/docs/appearance/structured-data/search-gallery',
  'plugin.jsonld.open.name': 'Открытая разметка структурированных данных',
  'plugin.jsonld.open.false': 'Нет',
  'plugin.jsonld.open.true': 'Да',
  'plugin.jsonld.author': 'Автор по умолчанию',
  'plugin.jsonld.brand': 'Бренд по умолчанию',
};
