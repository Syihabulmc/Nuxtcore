# Deployment Guide

## 1. Tujuan Deployment

Panduan ini menjelaskan cara men-deploy Nuxtcore dengan aman, stabil, dan sesuai kebutuhan enterprise. Repository ini mendukung beberapa skenario deployment:

- development lokal
- staging
- production internal
- produksi dengan reverse proxy

## 2. Prasyarat

- Node.js LTS
- package manager yang digunakan tim
- environment variables yang lengkap
- akses ke server atau container runtime
- database atau backend eksternal bila dipakai

## 3. Environment yang Disarankan

### Development

- Jalankan aplikasi secara lokal.
- Gunakan file env terpisah.
- Aktifkan log yang cukup verbose untuk debugging.

### Staging

- Merepresentasikan production sedekat mungkin.
- Dipakai untuk validasi fitur sebelum rilis.
- Harus menggunakan konfigurasi dan data yang aman.

### Production

- Konfigurasi minimal dan aman.
- Secret tidak disimpan di source code.
- Logging dan monitoring aktif.

## 4. Variabel Environment

Kategori variabel yang lazim dibutuhkan:

- APP_NAME
- APP_ENV
- APP_URL
- AUTH_SECRET
- DATABASE_URL
- API_BASE_URL
- STORAGE_DRIVER
- FILE_UPLOAD_PATH
- LOG_LEVEL
- SESSION_SECRET

Catatan: nama variabel disesuaikan dengan implementasi aktual.

## 5. Langkah Build

Urutan build yang direkomendasikan:

1. Install dependencies.
2. Pastikan environment variables tersedia.
3. Jalankan validasi atau test bila ada.
4. Build aplikasi untuk production.
5. Jalankan aplikasi sebagai service.
6. Verifikasi route, auth, dan dashboard.

## 6. Deployment ke Ubuntu dengan systemd

Pendekatan ini cocok untuk server Linux standar.

### Alur Deployment

- Aplikasi dijalankan sebagai Node process.
- systemd menjaga proses tetap hidup.
- Nginx atau reverse proxy lain meneruskan request ke aplikasi.

### Rekomendasi Operasional

- Gunakan user khusus untuk service.
- Simpan file environment di lokasi yang aman.
- Gunakan log rotation.
- Restart service secara terkontrol saat deploy.

### Checklist Setelah Deploy

- Halaman login dapat diakses.
- Session berjalan normal.
- Route dashboard terlindungi.
- API internal merespons benar.
- Error log bersih dari masalah konfigurasi.

## 7. Deployment dengan IIS

Jika lingkungan Windows mensyaratkan IIS, gunakan IIS sebagai reverse proxy atau hosting layer yang sesuai dengan arsitektur server yang dipilih.

### Hal yang Perlu Diperhatikan

- Pastikan runtime Node tersedia di server.
- Pastikan port internal aplikasi tidak bentrok.
- Atur reverse proxy dengan benar.
- Konfigurasi header dan timeout sesuai kebutuhan aplikasi.

### Catatan

Gunakan pendekatan IIS jika memang menjadi standar infrastruktur organisasi. Untuk deployment baru, Ubuntu dengan systemd atau container biasanya lebih sederhana untuk aplikasi Nuxt.

## 8. Rekomendasi Container

Jika tim sudah memakai pipeline modern, container sangat disarankan.

Keuntungan:

- environment konsisten
- mudah pindah server
- deployment lebih repeatable
- lebih mudah diintegrasikan dengan CI/CD

## 9. Strategi Release

### Release Checklist

- kode sudah di-merge ke branch target
- test utama lulus
- dokumentasi diperbarui
- environment production diverifikasi
- rollback plan tersedia

### Rollback

Siapkan versi sebelumnya agar bisa diaktifkan kembali jika terjadi masalah kritikal.

## 10. Keamanan Deployment

- Jangan commit secret ke repository.
- Batasi akses server.
- Gunakan HTTPS.
- Simpan backup database secara berkala.
- Audit perubahan konfigurasi penting.

## 11. Monitoring Minimal

Minimal yang disarankan:

- proses aplikasi hidup
- error rate
- response time
- log error server
- status database atau dependency utama

## 12. Rekomendasi Produksi

- Gunakan staging sebelum production.
- Aktifkan logging terpusat jika tersedia.
- Gunakan health check endpoint jika tersedia.
- Dokumentasikan prosedur restart dan rollback.
