// src/data/majors.ts
import { Building2, Cog, Zap, Laptop, Calculator, Briefcase, BookOpen } from "lucide-react";

export const majors = [
  {
    id: "1",
    name: "Teknik Sipil",
    icon: <Building2 size={40} />,
    color: "bg-blue-600",
    link: "/enroll-course/1",
  },
  {
    id: "2",
    name: "Teknik Mesin",
    icon: <Cog size={40} />,
    color: "bg-red-500",
    link: "/enroll-course/2",
  },
  {
    id: "3",
    name: "Teknik Elektro",
    icon: <Zap size={40} />,
    color: "bg-yellow-500",
    link: "/enroll-course/3",
  },
  {
    id: "4",
    name: "Teknik Informatika & Komputer",
    icon: <Laptop size={40} />,
    color: "bg-green-600",
    link: "/enroll-course/4",
  },
  {
    id: "5",
    name: "Akuntansi",
    icon: <Calculator size={40} />,
    color: "bg-purple-600",
    link: "/enroll-course/5",
  },
  {
    id: "6",
    name: "Administrasi Niaga",
    icon: <Briefcase size={40} />,
    color: "bg-teal-600",
    link: "/enroll-course/6",
  },
  {
    id: "7",
    name: "Teknik Grafika & Penerbitan",
    icon: <BookOpen size={40} />,
    color: "bg-orange-600",
    link: "/enroll-course/7",
  },
];
