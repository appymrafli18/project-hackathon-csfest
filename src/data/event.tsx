import csfestimage from "../assets/images/csfest.webp"
import ppkpimage from "../assets/images/ppkp.jfif"
import seminaraijpg from "../assets/images/Seminar-Ai.jpg"

type EventItem = {
    id: number;
    title: string;
    description: string;
    thumbnail: string;
    date: string;
    content: string;
};

export const EVENTS: EventItem[] = [
    {
        id: 1,
        title: "CS Fest 2025 – Competitive Programming & Tech Expo",
        description: "Festival kompetisi IT terbesar dengan lomba CP, AI Challenge, dan expo inovasi teknologi.",
        thumbnail: csfestimage,
        date: "2025-02-10",
        content: `
CS Fest 2025 adalah acara tahunan terbesar bagi mahasiswa IT, menampilkan berbagai kompetisi tingkat nasional seperti Competitive Programming (CP), AI Challenge, Cybersecurity CTF, dan Expo Teknologi.

Acara ini bertujuan untuk mengembangkan kemampuan mahasiswa dalam bidang teknologi dan mempertemukan talenta terbaik dari seluruh Indonesia.

Selain itu, terdapat seminar teknologi yang menghadirkan pembicara dari industri, workshop hands-on, dan networking session.
        `    },
    {
        id: 2,
        title: "PPKP 2025 – Pengenalan Kehidupan Kampus Politeknik",
        description: "Kegiatan orientasi mahasiswa baru untuk mengenal lingkungan kampus dan budaya akademik.",
        thumbnail: ppkpimage,
        date: "2025-01-15",
        content: `
PPKP merupakan kegiatan orientasi untuk mahasiswa baru Politeknik Negeri Jakarta.

Kegiatan ini bertujuan untuk memperkenalkan suasana akademik, organisasi kampus, budaya etika, dan nilai-nilai karakter mahasiswa.

Peserta akan mengikuti berbagai agenda seperti seminar, pengenalan jurusan, tur kampus, dan kegiatan team building.
        `
    },
    {
        id: 3,
        title: "Seminar AI Nasional",
        description: "Seminar dengan pembicara nasional mengenai perkembangan Artificial Intelligence.",
        thumbnail: seminaraijpg,
        date: "2025-03-02",
        content: `
Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum nobis nihil ipsam animi, quaerat vitae dolorum, pariatur, consequuntur ipsum consectetur exercitationem aliquam nulla repellendus fugiat similique? Sit voluptatibus consequatur consequuntur!
Natus, praesentium autem ratione repellat voluptatum ut qui eaque, iusto eum fugiat obcaecati inventore deserunt nisi dicta. Inventore minima neque nobis corporis nemo delectus culpa eligendi. Fuga consequatur aperiam possimus?
Tenetur fuga iusto laboriosam excepturi temporibus voluptatibus impedit minima officia quos hic soluta nihil, nam inventore, assumenda error voluptates ipsa consequuntur harum cum! Culpa possimus et, quos mollitia excepturi voluptatum!
At officia facere aperiam ea tempore et quod atque, quo saepe quisquam sapiente optio incidunt delectus, nihil, adipisci esse distinctio autem? Non culpa placeat sit tempore quas, necessitatibus repellendus dicta.
Dolores illo fugi`
    },
];