# Docs Governance

## 1. Tujuan

Dokumen ini menjelaskan bagaimana dokumentasi Nuxtcore dikelola, direview, dan dipublikasikan secara berkelanjutan.

## 2. Ownership

- PRD: owner produk / stakeholder domain utama
- Rewrite spec: owner arsitektur / implementasi
- Architecture: owner teknis
- Workflow: owner engineering
- Deployment: owner infra / devops

## 3. Kapan Docs Harus Diperbarui

Docs wajib diperbarui jika ada:

- perubahan flow bisnis
- perubahan istilah domain
- perubahan struktur folder atau modul
- perubahan route atau layout besar
- perubahan deployment topology
- perubahan keputusan arsitektur

## 4. Approval Flow

1. Draft
2. Review
3. Approved
4. Published

## 5. Prinsip Review

- PRD harus bebas ambigu.
- Rewrite spec tidak boleh mengubah definisi produk.
- Dokumen turunan harus mengacu ke dokumen induk.
- Perubahan besar harus masuk changelog.

## 6. Minimum Review Checklist

- Apakah dokumen ini jelas owner-nya?
- Apakah scope-nya tunggal?
- Apakah ada konflik dengan PRD?
- Apakah ada istilah ambigu?
- Apakah ada linkage ke dokumen induk?

## 7. Catatan

Governance harus ringan, operasional, dan tidak over-process. Tujuannya menjaga docs tetap hidup, bukan menambah birokrasi.
