# ELEARNING REVAMPS

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
1. Instal nodejs terlebih dahulu
2. Instal yarn juga menggunakan terminal `npm install --global yarn`
3. Instal dependensi: `yarn install` (atau `npm install`).
4. Tarik proyekan dari `https://github.com/DanarGdg/project-hackathon-csfest-wifichecker`
5. Jalankan mode pengembangan: `yarn dev` (atau `npm run dev`) lalu akses `http://localhost:5173`.
6. Untuk build produksi: `yarn build` (atau `npm run build`) dan pratinjau dengan `yarn preview` (atau `npm run preview`).
