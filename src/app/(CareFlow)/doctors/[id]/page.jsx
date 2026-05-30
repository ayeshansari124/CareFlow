"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";

import {
  Calendar,
  Clock3,
  IndianRupee,
  Phone,
  User,
  Stethoscope,
} from "lucide-react";

export default function AppointmentPage({ params }) {
  const { id } = use(params);

  const router = useRouter();
  const { user } = useAuth();
  const [doctor, setDoctor] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const fetchDoctor = async () => {
    const res = await fetch(`/api/doctors/${id}`);
    const data = await res.json();

    setDoctor(data.doctor);
  };

  useEffect(() => {
    fetchDoctor();
  }, [id]);

  const handleBooking = async () => {
    if (!date || !time) {
      return toast.error("Please select date and time");
    }

    const bookingTime = new Date(`${date}T${time}`);

    const res = await fetch("/api/appointments", {
      method: "POST",

      headers: { "Content-Type": "application/json" },

      body: JSON.stringify({
        doctorId: id,
        bookingTime,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      return toast.error(data.error || "Booking failed");
    }

    toast.success("Appointment booked successfully");

    setDate("");
    setTime("");

    router.push("/profile");
  };

  if (!doctor) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 overflow-hidden">
      <div className="grid xl:grid-cols-2 gap-6 items-start overflow-hidden">
        {/* LEFT */}
        <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-6 overflow-hidden">
          <div className="flex flex-col gap-6">
            {/* TOP */}
            <div className="flex flex-col sm:flex-row gap-5">
              {/* IMAGE */}
              <div className="relative shrink-0">
                <img
                  src={doctor.profileImage || "/doctor-placeholder.png"}
                  className="w-full sm:w-[160px] h-[260px] sm:h-[160px] object-cover rounded-[2rem]"
                />

                <div
                  className={`absolute top-3 left-3 px-4 py-1.5 rounded-full text-xs font-semibold shadow-lg ${
                    doctor.available
                      ? "bg-emerald-500 text-white"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {doctor.available ? "Available" : "Unavailable"}
                </div>
              </div>

              {/* INFO */}
              <div className="flex-1 min-w-0">
                <h1 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight break-words">
                   {doctor.name}
                </h1>

                <p className="text-emerald-600 text-xl font-semibold mt-2">
                  {doctor.degree}
                </p>

                <div className="mt-4">
                  <span className="px-4 py-2 rounded-2xl bg-gray-100 text-gray-800 text-base font-medium inline-block">
                    {doctor.specialization}
                  </span>
                </div>
              </div>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-blue-50 px-4 py-4">
                <div className="flex items-center gap-3">
                  <div className="h-11 w-11 rounded-xl bg-white flex items-center justify-center text-blue-600 shrink-0">
                    <Clock3 size={20} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs text-gray-400 font-medium">
                      Experience
                    </p>

                    <p className="font-bold text-gray-900 text-lg">
                      {doctor.experience} yrs
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-emerald-50 px-4 py-4">
                <div className="flex items-center gap-3">
                  <div className="h-11 w-11 rounded-xl bg-white flex items-center justify-center text-emerald-600 shrink-0">
                    <IndianRupee size={20} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs text-gray-400 font-medium">Fee</p>

                    <p className="font-bold text-emerald-700 text-lg">
                      ₹{doctor.fees}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-orange-50 px-4 py-4">
                <div className="flex items-center gap-3">
                  <div className="h-11 w-11 rounded-xl bg-white flex items-center justify-center text-orange-600 shrink-0">
                    <Phone size={20} />
                  </div>

                  <div className="min-w-0 overflow-hidden">
                    <p className="text-xs text-gray-400 font-medium">Contact</p>

                    <p className="font-bold text-gray-900 text-base break-all">
                      {doctor.phone}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-purple-50 px-4 py-4">
                <div className="flex items-center gap-3">
                  <div className="h-11 w-11 rounded-xl bg-white flex items-center justify-center text-purple-600 shrink-0">
                    <User size={20} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs text-gray-400 font-medium">Gender</p>

                    <p className="font-bold text-gray-900 text-base capitalize">
                      {doctor.gender}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ABOUT */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">
                About Doctor
              </h2>

              <p className="text-gray-600 leading-relaxed break-words">
                {doctor.about}
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-6 sm:p-8 overflow-hidden">
          <div className="flex items-start gap-4 mb-8">
            <div className="h-14 w-14 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
              <Calendar size={28} />
            </div>

            <div className="min-w-0">
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight">
                Book Appointment
              </h2>

              <p className="text-gray-500 mt-2 text-base leading-relaxed">
                Schedule your consultation with your preferred doctor.
              </p>
            </div>
          </div>

          {/* FORM */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Select Date
              </label>

              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 outline-none focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Select Time
              </label>

              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 outline-none focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500"
              />
            </div>

            {/* SUMMARY */}
            <div className="rounded-2xl bg-slate-50 border border-gray-100 p-5">
              <div className="flex items-center gap-2 mb-4">
                <Stethoscope size={18} className="text-emerald-600" />

                <h3 className="font-semibold text-slate-900">
                  Appointment Summary
                </h3>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between gap-4">
                  <span className="text-gray-500">Doctor</span>

                  <span className="font-semibold text-gray-900 text-right">
                     {doctor.name}
                  </span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-gray-500">Specialization</span>

                  <span className="font-semibold text-gray-900 text-right">
                    {doctor.specialization}
                  </span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-gray-500">Consultation Fee</span>

                  <span className="font-bold text-emerald-700 text-right">
                    ₹{doctor.fees}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                if (!user) {
                  return toast.error("Please login to book appointment");
                }

                handleBooking();
              }}
              disabled={!user}
              className={`
    w-full py-4 rounded-2xl
    text-white font-bold text-lg
    transition-all

    ${
      user
        ? "bg-emerald-600 hover:bg-emerald-700 hover:scale-[1.01] active:scale-[0.98]"
        : "bg-gray-300 cursor-not-allowed"
    }
  `}
            >
              {user ? "Confirm Appointment" : "Login Required"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
