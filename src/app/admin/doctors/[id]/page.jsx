"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Trash2, CheckCircle2, XCircle } from "lucide-react";

import toast from "react-hot-toast";
import CreateDoctorModal from "@/components/modals/CreateDoctorModal";
import StatusBadge from "@/components/admin/StatusBadge";
import { formatDateTime } from "@/lib/date";
export default function DoctorDetailPage({ params }) {
  const router = useRouter();
  const { id } = use(params);

  const [doctor, setDoctor] = useState(null);
  const [editOpen, setEditOpen] = useState(false);

  const fetchDoctor = async () => {
    const res = await fetch(`/api/admin/doctors/${id}`);
    const data = await res.json();
    setDoctor(data.doctor);
  };

  useEffect(() => {
    if (id) fetchDoctor();
  }, [id]);

  if (!doctor)
    return (
      <div className="p-10 text-center text-gray-500">Loading doctor...</div>
    );

  const toggleAvailability = async () => {
    const res = await fetch(`/api/admin/doctors/${doctor.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ available: !doctor.available }),
    });

    if (res.ok) {
      toast.success("Availability updated");
      fetchDoctor();
    }
  };

  const deleteDoctor = async () => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this doctor?",
    );

    if (!confirmDelete) return;

    const res = await fetch(`/api/admin/doctors/${doctor.id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      toast.success("Doctor deleted");
      router.push("/admin/doctors");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "PENDING":
        return "yellow";
      case "CONFIRMED":
        return "blue";
      case "COMPLETED":
        return "green";
      default:
        return "red";
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Doctor Details</h1>

        <p className="text-gray-500 mt-1">
          View doctor information and appointment records
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[380px_1fr] gap-6 items-start">
        {/* LEFT */}
        <div className="bg-white rounded-[32px] shadow-[0_8px_30px_rgba(0,0,0,0.06)] p-6 xl:sticky xl:top-6">
          <div className="flex flex-col items-center text-center">
            <img
              src={doctor.profileImage || "/doctor-placeholder.png"}
              className="w-28 h-28 rounded-[28px] object-cover shadow-md"
            />

            <h2 className="text-2xl font-bold text-gray-900 mt-5">
               {doctor.name}
            </h2>

            <p className="text-gray-500 mt-1">{doctor.specialization}</p>

            <div className="mt-5">
              <StatusBadge color={doctor.available ? "green" : "red"}>
                {doctor.available ? "Available" : "Unavailable"}
              </StatusBadge>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mt-8">
            <button
              onClick={toggleAvailability}
              className={`flex items-center justify-center rounded-2xl h-14 transition ${
                doctor.available
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {doctor.available ? (
                <CheckCircle2 size={22} />
              ) : (
                <XCircle size={22} />
              )}
            </button>

            <button
              onClick={() => setEditOpen(true)}
              className="flex items-center justify-center rounded-2xl h-14 bg-blue-100 text-blue-700 hover:bg-blue-200 transition"
            >
              <Pencil size={20} />
            </button>

            <button
              onClick={deleteDoctor}
              className="flex items-center justify-center rounded-2xl h-14 bg-red-100 text-red-700 hover:bg-red-200 transition"
            >
              <Trash2 size={20} />
            </button>
          </div>

          <div className="mt-8 space-y-5">
            <div>
              <p className="text-sm text-gray-500 mb-1">Gender</p>
              <h3 className="font-semibold text-gray-900">{doctor.gender}</h3>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-1">Phone</p>
              <h3 className="font-semibold text-gray-900">{doctor.phone}</h3>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-1">Email</p>
              <h3 className="font-semibold text-gray-900 break-all">
                {doctor.user.email}
              </h3>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-1">Degree</p>
              <h3 className="font-semibold text-gray-900">{doctor.degree}</h3>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-1">Experience</p>
              <h3 className="font-semibold text-gray-900">
                {doctor.experience} years
              </h3>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-1">Consultation Fees</p>

              <h3 className="font-semibold text-gray-900">₹{doctor.fees}</h3>
            </div>
          </div>

          <div className="mt-8">
            <p className="text-sm text-gray-500 mb-2">About</p>

            <div className="bg-gray-50 rounded-3xl p-5 text-gray-700 leading-relaxed text-sm">
              {doctor.about}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="bg-white rounded-[32px] shadow-[0_8px_30px_rgba(0,0,0,0.06)] overflow-hidden">
          <div className="px-6 py-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Appointment History
              </h2>

              <p className="text-gray-500 mt-1">Doctor appointment activity</p>
            </div>

            <div className="bg-emerald-50 text-emerald-700 rounded-2xl px-4 py-2 text-sm font-semibold">
              {doctor.appointments?.length || 0} Total
            </div>
          </div>

          {!doctor.appointments || doctor.appointments.length === 0 ? (
            <div className="px-6 pb-8">
              <div className="bg-gray-50 rounded-3xl p-12 text-center text-gray-500">
                No appointments for this doctor yet.
              </div>
            </div>
          ) : (
            <>
              {/* DESKTOP */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full">
                  <thead className="text-left text-sm text-gray-500 border-b border-gray-100">
                    <tr>
                      <th className="px-6 py-4 font-semibold">Patient</th>
                      <th className="px-6 py-4 font-semibold">Date</th>
                      <th className="px-6 py-4 font-semibold">Amount</th>
                      <th className="px-6 py-4 font-semibold">Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {doctor.appointments.map((appt) => {
                      const date = formatDateTime(appt.bookingTime);
                      return (
                        <tr
                          key={appt.id}
                          className="border-b border-gray-100 last:border-none hover:bg-gray-50/70 transition"
                        >
                          <td className="px-6 py-5">
                            <div>
                              <h3 className="font-semibold text-gray-900">
                                {appt.patient.name}
                              </h3>

                              <p className="text-sm text-gray-500 mt-1">
                                Patient Record
                              </p>
                            </div>
                          </td>

                          <td className="px-6 py-5 text-gray-600">{date}</td>

                          <td className="px-6 py-5 font-semibold text-gray-900">
                            ₹{appt.amount}
                          </td>

                          <td className="px-6 py-5">
                            <StatusBadge color={getStatusColor(appt.status)}>
                              {appt.status}
                            </StatusBadge>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* MOBILE */}
              <div className="lg:hidden px-5 pb-5 space-y-4">
                {doctor.appointments.map((appt) => {
                  const date = formatDateTime(appt.bookingTime);
                  return (
                    <div
                      key={appt.id}
                      className="bg-gray-50 rounded-3xl p-5 space-y-4"
                    >
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Patient</p>

                        <h3 className="font-semibold text-gray-900">
                          {appt.patient.name}
                        </h3>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500 mb-1">
                          Appointment Date
                        </p>

                        <h3 className="font-medium text-gray-800">{date}</h3>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Amount</p>

                          <h3 className="font-semibold text-gray-900">
                            ₹{appt.amount}
                          </h3>
                        </div>

                        <StatusBadge color={getStatusColor(appt.status)}>
                          {appt.status}
                        </StatusBadge>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>

      <CreateDoctorModal
        isOpen={editOpen}
        onClose={() => setEditOpen(false)}
        doctor={doctor}
        editMode
      />
    </div>
  );
}
