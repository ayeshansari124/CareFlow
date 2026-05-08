"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Stethoscope, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import LoginModal from "../modals/LoginModal";
import RegisterModal from "../modals/RegisterModal";

export default function Navbar() {

  const { user, logout } = useAuth();
  const router = useRouter();

  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);

  return (
    <>
      <nav className="bg-white shadow-md sticky top-0 z-50">

        <div className="max-w-7xl mx-auto px-4">

          <div className="flex items-center justify-between py-4">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">

              <div className="bg-teal-600 p-2 rounded-lg">
                <Stethoscope className="text-white w-5 h-5" />
              </div>

              <span className="text-2xl font-bold text-gray-800">
                CareFlow<span className="text-teal-600"> Hospital</span>
              </span>

            </Link>

            {/* Auth */}
            <div className="flex items-center gap-4">

              {!user ? (

                <>
                  <button
                    onClick={() => setLoginOpen(true)}
                    className="text-teal-600 font-medium text-sm hover:underline"
                  >
                    Login
                  </button>

                  <button
                    onClick={() => setRegisterOpen(true)}
                    className="px-4 py-2 bg-teal-600 text-white rounded-lg text-sm hover:bg-teal-700 transition"
                  >
                    Register
                  </button>
                </>

              ) : (

                <div className="flex items-center gap-3">

                  {/* Profile */}
                  <button
                    onClick={() => router.push("/profile")}
                    className="flex items-center gap-2 hover:bg-gray-100 rounded-lg transition"
                  >
                    <img
                      src="/avatar.png"
                      alt="profile"
                      className="w-12 h-12 rounded-full object-cover"
                    />

                  </button>

                  <button
                    onClick={logout}
                    className="p-2 hover:bg-red-50 rounded-lg transition"
                  >
                    <LogOut className="w-7 h-7 text-red-500" />
                  </button>

                </div>

              )}

            </div>

          </div>

          {/* Bottom Nav */}
          <div className="border-t border-gray-200">

            <div className="grid grid-cols-5 text-center text-gray-700 font-medium">

              <Link href="/" className="py-3 hover:bg-teal-50 hover:text-teal-600">
                Home
              </Link>

              <Link href="/doctors" className="py-3 hover:bg-teal-50 hover:text-teal-600">
                Doctors
              </Link>

              <Link href="/gallery" className="py-3 hover:bg-teal-50 hover:text-teal-600">
                Gallery
              </Link>

              <Link href="/about" className="py-3 hover:bg-teal-50 hover:text-teal-600">
                About
              </Link>

              <Link href="/contact" className="py-3 hover:bg-teal-50 hover:text-teal-600">
                Contact
              </Link>

            </div>

          </div>

        </div>

      </nav>

      <LoginModal
        isOpen={loginOpen}
        onClose={() => setLoginOpen(false)}
        switchToRegister={() => {
          setLoginOpen(false);
          setRegisterOpen(true);
        }}
      />

      <RegisterModal
        isOpen={registerOpen}
        onClose={() => setRegisterOpen(false)}
        switchToLogin={() => {
          setRegisterOpen(false);
          setLoginOpen(true);
        }}
      />

    </>
  );
}