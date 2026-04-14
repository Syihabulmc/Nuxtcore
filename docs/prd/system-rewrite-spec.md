# System Rewrite Specification

## Status Dokumen

Dokumen ini adalah panduan migrasi dan implementasi untuk menjalankan PRD. Dokumen ini tidak boleh dipakai untuk mendefinisikan kebutuhan baru; semua kebutuhan produk mengacu ke `system-prd.md`.

## 1. Tujuan Rewrite

Menerjemahkan sistem lama ke basis Nuxt 4+ tanpa mengubah parity bisnis inti.

## 2. Prinsip Rewrite

### 2.1 Tidak Mengubah Flow Inti

- urutan proses legacy tetap menjadi referensi utama
- istilah bisnis yang sudah dikenal user dipertahankan
- status dan transisi penting tidak boleh berubah tanpa persetujuan

### 2.2 Modernisasi Implementasi

- UI dibangun sebagai dashboard berbasis Nuxt UI
- logic dipisah ke layer yang jelas
- validation, error handling, dan logging distandardisasi

### 2.3 Modularisasi per Domain

- satu domain memiliki boundary sendiri
- service, schema, route, page, dan komponen didekatkan secara logis
- shared layer hanya untuk hal yang benar-benar lintas domain

## 3. Cara Membaca Rewrite Spec

Gunakan dokumen ini untuk menjawab pertanyaan:

- bagaimana flow legacy dipetakan ke Nuxt
- file dan layer apa yang harus dibuat lebih dulu
- bagian mana yang harus sama persis
- bagian mana yang boleh ditingkatkan

Jika sebuah keputusan menyentuh definisi kebutuhan, kembalikan ke PRD.

## 4. Fase Migrasi

### 4.1 Discovery

- inventarisasi menu
- identifikasi halaman
- catat status, aksi, dan istilah bisnis
- tandai fitur yang wajib parity dan fitur yang boleh di-upgrade

### 4.2 Mapping

- cocokkan legacy page ke halaman Nuxt
- cocokkan legacy action ke service atau API route
- cocokkan legacy status ke enum atau constant baru

### 4.3 Foundation Build

Bangun terlebih dahulu:

- app shell
- dashboard layout
- auth flow
- navigation
- shared schema dan service pattern

### 4.4 Feature Migration

Migrasikan modul inti satu per satu:

- auth
- users
- roles
- permissions
- master data
- transactions
- reports
- settings

### 4.5 Hardening

Setelah parity tercapai:

- tambahkan audit trail penuh
- tambah observability
- optimalkan performa
- evaluasi enhancement yang tidak mengubah flow inti

## 5. Kategori Keputusan Migrasi

Gunakan label berikut untuk setiap keputusan:

### 5.1 Parity Exact

Perilaku baru sama persis dengan legacy.

### 5.2 Parity Equivalent

Hasil sama, implementasi lebih baik, kebiasaan user tetap aman.

### 5.3 Intentional Upgrade

Perbaikan yang disengaja, misalnya:

- form validation yang lebih baik
- error state yang lebih jelas
- komponen reusable
- layout dashboard yang lebih modern

## 6. Pola Implementasi yang Disarankan

### 6.1 List Page

- header halaman
- filter area
- tabel data
- pagination
- aksi per baris

### 6.2 Form Page

- page title
- form section
- inline validation
- CTA primary dan secondary
- feedback sukses atau gagal

### 6.3 Detail Page

- ringkasan data
- histori atau timeline bila relevan
- aksi sesuai role

### 6.4 Workflow Page

- draft
- submit
- review
- approve atau reject
- selesai

Jika legacy memakai urutan lain, legacy tetap menjadi sumber kebenaran.

## 7. Risiko Umum dan Mitigasi

### 7.1 Risiko

- salah membaca flow lama
- mengganti istilah yang sudah familiar
- membuat modul yang saling bergantung terlalu erat
- memindahkan logic bisnis ke UI

### 7.2 Mitigasi

- buat mapping per modul
- review tiap perubahan yang menyentuh proses bisnis
- simpan keputusan sebagai dokumentasi
- gunakan service layer sebagai boundary logic

## 8. Keluaran yang Diharapkan

Rewrite dianggap berhasil jika:

- legacy flow terwakili
- dashboard Nuxt UI konsisten
- permission bekerja benar
- validation dan error handling standar
- dokumentasi mencerminkan implementasi

## 9. Template Mapping Legacy

Untuk setiap modul, catat:

- nama modul
- halaman legacy
- halaman Nuxt baru
- action legacy
- action baru
- status parity
- keputusan khusus
- risiko
- catatan testing

## 10. Aturan Penting

- Jangan menambah definisi produk baru di dokumen ini.
- Jangan mengubah istilah bisnis tanpa alasan yang jelas.
- Jangan memulai implementasi modul sebelum parity-nya dipahami.
- Jika ada konflik dengan PRD, PRD menang.

## 11. Catatan Akhir

Dokumen ini sengaja dibuat singkat, tegas, dan operasional. Tujuannya agar tim implementasi tidak menafsirkan ulang kebutuhan produk secara liar.
