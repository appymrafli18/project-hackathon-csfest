export type GradeItem = {
    id: number;
    kode: string;
    mataKuliah: string;
    semester: string;
    uts: number;
    uas: number;
    tugas: number;
    kuis: number;
    praktik: number;
    perbaikan?: number | null;
    aturanPenilaian: AturanPenilaian;
};

export type AturanPenilaian = {
    uts: number,
    uas: number,
    tugas: number,
    kuis: number,
    praktik: number,
};

type GPAItem = {
    id: number;
    gpa: number;
    semester: string;
}

export const DUMMY_GPA: GPAItem[] = [
    {
        id: 1,
        semester: "Semester 1",
        gpa: 3.0
    },
    {
        id: 1,
        semester: "Semester 2",
        gpa: 3.5
    },
    {
        id: 1,
        semester: "Semester 3",
        gpa: 2.8
    }
]

export const DUMMY_GRADES: GradeItem[] = [
    {
        id: 1,
        kode: "PW101",
        mataKuliah: "Pemrograman Web",
        semester: "Semester 3",
        uts: 78,
        uas: 82,
        tugas: 85,
        kuis: 80,
        praktik: 90,
        perbaikan: null,
        aturanPenilaian: {
            uts: 25,
            uas: 30,
            tugas: 20,
            kuis: 10,
            praktik: 15,
        }
    },
    {
        id: 2,
        kode: "BD201",
        mataKuliah: "Basis Data",
        semester: "Semester 2",
        uts: 70,
        uas: 75,
        tugas: 77,
        kuis: 72,
        praktik: 80,
        perbaikan: null,
        aturanPenilaian: {
            uts: 20,
            uas: 40,
            tugas: 25,
            kuis: 10,
            praktik: 15,
        }
    },
    {
        id: 3,
        kode: "SO301",
        mataKuliah: "Sistem Operasi",
        semester: "Semester 1",
        uts: 85,
        uas: 88,
        tugas: 80,
        kuis: 78,
        praktik: 85,
        perbaikan: 90,
        aturanPenilaian: {
            uts: 30,
            uas: 30,
            tugas: 20,
            kuis: 10,
            praktik: 10,
        }
    },
    {
        id: 4,
        kode: "AI401",
        mataKuliah: "Pengantar AI",
        semester: "Semester 3",
        uts: 65,
        uas: 70,
        tugas: 68,
        kuis: 60,
        praktik: 72,
        perbaikan: null,
        aturanPenilaian: {
            uts: 15,
            uas: 45,
            tugas: 25,
            kuis: 10,
            praktik: 15,
        }
    },
    {
        id: 5,
        kode: "JK101",
        mataKuliah: "Jaringan Komputer",
        semester: "Semester 1",
        uts: 88,
        uas: 86,
        tugas: 90,
        kuis: 84,
        praktik: 92,
        perbaikan: null,
        aturanPenilaian: {
            uts: 25,
            uas: 35,
            tugas: 25,
            kuis: 10,
            praktik: 40,
        }
    },
    {
        id: 6,
        kode: "UI501",
        mataKuliah: "UI/UX Design",
        semester: "Semester 2",
        uts: 80,
        uas: 78,
        tugas: 88,
        kuis: 82,
        praktik: 85,
        perbaikan: null,
        aturanPenilaian: {
            uts: 25,
            uas: 35,
            tugas: 40,
            kuis: 20,
            praktik: 40, // Proyek kamu masukkan sebagai Praktik
        }
    },
];