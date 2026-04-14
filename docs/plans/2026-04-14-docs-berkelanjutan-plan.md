# Docs Berkelanjutan Implementation Plan

> **For Hermes:** Use subagent-driven-development skill to implement this plan task-by-task.

**Goal:** Membangun sistem dokumentasi Nuxtcore yang berkelanjutan, konsisten, dan mudah dipelihara untuk starter enterprise Nuxt fullstack berbasis Nuxt 4+ dan Nuxt UI dashboard.

**Architecture:** Dokumentasi diposisikan sebagai sumber keputusan produk dan arsitektur, dengan PRD sebagai sumber kebenaran utama, rewrite spec sebagai panduan migrasi, dan dokumen turunan sebagai panduan operasional. Implementasi docs harus modular, reusable, dan menjaga parity legacy-first. Setiap dokumen harus memiliki tujuan tunggal, hubungan yang jelas ke dokumen induk, dan mekanisme pembaruan yang tidak menimbulkan ambiguitas.

**Tech Stack:** Markdown, Nuxt 4+, @nuxt/ui v4, TypeScript, Git, docs folder structure, reusable templates.

---

## Prinsip Kerja

- PRD adalah sumber kebenaran utama.
- Rewrite spec hanya untuk migrasi dan implementasi.
- Dokumen turunan tidak boleh mendefinisikan ulang kebutuhan produk.
- Setiap perubahan flow harus tercermin di docs.
- Komponen/referensi yang bisa diulang harus dijadikan reusable template.
- Bahasa harus tegas, tidak ambigu, dan konsisten.
- Dokumentasi harus scalable untuk banyak domain, bukan hanya satu fitur.

---

## Scope Implementasi Docs Berkelanjutan

Target output docs berkelanjutan untuk Nuxtcore:

1. Struktur dokumentasi inti yang stabil.
2. Template dokumen untuk PRD, rewrite spec, architecture, features, workflow, deployment, dan changelog.
3. Aturan ownership dan review docs.
4. Mekanisme versi dan perubahan docs.
5. Daftar cek kualitas dokumentasi.
6. Prosedur sinkronisasi docs dengan perubahan kode.

---

## Task 1: Finalisasi sumber kebenaran dokumen

**Objective:** Menetapkan dokumen induk dan relasi prioritas agar tidak ada ambiguitas antardokumen.

**Files:**
- Modify: `README.md`
- Modify: `docs/README.md`
- Modify: `docs/prd/system-prd.md`
- Modify: `docs/prd/system-rewrite-spec.md`

**Step 1: Define document hierarchy**

Tambahkan definisi eksplisit berikut di README dan docs index:
- PRD = sumber kebenaran kebutuhan produk
- rewrite spec = panduan migrasi dan implementasi
- dokumen lain = turunan yang tidak boleh mendefinisikan ulang kebutuhan

**Step 2: Tighten ambiguity rules**

Tambahkan aturan bahwa jika ada istilah atau flow yang belum jelas, keputusan harus dicatat sebagai parity exact / parity equivalent / intentional upgrade.

**Step 3: Normalize cross-references**

Pastikan semua dokumen merujuk ke PRD secara konsisten dan tidak saling bertentangan.

**Step 4: Verification**

Run: manual review terhadap semua dokumen inti
Expected: hierarki dokumen eksplisit, tidak ada pernyataan yang saling bertabrakan

---

## Task 2: Buat template dokumen inti yang reusable

**Objective:** Menyediakan pola dokumen standar agar pembuatan docs baru cepat, konsisten, dan minim interpretasi.

**Files:**
- Create: `docs/templates/prd-template.md`
- Create: `docs/templates/rewrite-spec-template.md`
- Create: `docs/templates/architecture-template.md`
- Create: `docs/templates/features-template.md`
- Create: `docs/templates/workflow-template.md`
- Create: `docs/templates/deployment-template.md`
- Modify: `docs/README.md`

**Step 1: Define PRD template**

Isi template dengan bagian minimal:
- status dokumen
- ringkasan produk
- prinsip dasar
- ruang lingkup
- persona
- kebutuhan fungsional
- kebutuhan non-fungsional
- definisi terminologi
- kriteria keberhasilan

**Step 2: Define rewrite template**

