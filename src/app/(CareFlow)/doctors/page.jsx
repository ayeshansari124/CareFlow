"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      {/* HEADER */}
      <div className="mb-12 max-w-2xl">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">
          Our Doctors
        </h1>
        <p className="text-gray-500 mt-4 text-lg leading-relaxed">
          Meet our experienced and qualified doctors dedicated to providing
          trusted and personalized medical care.
        </p>
      </div>

      {/* GRID */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {doctors.map((doctor) => (
          <div
            key={doctor.id}
            onClick={() => router.push(`/doctors/${doctor.id}`)}
            className="group bg-white rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden"
          >
            {/* IMAGE */}
            <div className="relative h-78 sm:h-52 overflow-hidden">
              <img
                src={doctor.profileImage || "/doctor-placeholder.png"}
                className="w-full h-full object-cover object-top group-hover:scale-105 transition duration-300"
              />
              {/* Availability*/}
              <div
                className={`absolute bottom-3 right-3 px-3 py-1 rounded-full text-lg font-semibold ${doctor.available
                  ? "bg-green-500 text-white"
                  : "bg-red-500 text-white"
                  }`}
              >
                {doctor.available ? "Available" : "Unavailable"}
              </div>
            </div>
            {/* CONTENT */}
            <div className="p-4">
              <h2 className="text-2xl font-bold text-gray-900">
                Dr. {doctor.name}
              </h2>
              <p className="text-lg font-semibold text-gray-700 mb-3">
                {doctor.degree}
              </p>
              {/* GRID */}
              <div className="grid grid-cols-2 gap-y-2 text-sm">
                <div>
                  <p className="text-gray-400 font-semibold text-lg">Specialization</p>
                  <p className="text-gray-800 font-bold font-xl">
                    {doctor.specialization}
                  </p>
                </div>

                <div>
                  <p className="text-gray-400 font-semibold text-lg">Experience</p>
                  <p className="text-gray-800 font-bold font-xl">
                    {doctor.experience} yrs
                  </p>
                </div>

                <div>
                  <p className="text-gray-400 font-semibold text-lg">Fees</p>
                  <p className="text-teal-600 font-bold">
                    ₹{doctor.fees}
                  </p>
                </div>

                <div>
                  <p className="text-gray-400 font-semibold text-lg">Phone</p>
                  <p className="text-gray-800 font-bold font-xl">
                    {doctor.phone}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}