# Docs Quality Gate

## Tujuan

Menjaga kualitas dokumentasi agar tidak ambigu, tidak konflik, dan tetap konsisten dengan PRD.

## Kriteria Minimal

- tidak ambigu
- tidak konflik dengan PRD
- istilah konsisten
- tidak ada placeholder tersisa pada dokumen final
- ada owner atau tujuan yang jelas
- ada hubungan jelas ke dokumen induk
- tidak mendefinisikan ulang kebutuhan produk

## Prosedur Review

1. Cek hubungan ke PRD.
2. Cek apakah scope dokumen tunggal.
3. Cek istilah dan terminologi.
4. Cek apakah ada placeholder atau asumsi yang tidak terdokumentasi.
5. Cek apakah perubahan besar dicatat di changelog.

## Aturan Keputusan

- Jika konflik dengan PRD, dokumen harus direvisi.
- Jika ambigu, perjelas di dokumen induk.
- Jika terlalu lebar scope-nya, pecah menjadi dokumen yang lebih kecil.

## Output Review

- APPROVED
- NEEDS REVISION
- REJECTED
