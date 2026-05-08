"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Clock3, Phone, IndianRupee, ArrowUpRight } from "lucide-react";

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState([]);
  const router = useRouter();

  const fetchDoctors = async () => {
    const res = await fetch("/api/doctors");
    const data = await res.json();

    setDoctors(data.doctors || []);
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-5 sm:px-8 py-10">
      {/* HEADER */}
      <div className="max-w-3xl mb-12">
        <h1 className="text-4xl sm:text-5xl font-black text-gray-900 leading-tight">
          Meet Our
          <span className="text-teal-600"> Doctors</span>
        </h1>

        <p className="text-gray-500 text-lg mt-4 leading-relaxed">
          Experienced specialists delivering trusted care and personalized
          treatment.
        </p>
      </div>

      {/* GRID */}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {doctors.map((doctor) => (
          <div
            key={doctor.id}
            onClick={() => router.push(`/doctors/${doctor.id}`)}
            className="group bg-white rounded-[30px] p-5 border border-gray-100 hover:border-teal-200 hover:shadow-2xl transition-all duration-300 cursor-pointer"
          >
            {/* TOP */}
            <div className="flex items-start gap-4">
              {/* IMAGE */}
              <div className="relative shrink-0">
                <img
                  src={doctor.profileImage || "/doctor-placeholder.png"}
                  alt={doctor.name}
                  className="h-28 w-28 rounded-3xl object-cover object-top"
                />

                <div
                  className={`absolute -bottom-2 left-1/2 -translate-x-1/2 text-[11px] px-3 py-1 rounded-full font-semibold shadow-md whitespace-nowrap ${
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
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h2 className="text-2xl font-black text-gray-900 leading-tight">
                      Dr. {doctor.name}
                    </h2>

                    <p className="text-teal-600 font-semibold mt-1">
                      {doctor.degree}
                    </p>
                  </div>

                  <div className="h-10 w-10 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-500 group-hover:bg-teal-600 group-hover:text-white transition shrink-0">
                    <ArrowUpRight size={18} />
                  </div>
                </div>

                {/* SPECIALIZATION */}
                <div className="mt-3">
                  <div className="inline-flex bg-gray-100 text-gray-700 rounded-2xl px-4 py-2 font-semibold text-sm">
                    {doctor.specialization}
                  </div>
                </div>
              </div>
            </div>

            {/* BOTTOM */}
            <div className="mt-5 grid grid-cols-3 gap-3">
              {/* EXPERIENCE */}
              <div className="rounded-2xl bg-blue-50 p-4">
                <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center text-blue-600 mb-3">
                  <Clock3 size={18} />
                </div>

                <p className="text-xs text-gray-400 font-medium">Experience</p>

                <p className="font-bold text-gray-900 mt-1">
                  {doctor.experience} yrs
                </p>
              </div>

              {/* FEES */}
              <div className="rounded-2xl bg-emerald-50 p-4">
                <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center text-emerald-600 mb-3">
                  <IndianRupee size={18} />
                </div>

                <p className="text-xs text-gray-400 font-medium">Fees</p>

                <p className="font-bold text-emerald-700 mt-1">
                  ₹{doctor.fees}
                </p>
              </div>

              {/* PHONE */}
              <div className="rounded-2xl bg-orange-50 p-4">
                <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center text-orange-600 mb-3">
                  <Phone size={18} />
                </div>

                <p className="text-xs text-gray-400 font-medium">Contact</p>

                <p className="font-bold text-gray-900 mt-1 text-sm break-words">
                  {doctor.phone}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
