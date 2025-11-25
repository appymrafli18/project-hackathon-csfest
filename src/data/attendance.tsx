export type AttendanceStatus = "hadir" | "sakit" | "izin" | "alpha"

type WeekAttendance = {
    week: number
    date?: string
    status?: AttendanceStatus
}

type CourseAttendance = {
    id: string
    kode: string
    nama: string
    kelas: string
    semester: number
    tahun: string
    weeks: WeekAttendance[]
}

export const attendanceData: CourseAttendance[] = [
    {
        id: "c1",
        kode: "PW101",
        nama: "Pemrograman Web",
        kelas: "TKJ 2A",
        semester: 2,
        tahun: "2024",
        weeks: [
            { week: 1, date: "2024-08-25", status: "hadir" },
            { week: 2, date: "2024-09-01", status: "hadir" },
            { week: 3, date: "2024-09-08", status: "izin" },
            { week: 4, date: "2024-09-15", status: "hadir" },
            { week: 5, date: "2024-09-22", status: "alpha" },
            { week: 6, date: "2024-09-29", status: "sakit" },
        ],
    },
    {
        id: "c2",
        kode: "BD202",
        nama: "Basis Data",
        kelas: "TKJ 2A",
        semester: 2,
        tahun: "2024",
        weeks: [
            { week: 1, date: "2024-08-25", status: "hadir" },
            { week: 2, date: "2024-09-01", status: "hadir" },
            { week: 3, date: "2024-09-08", status: "hadir" },
            { week: 4, date: "2024-09-15", status: "hadir" },
            { week: 5, date: "2024-09-22", status: "hadir" },
        ],
    },
    {
        id: "c3",
        kode: "JK303",
        nama: "Jaringan Komputer",
        kelas: "TKJ 2A",
        semester: 3,
        tahun: "2025",
        weeks: [
            { week: 1, date: "2025-02-10", status: "hadir" },
            { week: 2, date: "2025-02-17", status: "sakit" },
            { week: 3, date: "2025-02-24", status: "izin" },
        ],
    },
    {
        id: "s1-md",
        kode: "MD101",
        nama: "Matematika Diskrit",
        kelas: "TI 1A",
        semester: 1,
        tahun: "2025",
        weeks: [
            { week: 1, date: "2025-10-27", status: "hadir" },
            { week: 2, date: "2025-11-03", status: "hadir" },
            { week: 3, date: "2025-11-10", status: "izin" },
            { week: 4, date: "2025-11-17", status: "hadir" },
        ],
    },
    {
        id: "s1-bi",
        kode: "BI102",
        nama: "Bahasa Indonesia",
        kelas: "TI 1A",
        semester: 1,
        tahun: "2025",
        weeks: [
            { week: 1, date: "2025-10-27", status: "hadir" },
            { week: 2, date: "2025-11-03", status: "hadir" },
            { week: 3, date: "2025-11-10", status: "sakit" },
            { week: 4, date: "2025-11-17", status: "hadir" },
        ],
    },
    {
        id: "s1-ap",
        kode: "AP103",
        nama: "Algoritma & Pemrograman",
        kelas: "TI 1A",
        semester: 1,
        tahun: "2025",
        weeks: [
            { week: 1, date: "2025-10-28", status: "hadir" },
            { week: 2, date: "2025-11-04", status: "hadir" },
            { week: 3, date: "2025-11-11", status: "izin" },
            { week: 4, date: "2025-11-18", status: "hadir" },
        ],
    },
    {
        id: "s1-bitik",
        kode: "ENG104",
        nama: "Bahasa Inggris untuk TIK",
        kelas: "TI 1A",
        semester: 1,
        tahun: "2025",
        weeks: [
            { week: 1, date: "2025-10-28", status: "hadir" },
            { week: 2, date: "2025-11-04", status: "hadir" },
            { week: 3, date: "2025-11-11", status: "hadir" },
            { week: 4, date: "2025-11-18", status: "hadir" },
        ],
    },
    {
        id: "s1-oak",
        kode: "OAK105",
        nama: "Organisasi & Arsitektur Komputer",
        kelas: "TI 1A",
        semester: 1,
        tahun: "2025",
        weeks: [
            { week: 1, date: "2025-10-29", status: "hadir" },
            { week: 2, date: "2025-11-05", status: "hadir" },
            { week: 3, date: "2025-11-12", status: "sakit" },
            { week: 4, date: "2025-11-19", status: "hadir" },
        ],
    },
    {
        id: "s1-pa",
        kode: "PA106",
        nama: "Pendidikan Agama",
        kelas: "TI 1A",
        semester: 1,
        tahun: "2025",
        weeks: [
            { week: 1, date: "2025-10-29", status: "hadir" },
            { week: 2, date: "2025-11-05", status: "hadir" },
            { week: 3, date: "2025-11-12", status: "izin" },
            { week: 4, date: "2025-11-19", status: "hadir" },
        ],
    },
    {
        id: "s1-ptik",
        kode: "PTIK107",
        nama: "Pengantar Teknologi Informasi & Komunikasi",
        kelas: "TI 1A",
        semester: 1,
        tahun: "2025",
        weeks: [
            { week: 1, date: "2025-10-30", status: "hadir" },
            { week: 2, date: "2025-11-06", status: "hadir" },
            { week: 3, date: "2025-11-13", status: "hadir" },
            { week: 4, date: "2025-11-20", status: "alpha" },
        ],
    },
    {
        id: "s1-pancasila",
        kode: "PNC108",
        nama: "Pancasila",
        kelas: "TI 1A",
        semester: 1,
        tahun: "2025",
        weeks: [
            { week: 1, date: "2025-10-30", status: "hadir" },
            { week: 2, date: "2025-11-06", status: "izin" },
            { week: 3, date: "2025-11-13", status: "hadir" },
            { week: 4, date: "2025-11-20", status: "hadir" },
        ],
    },
    {
        id: "s1-mm",
        kode: "MM109",
        nama: "Teknologi Multimedia",
        kelas: "TI 1A",
        semester: 1,
        tahun: "2025",
        weeks: [
            { week: 1, date: "2025-10-31", status: "hadir" },
            { week: 2, date: "2025-11-07", status: "hadir" },
            { week: 3, date: "2025-11-14", status: "sakit" },
            { week: 4, date: "2025-11-21", status: "hadir" },
        ],
    },
    {
        id: "s1-so",
        kode: "SO110",
        nama: "Sistem Operasi",
        kelas: "TI 1A",
        semester: 1,
        tahun: "2025",
        weeks: [
            { week: 1, date: "2025-10-31", status: "hadir" },
            { week: 2, date: "2025-11-07", status: "izin" },
            { week: 3, date: "2025-11-14", status: "hadir" },
            { week: 4, date: "2025-11-21", status: "hadir" },
        ],
    },

]

