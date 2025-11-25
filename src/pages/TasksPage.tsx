import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import MainLayout from "@/layouts/MainLayout";

export default function TasksPage() {
    const navigate = useNavigate();

    const assignments = [
        {
            id: 1,
            matkul: "Pemrograman Web",
            judul: "Membuat Landing Page",
            deadline: "2025-02-08T23:59:00",
            status: "pending",
        },
        {
            id: 2,
            matkul: "Basis Data",
            judul: "Normalisasi Tabel",
            deadline: "2025-02-02T23:59:00",
            status: "overdue",
        },
        {
            id: 3,
            matkul: "Jaringan Komputer",
            judul: "Konfigurasi Router Static",
            deadline: "2025-02-12T23:59:00",
            status: "completed",
        },
        {
            id: 4,
            matkul: "Pemrograman Web",
            judul: "Authentication JWT",
            deadline: "2025-02-20T23:59:00",
            status: "pending",
        },
    ];

    const [filterMatkul, setFilterMatkul] = useState("all");
    const [filterStatus, setFilterStatus] = useState("pending");

    const matkulList = ["Pemrograman Web", "Basis Data", "Jaringan Komputer"];

    const filteredAssignments = assignments.filter((item) => {
        return (
            (filterMatkul === "all" || item.matkul === filterMatkul) &&
            (filterStatus === "all" || item.status === filterStatus)
        );
    });

    const badgeColor = (status: string) => {
        if (status === "pending") return "bg-yellow-100 text-yellow-700";
        if (status === "completed") return "bg-green-100 text-green-700";
        if (status === "overdue") return "bg-red-100 text-red-700";
    };

    return (
        <MainLayout>
            <div className="max-w-3xl mx-auto p-4 space-y-6">

                <h1 className="text-2xl font-bold">Daftar Tugas</h1>

                {/* Filters */}
                <div className="flex flex-col md:flex-row gap-4">
                    {/* Filter Matkul */}
                    <Select onValueChange={setFilterMatkul} defaultValue="all">
                        <SelectTrigger className="w-full md:w-1/2">
                            <SelectValue placeholder="Filter berdasarkan mata kuliah" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Semua Mata Kuliah</SelectItem>
                            {matkulList.map((m, i) => (
                                <SelectItem value={m} key={i}>{m}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    {/* Filter Status */}
                    <Select onValueChange={setFilterStatus} defaultValue="pending">
                        <SelectTrigger className="w-full md:w-1/2">
                            <SelectValue placeholder="Filter berdasarkan status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Semua Status</SelectItem>
                            <SelectItem value="pending">Belum Dikerjakan</SelectItem>
                            <SelectItem value="completed">Sudah Dikerjakan</SelectItem>
                            <SelectItem value="overdue">Lewat Deadline</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Assignment List */}
                <div className="space-y-4">
                    {filteredAssignments.map((task) => (
                        <Card key={task.id} className="shadow-sm border rounded-xl">
                            <CardContent className="p-4 flex flex-col gap-3">

                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="font-semibold text-lg">{task.judul}</p>
                                        <p className="text-sm text-gray-500">{task.matkul}</p>
                                        <p className="text-xs text-gray-400 mt-1">
                                            Deadline: {new Date(task.deadline).toLocaleString()}
                                        </p>
                                    </div>

                                    {/* Status badge */}
                                    <span className={`text-xs px-3 py-1 rounded-full ${badgeColor(task.status)}`}>
                                        {task.status === "pending" && "Belum Dikerjakan"}
                                        {task.status === "completed" && "Sudah Dikerjakan"}
                                        {task.status === "overdue" && "Lewat Deadline"}
                                    </span>
                                </div>

                                {/* Submit Button */}
                                <Button
                                    className="w-fit mt-2 bg-teal-700 hover:bg-teal-800"
                                    onClick={() => navigate(`/my-course/1/assignment/${task.id}`)}
                                >
                                    {task.status === "completed" ? "Lihat Tugas" : "Kerjakan Tugas"}
                                </Button>

                            </CardContent>
                        </Card>
                    ))}
                </div>

            </div>
        </MainLayout>
    );
}
