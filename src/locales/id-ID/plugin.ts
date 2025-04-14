export default {
  'plugin.aigenerate.demand.required':
    'Persyaratan terpadu tidak boleh melebihi 500 karakter.',
  'plugin.aigenerate.checking': 'Memeriksa',
  'plugin.aigenerate.setting': 'Pengaturan penulisan otomatis AI',
  'plugin.aigenerate.isopen': 'Apakah akan menulis secara otomatis',
  'plugin.aigenerate.isopen.no': 'TIDAK',
  'plugin.aigenerate.isopen.yes': 'Secara otomatis menulis sesuai rencana',
  'plugin.aigenerate.language': 'Bahasa penulisan artikel',
  'plugin.aigenerate.double-title': 'Hasilkan judul ganda',
  'plugin.aigenerate.double-title.description': 'Hanya dukungan Tiongkok',
  'plugin.aigenerate.double-split': 'Metode judul ganda',
  'plugin.aigenerate.double-split.bracket': 'Judul utama (subjudul)',
  'plugin.aigenerate.double-split.line': 'Judul-subjudul utama',
  'plugin.aigenerate.double-split.question': 'Judul utama? subjudul',
  'plugin.aigenerate.double-split.comma': 'judul utama, subjudul',
  'plugin.aigenerate.double-split.colon': 'Judul utama: Subjudul',
  'plugin.aigenerate.double-split.random': 'acak',
  'plugin.aigenerate.demand': 'Persyaratan seragam untuk menulis',
  'plugin.aigenerate.demand.description':
    'Dimungkinkan untuk menentukan persyaratan terpadu untuk semua artikel penulisan AI, tidak lebih dari 200 karakter. Biarkan kosong secara default',
  'plugin.aigenerate.source': 'Sumber penulisan AI',
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
  'plugin.aigenerate.openai.valid': 'efisien',
  'plugin.aigenerate.openai.invalid': 'kedaluwarsa',
  'plugin.aigenerate.enter-to-add': 'Tekan enter untuk menambahkan',
  'plugin.aigenerate.spark.description':
    'Percikan alamat aplikasi API model besar',
  'plugin.aigenerate.spark.version': 'Percikan versi model besar',
  'plugin.aigenerate.default-category': 'Kategori artikel penerbitan default',
  'plugin.aigenerate.default-category.description':
    'Jika kata kunci tidak diklasifikasikan ke dalam kategori, artikel yang dikumpulkan akan diklasifikasikan secara acak ke dalam salah satu kategori secara default. Anda harus menetapkan kategori, jika tidak, artikel yang dikumpulkan tidak dapat dikumpulkan secara normal.',
  'plugin.aigenerate.save-type': 'Metode pemrosesan artikel',
  'plugin.aigenerate.save-type.draft': 'Simpan ke kotak draf',
  'plugin.aigenerate.save-type.release': 'Rilis biasa',
  'plugin.aigenerate.start-time': 'waktu mulai setiap hari',
  'plugin.aigenerate.start-time.placeholder':
    'Dimulai pada jam 8 secara default',
  'plugin.aigenerate.start-time.description':
    'Silakan isi angka 0 sampai 23, 0 berarti tidak ada batasnya',
  'plugin.aigenerate.end-time': 'akhir hari',
  'plugin.aigenerate.end-time.placeholder':
    'Berakhir pada pukul 22:00 secara default',
  'plugin.aigenerate.end-time.description':
    'Silakan isi angka 0 sampai 23, 0 berarti tidak ada batasnya',
  'plugin.aigenerate.daily-limit': 'Rilis harian',
  'plugin.aigenerate.daily-limit.description':
    'Jumlah maksimum artikel yang diterbitkan per hari, 0 berarti tidak ada batasan',
  'plugin.aigenerate.insert-image': 'Pemrosesan gambar artikel',
  'plugin.aigenerate.insert-image.default': 'bawaan',
  'plugin.aigenerate.insert-image.diy': 'Sisipkan gambar khusus',
  'plugin.aigenerate.insert-image.category': 'Dari Kategori Gambar',
  'plugin.aigenerate.insert-image.list': 'Daftar gambar yang akan disisipkan',
  'plugin.aigenerate.replace': 'penggantian konten',
  'plugin.aigenerate.replace.tips1':
    'Edit pasangan kata kunci yang perlu diganti, dan penggantian akan otomatis dilakukan saat dokumen diterbitkan.',
  'plugin.aigenerate.replace.tips2':
    'Aturan penggantian mendukung ekspresi reguler jika Anda sudah familiar dengan ekspresi reguler dan tidak dapat mencapai persyaratan penggantian melalui teks biasa, Anda dapat mencoba menggunakan aturan ekspresi reguler untuk menyelesaikan penggantian.',
  'plugin.aigenerate.replace.tips3':
    'Aturan ekspresi regulernya adalah: dimulai dengan { dan diakhiri dengan }, dan tulis kode aturan di tengahnya, misalnya {[0-9]+} untuk mencocokkan angka yang berurutan.',
  'plugin.aigenerate.replace.rules':
    'Beberapa aturan bawaan yang dapat digunakan dengan cepat.',
  'plugin.aigenerate.replace.rule.email': '{alamat email}',
  'plugin.aigenerate.replace.rule.date': '{tanggal}',
  'plugin.aigenerate.replace.rule.time': '{waktu}',
  'plugin.aigenerate.replace.rule.cellphone': '{nomor telepon}',
  'plugin.aigenerate.replace.rule.qq': '{nomor QQ}',
  'plugin.aigenerate.replace.rule.wechat': '{Kami ngobrol dengan nomor}',
  'plugin.aigenerate.replace.rule.website': '{URL}',
  'plugin.aigenerate.replace.notice':
    'Catatan: Penulisan aturan ekspresi reguler yang tidak tepat dapat dengan mudah menyebabkan efek substitusi yang salah. Misalnya, aturan ID WeChat akan memengaruhi integritas alamat email dan URL. Silakan gunakan dengan hati-hati.',
  'plugin.aigenerate.replace.to': 'Ubah dengan',
  'plugin.aigenerate.empty': 'batal',
  'plugin.aigenerate.start': 'Mulai penulisan AI secara manual',
  'plugin.aigenerate.start.confirm':
    'Apakah Anda yakin ingin mulai menulis AI?',
  'plugin.aigenerate.start.description':
    'Ini akan segera mulai menjalankan operasi tugas penulisan AI',
  'plugin.aigenerate.image.category': 'Klasifikasi gambar',
  'plugin.aigenerate.image.category.description':
    'Gambar akan dipilih secara otomatis dari kategori sumber daya gambar yang ditentukan. Jika Anda memilih untuk mencoba pencocokan kata kunci dengan nama gambar, ia akan mencoba mencocokkan kata kunci artikel dengan nama gambar, dan jika pencocokan berhasil, gambar tersebut akan digunakan.',
  'plugin.aigenerate.image.category.default': 'Gambar yang tidak dikategorikan',
  'plugin.aigenerate.image.category.all': 'Semua gambar',
  'plugin.aigenerate.image.category.match':
    'Coba nama gambar yang cocok dengan kata kunci',
  'plugin.aigenerate.type': 'jenis',
  'plugin.aigenerate.type.undefine': 'belum diartikan',
  'plugin.aigenerate.type.generate': 'AI dihasilkan',
  'plugin.aigenerate.type.translate': 'menerjemahkan',
  'plugin.aigenerate.type.pseudo': 'Penulisan ulang AI',
  'plugin.aigenerate.type.media': 'Ditulis ulang oleh media mandiri',
  'plugin.aigenerate.status': 'negara',
  'plugin.aigenerate.waiting': 'Tidak diproses',
  'plugin.aigenerate.doing': 'sedang berlangsung',
  'plugin.aigenerate.finish': 'lengkap',
  'plugin.aigenerate.error': 'Kesalahan',
  'plugin.aigenerate.time': 'waktu',
  'plugin.aigenerate.tips1':
    'Penulisan otomatis AI akan memanggil antarmuka penulisan AI untuk menulis, yang memerlukan pembayaran.',
  'plugin.aigenerate.tips2':
    'Penulisan otomatis AI akan secara otomatis memanggil kata kunci di perpustakaan kata kunci untuk menyelesaikan penulisan, dan menulis artikel untuk setiap kata kunci. Harap pastikan bahwa jumlah artikel dalam database kata kunci mencukupi.',
  'plugin.aigenerate.tips3':
    'Fungsi penulisan otomatis dan pengumpulan artikel AI berbagi perpustakaan kata kunci. Jika kata kunci telah dikumpulkan untuk artikel, kata kunci tersebut tidak lagi digunakan untuk penulisan AI.',
  'plugin.aigenerate.tips4':
    'Artikel yang dihasilkan secara otomatis akan masuk ke manajemen konten.',
  'plugin.anchor.edit': 'Edit teks jangkar',
  'plugin.anchor.new': 'Tambahkan teks jangkar',
  'plugin.anchor.title': 'Nama teks jangkar',
  'plugin.anchor.title.placeholder':
    'Telusuri teks jangkar atau tautan teks jangkar',
  'plugin.anchor.link': 'tautan teks jangkar',
  'plugin.anchor.link.description':
    'Mendukung tautan relatif dan tautan absolut, seperti: /a/123.html atau https://www.anqicms.com/',
  'plugin.anchor.weight': 'Berat teks jangkar',
  'plugin.anchor.weight.description':
    'Silakan masukkan angka, 0-9. Semakin besar angkanya, semakin tinggi bobotnya. Bobot yang lebih tinggi mempunyai prioritas dalam substitusi.',
  'plugin.anchor.import': 'Impor teks jangkar',
  'plugin.anchor.import.description':
    'Catatan: Hanya file dalam format csv yang didukung untuk diunggah dan diimpor.',
  'plugin.anchor.step1': 'Langkah pertama',
  'plugin.anchor.step2': 'Langkah 2',
  'plugin.anchor.step1.download': 'Unduh file templat csv',
  'plugin.anchor.step2.upload': 'Unggah file csv',
  'plugin.anchor.setting': 'Pengaturan teks jangkar',
  'plugin.anchor.density': 'Kepadatan teks jangkar',
  'plugin.anchor.density.description':
    'Misal: setiap 100 kata untuk menggantikan teks jangkar, isi 100, defaultnya adalah 100',
  'plugin.anchor.replace-way': 'Metode penggantian',
  'plugin.anchor.replace-way.auto': 'penggantian otomatis',
  'plugin.anchor.replace-way.manual': 'Penggantian manual',
  'plugin.anchor.replace-way.description':
    'Bagaimana konten menggantikan teks tautan',
  'plugin.anchor.extract': 'Metode ekstraksi',
  'plugin.anchor.extract.auto': 'Ekstraksi otomatis',
  'plugin.anchor.extract.manual': 'Ekstraksi manual',
  'plugin.anchor.extract.description':
    'Pilih cara mengekstrak kata kunci teks jangkar dari tag kata kunci konten',
  'plugin.anchor.delete.confirm':
    'Apakah Anda yakin ingin menghapus teks tautan yang dipilih?',
  'plugin.anchor.batch-update': 'Perbarui teks jangkar secara bertahap',
  'plugin.anchor.export': 'Ekspor teks jangkar',
  'plugin.anchor.export.confirm':
    'Anda yakin ingin mengeksport semua teks anchor?',
  'plugin.anchor.replace': 'mengganti',
  'plugin.anchor.replace.confirm':
    'Anda yakin ingin melakukan operasi teks anchor pembaruan batch?',
  'plugin.anchor.replace-count': 'Waktu penggantian',
  'plugin.backup.confirm':
    'Apakah Anda yakin ingin melakukan pencadangan basis data?',
  'plugin.backup.backuping':
    'Operasi pencadangan data sedang dilakukan, harap tunggu. .',
  'plugin.backup.restore': 'pulih',
  'plugin.backup.restore.confirm':
    'Apakah Anda yakin ingin memulihkan menggunakan cadangan saat ini?',
  'plugin.backup.restore.content':
    'Setelah restorasi, data yang ada akan diganti dengan data cadangan saat ini. Silakan lanjutkan dengan hati-hati.',
  'plugin.backup.restoring':
    'Operasi pemulihan data sedang dilakukan, harap tunggu. .',
  'plugin.backup.delete.confirm':
    'Apakah Anda yakin ingin menghapus bagian data ini?',
  'plugin.backup.download': 'unduh',
  'plugin.backup.download.confirm':
    'Apakah Anda yakin ingin mengunduhnya secara lokal?',
  'plugin.backup.cleanup.confirm':
    'Apakah Anda yakin ingin menghapus data situs web?',
  'plugin.backup.cleaning':
    'Operasi pembersihan sedang berlangsung, harap tunggu. .',
  'plugin.backup.cleanup.tips1':
    'Operasi ini akan menghapus semua artikel. Demi alasan keamanan, pastikan untuk melakukan pencadangan terlebih dahulu jika terjadi keadaan yang tidak terduga.',
  'plugin.backup.cleanup.tips2':
    'Folder Unggahan tidak dibersihkan secara default. Jika Anda perlu membersihkannya, silakan periksa.',
  'plugin.backup.cleanup.upload.false': 'Bukan membersihkan gambar',
  'plugin.backup.cleanup.upload.true': 'Bersihkan gambar yang diunggah',
  'plugin.backup.time': 'Waktu pencadangan',
  'plugin.backup.name': 'Nama cadangan',
  'plugin.backup.size': 'Ukuran cadangan',
  'plugin.backup.new': 'Tambahkan cadangan',
  'plugin.backup.import': 'Impor cadangan lokal',
  'plugin.backup.cleanup': 'Hapus data situs web',
  'plugin.backup.tips':
    'Catatan: Jika file cadangan terlalu besar dan Anda perlu mengunduh file cadangan, silakan gunakan alat FTP untuk mengunduh file cadangan di direktori /data/backup/ dari direktori root situs web.',
  'plugin.collector.setting': 'Pengaturan akuisisi dan penggantian AI',
  'plugin.collector.auto-collect': 'Apakah akan mengumpulkan secara otomatis',
  'plugin.collector.auto-collect.yes': 'Pengumpulan otomatis sesuai rencana',
  'plugin.collector.auto-collect.no': 'TIDAK',
  'plugin.collector.language': 'Kumpulkan bahasa artikel',
  'plugin.collector.mode': 'Modus akuisisi',
  'plugin.collector.mode.article': 'Koleksi artikel',
  'plugin.collector.mode.ask': 'Kombinasi Tanya Jawab',
  'plugin.collector.mode.description':
    'Mode pengumpulan artikel akan mengumpulkan seluruh artikel sesuai dengan teks asli, mode kombinasi Tanya Jawab akan mengumpulkan dan menggabungkannya menjadi artikel dari daftar Tanya Jawab pencarian.',
  'plugin.collector.source': 'sumber khusus',
  'plugin.collector.source.description':
    'Koleksi artikel tersedia, harap diperhatikan bahwa format sumber khusus harus berupa daftar pencarian, dan kata kunci pencarian diwakili oleh %s. Misalnya, tautan pencarian adalah: https://cn.bing.com/search?q= Anqi CMS, lalu " "Anqi CMS" diganti dengan "%s" lalu: https://cn.bing.com/search?q=%s',
  'plugin.collector.category.description':
    'Jika tidak ada kategori yang ditetapkan untuk kata kunci tersebut, artikel yang dikumpulkan akan diklasifikasikan dalam kategori ini secara default.',
  'plugin.collector.category.notice':
    'Kategori harus ditetapkan, jika tidak, pengumpulan normal tidak akan dapat dilakukan',
  'plugin.collector.min-title': 'Jumlah kata minimum untuk judul',
  'plugin.collector.min-title.placeholder': 'Standarnya 10 karakter',
  'plugin.collector.min-title.description':
    'Saat mengumpulkan artikel, jika jumlah kata pada judul kurang dari jumlah kata yang ditentukan, maka tidak akan dikumpulkan.',
  'plugin.collector.min-content': 'Jumlah kata minimum untuk konten',
  'plugin.collector.min-content.placeholder': 'Standarnya 400 kata',
  'plugin.collector.min-content.description':
    'Saat mengumpulkan artikel, jika jumlah kata dalam konten artikel kurang dari jumlah kata yang ditentukan, maka tidak akan dikumpulkan.',
  'plugin.collector.pseudo': 'Apakah AI menulis ulang',
  'plugin.collector.pseudo.no': 'TIDAK',
  'plugin.collector.pseudo.yes': 'Lakukan penulisan ulang AI',
  'plugin.collector.pseudo.description':
    'Penulisan ulang AI hanya mendukung pengumpulan artikel dan kombinasi tanya jawab. Diperlukan biaya.',
  'plugin.collector.translate': 'Apakah akan menerjemahkan',
  'plugin.collector.translate.no': 'TIDAK',
  'plugin.collector.translate.yes': 'Menerjemahkan',
  'plugin.collector.translate.description':
    'Ada biaya untuk penerjemahan. Catatan: Penulisan ulang dan terjemahan AI tidak dapat diaktifkan secara bersamaan, jika tidak, hasilnya akan salah.',
  'plugin.collector.to-language': 'Terjemahkan bahasa target',
  'plugin.collector.to-language.description':
    'Berlaku setelah memilih terjemahan otomatis',
  'plugin.collector.daily-limit': 'Kuantitas koleksi harian',
  'plugin.collector.daily-limit.description':
    'Jumlah maksimal artikel yang dikumpulkan per hari, 0 berarti tidak ada batasan',
  'plugin.collector.insert-image': 'Pengumpulan dan pemrosesan gambar',
  'plugin.collector.insert-image.remove': 'Hapus gambar',
  'plugin.collector.insert-image.contain': 'Simpan gambar aslinya',
  'plugin.collector.insert-image.insert': 'Simpan gambar aslinya',
  'plugin.collector.title-exclude': 'Kata-kata pengecualian judul',
  'plugin.collector.title-exclude.tips':
    'Saat mengumpulkan artikel, jika kata kunci tersebut muncul di judul, maka tidak akan dikumpulkan.',
  'plugin.collector.title-prefix': 'Kecualikan kata-kata di awal judul',
  'plugin.collector.title-prefix.tips':
    'Saat mengumpulkan artikel, jika kata kunci tersebut muncul di awal judul, maka tidak akan dikumpulkan.',
  'plugin.collector.title-suffix': 'Kecualikan kata-kata di akhir judul',
  'plugin.collector.title-suffix.tips':
    'Saat mengumpulkan artikel, jika kata kunci tersebut muncul di akhir judul, maka tidak akan dikumpulkan.',
  'plugin.collector.content-exclude-line': 'baris abaikan konten',
  'plugin.collector.content-exclude-line.tips':
    'Saat mengumpulkan artikel, baris di mana kata-kata ini muncul akan dihapus.',
  'plugin.collector.content-exclude': 'Pengecualian konten',
  'plugin.collector.content-exclude.tips':
    'Saat mengumpulkan artikel, jika kata-kata ini muncul di konten, seluruh artikel akan dibuang.',
  'plugin.collector.link-exclude': 'Tautan diabaikan',
  'plugin.collector.link-exclude.tips':
    'Saat mengumpulkan artikel, jika kata kunci tersebut muncul di tautan, maka artikel tersebut tidak akan dikumpulkan.',
  'plugin.collector.start': 'Mulai pengumpulan secara manual',
  'plugin.collector.start.confirm': 'Apakah Anda yakin ingin mulai mengoleksi?',
  'plugin.collector.start.content':
    'Ini akan segera mulai menjalankan operasi tugas pengumpulan',
  'plugin.collector.tips':
    'Untuk mengumpulkan artikel, Anda perlu menetapkan kata kunci inti terlebih dahulu. Silakan periksa fungsi "Manajemen Basis Data Kata Kunci" dan tambahkan kata kunci yang sesuai.',
  'plugin.collector.replace': 'Ganti kata kunci secara berkelompok',
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
  'plugin.comment.new': 'Tambahkan komentar',
  'plugin.comment.edit': 'Komentar editorial',
  'plugin.comment.item-title': 'Judul dokumen',
  'plugin.comment.time': 'Waktu berkomentar',
  'plugin.comment.ip': 'Komentar IP',
  'plugin.comment.parent': 'Komentar unggul',
  'plugin.comment.user-id': 'identitas pengguna',
  'plugin.comment.user-name': 'nama belakang',
  'plugin.comment.content': 'komentar',
  'plugin.comment.new-status': 'Silakan pilih status baru',
  'plugin.comment.batch-update-status': 'Status pembaruan batch',
  'plugin.comment.view-edit': 'Lihat/Edit',
  'plugin.comment.delete.confirm':
    'Apakah Anda yakin ingin menghapus komentar yang dipilih?',
  'plugin.fileupload.delete.confirm':
    'Apakah Anda yakin ingin menghapus file yang dipilih?',
  'plugin.fileupload.upload.name': 'Unggah file baru',
  'plugin.fileupload.upload.support':
    'Catatan: Hanya file verifikasi dalam format txt/htm/html/xml yang boleh diunggah.',
  'plugin.fileupload.upload.btn': 'unggah berkas',
  'plugin.fileupload.view': 'Memeriksa',
  'plugin.fileupload.create-time': 'Waktu unggah',
  'plugin.finance.commission': 'Manajemen komisi',
  'plugin.finance.withdraw': 'Penarikan manual',
  'plugin.finance.time': 'waktu',
  'plugin.finance.amount': 'Jumlah',
  'plugin.finance.after-amount': 'Jumlah setelah perubahan',
  'plugin.finance.status.unwithdraw': 'Tidak ditarik',
  'plugin.finance.status.withdraw': 'Ditarik',
  'plugin.finance.withdraw.confirm':
    'Apakah Anda yakin ingin memproses penarikan secara manual?',
  'plugin.finance.withdraw.confirm.content':
    'Ini setara dengan mengajukan penarikan dari sisi pengguna.',
  'plugin.finance.order-id': 'Id pemesanan',
  'plugin.finance.direction': 'Arah pendanaan',
  'plugin.finance.direction.in': 'Menghasilkan uang',
  'plugin.finance.direction.out': 'Hunian',
  'plugin.finance.flow': 'Catatan pemasukan dan pengeluaran',
  'plugin.finance.type': 'Jenis dana',
  'plugin.finance.type.sale': 'menjual',
  'plugin.finance.type.buy': 'Membeli',
  'plugin.finance.type.refund': 'Pengembalian dana',
  'plugin.finance.type.charge': 'isi ulang',
  'plugin.finance.type.withdraw': 'menarik',
  'plugin.finance.type.spread': 'promosi',
  'plugin.finance.type.cashback': 'Uang kembali',
  'plugin.finance.type.commission': 'Komisi',
  'plugin.finance.withdraw.finish.confirm':
    'Apakah Anda yakin ingin menyelesaikan penarikan secara manual?',
  'plugin.finance.withdraw.finish.content':
    'Jika Anda telah membayar pengguna secara offline, Anda dapat mengklik di sini untuk menyelesaikannya.',
  'plugin.finance.withdraw.amount': 'Jumlah penarikan',
  'plugin.finance.withdraw.status.waiting': 'Menunggu pemrosesan',
  'plugin.finance.withdraw.status.agree': 'disetujui',
  'plugin.finance.withdraw.status.finish': 'Ditarik',
  'plugin.finance.withdraw.apply-time': 'waktu aplikasi',
  'plugin.finance.withdraw.success-time': 'waktu sukses',
  'plugin.finance.withdraw.agree': 'Setuju untuk menarik uang tunai',
  'plugin.finance.withdraw.finish': 'Penarikan lengkap',
  'plugin.finance.withdraw.name': 'Manajemen penarikan',
  'plugin.finance.withdraw.apply': 'Aplikasi penarikan',
  'plugin.fulltext.tips':
    'After enabling full-text search, you can search for document content. Wukong Search (built-in) will consume a large amount of server memory. If your server memory is small, it is recommended to turn off full-text search or choose other full-text search engines.',
  'plugin.fulltext.open.name':
    'Apakah akan mengaktifkan pencarian teks lengkap',
  'plugin.fulltext.open.false': 'penutup',
  'plugin.fulltext.open.true': 'menyalakan',
  'plugin.fulltext.use_content.false': 'Judul dan pendahuluan saja',
  'plugin.fulltext.use_content.true': 'Sertakan konten dokumen',
  'plugin.fulltext.use_content.name': 'Konten indeks',
  'plugin.fulltext.modules.name': 'Model terbuka',
  'plugin.fulltext.search.name': 'Jenis pencarian',
  'plugin.fulltext.search.archive': 'Pencarian dokumen',
  'plugin.fulltext.search.category': 'Pencarian kategori',
  'plugin.fulltext.search.tag': 'Pencarian tanda',
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
  'plugin.group.edit': 'Ubah grup pengguna',
  'plugin.group.add': 'Tambahkan grup pengguna',
  'plugin.group.name': 'nama',
  'plugin.group.description': 'memperkenalkan',
  'plugin.group.level': 'Tingkat kelompok',
  'plugin.group.level.suffix': 'kelas',
  'plugin.group.level.description':
    'Misal member biasa level 0, anggota perantara level 1, anggota senior level 2, anggota inti level 3, dan seterusnya. Isikan angkanya.',
  'plugin.group.price': 'Harga grup pengguna',
  'plugin.group.price.suffix': 'titik',
  'plugin.group.price.description':
    'Harga yang harus dibayar untuk membeli VIP grup pengguna ini. Perhatikan bahwa unitnya adalah sen.',
  'plugin.group.expire_day': 'Masa berlaku grup pengguna',
  'plugin.group.expire_day.suffix': 'langit',
  'plugin.group.expire_day.description':
    'Setelah pembelian VIP berlaku berapa hari, silahkan isi 365 untuk 1 tahun.',
  'plugin.group.content_safe': 'Keamanan konten',
  'plugin.group.content_safe.no-verify':
    'Komentar/penerbitan konten dikecualikan dari peninjauan',
  'plugin.group.content_safe.no-captcha':
    'Komentar/postingan konten tanpa kode verifikasi',
  'plugin.group.share_reward': 'Masa berlaku grup pengguna',
  'plugin.group.share_reward.description':
    'Disarankan untuk menyetel 5%-20, dan titik desimal tidak dapat disetel. Prioritas rasio komisi: Rasio komisi yang ditetapkan berdasarkan produk > Rasio komisi grup pengguna > Rasio komisi default',
  'plugin.group.parent_reward': 'Rasio hadiah undangan',
  'plugin.group.parent_reward.description':
    'Disarankan untuk menyetel 1%-5%, dan titik desimal tidak dapat disetel. Rasio komisi yang unggul. Distributor a mengundang b untuk menjadi distributor, dan b menjadi penjual berikutnya. Bila b berhasil mempromosikan pesanan, b dapat memperoleh komisi distribusi, dan a hanya mendapat hadiah undangan.',
  'plugin.group.discount': 'Diskon pengguna',
  'plugin.group.discount.description':
    'Disarankan untuk mengatur 90%-100%. Setelah pengguna membuka halaman melalui link yang dibagikan oleh distributor, mereka dapat menikmati harga diskon saat melakukan pemesanan.',
  'plugin.group.permission': 'Pengaturan izin distribusi',
  'plugin.group.delete.confirm':
    'Apakah Anda yakin ingin menghapus bagian data ini?',
  'plugin.guestbook.reply.required':
    'Harap atur pengingat email terlebih dahulu dan cari "Pengingat Email" di fungsinya.',
  'plugin.guestbook.replysubmit.required':
    'Silakan isi judul email dan isi email',
  'plugin.guestbook.replysubmit.success': 'Email berhasil dikirim',
  'plugin.guestbook.view': 'Lihat Pesan',
  'plugin.guestbook.user-name': 'nama belakang',
  'plugin.guestbook.contact': 'Kontak informasi',
  'plugin.guestbook.reply': 'Balasan Surat',
  'plugin.guestbook.content': 'Isi pesan',
  'plugin.guestbook.click-preview': 'Klik untuk melihat pratinjau',
  'plugin.guestbook.refer': 'sumber',
  'plugin.guestbook.create-time': 'Waktu Pesan',
  'plugin.guestbook.reply.subject': 'judul surat',
  'plugin.guestbook.reply.message': 'isi email',
  'plugin.guestbook.field.delete.confirm':
    'Apakah Anda yakin ingin menghapus bidang ini?',
  'plugin.guestbook.field.delete.confirm.content':
    'Anda dapat memulihkan dengan menyegarkan halaman sebelum menyimpan.',
  'plugin.guestbook.setting': 'Pengaturan pesan situs web',
  'plugin.guestbook.return-message': 'Kiat agar pesan berhasil:',
  'plugin.guestbook.return-message.placeholder':
    'Default: Terima kasih atas pesan Anda!',
  'plugin.guestbook.return-message.description':
    'Perintah yang dilihat pengguna setelah mengirimkan pesan. Misalnya: Terima kasih atas pesan Anda!',
  'plugin.guestbook.delete.confirm':
    'Apakah Anda yakin ingin menghapus pesan yang dipilih?',
  'plugin.guestbook.export': 'Ekspor pesan',
  'plugin.guestbook.export.confirm':
    'Anda yakin ingin mengeksport semua pesan?',
  'plugin.htmlcache.remote-file': 'berkas jarak jauh',
  'plugin.htmlcache.local-file': 'file lokal',
  'plugin.htmlcache.push-status': 'status dorong',
  'plugin.htmlcache.push-status.success': 'kesuksesan',
  'plugin.htmlcache.push-status.failure': 'gagal',
  'plugin.htmlcache.re-push': 'Kirim ulang',
  'plugin.htmlcache.push-log': 'catatan dorong',
  'plugin.htmlcache.generate.all.confirm':
    'Apakah Anda yakin ingin membuat cache statis untuk seluruh situs?',
  'plugin.htmlcache.generate.home.confirm':
    'Apakah Anda yakin ingin membuat cache statis pada beranda?',
  'plugin.htmlcache.generate.category.confirm':
    'Apakah Anda yakin ingin membuat cache statis kolom?',
  'plugin.htmlcache.generate.archive.confirm':
    'Apakah Anda yakin ingin membuat cache statis dokumen?',
  'plugin.htmlcache.generate.tag.confirm':
    'Apakah Anda yakin ingin membuat cache tag statis?',
  'plugin.htmlcache.clean.confirm':
    'Apakah Anda yakin ingin menghapus cache statis seluruh situs? Jika ada banyak file yang di-cache, mungkin memerlukan waktu lama.',
  'plugin.htmlcache.clean.confirm.content':
    'Operasi ini hanya membersihkan file cache lokal server dan tidak dapat membersihkan file server statis.',
  'plugin.htmlcache.clean.success': 'Pembersihan berhasil',
  'plugin.htmlcache.push.all.confirm':
    'Apakah Anda yakin ingin memasukkan semua file statis ke server statis?',
  'plugin.htmlcache.push.all.confirm.content':
    'Ini hanya tersedia ketika server statis dikonfigurasi. Dorongan penuh membutuhkan waktu lama. Jika tidak ada perubahan global yang dilakukan, dorongan tambahan dapat digunakan.',
  'plugin.htmlcache.push.addon.confirm':
    'Apakah Anda yakin ingin memasukkan file statis ke server statis secara bertahap?',
  'plugin.htmlcache.push.addon.confirm.content':
    'Hanya tersedia ketika server statis dikonfigurasi, dorongan tambahan hanya akan mendorong file cache statis yang diperbarui.',
  'plugin.htmlcache.isopen': 'Apakah akan mengaktifkan cache halaman statis',
  'plugin.htmlcache.index-time': 'Waktu cache halaman beranda',
  'plugin.htmlcache.index-time.suffix': 'Kedua',
  'plugin.htmlcache.index-time.description':
    'Jika Anda mengisi 0 detik, itu tidak akan di-cache.',
  'plugin.htmlcache.category-time': 'Daftar waktu cache',
  'plugin.htmlcache.archive-time': 'Detail waktu cache',
  'plugin.htmlcache.storage-type': 'Server situs web statis',
  'plugin.htmlcache.storage-type.close': 'penutup',
  'plugin.htmlcache.storage-type.aliyun': 'Penyimpanan Cloud Alibaba',
  'plugin.htmlcache.storage-type.tencent': 'Penyimpanan Cloud Tencent',
  'plugin.htmlcache.storage-type.qiniu': 'Penyimpanan Awan Qiniu',
  'plugin.htmlcache.storage-type.upyun': 'Gambar lain dari penyimpanan cloud',
  'plugin.htmlcache.storage-type.google': 'Google Cloud Storage',
  'plugin.htmlcache.storage-type.awss3': 'Amazon S3 Storage',
  'plugin.htmlcache.storage-type.ftp': 'Pemindahan FTP',
  'plugin.htmlcache.storage-type.ssh': 'Transfer SFTP (SSH).',
  'plugin.htmlcache.storage-url': 'Alamat situs web statis',
  'plugin.htmlcache.storage-url.placeholder':
    'Seperti: https://www.anqicms.com',
  'plugin.htmlcache.aliyun.endpoint': 'Simpul Awan Alibaba',
  'plugin.htmlcache.aliyun.endpoint.placeholder':
    'Misalnya: http://oss-cn-hangzhou.aliyuncs.com',
  'plugin.htmlcache.aliyun.bucket-name': 'Nama keranjang Alibaba Cloud',
  'plugin.htmlcache.tencent.bucket-url':
    'Alamat keranjang penyimpanan Tencent Cloud',
  'plugin.htmlcache.tencent.bucket-url.placeholder':
    'Misalnya: https://aa-1257021234.cos.ap-guangzhou.myqcloud.com',
  'plugin.htmlcache.qiniu.bucket-name':
    'Nama keranjang penyimpanan cloud Qiniu',
  'plugin.htmlcache.qiniu.bucket-name.placeholder': 'Misalnya: anqicms',
  'plugin.htmlcache.qiniu.region': 'Tempat penyimpanan awan Qiniu',
  'plugin.htmlcache.qiniu.region.z0': 'Cina Timur',
  'plugin.htmlcache.qiniu.region.z1': 'Cina Utara',
  'plugin.htmlcache.qiniu.region.z2': 'Cina Selatan',
  'plugin.htmlcache.qiniu.region.na0': 'Amerika Utara',
  'plugin.htmlcache.qiniu.region.as0': 'Asia Tenggara',
  'plugin.htmlcache.qiniu.region.cn-east2': 'Cina Timur-Zhejiang2',
  'plugin.htmlcache.qiniu.region.fog-cn-east1':
    'Penyimpanan Kabut Wilayah Cina Timur',
  'plugin.htmlcache.upyun.operator': 'Gambar lain dari operator cloud',
  'plugin.htmlcache.upyun.password': 'Ambil kembali kata sandi operator cloud',
  'plugin.htmlcache.upyun.bucket': 'Lihat juga nama layanan penyimpanan cloud',
  'plugin.htmlcache.google.project_id': 'Google Cloud Project ID',
  'plugin.htmlcache.google.project_id.placeholder': 'For example: anqicms',
  'plugin.htmlcache.google.bucket_name': 'Google Cloud Bucket Name',
  'plugin.htmlcache.google.credentials_json': 'Google Cloud Key File Json',
  'plugin.htmlcache.google.credentials_json.placeholder':
    'Please copy from the Json file',
  'plugin.htmlcache.awss3.s3_region': 'Amazon S3 Region',
  'plugin.htmlcache.awss3.s3_region.placeholder': 'For example: us-east-1',
  'plugin.htmlcache.awss3.s3_bucket': 'Amazon S3 Bucket Name',
  'plugin.htmlcache.ftp.tips':
    'Catatan: Setelah pengujian, PureFtp yang disertakan dengan Pagoda tidak dapat digunakan secara normal.',
  'plugin.htmlcache.ftp.host': 'Alamat IP FTP',
  'plugin.htmlcache.ftp.port': 'Pelabuhan FTP',
  'plugin.htmlcache.ftp.username': 'nama pengguna FTP',
  'plugin.htmlcache.ftp.password': 'kata sandi FTP',
  'plugin.htmlcache.ftp.webroot': 'Direktori root unggah FTP',
  'plugin.htmlcache.ssh.host': 'Alamat IP SSH',
  'plugin.htmlcache.ssh.port': 'Pelabuhan SSH',
  'plugin.htmlcache.ssh.username': 'nama pengguna SSH',
  'plugin.htmlcache.ssh.password': 'kata sandi SSH',
  'plugin.htmlcache.ssh.or-key': 'atau kunci SSH',
  'plugin.htmlcache.ssh.or-key.description':
    'Jika server SSH Anda menggunakan kunci untuk login, silakan unggah',
  'plugin.htmlcache.ssh.or-key.upload': 'unggah berkas',
  'plugin.htmlcache.ssh.webroot': 'Direktori root unggah SSH',
  'plugin.htmlcache.generate.name': 'Bangun operasi',
  'plugin.htmlcache.generate.last-time': 'Waktu pembuatan manual terakhir:',
  'plugin.htmlcache.generate.last-time.empty': 'Tidak dibuat secara manual',
  'plugin.htmlcache.clean.all': 'hapus semua cache',
  'plugin.htmlcache.build.all': 'Hasilkan semua cache secara manual',
  'plugin.htmlcache.build.home': 'Buat cache beranda secara manual',
  'plugin.htmlcache.build.category': 'Buat cache kolom secara manual',
  'plugin.htmlcache.build.archive': 'Buat cache dokumen secara manual',
  'plugin.htmlcache.build.tag': 'Buat cache tag secara manual',
  'plugin.htmlcache.push.name': 'Operasi server statis',
  'plugin.htmlcache.push.last-time': 'Waktu tekan manual terakhir:',
  'plugin.htmlcache.push.last-time.empty': 'Tidak didorong secara manual',
  'plugin.htmlcache.push.all': 'Dorong semua file statis ke server statis',
  'plugin.htmlcache.push.addon':
    'Hanya dorong file yang diperbarui ke server statis',
  'plugin.htmlcache.push.log.all': 'Semua catatan dorong',
  'plugin.htmlcache.push.log.error': 'Dorong catatan kesalahan',
  'plugin.htmlcache.build.process': 'Bangun kemajuan',
  'plugin.htmlcache.build.start-time': 'Waktu mulai:',
  'plugin.htmlcache.build.end-time': 'Waktu selesai:',
  'plugin.htmlcache.build.unfinished': 'terlepas',
  'plugin.htmlcache.build.total': 'Jumlah yang ditemukan:',
  'plugin.htmlcache.build.finished-count': 'Jumlah yang diproses:',
  'plugin.htmlcache.build.current': 'Saat ini menjalankan tugas:',
  'plugin.htmlcache.build.error-count': 'Jumlah kesalahan:',
  'plugin.htmlcache.build.error-msg': 'pesan eror:',
  'plugin.htmlcache.push.process': 'Dorong kemajuan',
  'plugin.htmlcache.description.1':
    'Setelah mengaktifkan cache halaman statis, halaman beranda, halaman daftar, dan halaman detail akan di-cache untuk mempercepat pembukaan situs web, namun diperlukan lebih banyak ruang server untuk menyimpan file cache.',
  'plugin.htmlcache.description.2':
    'Jika Anda perlu mengaktifkan situs web statis, jenis template harus adaptif. Untuk membuka website statis, Anda perlu mengisi informasi server website statis. Setelah komunikasi berhasil, sistem akan secara otomatis mengirimkan halaman statis ke server website statis.',
  'plugin.htmlcache.description.3':
    'Sebelum mengaktifkan situs web statis, Anda perlu mengaktifkan cache halaman statis. Setelah mengaktifkan situs web statis, pencarian, pesan, komentar, 301 jump, dan fungsi lain yang memerlukan data dikirimkan ke backend tidak akan valid, dan situs web hanya akan memiliki efek tampilan.',
  'plugin.htmlcache.description.4':
    'Setelah mengaktifkan situs web statis, operasi berikut tidak akan dibuat ulang secara otomatis, dan operasi pembuatan halaman statis perlu dilakukan secara manual: Menyesuaikan templat (memodifikasi templat, mengaktifkan templat), Memodifikasi pengaturan latar belakang (pengaturan global, pengaturan konten, informasi kontak, navigasi , dll.), Modifikasi aturan pseudo-statis dan perubahan lain yang mempengaruhi situasi global',
  'plugin.importapi.token.required': 'Silakan isi Token, dalam 128 karakter',
  'plugin.importapi.token.confirm':
    'Apakah Anda yakin ingin memperbarui Token?',
  'plugin.importapi.token.confirm.content':
    'Setelah pembaruan, Token asli menjadi tidak valid, silakan gunakan alamat API baru untuk pengoperasian.',
  'plugin.importapi.token.copy.success': 'Berhasil disalin',
  'plugin.importapi.tips':
    'Konten yang dihasilkan melalui platform pihak ketiga seperti penulisan AI dapat diimpor ke sistem ini melalui API.',
  'plugin.importapi.token.name': 'Token Saya:',
  'plugin.importapi.token.copy': 'Klik untuk menyalin',
  'plugin.importapi.token.update': 'PembaruanToken',
  'plugin.importapi.archive-api': 'Antarmuka impor dokumen',
  'plugin.importapi.api-url': 'alamat antarmuka:',
  'plugin.importapi.method': 'Metode permintaan:',
  'plugin.importapi.request-type': 'Jenis permintaan:',
  'plugin.importapi.post-fields': 'Bidang formulir POST:',
  'plugin.importapi.field.remark': 'menjelaskan',
  'plugin.importapi.field.archive-id':
    'ID Dokumen, dibuat secara otomatis secara default',
  'plugin.importapi.field.title': 'Judul dokumen',
  'plugin.importapi.field.content': 'Konten dokumen',
  'plugin.importapi.field.category-id': 'ID Kategori',
  'plugin.importapi.field.keywords': 'Kata kunci dokumen',
  'plugin.importapi.field.description': 'Pengenalan dokumen',
  'plugin.importapi.field.url-token':
    'Alias ​​URL khusus, hanya mendukung angka dan huruf bahasa Inggris',
  'plugin.importapi.field.images':
    'Gambar artikel dapat diatur maksimal 9 gambar.',
  'plugin.importapi.field.logo':
    'Thumbnail dokumen dapat berupa alamat absolut, seperti: https://www.anqicms.com/logo.png atau alamat relatif, seperti: /logo.png',
  'plugin.importapi.field.publish-time':
    'Format: 02-01-2006 15:04:05 Waktu rilis dokumen bisa di kemudian hari, maka dokumen tersebut tidak akan dirilis secara resmi hingga waktunya habis.',
  'plugin.importapi.field.tag':
    'Tag Dokumen. Beberapa tag dipisahkan dengan koma bahasa Inggris, misalnya: aaa, bbb, ccc',
  'plugin.importapi.field.diy': 'Bidang khusus lainnya',
  'plugin.importapi.field.diy.remark':
    'Jika Anda memasukkan bidang khusus lainnya dan bidang tersebut ada di tabel dokumen, bidang tersebut juga didukung.',
  'plugin.importapi.field.draft':
    'Apakah akan menyimpan ke draf. Nilai yang didukung adalah: false|true. Jika benar diisi, dokumen yang diterbitkan akan disimpan ke draf.',
  'plugin.importapi.field.cover':
    'Jika judul yang sama, ID dokumen ada, nilai yang didukung adalah: 0 | 1 | 2, ketika mengisi 1, maka akan ditulis ke konten terbaru, diatur ke 0 atau tidak lulus, maka akan meminta kesalahan, ketika mengisi 2, tidak membuat penilaian',
  'plugin.importapi.return-type': 'Format pengembalian:',
  'plugin.importapi.return-example.success': 'Contoh hasil yang benar:',
  'plugin.importapi.return-example.failure': 'Contoh hasil yang salah:',
  'plugin.importapi.category-api': 'Dapatkan antarmuka klasifikasi',
  'plugin.importapi.category-api.fields': 'Bidang formulir POST/Param Kueri:',
  'plugin.importapi.category-api.fields.empty': 'tidak ada',
  'plugin.importapi.category-api.module-id':
    'ID model klasifikasi yang ingin diperoleh, isi nomor, nilai yang didukung: 0=semua, 1,2...ID model yang sesuai',
  'plugin.importapi.train-mopdule': 'Modul penerbitan lokomotif',
  'plugin.importapi.train-mopdule.url': 'Alamat website:',
  'plugin.importapi.train-mopdule.token': 'Variabel global:',
  'plugin.importapi.train-mopdule.download': 'Pengunduhan modul:',
  'plugin.importapi.train-mopdule.download.text': 'klik untuk mengunduh',
  'plugin.importapi.train-mopdule.support-version': 'Versi yang didukung:',
  'plugin.importapi.train-mopdule.support-version.text':
    'Mendukung kolektor lokomotif versi 9.0 atau lebih tinggi untuk mengimpor dan menggunakan modul rilis',
  'plugin.importapi.train-mopdule.example': 'Contoh konfigurasi:',
  'plugin.importapi.token.reset': 'ResetToken',
  'plugin.importapi.token.new': 'Token Baru',
  'plugin.importapi.token.new.placeholder': 'Silakan isi Token baru',
  'plugin.importapi.token.new.description':
    'Token umumnya terdiri dari kombinasi angka dan huruf, lebih panjang dari 10 digit dan kurang dari 128 digit.',
  'plugin.interference.isopen': 'Aktifkan pengumpulan kode anti-interferensi',
  'plugin.interference.isopen.description':
    'Pengaturan berikut hanya efektif jika fungsi ini diaktifkan.',
  'plugin.interference.isopen.no': 'penutup',
  'plugin.interference.isopen.yes': 'menyalakan',
  'plugin.interference.mode': 'Mode anti-interferensi',
  'plugin.interference.mode.class': 'Tambahkan Kelas acak',
  'plugin.interference.mode.text': 'Tambahkan teks tersembunyi acak',
  'plugin.interference.disable-selection': 'Nonaktifkan pemilihan teks',
  'plugin.interference.disable-selection.no': 'Tidak dinonaktifkan',
  'plugin.interference.disable-selection.yes': 'Cacat',
  'plugin.interference.disable-copy': 'Nonaktifkan replikasi',
  'plugin.interference.disable-right-click': 'Nonaktifkan klik kanan mouse',
  'plugin.keyword.batch-import': 'Impor kata kunci secara berkelompok',
  'plugin.keyword.batch-import.tips':
    'Catatan: Hanya file dalam format csv yang didukung untuk diunggah dan diimpor.',
  'plugin.keyword.batch-import.step1':
    'Langkah pertama adalah mendownload file template csv',
  'plugin.keyword.batch-import.step1.btn': 'Unduh file templat csv',
  'plugin.keyword.batch-import.step2': 'Langkah kedua adalah upload file csv',
  'plugin.keyword.batch-import.step2.btn': 'Unggah file csv',
  'plugin.keyword.edit': 'Sunting kata kunci',
  'plugin.keyword.add': 'Tambahkan kata kunci',
  'plugin.keyword.title': 'Nama kata kunci',
  'plugin.keyword.title.placeholder':
    'Mendukung penambahan batch, satu kata kunci per baris',
  'plugin.keyword.archive-category': 'Klasifikasi dokumen',
  'plugin.keyword.archive-category-id': 'ID klasifikasi dokumen',
  'plugin.keyword.manual-dig': 'Dengan tangan memperluas kata',
  'plugin.keyword.dig-setting': 'Pengaturan perluasan kata',
  'plugin.keyword.dig-setting.auto-dig': 'Perluasan kata otomatis',
  'plugin.keyword.dig-setting.auto-dig.no': 'TIDAK',
  'plugin.keyword.dig-setting.auto-dig.yes': 'otomatis',
  'plugin.keyword.dig-setting.max-count': 'Jumlah ekstensi',
  'plugin.keyword.dig-setting.max-count.description':
    'Jika perluasan kata otomatis dipilih, jumlah perluasan kata akan valid.',
  'plugin.keyword.dig-setting.max-count.placeholder': 'Standarnya 100.000',
  'plugin.keyword.dig-setting.language': 'Bahasa kata kunci',
  'plugin.keyword.dig-setting.title-exclude': 'kata pengecualian kata kunci',
  'plugin.keyword.dig-setting.title-exclude.description':
    'Saat memperluas kata, jika kata kunci ini muncul di kata kunci, kata kunci tersebut tidak akan dikumpulkan.',
  'plugin.keyword.dig-setting.replace': 'Penggantian kata kunci',
  'plugin.keyword.dig-setting.replace.tips1':
    'Edit pasangan kata kunci yang perlu diganti, dan penggantian akan otomatis dilakukan saat kata diperluas.',
  'plugin.keyword.delete.confirm':
    'Apakah Anda yakin ingin menghapus kata kunci yang dipilih?',
  'plugin.keyword.export.confirm':
    'Apakah Anda yakin ingin mengekspor semua kata kunci?',
  'plugin.keyword.collect.confirm':
    'Apakah Anda yakin ingin mengumpulkan kata kunci ini?',
  'plugin.keyword.collect.doing': 'Saat ini sedang mengumpulkan',
  'plugin.keyword.aigenerate.confirm':
    'Apakah Anda yakin ingin melakukan operasi penulisan AI pada kata kunci ini?',
  'plugin.keyword.aigenerate.content':
    'Penulisan otomatis AI memerlukan pembayaran, pastikan Anda telah mengikat akun Anqi Anda.',
  'plugin.keyword.aigenerate.doing': 'Menghasilkan',
  'plugin.keyword.cleanup.confirm':
    'Apakah Anda yakin ingin menghapus semua kata kunci untuk ini?',
  'plugin.keyword.cleanup.content':
    'Operasi ini akan menghapus semua kata kunci dan tidak dapat dipulihkan, harap operasikan dengan hati-hati',
  'plugin.keyword.level': 'Hirarki',
  'plugin.keyword.article-count': 'Artikel yang dikumpulkan',
  'plugin.keyword.collect': 'Koleksi tangan',
  'plugin.keyword.aigenerate': 'penulisan AI',
  'plugin.keyword.aigenerate.view-archive': 'Lihat dokumentasi AI',
  'plugin.keyword.export': 'Ekspor kata kunci',
  'plugin.keyword.import': 'Impor kata kunci',
  'plugin.keyword.cleanup': 'Hapus basis data kata kunci',
  'plugin.link.api.title': 'API tautan ramah',
  'plugin.link.api.list': 'Dapatkan antarmuka daftar tautan yang ramah',
  'plugin.link.api.verify': 'Antarmuka otentikasi',
  'plugin.link.api.add': 'Tambahkan antarmuka tautan ramah',
  'plugin.link.field.other-title': 'Kata kunci dari pihak lain',
  'plugin.link.field.other-link': 'Tautan lainnya',
  'plugin.link.field.other-link.description':
    'Seperti: https://www.anqicms.com/',
  'plugin.link.field.nofollow':
    'Apakah akan menambahkan nofollow, nilai opsional: 0 untuk tidak ditambahkan, 1 untuk ditambahkan',
  'plugin.link.field.back-link': 'Halaman tautan di seberang',
  'plugin.link.field.back-link.description':
    'URL halaman tempat pihak lain menempatkan link ke situs ini',
  'plugin.link.field.self-title': 'kata kunci saya',
  'plugin.link.field.self-title.description':
    'Kata kunci yang saya masukkan ke halaman pihak lain',
  'plugin.link.field.self-link': 'tautan saya',
  'plugin.link.field.self-link.description':
    'Tautan yang saya pasang di halaman pihak lain',
  'plugin.link.field.contact': 'Informasi kontak pihak lain',
  'plugin.link.field.contact.description':
    'Isi QQ, WeChat, nomor telepon, dll untuk memudahkan kontak tindak lanjut',
  'plugin.link.field.remark': 'Perkataan',
  'plugin.link.api.delete': 'Hapus antarmuka tautan ramah',
  'plugin.link.edit': 'Edit tautan ramah',
  'plugin.link.add': 'Tambahkan tautan ramah',
  'plugin.link.nofollow.description': 'Apakah akan menambahkan tag nofollow',
  'plugin.link.nofollow.no': 'tidak ditambahkan',
  'plugin.link.nofollow.yes': 'Tambahkan',
  'plugin.link.more': 'lebih banyak pilihan',
  'plugin.link.delete.confirm':
    'Apakah Anda yakin ingin menghapus tautan ramah yang dipilih?',
  'plugin.link.status.wait': 'Untuk diuji',
  'plugin.link.status.ok': 'normal',
  'plugin.link.status.wrong-keyword': 'Kata kunci tidak konsisten',
  'plugin.link.status.no-back-url': 'Pihak lain tidak memiliki backlink',
  'plugin.link.other-title-link': 'Kata kunci/tautan pihak lain',
  'plugin.link.other-contact-remark': 'Informasi kontak/keterangan pihak lain',
  'plugin.link.status-check-time': 'Informasi kontak/keterangan pihak lain',
  'plugin.link.create-time': 'tambahkan waktu',
  'plugin.link.check': 'meneliti',
  'plugin.material.category.delete.confirm': 'Anda yakin ingin menghapusnya?',
  'plugin.material.category.title': 'Nama bagian',
  'plugin.material.category.count': 'Kuantitas bahan',
  'plugin.material.category.add': 'Bagian baru',
  'plugin.material.category.edit': 'Ganti nama bagian:',
  'plugin.material.category.manage': 'Manajemen sektor',
  'plugin.material.category.title.tips': 'Silakan isi nama bagiannya',
  'plugin.material.import.selected': 'terpilih',
  'plugin.material.import.segment': 'pecahan',
  'plugin.material.import.clear':
    'Apakah Anda yakin ingin menghapus materi konten yang telah Anda pilih untuk diunggah?',
  'plugin.material.delete.confirm':
    'Apakah Anda yakin ingin menghapus materi yang dipilih?',
  'plugin.material.import.submit.tips.before':
    'Di antara bahan yang Anda pilih, ada',
  'plugin.material.import.submit.tips.after':
    'Tidak ada bagian yang dipilih untuk materi ini. Apakah Anda ingin melanjutkan pengiriman?',
  'plugin.material.import.upload-error':
    'Kesalahan pengunggahan, harap coba lagi nanti',
  'plugin.material.import.batch-add': 'Tambahkan bahan secara bertahap',
  'plugin.material.import.batch-add.tips':
    'Catatan: Anda dapat mengunggah artikel yang disimpan dalam bentuk txt atau html.',
  'plugin.material.import.default-category': 'Secara default diimpor ke:',
  'plugin.material.import.default-category.placeholder':
    'Pilih bagian yang akan diimpor',
  'plugin.material.import.default-category.all': 'semua',
  'plugin.material.import.select-file': 'Pilih untuk mengunggah:',
  'plugin.material.import.select-file.btn': 'Pilih file artikel Txt atau html',
  'plugin.material.import.paste': 'Atau klik untuk menempelkan teks',
  'plugin.material.import.selected.count': 'Materi paragraf yang dipilih:',
  'plugin.material.import.paste.clear': 'Jernih',
  'plugin.material.import.category.select': 'Pilih bagian',
  'plugin.material.import.merge-to-next': 'Gabungkan',
  'plugin.material.import.paste.title': 'Silakan tempel konten artikel di sini',
  'plugin.material.import.paste.analysis': 'mengurai konten',
  'plugin.material.import.paste.description':
    'Secara default, materi konten akan memfilter semua tag html dan hanya menyimpan teks. Jika Anda perlu menyimpan tag html, silakan periksa',
  'plugin.material.import.paste.description.btn': 'simpan tag html',
  'plugin.material.edit': 'Edit materi konten',
  'plugin.material.add': 'Tambahkan materi',
  'plugin.material.content': 'isi',
  'plugin.material.user-count': 'Jumlah kutipan',
  'plugin.material.preview': 'Pratinjau',
  'plugin.material.category-filter': 'Penyaring klasifikasi',
  'plugin.material.all': 'Semua sumber daya',
  'plugin.order.status': 'Status pemesanan',
  'plugin.order.status.wait': 'Pembayaran tertunda',
  'plugin.order.status.paid': 'untuk dikirimkan',
  'plugin.order.status.delivery': 'Menunggu Tanda Terima',
  'plugin.order.status.finished': 'berhasil',
  'plugin.order.status.refunding': 'Pengembalian dana',
  'plugin.order.status.refunded': 'dikembalikan',
  'plugin.order.status.closed': 'pesanan ditutup',
  'plugin.order.status.all': 'semua',
  'plugin.order.detail': 'informasi pemesanan',
  'plugin.order.type': 'Jenis pesanan',
  'plugin.order.type.vip': 'VIP',
  'plugin.order.type.goods': 'komoditas',
  'plugin.order.order-id': 'Id pemesanan',
  'plugin.order.create-time': 'waktu pemesanan',
  'plugin.order.pay-time': 'Waktu pembayaran',
  'plugin.order.deliver-time': 'Waktu pengiriman',
  'plugin.order.finished-time': 'Waktu yang lengkap',
  'plugin.order.payment-id': 'Nomor transaksi',
  'plugin.order.terrace-id': 'Nomor seri pedagang',
  'plugin.order.pay-amount': 'Total harga yang dibayarkan',
  'plugin.order.order-amount': 'jumlah pesanan',
  'plugin.order.origin-amount': 'harga total asli',
  'plugin.order.buy.user-name': 'Pelanggan',
  'plugin.order.share.user-name': 'Pengguna distribusi',
  'plugin.order.share.amount': 'Komisi distribusi',
  'plugin.order.share.parent.user-name': 'Distribusi pengguna yang unggul',
  'plugin.order.share.parent.amount': 'Komisi hadiah yang unggul',
  'plugin.order.remark': 'catatan pesanan',
  'plugin.order.vip': 'Beli VIP',
  'plugin.order.goods': 'memesan barang',
  'plugin.order.detail.title': 'nama',
  'plugin.order.detail.price': 'harga satuan',
  'plugin.order.detail.quantity': 'Jumlah pesanan',
  'plugin.order.detail.amount': 'total harga',
  'plugin.order.recipient.name': 'penerima',
  'plugin.order.recipient.contact': 'Menerima nomor telepon',
  'plugin.order.recipient.address': 'Alamat penerima',
  'plugin.order.setting': 'Pengaturan pesanan',
  'plugin.order.setting.progress': 'Metode pemrosesan pesanan',
  'plugin.order.setting.progress.yes': 'Proses transaksi biasa',
  'plugin.order.setting.progress.no': 'Transaksi selesai secara langsung',
  'plugin.order.setting.progress.description':
    'Transaksi normal mengharuskan pengguna untuk mengonfirmasi penerimaan atau menyelesaikan pesanan setelah habis masa berlakunya. Transaksi langsung diselesaikan setelah pengguna membayar, dan pesanan selesai.',
  'plugin.order.setting.auto-finish': 'Pesanan selesai secara otomatis',
  'plugin.order.setting.auto-finish.placeholder': 'Standarnya 10 hari',
  'plugin.order.setting.auto-finish.suffix': 'langit',
  'plugin.order.setting.auto-close': 'Batas waktu pesanan ditutup',
  'plugin.order.setting.auto-close.description':
    'Tidak otomatis ditutup secara default',
  'plugin.order.setting.auto-close.suffix': 'menit',
  'plugin.order.setting.seller-percent': 'Pendapatan penjualan pedagang',
  'plugin.order.setting.seller-percent.description':
    'Persentase pendapatan penjualan pedagang',
  'plugin.order.loading': 'memuat',
  'plugin.order.finish.confirm':
    'Apakah Anda yakin ingin menyelesaikan pesanan secara manual?',
  'plugin.order.finish.content': 'Operasi ini tidak dapat diubah.',
  'plugin.order.apply-refund.confirm':
    'Apakah Anda yakin ingin mengajukan pengembalian dana untuk pesanan ini?',
  'plugin.order.apply-refund.content':
    'Setelah refund, dana akan dikembalikan ke jalur semula.',
  'plugin.order.delivery': 'Mengirimkan',
  'plugin.order.delivery-process': 'Pemrosesan pengiriman',
  'plugin.order.finish-order': 'Pesanan lengkap',
  'plugin.order.refund-process': 'Memproses pengembalian dana',
  'plugin.order.refund': 'Pengembalian dana',
  'plugin.order.refund.disagree': 'Tidak menyetujui pengembalian dana',
  'plugin.order.refund.agree': 'Setuju untuk pengembalian dana',
  'plugin.order.apply-refund': 'Minta pengembalian dana',
  'plugin.order.pay': 'Pembayaran',
  'plugin.order.pay-process': 'Proses pembayaran',
  'plugin.order.pay-way': 'Cara Pembayaran',
  'plugin.order.pay-way.offline': 'Pembayaran luring',
  'plugin.order.view': 'Memeriksa',
  'plugin.order.export': 'Ekspor pesanan',
  'plugin.order.export.status': 'Ekspor konten pesanan',
  'plugin.order.export.start-date': 'mulai tanggal',
  'plugin.order.export.end-date': 'tanggal akhir',
  'plugin.order.export.end-date.description': 'Default hari ini',
  'plugin.order.express-company': 'perusahaan kurir',
  'plugin.order.express-company.empty': 'tidak ada',
  'plugin.order.express-company.sf': 'SF Ekspres',
  'plugin.order.express-company.ems': 'Pos Ekspres',
  'plugin.order.express-company.jd': 'JD Ekspres',
  'plugin.order.express-company.sto': 'STO Ekspres',
  'plugin.order.express-company.yto': 'Yuantong Ekspres',
  'plugin.order.express-company.zto': 'ZTO Ekspres',
  'plugin.order.express-company.yunda': 'Pengiriman YunDa',
  'plugin.order.express-company.jitu': 'Jitu Ekspres',
  'plugin.order.express-company.baishi': 'Huitong terbaik',
  'plugin.order.tracking-number': 'melacak nomor',
  'plugin.pay.wechat': 'Pembayaran WeChat',
  'plugin.pay.alipay': 'Bayar dengan Ali-Pay',
  'plugin.pay.paypal': 'PayPal',
  'plugin.pay.paypal.client-id': 'Client ID',
  'plugin.pay.paypal.secret': 'Client Secret',
  'plugin.pay.wechat.wechat.appid': 'AppID akun layanan WeChat',
  'plugin.pay.wechat.wechat.app-secret': 'Akun layanan WeChat AppSecret',
  'plugin.pay.wechat.weapp.appid': 'ID Aplikasi Program Mini WeChat',
  'plugin.pay.wechat.weapp.app-secret': 'Rahasia Aplikasi Program Mini WeChat',
  'plugin.pay.wechat.mchid': 'ID Pedagang WeChat',
  'plugin.pay.wechat.apikey': 'Kunci API Pedagang WeChat',
  'plugin.pay.wechat.cert-path': 'Sertifikat Sertifikat Pedagang WeChat',
  'plugin.pay.upload': 'unggah berkas',
  'plugin.pay.wechat.key-path': 'Kunci Sertifikat Pedagang WeChat',
  'plugin.pay.alipay.appid': 'AlipayAppID',
  'plugin.pay.alipay.private-key': 'Kunci Pribadi Alipay',
  'plugin.pay.alipay.cert-path': 'Terapkan sertifikat kunci publik',
  'plugin.pay.alipay.root-cert-path': 'Sertifikat akar Alipay',
  'plugin.pay.alipay.public-cert-path': 'Sertifikat kunci publik Alipay',
  'plugin.push.engine': 'mesin pencari',
  'plugin.push.result': 'Dorong hasil',
  'plugin.push.name': 'nama',
  'plugin.push.code': 'kode',
  'plugin.push.tips':
    'Fungsi push mesin pencari mendukung push aktif oleh pencarian Baidu dan pencarian Bing. Meskipun mesin pencari lain tidak memiliki fungsi push aktif, beberapa mesin pencari masih dapat menggunakan JS push.',
  'plugin.push.view-log': 'Lihat catatan push terbaru',
  'plugin.push.baidu': 'Dorongan proaktif pencarian Baidu',
  'plugin.push.bing': 'Dorongan proaktif pencarian Bing',
  'plugin.push.api-link': 'Dorong alamat antarmuka',
  'plugin.push.baidu.api-link.description':
    'Misalnya: http://data.zz.baidu.com/urls?site=https://www.anqicms.com&token=DTHpH8Xn99BrJLBY',
  'plugin.push.bing.api-link.description':
    'Misalnya: http://data.zz.baidu.com/urls?site=https://www.anqicms.com&token=DT Misalnya: https://ssl.bing.com/webmaster/api.svc/json /SubmitUrlbatch ?apikey=sampleapikeyEDECC1EA4AE341CC8B6 (perhatikan bahwa APIkey ini diatur dalam pengaturan di sudut kanan atas alat Bing)',
  'plugin.push.google': 'Kunci Akun Google JSON',
  'plugin.push.google.json': 'konten JSON',
  'plugin.push.google.description':
    'Tidak tersedia di dalam negeri. Silakan merujuk ke dokumen untuk mendapatkan JSON: https://www.anqicms.com/google-indexing-help.html',
  'plugin.push.other-js':
    '360/Toutiao dan JS lainnya dikirimkan secara otomatis',
  'plugin.push.other-js.add': 'Tambahkan kode JS',
  'plugin.push.other-js.tips1':
    'Anda dapat menempatkan kode JS seperti pengiriman otomatis Baidu JS, penyertaan otomatis 360, dan penyertaan otomatis Toutiao.',
  'plugin.push.other-js.tips2':
    'Kode-kode ini perlu dipanggil secara manual di templat. Silakan tambahkan kode `{{- pluginJsCode|safe }}` di akhir templat publik yang akan dipanggil.',
  'plugin.push.other-js.tips3':
    'Jendela pop-up seperti pesan/komentar akan secara otomatis memuat kode JS ini.',
  'plugin.push.other-js.name': 'nama kode',
  'plugin.push.other-js.name.placeholder': 'Seperti: statistik Baidu',
  'plugin.push.other-js.code': 'kode JS',
  'plugin.push.other-js.code.placeholder': 'Perlu menyertakan akhiran',
  'plugin.redirect.import': 'Impor tautan',
  'plugin.redirect.import.tips':
    'Catatan: Hanya file dalam format csv yang didukung untuk diunggah dan diimpor.',
  'plugin.redirect.import.step1':
    'Langkah pertama adalah mendownload file template csv',
  'plugin.redirect.import.step1.download': 'Unduh file templat csv',
  'plugin.redirect.import.step2': 'Langkah kedua adalah upload file csv',
  'plugin.redirect.import.step2.upload': 'Unggah file csv',
  'plugin.redirect.edit': 'Sunting tautan',
  'plugin.redirect.add': 'Tambahkan tautan',
  'plugin.redirect.from-url': 'Tautan sumber',
  'plugin.redirect.to-url': 'Tautan lompat',
  'plugin.redirect.from-url.description':
    'Ini bisa berupa alamat absolut yang dimulai dengan `http(https)`, atau alamat relatif yang dimulai dengan `/`',
  'plugin.redirect.delete.confirm':
    'Apakah Anda yakin ingin menghapus tautan yang dipilih?',
  'plugin.replace.add.required': 'Silakan isi kata kunci sumber pengganti',
  'plugin.replace.place.required': 'Silakan pilih lokasi alternatif',
  'plugin.replace.keyword.required': 'Harap tambahkan aturan penggantian',
  'plugin.replace.confirm':
    'Apakah Anda yakin ingin melakukan penggantian situs secara penuh?',
  'plugin.replace.tips':
    'Penggantian seluruh situs adalah operasi lanjutan, dan kesalahan penggantian mungkin terjadi. Disarankan untuk melakukan pencadangan konten sebelum penggantian.',
  'plugin.replace.replace-tag': 'Apakah akan mengganti konten label',
  'plugin.replace.place': 'ganti posisi',
  'plugin.replace.keyword': 'Aturan penggantian',
  'plugin.replace.add': 'Tambahkan aturan penggantian',
  'plugin.replace.place.setting': 'Pengaturan latar belakang',
  'plugin.replace.place.archive': 'dokumen',
  'plugin.replace.place.category': 'Halaman kategori',
  'plugin.replace.place.tag': 'Menandai',
  'plugin.replace.place.anchor': 'Entahlah',
  'plugin.replace.place.keyword': 'Kata-kata kunci',
  'plugin.replace.place.comment': 'Komentar',
  'plugin.replace.place.attachment': 'Sumber daya gambar',
  'plugin.retailer.setting': 'konfigurasi distribusi',
  'plugin.retailer.allow-self':
    'Distributor mendapat komisi dari pembelian mereka sendiri',
  'plugin.retailer.allow-self.description':
    'Jika komisi pembelian mandiri diaktifkan, distributor dapat memperoleh komisi terkait jika ia membeli sendiri barang yang didistribusikan. Jika dimatikan, distributor tidak dapat memperoleh komisi jika ia membeli sendiri barang yang didistribusikan. Jika Anda otomatis menjadi distributor, jangan aktifkan komisi pembelian mandiri.',
  'plugin.retailer.allow-self.no': 'penutup',
  'plugin.retailer.allow-self.yes': 'menyalakan',
  'plugin.retailer.become-retailer': 'Bagaimana menjadi distributor',
  'plugin.retailer.become-retailer.manual': 'Pemrosesan manual',
  'plugin.retailer.become-retailer.auto': 'secara otomatis menjadi',
  'plugin.retailer.become-retailer.description':
    'Jika Anda memilih pemrosesan manual, Anda perlu mengaturnya di manajemen pengguna.',
  'plugin.retailer.cancel.confirm':
    'Apakah Anda yakin ingin membatalkan kualifikasi distributor pengguna ini?',
  'plugin.retailer.cancel.content':
    'Jika ambang batas distributor adalah otomatis menjadi distributor, maka pembatalannya tidak sah.',
  'plugin.retailer.user-id': 'identitas pengguna',
  'plugin.retailer.user-name': 'nama belakang',
  'plugin.retailer.real-name': 'nama sebenarnya',
  'plugin.retailer.balance': 'Saldo pengguna',
  'plugin.retailer.total-reward': 'Pendapatan kumulatif',
  'plugin.retailer.create-time': 'Waktu bergabung',
  'plugin.retailer.change-name': 'Ganti nama asli',
  'plugin.retailer.cancel': 'Membatalkan',
  'plugin.retailer.add': 'Tambahkan distributor',
  'plugin.retailer.add.name': 'Isi ID pengguna dan atur distributornya',
  'plugin.retailer.change-name.new': 'nama asli baru',
  'plugin.rewrite.formula.archive-detail': 'Detail dokumen:',
  'plugin.rewrite.formula.archive-list': 'Daftar dokumen:',
  'plugin.rewrite.formula.module-index': 'Halaman beranda model:',
  'plugin.rewrite.formula.page-detail': 'Detail satu halaman:',
  'plugin.rewrite.formula.tag-list': 'Daftar tag:',
  'plugin.rewrite.formula.tag-detail': 'Detail tanda:',
  'plugin.rewrite.formula1': 'Opsi 1: Mode digital (sederhana, disarankan)',
  'plugin.rewrite.formula2':
    'Opsi 2: Pola penamaan 1 (Bahasa Inggris atau Pinyin)',
  'plugin.rewrite.formula3':
    'Opsi 3: Pola penamaan 2 (Bahasa Inggris atau Pinyin + angka)',
  'plugin.rewrite.formula4':
    'Opsi 4: Pola penamaan 3 (Bahasa Inggris atau Pinyin)',
  'plugin.rewrite.formula5':
    'Opsi 5: Mode khusus (mode lanjutan, harap gunakan dengan hati-hati, jika tidak diatur dengan benar, halaman depan tidak akan terbuka)',
  'plugin.rewrite.setting': 'Pengaturan skema pseudo-statis',
  'plugin.rewrite.setting.select': 'Pilih solusi pseudo-statis',
  'plugin.rewrite.setting.diy': 'Aturan pseudo-statis khusus',
  'plugin.rewrite.setting.diy.explain': 'Deskripsi aturan pseudo-statis khusus',
  'plugin.rewrite.setting.diy.tips':
    'Silakan salin aturan berikut ke dalam kotak input untuk diubah. Total ada 6 baris, yaitu detail dokumen, daftar dokumen, halaman beranda model, halaman, daftar tag, dan detail tag. === dan part sebelumnya tidak dapat diubah.',
  'plugin.rewrite.variable.tips':
    'Variabel diapit kurung kurawal `{}`, misalnya `{id}`. Variabel yang tersedia adalah: ID data `{id}`; nama tautan khusus dokumen `{namafile}`; nama tautan khusus klasifikasi `{catname}`, nama tautan khusus klasifikasi multi-level `{multicatname}`, `{ Hanya satu dari multicatname}` dan `{catname}` dapat digunakan; ID klasifikasi `{catid}`; nama tabel model `{module}`; tahun `{tahun}`, bulan `{bulan}`, hari `{hari} ` , jam `{jam}`, menit `{menit}`, detik `{detik}`, tahun, bulan, hari, jam, menit dan detik hanya tersedia di arsip; nomor halaman halaman `{halaman}`, halaman perlu ditempatkan dalam tanda kurung, seperti: `(/{page})` .',
  'plugin.rewrite.formula.direct1': 'Solusi siap pakai 1',
  'plugin.rewrite.formula.direct2': 'Solusi siap pakai 2',
  'plugin.rewrite.formula.direct3': 'Solusi siap pakai 3',
  'plugin.rewrite.formula.direct4': 'Solusi siap pakai 4',
  'plugin.robots.tips.before':
    'Robot adalah konfigurasi situs web yang memberi tahu spider mesin pencari halaman mana yang bisa dirayapi dan halaman mana yang tidak bisa dirayapi. Q:',
  'plugin.robots.tips.after': 'Format file robots.txt',
  'plugin.robots.content': 'Konten robot',
  'plugin.robots.content.tips1':
    '1. Robots.txt dapat memberi tahu Baidu halaman mana di situs web Anda yang dapat dirayapi dan halaman mana yang tidak dapat dirayapi.',
  'plugin.robots.content.tips2':
    '2. Anda dapat menggunakan alat Robots untuk membuat, memverifikasi, dan memperbarui file robots.txt Anda.',
  'plugin.robots.view': 'Lihat Robot',
  'plugin.sendmail.setting': 'Pengaturan email',
  'plugin.sendmail.server': 'server SMTP',
  'plugin.sendmail.server.description':
    'Misalnya, kotak surat QQ adalah smtp.qq.com',
  'plugin.sendmail.use-ssl': 'Gunakan SSL/TLS',
  'plugin.sendmail.use-ssl.no': 'Jangan gunakan',
  'plugin.sendmail.port': 'Pelabuhan SMTP',
  'plugin.sendmail.port.description':
    'Port server default adalah 25, port default saat menggunakan protokol SSL adalah 465, dan port default saat menggunakan protokol TLS adalah 587. Silakan tanyakan kepada penyedia layanan email Anda untuk parameter detailnya.',
  'plugin.sendmail.account': 'akun SMTP',
  'plugin.sendmail.account.description':
    'Defaultnya adalah akun email, seperti email QQ Anda, seperti 123456@qq.com',
  'plugin.sendmail.password': 'kata sandi SMTP',
  'plugin.sendmail.password.description':
    'Kode otorisasi dihasilkan di pengaturan email.',
  'plugin.sendmail.recipient': 'Penerima e-mail',
  'plugin.sendmail.recipient.required':
    'Silakan atur email Anda terlebih dahulu',
  'plugin.sendmail.recipient.description':
    'Secara default, dikirim ke pengirim. Jika Anda perlu mengirimkannya ke orang lain, silakan isi di sini. Harap gunakan koma untuk memisahkan beberapa penerima.',
  'plugin.sendmail.auto-reply': 'Membalas pelanggan secara otomatis',
  'plugin.sendmail.auto-reply.no': 'Tak ada jawaban',
  'plugin.sendmail.auto-reply.yes': 'respons otomatis',
  'plugin.sendmail.auto-reply.description':
    'Jika balasan otomatis ke pelanggan diaktifkan, maka ketika pelanggan meninggalkan pesan, maka email balasan otomatis akan otomatis terkirim ke alamat email yang diisi oleh pelanggan.',
  'plugin.sendmail.auto-reply.title': 'Judul balasan otomatis',
  'plugin.sendmail.auto-reply.title.description':
    'Silakan isi judul balasan otomatis',
  'plugin.sendmail.auto-reply.message': 'Konten balasan otomatis',
  'plugin.sendmail.auto-reply.message.description':
    'Silakan isi konten balasan otomatis',
  'plugin.sendmail.send-type': 'Kirim adegan',
  'plugin.sendmail.send-type.guestbook': 'Ada pesan baru di situs web',
  'plugin.sendmail.send-type.report': 'situs web harian setiap hari',
  'plugin.sendmail.send-type.new-order': 'Ada pesanan baru di situs web',
  'plugin.sendmail.send-type.pay-order': 'Ada perintah pembayaran di situs web',
  'plugin.sendmail.send-type.description':
    'Setelah dipilih, email akan dikirim dalam skenario yang dipilih.',
  'plugin.sendmail.test.sending': 'Mengirim email percobaan',
  'plugin.sendmail.send-time': 'Kirim waktu',
  'plugin.sendmail.subject': 'judul surat',
  'plugin.sendmail.status': 'kirim status',
  'plugin.sendmail.tips':
    'Pengingat email dapat mengirimkan pesan dari situs web ke kotak surat Anda melalui email.',
  'plugin.sendmail.test.send': 'Kirim email percobaan',
  'plugin.sitemap.tips1':
    'Saat ini, semua mesin pencari utama mendukung peta situs dalam format txt saat mengirimkan peta situs, dan ukuran file peta situs txt lebih kecil daripada file peta situs xml. Oleh karena itu, disarankan untuk menggunakan peta situs berformat txt.',
  'plugin.sitemap.tips2':
    'Karena pengiriman peta situs setiap mesin pencari dibatasi hingga 50.000 item atau berukuran 10 juta, fungsi peta situs ini akan menghasilkan file peta situs dengan 50.000 item.',
  'plugin.sitemap.type': 'Format peta situs',
  'plugin.sitemap.auto-build': 'Metode pembuatan peta situs',
  'plugin.sitemap.auto-build.manual': 'petunjuk',
  'plugin.sitemap.auto-build.auto': 'otomatis',
  'plugin.sitemap.exclude-tag': 'Peta Situs pembuatan tag dokumen',
  'plugin.sitemap.exclude-tag.no': 'menghasilkan',
  'plugin.sitemap.exclude-tag.yes': 'Tidak dihasilkan',
  'plugin.sitemap.exculde-module': 'Model dokumen yang dikecualikan',
  'plugin.sitemap.exculde-module.description':
    'Jika Anda ingin mengecualikan model dokumen tertentu, Anda dapat memilihnya di sini',
  'plugin.sitemap.exculde-category': 'Kategori yang dikecualikan',
  'plugin.sitemap.exculde-category.description':
    'Jika Anda ingin mengecualikan kategori tertentu, Anda dapat memilih di sini',
  'plugin.sitemap.exculde-page': 'Satu halaman tidak termasuk',
  'plugin.sitemap.exculde-page.description':
    'Jika Anda ingin mengecualikan satu halaman tertentu, Anda dapat memilih di sini',
  'plugin.sitemap.action': 'operasi manual',
  'plugin.sitemap.action.tips':
    'Tip: Setelah memodifikasi konfigurasi Peta Situs, harap buat Peta Situs secara manual agar konfigurasi dapat diterapkan.',
  'plugin.sitemap.last-time': 'Waktu yang terakhir dihasilkan',
  'plugin.sitemap.build': 'Buat peta situs secara manual',
  'plugin.sitemap.view': 'Lihat Peta Situs',
  'plugin.storage.tips':
    'Mengganti metode penyimpanan sumber daya tidak akan secara otomatis menyinkronkan sumber daya yang diunggah sebelumnya. Umumnya tidak disarankan untuk mengganti metode penyimpanan saat digunakan.',
  'plugin.storage.base': 'konfigurasi dasar',
  'plugin.storage.type': 'Metode penyimpanan',
  'plugin.storage.type.local': 'penyimpanan lokal',
  'plugin.storage.url': 'Alamat sumber daya',
  'plugin.storage.keep-local': 'arsip lokal',
  'plugin.storage.keep-local.no': 'Tidak Ditahan',
  'plugin.storage.keep-local.yes': 'menyimpan',
  'plugin.storage.keep-local.description':
    'Saat menggunakan penyimpanan cloud, Anda dapat memilih untuk menyimpan arsip lokal',
  'plugin.timefactor.module.required':
    'Silakan pilih setidaknya satu model dokumen',
  'plugin.timefactor.types.required':
    'Silakan pilih setidaknya satu jenis pembaruan',
  'plugin.timefactor.start-day.required':
    'Waktu yang memicu pembaruan tidak boleh 0',
  'plugin.timefactor.end-day.error':
    'Waktu hasil pembaruan tidak boleh lebih awal dari waktu pemicu pembaruan',
  'plugin.timefactor.tips':
    'Fungsi penerbitan terjadwal faktor waktu dokumen menyediakan kemampuan untuk memperbarui waktu dokumen secara berkala. Anda dapat mengatur dokumen tertentu agar otomatis diperbarui ke waktu terbaru secara terjadwal, dan dokumen dalam draf dapat diterbitkan secara berkala sesuai waktu yang ditentukan. Program ini akan mencoba memeriksa pembaruan setiap jam.',
  'plugin.timefactor.setting':
    'Dokumentasikan pengaturan rilis yang dijadwalkan berdasarkan faktor waktu',
  'plugin.timefactor.open':
    'Apakah akan mengaktifkan pembaruan waktu dokumen lama',
  'plugin.timefactor.open.no': 'TIDAK',
  'plugin.timefactor.open.yes': 'memungkinkan',
  'plugin.timefactor.types': 'Jenis pembaruan',
  'plugin.timefactor.types.created-time': 'waktu rilis',
  'plugin.timefactor.types.updated-time': 'Perbarui waktu',
  'plugin.timefactor.types.description': 'Pilih setidaknya satu',
  'plugin.timefactor.start-day': 'Melampaui',
  'plugin.timefactor.start-day.suffix': 'Dokumen dari beberapa hari yang lalu,',
  'plugin.timefactor.start-day.description': 'Misal: 30, isikan bilangan bulat',
  'plugin.timefactor.start-day.placeholder': 'Seperti: 30',
  'plugin.timefactor.end-day': 'Perbarui secara otomatis ke',
  'plugin.timefactor.end-day.placeholder': 'Seperti: 1',
  'plugin.timefactor.end-day.suffix': 'waktu dalam beberapa hari',
  'plugin.timefactor.end-day.description':
    'Jika diisi 0 berarti akan diupdate ke hari ini.',
  'plugin.timefactor.daily-update': 'Pembaruan maksimum per hari',
  'plugin.timefactor.daily-update.placeholder': 'Misalnya: 100',
  'plugin.timefactor.daily-update.suffix': 'artikel',
  'plugin.timefactor.daily-update.description':
    'Disarankan untuk mengisi nilai lebih besar dari 0, jika tidak, semua artikel yang memenuhi syarat akan diperbarui',
  'plugin.timefactor.republish': 'Apakah akan mendorong kembali',
  'plugin.timefactor.republish.no': 'TIDAK',
  'plugin.timefactor.republish.yes': 'Ya',
  'plugin.timefactor.republish.description':
    'Saat memperbarui dokumen, kirimkan ulang untuk mencoba mesin pencari.',
  'plugin.timefactor.release-draft':
    'Apakah akan mengaktifkan penerbitan otomatis dokumen kotak draf',
  'plugin.timefactor.release-draft.no': 'TIDAK',
  'plugin.timefactor.release-draft.yes': 'memungkinkan',
  'plugin.timefactor.daily-limit': 'Jumlah rilis otomatis per hari',
  'plugin.timefactor.daily-limit.suffix': 'Bab',
  'plugin.timefactor.daily-limit.description':
    'Setelah pengaturan, terbitkan sejumlah artikel tertentu dari kotak draf setiap hari, defaultnya adalah 100',
  'plugin.timefactor.daily-limit.placeholder': 'Seperti: 30',
  'plugin.timefactor.start-time': 'Waktu mulai penerbitan harian',
  'plugin.timefactor.start-time.placeholder': 'Seperti: 8',
  'plugin.timefactor.start-time.suffix': 'titik',
  'plugin.timefactor.start-time.description':
    'Misal: jam 8, maka setiap hari dimulai jam 8',
  'plugin.timefactor.end-time': 'Akhir waktu',
  'plugin.timefactor.end-time.placeholder': 'Seperti: 18',
  'plugin.timefactor.end-time.description':
    'Jika diisi 0 berarti berakhir pada pukul 23.00',
  'plugin.timefactor.module': 'Model terbuka',
  'plugin.timefactor.category':
    'Kategori yang tidak berpartisipasi dalam pembaruan',
  'plugin.timefactor.category.placeholder':
    'Jika Anda ingin mengecualikan kategori tertentu, Anda dapat memilih di sini',
  'plugin.titleimage.open': 'Konfigurasi gambar otomatis judul',
  'plugin.titleimage.open.no': 'penutup',
  'plugin.titleimage.open.yes': 'menyalakan',
  'plugin.titleimage.open.description':
    'Jika diaktifkan, ketika dokumen tidak mempunyai gambar, gambar yang berisi judul dokumen akan secara otomatis dibuat sebagai gambar thumbnail dokumen.',
  'plugin.titleimage.draw-sub':
    'Apakah akan menghasilkan gambar judul sekunder untuk dokumen tersebut',
  'plugin.titleimage.draw-sub.description':
    'Setelah diaktifkan, ketika dokumen tidak memiliki gambar, gambar akan secara otomatis dibuat untuk tag h2 dokumen dan dimasukkan ke dalam dokumen.',
  'plugin.titleimage.size': 'Hasilkan ukuran gambar',
  'plugin.titleimage.width': 'Lebar piksel',
  'plugin.titleimage.width.placeholder':
    'Apakah akan menghasilkan teks dengan default 800 judul dan gambar sekunder',
  'plugin.titleimage.height': 'Tinggi piksel',
  'plugin.titleimage.height.placeholder': 'Standarnya 600',
  'plugin.titleimage.color': 'warna huruf',
  'plugin.titleimage.color.default': 'Standarnya putih',
  'plugin.titleimage.color_bg': 'Font background color',
  'plugin.titleimage.color_bg.default': 'Default colorless',
  'plugin.titleimage.select': 'memilih',
  'plugin.titleimage.font-size': 'Ukuran teks default',
  'plugin.titleimage.font-size.placeholder': 'Bawaan 32',
  'plugin.titleimage.noise': 'Tambahkan titik interferensi',
  'plugin.titleimage.noise.no': 'tidak ditambahkan',
  'plugin.titleimage.noise.yes': 'Tambahkan',
  'plugin.titleimage.noise.description':
    'Hanya berfungsi jika latar belakang default digunakan',
  'plugin.titleimage.bg-image': 'latar belakang kustom',
  'plugin.titleimage.bg-image.description':
    'Anda dapat menyesuaikan latar belakang. Jika Anda tidak mengunggah latar belakang khusus, sistem akan secara otomatis menghasilkan latar belakang warna solid.',
  'plugin.titleimage.bg-image.upload': 'mengunggah gambar',
  'plugin.titleimage.font': 'Font khusus',
  'plugin.titleimage.font.upload': 'Unggah font .ttf',
  'plugin.titleimage.preview.text': 'Pratinjau teks',
  'plugin.titleimage.preview.text.edit': 'Ubah teks pratinjau',
  'plugin.transfer.provider.required': 'Silakan pilih sistem situs web',
  'plugin.transfer.token.required':
    'Silakan isi Token komunikasi yang bisa berupa karakter apa saja',
  'plugin.transfer.base-url.required': 'Silakan isi alamat websitenya',
  'plugin.transfer.signal.error': 'Kesalahan komunikasi',
  'plugin.transfer.signal.success': 'Komunikasi berhasil',
  'plugin.transfer.transfering': 'Eksekusi',
  'plugin.transfer.tips':
    'Saat ini, konten situs web DedeCMS / WordPress / PbootCMS / EmpireCMS didukung untuk dimigrasikan ke anqicms.',
  'plugin.transfer.step1': 'Langkah pertama',
  'plugin.transfer.step2': 'Langkah 2',
  'plugin.transfer.step3': 'langkah ketiga',
  'plugin.transfer.step4': 'langkah keempat',
  'plugin.transfer.step5': 'langkah kelima',
  'plugin.transfer.step1.description':
    'Pilih sistem situs web yang perlu dimigrasi',
  'plugin.transfer.step2.description': 'Unduh file antarmuka komunikasi',
  'plugin.transfer.step3.description': 'Isi informasi komunikasi situs web',
  'plugin.transfer.step4.description': 'Pilih apa yang akan dimigrasikan',
  'plugin.transfer.step5.description': 'Mulai mentransfer konten situs web',
  'plugin.transfer.step.prev': 'Sebelumnya',
  'plugin.transfer.step.next': 'Langkah berikutnya',
  'plugin.transfer.step.download': 'unduh',
  'plugin.transfer.step2.tips':
    'Silakan unggah file yang diunduh ke direktori root situs web Anda. Setelah mengunduh dan menempatkannya di direktori root situs web Anda, klik Berikutnya untuk melanjutkan.',
  'plugin.transfer.step3.tips':
    'Hanya satu Token yang dapat dikonfigurasi untuk setiap situs web. Jika Anda menerima pesan kesalahan, harap hapus secara manual anqicms.config.php di direktori root situs web untuk mengonfigurasinya kembali.',
  'plugin.transfer.base-url': 'alamat website',
  'plugin.transfer.base-url.placeholder': 'URL dimulai dengan http atau https',
  'plugin.transfer.token': 'Token komunikasi',
  'plugin.transfer.token.placeholder': 'Bisa karakter apa saja',
  'plugin.transfer.step4.tips': 'Secara default, semuanya dimigrasikan.',
  'plugin.transfer.types': 'Pilih apa yang akan dimigrasikan',
  'plugin.transfer.module': 'Pilih model migrasi',
  'plugin.transfer.step5.tips':
    'Selama proses migrasi, mohon jangan segarkan halaman ini.',
  'plugin.transfer.base-url.name': 'Situs yang perlu ditransfer:',
  'plugin.transfer.status': 'Status tugas saat ini:',
  'plugin.transfer.status.finished': 'lengkap',
  'plugin.transfer.status.doing': 'sedang berlangsung',
  'plugin.transfer.status.wait': 'belum dimulai',
  'plugin.transfer.current-task': 'Kemajuan tugas saat ini: Migrasi',
  'plugin.transfer.current-task.count': ',Jumlah datanya:',
  'plugin.transfer.task-error': 'Kesalahan tugas:',
  'plugin.transfer.restart': 'mengulang kembali',
  'plugin.transfer.start': 'Mulai migrasi',
  'plugin.user.setting': 'Pengaturan bidang tambahan pengguna',
  'plugin.user.setting.new': 'Tambahkan bidang',
  'plugin.user.setting.name.description': 'Seperti: QQ, ID WeChat, dll.',
  'plugin.user.edit': 'Ubah pengguna',
  'plugin.user.add': 'Tambahkan pengguna',
  'plugin.user.avatar_url': 'User avatar',
  'plugin.user.introduce': 'User introduction',
  'plugin.user.user-name': 'nama belakang',
  'plugin.user.real-name': 'nama sebenarnya',
  'plugin.user.phone': 'Nomor telepon',
  'plugin.user.email': 'alamat email',
  'plugin.user.password': 'kata sandi',
  'plugin.user.password.description':
    'Jika Anda perlu mengubah kata sandi untuk pengguna ini, silakan isi di sini, minimal 6 karakter',
  'plugin.user.is-retailer': 'Apakah itu distributor?',
  'plugin.user.is-retailer.no': 'TIDAK',
  'plugin.user.is-retailer.yes': 'Ya',
  'plugin.user.invite-code': 'Kode undangan',
  'plugin.user.invite-code.description':
    'Tolong jangan mengubahnya sesuka hati',
  'plugin.user.parent.user-id': 'ID pengguna unggul',
  'plugin.user.group': 'Grup pengguna VIP',
  'plugin.user.group.all': 'Semua kelompok',
  'plugin.user.expire': 'Grup pengguna kedaluwarsa',
  'plugin.user.expire.description':
    'Setelah habis masa berlakunya, grup pengguna akan kembali ke grup pertama',
  'plugin.user.extra-fields': 'bidang tambahan',
  'plugin.user.extra-fields.default': 'nilai bawaan:',
  'plugin.user.delete.confirm':
    'Apakah Anda yakin ingin menghapus bagian data ini?',
  'plugin.watermark.generate.confirm':
    'Apakah Anda yakin ingin menambahkan tanda air ke semua gambar di perpustakaan gambar?',
  'plugin.watermark.generate.content':
    'Gambar yang sudah diberi watermark tidak akan ditambahkan lagi.',
  'plugin.watermark.open': 'Apakah akan mengaktifkan tanda air',
  'plugin.watermark.open.no': 'penutup',
  'plugin.watermark.open.yes': 'menyalakan',
  'plugin.watermark.open.description':
    'Jika diaktifkan, tanda air akan otomatis ditambahkan ke gambar yang diunggah.',
  'plugin.watermark.type': 'Jenis tanda air',
  'plugin.watermark.type.image': 'Tanda air gambar',
  'plugin.watermark.type.text': 'tanda air teks',
  'plugin.watermark.image': 'gambar tanda air',
  'plugin.watermark.text': 'teks tanda air',
  'plugin.watermark.position': 'posisi tanda air',
  'plugin.watermark.position.center': 'tengah',
  'plugin.watermark.position.left-top': 'pojok kiri atas',
  'plugin.watermark.position.right-top': 'pojok kanan atas',
  'plugin.watermark.position.left-bottom': 'pojok kiri bawah',
  'plugin.watermark.position.right-bottom': 'pojok kanan bawah',
  'plugin.watermark.size': 'Ukuran tanda air',
  'plugin.watermark.opacity': 'transparansi tanda air',
  'plugin.watermark.batch-add':
    'Tambahkan tanda air ke gambar di perpustakaan gambar secara bertahap',
  'plugin.watermark.min-size': 'Gambar tanda air minimal',
  'plugin.watermark.min-size.suffix': 'Piksel',
  'plugin.watermark.min-size.description':
    'Gambar yang panjang dan lebarnya lebih kecil dari ukuran ini tidak akan ditambahkan tanda air.',
  'plugin.weapp.appid': 'ID Aplikasi program mini',
  'plugin.weapp.app-secret': 'Program MiniRahasia Aplikasi',
  'plugin.weapp.push.setting': 'Konfigurasi push pesan',
  'plugin.weapp.server-url': 'alamat server',
  'plugin.weapp.token': 'Token Akun Layanan',
  'plugin.weapp.encoding-aes-key': 'Nomor layananEncodingAESKey',
  'plugin.weapp.encoding-aes-key.description':
    'Jika metode enkripsi dan dekripsi pesan adalah mode teks biasa, mohon jangan mengisi kolom ini, jika tidak, kesalahan akan dilaporkan.',
  'plugin.weapp.default': 'Applet bawaan',
  'plugin.weapp.default.tips':
    'Program mini default AnQiCMS juga mendukung program mini pintar Baidu, program mini WeChat, program mini QQ, program mini Alipay, dan program mini Toutiao.',
  'plugin.weapp.default.help': 'Bantuan dalam menggunakan program mini:',
  'plugin.weapp.default.source':
    'Alamat kode sumber program mini: https://github.com/fesiong/anqicms-app/releases',
  'plugin.weapp.default.download': 'Unduh applet default',
  'plugin.wechat.menu.delete.confirm':
    'Apakah Anda yakin ingin menghapus menu ini?',
  'plugin.wechat.menu.submit.error': 'Kirim kesalahan',
  'plugin.wechat.menu.submit.confirm':
    'Apakah Anda yakin ingin memperbarui menu akun resmi?',
  'plugin.wechat.menu.submit.content':
    'Operasi ini akan menyinkronkan menu yang baru diatur ke server WeChat.',
  'plugin.wechat.menu.name': 'Nama menu',
  'plugin.wechat.menu.type': 'jenis',
  'plugin.wechat.menu.type.click': 'Menu teks',
  'plugin.wechat.menu.type.view': 'menu tautan',
  'plugin.wechat.menu.value': 'nilai',
  'plugin.wechat.menu.value.description':
    'Silahkan isi teks untuk menu teks dan alamat url untuk menu link, maksimal 128 karakter.',
  'plugin.wechat.menu': 'Menu WeChat',
  'plugin.wechat.menu.tips':
    'Catatan: Terdapat maksimal 3 menu tingkat pertama, dan maksimal 5 menu tingkat kedua untuk setiap menu tingkat pertama.',
  'plugin.wechat.menu.submit': 'Perbarui menu akun resmi',
  'plugin.wechat.menu.add': 'Tambahkan menu',
  'plugin.wechat.menu.top': 'menu teratas',
  'plugin.wechat.sort.description':
    'Semakin kecil nilainya, semakin tinggi pengurutannya.',
  'plugin.wechat.reply': 'membalas',
  'plugin.wechat.reply.delete.confirm':
    'Apakah Anda yakin ingin menghapus bagian data ini?',
  'plugin.wechat.reply.keyword': 'Kata-kata kunci',
  'plugin.wechat.reply.content': 'Balasan konten',
  'plugin.wechat.reply.content.description':
    'Jika Anda ingin membalas, masukkan di sini',
  'plugin.wechat.reply.time': 'Waktu merespon',
  'plugin.wechat.reply.default': 'Balasan bawaan',
  'plugin.wechat.reply.default.yes': 'Ya',
  'plugin.wechat.reply.default.description':
    'Setelah dipilih sebagai balasan default, jika kata kunci tidak cocok, konten ini akan dibalas',
  'plugin.wechat.reply.default.set-no': 'TIDAK',
  'plugin.wechat.reply.default.set-yes': 'ditetapkan sebagai default',
  'plugin.wechat.reply.rule': 'Aturan balasan otomatis',
  'plugin.wechat.reply.rule.add': 'Tambahkan aturan',
  'plugin.wechat.reply.rule.edit': 'Tambahkan aturan',
  'plugin.wechat.reply.keyword.description':
    'Pengguna mengirimkan kata kunci pemicu',
  'plugin.wechat.setting': 'Konfigurasi akun layanan WeChat',
  'plugin.wechat.appid': 'Akun layananAppID',
  'plugin.wechat.app-secret': 'Akun LayananAppSecret',
  'plugin.wechat.verify-setting': 'Konfigurasi kode verifikasi',
  'plugin.wechat.verify-key': 'Kata kunci kode verifikasi',
  'plugin.wechat.verify-key.placeholder': 'Bawaan: kode verifikasi',
  'plugin.wechat.verify-key.description':
    'Pengguna bisa mendapatkan kode verifikasi dengan membalas kata kunci ini',
  'plugin.wechat.verify-msg': 'Templat informasi kode verifikasi',
  'plugin.wechat.verify-msg.placeholder':
    'Default: Kode verifikasi: {code}, valid dalam 30 menit',
  'plugin.wechat.verify-msg.description':
    'Catatan: Templat harus berisi `{code}`',
  'plugin.wechat.auto-reply.setting': 'Pengaturan balasan otomatis',
  'plugin.wechat.menu.setting': 'Pengaturan Menu',
  'plugin.wechat.official.setting': 'Pengaturan akun resmi',
  'plugin.type.all': 'Semua fungsi',
  'plugin.type.normal': 'Fungsi Umum',
  'plugin.type.archive': 'Fungsi dokumen',
  'plugin.type.user-mall': 'Pengguna/mal',
  'plugin.type.system': 'Fungsi sistem',
  'plugin.limiter.open.name': 'Aktifkan perlindungan keamanan situs web',
  'plugin.limiter.open.false': 'Tutup',
  'plugin.limiter.open.true': 'Buka',
  'plugin.limiter.description':
    'Setelah diaktifkan, pengaturan berikut akan berlaku',
  'plugin.limiter.max_requests': 'Larang IP untuk sementara',
  'plugin.limiter.max_requests.prefix':
    'Jumlah kunjungan dalam 5 menit terakhir tercapai',
  'plugin.limiter.max_requests.suffix': 'kali',
  'plugin.limiter.max_requests.description':
    'Jika tidak diisi, defaultnya adalah 100 kali',
  'plugin.limiter.block_hours': 'Durasi larangan sementara',
  'plugin.limiter.block_hours.prefix': 'Larangan sementara',
  'plugin.limiter.block_hours.suffix': 'jam',
  'plugin.limiter.block_hours.description':
    'Jika tidak diisi, defaultnya adalah 1 jam',
  'plugin.limiter.white_ips': 'IP Daftar Putih',
  'plugin.limiter.white_ips.description':
    'Satu per baris, mendukung segmen IP dan IP, seperti: 192.168.2.0/24',
  'plugin.limiter.black_ips': 'IP Daftar Hitam',
  'plugin.limiter.black_ips.description':
    'Satu per baris, mendukung segmen IP dan IP, seperti: 192.168.2.0/24',
  'plugin.limiter.block_agents': 'Batasi Agen Pengguna tertentu',
  'plugin.limiter.block_agents.description':
    'Satu per baris, akses menggunakan Agen Pengguna ini akan ditolak',
  'plugin.limiter.allow_prefixes': 'Kecualikan awalan jalur tertentu',
  'plugin.limiter.allow_prefixes.placeholder': 'seperti:/api',
  'plugin.limiter.allow_prefixes.description':
    'Satu per baris, jalur yang berisi awalan ini akan diizinkan',
  'plugin.limiter.is_allow_spider': 'Apakah akan mengizinkan laba-laba',
  'plugin.limiter.is_allow_spider.no': 'Tidak',
  'plugin.limiter.is_allow_spider.yes': 'Ya',
  'plugin.limiter.is_allow_spider.description':
    'Jika ya dipilih, akses laba-laba akan diizinkan. Agar tidak mempengaruhi penyertaan laba-laba, silakan pilih ya',
  'plugin.limiter.ban_empty_agent':
    'Whether to restrict empty UserAgent access',
  'plugin.limiter.ban_empty_agent.description':
    'Some collection/testing software will use empty UserAgent access',
  'plugin.limiter.ban_empty_refer': 'Whether to restrict empty Refer access',
  'plugin.limiter.ban_empty_refer.description':
    'Only restrict empty Refer access to static resources such as images, web pages are not restricted',
  'plugin.limiter.blocked_ips': 'IP yang diblokir sementara',
  'plugin.limiter.blocked_ips.remove': 'Buka blokir',
  'plugin.limiter.blocked_ips.remove.yes': 'Hapus',
  'plugin.limiter.blocked_ips.ended': 'Kedaluwarsa:',
  'plugin.multilang.remove.confirm':
    'Apakah Anda yakin ingin menghapus situs multibahasa ini? ',
  'plugin.multilang.sync.confirm':
    'Apakah Anda yakin ingin menyinkronkan konten situs? ',
  'plugin.multilang.name': 'nama',
  'plugin.multilang.is-main': 'situs utama',
  'plugin.multilang.domain': 'Nama domain',
  'konten.multilang.bahasa': 'Bahasa',
  'plugin.multilang.sync-time': 'Waktu sinkronisasi konten',
  'setting.multilang.sync': 'Konten tersinkronisasi',
  'setting.multilang.login': 'Latar belakang masuk',
  'plugin.multilang.open.name':
    'Apakah akan mengaktifkan dukungan situs multi-bahasa',
  'plugin.multilang.open.false': 'Tidak',
  'plugin.multilang.open.true': 'Ya',
  'plugin.multilang.open.description':
    'Setelah mengaktifkan dukungan situs multi-bahasa, Anda akan dapat mendukung tampilan multi-bahasa di situs web Anda',
  'plugin.multilang.type': 'Formulir tampilan multi-situs',
  'plugin.multilang.type.domain': 'Nama domain independen',
  'plugin.multilang.type.direction': 'Direktori independen',
  'plugin.multilang.type.same-url': 'URL tidak berubah',
  'plugin.multilang.type.description':
    'Hasil tampilan berbeda-beda dalam bentuk yang berbeda. Bentuk nama domain independen adalah nama domain tersendiri untuk setiap bahasa, bentuk direktori independen adalah direktori untuk setiap bahasa, dan bentuk konstanta URL apakah semua bahasa mengarah ke URL yang sama',
  'plugin.multilang.default_language': 'Bahasa situs utama',
  'plugin.multilang.auto_translate':
    'Apakah akan menerjemahkan secara otomatis',
  'plugin.multilang.auto_translate.false': 'Tidak',
  'plugin.multilang.auto_translate.true': 'Ya',
  'plugin.multilang.auto_translate.description':
    'Terjemahan otomatis adalah fungsi berbayar, silakan periksa situs web resmi untuk harga spesifik',
  'plugin.multilang.sites': 'Daftar situs multi-bahasa',
  'plugin.multilang.add': 'Tambahkan situs',
  'plugin.multilang.edit': 'Edit situs multibahasa',
  'plugin.multilang.select': 'Pilih situs',
  'plugin.multilang.select.description':
    'Pilih situs yang sudah dibuat sebagai situs multi-bahasa',
  'plugin.multilang.language': 'bahasa situs',
  'plugin.multilang.syncing': 'Sinkronisasi',
  'plugin.multilang.icon': 'ikon situs',
  'plugin.multilang.site-type': 'Site storage processing method',
  'plugin.multilang.site-type.domain': 'Each language independent site storage',
  'plugin.multilang.site-type.direction': 'Only the main site',
  'plugin.multilang.site-type.description':
    'Each language independent site storage requires creating a site for each language to store and process data. The advantage is that the content and template interface can be edited and processed independently. Only the main site method, there is only one copy of the data and templates, and the results of other languages ​​come from the automatic translation of the main site interface. The workload is less, but the templates and content of each language cannot be freely controlled. ',
  'plugin.multilang.translate-log': 'Translation log',
  'plugin.multilang.translate-cache': 'Translation cache',
  'plugin.multilang.base_url.name': 'Site domain name',
  'plugin.multilang.base_url.description':
    'Only required when the display format is an independent domain name',
  'plugin.multilang.html-log.create-time': 'Creation time',
  'plugin.multilang.html-log.uri': 'URL path',
  'plugin.multilang.html-log.to-language': 'Target language',
  'plugin.multilang.html-log.status': 'Status',
  'plugin.multilang.html-log.status.success': 'Success',
  'plugin.multilang.html-log.status.failure': 'Failure',
  'plugin.multilang.html-cache.delete-confirm':
    'Are you sure you want to delete this translation cache?',
  'plugin.multilang.html-cache.create-time': 'Creation time',
  'plugin.multilang.html-cache.uri': 'URL path',
  'plugin.multilang.html-cache.language': 'Language',
  'plugin.multilang.html-cache.delete': 'Delete',
  'plugin.multilang.translate-cache.clear-all': 'Delete all',
  'plugin.multilang.html-cache.crean-all-confirm':
    'Are you sure you want to delete all translation caches? ',
  'plugin.multilang.sync.cancel': 'Cancel',
  'plugin.multilang.sync.all': 'Full synchronization',
  'plugin.multilang.sync.addon': 'Incremental synchronization',
  'plugin.multilang.sync.content':
    'Please select the synchronization method you need:',
  'plugin.translate.lang': 'Terjemahkan bahasa',
  'content.translate.origin-content': 'teks asli',
  'plugin.translate.result': 'Hasil terjemahan',
  'plugin.translate.tips':
    'Antarmuka terjemahan menggunakan antarmuka resmi secara default. Terjemahan Baidu dan Terjemahan Youdao bersifat opsional dan perlu dikonfigurasi sendiri',
  'plugin.translate.view-log': 'Lihat catatan terjemahan',
  'plugin.translate.engine': 'Pilih antarmuka terjemahan',
  'plugin.translate.engine.anqicms': 'Antarmuka resmi',
  'plugin.translate.engine.baidu': 'Terjemahan Baidu',
  'plugin.translate.engine.youdao': 'Terjemahan Youdao',
  'plugin.translate.engine.baidu.app-id': 'APPID',
  'plugin.translate.engine.baidu.app-secret': 'Kunci',
  'plugin.translate.engine.youdao.app-id': 'ID Aplikasi',
  'plugin.translate.engine.youdao.app-secret': 'Kunci rahasia aplikasi',
  'plugin.translate.engine.deepl': 'Deepl',
  'plugin.translate.engine.deepl.auth-key': 'Auth Key',
  'plugin.translate.logs': 'Catatan terjemahan',
  'plugin.jsonld.tips.1':
    'Setelah diaktifkan, sistem akan secara otomatis menandai data terstruktur situs web dalam format JSON-LD dan memasukkannya ke bagian bawah halaman sehingga mesin pencari dapat lebih memahami konten situs web. ',
  'plugin.jsonld.tips.2':
    'Untuk markup data terstruktur yang didukung oleh Google, silakan lihat dokumentasi: https://developers.google.com/search/docs/appearance/structured-data/search-gallery',
  'plugin.jsonld.open.name': 'Buka markup data terstruktur',
  'plugin.jsonld.open.false': 'Tidak',
  'plugin.jsonld.open.true': 'Ya',
  'plugin.jsonld.author': 'Penulis default',
  'plugin.jsonld.brand': 'Merek bawaan',
};
