import React, { useEffect, useMemo, useState } from "react"
import MainLayout from "@/layouts/MainLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Download, Plus, CheckSquare, X, User } from "lucide-react"
import { format } from "date-fns"

type PickupMethod = "datang" | "website"
type RequestStatus = "pending" | "processing" | "ready" | "cancelled"

interface RequestItem {
    id: string
    jenis: string
    metode: PickupMethod
    note?: string
    appliedAt: string // ISO
    finishedAt?: string | null
    status: RequestStatus
}

const SURAT_LIST = [
    "Surat Keterangan Kehilangan Ijazah & Transkrip",
    "Surat Keterangan Kerusakan Ijazah & Transkrip",
    "Surat Keterangan Melanjutkan Kuliah",
    "Surat Keterangan Mahasiswa di Asuransikan",
    "Surat Keterangan Telah Mengikuti PKKP",
    "Surat Keterangan mengurus tunjangan anak di kantor orang tua",
    "Surat Keterangan tunjangan pensiun",
    "Surat Keterangan UKT",
    "Surat Keterangan Mahasiswa Baru",
    "Surat Keterangan pernah kuliah di PNJ",
    "Surat Keterangan kesalahan penulisan Ijazah PNJ",
    "Surat Keterangan untuk mendapatkan beasiswa diluar PNJ",
    "Surat Keterangan mahasiswa aktif kuliah",
    "Surat Keterangan untuk mengikuti kegiatan diluar PNJ",
    "Surat Keterangan Mengurus BPJS",
    "Surat Pengantar Magang",
    "Surat Keterangan Lulus",
]

// helper
const STORAGE_KEY = "pnj_surat_requests_v1"

function uid(prefix = "") {
    return prefix + Math.random().toString(36).slice(2, 9)
}

function nowIso() {
    return new Date().toISOString()
}

function formatShortDate(iso?: string | null) {
    if (!iso) return "-"
    try {
        return format(new Date(iso), "dd MMM yyyy")
    } catch {
        return iso
    }
}

// status -> badge props
function statusBadge(status: RequestStatus) {
    switch (status) {
        case "pending":
            return { text: "Pending", variant: "yellow" }
        case "processing":
            return { text: "Processing", variant: "blue" }
        case "ready":
            return { text: "Ready", variant: "green" }
        case "cancelled":
            return { text: "Cancelled", variant: "destructive" }
        default:
            return { text: status, variant: "default" }
    }
}

