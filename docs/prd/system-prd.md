# System Product Requirements Document (PRD)

## Status Dokumen

Dokumen ini adalah sumber kebenaran utama untuk kebutuhan produk Nuxtcore. Jika ada perbedaan antara dokumen ini dan dokumen lain, maka dokumen ini yang diprioritaskan.

`system-rewrite-spec.md` hanya berfungsi sebagai panduan migrasi dan implementasi, bukan sumber definisi kebutuhan.

## 1. Ringkasan Produk

Nuxtcore adalah starter project enterprise fullstack berbasis Nuxt 4+ dan @nuxt/ui v4 untuk membangun ulang sistem lama tanpa mengubah flow bisnis inti.

Tujuan utamanya:

- mempertahankan perilaku operasional yang sudah dipahami user
- memodernisasi implementasi ke arsitektur Nuxt yang modular
- menyediakan fondasi dashboard enterprise yang serbaguna
- memudahkan pengembangan lintas domain tanpa mengorbankan parity

## 2. Prinsip Dasar

### 2.1 Parity First

Flow sistem lama harus dipertahankan kecuali ada keputusan eksplisit untuk mengubahnya.

Aturan parity:

- urutan proses harus sama kecuali ada alasan bisnis yang disetujui
- istilah bisnis yang sudah dikenal user harus dipertahankan
- status data dan transisi utama tidak boleh berubah diam-diam
- perubahan UX hanya boleh dilakukan jika hasil operasional tetap setara

### 2.2 Modular by Default

Setiap fitur harus bisa dipahami sebagai modul yang memiliki batas tanggung jawab jelas.

### 2.3 Enterprise Ready

Starter ini harus siap untuk:

- authentication
- authorization
- audit trail
- logging
- validation
- settings management
- reporting
- deployment production

### 2.4 Dashboard Oriented

UI utama adalah dashboard admin berbasis Nuxt UI, bukan landing page marketing.

### 2.5 Upgrade Friendly

Struktur harus memudahkan:

- penambahan modul baru
- pemisahan service
- pemindahan integrasi eksternal
- migrasi ke layer yang lebih besar jika diperlukan

## 3. Ruang Lingkup

### 3.1 In Scope

- authentication dan session management
- role dan permission
- dashboard utama
- navigasi modular
- master data
- workflow transaksi atau proses bisnis inti
- reporting dan export
- audit trail
- settings dan konfigurasi aplikasi
- file upload bila dibutuhkan flow lama

### 3.2 Out of Scope Awal

- fitur yang tidak punya padanan jelas di sistem lama
- redesign proses bisnis yang mengubah perilaku inti tanpa persetujuan
- optimasi skala besar sebelum flow utama stabil
- integrasi eksternal yang belum didefinisikan
- rewrite total yang mengubah nama domain tanpa mapping

## 4. Persona Pengguna

### 4.1 Administrator

Mengelola user, role, permission, menu, konfigurasi, dan keamanan sistem.

### 4.2 Operator / Staff

Menginput data, menjalankan proses harian, dan memproses transaksi.

### 4.3 Supervisor / Approver

Memeriksa, menyetujui, atau menolak proses tertentu.

### 4.4 Manajemen

Melihat dashboard, ringkasan data, dan laporan.

## 5. Definisi Terminologi

### 5.1 Parity Exact

Perilaku sistem baru sama persis dengan sistem lama pada hasil, urutan proses, dan hak akses.

### 5.2 Parity Equivalent

Implementasi berbeda, tetapi hasil operasional setara dan tidak mengubah kebiasaan user.

### 5.3 Intentional Upgrade

Perubahan yang sengaja dilakukan untuk meningkatkan kualitas tanpa merusak flow inti.

### 5.4 Legacy Behavior Retained

Perilaku lama yang sengaja dipertahankan meskipun bukan pilihan ideal secara teknis.

## 6. Kebutuhan Fungsional

### 6.1 Authentication

Sistem harus:

- menerima login yang valid
- menolak login jika akun tidak aktif
- menjaga session sesuai kebijakan deployment
- menyediakan logout yang membersihkan state
- melindungi route yang butuh autentikasi

