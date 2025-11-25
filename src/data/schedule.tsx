export type DayKey = "monday" | "tuesday" | "wednesday" | "thursday" | "friday";
interface ScheduleItem {
    mataKuliah: string;
    jam: string;
    dosen: string;
    lokasi: string;
}

type ScheduleMap = Record<DayKey, ScheduleItem[]>;

export const schedule: ScheduleMap = {
    monday: [
        { mataKuliah: "Matematika Diskrit", jam: "07.30 - 10.50", dosen: "Dwi", lokasi: "Perpus2" },
        { mataKuliah: "Bahasa Indonesia", jam: "10.50 - 15.00", dosen: "Dinda", lokasi: "Perpus2" },
    ],
    tuesday: [
        { mataKuliah: "Algoritma & Pemrograman", jam: "07.30 - 10.50", dosen: "Iklima", lokasi: "PUT310" },
        { mataKuliah: "Bahasa Inggris untuk TIK", jam: "10.50 - 19.00", dosen: "Denil", lokasi: "GSG205" },
    ],
    wednesday: [
        { mataKuliah: "Organisasi & Arsitektur Komputer", jam: "07.30 - 10.50", dosen: "Fajar", lokasi: "PUT311" },
        { mataKuliah: "Pendidikan Agama", jam: "10.50 - 15.00", dosen: "Melisa", lokasi: "PUT311" },
    ],
    thursday: [
        { mataKuliah: "Pengantar Teknologi Informasi & Komunikasi", jam: "07.30 - 10.50", dosen: "Bambang", lokasi: "GSG204" },
        { mataKuliah: "Pancasila", jam: "15.15 - 18.55", dosen: "Kusnar", lokasi: "GSG204" },
    ],
    friday: [
        { mataKuliah: "Teknologi Multimedia", jam: "07.30 - 10.50", dosen: "Mera", lokasi: "GSG204" },
        { mataKuliah: "Sistem Operasi", jam: "13.20 - 16.55", dosen: "Hata", lokasi: "GSG204" },
    ],
};