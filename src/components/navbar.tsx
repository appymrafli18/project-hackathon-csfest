"use client";

import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Globe, Bell, ChevronDown, LogOut, Menu, X, User, Library } from "lucide-react";

import { initialCourses } from "./course-list";
import { CourseMegaMenu } from "./course-mega-menu";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const initialNotifications = [
    { id: 1, message: "Kelas Pemrograman Web telah diposting.", time: new Date(Date.now() - 7200000), read: false },
    { id: 2, message: "Nilai UTS telah diumumkan.", time: new Date(Date.now() - 1800000), read: false },
    { id: 3, message: "Tugas Sistem Operasi sudah tersedia.", time: new Date(Date.now() - 259200000), read: false },
  ];

  const storedUser = localStorage.getItem("user")
  const user = storedUser ? JSON.parse(storedUser) : null

  const [notifications, setNotifications] = useState(initialNotifications);
  const [mobileOpen, setMobileOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  function timeAgo(date: Date) {
    const diff = (Date.now() - date.getTime()) / 1000;
    if (diff < 60) return `${Math.floor(diff)} detik lalu`;
    if (diff < 3600) return `${Math.floor(diff / 60)} menit lalu`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} jam lalu`;
    return `${Math.floor(diff / 86400)} hari lalu`;
  }

  function logout() {
    localStorage.removeItem("user");
    window.location.href = "/login";
  }

  return (
    <nav className="w-full bg-teal-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto py-3 px-4 flex items-center justify-between">

        {/* LEFT */}
        <div className="flex items-center gap-3">
          <div className="text-2xl font-bold">E-Learning PNJ</div>

          {/* DESKTOP NAV */}
          <div className="hidden lg:flex items-center gap-6 ml-8 text-sm font-medium">
            <Link to="/" className="hover:text-gray-300">Dashboard</Link>
            <CourseMegaMenu initialCourses={initialCourses} />
            <Link to="/tasks" className="hover:text-gray-300">Tugas</Link>
            <Link to="/attendance" className="hover:text-gray-300">Presensi</Link>
            <Link to="/grade" className="hover:text-gray-300">Grade</Link>
          </div>
        </div>

        {/* RIGHT */}
        <div className="hidden lg:flex items-center gap-6">
          {/* Language */}
          <DropdownMenu>
            <DropdownMenuTrigger className="cursor-pointer flex items-center gap-2 text-sm">
              <Globe size={18} /> Bahasa Indonesia <ChevronDown size={16} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Bahasa Indonesia</DropdownMenuItem>
              <DropdownMenuItem>English</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger className="cursor-pointer relative">
              <Bell size={20} />
              {unreadCount > 0 && <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></span>}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-72 p-2">
              <div className="flex items-center justify-between px-2 py-1">
                <p className="font-semibold">Notifikasi</p>
                {unreadCount > 0 && (
                  <button onClick={markAllAsRead} className="text-xs text-blue-600 hover:underline">
                    Mark all as read
                  </button>
                )}
              </div>
              <DropdownMenuSeparator />
              <div className="max-h-80 overflow-y-auto">
                {notifications.map((notif) => (
                  <DropdownMenuItem key={notif.id} className="p-2 flex flex-col items-start">
                    <p className={`text-sm ${notif.read ? "text-gray-500" : "font-medium"}`}>{notif.message}</p>
                    <span className="text-xs text-gray-400">{timeAgo(notif.time)}</span>
                  </DropdownMenuItem>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger className="cursor-pointer">
              {user ?
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-white"></div>
                  <div className="leading-tight text-sm text-left">
                    <p className="font-semibold">{user.name}</p>
                    <p className="text-gray-300 text-xs">{user.nim}</p>
                  </div>
                  <ChevronDown size={18} className="text-gray-200" />
                </div>
                :
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-white"></div>
                  <div className="leading-tight text-sm text-left">
                    <p className="font-semibold">Guest</p>
                    {/* <p className="text-gray-300 text-xs">{user.nim}</p> */}
                  </div>
                  <ChevronDown size={18} className="text-gray-200" />
                </div>
              }
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-48 p-1">
              <Link to="/profile">
                <DropdownMenuItem className="flex items-center gap-2">
                  <User size={16} /> Profile
                </DropdownMenuItem>
              </Link>
              <Link to="/library-room-booking">
                <DropdownMenuItem className="flex items-center gap-2">
                  <Library size={16} /> Sewa ruangan perpustakaan
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem className="flex items-center gap-2" onClick={logout}>
                <LogOut size={16} /> Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* MOBILE HAMBURGER */}
        <button
          className="lg:hidden p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="lg:hidden bg-teal-900 px-4 py-4 space-y-4 animate-in fade-in slide-in-from-top">
          <Link to="/" className="block py-2">Dashboard</Link>

          {/* Simple fallback instead of CourseMegaMenu */}
          <Link to="/courses" className="block py-2">Mata Kuliah</Link>

          <Link to="/tasks" className="block py-2">Tugas</Link>
          <Link to="/attendance" className="block py-2">Presensi</Link>
          <Link to="/grade" className="block py-2">Grade</Link>

          <hr className="border-teal-700" />

          {/* LANG */}
          <div className="flex items-center gap-2 py-2">
            <Globe size={18} /> Bahasa Indonesia
          </div>

          {/* PROFILE */}
          <div className="flex items-center gap-3 py-2">
            <div className="w-9 h-9 rounded-full bg-white"></div>
            <div className="leading-tight text-sm">
              {user ?
                <>
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-gray-300 text-xs">{user.nim}</p>
                </>
                :
                <>
                  <p className="font-semibold">Guest</p>
                </>
              }
            </div>
          </div>

          <Link to="/profile" className="flex items-center gap-2 py-2">
            <User size={16} /> Profile
          </Link>
          <Link to="/library-room-booking" className="flex items-center gap-2 py-2">
            <Library size={16} /> Sewa ruangan perpustakaan
          </Link>
          <div className="flex items-center gap-2 py-2 text-red-300" onClick={logout}>
            <LogOut size={16} /> Logout
          </div>
        </div>
      )}
    </nav>
  );
}
