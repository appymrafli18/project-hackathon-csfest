"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EVENTS } from "@/data/event";
import { Link } from "react-router-dom";

export default function EventsComponent() {
    return (
        <div className="py-10 px-4">
            <h1 className="text-3xl font-bold mb-6">Kegiatan & Event Mahasiswa</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-stretch gap-6">
                {EVENTS.map((event) => (
                    // Remove the extra <div> wrapper here
                    <Link key={event.id} to={`/event/${event.id}`} className="flex">
                        <Card className="rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition cursor-pointer flex flex-col h-full">
                            <img
                                src={event.thumbnail}
                                className="h-44 w-full object-cover"
                                alt={event.title}
                            />

                            <CardHeader>
                                <CardTitle className="text-lg line-clamp-2">
                                    {event.title}
                                </CardTitle>
                            </CardHeader>

                            <CardContent className="flex-grow">
                                <p className="text-sm text-muted-foreground line-clamp-3">
                                    {event.description}
                                </p>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>

        </div>
    );
}
