export default {
  'plugin.aigenerate.demand.required':
    'O requisito unificado não pode exceder 500 caracteres.',
  'plugin.aigenerate.checking': 'Verificando',
  'plugin.aigenerate.setting': 'Configurações de escrita automática de IA',
  'plugin.aigenerate.isopen': 'Se deve escrever automaticamente',
  'plugin.aigenerate.isopen.no': 'não',
  'plugin.aigenerate.isopen.yes':
    'Escreva automaticamente de acordo com o plano',
  'plugin.aigenerate.language': 'Idioma de redação de artigos',
  'plugin.aigenerate.double-title': 'Gere títulos duplos',
  'plugin.aigenerate.double-title.description': 'Apenas suporte chinês',
  'plugin.aigenerate.double-split': 'Método de título duplo',
  'plugin.aigenerate.double-split.bracket': 'Título principal (subtítulo)',
  'plugin.aigenerate.double-split.line': 'Título-subtítulo principal',
  'plugin.aigenerate.double-split.question': 'Título principal? legenda',
  'plugin.aigenerate.double-split.comma': 'título principal, subtítulo',
  'plugin.aigenerate.double-split.colon': 'Título principal: Subtítulo',
  'plugin.aigenerate.double-split.random': 'aleatório',
  'plugin.aigenerate.demand': 'Requisitos uniformes para escrita',
  'plugin.aigenerate.demand.description':
    'É possível definir requisitos unificados para todos os artigos escritos sobre IA, com no máximo 200 caracteres. Deixe em branco por padrão',
  'plugin.aigenerate.source': 'Fonte de escrita de IA',
  'plugin.aigenerate.source.anqicms': 'AnQiCMS official',
  'plugin.aigenerate.source.openai': 'OpenAI',
  'plugin.aigenerate.source.deepseek': 'DeepSeek',
  'plugin.aigenerate.source.spark': 'Spark large model',
  'plugin.aigenerate.source.description':
    'Statement: When selecting the OpenAI interface, please make sure that your server can access the OpenAI interface service',
  'plugin.aigenerate.source.check-openai': 'Check the OpenAI interface',
  'plugin.aigenerate.openai.base-url': 'Custom API address',
  'plugin.aigenerate.openai.base-url.openai':
    'The default OpenAI API address is: "https://api.openai.com/v1", you can also fill in a third-party compatible address',
  'plugin.aigenerate.openai.base-url.deepseek':
    'The default DeepSeek API address is: "https://api.deepseek.com", you can also fill in a third-party compatible address',
  'plugin.aigenerate.openai.model': 'Custom model',
  'plugin.aigenerate.openai.model.openai':
    'OpenAI default model is: "gpt-3.5-turbo", you can also fill in other correct model names',
  'plugin.aigenerate.openai.model.deepseek':
    'The default DeepSeek model is: "deepseek-chat", you can also fill in other correct model names',
  'plugin.aigenerate.openai.description':
    'API Key usually starts with sk-, you can add multiple keys, and the program will randomly select a key to use each time. ',
  'plugin.aigenerate.openai.valid': 'eficiente',
  'plugin.aigenerate.openai.invalid': 'expirado',
  'plugin.aigenerate.enter-to-add': 'Pressione Enter para adicionar',
  'plugin.aigenerate.spark.description':
    'Endereço de aplicativo de API de modelo grande do Spark',
  'plugin.aigenerate.spark.version': 'Versão do modelo grande do Spark',
  'plugin.aigenerate.default-category':
    'Categoria de artigo de publicação padrão',
  'plugin.aigenerate.default-category.description':
    'Se as palavras-chave não forem classificadas em categorias, os artigos coletados serão classificados aleatoriamente em uma das categorias por padrão. Você deve definir uma categoria, caso contrário, os artigos coletados não poderão ser coletados normalmente.',
  'plugin.aigenerate.save-type': 'Método de processamento de artigos',
  'plugin.aigenerate.save-type.draft': 'Salvar na caixa de rascunho',
  'plugin.aigenerate.save-type.release': 'Liberação normal',
  'plugin.aigenerate.start-time': 'horário de início todos os dias',
  'plugin.aigenerate.start-time.placeholder': 'Começa às 8 horas por padrão',
  'plugin.aigenerate.start-time.description':
    'Preencha um número de 0 a 23, 0 significa que não há limite',
  'plugin.aigenerate.end-time': 'fim do dia',
  'plugin.aigenerate.end-time.placeholder': 'Termina às 22h por padrão',
  'plugin.aigenerate.end-time.description':
    'Preencha um número de 0 a 23, 0 significa que não há limite',
  'plugin.aigenerate.daily-limit': 'Lançamentos diários',
  'plugin.aigenerate.daily-limit.description':
    'O número máximo de artigos publicados por dia, 0 significa sem limite',
  'plugin.aigenerate.insert-image': 'Processamento de imagem de artigo',
  'plugin.aigenerate.insert-image.default': 'padrão',
  'plugin.aigenerate.insert-image.diy': 'Inserir imagens personalizadas',
  'plugin.aigenerate.insert-image.category': 'De categoria de imagens',
  'plugin.aigenerate.insert-image.list': 'Lista de fotos para inserir',
  'plugin.aigenerate.replace': 'substituição de conteúdo',
  'plugin.aigenerate.replace.tips1':
    'Edite os pares de palavras-chave que precisam ser substituídos e a substituição será realizada automaticamente quando o documento for publicado.',
  'plugin.aigenerate.replace.tips2':
    'As regras de substituição suportam expressões regulares Se você estiver familiarizado com expressões regulares e não conseguir atender aos requisitos de substituição por meio de texto comum, poderá tentar usar regras de expressões regulares para concluir a substituição.',
  'plugin.aigenerate.replace.tips3':
    'As regras de expressão regular são: comece com { e termine com } e escreva o código da regra no meio, como {[0-9]+} para corresponder a números consecutivos.',
  'plugin.aigenerate.replace.rules':
    'Algumas regras integradas podem ser usadas rapidamente. As internas são:',
  'plugin.aigenerate.replace.rule.email': '{endereço de email}',
  'plugin.aigenerate.replace.rule.date': '{data}',
  'plugin.aigenerate.replace.rule.time': '{tempo}',
  'plugin.aigenerate.replace.rule.cellphone': '{número de telefone}',
  'plugin.aigenerate.replace.rule.qq': '{número QQ}',
  'plugin.aigenerate.replace.rule.wechat': '{Nós conversamos com o número}',
  'plugin.aigenerate.replace.rule.website': '{URL}',
  'plugin.aigenerate.replace.notice':
    'Nota: A escrita inadequada de regras de expressão regular pode facilmente levar a efeitos de substituição incorretos. Por exemplo, as regras de ID do WeChat afetarão a integridade dos endereços de e-mail e URLs. Por favor, use com cuidado.',
  'plugin.aigenerate.replace.to': 'Substituir com',
  'plugin.aigenerate.empty': 'nulo',
  'plugin.aigenerate.start': 'Comece a escrever IA manualmente',
  'plugin.aigenerate.start.confirm':
    'Tem certeza de que deseja começar a escrever sobre IA?',
  'plugin.aigenerate.start.description':
    'Isso iniciará imediatamente a execução de uma operação de tarefa de gravação de IA',
  'plugin.aigenerate.image.category': 'Classificação de imagens',
  'plugin.aigenerate.image.category.description':
    'As imagens serão selecionadas automaticamente na categoria de recurso de imagem especificada. Se você optar por tentar a correspondência de palavras-chave com o nome da imagem, ele tentará combinar as palavras-chave do artigo com o nome da imagem e, se a correspondência for bem-sucedida, a imagem será usada.',
  'plugin.aigenerate.image.category.default': 'Imagens sem categoria',
  'plugin.aigenerate.image.category.all': 'Todas as fotos',
  'plugin.aigenerate.image.category.match':
    'Experimente o nome da imagem com correspondência de palavra-chave',
  'plugin.aigenerate.type': 'tipo',
  'plugin.aigenerate.type.undefine': 'indefinido',
  'plugin.aigenerate.type.generate': 'IA gerada',
  'plugin.aigenerate.type.translate': 'traduzir',
  'plugin.aigenerate.type.pseudo': 'Reescrita de IA',
  'plugin.aigenerate.type.media': 'Reescrito pela própria mídia',
  'plugin.aigenerate.status': 'estado',
  'plugin.aigenerate.waiting': 'Não processado',
  'plugin.aigenerate.doing': 'em andamento',
  'plugin.aigenerate.finish': 'concluído',
  'plugin.aigenerate.error': 'Erro',
  'plugin.aigenerate.time': 'tempo',
  'plugin.aigenerate.tips1':
    'A escrita automática de IA chamará a interface de escrita de IA para escrever, o que requer pagamento.',
  'plugin.aigenerate.tips2':
    'A escrita automática de IA chamará automaticamente palavras-chave na biblioteca de palavras-chave para concluir a escrita e escreverá um artigo para cada palavra-chave. Certifique-se de que o número de artigos no banco de dados de palavras-chave seja suficiente.',
  'plugin.aigenerate.tips3':
    'As funções de escrita automática e coleta de artigos por IA compartilham uma biblioteca de palavras-chave. Se as palavras-chave foram coletadas para artigos, elas não serão mais usadas para escrita por IA.',
  'plugin.aigenerate.tips4':
    'Os artigos gerados entrarão automaticamente no gerenciamento de conteúdo.',
  'plugin.anchor.edit': 'Editar texto âncora',
  'plugin.anchor.new': 'Adicionar texto âncora',
  'plugin.anchor.title': 'Nome do texto âncora',
  'plugin.anchor.title.placeholder':
    'Pesquise texto âncora ou links de texto âncora',
  'plugin.anchor.link': 'link de texto âncora',
  'plugin.anchor.link.description':
    'Suporta links relativos e links absolutos, como: /a/123.html ou https://www.anqicms.com/',
  'plugin.anchor.weight': 'Peso do texto âncora',
  'plugin.anchor.weight.description':
    'Insira um número, de 0 a 9. Quanto maior o número, maior será o peso. Os pesos mais altos terão prioridade na substituição.',
  'plugin.anchor.import': 'Importar texto âncora',
  'plugin.anchor.import.description':
    'Nota: Somente arquivos no formato csv são suportados para upload e importação.',
  'plugin.anchor.step1': 'Primeiro passo',
  'plugin.anchor.step2': 'Passo 2',
  'plugin.anchor.step1.download': 'Baixe o arquivo de modelo csv',
  'plugin.anchor.step2.upload': 'Carregar arquivo csv',
  'plugin.anchor.setting': 'Configurações de texto âncora',
  'plugin.anchor.density': 'Densidade do texto âncora',
  'plugin.anchor.density.description':
    'Por exemplo: a cada 100 palavras para substituir um texto âncora, preencha 100, o padrão é 100',
  'plugin.anchor.replace-way': 'Método de substituição',
  'plugin.anchor.replace-way.auto': 'substituição automática',
  'plugin.anchor.replace-way.manual': 'Substituição manual',
  'plugin.anchor.replace-way.description':
    'Como o conteúdo substitui o texto âncora',
  'plugin.anchor.extract': 'Método de extração',
  'plugin.anchor.extract.auto': 'Extração automática',
  'plugin.anchor.extract.manual': 'Extração manual',
  'plugin.anchor.extract.description':
    'Escolha como extrair palavras-chave do texto âncora das tags de palavras-chave do conteúdo',
  'plugin.anchor.delete.confirm':
    'Tem certeza de que deseja excluir o texto âncora selecionado?',
  'plugin.anchor.batch-update': 'Atualizar texto âncora em lotes',
  'plugin.anchor.export': 'Exportar texto âncora',
  'plugin.anchor.export.confirm':
    'Você tem certeza que deseja exportar todos os textos âncora?',
  'plugin.anchor.replace': 'substituir',
  'plugin.anchor.replace.confirm':
    'Você tem certeza de que deseja executar uma operação de texto âncora de atualização em lote?',
  'plugin.anchor.replace-count': 'Tempos de substituição',
  'plugin.backup.confirm':
    'Tem certeza de que deseja realizar um backup do banco de dados?',
  'plugin.backup.backuping':
    'A operação de backup de dados está sendo executada, aguarde. .',
  'plugin.backup.restore': 'recuperar',
  'plugin.backup.restore.confirm':
    'Tem certeza de que deseja restaurar usando o backup atual?',
  'plugin.backup.restore.content':
    'Após a restauração, os dados existentes serão substituídos pelos dados de backup atuais. Por favor, proceda com cautela.',
  'plugin.backup.restoring':
    'A operação de recuperação de dados está sendo executada, aguarde. .',
  'plugin.backup.delete.confirm':
    'Tem certeza de que deseja excluir este dado?',
  'plugin.backup.download': 'download',
  'plugin.backup.download.confirm':
    'Tem certeza de que deseja baixá-lo localmente?',
  'plugin.backup.cleanup.confirm':
    'Tem certeza de que deseja limpar os dados do site?',
  'plugin.backup.cleaning': 'Operação de limpeza em andamento. Aguarde. .',
  'plugin.backup.cleanup.tips1':
    'Esta operação excluirá todos os artigos. Por razões de segurança, certifique-se de realizar primeiro um backup em caso de circunstâncias imprevistas.',
  'plugin.backup.cleanup.tips2':
    'A pasta Uploads não é limpa por padrão. Se precisar limpá-la, verifique.',
  'plugin.backup.cleanup.upload.false': 'Não limpar fotos',
  'plugin.backup.cleanup.upload.true': 'Limpe as imagens enviadas',
  'plugin.backup.time': 'Tempo de backup',
  'plugin.backup.name': 'Nome do backup',
  'plugin.backup.size': 'Tamanho do backup',
  'plugin.backup.new': 'Adicionar cópia de segurança',
  'plugin.backup.import': 'Importar backup local',
  'plugin.backup.cleanup': 'Limpar dados do site',
  'plugin.backup.tips':
    'Nota: Se o arquivo de backup for muito grande e você precisar baixá-lo, use ferramentas FTP para baixar o arquivo de backup. O arquivo de backup está no diretório /data/backup/ do diretório raiz do site.',
  'plugin.collector.setting': 'Configurações de aquisição e substituição de IA',
  'plugin.collector.auto-collect': 'Se deve coletar automaticamente',
  'plugin.collector.auto-collect.yes':
    'Cobrança automática de acordo com o plano',
  'plugin.collector.auto-collect.no': 'não',
  'plugin.collector.language': 'Colete idiomas de artigos',
  'plugin.collector.mode': 'Modo de aquisição',
  'plugin.collector.mode.article': 'Coleção de artigos',
  'plugin.collector.mode.ask': 'Combinação de perguntas e respostas',
  'plugin.collector.mode.description':
    'O modo de coleta de artigos coletará o artigo inteiro de acordo com o texto original. O modo de combinação de perguntas e respostas irá coletar e combiná-lo em artigos da lista de perguntas e respostas de pesquisa.',
  'plugin.collector.source': 'fontes personalizadas',
  'plugin.collector.source.description':
    'A coleção de artigos está disponível. Observe que o formato de origem personalizado deve ser uma lista de pesquisa e as palavras-chave de pesquisa são representadas por %s. Por exemplo, o link de pesquisa é: https://cn.bing.com/search?q=. Anqi CMS, então " "Anqi CMS" é substituído por "%s" e depois: https://cn.bing.com/search?q=%s',
  'plugin.collector.category.description':
    'Se nenhuma categoria for definida para a palavra-chave, os artigos coletados serão classificados nesta categoria por padrão.',
  'plugin.collector.category.notice':
    'Uma categoria deve ser definida, caso contrário a coleta normal não será possível',
  'plugin.collector.min-title': 'Contagem mínima de palavras para título',
  'plugin.collector.min-title.placeholder': 'Padrão 10 caracteres',
  'plugin.collector.min-title.description':
    'Ao coletar artigos, se o número de palavras do título for menor que o número de palavras especificado, ele não será coletado.',
  'plugin.collector.min-content': 'Contagem mínima de palavras para conteúdo',
  'plugin.collector.min-content.placeholder': 'Padrão 400 palavras',
  'plugin.collector.min-content.description':
    'Ao coletar artigos, se o número de palavras no conteúdo do artigo for menor que o número especificado de palavras, ele não será coletado.',
  'plugin.collector.pseudo': 'Se a IA reescreve',
  'plugin.collector.pseudo.no': 'não',
  'plugin.collector.pseudo.yes': 'Execute a reescrita de IA',
  'plugin.collector.pseudo.description':
    'A reescrita de IA oferece suporte apenas à coleta de artigos e combinações de perguntas e respostas. É necessária uma taxa.',
  'plugin.collector.translate': 'Quer traduzir',
  'plugin.collector.translate.no': 'não',
  'plugin.collector.translate.yes': 'Traduzir',
  'plugin.collector.translate.description':
    'Há uma taxa para tradução. Nota: A reescrita e a tradução da IA ​​não podem ser habilitadas ao mesmo tempo, caso contrário os resultados estarão errados.',
  'plugin.collector.to-language': 'Traduzir o idioma alvo',
  'plugin.collector.to-language.description':
    'Válido após selecionar tradução automática',
  'plugin.collector.daily-limit': 'Quantidade diária de coleta',
  'plugin.collector.daily-limit.description':
    'O número máximo de artigos coletados por dia, 0 significa sem limite',
  'plugin.collector.insert-image': 'Coleta e processamento de imagens',
  'plugin.collector.insert-image.remove': 'Remover imagem',
  'plugin.collector.insert-image.contain': 'Manter a imagem original',
  'plugin.collector.insert-image.insert': 'Manter a imagem original',
  'plugin.collector.title-exclude': 'Palavras de exclusão de título',
  'plugin.collector.title-exclude.tips':
    'Ao coletar artigos, se essas palavras-chave aparecerem no título, elas não serão coletadas.',
  'plugin.collector.title-prefix': 'Exclua palavras no início do título',
  'plugin.collector.title-prefix.tips':
    'Ao coletar artigos, se essas palavras-chave aparecerem no início do título, elas não serão coletadas.',
  'plugin.collector.title-suffix': 'Excluir palavras no final do título',
  'plugin.collector.title-suffix.tips':
    'Ao coletar artigos, se essas palavras-chave aparecerem no final do título, elas não serão coletadas.',
  'plugin.collector.content-exclude-line': 'linha de ignorar conteúdo',
  'plugin.collector.content-exclude-line.tips':
    'Ao coletar artigos, as linhas em que essas palavras aparecem serão removidas.',
  'plugin.collector.content-exclude': 'Exclusão de conteúdo',
  'plugin.collector.content-exclude.tips':
    'Ao coletar artigos, caso essas palavras apareçam no conteúdo, todo o artigo será descartado.',
  'plugin.collector.link-exclude': 'Link ignorado',
  'plugin.collector.link-exclude.tips':
    'Ao coletar artigos, caso essas palavras-chave apareçam no link, elas não serão coletadas.',
  'plugin.collector.start': 'Iniciar a coleta manualmente',
  'plugin.collector.start.confirm':
    'Tem certeza de que deseja começar a coletar?',
  'plugin.collector.start.content':
    'Isso iniciará imediatamente a execução de uma operação de tarefa de coleta',
  'plugin.collector.tips':
    'Para coletar artigos, você precisa primeiro definir as palavras-chave principais. Verifique a função "Gerenciamento de banco de dados de palavras-chave" e adicione as palavras-chave correspondentes.',
  'plugin.collector.replace': 'Substitua palavras-chave em lotes',
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
  'plugin.comment.new': 'adicionar comentário',
  'plugin.comment.edit': 'Comentários editoriais',
  'plugin.comment.item-title': 'Título do documento',
  'plugin.comment.time': 'Hora dos comentários',
  'plugin.comment.ip': 'IP do comentário',
  'plugin.comment.parent': 'Comentários superiores',
  'plugin.comment.user-id': 'ID do usuário',
  'plugin.comment.user-name': 'nome de usuário',
  'plugin.comment.content': 'comentários',
  'plugin.comment.new-status': 'Selecione um novo status',
  'plugin.comment.batch-update-status': 'Status de atualização em lote',
  'plugin.comment.view-edit': 'Visualizar edição',
  'plugin.comment.delete.confirm':
    'Tem certeza de que deseja excluir os comentários selecionados?',
  'plugin.fileupload.delete.confirm':
    'Tem certeza de que deseja excluir os arquivos selecionados?',
  'plugin.fileupload.upload.name': 'Carregar novo arquivo',
  'plugin.fileupload.upload.support':
    'Nota: Somente arquivos de verificação no formato txt/htm/html/xml podem ser carregados.',
  'plugin.fileupload.upload.btn': 'fazer upload de arquivos',
  'plugin.fileupload.view': 'Verificar',
  'plugin.fileupload.create-time': 'Tempo de upload',
  'plugin.finance.commission': 'Gestão da comissão',
  'plugin.finance.withdraw': 'Retirada manual',
  'plugin.finance.time': 'tempo',
  'plugin.finance.amount': 'Quantia',
  'plugin.finance.after-amount': 'Valor após alteração',
  'plugin.finance.status.unwithdraw': 'Não retirado',
  'plugin.finance.status.withdraw': 'Retirado',
  'plugin.finance.withdraw.confirm':
    'Tem certeza de que deseja processar o saque manualmente?',
  'plugin.finance.withdraw.confirm.content':
    'Isso equivale apenas a solicitar a retirada do lado do usuário.',
  'plugin.finance.order-id': 'ID do pedido',
  'plugin.finance.direction': 'Direção de financiamento',
  'plugin.finance.direction.in': 'Fazer dinheiro',
  'plugin.finance.direction.out': 'Povoado',
  'plugin.finance.flow': 'Registros de receitas e despesas',
  'plugin.finance.type': 'Tipo de fundo',
  'plugin.finance.type.sale': 'vender',
  'plugin.finance.type.buy': 'Comprar',
  'plugin.finance.type.refund': 'Reembolso',
  'plugin.finance.type.charge': 'completar',
  'plugin.finance.type.withdraw': 'retirar',
  'plugin.finance.type.spread': 'promoção',
  'plugin.finance.type.cashback': 'Dinheiro de volta',
  'plugin.finance.type.commission': 'comissão',
  'plugin.finance.withdraw.finish.confirm':
    'Tem certeza de que deseja concluir o saque manualmente?',
  'plugin.finance.withdraw.finish.content':
    'Se você pagou ao usuário offline, pode clicar aqui para concluí-lo.',
  'plugin.finance.withdraw.amount': 'Quantidade retirada',
  'plugin.finance.withdraw.status.waiting': 'Aguardando processamento',
  'plugin.finance.withdraw.status.agree': 'aprovado',
  'plugin.finance.withdraw.status.finish': 'Retirado',
  'plugin.finance.withdraw.apply-time': 'tempo de aplicação',
  'plugin.finance.withdraw.success-time': 'tempo de sucesso',
  'plugin.finance.withdraw.agree': 'Concorde em sacar dinheiro',
  'plugin.finance.withdraw.finish': 'Retirada completa',
  'plugin.finance.withdraw.name': 'Gestão de retiradas',
  'plugin.finance.withdraw.apply': 'Pedido de retirada',
  'plugin.fulltext.tips':
    'After enabling full-text search, you can search for document content. Wukong Search (built-in) will consume a large amount of server memory. If your server memory is small, it is recommended to turn off full-text search or choose other full-text search engines.',
  'plugin.fulltext.open.name': 'Se deve ativar a pesquisa de texto completo',
  'plugin.fulltext.open.false': 'fecho',
  'plugin.fulltext.open.true': 'ligar',
  'plugin.fulltext.use_content.false': 'Apenas título e introdução',
  'plugin.fulltext.use_content.true': 'Incluir conteúdo do documento',
  'plugin.fulltext.use_content.name': 'Conteúdo do índice',
  'plugin.fulltext.modules.name': 'Modelo aberto',
  'plugin.fulltext.search.name': 'Tipo de busca',
  'plugin.fulltext.search.archive': 'Pesquisa de documentos',
  'plugin.fulltext.search.category': 'Pesquisa de categoria',
  'plugin.fulltext.search.tag': 'Pesquisa de tags',
  'plugin.fulltext.rebuild': 'Rebuild index',
  'plugin.fulltext.engine': 'Full text search engine',
  'plugin.fulltext.wukong': 'Wukong search (built-in)',
  'plugin.fulltext.elasticsearch': 'Elasticsearch',
  'plugin.fulltext.zincSearch': 'ZincSearch',
  'plugin.fulltext.meilisearch': 'Meilisearch',
  'plugin.fulltext.engine-url': 'Address',
  'plugin.fulltext.engine-user': 'Username',
  'plugin.fulltext.engine-password': 'Password',
  'plugin.fulltext.rebuild.confirm':
    'Are you sure you want to rebuild the index? ',
  'plugin.fulltext.indexing': 'Rebuilding the index, please wait. ',
  'plugin.group.edit': 'Modificar grupo de usuários',
  'plugin.group.add': 'Adicionar grupo de usuários',
  'plugin.group.name': 'nome',
  'plugin.group.description': 'introduzir',
  'plugin.group.level': 'Nível de grupo',
  'plugin.group.level.suffix': 'aula',
  'plugin.group.level.description':
    'Por exemplo, os membros ordinários são de nível 0, os membros intermediários são de nível 1, os membros seniores são de nível 2, os membros principais são de nível 3, etc.',
  'plugin.group.price': 'Preço do grupo de usuários',
  'plugin.group.price.suffix': 'apontar',
  'plugin.group.price.description':
    'O preço que precisa ser pago para adquirir o VIP deste grupo de usuários. Observe que a unidade é centavos. Por exemplo, 1 yuan, preencha 100 aqui.',
  'plugin.group.expire_day': 'Período de validade do grupo de usuários',
  'plugin.group.expire_day.suffix': 'céu',
  'plugin.group.expire_day.description':
    'Após adquirir o VIP, ele será válido por quantos dias. Preencha 365 por 1 ano. Após o vencimento, ele retornará ao primeiro grupo de usuários.',
  'plugin.group.content_safe': 'Segurança de conteúdo',
  'plugin.group.content_safe.no-verify':
    'Comentários/publicação de conteúdo estão isentos de revisão',
  'plugin.group.content_safe.no-captcha':
    'Comentários/postagem de conteúdo sem código de verificação',
  'plugin.group.share_reward': 'Período de validade do grupo de usuários',
  'plugin.group.share_reward.description':
    'Recomenda-se definir 5%-20 e o ponto decimal não pode ser definido. Prioridade do índice de comissão: Índice de comissão definido por produto > Índice de comissão do grupo de usuários > Índice de comissão padrão',
  'plugin.group.parent_reward': 'Proporção de recompensa por convite',
  'plugin.group.parent_reward.description':
    'Recomenda-se definir 1%-5% e o ponto decimal não pode ser definido. Taxa de comissão superior. O distribuidor a convida b para se tornar um distribuidor e b se torna o próximo vendedor de a. Quando b promove um pedido com sucesso, b pode receber comissão de distribuição e a recebe apenas a recompensa do convite.',
  'plugin.group.discount': 'Desconto para usuários',
  'plugin.group.discount.description':
    'Recomenda-se definir 90% -100%. Após o usuário acessar a página através do link compartilhado pelo distribuidor, ele poderá aproveitar o desconto ao fazer um pedido.',
  'plugin.group.permission': 'Configurações de permissão de distribuição',
  'plugin.group.delete.confirm': 'Tem certeza de que deseja excluir este dado?',
  'plugin.guestbook.reply.required':
    'Configure primeiro o lembrete por e-mail e pesquise "Lembrete por e-mail" na função.',
  'plugin.guestbook.replysubmit.required':
    'Preencha o título e o conteúdo do e-mail',
  'plugin.guestbook.replysubmit.success': 'Email enviado com sucesso',
  'plugin.guestbook.view': 'Ver mensagem',
  'plugin.guestbook.user-name': 'nome de usuário',
  'plugin.guestbook.contact': 'Informações de contato',
  'plugin.guestbook.reply': 'Responder e-mail',
  'plugin.guestbook.content': 'Conteúdo da mensagem',
  'plugin.guestbook.click-preview': 'Clique para visualizar',
  'plugin.guestbook.refer': 'fonte',
  'plugin.guestbook.create-time': 'Hora da mensagem',
  'plugin.guestbook.reply.subject': 'título do e-mail',
  'plugin.guestbook.reply.message': 'conteúdo do e-mail',
  'plugin.guestbook.field.delete.confirm':
    'Tem certeza de que deseja excluir este campo?',
  'plugin.guestbook.field.delete.confirm.content':
    'Você pode restaurar atualizando a página antes de salvar.',
  'plugin.guestbook.setting': 'Configurações de mensagem do site',
  'plugin.guestbook.return-message': 'Dicas para uma mensagem de sucesso:',
  'plugin.guestbook.return-message.placeholder':
    'Padrão: Obrigado pela sua mensagem!',
  'plugin.guestbook.return-message.description':
    'O prompt que os usuários veem após enviar uma mensagem. Por exemplo: Obrigado pela sua mensagem!',
  'plugin.guestbook.delete.confirm':
    'Tem certeza de que deseja excluir a mensagem selecionada?',
  'plugin.guestbook.export': 'Exportar mensagens',
  'plugin.guestbook.export.confirm':
    'Tem a certeza que deseja exportar todas as mensagens?',
  'plugin.htmlcache.remote-file': 'arquivo remoto',
  'plugin.htmlcache.local-file': 'ficheiros locais',
  'plugin.htmlcache.push-status': 'status de envio',
  'plugin.htmlcache.push-status.success': 'sucesso',
  'plugin.htmlcache.push-status.failure': 'falhar',
  'plugin.htmlcache.re-push': 'Reenviar',
  'plugin.htmlcache.push-log': 'empurrar registro',
  'plugin.htmlcache.generate.all.confirm':
    'Tem certeza de que deseja gerar um cache estático para todo o site?',
  'plugin.htmlcache.generate.home.confirm':
    'Tem certeza de que deseja gerar um cache estático da página inicial?',
  'plugin.htmlcache.generate.category.confirm':
    'Tem certeza de que deseja gerar um cache estático da coluna?',
  'plugin.htmlcache.generate.archive.confirm':
    'Tem certeza de que deseja gerar um cache estático do documento?',
  'plugin.htmlcache.generate.tag.confirm':
    'Tem certeza de que deseja gerar um cache estático de tags?',
  'plugin.htmlcache.clean.confirm':
    'Tem certeza de que deseja limpar o cache estático de todo o site? Se houver muitos arquivos em cache, pode demorar muito.',
  'plugin.htmlcache.clean.confirm.content':
    'Esta operação limpa apenas os arquivos de cache local do servidor e não pode limpar os arquivos estáticos do servidor.',
  'plugin.htmlcache.clean.success': 'Limpeza bem-sucedida',
  'plugin.htmlcache.push.all.confirm':
    'Tem certeza de que deseja enviar todos os arquivos estáticos para o servidor estático?',
  'plugin.htmlcache.push.all.confirm.content':
    'Ele só está disponível quando um servidor estático é configurado. O push completo leva muito tempo. Se nenhuma alteração global for feita, o push incremental poderá ser usado.',
  'plugin.htmlcache.push.addon.confirm':
    'Tem certeza de que deseja enviar arquivos estáticos de forma incremental para o servidor estático?',
  'plugin.htmlcache.push.addon.confirm.content':
    'Disponível somente quando um servidor estático é configurado, o push incremental enviará apenas arquivos de cache estático atualizados.',
  'plugin.htmlcache.isopen': 'Se deve ativar o cache de página estática',
  'plugin.htmlcache.index-time': 'Tempo de cache da página inicial',
  'plugin.htmlcache.index-time.suffix': 'Segundo',
  'plugin.htmlcache.index-time.description':
    'Se você preencher 0 segundos, ele não será armazenado em cache.',
  'plugin.htmlcache.category-time': 'Listar tempo de cache',
  'plugin.htmlcache.archive-time': 'Detalhes do tempo de cache',
  'plugin.htmlcache.storage-type': 'Servidor de site estático',
  'plugin.htmlcache.storage-type.close': 'fecho',
  'plugin.htmlcache.storage-type.aliyun': 'Armazenamento em nuvem Alibaba',
  'plugin.htmlcache.storage-type.tencent': 'Armazenamento em nuvem Tencent',
  'plugin.htmlcache.storage-type.qiniu': 'Armazenamento em nuvem Qiniu',
  'plugin.htmlcache.storage-type.upyun':
    'Outra chance de armazenamento em nuvem',
  'plugin.htmlcache.storage-type.ftp': 'Transferência FTP',
  'plugin.htmlcache.storage-type.ssh': 'Transferência SFTP (SSH)',
  'plugin.htmlcache.storage-url': 'Endereço do site estático',
  'plugin.htmlcache.storage-url.placeholder': 'Como: https://www.anqicms.com',
  'plugin.htmlcache.aliyun.endpoint': 'Nó de nuvem Alibaba',
  'plugin.htmlcache.aliyun.endpoint.placeholder':
    'Por exemplo: http://oss-cn-hangzhou.aliyuncs.com',
  'plugin.htmlcache.aliyun.bucket-name': 'Nome do intervalo do Alibaba Cloud',
  'plugin.htmlcache.tencent.bucket-url':
    'Endereço do bucket de armazenamento em nuvem Tencent',
  'plugin.htmlcache.tencent.bucket-url.placeholder':
    'Por exemplo: https://aa-1257021234.cos.ap-guangzhou.myqcloud.com',
  'plugin.htmlcache.qiniu.bucket-name':
    'Nome do intervalo de armazenamento em nuvem Qiniu',
  'plugin.htmlcache.qiniu.bucket-name.placeholder': 'Por exemplo: anqicms',
  'plugin.htmlcache.qiniu.region': 'Área de armazenamento em nuvem Qiniu',
  'plugin.htmlcache.qiniu.region.z0': 'Leste da China',
  'plugin.htmlcache.qiniu.region.z1': 'Norte da China',
  'plugin.htmlcache.qiniu.region.z2': 'Sul da China',
  'plugin.htmlcache.qiniu.region.na0': 'América do Norte',
  'plugin.htmlcache.qiniu.region.as0': 'Sudeste da Ásia',
  'plugin.htmlcache.qiniu.region.cn-east2': 'Leste da China-Zhejiang2',
  'plugin.htmlcache.qiniu.region.fog-cn-east1':
    'Armazenamento de Nevoeiro Região Leste da China',
  'plugin.htmlcache.upyun.operator': 'Outra foto do operador de nuvem',
  'plugin.htmlcache.upyun.password':
    'Pegue a senha do operador de nuvem novamente',
  'plugin.htmlcache.upyun.bucket':
    'Dê uma olhada também no nome do serviço de armazenamento em nuvem',
  'plugin.htmlcache.ftp.tips':
    'Nota: Após o teste, o PureFtp que acompanha o Pagoda não pode ser usado normalmente.',
  'plugin.htmlcache.ftp.host': 'Endereço IP FTP',
  'plugin.htmlcache.ftp.port': 'Porta FTP',
  'plugin.htmlcache.ftp.username': 'Nome de usuário FTP',
  'plugin.htmlcache.ftp.password': 'Senha FTP',
  'plugin.htmlcache.ftp.webroot': 'Diretório raiz de upload FTP',
  'plugin.htmlcache.ssh.host': 'Endereço IP SSH',
  'plugin.htmlcache.ssh.port': 'Porta SSH',
  'plugin.htmlcache.ssh.username': 'Nome de usuário SSH',
  'plugin.htmlcache.ssh.password': 'Senha SSH',
  'plugin.htmlcache.ssh.or-key': 'ou chave SSH',
  'plugin.htmlcache.ssh.or-key.description':
    'Se o seu servidor SSH usa uma chave para fazer login, faça upload dela',
  'plugin.htmlcache.ssh.or-key.upload': 'fazer upload de arquivos',
  'plugin.htmlcache.ssh.webroot': 'Diretório raiz de upload SSH',
  'plugin.htmlcache.generate.name': 'Operação de construção',
  'plugin.htmlcache.generate.last-time': 'Hora da última geração manual:',
  'plugin.htmlcache.generate.last-time.empty': 'Não gerado manualmente',
  'plugin.htmlcache.clean.all': 'limpar todo o cache',
  'plugin.htmlcache.build.all': 'Gere todos os caches manualmente',
  'plugin.htmlcache.build.home': 'Gerar cache da página inicial manualmente',
  'plugin.htmlcache.build.category': 'Gerar cache de coluna manualmente',
  'plugin.htmlcache.build.archive': 'Gerar cache de documentos manualmente',
  'plugin.htmlcache.build.tag': 'Gerar cache de tags manualmente',
  'plugin.htmlcache.push.name': 'Operações de servidor estático',
  'plugin.htmlcache.push.last-time': 'Hora do último envio manual:',
  'plugin.htmlcache.push.last-time.empty': 'Não empurrado manualmente',
  'plugin.htmlcache.push.all':
    'Envie todos os arquivos estáticos para o servidor estático',
  'plugin.htmlcache.push.addon':
    'Envie apenas arquivos atualizados para o servidor estático',
  'plugin.htmlcache.push.log.all': 'Todos os registros push',
  'plugin.htmlcache.push.log.error': 'Registro de erro push',
  'plugin.htmlcache.build.process': 'Construir progresso',
  'plugin.htmlcache.build.start-time': 'Hora de início:',
  'plugin.htmlcache.build.end-time': 'Tempo completo:',
  'plugin.htmlcache.build.unfinished': 'desfeito',
  'plugin.htmlcache.build.total': 'Quantidade encontrada:',
  'plugin.htmlcache.build.finished-count': 'Quantidade processada:',
  'plugin.htmlcache.build.current': 'Atualmente executando tarefas:',
  'plugin.htmlcache.build.error-count': 'Número de erros:',
  'plugin.htmlcache.build.error-msg': 'mensagem de erro:',
  'plugin.htmlcache.push.process': 'Impulsione o progresso',
  'plugin.htmlcache.description.1':
    'Depois de ativar o cache de página estática, a página inicial, a página de lista e a página de detalhes serão armazenadas em cache para acelerar a abertura do site, mas será necessário mais espaço no servidor para armazenar os arquivos de cache.',
  'plugin.htmlcache.description.2':
    'Se você precisar habilitar um site estático, o tipo de modelo precisará ser adaptável. Para abrir um site estático, você precisa preencher as informações do servidor do site estático. Após a comunicação bem-sucedida, o sistema transmitirá automaticamente a página estática para o servidor do site estático.',
  'plugin.htmlcache.description.3':
    'Antes de habilitar um site estático, você precisa habilitar o cache de página estática. Depois de habilitar um site estático, a pesquisa, mensagem, comentário, salto 301 e outras funções que exigem o envio de dados ao backend serão inválidas e o site terá apenas efeitos de exibição.',
  'plugin.htmlcache.description.4':
    'Depois de ativar um site estático, as seguintes operações não serão regeneradas automaticamente e as operações de geração de páginas estáticas precisam ser executadas manualmente: Ajustar modelos (modificar modelos, ativar modelos), Modificar configurações de plano de fundo (configurações globais, configurações de conteúdo, informações de contato, navegação , etc.), regras pseudoestáticas modificadas e outras mudanças que afetam a situação global',
  'plugin.importapi.token.required':
    'Por favor preencha o Token, com até 128 caracteres',
  'plugin.importapi.token.confirm':
    'Tem certeza de que deseja atualizar o Token?',
  'plugin.importapi.token.confirm.content':
    'Após a atualização, o Token original torna-se inválido, use o novo endereço API para operação.',
  'plugin.importapi.token.copy.success': 'Copiado com sucesso',
  'plugin.importapi.tips':
    'O conteúdo gerado por meio de plataformas de terceiros, como escrita de IA, pode ser importado para este sistema via API.',
  'plugin.importapi.token.name': 'Meu token:',
  'plugin.importapi.token.copy': 'Clique para copiar',
  'plugin.importapi.token.update': 'Token de atualização',
  'plugin.importapi.archive-api': 'Interface de importação de documentos',
  'plugin.importapi.api-url': 'endereço de interface:',
  'plugin.importapi.method': 'Método de solicitação:',
  'plugin.importapi.request-type': 'Tipo de solicitação:',
  'plugin.importapi.post-fields': 'Campos do formulário POST:',
  'plugin.importapi.field.remark': 'ilustrar',
  'plugin.importapi.field.archive-id':
    'ID do documento, gerado automaticamente por padrão',
  'plugin.importapi.field.title': 'Título do documento',
  'plugin.importapi.field.content': 'Conteúdo do documento',
  'plugin.importapi.field.category-id': 'Categoria ID',
  'plugin.importapi.field.keywords': 'Palavras-chave do documento',
  'plugin.importapi.field.description': 'Introdução ao documento',
  'plugin.importapi.field.url-token':
    'Alias ​​de URL personalizado, compatível apenas com números e letras em inglês',
  'plugin.importapi.field.images':
    'As imagens do artigo podem ser configuradas em até 9 fotos.',
  'plugin.importapi.field.logo':
    'A miniatura do documento pode ser um endereço absoluto, como: https://www.anqicms.com/logo.png ou um endereço relativo, como: /logo.png',
  'plugin.importapi.field.publish-time':
    'Formato: 2006-01-02 15:04:05 O prazo de divulgação do documento pode ser no futuro. Se for no futuro, o documento não será divulgado oficialmente até que o prazo acabe.',
  'plugin.importapi.field.tag':
    'Tag do documento. Várias tags são separadas por vírgulas em inglês, por exemplo: aaa, bbb, ccc',
  'plugin.importapi.field.diy': 'Outros campos personalizados',
  'plugin.importapi.field.diy.remark':
    'Se você passar outros campos personalizados e os campos existirem na tabela do documento, eles também serão suportados.',
  'plugin.importapi.field.draft':
    'Se deve ser salvo em rascunho. Os valores suportados são: false|true Quando true for preenchido, o documento publicado será salvo em rascunho.',
  'plugin.importapi.field.cover':
    'Quando o mesmo título, documento de identificação existe ou não, os valores suportados são: 0|1|2, quando preencher 1, será sobrescrito como o conteúdo mais recente, quando definido para 0 ou não passar, será solicitado um erro, quando preencher 2, não julgar',
  'plugin.importapi.return-type': 'Formato de retorno:',
  'plugin.importapi.return-example.success': 'Exemplo de resultado correto:',
  'plugin.importapi.return-example.failure':
    'Exemplo de resultados incorretos:',
  'plugin.importapi.category-api': 'Obtenha interface de classificação',
  'plugin.importapi.category-api.fields':
    'Formulário POST/campos de parâmetros de consulta:',
  'plugin.importapi.category-api.fields.empty': 'nenhum',
  'plugin.importapi.category-api.module-id':
    'O ID do modelo da classificação a ser obtida, preencha o número, valores suportados: 0=todos, 1,2...ID do modelo correspondente',
  'plugin.importapi.train-mopdule': 'Módulo de publicação de locomotivas',
  'plugin.importapi.train-mopdule.url': 'Endereço do website:',
  'plugin.importapi.train-mopdule.token': 'Variáveis ​​globais:',
  'plugin.importapi.train-mopdule.download': 'Download do módulo:',
  'plugin.importapi.train-mopdule.download.text':
    'Clique para fazer o download',
  'plugin.importapi.train-mopdule.support-version': 'Versões suportadas:',
  'plugin.importapi.train-mopdule.support-version.text':
    'Suporte ao coletor de locomotivas versão 9.0 ou superior para importar e usar o módulo de lançamento',
  'plugin.importapi.train-mopdule.example': 'Exemplo de configuração:',
  'plugin.importapi.token.reset': 'ResetToken',
  'plugin.importapi.token.new': 'Novo token',
  'plugin.importapi.token.new.placeholder': 'Por favor preencha o novo Token',
  'plugin.importapi.token.new.description':
    'O token é geralmente composto por uma combinação de números e letras, com mais de 10 dígitos e menos de 128 dígitos.',
  'plugin.interference.isopen': 'Ative a coleta de código anti-interferência',
  'plugin.interference.isopen.description':
    'As configurações a seguir só serão efetivas se a função estiver ativada.',
  'plugin.interference.isopen.no': 'fecho',
  'plugin.interference.isopen.yes': 'ligar',
  'plugin.interference.mode': 'Modo anti-interferência',
  'plugin.interference.mode.class': 'Adicionar classe aleatória',
  'plugin.interference.mode.text': 'Adicione texto oculto aleatório',
  'plugin.interference.disable-selection': 'Desativar seleção de texto',
  'plugin.interference.disable-selection.no': 'Não desativado',
  'plugin.interference.disable-selection.yes': 'Desativar',
  'plugin.interference.disable-copy': 'Desabilitar replicação',
  'plugin.interference.disable-right-click':
    'Desativar clique com o botão direito do mouse',
  'plugin.keyword.batch-import': 'Importe palavras-chave em lotes',
  'plugin.keyword.batch-import.tips':
    'Nota: Somente arquivos no formato csv são suportados para upload e importação.',
  'plugin.keyword.batch-import.step1':
    'A primeira etapa é baixar o arquivo de modelo csv',
  'plugin.keyword.batch-import.step1.btn': 'Baixe o arquivo de modelo csv',
  'plugin.keyword.batch-import.step2':
    'A segunda etapa é fazer upload do arquivo csv',
  'plugin.keyword.batch-import.step2.btn': 'Carregar arquivo csv',
  'plugin.keyword.edit': 'Editar palavras-chave',
  'plugin.keyword.add': 'Adicionar palavras-chave',
  'plugin.keyword.title': 'Nome da palavra-chave',
  'plugin.keyword.title.placeholder':
    'Suporta adição em lote, uma palavra-chave por linha',
  'plugin.keyword.archive-category': 'Classificação de documentos',
  'plugin.keyword.archive-category-id': 'ID de classificação do documento',
  'plugin.keyword.manual-dig': 'Expandir manualmente as palavras',
  'plugin.keyword.dig-setting': 'Configurações de expansão do Word',
  'plugin.keyword.dig-setting.auto-dig': 'Expansão automática de palavras',
  'plugin.keyword.dig-setting.auto-dig.no': 'não',
  'plugin.keyword.dig-setting.auto-dig.yes': 'automático',
  'plugin.keyword.dig-setting.max-count': 'Número de extensões',
  'plugin.keyword.dig-setting.max-count.description':
    'Se a expansão automática de palavras for selecionada, o número de expansões de palavras será válido.',
  'plugin.keyword.dig-setting.max-count.placeholder': 'Padrão 100.000',
  'plugin.keyword.dig-setting.language': 'Idioma da palavra-chave',
  'plugin.keyword.dig-setting.title-exclude':
    'palavras de exclusão de palavras-chave',
  'plugin.keyword.dig-setting.title-exclude.description':
    'Ao expandir palavras, se essas palavras-chave aparecerem nas palavras-chave, elas não serão coletadas.',
  'plugin.keyword.dig-setting.replace': 'Substituição de palavra-chave',
  'plugin.keyword.dig-setting.replace.tips1':
    'Edite os pares de palavras-chave que precisam ser substituídos e a substituição será realizada automaticamente ao expandir as palavras.',
  'plugin.keyword.delete.confirm':
    'Tem certeza de que deseja excluir as palavras-chave selecionadas?',
  'plugin.keyword.export.confirm':
    'Tem certeza de que deseja exportar todas as palavras-chave?',
  'plugin.keyword.collect.confirm':
    'Tem certeza de que deseja coletar esta palavra-chave?',
  'plugin.keyword.collect.doing': 'Atualmente coletando',
  'plugin.keyword.aigenerate.confirm':
    'Tem certeza de que deseja realizar operações de gravação de IA nesta palavra-chave?',
  'plugin.keyword.aigenerate.content':
    'A escrita automática de IA requer pagamento, certifique-se de vincular sua conta Anqi.',
  'plugin.keyword.aigenerate.doing': 'Gerando',
  'plugin.keyword.cleanup.confirm':
    'Tem certeza de que deseja limpar todas as palavras-chave para isso?',
  'plugin.keyword.cleanup.content':
    'Esta operação excluirá todas as palavras-chave e não poderá ser recuperada. Por favor, opere com cuidado',
  'plugin.keyword.level': 'Hierarquia',
  'plugin.keyword.article-count': 'Artigos coletados',
  'plugin.keyword.collect': 'Coleta manual',
  'plugin.keyword.aigenerate': 'Escrita de IA',
  'plugin.keyword.aigenerate.view-archive': 'Veja a documentação de IA',
  'plugin.keyword.export': 'Exportar palavras-chave',
  'plugin.keyword.import': 'Importar palavras-chave',
  'plugin.keyword.cleanup': 'Limpar banco de dados de palavras-chave',
  'plugin.link.api.title': 'API de link amigável',
  'plugin.link.api.list': 'Obtenha a interface amigável da lista de links',
  'plugin.link.api.verify': 'Interface de autenticação',
  'plugin.link.api.add': 'Adicionar interface de link amigável',
  'plugin.link.field.other-title': 'Palavras-chave da outra parte',
  'plugin.link.field.other-link': 'Outro link',
  'plugin.link.field.other-link.description': 'Como: https://www.anqicms.com/',
  'plugin.link.field.nofollow':
    'Se deseja adicionar nofollow, valores opcionais: 0 para não adicionar, 1 para adicionar',
  'plugin.link.field.back-link': 'Página do link oposto',
  'plugin.link.field.back-link.description':
    'O URL da página onde a outra parte colocou o link para este site',
  'plugin.link.field.self-title': 'minhas palavras-chave',
  'plugin.link.field.self-title.description':
    'As palavras-chave que coloquei na página da outra parte',
  'plugin.link.field.self-link': 'meu link',
  'plugin.link.field.self-link.description':
    'O link que coloquei na página da outra parte',
  'plugin.link.field.contact': 'Informações de contato da outra parte',
  'plugin.link.field.contact.description':
    'Preencha QQ, WeChat, número de telefone, etc. para facilitar o contato de acompanhamento',
  'plugin.link.field.remark': 'Observações',
  'plugin.link.api.delete': 'Excluir interface de link amigável',
  'plugin.link.edit': 'Editar links amigáveis',
  'plugin.link.add': 'Adicione links amigáveis',
  'plugin.link.nofollow.description': 'Se deve adicionar tag nofollow',
  'plugin.link.nofollow.no': 'não adicionado',
  'plugin.link.nofollow.yes': 'adicionar à',
  'plugin.link.more': 'mais opções',
  'plugin.link.delete.confirm':
    'Tem certeza de que deseja excluir o link amigável selecionado?',
  'plugin.link.status.wait': 'Para ser testado',
  'plugin.link.status.ok': 'normal',
  'plugin.link.status.wrong-keyword': 'Palavras-chave são inconsistentes',
  'plugin.link.status.no-back-url': 'A outra parte não tem backlink',
  'plugin.link.other-title-link': 'Palavras-chave/links da outra parte',
  'plugin.link.other-contact-remark':
    'Informações de contato/observações da outra parte',
  'plugin.link.status-check-time':
    'Informações de contato/observações da outra parte',
  'plugin.link.create-time': 'tempo extra',
  'plugin.link.check': 'examinar',
  'plugin.material.category.delete.confirm':
    'Tem certeza de que deseja excluí-lo?',
  'plugin.material.category.title': 'Nome da Seção',
  'plugin.material.category.count': 'Quantidade de materiais',
  'plugin.material.category.add': 'Nova seção',
  'plugin.material.category.edit': 'Renomear seção:',
  'plugin.material.category.manage': 'Gestão do setor',
  'plugin.material.category.title.tips': 'Por favor preencha o nome da seção',
  'plugin.material.import.selected': 'escolhido',
  'plugin.material.import.segment': 'fragmento',
  'plugin.material.import.clear':
    'Tem certeza de que deseja limpar os materiais de conteúdo selecionados para upload?',
  'plugin.material.delete.confirm':
    'Tem certeza de que deseja excluir o material selecionado?',
  'plugin.material.import.submit.tips.before':
    'Entre os materiais que você selecionou, estão',
  'plugin.material.import.submit.tips.after':
    'Nenhuma seção foi selecionada para este material. Deseja continuar enviando?',
  'plugin.material.import.upload-error':
    'Erro de upload, tente novamente mais tarde',
  'plugin.material.import.batch-add': 'Adicione materiais em lotes',
  'plugin.material.import.batch-add.tips':
    'Nota: Você pode fazer upload de artigos armazenados em txt ou html.',
  'plugin.material.import.default-category': 'Por padrão importado para:',
  'plugin.material.import.default-category.placeholder':
    'Selecione a seção a ser importada',
  'plugin.material.import.default-category.all': 'todos',
  'plugin.material.import.select-file': 'Escolha fazer upload:',
  'plugin.material.import.select-file.btn':
    'Selecione o arquivo de artigo Txt ou HTML',
  'plugin.material.import.paste': 'Ou clique para colar o texto',
  'plugin.material.import.selected.count': 'Material do parágrafo selecionado:',
  'plugin.material.import.paste.clear': 'Claro',
  'plugin.material.import.category.select': 'Selecione a seção',
  'plugin.material.import.merge-to-next': 'Mesclar para baixo',
  'plugin.material.import.paste.title': 'Cole o conteúdo do artigo aqui',
  'plugin.material.import.paste.analysis': 'analisar conteúdo',
  'plugin.material.import.paste.description':
    'Por padrão, o conteúdo filtrará todas as tags HTML e reterá apenas o texto. Se você precisar manter tags HTML, verifique',
  'plugin.material.import.paste.description.btn': 'manter tags html',
  'plugin.material.edit': 'Editar conteúdo',
  'plugin.material.add': 'Adicionar material',
  'plugin.material.content': 'contente',
  'plugin.material.user-count': 'Número de citações',
  'plugin.material.preview': 'Visualização',
  'plugin.material.category-filter': 'Filtro de classificação',
  'plugin.material.all': 'Todos os recursos',
  'plugin.order.status': 'Status do pedido',
  'plugin.order.status.wait': 'Pagamento Pendente',
  'plugin.order.status.paid': 'a ser entregue',
  'plugin.order.status.delivery': 'Esperando recibo',
  'plugin.order.status.finished': 'sucesso',
  'plugin.order.status.refunding': 'Reembolso',
  'plugin.order.status.refunded': 'devolveu',
  'plugin.order.status.closed': 'pedido fechado',
  'plugin.order.status.all': 'todos',
  'plugin.order.detail': 'informações do pedido',
  'plugin.order.type': 'Tipo de pedido',
  'plugin.order.type.vip': 'VIP',
  'plugin.order.type.goods': 'mercadoria',
  'plugin.order.order-id': 'ID do pedido',
  'plugin.order.create-time': 'hora do pedido',
  'plugin.order.pay-time': 'Prazo de pagamento',
  'plugin.order.deliver-time': 'Prazo de entrega',
  'plugin.order.finished-time': 'Tempo completo',
  'plugin.order.payment-id': 'Número da transação',
  'plugin.order.terrace-id': 'Número de série do comerciante',
  'plugin.order.pay-amount': 'Preço total pago',
  'plugin.order.order-amount': 'Valor do pedido',
  'plugin.order.origin-amount': 'preço total original',
  'plugin.order.buy.user-name': 'Assinante',
  'plugin.order.share.user-name': 'Usuários de distribuição',
  'plugin.order.share.amount': 'Comissão de distribuição',
  'plugin.order.share.parent.user-name': 'Usuário superior de distribuição',
  'plugin.order.share.parent.amount': 'Comissão de recompensa superior',
  'plugin.order.remark': 'Notas de pedidos',
  'plugin.order.vip': 'Comprar VIP',
  'plugin.order.goods': 'encomendar mercadorias',
  'plugin.order.detail.title': 'nome',
  'plugin.order.detail.price': 'preço unitário',
  'plugin.order.detail.quantity': 'Quantidade do pedido',
  'plugin.order.detail.amount': 'preço total',
  'plugin.order.recipient.name': 'destinatário',
  'plugin.order.recipient.contact': 'Recebendo número de telefone',
  'plugin.order.recipient.address': 'Endereço do destinatário',
  'plugin.order.setting': 'Configurações de pedido',
  'plugin.order.setting.progress': 'Método de processamento de pedidos',
  'plugin.order.setting.progress.yes': 'Processo normal de transação',
  'plugin.order.setting.progress.no': 'A transação é concluída diretamente',
  'plugin.order.setting.progress.description':
    'As transações normais exigem que o usuário confirme o recebimento ou conclua o pedido após o vencimento. A transação é concluída diretamente após o pagamento do usuário e o pedido é concluído.',
  'plugin.order.setting.auto-finish': 'Pedido concluído automaticamente',
  'plugin.order.setting.auto-finish.placeholder': 'Padrão 10 dias',
  'plugin.order.setting.auto-finish.suffix': 'céu',
  'plugin.order.setting.auto-close': 'Tempo limite do pedido encerrado',
  'plugin.order.setting.auto-close.description':
    'Não fechado automaticamente por padrão',
  'plugin.order.setting.auto-close.suffix': 'minuto',
  'plugin.order.setting.seller-percent': 'Receita de vendas do comerciante',
  'plugin.order.setting.seller-percent.description':
    'Porcentagem de receita de vendas do comerciante',
  'plugin.order.loading': 'carregando',
  'plugin.order.finish.confirm':
    'Tem certeza de que deseja concluir o pedido manualmente?',
  'plugin.order.finish.content': 'Esta operação é irreversível.',
  'plugin.order.apply-refund.confirm':
    'Tem certeza de que deseja solicitar o reembolso deste pedido?',
  'plugin.order.apply-refund.content':
    'Após o reembolso, os fundos serão devolvidos à rota original.',
  'plugin.order.delivery': 'Enviar',
  'plugin.order.delivery-process': 'Processamento de envio',
  'plugin.order.finish-order': 'Ordem completa',
  'plugin.order.refund-process': 'Processar um reembolso',
  'plugin.order.refund': 'Reembolso',
  'plugin.order.refund.disagree': 'Não concordar com o reembolso',
  'plugin.order.refund.agree': 'Concorde com um reembolso',
  'plugin.order.apply-refund': 'Peça um reembolso',
  'plugin.order.pay': 'Pagamento',
  'plugin.order.pay-process': 'Processo de pagamento',
  'plugin.order.pay-way': 'Forma de pagamento',
  'plugin.order.pay-way.offline': 'Pagamento off-line',
  'plugin.order.view': 'Verificar',
  'plugin.order.export': 'Pedidos de exportação',
  'plugin.order.export.status': 'Exportar conteúdo do pedido',
  'plugin.order.export.start-date': 'data de início',
  'plugin.order.export.end-date': 'data final',
  'plugin.order.export.end-date.description': 'Padrão hoje',
  'plugin.order.express-company': 'empresa de courier',
  'plugin.order.express-company.empty': 'nenhum',
  'plugin.order.express-company.sf': 'Expresso SF',
  'plugin.order.express-company.ems': 'Correio Expresso',
  'plugin.order.express-company.jd': 'JD Express',
  'plugin.order.express-company.sto': 'STO Expresso',
  'plugin.order.express-company.yto': 'Expresso Yuantong',
  'plugin.order.express-company.zto': 'ZTO Express',
  'plugin.order.express-company.yunda': 'Entrega de YunDa',
  'plugin.order.express-company.jitu': 'Jitu Express',
  'plugin.order.express-company.baishi': 'Melhor Huitong',
  'plugin.order.tracking-number': 'Numero de rastreio',
  'plugin.pay.wechat': 'Pagamento WeChat',
  'plugin.pay.alipay': 'Pague com Ali-Pay',
  'plugin.pay.paypal': 'PayPal',
  'plugin.pay.paypal.client-id': 'Client ID',
  'plugin.pay.paypal.secret': 'Client Secret',
  'plugin.pay.wechat.wechat.appid': 'AppID da conta de serviço WeChat',
  'plugin.pay.wechat.wechat.app-secret': 'Conta de serviço WeChat AppSecret',
  'plugin.pay.wechat.weapp.appid': 'ID do aplicativo do miniprograma WeChat',
  'plugin.pay.wechat.weapp.app-secret': 'Miniprograma WeChat AppSecret',
  'plugin.pay.wechat.mchid': 'ID do comerciante WeChat',
  'plugin.pay.wechat.apikey': 'APIKey do comerciante WeChat',
  'plugin.pay.wechat.cert-path': 'Certificado de comerciante WeChat',
  'plugin.pay.upload': 'fazer upload de arquivos',
  'plugin.pay.wechat.key-path': 'Chave de certificado de comerciante WeChat',
  'plugin.pay.alipay.appid': 'AlipayAppID',
  'plugin.pay.alipay.private-key': 'AlipayPrivateKey',
  'plugin.pay.alipay.cert-path': 'Aplicar certificado de chave pública',
  'plugin.pay.alipay.root-cert-path': 'Certificado raiz Alipay',
  'plugin.pay.alipay.public-cert-path': 'Certificado de chave pública Alipay',
  'plugin.push.engine': 'mecanismo de busca',
  'plugin.push.result': 'Impulsionar resultados',
  'plugin.push.name': 'nome',
  'plugin.push.code': 'código',
  'plugin.push.tips':
    'A função push do mecanismo de pesquisa suporta push ativo por pesquisa Baidu e pesquisa Bing. Embora outros mecanismos de pesquisa não tenham função push ativa, alguns mecanismos de pesquisa ainda podem usar push JS.',
  'plugin.push.view-log': 'Ver registros de push recentes',
  'plugin.push.baidu': 'Impulso proativo de pesquisa do Baidu',
  'plugin.push.bing': 'Push proativo de pesquisa do Bing',
  'plugin.push.api-link': 'Endereço da interface push',
  'plugin.push.baidu.api-link.description':
    'Por exemplo: http://data.zz.baidu.com/urls?site=https://www.anqicms.com&token=DTHpH8Xn99BrJLBY',
  'plugin.push.bing.api-link.description':
    'Por exemplo: http://data.zz.baidu.com/urls?site=https://www.anqicms.com&token=DT Por exemplo: https://ssl.bing.com/webmaster/api.svc/json /SubmitUrlbatch ?apikey=sampleapikeyEDECC1EA4AE341CC8B6 (observe que esta APIkey está definida nas configurações no canto superior direito da ferramenta Bing)',
  'plugin.push.google': 'JSON da chave da conta do Google',
  'plugin.push.google.json': 'Conteúdo JSON',
  'plugin.push.google.description':
    'Não disponível no mercado interno. Consulte o documento para obter JSON: https://www.anqicms.com/google-indexing-help.html',
  'plugin.push.other-js': '360/Toutiao e outros JS enviam automaticamente',
  'plugin.push.other-js.add': 'Adicionar código JS',
  'plugin.push.other-js.tips1':
    'Você pode colocar códigos JS, como envio automático Baidu JS, inclusão automática 360 e inclusão automática Toutiao.',
  'plugin.push.other-js.tips2':
    'Esses códigos precisam ser chamados manualmente no modelo. Por favor, adicione o código `{{- pluginJsCode|safe }}` no final do modelo público para chamar.',
  'plugin.push.other-js.tips3':
    'Janelas pop-up, como mensagens/comentários, carregarão automaticamente esses códigos JS.',
  'plugin.push.other-js.name': 'nome de código',
  'plugin.push.other-js.name.placeholder': 'Tais como: estatísticas do Baidu',
  'plugin.push.other-js.code': 'Código JS',
  'plugin.push.other-js.code.placeholder': 'Precisa incluir o final',
  'plugin.redirect.import': 'Link de importação',
  'plugin.redirect.import.tips':
    'Nota: Somente arquivos no formato csv são suportados para upload e importação.',
  'plugin.redirect.import.step1':
    'A primeira etapa é baixar o arquivo de modelo csv',
  'plugin.redirect.import.step1.download': 'Baixe o arquivo de modelo csv',
  'plugin.redirect.import.step2':
    'A segunda etapa é fazer upload do arquivo csv',
  'plugin.redirect.import.step2.upload': 'Carregar arquivo csv',
  'plugin.redirect.edit': 'Editar link',
  'plugin.redirect.add': 'Adicionar um link',
  'plugin.redirect.from-url': 'Link da fonte',
  'plugin.redirect.to-url': 'Link de salto',
  'plugin.redirect.from-url.description':
    'Pode ser um endereço absoluto começando com `http(https)` ou um endereço relativo começando com `/`',
  'plugin.redirect.delete.confirm':
    'Tem certeza de que deseja excluir o link selecionado?',
  'plugin.replace.add.required':
    'Preencha as palavras-chave de origem substitutas',
  'plugin.replace.place.required': 'Selecione um local alternativo',
  'plugin.replace.keyword.required': 'Adicione regras de substituição',
  'plugin.replace.confirm':
    'Tem certeza de que deseja realizar uma substituição completa do site?',
  'plugin.replace.tips':
    'A substituição de todo o site é uma operação avançada e podem ocorrer erros de substituição. É recomendável realizar um backup do conteúdo antes da substituição.',
  'plugin.replace.replace-tag': 'Se deve substituir o conteúdo do rótulo',
  'plugin.replace.place': 'substituir posição',
  'plugin.replace.keyword': 'Regras de substituição',
  'plugin.replace.add': 'Adicionar regras de substituição',
  'plugin.replace.place.setting': 'Configurações de plano de fundo',
  'plugin.replace.place.archive': 'documento',
  'plugin.replace.place.category': 'Página de categoria',
  'plugin.replace.place.tag': 'Marcação',
  'plugin.replace.place.anchor': 'Eu não sei',
  'plugin.replace.place.keyword': 'Palavras-chave',
  'plugin.replace.place.comment': 'Comente',
  'plugin.replace.place.attachment': 'Recursos de imagem',
  'plugin.retailer.setting': 'configuração de distribuição',
  'plugin.retailer.allow-self':
    'Distribuidores ganham comissões por suas próprias compras',
  'plugin.retailer.allow-self.description':
    'Se a comissão de autocompra estiver ativada, o distribuidor poderá obter a comissão correspondente se ele próprio comprar os produtos distribuídos. Se estiver desativada, o distribuidor não poderá obter a comissão se ele próprio comprar os produtos distribuídos. Se você se tornar automaticamente um distribuidor, não habilite a comissão de autocompra.',
  'plugin.retailer.allow-self.no': 'fecho',
  'plugin.retailer.allow-self.yes': 'ligar',
  'plugin.retailer.become-retailer': 'Como se tornar um distribuidor',
  'plugin.retailer.become-retailer.manual': 'Processamento manual',
  'plugin.retailer.become-retailer.auto': 'automaticamente se tornar',
  'plugin.retailer.become-retailer.description':
    'Se você escolher o processamento manual, será necessário configurá-lo no gerenciamento de usuários.',
  'plugin.retailer.cancel.confirm':
    'Tem certeza de que deseja cancelar a qualificação de distribuidor deste usuário?',
  'plugin.retailer.cancel.content':
    'Se o limite do distribuidor for tornar-se automaticamente um distribuidor, o cancelamento será inválido.',
  'plugin.retailer.user-id': 'ID do usuário',
  'plugin.retailer.user-name': 'nome de usuário',
  'plugin.retailer.real-name': 'nome real',
  'plugin.retailer.balance': 'Saldo do usuário',
  'plugin.retailer.total-reward': 'Renda acumulada',
  'plugin.retailer.create-time': 'Hora de adesão',
  'plugin.retailer.change-name': 'Alterar nome verdadeiro',
  'plugin.retailer.cancel': 'Cancelar',
  'plugin.retailer.add': 'Adicionar distribuidor',
  'plugin.retailer.add.name':
    'Preencha o ID do usuário e configure o distribuidor',
  'plugin.retailer.change-name.new': 'novo nome verdadeiro',
  'plugin.rewrite.formula.archive-detail': 'Detalhes do documento:',
  'plugin.rewrite.formula.archive-list': 'Lista de documentos:',
  'plugin.rewrite.formula.module-index': 'Página inicial do modelo:',
  'plugin.rewrite.formula.page-detail': 'Detalhes de página única:',
  'plugin.rewrite.formula.tag-list': 'Lista de tags:',
  'plugin.rewrite.formula.tag-detail': 'Detalhes da etiqueta:',
  'plugin.rewrite.formula1': 'Opção 1: modo digital (simples, recomendado)',
  'plugin.rewrite.formula2':
    'Opção 2: padrão de nomenclatura 1 (inglês ou pinyin)',
  'plugin.rewrite.formula3':
    'Opção 3: padrão de nomenclatura 2 (inglês ou pinyin + números)',
  'plugin.rewrite.formula4':
    'Opção 4: padrão de nomenclatura 3 (inglês ou pinyin)',
  'plugin.rewrite.formula5':
    'Opção 5: Modo personalizado (modo avançado, use-o com cuidado, se estiver configurado incorretamente, a página inicial não abrirá)',
  'plugin.rewrite.setting': 'Configurações do esquema pseudoestático',
  'plugin.rewrite.setting.select': 'Escolha uma solução pseudoestática',
  'plugin.rewrite.setting.diy': 'Regras pseudoestáticas personalizadas',
  'plugin.rewrite.setting.diy.explain':
    'Descrição da regra pseudoestática personalizada',
  'plugin.rewrite.setting.diy.tips':
    'Copie as seguintes regras na caixa de entrada para modificar. Existem 6 linhas no total, ou seja, detalhes do documento, lista de documentos, página inicial do modelo, página, lista de tags e detalhes de tags. === e a parte anterior não pode ser modificada.',
  'plugin.rewrite.variable.tips':
    'Variáveis ​​​​são colocadas entre chaves `{}`, como `{id}`. As variáveis ​​​​disponíveis são: ID de dados `{id}`; nome do link personalizado do documento `{filename}`, nome do link personalizado de classificação multinível `{multicatname}`, `{ Apenas um dos multicatname}` e `{catname}` podem ser usados; ID de classificação `{catid}`; nome da tabela do modelo `{module}`; , hora `{hora}`, minuto `{minuto}`, segundo `{segundo}`, ano, mês, dia, hora, minuto e segundo estão disponíveis apenas no arquivo paginação número da página `{page}`, paginação; precisa ser colocado entre parênteses, como: `(/{page})` .',
  'plugin.rewrite.formula.direct1': 'Solução pronta para uso 1',
  'plugin.rewrite.formula.direct2': 'Solução pronta para uso 2',
  'plugin.rewrite.formula.direct3': 'Solução pronta para uso 3',
  'plugin.rewrite.formula.direct4': 'Solução pronta para uso 4',
  'plugin.robots.tips.before':
    'Robôs são a configuração de um site que informa aos spiders dos mecanismos de pesquisa quais páginas podem ser rastreadas e quais não podem ser rastreadas. P:',
  'plugin.robots.tips.after': 'Formato do arquivo robots.txt',
  'plugin.robots.content': 'Conteúdo de robôs',
  'plugin.robots.content.tips1':
    '1. Robots.txt pode informar ao Baidu quais páginas do seu site podem ser rastreadas e quais páginas não podem ser rastreadas.',
  'plugin.robots.content.tips2':
    '2. Você pode usar a ferramenta Robots para criar, verificar e atualizar seu arquivo robots.txt.',
  'plugin.robots.view': 'Ver robôs',
  'plugin.sendmail.setting': 'Configurações de e-mail',
  'plugin.sendmail.server': 'Servidor SMTP',
  'plugin.sendmail.server.description':
    'Por exemplo, a caixa de correio QQ é smtp.qq.com',
  'plugin.sendmail.use-ssl': 'Utilizar SSL/TLS',
  'plugin.sendmail.use-ssl.no': 'Não use',
  'plugin.sendmail.port': 'Porta SMTP',
  'plugin.sendmail.port.description':
    'A porta padrão do servidor é 25, a porta padrão ao usar o protocolo SSL é 465 e a porta padrão ao usar o protocolo TLS é 587. Peça parâmetros detalhados ao seu provedor de serviços de e-mail.',
  'plugin.sendmail.account': 'Conta SMTP',
  'plugin.sendmail.account.description':
    'O padrão é a conta de e-mail, como seu e-mail QQ, como 123456@qq.com',
  'plugin.sendmail.password': 'Senha SMTP',
  'plugin.sendmail.password.description':
    'Código de autorização gerado nas configurações de e-mail.',
  'plugin.sendmail.recipient': 'E-mail do destinatário',
  'plugin.sendmail.recipient.required': 'Configure seu e-mail primeiro',
  'plugin.sendmail.recipient.description':
    'Por padrão, ele é enviado ao remetente. Se você precisar enviá-lo para outras pessoas, preencha aqui. Use vírgulas para separar vários destinatários.',
  'plugin.sendmail.auto-reply': 'Responder automaticamente aos clientes',
  'plugin.sendmail.auto-reply.no': 'Sem resposta',
  'plugin.sendmail.auto-reply.yes': 'resposta automática',
  'plugin.sendmail.auto-reply.description':
    'Se a resposta automática aos clientes estiver ativada, quando o cliente deixar uma mensagem, um e-mail de resposta automática será enviado automaticamente para o endereço de e-mail preenchido pelo cliente.',
  'plugin.sendmail.auto-reply.title': 'Título da resposta automática',
  'plugin.sendmail.auto-reply.title.description':
    'Preencha o título da resposta automática',
  'plugin.sendmail.auto-reply.message': 'Conteúdo de resposta automática',
  'plugin.sendmail.auto-reply.message.description':
    'Preencha o conteúdo da resposta automática',
  'plugin.sendmail.send-type': 'Enviar cena',
  'plugin.sendmail.send-type.guestbook': 'Há novas mensagens no site',
  'plugin.sendmail.send-type.report': 'site diário diariamente',
  'plugin.sendmail.send-type.new-order': 'Há novos pedidos no site',
  'plugin.sendmail.send-type.pay-order':
    'Existe uma ordem de pagamento no site',
  'plugin.sendmail.send-type.description':
    'Uma vez selecionado, os e-mails serão enviados no cenário selecionado.',
  'plugin.sendmail.test.sending': 'Enviando e-mail de teste',
  'plugin.sendmail.send-time': 'Hora de envio',
  'plugin.sendmail.subject': 'título do e-mail',
  'plugin.sendmail.status': 'enviar status',
  'plugin.sendmail.tips':
    'Os lembretes por e-mail podem enviar mensagens do site para sua caixa de correio por e-mail.',
  'plugin.sendmail.test.send': 'Enviar e-mail de teste',
  'plugin.sitemap.tips1':
    'Hoje em dia, todos os principais mecanismos de pesquisa oferecem suporte a mapas de sites no formato txt ao enviar mapas de sites, e o tamanho dos arquivos de mapas de sites txt é menor do que os arquivos de mapas de sites xml. Portanto, é recomendado usar mapas de sites no formato txt.',
  'plugin.sitemap.tips2':
    'Como o envio de mapa de site de cada mecanismo de pesquisa é limitado a 50.000 itens ou 10 milhões de tamanho, esta função de mapa de site gerará um arquivo de mapa de site com 50.000 itens.',
  'plugin.sitemap.type': 'Formato do mapa do site',
  'plugin.sitemap.auto-build': 'Método de geração de mapa de site',
  'plugin.sitemap.auto-build.manual': 'Manual',
  'plugin.sitemap.auto-build.auto': 'automático',
  'plugin.sitemap.exclude-tag': 'Geração de tags de documento Sitemap',
  'plugin.sitemap.exclude-tag.no': 'gerar',
  'plugin.sitemap.exclude-tag.yes': 'Não gerado',
  'plugin.sitemap.exculde-module': 'Modelos de documentos excluídos',
  'plugin.sitemap.exculde-module.description':
    'Se quiser excluir determinados modelos de documentos, você pode selecioná-los aqui',
  'plugin.sitemap.exculde-category': 'Categorias excluídas',
  'plugin.sitemap.exculde-category.description':
    'Se quiser excluir determinadas categorias, você pode escolher aqui',
  'plugin.sitemap.exculde-page': 'Página única excluída',
  'plugin.sitemap.exculde-page.description':
    'Se quiser excluir certas páginas únicas, você pode escolher aqui',
  'plugin.sitemap.action': 'operação manual',
  'plugin.sitemap.action.tips':
    'Dica: Depois de modificar a configuração do Sitemap, gere-o manualmente para que a configuração entre em vigor.',
  'plugin.sitemap.last-time': 'Hora da última geração',
  'plugin.sitemap.build': 'Gerar mapa do site manualmente',
  'plugin.sitemap.view': 'Ver mapa do site',
  'plugin.storage.tips':
    'A troca de métodos de armazenamento de recursos não sincronizará automaticamente os recursos carregados anteriormente. Geralmente, não é recomendado trocar os métodos de armazenamento durante o uso.',
  'plugin.storage.base': 'Configuração básica',
  'plugin.storage.type': 'Método de armazenamento',
  'plugin.storage.type.local': 'armazenamento local',
  'plugin.storage.url': 'Endereço do recurso',
  'plugin.storage.keep-local': 'arquivo local',
  'plugin.storage.keep-local.no': 'Não retido',
  'plugin.storage.keep-local.yes': 'reserva',
  'plugin.storage.keep-local.description':
    'Ao usar o armazenamento em nuvem, você pode optar por manter os arquivos locais',
  'plugin.timefactor.module.required':
    'Selecione pelo menos um modelo de documento',
  'plugin.timefactor.types.required':
    'Selecione pelo menos um tipo de atualização',
  'plugin.timefactor.start-day.required':
    'O tempo que aciona a atualização não pode ser 0',
  'plugin.timefactor.end-day.error':
    'O horário do resultado da atualização não pode ser anterior ao horário do acionador da atualização',
  'plugin.timefactor.tips':
    'A função de publicação programada pelo fator tempo do documento oferece a capacidade de atualizar regularmente o horário do documento. Você pode definir determinados documentos para serem atualizados automaticamente para o horário mais recente de forma programada, e os documentos em rascunhos podem ser publicados regularmente de acordo com o horário definido. O programa tentará verificar atualizações a cada hora.',
  'plugin.timefactor.setting':
    'Configurações de liberação programada por fator de tempo do documento',
  'plugin.timefactor.open':
    'Se deve ativar atualizações de horário de documentos antigos',
  'plugin.timefactor.open.no': 'não',
  'plugin.timefactor.open.yes': 'habilitar',
  'plugin.timefactor.types': 'Tipo de atualização',
  'plugin.timefactor.types.created-time': 'hora de lançamento',
  'plugin.timefactor.types.updated-time': 'Tempo de atualização',
  'plugin.timefactor.types.description': 'Escolha pelo menos um',
  'plugin.timefactor.start-day': 'Ultrapassarem',
  'plugin.timefactor.start-day.suffix': 'Documentos de dias atrás,',
  'plugin.timefactor.start-day.description':
    'Por exemplo: 30, preencha o número inteiro',
  'plugin.timefactor.start-day.placeholder': 'Tais como: 30',
  'plugin.timefactor.end-day': 'Atualizar automaticamente para',
  'plugin.timefactor.end-day.placeholder': 'Tais como: 1',
  'plugin.timefactor.end-day.suffix': 'tempo em dias',
  'plugin.timefactor.end-day.description':
    'Se você preencher 0, significa que será atualizado para o dia atual.',
  'plugin.timefactor.daily-update': 'Máximo de atualizações por dia',
  'plugin.timefactor.daily-update.placeholder': 'Por exemplo: 100',
  'plugin.timefactor.daily-update.suffix': 'artigo',
  'plugin.timefactor.daily-update.description':
    'Recomenda-se preencher um valor maior que 0, caso contrário todos os artigos elegíveis serão atualizados',
  'plugin.timefactor.republish': 'Se deve re-empurrar',
  'plugin.timefactor.republish.no': 'não',
  'plugin.timefactor.republish.yes': 'sim',
  'plugin.timefactor.republish.description':
    'Ao atualizar o documento, reenvie-o para testar os mecanismos de pesquisa.',
  'plugin.timefactor.release-draft':
    'Se deve ativar a publicação automática de documentos de rascunho de caixa',
  'plugin.timefactor.release-draft.no': 'não',
  'plugin.timefactor.release-draft.yes': 'habilitar',
  'plugin.timefactor.daily-limit': 'Número de lançamentos automáticos por dia',
  'plugin.timefactor.daily-limit.suffix': 'Capítulo',
  'plugin.timefactor.daily-limit.description':
    'Após a configuração, publique um número específico de artigos da caixa de rascunho todos os dias, o padrão é 100',
  'plugin.timefactor.daily-limit.placeholder': 'Tais como: 30',
  'plugin.timefactor.start-time': 'Horário de início da publicação diária',
  'plugin.timefactor.start-time.placeholder': 'Tais como: 8',
  'plugin.timefactor.start-time.suffix': 'apontar',
  'plugin.timefactor.start-time.description':
    'Por exemplo: 8, então todos os dias começam às 8 horas',
  'plugin.timefactor.end-time': 'Fim do tempo',
  'plugin.timefactor.end-time.placeholder': 'Tais como: 18',
  'plugin.timefactor.end-time.description':
    'Se você preencher 0, significa que terminará às 23:00',
  'plugin.timefactor.module': 'Modelo aberto',
  'plugin.timefactor.category': 'Categorias que não participam de atualizações',
  'plugin.timefactor.category.placeholder':
    'Se quiser excluir determinadas categorias, você pode escolher aqui',
  'plugin.titleimage.open': 'Configuração automática de imagem de título',
  'plugin.titleimage.open.no': 'fecho',
  'plugin.titleimage.open.yes': 'ligar',
  'plugin.titleimage.open.description':
    'Quando habilitado, quando o documento não possui imagem, uma imagem contendo o título do documento será gerada automaticamente como imagem em miniatura do documento.',
  'plugin.titleimage.draw-sub':
    'Se deve gerar uma imagem de título secundária para o documento',
  'plugin.titleimage.draw-sub.description':
    'Após ligá-lo, quando o documento não possuir imagem, uma imagem será gerada automaticamente para a tag h2 do documento e inserida no documento.',
  'plugin.titleimage.size': 'Gerar tamanho de imagem',
  'plugin.titleimage.width': 'Largura de pixel',
  'plugin.titleimage.width.placeholder':
    'Se deve gerar um texto com padrão de 800 títulos secundários e imagens',
  'plugin.titleimage.height': 'Altura dos pixels',
  'plugin.titleimage.height.placeholder': 'Padrão 600',
  'plugin.titleimage.color': 'cor da fonte',
  'plugin.titleimage.color.default': 'Branco padrão',
  'plugin.titleimage.color_bg': 'Font background color',
  'plugin.titleimage.color_bg.default': 'Default colorless',
  'plugin.titleimage.select': 'escolher',
  'plugin.titleimage.font-size': 'Tamanho de texto padrão',
  'plugin.titleimage.font-size.placeholder': 'Padrão 32',
  'plugin.titleimage.noise': 'Adicionar pontos de interferência',
  'plugin.titleimage.noise.no': 'não adicionado',
  'plugin.titleimage.noise.yes': 'adicionar à',
  'plugin.titleimage.noise.description':
    'Só funciona se o plano de fundo padrão for usado',
  'plugin.titleimage.bg-image': 'plano de fundo personalizado',
  'plugin.titleimage.bg-image.description':
    'Você pode personalizar o plano de fundo. Se não carregar um plano de fundo personalizado, o sistema gerará automaticamente um plano de fundo de cor sólida.',
  'plugin.titleimage.bg-image.upload': 'Enviar Imagem',
  'plugin.titleimage.font': 'Fonte personalizada',
  'plugin.titleimage.font.upload': 'Carregar fonte .ttf',
  'plugin.titleimage.preview.text': 'Visualizar texto',
  'plugin.titleimage.preview.text.edit': 'Modificar texto de visualização',
  'plugin.transfer.provider.required': 'Selecione um sistema de site',
  'plugin.transfer.token.required':
    'Por favor preencha o Token de comunicação, que pode ser qualquer caractere',
  'plugin.transfer.base-url.required': 'Por favor preencha o endereço do site',
  'plugin.transfer.signal.error': 'Erro de comunicação',
  'plugin.transfer.signal.success': 'Comunicação bem sucedida',
  'plugin.transfer.transfering': 'Executando',
  'plugin.transfer.tips':
    'Atualmente, o conteúdo do site DedeCMS / WordPress / PbootCMS / EmpireCMS tem suporte para migração para anqicms.',
  'plugin.transfer.step1': 'Primeiro passo',
  'plugin.transfer.step2': 'Passo 2',
  'plugin.transfer.step3': 'terceiro passo',
  'plugin.transfer.step4': 'o quarto passo',
  'plugin.transfer.step5': 'o quinto passo',
  'plugin.transfer.step1.description':
    'Selecione o sistema do site que precisa ser migrado',
  'plugin.transfer.step2.description':
    'Baixe o arquivo da interface de comunicação',
  'plugin.transfer.step3.description':
    'Preencha as informações de comunicação do site',
  'plugin.transfer.step4.description': 'Selecione o que migrar',
  'plugin.transfer.step5.description': 'Comece a transferir o conteúdo do site',
  'plugin.transfer.step.prev': 'Anterior',
  'plugin.transfer.step.next': 'Próxima Etapa',
  'plugin.transfer.step.download': 'download',
  'plugin.transfer.step2.tips':
    'Faça upload do arquivo baixado para o diretório raiz do seu site. Após baixá-lo e colocá-lo no diretório raiz do seu site, clique em Avançar para continuar.',
  'plugin.transfer.step3.tips':
    'Apenas um token pode ser configurado para cada site. Se você receber um erro, exclua manualmente anqicms.config.php no diretório raiz do site para configurá-lo novamente.',
  'plugin.transfer.base-url': 'endereço do website',
  'plugin.transfer.base-url.placeholder': 'URL começando com http ou https',
  'plugin.transfer.token': 'Token de comunicação',
  'plugin.transfer.token.placeholder': 'Pode ser qualquer personagem',
  'plugin.transfer.step4.tips':
    'Por padrão, tudo é migrado. Você pode optar por migrar apenas algumas partes dele.',
  'plugin.transfer.types': 'Selecione o que migrar',
  'plugin.transfer.module': 'Selecione um modelo de migração',
  'plugin.transfer.step5.tips':
    'Durante o processo de migração, não atualize esta página.',
  'plugin.transfer.base-url.name': 'Sites que precisam ser transferidos:',
  'plugin.transfer.status': 'Status atual da tarefa:',
  'plugin.transfer.status.finished': 'concluído',
  'plugin.transfer.status.doing': 'em andamento',
  'plugin.transfer.status.wait': 'não começou',
  'plugin.transfer.current-task': 'Progresso da tarefa atual: Migrando',
  'plugin.transfer.current-task.count': ',A quantidade de dados:',
  'plugin.transfer.task-error': 'Erro de tarefa:',
  'plugin.transfer.restart': 'reiniciar',
  'plugin.transfer.start': 'Iniciar migração',
  'plugin.user.setting': 'Configurações de campos adicionais do usuário',
  'plugin.user.setting.new': 'Adicionar campo',
  'plugin.user.setting.name.description': 'Tais como: QQ, WeChat ID, etc.',
  'plugin.user.edit': 'Modificar usuário',
  'plugin.user.add': 'Adicionar usuário',
  'plugin.user.avatar_url': 'User avatar',
  'plugin.user.introduce': 'User introduction',
  'plugin.user.user-name': 'nome de usuário',
  'plugin.user.real-name': 'nome real',
  'plugin.user.phone': 'Número de telefone',
  'plugin.user.email': 'endereço de email',
  'plugin.user.password': 'senha',
  'plugin.user.password.description':
    'Caso necessite alterar a senha deste usuário, preencha-a aqui, com no mínimo 6 caracteres',
  'plugin.user.is-retailer': 'É um distribuidor?',
  'plugin.user.is-retailer.no': 'não',
  'plugin.user.is-retailer.yes': 'sim',
  'plugin.user.invite-code': 'Código de Convite',
  'plugin.user.invite-code.description': 'Por favor, não mude à vontade',
  'plugin.user.parent.user-id': 'ID de usuário superior',
  'plugin.user.group': 'Grupo de usuários VIP',
  'plugin.user.group.all': 'Todos os grupos',
  'plugin.user.expire': 'O grupo de usuários expira',
  'plugin.user.expire.description':
    'Após a expiração, o grupo de usuários retornará ao primeiro grupo',
  'plugin.user.extra-fields': 'campos extras',
  'plugin.user.extra-fields.default': 'valor padrão:',
  'plugin.user.delete.confirm': 'Tem certeza de que deseja excluir este dado?',
  'plugin.watermark.generate.confirm':
    'Tem certeza de que deseja adicionar marca d’água a todas as imagens da biblioteca de imagens?',
  'plugin.watermark.generate.content':
    "Imagens com marca d'água não serão adicionadas novamente.",
  'plugin.watermark.open': "Se deve ativar a marca d'água",
  'plugin.watermark.open.no': 'fecho',
  'plugin.watermark.open.yes': 'ligar',
  'plugin.watermark.open.description':
    "Quando ativado, marcas d'água serão adicionadas automaticamente às imagens enviadas.",
  'plugin.watermark.type': "Tipo de marca d'água",
  'plugin.watermark.type.image': "Marca d'água de imagem",
  'plugin.watermark.type.text': "marca d'água de texto",
  'plugin.watermark.image': "imagem de marca d'água",
  'plugin.watermark.text': "texto de marca d'água",
  'plugin.watermark.position': "posição da marca d'água",
  'plugin.watermark.position.center': 'Centro',
  'plugin.watermark.position.left-top': 'canto superior esquerdo',
  'plugin.watermark.position.right-top': 'canto superior direito',
  'plugin.watermark.position.left-bottom': 'canto inferior esquerdo',
  'plugin.watermark.position.right-bottom': 'canto inferior direito',
  'plugin.watermark.size': "Tamanho da marca d'água",
  'plugin.watermark.opacity': 'transparência de marca d’água',
  'plugin.watermark.batch-add':
    "Adicione marcas d'água às imagens da biblioteca de imagens em lotes",
  'plugin.watermark.min-size': 'Imagem mínima de marca d’água',
  'plugin.watermark.min-size.suffix': 'Pixel',
  'plugin.watermark.min-size.description':
    'Imagens cujo comprimento e largura sejam menores que esse tamanho não serão adicionadas com marca d’água.',
  'plugin.weapp.appid': 'Miniprograma AppID',
  'plugin.weapp.app-secret': 'MiniprogramaAppSecret',
  'plugin.weapp.push.setting': 'Configuração de envio de mensagem',
  'plugin.weapp.server-url': 'endereço do servidor',
  'plugin.weapp.token': 'Token da conta de serviço',
  'plugin.weapp.encoding-aes-key': 'Número de serviçoEncodingAESKey',
  'plugin.weapp.encoding-aes-key.description':
    'Se o método de criptografia e descriptografia da mensagem for o modo de texto simples, não preencha este campo, caso contrário, um erro será relatado.',
  'plugin.weapp.default': 'Miniaplicativo padrão',
  'plugin.weapp.default.tips':
    'O miniprograma padrão do AnQiCMS também suporta o miniprograma inteligente Baidu, o miniprograma WeChat, o miniprograma QQ, o miniprograma Alipay e o miniprograma Toutiao.',
  'plugin.weapp.default.help': 'Ajuda sobre como usar o miniprograma:',
  'plugin.weapp.default.source':
    'Endereço do código-fonte do miniprograma: https://github.com/fesiong/anqicms-app/releases',
  'plugin.weapp.default.download': 'Baixe o miniaplicativo padrão',
  'plugin.wechat.menu.delete.confirm':
    'Tem certeza de que deseja excluir este menu?',
  'plugin.wechat.menu.submit.error': 'Erro de envio',
  'plugin.wechat.menu.submit.confirm':
    'Tem certeza de que deseja atualizar o menu oficial da conta?',
  'plugin.wechat.menu.submit.content':
    'Esta operação sincronizará o menu recém-definido com o servidor WeChat.',
  'plugin.wechat.menu.name': 'Nome do cardápio',
  'plugin.wechat.menu.type': 'tipo',
  'plugin.wechat.menu.type.click': 'Menu de texto',
  'plugin.wechat.menu.type.view': 'menu de links',
  'plugin.wechat.menu.value': 'valor',
  'plugin.wechat.menu.value.description':
    'Preencha o texto do menu de texto e o endereço URL do menu do link, com no máximo 128 caracteres.',
  'plugin.wechat.menu': 'Menu do WeChat',
  'plugin.wechat.menu.tips':
    'Nota: Há um máximo de 3 menus de primeiro nível e um máximo de 5 menus de segundo nível para cada menu de primeiro nível.',
  'plugin.wechat.menu.submit': 'Atualizar menu oficial da conta',
  'plugin.wechat.menu.add': 'Adicionar cardápio',
  'plugin.wechat.menu.top': 'menu de cima',
  'plugin.wechat.sort.description':
    'Quanto menor o valor, maior será a classificação.',
  'plugin.wechat.reply': 'responder',
  'plugin.wechat.reply.delete.confirm':
    'Tem certeza de que deseja excluir este dado?',
  'plugin.wechat.reply.keyword': 'Palavras-chave',
  'plugin.wechat.reply.content': 'Responder conteúdo',
  'plugin.wechat.reply.content.description': 'Se quiser responder, digite aqui',
  'plugin.wechat.reply.time': 'Tempo de resposta',
  'plugin.wechat.reply.default': 'Resposta padrão',
  'plugin.wechat.reply.default.yes': 'sim',
  'plugin.wechat.reply.default.description':
    'Após selecionar como resposta padrão, caso a palavra-chave não corresponda, este conteúdo será respondido',
  'plugin.wechat.reply.default.set-no': 'não',
  'plugin.wechat.reply.default.set-yes': 'definir como padrão',
  'plugin.wechat.reply.rule': 'Regras de resposta automática',
  'plugin.wechat.reply.rule.add': 'Adicionar regras',
  'plugin.wechat.reply.rule.edit': 'Adicionar regras',
  'plugin.wechat.reply.keyword.description':
    'O usuário envia a palavra-chave do gatilho',
  'plugin.wechat.setting': 'Configuração da conta de serviço WeChat',
  'plugin.wechat.appid': 'Conta de serviçoAppID',
  'plugin.wechat.app-secret': 'Conta de serviçoAppSecret',
  'plugin.wechat.verify-setting': 'Configuração do código de verificação',
  'plugin.wechat.verify-key': 'Palavras-chave do código de verificação',
  'plugin.wechat.verify-key.placeholder': 'Padrão: código de verificação',
  'plugin.wechat.verify-key.description':
    'Os usuários podem obter o código de verificação respondendo a esta palavra-chave',
  'plugin.wechat.verify-msg': 'Modelo de informações de código de verificação',
  'plugin.wechat.verify-msg.placeholder':
    'Padrão: código de verificação: {code}, válido por 30 minutos',
  'plugin.wechat.verify-msg.description':
    'Nota: O modelo precisa conter `{code}`',
  'plugin.wechat.auto-reply.setting': 'Configurações de resposta automática',
  'plugin.wechat.menu.setting': 'Configurações do menu',
  'plugin.wechat.official.setting': 'Configurações oficiais da conta',
  'plugin.type.all': 'Todas as funções',
  'plugin.type.normal': 'Funções Comuns',
  'plugin.type.archive': 'Função de documento',
  'plugin.type.user-mall': 'Usuário/shopping',
  'plugin.type.system': 'Funções do sistema',
  'plugin.limiter.open.name': 'Ativar proteção de segurança do site',
  'plugin.limiter.open.false': 'Fechar',
  'plugin.limiter.open.true': 'Abrir',
  'plugin.limiter.description':
    'Depois de ligá-lo, as seguintes configurações entrarão em vigor',
  'plugin.limiter.max_requests': 'Banir IP temporariamente',
  'plugin.limiter.max_requests.prefix':
    'O número de visitas alcançadas nos últimos 5 minutos',
  'plugin.limiter.max_requests.suffix': 'vezes',
  'plugin.limiter.max_requests.description':
    'Se não preenchido, o padrão é 100 vezes',
  'plugin.limiter.block_hours': 'Duração do banimento temporário',
  'plugin.limiter.block_hours.prefix': 'Banimento temporário',
  'plugin.limiter.block_hours.suffix': 'horas',
  'plugin.limiter.block_hours.description':
    'Se não preenchido, o padrão é 1 hora',
  'plugin.limiter.white_ips': 'IP da lista branca',
  'plugin.limiter.white_ips.description':
    'Um por linha, suporta segmentos IP e IP, como: 192.168.2.0/24',
  'plugin.limiter.black_ips': 'IP da lista negra',
  'plugin.limiter.black_ips.description':
    'Um por linha, suporta segmentos IP e IP, como: 192.168.2.0/24',
  'plugin.limiter.block_agents': 'Limitar UserAgent específico',
  'plugin.limiter.block_agents.description':
    'Um por linha, o acesso usando estes UserAgents será negado',
  'plugin.limiter.allow_prefixes': 'Excluir prefixos de caminho específicos',
  'plugin.limiter.allow_prefixes.placeholder': 'como:/api',
  'plugin.limiter.allow_prefixes.description':
    'Um por linha, serão permitidos caminhos contendo esses prefixos',
  'plugin.limiter.is_allow_spider': 'Se permitir spiders',
  'plugin.limiter.is_allow_spider.no': 'Não',
  'plugin.limiter.is_allow_spider.yes': 'Sim',
  'plugin.limiter.is_allow_spider.description':
    'Se sim for selecionado, o acesso do spider será permitido Para não afetar a inclusão do spider, selecione sim',
  'plugin.limiter.blocked_ips': 'IPs temporariamente bloqueados',
  'plugin.limiter.blocked_ips.remove': 'Desbloquear',
  'plugin.limiter.blocked_ips.remove.yes': 'Remover',
  'plugin.limiter.blocked_ips.ended': 'Expirado:',
  'content.multilang.remove.confirm':
    'Tem certeza de que deseja remover este site multilíngue? ',
  'content.multilang.sync.confirm':
    'Tem certeza que deseja sincronizar o conteúdo do site? ',
  'content.multilang.name': 'nome',
  'content.multilang.is-main': 'site principal',
  'content.multilang.domain': 'Nome de domínio',
  'content.multilang.idioma': 'Idioma',
  'content.multilang.sync-time': 'Tempo de sincronização do conteúdo',
  'setting.multilang.sync': 'Conteúdo sincronizado',
  'setting.multilang.login': 'Plano de fundo do login',
  'plugin.multilang.open.name': 'Ativar suporte a sites multilíngues',
  'plugin.multilang.open.false': 'Não',
  'plugin.multilang.open.true': 'Sim',
  'plugin.multilang.open.description':
    'Depois de ativar o suporte a sites multilíngues, você poderá oferecer suporte à exibição em vários idiomas em seu site',
  'plugin.multilang.type': 'Formulário de exibição de vários sites',
  'plugin.multilang.type.domain': 'Nome de domínio independente',
  'plugin.multilang.type.direction': 'Diretório independente',
  'plugin.multilang.type.same-url': 'URL inalterado',
  'plugin.multilang.type.description':
    'Os resultados de exibição são diferentes em diferentes formatos. O formulário de nome de domínio independente é um nome de domínio separado para cada idioma, o formulário de diretório independente é um diretório para cada idioma e o formulário constante de URL. é que todos os idiomas apontam para o mesmo URL',
  'plugin.multilang.default_language': 'Idioma principal do site',
  'plugin.multilang.auto_translate': 'Se traduzir automaticamente',
  'plugin.multilang.auto_translate.false': 'Não',
  'plugin.multilang.auto_translate.true': 'Sim',
  'plugin.multilang.auto_translate.description':
    'A tradução automática é uma função paga, verifique o site oficial para preços específicos',
  'plugin.multilang.sites': 'Lista de sites multilíngues',
  'content.multilang.add': 'Adicionar site',
  'content.multilang.edit': 'Editar site multilíngue',
  'content.multilang.select': 'Selecionar site',
  'content.multilang.select.description':
    'Selecione um site já criado como um site multilíngue',
  'plugin.multilang.language': 'idioma do site',
  'plugin.multilang.syncing': 'Sincronizando',
  'plugin.multilang.icon': 'ícone do site',
  'plugin.translate.lang': 'Traduzir idioma',
  'content.translate.origin-content': 'texto original',
  'plugin.translate.result': 'Resultado da tradução',
  'plugin.translate.tips':
    'A interface de tradução usa a interface oficial por padrão. Tradução Baidu e Tradução Youdao são opcionais e precisam ser configuradas por você mesmo',
  'plugin.translate.view-log': 'Ver registro de tradução',
  'plugin.translate.engine': 'Selecionar interface de tradução',
  'plugin.translate.engine.anqicms': 'Interface oficial',
  'plugin.translate.engine.baidu': 'Baidu Traduzir',
  'plugin.translate.engine.youdao': 'Tradução Youdao',
  'plugin.translate.engine.baidu.app-id': 'APPID',
  'plugin.translate.engine.baidu.app-secret': 'Chave',
  'plugin.translate.engine.youdao.app-id': 'ID do aplicativo',
  'plugin.translate.engine.youdao.app-secret': 'Chave secreta do aplicativo',
  'plugin.translate.engine.deepl': 'Deepl',
  'plugin.translate.engine.deepl.auth-key': 'Auth Key',
  'plugin.translate.logs': 'Registros de tradução',
  'plugin.jsonld.tips.1':
    'Após ligá-lo, o sistema marcará automaticamente os dados estruturados do site no formato JSON-LD e os inserirá na parte inferior da página para que os mecanismos de busca possam entender melhor o conteúdo do site. ',
  'plugin.jsonld.tips.2':
    'Para marcação de dados estruturados suportada pelo Google, consulte a documentação: https://developers.google.com/search/docs/appearance/structured-data/search-gallery',
  'plugin.jsonld.open.name': 'Marcação de dados estruturados abertos',
  'plugin.jsonld.open.false': 'Não',
  'plugin.jsonld.open.true': 'Sim',
  'plugin.jsonld.author': 'Autor padrão',
  'plugin.jsonld.brand': 'Marca padrão',
};
