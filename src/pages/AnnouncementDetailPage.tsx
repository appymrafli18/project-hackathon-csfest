import { announcements } from "@/data/announcment";
import MainLayout from "@/layouts/MainLayout"
import { useParams } from "react-router-dom";
import PengumumanFoto from '../assets/images/foto-penguguman.jpg';
import { formatTanggal } from "@/lib/utils";

const AnnouncementDetailPage = () => {
  const { id } = useParams();

  // Ambil data jurusan berdasarkan ID
  const selectedAnnouncment = announcements.find((m) => m.id === id);

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto py-10 px-4">
        {selectedAnnouncment ? (
          <div>
            <h1 className="text-3xl font-bold mb-4">{selectedAnnouncment.title}</h1>
            <p className="text-gray-600 mb-6">{formatTanggal(selectedAnnouncment.date)}</p>
            <div className="prose">
              <p>Ini adalah detail pengumuman untuk "{selectedAnnouncment.title}".</p>
              <img
                src={PengumumanFoto}
              />
            </div>
          </div>
        ) : (
          <p className="text-red-600 text-lg">Pengumuman tidak ditemukan. Pastikan URL benar.</p>
        )}
      </div>
    </MainLayout>
  )
}

export default AnnouncementDetailPage