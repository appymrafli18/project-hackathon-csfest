import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, AlertCircle } from "lucide-react";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { Badge } from "./ui/badge";

export interface TaskItem {
  title: string;
  matkul: string;
  date: string; // tanggal deadline, harus bisa diparse oleh new Date()
}

// --- HITUNG WAKTU TERSISA ---
function getTimeStatus(deadline: string) {
  const target = new Date(deadline).getTime();
  const now = Date.now();
  const diff = target - now;

  if (diff <= 0) {
    return {
      label: "Sudah lewat",
      className: "bg-red-100 text-red-700",
    };
  }

  const sec = Math.floor(diff / 1000);
  const min = Math.floor(sec / 60);
  const hour = Math.floor(min / 60);
  const day = Math.floor(hour / 24);

  // ≤ 24 jam → tampilkan jam-menit-detik
  if (hour < 24) {
    const h = hour;
    const m = min % 60;
    const s = sec % 60;

    let label =
      h > 0 ? `${h} jam` :
        m > 0 ? `${m} menit` :
          `${s} detik`;

    return {
      label,
      className: "bg-red-100 text-red-700",
    };
  }

  // ≤ 72 jam → H-x
  if (hour <= 72) {
    const h = Math.ceil(hour / 24);
    return {
      label: `H-${h}`,
      className: "bg-yellow-100 text-yellow-700",
    };
  }

  // > 72 jam → x hari lagi
  return {
    label: `${day} hari lagi`,
    className: "bg-green-100 text-green-700",
  };
}

export default function TaskCard({ task }: { task: TaskItem }) {
  const status = useMemo(() => getTimeStatus(task.date), [task.date]);

  return (
    <Card className="flex flex-col justify-between p-4 rounded-2xl shadow-sm border">
      <div className="flex justify-between items-start gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div
            className={`w-14 h-14 rounded-xl flex items-center justify-center ${status.className}`}
          >
            <AlertCircle size={26} />
          </div>

          <div className="flex flex-col">
            <h2 className="text-lg font-semibold">{task.title}</h2>
            <p className="text-sm text-gray-700">{task.matkul}</p>

            <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
              <Clock size={16} /> {task.date}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-5">
          <Badge variant={"destructive"} className={`${status.className}`}>{status.label}</Badge>
          <Link to={"/my-course/1/assignment/1"} className="hidden sm:block">
            <Button className="bg-teal-800 hover:bg-teal-700 px-6">
              Submit Task
            </Button>
          </Link>
        </div>
      </div>

      <div className="ml-uto block sm:hidden">
        <Link to={"/my-course/1/assignment/1"}>
          <Button className="bg-teal-800 hover:bg-teal-700 px-6 w-full">
            Submit Task
          </Button>
        </Link>
      </div>
    </Card>
  );
}
