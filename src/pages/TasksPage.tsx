import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import MainLayout from "@/layouts/MainLayout";
import { assignments } from "@/data/assignment";
import { courses } from "@/data/schedule";
import { Badge } from "@/components/ui/badge";

export default function TasksPage() {
    const navigate = useNavigate();

    const [filterMatkul, setFilterMatkul] = useState("all");
    const [filterStatus, setFilterStatus] = useState("pending");

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
            <div className="max-w-3xl mx-auto space-y-6">

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
                            {courses.map((course) => (
                                <SelectItem value={course.title} key={course.id}>{course.title}</SelectItem>
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
                    {/* Empty State */}
                    {filteredAssignments.length === 0 && (
                        <div className="flex flex-col items-center text-center py-12 text-gray-500">
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/4076/4076500.png"
                                alt="no tasks"
                                className="w-28 h-28 opacity-80 mb-4"
                            />
                            <h2 className="text-lg font-semibold">Tidak ada tugas yang ditemukan</h2>
                            <p className="text-sm mt-1 max-w-xs">
                                Coba ubah filter mata kuliah atau status untuk melihat tugas lainnya.
                            </p>

                            <Button
                                variant="outline"
                                className="mt-4"
                                onClick={() => {
                                    setFilterMatkul("all");
                                    setFilterStatus("all");
                                }}
                            >
                                Reset Filter
                            </Button>
                        </div>
                    )}

                    {filteredAssignments.map((task) => (
                        <Card key={task.id} className="shadow-sm border rounded-xl">
                            <CardContent className="flex flex-col gap-3">
                                <div className="flex justify-between items-start flex-col sm:flex-row gap-2.5">
                                    <Badge className={`sm:order-last ml-au text-xs px-3 py-1 rounded-full ${badgeColor(task.status)}`}>
                                        {task.status === "pending" && "Belum Dikerjakan"}
                                        {task.status === "completed" && "Sudah Dikerjakan"}
                                        {task.status === "overdue" && "Lewat Deadline"}
                                    </Badge>
                                    <div className="">
                                        <p className="font-semibold text-lg">{task.title}</p>
                                        <p className="text-sm text-gray-500">{task.matkul}</p>
                                        <p className="text-xs text-gray-400 mt-1">
                                            Deadline: {new Date(task.date).toLocaleString()}
                                        </p>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <Button
                                    className="w-fit mt-2 bg-teal-700 hover:bg-teal-800"
                                    onClick={() => navigate(`/my-course/${task.matkulid}/assignment/${task.id}`)}
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
