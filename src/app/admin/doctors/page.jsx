"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, ChevronRight } from "lucide-react";

import CreateDoctorModal from "@/components/modals/CreateDoctorModal";
import toast from "react-hot-toast";

import AdminTable from "@/components/admin/AdminTable";
import StatusBadge from "@/components/admin/StatusBadge";

export default function AdminDoctorsPage() {
  const [doctors, setDoctors] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const router = useRouter();

  const fetchDoctors = async () => {
    try {
      const res = await fetch("/api/admin/doctors");
      const data = await res.json();
      setDoctors(data.doctors || []);
    } catch {
      toast.error("Failed to load doctors");
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-8 py-8">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Doctors</h1>

          <p className="text-gray-500 mt-1">
            Manage and monitor registered doctors
          </p>
        </div>

        <button
          onClick={() => setOpenModal(true)}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 rounded-2xl font-medium shadow-md hover:shadow-lg transition-all"
        >
          <Plus size={18} />
          Add Doctor
        </button>
      </div>

      {/* TABLE */}
      <AdminTable
        columns={[
          "Doctor",
          "Specialization",
          "Experience",
          "Fees",
          "Status",
          "",
        ]}
      >
        {doctors.map((doc) => (
          <tr
            key={doc.id}
            onClick={() => router.push(`/admin/doctors/${doc.id}`)}
            className="group cursor-pointer border-b border-gray-100 last:border-none hover:bg-gray-50/70 transition-all"
          >
            <td className="px-6 py-5">
              <div className="flex items-center gap-4">
                <img
                  src={doc.profileImage || "/doctor-placeholder.png"}
                  className="w-12 h-12 rounded-2xl object-cover"
                />

                <div>
                  <h2 className="font-semibold text-gray-900"> {doc.name}</h2>

                  <p className="text-sm text-gray-500">Doctor Profile</p>
                </div>
              </div>
            </td>

            <td className="px-6 py-5 text-gray-600">{doc.specialization}</td>

            <td className="px-6 py-5 text-gray-600">{doc.experience} yrs</td>

            <td className="px-6 py-5 text-gray-700 font-medium">₹{doc.fees}</td>

            <td className="px-6 py-5">
              <StatusBadge color={doc.available ? "green" : "red"}>
                {doc.available ? "Available" : "Unavailable"}
              </StatusBadge>
            </td>

            <td className="pr-6">
              <div className="h-10 w-10 rounded-xl flex items-center justify-center text-gray-400 transition-all group-hover:bg-white group-hover:text-emerald-600">
                <ChevronRight size={18} />
              </div>
            </td>
          </tr>
        ))}
      </AdminTable>

      {/* MODAL */}
      <CreateDoctorModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        refreshDoctors={fetchDoctors}
      />
    </div>
  );
}