export default function StudentProfile() {
    const storedUser = localStorage.getItem("user")
    const account = storedUser ? JSON.parse(storedUser) : null

    const [requests, setRequests] = useState<RequestItem[]>([])
    const [filterText, setFilterText] = useState("")
    const [filterStatus, setFilterStatus] = useState<string>("all")
    const [selectedJenis, setSelectedJenis] = useState<string>(SURAT_LIST[0])
    const [selectedMethod, setSelectedMethod] = useState<PickupMethod>("datang")
    const [note, setNote] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)

    // load from localStorage
    useEffect(() => {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (raw) {
            try {
                setRequests(JSON.parse(raw))
            } catch {
                setRequests([])
            }
        }
    }, [])

    // persist
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(requests))
    }, [requests])

    // filtered list
    const filtered = useMemo(() => {
        return requests.filter((r) => {
            const q = filterText.trim().toLowerCase()
            if (q) {
                const hit =
                    r.jenis.toLowerCase().includes(q) ||
                    r.metode.toLowerCase().includes(q) ||
                    r.appliedAt.toLowerCase().includes(q)
                if (!hit) return false
            }
            if (filterStatus !== "all") {
                if (r.status !== (filterStatus as RequestStatus)) return false
            }
            return true
        })
    }, [requests, filterText, filterStatus])

    // create request
    const handleSubmitRequest = async (e?: React.FormEvent) => {
        e?.preventDefault()
        setIsSubmitting(true)

        const newReq: RequestItem = {
            id: uid("req-"),
            jenis: selectedJenis,
            metode: selectedMethod,
            note: note.trim() || undefined,
            appliedAt: nowIso(),
            finishedAt: null,
            status: "pending",
        }

        setRequests((s) => [newReq, ...s])

        // simulate async processing (we won't block login; just simulate that admin will process)
        // here we schedule a short timeout to flip to processing (for demo only)
        setTimeout(() => {
            setRequests((prev) =>
                prev.map((r) => (r.id === newReq.id ? { ...r, status: "processing" } : r))
            )
        }, 1500)

        setNote("")
        setIsSubmitting(false)
    }

    // actions
    const handleCancel = (id: string) => {
        setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status: "cancelled" } : r)))
    }

    // For demo: admin marks ready
    const handleMarkReady = (id: string) => {
        const finished = new Date().toISOString()
        setRequests((prev) =>
            prev.map((r) => (r.id === id ? { ...r, status: "ready", finishedAt: finished } : r))
        )
    }

    const handleDownload = (id: string) => {
        // simulated download: create a small blob and download
        const r = requests.find((x) => x.id === id)
        if (!r) return
        const content = `Surat: ${r.jenis}\nNIM: ${account.nim}\nNama: ${account.name}\nStatus: ${r.status}\nGenerated: ${formatShortDate(r.finishedAt ?? r.appliedAt)}`
        const blob = new Blob([content], { type: "text/plain" })
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `${r.jenis.replace(/\s+/g, "_")}_${r.id}.txt`
        document.body.appendChild(a)
        a.click()
        a.remove()
        URL.revokeObjectURL(url)
    }

    return (
        <MainLayout>
            <div className="max-w-5xl mx-auto p-6 space-y-6">
                <h1 className="text-2xl font-bold">Profil Mahasiswa</h1>
                {/* PROFILE CARD */}
                <Card>
                    <CardContent className="flex flex-col md:flex-row items-center gap-6">
                        <div className="w-28 h-28 rounded-full overflow-hidden bg-gray-100 shrink-0">
                            <User size={100} className="w-full h-full text-gray-300" />
                        </div>

                        <div className="flex-1">
                            <h2 className="text-2xl font-semibold">{account.name}</h2>
                            <p className="text-sm text-muted-foreground">{account.email}</p>
                            <p className="text-sm text-muted-foreground">NIM: <span className="font-medium">{account.nim}</span></p>
                        </div>

                        <div className="flex gap-2">
                            <LinkToProfileEdit />
                        </div>
                    </CardContent>
                </Card>

                {/* SURAT REQUEST FORM */}
                <Card>
                    <CardHeader>
                        <CardTitle>Ajukan Pengambilan Surat Keterangan</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={(e) => handleSubmitRequest(e)} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="md:col-span-1">
                                <label className="text-sm font-medium mb-1 block">Jenis Surat</label>
                                <Select onValueChange={(v) => setSelectedJenis(v)} defaultValue={selectedJenis}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue>{selectedJenis}</SelectValue>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {SURAT_LIST.map((s) => (
                                            <SelectItem key={s} value={s}>{s}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="md:col-span-1">
                                <label className="text-sm font-medium mb-1 block">Metode Pengambilan</label>
                                <Select onValueChange={(v) => setSelectedMethod(v as PickupMethod)} defaultValue={selectedMethod}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue>{selectedMethod === "datang" ? "Datang Langsung ke Kampus" : "Via Website"}</SelectValue>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="datang">Datang Langsung ke Kampus</SelectItem>
                                        <SelectItem value="website">Via Website (Pengiriman/unduh)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="md:col-span-1">
                                <label className="text-sm font-medium mb-1 block">Catatan (opsional)</label>
                                <Input value={note} onChange={(e) => setNote(e.target.value)} placeholder="Informasi tambahan (mis. penerima pengambilan)" />
                            </div>

                            <div className="md:col-span-3 flex justify-end gap-2 mt-2">
                                <Button type="submit" className="flex items-center gap-2" disabled={isSubmitting}>
                                    <Plus size={14} /> Ajukan Surat
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {/* TABLE OF REQUESTS */}
                <Card>
                    <CardHeader>
                        <CardTitle>Daftar Pengajuan Surat</CardTitle>
                    </CardHeader>

                    <CardContent>
                        {/* controls */}
                        <div className="flex flex-col md:flex-row gap-3 items-start md:items-center justify-between mb-4">
                            <div className="flex gap-3 w-full md:w-auto">
                                <Input placeholder="Cari jenis / metode / tanggal..." value={filterText} onChange={(e) => setFilterText(e.target.value)} className="min-w-[220px]" />
                                <Select onValueChange={(v) => setFilterStatus(v)} defaultValue="all">
                                    <SelectTrigger className="w-40">
                                        <SelectValue>{filterStatus === "all" ? "Semua Status" : filterStatus}</SelectValue>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">Semua Status</SelectItem>
                                        <SelectItem value="pending">Pending</SelectItem>
                                        <SelectItem value="processing">Processing</SelectItem>
                                        <SelectItem value="ready">Ready</SelectItem>
                                        <SelectItem value="cancelled">Cancelled</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="text-sm text-muted-foreground">Total: <span className="font-medium">{filtered.length}</span></div>
                        </div>

                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Jenis Surat</TableHead>
                                        <TableHead>Metode</TableHead>
                                        <TableHead>Tgl Ajukan</TableHead>
                                        <TableHead>Tgl Selesai</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Aksi</TableHead>
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {filtered.length === 0 && (
                                        <TableRow>
                                            <TableCell colSpan={6} className="text-center text-sm text-muted-foreground">Belum ada pengajuan.</TableCell>
                                        </TableRow>
                                    )}

                                    {filtered.map((r) => {
                                        const badge = statusBadge(r.status)
                                        return (
                                            <TableRow key={r.id}>
                                                <TableCell className="font-medium">{r.jenis}</TableCell>
                                                <TableCell>{r.metode === "datang" ? "Datang" : "Via Website"}</TableCell>
                                                <TableCell>{formatShortDate(r.appliedAt)}</TableCell>
                                                <TableCell>{formatShortDate(r.finishedAt ?? null)}</TableCell>
                                                <TableCell>
                                                    <Badge className={`capitalize ${badge.variant === "yellow" ? "bg-yellow-100 text-yellow-800" : badge.variant === "blue" ? "bg-blue-100 text-blue-800" : badge.variant === "green" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>{badge.text}</Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-2">
                                                        {r.status !== "cancelled" && r.status !== "ready" && (
                                                            <button onClick={() => handleCancel(r.id)} title="Batalkan" className="p-2 rounded-md hover:bg-muted">
                                                                <X size={16} />
                                                            </button>
                                                        )}

                                                        {r.status === "processing" && (
                                                            <button onClick={() => handleMarkReady(r.id)} title="Mark as Ready (admin demo)" className="p-2 rounded-md hover:bg-muted">
                                                                <CheckSquare size={16} />
                                                            </button>
                                                        )}

                                                        {r.status === "ready" && (
                                                            <button onClick={() => handleDownload(r.id)} title="Download Surat" className="p-2 rounded-md hover:bg-muted">
                                                                <Download size={16} />
                                                            </button>
                                                        )}
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </MainLayout>
    )
}

/* small helper component for editing profile (placeholder) */
function LinkToProfileEdit() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Edit Profil</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Profil (dummy)</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                    <p className="text-sm text-muted-foreground">Ini hanya contoh. Integrasikan dengan API jika perlu.</p>
                </div>
            </DialogContent>
        </Dialog>
    )
}
