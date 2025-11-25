import { schedule, type DayKey } from "@/data/schedule";
import { timeToMinutes } from "./utils";
import { addValidAttendanceToData } from "@/data/attendance";

function isInsideCampus(userLat: number, userLng: number) {
    const kampus = { lat: -6.363, lng: 106.824 };
    const R = 6371e3;
    const dLat = (userLat - kampus.lat) * Math.PI / 180;
    const dLng = (userLng - kampus.lng) * Math.PI / 180;

    const a = Math.sin(dLat / 2) ** 2 +
        Math.cos(kampus.lat * Math.PI / 180) *
        Math.cos(userLat * Math.PI / 180) *
        Math.sin(dLng / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return distance <= 2000;
}

async function isUsingPNJWifi() {
    try {
        const res = await fetch("http://localhost:3000/check-wifi");
        const data = await res.json();
        return data.usingPNJWifi;
    } catch (err) {
        console.error("WiFi check error:", err);
        return false;
    }
}

function isValidTime() {
    const hour = new Date().getHours();
    return hour >= 7 && hour <= 18;
}

function getCurrentCourseMessage() {
    const now = new Date();
    const day = now
        .toLocaleDateString("en-US", { weekday: "long" })
        .toLowerCase() as DayKey;

    const list = schedule[day];
    if (!list) return null;

    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    for (const item of list) {
        const [start, end] = item.jam.split("-").map(j => j.trim());

        const startMin = timeToMinutes(start.replace(".", ":"));
        const endMin = timeToMinutes(end.replace(".", ":"));

        if (currentMinutes >= startMin && currentMinutes <= endMin) {
            return `Presensi anda valid dalam mata kuliah ${item.mataKuliah}`;
        }
    }

    return null;
}

export async function validateAttendance() {
    const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });

    const isValidLocation = isInsideCampus(
        position.coords.latitude,
        position.coords.longitude
    );

    const isValidNetwork = await isUsingPNJWifi();

    if (isValidLocation && isValidTime() && isValidNetwork) {
        const courseMessage = getCurrentCourseMessage();

        if (courseMessage) {
            const courseName = courseMessage.replace("Presensi anda valid dalam mata kuliah ", "");

            const today = new Date().toISOString().split("T")[0];

            addValidAttendanceToData(courseName, today, "hadir");

            return { valid: true, message: courseMessage };
        }

        return { valid: true, message: "Presensi anda valid, namun tidak ada mata kuliah yang sedang berlangsung." };
    }

    if (isValidLocation && isValidTime() && !isValidNetwork) {
        return { valid: false, message: "Presensi terdaftar, tetapi tidak valid. Silakan konek WiFi PNJ." };
    }

    if (!isValidLocation) {
        return { valid: false, message: "Presensi anda tidak valid karena di luar area kampus" };
    }

    if (!isValidTime()) {
        return { valid: false, message: "Presensi anda tidak valid karena di luar jam presensi" };
    }

    return { valid: false, message: "syarat presensi tidak terpenuhi" };
}