Isi template dengan bagian minimal:
- tujuan rewrite
- prinsip rewrite
- fase migrasi
- kategori keputusan
- pola implementasi
- risiko dan mitigasi
- template mapping legacy

**Step 3: Define architecture template**

Isi template dengan bagian minimal:
- gambaran umum
- lapisan arsitektur
- data flow
- auth/access control
- logging/audit
- deployment topology
- keputusan teknis

**Step 4: Define feature/workflow/deployment templates**

Buat format yang konsisten dan reusable untuk dokumen turunan.

**Step 5: Verification**

Run: cek semua template dapat dipakai sebagai starting point untuk domain baru
Expected: template jelas, pendek, dan tidak mengandung definisi produk yang saling bertabrakan

---

## Task 3: Buat dokumen governance untuk docs

**Objective:** Menjelaskan siapa yang bertanggung jawab, bagaimana perubahan docs disetujui, dan kapan docs wajib diperbarui.

**Files:**
- Create: `docs/governance/docs-governance.md`
- Modify: `docs/README.md`
- Modify: `README.md`

**Step 1: Define ownership rules**

Tulis aturan:
- siapa owner PRD
- siapa owner rewrite spec
- siapa reviewer arsitektur
- siapa yang wajib memperbarui docs saat flow berubah

**Step 2: Define change triggers**

Dokumentasikan kapan docs harus diperbarui, misalnya:
- perubahan flow bisnis
- perubahan istilah domain
- perubahan struktur folder
- perubahan route atau layout besar
- perubahan deployment topology

**Step 3: Define approval flow**

Tambahkan alur review:
- draft
- review
- approved
- published

**Step 4: Verification**

Pastikan governance singkat, operasional, dan tidak berlebihan.
Expected: tim tahu kapan dan bagaimana docs berubah

---

## Task 4: Buat sistem changelog dokumentasi

**Objective:** Memastikan perubahan docs tercatat secara kronologis dan mudah ditelusuri.

**Files:**
- Create: `docs/changelog/docs-changelog.md`
- Create: `docs/changelog/README.md`
- Modify: `docs/README.md`

**Step 1: Define changelog format**

Format minimal:
- tanggal
- dokumen yang berubah
- alasan perubahan
- dampak terhadap implementasi
- status parity/upgrade

**Step 2: Add initial entries**

Catat perubahan docs utama yang sudah ada saat ini sebagai baseline.

**Step 3: Define maintenance rule**

Setiap perubahan docs besar wajib masuk changelog.

**Step 4: Verification**

Expected: changelog bisa dipakai sebagai audit trail keputusan dokumentasi

---

## Task 5: Perkuat docs modular untuk starter enterprise

**Objective:** Menjadikan docs tidak hanya lengkap, tetapi modular dan reusable untuk banyak domain bisnis.

**Files:**
- Modify: `docs/architecture/folder-structure.md`
- Modify: `docs/features/core-features.md`
- Modify: `docs/development/development-workflow.md`
- Modify: `README.md`

**Step 1: Standardize modular vocabulary**

Pastikan semua dokumen konsisten memakai istilah:
- module
- domain
- service
- schema
- route
- layout
- reusable component

**Step 2: Add reusable docs patterns**

Tambahkan pola yang berulang untuk:
- halaman list
- form
- detail
- workflow
- dashboard widget
- reusable component contract

**Step 3: Tie docs to reusable code conventions**

Jelaskan bahwa komponen reusable harus diutamakan dalam implementasi dan docs, agar dokumen dan struktur kode sejalan.

**Step 4: Verification**

Expected: docs mendukung arsitektur modular, bukan sekadar daftar fitur

---

## Task 6: Tambahkan proses sinkronisasi docs ke workflow pengembangan

**Objective:** Agar docs selalu mengikuti perubahan implementasi tanpa tertinggal.

**Files:**
- Modify: `docs/development/development-workflow.md`
- Modify: `README.md`
- Create: `docs/development/docs-sync-checklist.md`

**Step 1: Define sync checkpoints**

Tambahkan checkpoint docs pada:
- sebelum implementasi
- setelah implementasi
- sebelum merge
- setelah release

**Step 2: Define docs checklist**

