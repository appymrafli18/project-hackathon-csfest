export interface AssignmentItem {
    id: number;
    title: string;
    matkul: string;
    matkulid: number;
    date: string;
    status: "pending" | "completed" | "overdue";
}

export const assignments: AssignmentItem[] = [
    {
        id: 1,
        title: "Laporan Praktikum Sistem Operasi",
        matkul: "TI-Sistem Operasi-TI 1",
        matkulid: 6,
        date: "2025-11-23T23:59:00",
        status: "overdue"
    },
    {
        id: 2,
        title: "Essay Bahasa Inggris - Teknologi di Masa Depan",
        matkul: "TI-Bahasa Inggris untuk TIK 1",
        matkulid: 1,
        date: "2025-11-28T23:59:00",
        status: "completed"
    },
    {
        id: 3,
        title: "Ringkasan Materi Etika Profesi",
        matkul: "TI-Etika Profesi & Hukum Siber",
        matkulid: 10,
        date: "2025-11-29T10:00:00",
        status: "pending"
    },
    {
        id: 4,
        title: "Tugas Algoritma — Study Case Perulangan",
        matkul: "TI-Algoritma & Pemrograman-TI 1",
        matkulid: 8,
        date: "2025-12-02T18:00:00",
        status: "pending"
    },
    {
        id: 5,
        title: "Analisis Struktur Kalimat",
        matkul: "TI-Bahasa Indonesia-TI 1",
        matkulid: 4,
        date: "2025-11-27T23:59:00",
        status: "completed"
    },
    {
        id: 6,
        title: "Pengantar TIK — Rangkuman 2 Bab",
        matkul: "TI-Pengantar Teknologi Informasi & Komunikasi",
        matkulid: 7,
        date: "2025-11-28T23:59:00",
        status: "pending"
    },
    {
        id: 7,
        title: "Matematika Diskrit — Logika Dasar",
        matkul: "TI-Matematika Diskrit-TI 1",
        matkulid: 3,
        date: "2025-11-29T23:59:00",
        status: "overdue"
    },
    {
        id: 8,
        title: "Teknologi Multimedia — Pengenalan Media",
        matkul: "TI-Teknologi Multimedia-TI 1",
        matkulid: 2,
        date: "2025-11-30T23:59:00",
        status: "pending"
    },
    {
        id: 9,
        title: "Organisasi Komputer — Gambar Diagram Block",
        matkul: "TI-Organisasi & Arsitektur Komputer",
        matkulid: 5,
        date: "2025-12-01T23:59:00",
        status: "completed"
    }
];