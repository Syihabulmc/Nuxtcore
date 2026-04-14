# Core Features Guide

## 1. Fokus Fitur Inti

Dokumen ini menjelaskan fitur inti yang wajib ada pada Nuxtcore agar dapat menggantikan flow sistem lama tanpa mengurangi fungsi operasional utama.

Urutan implementasi harus mengikuti prioritas bisnis, bukan sekadar kemudahan teknis.

## 2. Fitur Dasar Wajib

### 2.1 Authentication

Fungsi:

- Login
- Logout
- Session restore
- Session expiration handling
- Protected route

Rekomendasi:

- Gunakan session untuk dashboard internal.
- Gunakan token hanya jika ada integrasi lintas platform.

### 2.2 Authorization

Fungsi:

- Role-based access control
- Permission per menu
- Permission per aksi
- Route guard di client dan server

Rekomendasi:

- Definisikan permission sebagai string yang konsisten.
- Simpan matrix akses per role dalam satu sumber kebenaran.

### 2.3 Dashboard

Fungsi:

- Ringkasan statistik
- Shortcut modul inti
- Grafik atau kartu informasi
- Informasi status sistem

Rekomendasi:

- Dashboard harus sesuai role pengguna.
- Tampilkan data yang relevan, bukan semua data.

## 3. Master Data

Master data adalah fondasi modul lain. Entitas referensi:

- user
- role
- permission
- kategori
- unit
- wilayah
- parameter sistem

Pola fitur:

- list
- search
- filter
- create
- update
- detail
- delete atau soft delete
- pagination dan sorting untuk data besar

Rekomendasi:

- Gunakan tabel server-side untuk data besar.
- Gunakan form reusable untuk entity yang mirip.

## 4. Workflow dan Transaksi

Jika sistem lama memiliki proses bisnis bertahap, maka Nuxtcore harus mengikuti urutan yang sama.

Pola status standar:

- draft
- submitted
- reviewed
- approved
- rejected
- closed

Fungsi yang biasanya ada:

- input data
- validasi
- simpan draft
- kirim untuk proses lanjutan
- ubah status
- lihat histori

Rekomendasi:

- Simpan status dalam enum yang jelas.
- Jangan hardcode teks status di banyak tempat.
- Sediakan timeline/status history bila relevan.

## 5. Reporting

Fungsi:

- filter data
- ringkasan
- detail report
- export
- print-friendly view jika memang menjadi kebutuhan bisnis

Rekomendasi:

- Laporan harus bisa dipakai oleh operasional dan manajemen.
- Pisahkan report query dari UI agar mudah diuji.

## 6. Audit Trail

Fungsi:

- mencatat create
- mencatat update
- mencatat delete
- mencatat approval action
- mencatat login penting

Rekomendasi:

- Audit trail aktif minimal pada modul kritikal.
- Simpan before/after untuk entitas yang penting.

## 7. Notification dan Feedback

Fungsi:

- toast sukses
- toast error
- warning
- empty state
- loading state

Rekomendasi:

- Gunakan pola notifikasi konsisten di seluruh aplikasi.
- Jangan membuat user menebak apakah aksi berhasil.

## 8. File Upload dan Attachment

Jika sistem lama memakai lampiran, dukungan file upload harus disiapkan.

Fungsi:

- upload file
- preview
- download
- hapus lampiran
- validasi ukuran dan tipe file

Rekomendasi:

- Simpan metadata file terpisah dari data utama.
- Batasi jenis file yang diizinkan.

## 9. Settings

Fungsi:

- branding
- parameter aplikasi
- preferensi tampilan
- konfigurasi teknis tertentu

Rekomendasi:

- Letakkan setting global di satu tempat.
- Bedakan setting aplikasi dan setting per domain.

## 10. Admin UX Guidelines

Agar dashboard konsisten, gunakan pola berikut:

- page header yang seragam
- breadcrumb untuk halaman bertingkat
- filter area di atas tabel
- action button ditempatkan konsisten
- form group yang jelas
- feedback sukses/gagal standar

## 11. Prioritas Implementasi Fitur

Urutan yang disarankan:

1. Auth dan authorization
2. Layout dashboard
3. Navigasi dan menu
4. Master data inti
5. Workflow transaksi utama
6. Reporting
7. Audit trail
8. Settings dan penyempurnaan

## 12. Rekomendasi Fitur Tambahan

Fitur berikut opsional, tetapi direkomendasikan untuk versi enterprise:

- dark mode
- global search
- bulk action
- import/export
- saved filters
- activity timeline
- notification center
- impersonation admin bila aman dan diperlukan

## 13. Catatan Implementasi

Setiap fitur inti harus punya:

- dokumentasi singkat
- schema validasi
- permission jelas
- test minimal
- ownership modul

Tanpa empat hal tersebut, fitur mudah menjadi sulit dirawat.