export function addValidAttendanceToData(
    courseName: string,
    dateString: string,
    status: "hadir" | "izin" | "sakit" | "alpha" = "hadir"
) {
    const course = attendanceData.find(c => c.nama === courseName);

    if (!course) {
        console.warn("Course not found:", courseName);
        return;
    }

    const date = new Date(dateString);

    // Cari minggu pertama yang punya date
    const firstWeek = course.weeks.find(w => !!w.date);

    if (!firstWeek?.date) {
        console.error("No valid date found on course weeks:", courseName);
        return;
    }

    const firstWeekDate = new Date(firstWeek.date);

    // Hitung jarak hari
    const diffTime = date.getTime() - firstWeekDate.getTime();
    const diffDays = diffTime / (1000 * 3600 * 24);

    // Hitung week
    const weekNumber = Math.floor(diffDays / 7) + 1;

    // Cegah duplikasi
    const alreadyExists = course.weeks.some(w => w.week === weekNumber);
    if (alreadyExists) {
        console.warn(`Presensi week ${weekNumber} sudah ada untuk ${courseName}`);
        return;
    }

    // Tambahkan
    course.weeks.push({
        week: weekNumber,
        date: dateString,
        status,
    });

    // Urutkan
    course.weeks.sort((a, b) => a.week - b.week);
}
