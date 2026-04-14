# System Architecture

## 1. Gambaran Umum

Nuxtcore dirancang sebagai modular monolith berbasis Nuxt 4+ dan @nuxt/ui v4. Pendekatan ini cocok untuk starter enterprise karena:

- cepat dikembangkan
- mudah dirawat
- tetap bisa dipisahkan per domain
- tidak memaksa tim masuk ke kompleksitas microservices sejak awal

Arsitektur ini tetap memungkinkan server-side rendering, API internal, dan dashboard admin dalam satu basis kode.

## 2. Lapisan Arsitektur

### 2.1 Presentation Layer

Terdiri dari:

- pages
- layouts
- components
- composables
- middleware

Tugasnya hanya menangani tampilan, interaksi UI, dan navigasi.

### 2.2 Application Layer

Terdiri dari:

- use case service
- orchestrator per fitur
- action handler
- form handler

Lapisan ini mengatur alur kerja dari UI ke data layer.

### 2.3 Domain Layer

Terdiri dari:

- schema validasi
- tipe data
- aturan bisnis
- status workflow
- constants domain

Lapisan ini menjadi sumber kebenaran untuk logika bisnis inti.

### 2.4 Data Access Layer

Terdiri dari:

- server/api
- repository
- database client
- adapter ke API eksternal

Lapisan ini bertanggung jawab mengakses data dan menyembunyikan detail teknis dari UI.

### 2.5 Cross-Cutting Layer

Terdiri dari:

- auth
- logging
- audit trail
- error handling
- notifications
- permissions
- configuration

## 3. Alur Request

Alur umum yang disarankan:

1. User membuka halaman Nuxt.
2. Middleware memeriksa autentikasi dan otorisasi.
3. Komponen UI memanggil composable atau server API.
4. Server route memvalidasi input.
5. Service layer menjalankan logika bisnis.
6. Data access layer membaca atau menulis data.
7. Response dikembalikan dalam format standar.
8. UI menampilkan hasil, error, atau notifikasi.

## 4. Pola Fullstack yang Disarankan

### Opsi Utama

Gunakan satu repo Nuxt untuk frontend dan backend ringan:

- route page untuk UI
- server/api untuk endpoint internal
- server/services untuk logika bisnis
- shared untuk schema dan type

### Opsi Rekomendasi untuk Skala Lebih Besar

Jika domain bertambah banyak, gunakan:

- Nuxt layers per domain
- package shared internal untuk schema dan utilitas
- pemisahan service integration untuk sistem eksternal

## 5. Integrasi Nuxt UI

Nuxt UI disarankan sebagai sistem komponen utama untuk:

- layout dashboard
- navigation
- modal
- form input
- table
- badge
- pagination
- alert
- empty state
- skeleton loading

Keuntungan pendekatan ini:

- tampilan konsisten
- lebih cepat membangun halaman admin
- mudah dikustomisasi secara enterprise

## 6. Auth dan Access Control

### 6.1 Autentikasi

- Session-based cocok untuk dashboard internal.
- Token-based cocok bila ada integrasi lintas aplikasi atau mobile.

### 6.2 Authorization

- Role-based access control adalah baseline.
- Permission granular direkomendasikan untuk modul yang kompleks.
- Middleware dan server guard harus sama-sama aktif.

## 7. Data Flow

- UI mengirim intent melalui form atau action.
- Composable menangani state lokal dan request.
- Server route memverifikasi dan meneruskan ke service.
- Service menjalankan aturan domain.
- Data access layer mengerjakan query atau panggilan API.
- Response dibungkus secara konsisten.

## 8. Error Handling

Standar yang disarankan:

- Error validasi tampil di form.
- Error server tampil sebagai notifikasi yang jelas.
- Error sistem masuk ke logging.
- Message ke user tetap aman dan tidak membocorkan detail sensitif.

## 9. Logging dan Audit

### Logging

Gunakan logging untuk:

- error aplikasi
- akses API
- kegagalan autentikasi
- event penting pada proses bisnis

### Audit Trail

Simpan histori untuk:

- create
- update
- delete
- approve
- reject
- login penting
- perubahan konfigurasi

## 10. Deployment Topology

### Rekomendasi Default

- Nuxt app berjalan sebagai Node process.
- Reverse proxy menggunakan Nginx atau IIS.
- Systemd dipakai untuk service management di Ubuntu.

### Rekomendasi Enterprise Lanjutan

- Gunakan container image bila pipeline CI/CD sudah tersedia.
- Pisahkan environment dev, staging, dan production.
- Simpan secret di environment manager, bukan di source code.

## 11. Non-Functional Architecture Rules

- Semua fitur inti harus dapat diuji.
- Semua modul baru harus punya owner domain.
- Komponen UI reusable lebih diutamakan daripada duplikasi.
- Helper global harus dibatasi agar tidak membuat ketergantungan liar.
- Setiap perubahan flow harus punya catatan dokumentasi.

## 12. Rekomendasi Keputusan Teknis

- Gunakan modular monolith sebagai baseline.
- Gunakan Nuxt UI untuk mempercepat dashboard.
- Gunakan schema validation untuk seluruh input penting.
- Gunakan service layer agar bisnis logic tidak bocor ke UI.
- Gunakan audit trail sejak awal untuk modul kritikal.
