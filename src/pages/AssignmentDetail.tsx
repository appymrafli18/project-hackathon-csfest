import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle } from "@/components/ui/dialog"
import { FileText, NotebookPen, MessageSquare, Upload, Trash } from "lucide-react"
import MainLayout from "@/layouts/MainLayout"
import { useParams } from "react-router-dom"
import { initialCourses } from "@/components/course-list"
import { Input } from "@/components/ui/input"
import DynamicBreadcrumb from "@/components/dynamic-breadcrumb"
import { assignments } from "@/data/assignment"

export default function AssignmentDetail() {
    const { courseId, assignmentId } = useParams()
    const course = initialCourses.find((e) => e.id == courseId)
    const assignment = assignments.find((e) => e.id == parseInt(assignmentId ?? "", 10))

    const [submittedFile, setSubmittedFile] = useState<File | null>(
        new File([""], "Tugas_Individu_1.pdf")
    )
    const [lastModified, setLastModified] = useState("Tuesday, 9 September 2025, 3:16 PM")
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [selectedFile, setSelectedFile] = useState<File | null>(null)

    function handleUpload() {
        if (selectedFile) {
            setSubmittedFile(selectedFile)
            setLastModified(new Date().toLocaleString())
        }
        setIsDialogOpen(false)
    }

    function handleRemove() {
        setSubmittedFile(null)
        setSelectedFile(null)
    }

    return (
        <MainLayout>
            <DynamicBreadcrumb/>
            <div className="flex flex-col gap-6 max-w-3xl mx-auto py-6 px-4">
                <h1 className="text-3xl font-semibold">{course?.name}</h1>
                <h1 className="text-3xl">{assignment?.title}</h1>

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

                            {submittedFile ? (
                                <Badge className="bg-green-600 text-white">Submitted</Badge>
                            ) : (
                                <Badge className="bg-gray-400 text-white">No attempt</Badge>
                            )}
                        </div>

                        <Separator />

                        <div className="flex justify-between">
                            <span>Grading status</span>
                            <span>Not graded</span>
                        </div>

                        <div className="flex justify-between items-center">
                            <span>Time remaining</span>
                            <span className="text-green-600">Still open</span>
                        </div>

                        <div className="flex justify-between">
                            <span>Last modified</span>
                            <span>{submittedFile ? lastModified : "-"}</span>
                        </div>
                    </CardContent>
                </Card>

                {/* SUBMISSION CONTENT */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-1">
                            <FileText className="w-5 h-5" />
                            File Submission
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="text-sm p-6 space-y-4">
                        {submittedFile ? (
                            <>
                                <div className="flex items-center gap-2">
                                    <FileText className="w-4 h-4 text-primary" />
                                    <span>{submittedFile.name}</span>
                                </div>
                                <p className="text-muted-foreground">(PDF preview is not displayed)</p>
                            </>
                        ) : (
                            <p className="text-muted-foreground">Belum ada file dikumpulkan.</p>
                        )}
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

                {/* ACTION BUTTONS */}
                <div className="flex gap-3 flex-wrap">
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button>
                                <Upload className="w-4 h-4 mr-2" />
                                {submittedFile ? "Edit Submission" : "Upload File"}
                            </Button>
                        </DialogTrigger>

                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Upload File Tugas</DialogTitle>
                            </DialogHeader>

                            <Input
                                type="file"
                                accept=".pdf"
                                onChange={(e) => {
                                    if (e.target.files) setSelectedFile(e.target.files[0])
                                }}
                            />

                            <DialogFooter>
                                <Button onClick={handleUpload}>Submit</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>

                    {submittedFile && (
                        <Button variant="destructive" onClick={handleRemove}>
                            <Trash className="w-4 h-4 mr-2" /> Remove Submission
                        </Button>
                    )}
                </div>

                <p className="text-sm text-muted-foreground">
                    You can still make changes to your submission.
                </p>

            </div>
        </MainLayout>
    )
}
