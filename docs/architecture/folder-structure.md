# Folder Structure and Module Design

## 1. Tujuan Struktur Folder

Struktur folder ini dirancang agar Nuxtcore tetap:

- modular
- mudah dibaca
- siap enterprise
- dekat dengan domain
- mudah di-scale

Struktur ini adalah rekomendasi awal. Penamaan dapat disesuaikan dengan kebutuhan tim, tetapi prinsip pemisahan tanggung jawab harus dipertahankan.

## 2. Struktur yang Direkomendasikan

```text
.
├── app/
│   ├── app.config.ts
│   ├── app.vue
│   ├── assets/
│   │   └── css/
│   │       └── main.css
│   ├── components/
│   │   ├── base/
│   │   ├── dashboard/
│   │   ├── forms/
│   │   ├── navigation/
│   │   └── tables/
│   ├── composables/
│   ├── layouts/
│   ├── middleware/
│   ├── pages/
│   ├── plugins/
│   └── utils/
├── components/
│   └── shared/
├── composables/
│   ├── auth/
│   ├── useApi.ts
│   ├── usePermission.ts
│   └── useNotification.ts
├── docs/
│   ├── architecture/
│   ├── deployment/
│   ├── development/
│   ├── features/
│   └── prd/
├── layers/
│   ├── base/
│   ├── auth/
│   ├── dashboard/
│   └── shared/
├── modules/
│   ├── users/
│   ├── roles/
│   ├── permissions/
│   ├── master-data/
│   ├── transactions/
│   ├── reports/
│   └── settings/
├── server/
│   ├── api/
│   ├── auth/
│   ├── db/
│   ├── repositories/
│   ├── services/
│   ├── utils/
│   └── validators/
├── shared/
│   ├── constants/
│   ├── schemas/
│   ├── types/
│   └── helpers/
├── public/
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── nuxt.config.ts
├── package.json
└── tsconfig.json
```

## 3. Penjelasan Setiap Area

### 3.1 app/

Berisi entry point aplikasi dan lapisan presentasi Nuxt.

- app.vue: shell utama aplikasi.
- app.config.ts: konfigurasi UI dan brand app.
- assets/css/main.css: entry stylesheet untuk Tailwind dan Nuxt UI.
- pages/: route berbasis file.
- layouts/: layout auth, dashboard, dan minimal.
- middleware/: route guard.
- plugins/: plugin client/server.

### 3.2 components/

Berisi komponen reusable yang dapat dipakai lintas halaman.

Rekomendasi subfolder:

- base/: komponen generik.
- dashboard/: komponen khusus dashboard.
- forms/: field, wrapper, dan pola form.
- tables/: tabel, toolbar, dan pagination.
- navigation/: sidebar, topbar, breadcrumb.

Jika komponen hanya dipakai satu modul, simpan di dalam folder modul tersebut. Pindahkan ke shared/components hanya jika benar-benar lintas domain.

### 3.3 composables/

Berisi reusable logic berbasis Composition API.

Contoh:

- useApi untuk request standar.
- usePermission untuk cek akses.
- useNotification untuk toast dan alert.

### 3.4 modules/

Folder ini adalah inti modularisasi domain.

Contoh domain:

- auth
- users
- roles
- permissions
- dashboard
- master-data
- transactions
- reports
- settings

Setiap domain idealnya punya:

- pages
- components
- services
- types
- schema
- constants
- tests

### 3.5 server/

Berisi implementasi backend internal Nuxt.

- api/: endpoint HTTP.
- services/: logika bisnis.
- repositories/: akses data.
- validators/: validasi request.
- auth/: helper autentikasi.
- db/: koneksi database atau client.

### 3.6 shared/

Berisi artefak lintas lapisan.

- constants: enum dan nilai tetap.
- schemas: schema validasi.
- types: tipe TypeScript.
- helpers: utility functions.

## 4. Pola Penamaan

### File dan Folder

- Gunakan nama jelas dan konsisten.
- Hindari singkatan yang tidak umum.
- Gunakan kebiasaan domain yang dipahami tim.

### Komponen

- Komponen UI menggunakan PascalCase.
- Folder domain menggunakan kebab-case atau domain name yang konsisten.

### Service dan API

- Satu file untuk satu tanggung jawab bila memungkinkan.
- Hindari file service yang terlalu besar.

## 5. Prinsip Modular per Domain

Untuk setiap domain utama, ikuti pola berikut:

- UI halaman domain berada dekat dengan domainnya.
- Service domain tidak mencampur aturan domain lain.
- Schema validasi domain disimpan bersama domainnya.
- Permission domain dideklarasikan secara eksplisit.

## 6. Contoh Struktur Domain

```text
modules/users/
├── components/
├── pages/
├── services/
├── schemas/
├── types/
└── constants/
```

Pola ini bisa diulang untuk role, permission, master data, transaksi, dan laporan.

## 7. Rekomendasi Praktik Struktur

- Komponen yang hanya dipakai satu halaman tetap boleh lokal di dekat halaman.
- Komponen yang dipakai lintas modul pindahkan ke folder shared.
- Logic bisnis jangan ditempel di page component.
- API handler jangan berisi query kompleks tanpa service.
- Schema validasi jangan diulang di banyak tempat.

## 8. Mapping terhadap Legacy

Saat memindahkan sistem lama, gunakan pendekatan berikut:

- Folder lama yang berbasis fitur -> domain module.
- Helper lama yang bercampur -> shared/helper atau server/utils.
- View lama yang bercampur data access -> pisahkan ke page + service.

## 9. Rekomendasi untuk Tahap Awal

Jika proyek masih kecil, cukup aktifkan bagian berikut terlebih dahulu:

- app/
- components/
- composables/
- pages/
- server/
- shared/
- docs/

Folder lain seperti layers/ dan tests/ dapat bertambah saat kebutuhan muncul.

Untuk scaffold awal Nuxtcore, struktur minimum yang paling aman adalah: app/, server/, shared/, docs/, dan tests/.
