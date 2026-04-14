# Development Workflow

## 1. Tujuan Workflow

Workflow ini dibuat agar tim dapat mengembangkan Nuxtcore secara konsisten, tetap menjaga flow legacy, dan menghindari perubahan yang tidak terdokumentasi.

## 2. Prinsip Kerja

- Semua perubahan harus punya tujuan jelas.
- Flow sistem lama tidak boleh berubah tanpa validasi.
- Satu perubahan besar harus fokus pada satu domain.
- Dokumentasi harus mengikuti perubahan kode.
- Setiap modul baru harus memiliki definisi parity: mana yang harus sama persis, mana yang boleh di-upgrade.
- Keputusan teknis penting harus tercatat sebelum implementasi meluas ke modul lain.

## 3. Alur Kerja Pengembangan

### 3.1 Discovery

Sebelum coding:

- pahami kebutuhan fitur
- cek flow sistem lama
- identifikasi risiko perubahan
- tentukan apakah perubahan adalah parity atau enhancement
- catat istilah bisnis yang wajib dipertahankan di UI dan dokumentasi

### 3.2 Design

- tentukan route
- tentukan component breakdown
- tentukan service dan schema
- tentukan permission yang dibutuhkan

### 3.3 Implementation

- implementasi per lapisan
- mulai dari schema, service, lalu UI
- gunakan komponen reusable untuk pola yang berulang
- jaga agar page hanya berisi orchestration, bukan bisnis logic inti

### 3.4 Verification

- test flow utama
- cek error state
- cek permission
- cek behavior pada data kosong dan data besar
- cek apakah perubahan tidak memecah parity legacy

### 3.5 Documentation

- update README jika ada perubahan besar
- update docs modul terkait
- catat keputusan yang memengaruhi flow bisnis

## 4. Branching yang Disarankan

Baseline branching:

- main: stabil
- develop: integrasi aktif
- feature/*: fitur baru
- fix/*: perbaikan bug
- hotfix/*: perbaikan kritikal

Jika tim lebih kecil, branching dapat disederhanakan, tetapi tetap pisahkan perubahan yang berisiko.

## 5. Definition of Done

Sebuah perubahan dianggap selesai jika:

- fiturnya berjalan
- flow lama tetap sesuai
- permission sudah diuji
- tidak ada error fatal
- dokumentasi relevan diperbarui
- review sudah dilakukan jika relevan
- docs sync checklist sudah dilewati

## 6. Konvensi Implementasi

### UI

- Gunakan komponen reusable.
- Hindari duplikasi layout.
- Gunakan state loading dan empty state.

### Logic

- Logic bisnis jangan ditulis langsung di page.
- Gunakan service untuk operasi penting.
- Validasi input di schema dan server.

### API

- Response harus konsisten.
- Error harus jelas dan dapat ditindaklanjuti.
- Endpoint harus diberi nama sesuai domain.
- Gunakan server route sebagai boundary, bukan tempat menaruh seluruh logika bisnis.

## 7. Code Review Checklist

- Apakah flow legacy tetap aman?
- Apakah permission sudah benar?
- Apakah UI konsisten?
- Apakah ada duplikasi logic?
- Apakah error handling sudah jelas?
- Apakah docs perlu diperbarui?

## 8. Testing yang Disarankan

### Minimal

- unit test untuk fungsi penting
- integration test untuk service dan API
- e2e test untuk flow kritikal

### Fokus Test

- login/logout
- akses dashboard
- CRUD inti
- workflow status
- validasi form
- export atau laporan bila ada

## 9. Praktik Kolaborasi Tim

- Setiap modul punya owner.
- Keputusan arsitektur dicatat.
- Perubahan flow harus diinformasikan ke stakeholder terkait.
- Hindari perubahan besar tanpa validasi user.

## 10. Rekomendasi Pengembangan Bertahap

Urutan yang paling aman:

1. fondasi proyek
2. auth dan permission
3. layout dashboard
4. master data
5. workflow inti
6. reporting dan audit
7. hardening dan deployment

## 11. Catatan untuk Sistem Lama

Jika terdapat perilaku lama yang tidak ideal tetapi sudah menjadi kebiasaan operasional, dokumentasikan sebagai:

- parity exact
- intentional upgrade
- deprecated behavior

Pembedaan ini membantu tim menjaga parity tanpa menutup ruang perbaikan.
