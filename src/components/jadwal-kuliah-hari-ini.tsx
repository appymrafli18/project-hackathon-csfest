"use client";

import { Card } from "@/components/ui/card";
import { Clock, User, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

type DayKey = "monday" | "tuesday" | "wednesday" | "thursday" | "friday";
interface ScheduleItem {
    mataKuliah: string;
    jam: string;
    dosen: string;
    lokasi: string;
}

type ScheduleMap = Record<DayKey, ScheduleItem[]>;

const schedule: ScheduleMap = {
    monday: [
        { mataKuliah: "Matematika Diskrit", jam: "07.30 - 10.50", dosen: "Dwi", lokasi: "Perpus2" },
        { mataKuliah: "Bahasa Indonesia", jam: "10.50 - 15.00", dosen: "Dinda", lokasi: "Perpus2" },
        { mataKuliah: "Bahasa Indonesia", jam: "17:00 - 18.00", dosen: "Dinda", lokasi: "Perpus2" },
    ],
    tuesday: [
        { mataKuliah: "Algoritma & Pemrograman", jam: "07.30 - 10.50", dosen: "Iklima", lokasi: "PUT310" },
        { mataKuliah: "Bahasa Inggris untuk TIK", jam: "10.50 - 15.00", dosen: "Denil", lokasi: "GSG205" },
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

const getTodayKey = (): DayKey => {
    const today = new Date().getDay();
    const map = [null, "monday", "tuesday", "wednesday", "thursday", "friday"] as const;
    return map[today] || "monday";
};

function getStatus(jam: string) {
    const [start, end] = jam.split(" - ");
    const now = new Date();

    const parseTime = (t: string) => {
        const [h, m] = t.split(".").map(Number);
        const d = new Date();
        d.setHours(h, m, 0, 0);
        return d;
    };

    const startTime = parseTime(start);
    const endTime = parseTime(end);

    if (now >= startTime && now <= endTime) {
        return { label: "Berlangsung", class: "bg-green-100 text-green-700" };
    }

    if (now > endTime) {
        return { label: "Sudah selesai", class: "bg-red-100 text-red-700" };
    }

    return { label: "Belum mulai", class: "bg-gray-100 text-gray-600" };
}

export default function JadwalHariIni() {
    const todayKey = getTodayKey();

    const formattedDate = new Date().toLocaleDateString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    return (
        <div className="space-y-4">
            <h1 className="text-xl font-semibold">
                Jadwal Hari Ini — {formattedDate}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {schedule[todayKey].map((item, i) => {
                    const status = getStatus(item.jam);

                    return (
                        <Card key={i} className="rounded-2xl shadow-sm border p-4">
                            <div className="flex flex-col gap-3">
                                {/* Badge */}
                                <div
                                    className={cn(
                                        "inline-flex px-3 py-1 text-xs font-semibold rounded-full w-fit",
                                        status.class
                                    )}
                                >
                                    {status.label}
                                </div>

                                {/* Mata Kuliah */}
                                <h2 className="font-bold text-lg">{item.mataKuliah}</h2>

                                {/* Detail */}
                                <div className="space-y-1 text-sm text-gray-700">
                                    <div className="flex items-center gap-2">
                                        <Clock size={16} /> {item.jam}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MapPin size={16} /> {item.lokasi}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <User size={16} /> {item.dosen}
                                    </div>
                                </div>
                            </div>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}