import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EVENTS } from "@/data/event";
import MainLayout from "@/layouts/MainLayout";
import { useParams } from "react-router-dom";

export default function EventDetailPage() {
    const { id } = useParams()
    const event = EVENTS.find((e) => e.id === Number(id));

    if (!event) return;

    const formattedDate = new Date(event.date).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
        weekday: "long",
    });

    return (
        <MainLayout>
            <div className="max-w-4xl mx-auto py-10 px-4">
                <img
                    src={event.thumbnail}
                    alt={event.title}
                    className="w-full h-72 object-cover rounded-2xl shadow-md mb-6"
                />

                <h1 className="text-3xl font-bold mb-2">{event.title}</h1>
                <p className="text-sm text-muted-foreground mb-6">
                    Dipublikasikan pada {formattedDate}
                </p>

                <Card className="rounded-2xl shadow-md">
                    <CardHeader>
                        <CardTitle className="text-xl">Detail Kegiatan</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <p className="whitespace-pre-line leading-7 text-[15px] text-muted-foreground">
                            {event.content}
                        </p>
                    </CardContent>
                </Card>
            </div>
        </MainLayout>
    );
}
