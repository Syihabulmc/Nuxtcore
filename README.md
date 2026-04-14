# Nuxtcore

Starter project enterprise fullstack berbasis Nuxt 4+ dengan @nuxt/ui v4 berbasis dashboard, dirancang untuk mempertahankan flow sistem lama semaksimal mungkin sambil menyiapkan fondasi yang lebih modular, aman, dan mudah dikembangkan.

Dokumentasi ini disusun sebagai blueprint awal untuk membangun ulang sistem lama ke arsitektur Nuxt modern tanpa mengorbankan proses bisnis yang sudah berjalan.

## Tujuan Proyek

- Menyediakan starter project enterprise yang siap dipakai untuk berbagai domain bisnis.
- Mempertahankan alur kerja, urutan proses, dan logika bisnis sistem lama sejauh mungkin.
- Menghadirkan dashboard admin modern berbasis Nuxt UI.
- Memisahkan lapisan UI, domain, data access, dan integrasi agar mudah dirawat.
- Menjadi fondasi untuk pengembangan bertahap: dari replikasi fitur lama ke penyempurnaan fitur baru.

## Prinsip Utama

1. Parity first
   - Prioritas pertama adalah menjaga flow sistem lama tetap sama.
   - Jika ada perbedaan teknis, keputusan harus terdokumentasi sebagai deviasi yang disengaja.

2. Modular by default
   - Fitur dipisah berdasarkan domain dan use case.
   - Komponen, composable, service, dan API route tidak dibuat monolitik.

3. Enterprise ready
   - Mendukung authentication, authorization, audit trail, logging, validasi, dan konfigurasi environment.

4. Dashboard oriented
   - UI admin menggunakan Nuxt UI dengan pola navigasi yang konsisten, cepat, dan responsif.

5. Upgrade-friendly
   - Struktur dibuat agar mudah di-migrate, di-scale, atau di-split ke layanan terpisah di masa depan bila diperlukan.

## Rekomendasi Teknologi

Catatan: gunakan versi stabil terbaru pada saat implementasi. Untuk target awal, asumsi teknis yang direkomendasikan adalah:

- Framework: Nuxt 4+
- UI: @nuxt/ui v4
- Runtime: Node.js LTS terbaru yang didukung
- Language: TypeScript
- Styling: Tailwind CSS melalui ekosistem Nuxt UI
- Fullstack layer: server routes, server utils, dan middleware Nuxt/Nitro
- Data access: ORM atau query builder sesuai kebutuhan proyek
- Validation: schema-based validation
- Auth: session-based untuk dashboard internal, token-based bila ada integrasi lintas aplikasi
- Testing: unit, integration, dan e2e untuk flow kritikal

## Gambaran Arsitektur

Nuxtcore disarankan memakai pendekatan modular monolith:

- Frontend app: halaman, layout, komponen UI, dashboard.
- Server app: API route, service layer, validation, dan integrasi.
- Shared layer: tipe, schema, utilitas, constants, dan helper lintas lapisan.
- Domain layer: logic bisnis per modul seperti user, role, master data, transaksi, laporan, dan pengaturan.

Dengan pola ini, flow sistem lama bisa dipertahankan tetapi implementasinya lebih bersih dan mudah diuji.

## Pola Modul Inti

Modul awal yang direkomendasikan:

- auth
- users
- roles
- permissions
- dashboard
- master-data
- transactions
- reports
- settings

Setiap modul idealnya memiliki:

- schema
- service
- route/API
- page atau view
- komponen reusable bila diperlukan

Jika sebuah modul hanya berisi tampilan tipis, logic bisnis tetap harus dipindahkan ke service layer agar struktur tetap enterprise-ready.

## Kapabilitas Inti

- Authentication dan session management
- Role-based access control
- Dashboard dengan navigasi modular
- CRUD master data
- Form transaksi dan proses bisnis bertahap
- Approval atau status workflow bila dibutuhkan sistem lama
- Reporting dan export data
- Audit trail dan logging aktivitas
- File upload dan manajemen lampiran
- Pengaturan sistem dan preferensi aplikasi

## Struktur Dokumentasi

- `docs/prd/system-prd.md` — kebutuhan produk utama dan aturan parity
- `docs/prd/system-rewrite-spec.md` — panduan rewrite dari sistem lama ke Nuxt
- `docs/architecture/system-architecture.md` — arsitektur sistem dan alur komponen
- `docs/architecture/folder-structure.md` — struktur folder dan modul yang direkomendasikan
- `docs/features/core-features.md` — panduan fitur inti dan flow utama
- `docs/development/development-workflow.md` — workflow pengembangan tim
- `docs/deployment/deployment-guide.md` — panduan deployment ke server

## Cara Memakai Repository Ini

1. Baca PRD untuk memahami ruang lingkup dan target perilaku sistem.
2. Gunakan rewrite spec sebagai referensi migrasi dari aplikasi lama.
3. Implementasikan struktur folder sesuai dokumen arsitektur.
4. Bangun fitur inti dari auth, dashboard, dan master data terlebih dahulu.
5. Tambahkan lapisan reporting, audit, dan integrasi setelah flow utama stabil.
6. Perbarui docs setiap ada perubahan proses bisnis atau keputusan arsitektur.

## Prioritas Implementasi yang Disarankan

Urutan yang disarankan untuk fase awal:

1. Fondasi proyek: layout, theme, config, environment, linting, dan struktur folder.
2. Authentication dan authorization.
3. Dashboard utama dan navigasi.
4. Master data inti.
5. Transaksi atau flow bisnis utama.
6. Reporting, audit trail, dan ekspor.
7. Deployment, observability, dan hardening.

## Rekomendasi Peningkatan Dibanding Sistem Lama

- Gunakan schema validation di seluruh input.
- Standarisasi response API dan error handling.
- Pisahkan service layer dari komponen UI.
- Tambahkan audit log untuk aksi penting.
- Buat akses role-based yang eksplisit per menu dan aksi.
- Sediakan dark mode dan layout adaptif untuk dashboard.
- Jadikan dokumentasi bagian dari definition of done.

## Catatan Penting

Dokumentasi ini sengaja dibuat generik namun enterprise-oriented agar dapat dipakai untuk banyak jenis sistem. Saat spesifikasi legacy sudah final, setiap modul dapat diisi ulang dengan flow yang lebih presisi tanpa mengubah prinsip arsitektur utamanya.
