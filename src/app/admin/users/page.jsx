"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { formatDate } from "@/lib/date";

import toast from "react-hot-toast";

import AdminTable from "@/components/admin/AdminTable";
import StatusBadge from "@/components/admin/StatusBadge";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const router = useRouter();

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/admin/users");
      const data = await res.json();

      setUsers(data.users || []);
    } catch {
      toast.error("Failed to load users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-8 py-8">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Patients</h1>

          <p className="text-gray-500 mt-1">
            Manage and monitor registered patients
          </p>
        </div>

        <div className="bg-white rounded-2xl px-5 py-3 shadow-md">
          <p className="text-sm text-gray-500">Total Patients</p>

          <h2 className="text-2xl font-bold text-gray-900">{users.length}</h2>
        </div>
      </div>

      {/* TABLE */}
      <AdminTable
        columns={[
          "Patient",
          "Gender",
          "Phone",
          "Email",
          "Appointments",
          "Joined",
          "",
        ]}
      >
        {users.map((user) => {
          const joined = formatDate(user.user.createdAt);
          return (
            <tr
              key={user.id}
              onClick={() => router.push(`/admin/users/${user.id}`)}
              className="group cursor-pointer border-b border-gray-100 last:border-none hover:bg-gray-50/70 transition-all"
            >
              {/* PATIENT */}
              <td className="px-6 py-5">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                    {user.name.charAt(0)}
                  </div>

                  <div>
                    <h2 className="font-semibold text-gray-900">{user.name}</h2>

                    <p className="text-sm text-gray-500">Patient Profile</p>
                  </div>
                </div>
              </td>

              {/* GENDER */}
              <td className="px-6 py-5 text-gray-600 font-medium">
                {user.gender}
              </td>

              {/* PHONE */}
              <td className="px-6 py-5 text-gray-600">{user.phone}</td>

              {/* EMAIL */}
              <td className="px-6 py-5 text-gray-600">{user.user.email}</td>

              {/* APPOINTMENTS */}
              <td className="px-6 py-5">
                <StatusBadge color="blue">
                  {user.appointments.length}
                </StatusBadge>
              </td>

              {/* JOINED */}
              <td className="px-6 py-5 text-gray-500">{joined}</td>

              {/* ARROW */}
              <td className="pr-6">
                <div className="h-10 w-10 rounded-xl flex items-center justify-center text-gray-400 transition-all group-hover:bg-white group-hover:text-emerald-600">
                  <ChevronRight size={18} />
                </div>
              </td>
            </tr>
          );
        })}
      </AdminTable>
    </div>
  );
}