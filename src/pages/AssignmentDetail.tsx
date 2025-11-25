"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { FileText, NotebookPen, MessageSquare } from "lucide-react"
import MainLayout from "@/layouts/MainLayout"

export default function AssignmentDetail() {
  return (
    <MainLayout>

        <div className="flex flex-col gap-6 max-w-3xl mx-auto py-6">

        <h1 className="text-3xl font-bold">Tugas Individu ke-1</h1>

        {/* DATE INFO */}
        <Card>
            <CardContent className="p-6 space-y-2">
            <p><strong>Dibuka:</strong> Thursday, 4 September 2025, 7:00 AM</p>
            <p><strong>Deadline:</strong> Tuesday, 9 September 2025, 6:00 PM</p>
            </CardContent>
        </Card>

        {/* INSTRUCTION */}
        <Card>
            <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <NotebookPen className="w-5 h-5" />
                Deskripsi Tugas
            </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
            <ol className="list-decimal pl-4 space-y-2 text-sm">
                <li>Cari 3 perangkat teknologi yang unik…</li>
                <li>Jelaskan fitur unggulan…</li>
                <li>Jelaskan manfaat perangkat…</li>
                <li>Tulis di forum yang tersedia…</li>
                <li>Perhatikan batas waktu pengumpulan.</li>
            </ol>
            </CardContent>
        </Card>

        {/* STATUS */}
        <Card>
            <CardHeader>
            <CardTitle>Status Pengumpulan</CardTitle>
            </CardHeader>

            <CardContent className="p-6 space-y-4">
            <div className="flex justify-between">
                <span>Submission status</span>
                <Badge className="bg-green-600 text-white">Submitted for grading</Badge>
            </div>

            <Separator />

            <div className="flex justify-between">
                <span>Grading status</span>
                <span>Not graded</span>
            </div>

            <div className="flex justify-between items-center">
                <span>Time remaining</span>
                <span className="text-green-600">Submitted 2 hours 43 mins early</span>
            </div>

            <div className="flex justify-between">
                <span>Last modified</span>
                <span>Tuesday, 9 September 2025, 3:16 PM</span>
            </div>
            </CardContent>
        </Card>

        {/* SUBMISSION CONTENT */}
        <Card>
            <CardHeader>
            <CardTitle className="flex items-center gap-1">
                <FileText className="w-5 h-5" />
                Online text (201 words)
            </CardTitle>
            </CardHeader>

            <CardContent className="text-sm p-6 space-y-4">
            <p className="text-muted-foreground">
                (preview of student text…)
            </p>
            <Button variant="outline">View full text</Button>
            </CardContent>
        </Card>

        {/* COMMENTS */}
        <Card>
            <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Comments (0)
            </CardTitle>
            </CardHeader>
            <CardContent>
            <Button variant="outline">Add Comment</Button>
            </CardContent>
        </Card>

        {/* ACTIONS */}
        <div className="flex gap-3">
            <Button>Edit Submission</Button>
            <Button variant="destructive">Remove Submission</Button>
        </div>

        <p className="text-sm text-muted-foreground">
            You can still make changes to your submission.
        </p>

        </div>
    </MainLayout>
  )
}