Checklist minimal:
- apakah PRD terdampak?
- apakah rewrite spec terdampak?
- apakah architecture terdampak?
- apakah feature/deployment docs terdampak?
- apakah changelog perlu diperbarui?

**Step 3: Define “no docs, no done” rule**

Untuk perubahan besar, implementasi belum dianggap selesai jika docs belum diperbarui.

**Step 4: Verification**

Expected: workflow pengembangan memaksa docs ikut hidup bersama kode

---

## Task 7: Standarisasi format dokumen teknis baru

**Objective:** Memastikan dokumen baru yang ditambahkan nanti selalu mengikuti format yang sama dan mudah dipakai ulang.

**Files:**
- Create: `docs/templates/technical-note-template.md`
- Create: `docs/templates/decision-record-template.md`
- Modify: `docs/README.md`

**Step 1: Add lightweight technical note template**

Untuk catatan singkat yang tidak layak menjadi dokumen penuh.

**Step 2: Add decision record template**

Untuk keputusan penting yang memengaruhi flow atau arsitektur.

**Step 3: Verification**

Expected: catatan kecil tidak merusak struktur docs utama

---

## Task 8: Buat halaman index docs yang mudah dinavigasi

**Objective:** Menyederhanakan akses semua dokumen agar tim tidak bingung mencari referensi.

**Files:**
- Modify: `docs/README.md`
- Modify: `README.md`

**Step 1: Group docs by purpose**

Kelompokkan menjadi:
- source of truth
- architecture
- implementation guides
- workflow and governance
- deployment
- changelog
- templates

**Step 2: Add reading order by role**

Misalnya:
- product owner membaca PRD + changelog
- developer membaca architecture + workflow
- deployer membaca deployment guide + checklist

**Step 3: Verification**

Expected: indeks docs jelas untuk semua peran

---

## Task 9: Buat quality gate dokumentasi

**Objective:** Menjaga kualitas docs tetap tinggi dan konsisten dari waktu ke waktu.

**Files:**
- Create: `docs/governance/docs-quality-gate.md`
- Modify: `docs/README.md`

**Step 1: Add quality criteria**

Kriteria minimal:
- tidak ambigu
- tidak konflik dengan PRD
- istilah konsisten
- tidak ada placeholder kosong
- ada owner/tujuan yang jelas
- ada hubungan jelas ke dokumen induk

**Step 2: Add review routine**

Dokumen baru harus lolos review sebelum dipublikasikan.

**Step 3: Verification**

Expected: dokumen buruk bisa ditolak sebelum merusak ekosistem docs

---

## Task 10: Final integrity review

**Objective:** Memastikan seluruh sistem docs konsisten, tidak ambigu, dan siap dipakai berkelanjutan.

**Files:**
- Review: semua file dalam `docs/`
- Review: `README.md`

**Step 1: Cross-check all references**

Pastikan PRD, rewrite spec, architecture, features, workflow, deployment, governance, template, dan changelog saling selaras.

**Step 2: Remove ambiguity**

Cari istilah yang ganda atau kontradiktif, lalu perjelas di dokumen induk.

**Step 3: Confirm modularity**

Pastikan docs bisa dipakai untuk lebih dari satu domain proyek.

**Step 4: Verification**

Expected: docs final sudah siap menjadi sistem dokumentasi berkelanjutan untuk Nuxtcore

---

## Urutan Eksekusi yang Disarankan

1. Finalisasi sumber kebenaran dokumen
2. Buat template reusable
3. Buat governance docs
4. Buat changelog docs
5. Perkuat modular docs
6. Tambahkan sinkronisasi docs ke workflow
7. Standarisasi technical note dan decision record
8. Rapikan index docs
9. Tambahkan quality gate
10. Final integrity review

---

## Definisi Selesai

Dokumentasi berkelanjutan dianggap selesai jika:

- PRD tegas sebagai sumber kebenaran
- rewrite spec tidak ambigu dan tidak mendefinisikan ulang kebutuhan
- template reusable tersedia
- governance docs jelas
- changelog ada
- workflow memaksa sinkronisasi docs
- struktur docs modular dan mudah dipakai ulang
- quality gate berjalan
- semua referensi saling konsisten

---

## Catatan Implementasi

