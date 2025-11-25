import { useParams } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import ProdiCard from "@/components/prodi-card";
import { majors } from "@/data/majors";
import { prodiMap } from "@/lib/breadcrumbMap";
import DynamicBreadcrumb from "@/components/dynamic-breadcrumb";

export default function JurusanPage() {
    const { jurusanId } = useParams();

    // Ambil data jurusan berdasarkan ID
    const selectedMajor = majors.find((m) => m.id === jurusanId);

    // Ambil daftar prodi untuk jurusan ini
    const prodiList = prodiMap[jurusanId ?? ""] || {};

    return (
        <MainLayout>
            <DynamicBreadcrumb/>
            <div className="min-h-screen">
                {/* Title */}
                <h1 className="text-3xl font-semibold mb-8">
                    Program Studi – {selectedMajor?.name ?? "Jurusan Tidak Ditemukan"}
                </h1>

                {/* Jika salah jurusan ID */}
                {!selectedMajor && (
                    <p className="text-red-600 text-lg">
                        Jurusan tidak ditemukan. Pastikan URL benar.
                    </p>
                )}

                {/* List Prodi */}
                <div className="grid content-center justify-items-center sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {Object.entries(prodiList).map(([prodiId, prodiName]) => (
                        <ProdiCard
                            key={prodiId}
                            id={prodiId}
                            title={prodiName}
                            description="lorem ipsum dolor sit amet, consectetur adipiscing elit."
                            accentColor="#3B82F6"
                            icon={selectedMajor?.icon}
                        />
                    ))}
                </div>
            </div>
        </MainLayout>
    );
}
