# PRD Coverage Recursive Execution Plan

> **For Hermes:** Use Codex CLI gpt-5.4 thinking high for each step, then score the result, decide the next task, and continue recursively until PRD coverage is complete.

**Goal:** Menyelesaikan implementasi Nuxtcore sampai seluruh kebutuhan PRD terwakili dengan kualitas enterprise-grade, reusable-first, dan parity-first.

**Operating Rule:** Setiap hasil Codex harus dievaluasi sebelum lanjut. Jika hasil belum memenuhi standar, ulangi task yang sama atau perbaiki gap paling kritis terlebih dahulu. Jika sudah memenuhi, lanjutkan ke gap berikutnya dengan prioritas tertinggi terhadap PRD.

**Quality Target:** 100% PRD coverage berarti:
- Semua kebutuhan fungsional PRD punya implementasi atau keputusan eksplisit yang terdokumentasi.
- Semua kebutuhan non-fungsional PRD punya struktur/code-path atau kontrol yang relevan.
- Semua modul inti punya UI, state, service, dan permission story yang koheren.
- Semua deviasi dari legacy/parity dicatat jelas.
- Build dan typecheck lolos.
- Dokumentasi tetap sinkron dengan implementasi.

---

## Recursive Loop

Untuk setiap siklus:

1. Ambil satu task prioritas dari coverage gap.
2. Delegasikan ke Codex CLI.
3. Nilai hasilnya terhadap PRD.
4. Putuskan salah satu:
   - lanjut ke task berikutnya,
   - perbaiki task yang sama,
   - pecah task jadi subtask lebih kecil,
   - tandai sebagai intentionally deferred jika memang di luar scope PRD.
5. Update coverage matrix.
6. Ulangi sampai seluruh PRD hijau.

---

## Penilaian Hasil Codex

Setiap hasil dinilai dengan skor 0-5 untuk:

- PRD parity
- modularity
- reusability
- code quality
- documentation alignment
- test/build readiness

**Aturan keputusan:**
- 0-2: belum layak, perbaiki dulu
- 3: cukup, tapi masih ada gap penting
- 4: baik, boleh lanjut jika gap minor
- 5: selesai untuk task itu

Task dianggap selesai hanya jika minimal:
- skor total tinggi,
- tidak ada issue kritikal,
- build/typecheck lulus jika task menyentuh code,
- dan PRD mapping-nya jelas.

---

## Coverage Matrix Prioritas

### A. Core Product Flow
- authentication dan session management
- authorization / permission enforcement
- dashboard utama
- navigasi modular
- master data
- workflow / transaksi
- reporting
- settings

### B. Enterprise Controls
- audit trail
- logging
- error handling
- file upload / attachment
- observability
- security baseline

### C. Reusable Structure
- base components
- layout components
- shared types
- shared schemas
- module registry
- permission-aware navigation

### D. Quality Gates
- typecheck
- build
- docs sync
- changelog update
- ownership/governance consistency

### E. Deployment Readiness
- runtime config
- environment separation
- production topology
- rollback/release hygiene

---

## Task Selection Policy

Ambil task berikut dengan urutan ini:

1. Yang paling mengunci PRD parity.
2. Yang paling mengurangi risiko teknis.
3. Yang paling reusable untuk modul lain.
4. Yang paling mempengaruhi build/test readiness.
5. Yang paling penting untuk deployment readiness.

Jika dua task sama penting, pilih yang lebih kecil dan lebih cepat selesai agar feedback loop lebih rapat.

---

## Recursive Execution Stages

### Stage 1: PRD Parity Foundation
Fokus pada gap yang masih membuat produk belum lengkap sebagai enterprise starter.

### Stage 2: Module Completion
Lengkapi modul inti menjadi lebih nyata dan reusable.

### Stage 3: Control Plane Hardening
Perkuat permission, audit, logging, dan error handling.

### Stage 4: Deployment and Operational Readiness
Pastikan konfigurasi, release, dan operasional siap dipakai.

### Stage 5: Final Sweep
Bersihkan wording, warning, dan ketidakkonsistenan yang tersisa.

---

## Definition of Done for 100% Completion

Dokumen ini dianggap selesai jika:

- semua task prioritas PRD sudah dieksekusi atau dicatat secara eksplisit sebagai deferred;
- seluruh implementasi yang ada sudah divalidasi dengan build/typecheck;
- docs dan code saling sinkron;
- semua istilah penting konsisten;
- tidak ada placeholder casual tersisa di core docs atau scaffold;
- dan tidak ada gap besar terhadap PRD yang belum diputuskan.

---

## Cadence Pelaporan

Setelah setiap siklus Codex:

- laporkan hasilnya,
- jelaskan skor evaluasi,
- putuskan task berikutnya,
- update status coverage matrix,
- dan lanjutkan sampai semua PRD coverage selesai.

Saat coverage sudah 100%:

- hentikan recursive loop,
- laporkan ringkasan final,
- dan tandai area yang intentionally deferred, jika ada, beserta alasannya.

---

## Catatan Implementasi

Plan ini sengaja dibuat sebagai loop kerja, bukan one-shot plan. Tujuannya agar implementasi Nuxtcore benar-benar tuntas terhadap PRD, bukan sekadar selesai secara teknis.
