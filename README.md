# CSFest Campus Portal

## Deskripsi Singkat
Platform dashboard akademik untuk CSFest yang menyatukan jadwal, tugas, presensi, pengumuman kampus, hingga peminjaman ruang perpustakaan dalam satu aplikasi React + Vite. Fokusnya adalah membantu mahasiswa memantau aktivitas akademik harian dengan antarmuka modern.

## Fitur Utama
- **Dashboard Home:** rangkuman tugas terdekat, jadwal hari ini, daftar mata kuliah aktif, serta CTA validasi presensi.
- **Manajemen Tugas & Kursus:** halaman detail tugas, daftar course per semester, dan proses enrolment berdasarkan jurusan/prodi.
- **Pengumuman & Event:** komponen pengumuman kampus, detail event, serta breadcrumb dinamis untuk memudahkan navigasi.
- **Presensi & Validasi:** utilitas `validateAttendance` yang menyimpan status presensi di `localStorage`.
- **Fitur Pendukung:** login form, halaman profil mahasiswa, peminjaman ruang perpustakaan, serta komponen UI shadcn yang siap pakai.

## Tech Stack
- React 19 + TypeScript
- Vite 7 untuk bundling dan dev server
- React Router DOM 7 untuk navigasi multi-halaman
- Tailwind CSS 4 + shadcn/ui + Radix UI primitives
- ESLint & TypeScript ESLint untuk kualitas kode

## Cara Menjalankan
1. Instal dependensi: `yarn install` (atau `npm install`).
2. Buat file `.env` jika diperlukan dan isi variabel yang dibutuhkan fitur tertentu.
3. Jalankan mode pengembangan: `yarn dev` lalu akses `http://localhost:5173`.
4. Untuk build produksi: `yarn build` dan pratinjau dengan `yarn preview`.
