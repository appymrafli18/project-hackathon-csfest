import { useMemo, useState } from "react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import MainLayout from "@/layouts/MainLayout";
import { DUMMY_GPA, DUMMY_GRADES, type GradeItem } from "@/data/grade";

function calculateFinal(item: GradeItem) {
    const weights = {
        uts: 0.25,
        uas: 0.35,
        tugas: 0.15,
        kuis: 0.05,
        praktik: 0.15,
    };

    const uasUsed = item.perbaikan ?? item.uas;

    const raw =
        item.uts * weights.uts +
        uasUsed * weights.uas +
        item.tugas * weights.tugas +
        item.kuis * weights.kuis +
        item.praktik * weights.praktik;

    // round 1 decimal
    return Math.round(raw * 10) / 10;
}

function gradeLetter(score: number) {
    if (score >= 85) return "A";
    if (score >= 75) return "B";
    if (score >= 65) return "C";
    if (score >= 50) return "D";
    return "E";
}

export default function GradesPage() {
    const [query, setQuery] = useState("");
    const [selectedSemester, setSelectedSemester] = useState<string>("Semester 3");

    const semesters = useMemo(() => {
        const s = Array.from(new Set(DUMMY_GRADES.map((g) => g.semester)));
        s.sort((a, b) => (a < b ? 1 : -1));
        return ["All", ...s];
    }, []);

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        return DUMMY_GRADES.filter((g) => {
            const matchSemester = selectedSemester === "All" || g.semester === selectedSemester;
            const matchQuery =
                q === "" ||
                g.mataKuliah.toLowerCase().includes(q) ||
                g.kode.toLowerCase().includes(q);
            return matchSemester && matchQuery;
        });
    }, [query, selectedSemester]);

    const summary = useMemo(() => {
        if (filtered.length === 0) return null;
        const avg = filtered.reduce((acc, cur) => acc + calculateFinal(cur), 0) / filtered.length;
        const avgRounded = Math.round(avg * 10) / 10;
        const gpa = DUMMY_GPA.find((e) => e.semester == selectedSemester)?.gpa
        return { count: filtered.length, avg: avgRounded, gpa: gpa };
    }, [filtered]);

    return (
        <MainLayout>

            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex items-center gap-6 mb-6">

                    <div>
                        <h1 className="text-2xl font-bold">Nilai Semester</h1>
                    </div>
                </div>

                {/* Controls */}
                <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6 mb-6">
                    <div className="flex-1">
                        <Input placeholder="Cari mata kuliah (contoh: Pemrograman Web)" value={query} onChange={(e) => setQuery(e.target.value)} />
                    </div>

                    <div className="w-full md:w-64">
                        <Select onValueChange={(v) => setSelectedSemester(v)} defaultValue="Semester 3">
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Pilih Semester" />
                            </SelectTrigger>
                            <SelectContent>
                                {semesters.map((s) => (
                                    <SelectItem key={s} value={s}>
                                        {s}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <Button className="w-full md:w-fit" variant="outline" onClick={() => { setQuery(""); setSelectedSemester("All"); }}>
                        Reset
                    </Button>
                </div>

                {/* Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Ringkasan</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm">Jumlah mata kuliah</p>
                            <h3 className="text-2xl font-semibold">{summary?.count ?? 0}</h3>
                            <p className="text-sm mt-2">Rata-rata nilai akhir {selectedSemester}</p>
                            <h3 className="text-xl font-medium mt-1">{summary?.avg ?? "-"}</h3>
                            <p className="text-sm mt-2">IPK {selectedSemester}</p>
                            <h3 className="text-xl font-medium mt-1">{summary?.gpa ?? "-"}</h3>
                        </CardContent>
                    </Card>

                    <Card className="col-span-2">
                        <CardHeader>
                            <CardTitle>Aturan Penilaian</CardTitle>
                            <p className="text-sm text-gray-500">
                                Setiap mata kuliah memiliki aturan penilaian yang berbeda.
                            </p>
                        </CardHeader>

                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Mata Kuliah</TableHead>
                                        <TableHead>UTS (%)</TableHead>
                                        <TableHead>UAS (%)</TableHead>
                                        <TableHead>Tugas (%)</TableHead>
                                        <TableHead>Kuis (%)</TableHead>
                                        <TableHead>Praktik (%)</TableHead>
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {filtered.map((m, _) => (
                                        <TableRow key={m.id}>
                                            <TableCell className="font-medium">{m.mataKuliah}</TableCell>

                                            {/* UTS */}
                                            <TableCell>{m.aturanPenilaian.uts}%</TableCell>

                                            {/* UAS */}
                                            <TableCell>{m.aturanPenilaian.uas}%</TableCell>

                                            {/* Tugas */}
                                            <TableCell>{m.aturanPenilaian.tugas}%</TableCell>

                                            {/* Kuis */}
                                            <TableCell>{m.aturanPenilaian.kuis}%</TableCell>

                                            {/* Praktik */}
                                            <TableCell>{m.aturanPenilaian.praktik}%</TableCell>
                                        </TableRow>

                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>


                </div>

                {/* Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>Daftar Nilai</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Mata Kuliah</TableHead>
                                    <TableHead>Kode</TableHead>
                                    <TableHead>UTS</TableHead>
                                    <TableHead>UAS</TableHead>
                                    <TableHead>Tugas</TableHead>
                                    <TableHead>Kuis</TableHead>
                                    <TableHead>Praktik</TableHead>
                                    <TableHead>Perbaikan</TableHead>
                                    <TableHead>Nilai Akhir</TableHead>
                                    {/* <TableHead>Status</TableHead> */}
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filtered.map((g) => {
                                    const final = calculateFinal(g);
                                    return (
                                        <TableRow key={g.id}>
                                            <TableCell>
                                                <div className="flex flex-col">
                                                    <span className="font-medium">{g.mataKuliah}</span>
                                                    <span className="text-xs text-muted-foreground">{g.semester}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>{g.kode}</TableCell>
                                            <TableCell>{g.uts}</TableCell>
                                            <TableCell>{g.uas}</TableCell>
                                            <TableCell>{g.tugas}</TableCell>
                                            <TableCell>{g.kuis}</TableCell>
                                            <TableCell>{g.praktik}</TableCell>
                                            <TableCell>{g.perbaikan ?? "-"}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <span className="font-semibold">{final}</span>
                                                    <Badge variant="secondary">{gradeLetter(final)}</Badge>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </MainLayout>
    );
}
