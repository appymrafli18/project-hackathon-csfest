"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Clock, Users, CalendarCheck } from "lucide-react";
import MainLayout from "@/layouts/MainLayout";

// 1. Update Tipe Data: Hapus 'booked'
interface Room {
  id: number;
  name: string;
  capacity: number;
  status: "kosong" | "sedang ditempati";
  until?: string;
}

// 2. Data Awal (Initial State)
const INITIAL_ROOMS: Room[] = [
  { id: 1, name: "Ruang Diskusi A", capacity: 6, status: "kosong" },
  { id: 2, name: "Ruang Diskusi B", capacity: 4, status: "kosong" }, // Ubah booked jadi kosong untuk demo
  { id: 3, name: "Ruang Rapat Mini", capacity: 10, status: "sedang ditempati", until: "15:30" },
  { id: 4, name: "Ruang Belajar Sunyi", capacity: 2, status: "kosong" }
];

export default function LibraryRoomBooking() {
  // 3. Gunakan useState untuk daftar ruangan agar bisa di-update
  const [rooms, setRooms] = useState<Room[]>(INITIAL_ROOMS);
  
  const [open, setOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  
  // State untuk form booking
  const [start, setStart] = useState("12:00");
  const [end, setEnd] = useState("14:00");

  // Buka modal hanya jika ruangan kosong
  const openBooking = (room: Room) => {
    if (room.status !== "kosong") return;

    setSelectedRoom(room);
    setStart("12:00"); // Reset waktu default saat buka modal baru
    setEnd("14:00");
    setOpen(true);
  };

  // 4. Fungsi Utama: Menangani Konfirmasi Booking
  const handleConfirmBooking = () => {
    if (!selectedRoom) return;

    // Update status ruangan di dalam state list rooms
    setRooms((prevRooms) =>
      prevRooms.map((room) =>
        room.id === selectedRoom.id
          ? { ...room, status: "sedang ditempati", until: end }
          : room
      )
    );

    // Tutup modal dan reset selection
    setOpen(false);
    setSelectedRoom(null);
  };

  return (
    <MainLayout>
      <div className="p-6 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Sewa Ruangan Perpustakaan PNJ</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {rooms.map((room) => (
            <Card
              key={room.id}
              onClick={() => openBooking(room)}
              className={`cursor-pointer rounded-2xl shadow-sm transition-all duration-300 border-2 overflow-hidden relative group ${
                room.status === "kosong"
                  ? "border-green-500 hover:shadow-md hover:-translate-y-1 bg-white"
                  : "border-red-500 opacity-90 bg-gray-50 cursor-not-allowed"
              }`}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <h2 className="text-lg font-bold text-gray-900 group-hover:text-teal-700 transition-colors">
                    {room.name}
                  </h2>
                  {room.status === "kosong" && (
                    <CalendarCheck className="text-green-500 w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-gray-600 mb-3">
                  <Users size={16} />
                  <p className="text-sm">Kapasitas: {room.capacity} orang</p>
                </div>

                {/* Tampilan jika sedang ditempati */}
                {room.status === "sedang ditempati" && (
                  <div className="flex items-center gap-2 text-red-600 mb-2 bg-red-50 p-2 rounded-md w-fit border border-red-100">
                    <Clock size={14} />
                    <p className="text-xs font-semibold">Dipakai s.d: {room.until}</p>
                  </div>
                )}

                {/* Badge Status */}
                <div
                  className={`inline-flex px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide mt-2 ${
                    room.status === "kosong"
                      ? "bg-green-100 text-green-700 border border-green-200"
                      : "bg-red-100 text-red-700 border border-red-200"
                  }`}
                >
                  {room.status}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="rounded-2xl p-6 max-w-md">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-teal-900">
                Booking {selectedRoom?.name}
              </DialogTitle>
            </DialogHeader>

            <div className="flex flex-col gap-5 mt-4">
              <div className="bg-blue-50 p-3 rounded-lg text-sm text-blue-700 border border-blue-200">
                Pastikan waktu yang Anda pilih sudah benar. Ruangan akan berubah status menjadi "Sedang Ditempati".
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700 mb-1.5 block">
                  Jam Mulai
                </label>
                <div className="relative">
                  <Clock className="w-4 h-4 absolute left-3 top-3 text-gray-500" />
                  <Input
                    type="time"
                    className="pl-9 border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                    value={start}
                    onChange={(e) => setStart(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700 mb-1.5 block">
                  Jam Selesai
                </label>
                <div className="relative">
                  <Clock className="w-4 h-4 absolute left-3 top-3 text-gray-500" />
                  <Input
                    type="time"
                    className="pl-9 border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                    value={end}
                    onChange={(e) => setEnd(e.target.value)}
                  />
                </div>
              </div>

              <Button 
                onClick={handleConfirmBooking}
                className="w-full mt-2 py-6 rounded-xl text-white font-bold bg-teal-700 hover:bg-teal-800 transition-colors shadow-lg shadow-teal-700/20"
              >
                Konfirmasi & Tempati Ruangan
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
}