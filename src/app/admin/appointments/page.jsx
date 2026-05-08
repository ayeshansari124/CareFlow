"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";

import AdminTable from "@/components/admin/AdminTable";
import StatusBadge from "@/components/admin/StatusBadge";

export default function AdminAppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const router = useRouter();

  const fetchAppointments = async () => {
    const res = await fetch("/api/admin/appointments");
    const data = await res.json();
    setAppointments(data.appointments || []);
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const statusColors = {
    CONFIRMED: "green",
    PENDING: "yellow",
    CANCELLED: "red",
    COMPLETED: "blue",
  };

  return (
    <div className="max-w-7xl mx-auto px-8 py-8">
      <AdminTable
        columns={["Patient", "Doctor", "Date", "Amount", "Status", ""]}
      >
        {appointments.map((appt) => {
          const date = new Date(appt.bookingTime).toLocaleString();

          return (
            <tr
              key={appt.id}
              onClick={() => router.push(`/admin/appointments/${appt.id}`)}
              className="group cursor-pointer border-b border-gray-100 last:border-none hover:bg-gray-50/70 transition-all"
            >
              <td className="px-6 py-5 font-medium text-gray-900">
                {appt.patient.name}
              </td>

              <td className="px-6 py-5 text-gray-600">Dr. {appt.doctor.name}</td>

              <td className="px-6 py-5 text-gray-600">{date}</td>

              <td className="px-6 py-5 text-gray-700 font-medium">
                ₹{appt.amount}
              </td>

              <td className="px-6 py-5">
                <StatusBadge color={statusColors[appt.status]}>
                  {appt.status}
                </StatusBadge>
              </td>

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
