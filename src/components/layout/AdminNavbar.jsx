"use client";

import Link from "next/link";
import { Stethoscope, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function AdminNavbar() {
    const { logout } = useAuth();

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">

            <div className="max-w-7xl mx-auto px-4">

                {/* Top Row */}
                <div className="flex items-center justify-between py-4">

                    {/* Logo */}
                    <Link href="/admin" className="flex items-center gap-2">
                        <div className="bg-teal-600 p-2 rounded-lg">
                            <Stethoscope className="text-white w-5 h-5" />
                        </div>
                        <span className="text-2xl font-bold text-gray-800">
                            CareFlow<span className="text-teal-600"> Admin</span>
                        </span>
                    </Link>

                    <button
                        onClick={logout}
                        className="p-2 rounded-lg hover:bg-red-50 transition"
                    >
                        <LogOut className="w-7 h-7 text-red-500" />
                    </button>

                </div>

                {/* Admin Navigation */}
                <div className="border-t border-gray-200">
                    <div className="grid grid-cols-4 text-center text-gray-700 font-medium">

                        <Link
                            href="/admin"
                            className="py-3 hover:bg-teal-50 hover:text-teal-600 transition"
                        >
                            Home
                        </Link>

                        <Link
                            href="/admin/users"
                            className="py-3 hover:bg-teal-50 hover:text-teal-600 transition"
                        >
                            Users
                        </Link>

                        <Link
                            href="/admin/doctors"
                            className="py-3 hover:bg-teal-50 hover:text-teal-600 transition"
                        >
                            Doctors
                        </Link>

                        <Link
                            href="/admin/appointments"
                            className="py-3 hover:bg-teal-50 hover:text-teal-600 transition"
                        >
                            Appointments
                        </Link>

                    </div>
                </div>

            </div>
        </nav>
    );
}