### 6.2 Authorization

Sistem harus:

- membatasi menu berdasarkan role atau permission
- membatasi aksi berdasarkan hak akses
- memeriksa izin di client dan server
- mencegah akses ke route yang tidak berhak

### 6.3 Dashboard

Sistem harus:

- menampilkan ringkasan data yang relevan
- menyediakan shortcut ke modul utama
- menampilkan komponen statistik, tabel, atau grafik sesuai kebutuhan
- menyesuaikan isi dashboard dengan role pengguna

### 6.4 Master Data

Sistem harus mendukung pola umum:

- list
- search
- filter
- create
- update
- detail
- delete atau soft delete bila diperlukan
- pagination dan sorting untuk data besar

### 6.5 Workflow / Transaksi

Jika sistem lama memiliki proses bertahap, sistem baru harus mempertahankan urutan berikut:

- draft
- submit
- review
- approve atau reject
- selesai atau status lanjutan lain sesuai legacy

Setiap perubahan status harus tersimpan dalam histori.

### 6.6 Reporting

Sistem harus:

- menampilkan laporan ringkas dan detail
- mendukung filter periode, status, kategori, atau parameter lain
- mendukung export bila dibutuhkan
- menjaga pembatasan akses data sensitif

### 6.7 Settings

Sistem harus:

- mengelola branding dan preferensi aplikasi
- mengelola parameter umum
- memisahkan setting global dan setting domain bila perlu

### 6.8 File Upload

Jika flow lama membutuhkan lampiran, sistem harus menyediakan:

- upload
- preview
- download
- hapus lampiran
- validasi ukuran dan tipe file

### 6.9 Audit Trail

Sistem harus merekam aksi penting seperti:

- create
- update
- delete
- approve
- reject
- login penting
- perubahan konfigurasi

## 7. Kebutuhan Non-Fungsional

### 7.1 Maintainability

- kode dipisah berdasarkan domain
- logic bisnis tidak bercampur dengan UI
- komponen reusable dipakai untuk pola yang berulang
- service layer menjadi tempat utama business logic

### 7.2 Security

- validasi input wajib dilakukan
- otorisasi wajib diperiksa di server
- data sensitif tidak boleh diekspos tanpa kontrol
- secret tidak boleh disimpan di source code

### 7.3 Performance

- dashboard harus responsif
- tabel besar memakai pagination server-side bila perlu
- query dan request harus efisien

### 7.4 Scalability

- modul baru bisa ditambahkan tanpa refactor besar
- domain baru harus bisa berdiri sendiri secara logis

### 7.5 Observability

- error dan event penting harus dapat dilacak
- perubahan status kritikal harus dapat diaudit

## 8. Aturan Keputusan untuk Konflik Dokumen

Jika terdapat konflik antara dokumen, gunakan urutan prioritas ini:

1. PRD ini
2. Catatan keputusan arsitektur yang disetujui
3. Rewrite spec sebagai panduan implementasi
4. Dokumen turunan seperti workflow, deployment, dan folder structure

Jika ada area yang masih ambigu, keputusan harus ditulis sebagai:

- parity exact
- parity equivalent
- intentional upgrade

## 9. Kriteria Keberhasilan

Produk dianggap berhasil jika:

- flow utama sistem lama dapat berjalan kembali
- user tidak perlu mengubah kebiasaan operasional secara besar
- struktur kode mudah dirawat
- modul baru tidak merusak modul existing
- dokumentasi mencerminkan implementasi aktual

## 10. Ringkasan Rekomendasi

Rekomendasi terbaik untuk Nuxtcore:

- gunakan Nuxt 4+ dan @nuxt/ui v4
- jadikan dashboard sebagai UI utama
- pertahankan parity legacy sebelum melakukan enhancement
- pisahkan logic ke service dan schema
- dokumentasikan semua deviasi dari legacy

## 11. Catatan Akhir

Dokumen ini sengaja dibuat tegas agar tidak ambigu. Bila ada bagian sistem lama yang belum terdokumentasi, tambahkan mapping khusus di rewrite spec, bukan mengubah definisi PRD ini secara diam-diam.
