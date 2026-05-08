"use client";

import { useEffect, useState, use } from "react";
import {
  CalendarDays,
  CircleDollarSign,
  User,
  Stethoscope,
  CheckCircle2,
  XCircle,
  BadgeCheck,
} from "lucide-react";

import toast from "react-hot-toast";
import StatusBadge from "@/components/admin/StatusBadge";

export default function AppointmentDetailPage({ params }) {
  const { id } = use(params);
  const [appointment, setAppointment] = useState(null);

  const fetchAppointment = async () => {
    const res = await fetch(`/api/admin/appointments/${id}`);
    const data = await res.json();
    setAppointment(data.appointment);
  };

  useEffect(() => {
    fetchAppointment();
  }, [id]);

  const updateStatus = async (status) => {
    const res = await fetch(`/api/admin/appointments/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    if (res.ok) {
      toast.success("Status updated");
      fetchAppointment();
    }
  };

  if (!appointment)
    return (
      <div className="p-10 text-center text-gray-500">
        Loading appointment...
      </div>
    );

  const date = new Date(appointment.bookingTime).toLocaleString();

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
        <h1 className="text-3xl font-bold text-gray-900">
          Appointment Details
        </h1>
        <p className="text-gray-500 mt-1">
          View and manage appointment information
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[380px_1fr] gap-6 items-start">
        {/* LEFT */}
        <div className="bg-white rounded-[32px] shadow-[0_8px_30px_rgba(0,0,0,0.06)] p-6 xl:sticky xl:top-6">
          <div className="flex flex-col items-center text-center">
            <div className="h-24 w-24 rounded-[28px] bg-emerald-100 text-emerald-700 flex items-center justify-center mb-5">
              <CalendarDays size={42} />
            </div>

            <h2 className="text-2xl font-bold text-gray-900">Appointment</h2>
            <p className="text-gray-500 mt-1">Appointment Record</p>

            <div className="mt-5">
              <StatusBadge color={getStatusColor(appointment.status)}>
                {appointment.status}
              </StatusBadge>
            </div>
          </div>

          <div className="mt-8 space-y-5">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center">
                <User size={22} />
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-1">Patient</p>
                <h3 className="font-semibold text-gray-900">
                  {appointment.patient.name}
                </h3>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <Stethoscope size={22} />
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-1">Doctor</p>
                <h3 className="font-semibold text-gray-900">
                  Dr. {appointment.doctor.name}
                </h3>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center">
                <CalendarDays size={22} />
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-1">Appointment Date</p>
                <h3 className="font-semibold text-gray-900">{date}</h3>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-2xl bg-yellow-100 text-yellow-700 flex items-center justify-center">
                <CircleDollarSign size={22} />
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-1">
                  Consultation Amount
                </p>

                <h3 className="font-semibold text-gray-900">
                  ₹{appointment.amount}
                </h3>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="bg-white rounded-[32px] shadow-[0_8px_30px_rgba(0,0,0,0.06)] p-6">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Update Appointment Status
            </h2>

            <p className="text-gray-500 mt-1">
              Manage appointment workflow and actions
            </p>
          </div>

          <div className="bg-gray-50 rounded-3xl p-6 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-2">Current Status</p>

                <StatusBadge color={getStatusColor(appointment.status)}>
                  {appointment.status}
                </StatusBadge>
              </div>

              <div className="h-16 w-16 rounded-2xl bg-white flex items-center justify-center shadow-sm">
                <BadgeCheck size={30} className="text-emerald-600" />
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <button
              onClick={() => updateStatus("CONFIRMED")}
              className="bg-emerald-100 hover:bg-emerald-200 text-emerald-700 rounded-3xl p-5 transition text-left"
            >
              <div className="h-12 w-12 rounded-2xl bg-white flex items-center justify-center mb-4">
                <CheckCircle2 size={24} />
              </div>

              <h3 className="font-semibold text-lg">Confirm</h3>

              <p className="text-sm mt-1 opacity-80">
                Mark appointment as confirmed
              </p>
            </button>

            <button
              onClick={() => updateStatus("CANCELLED")}
              className="bg-red-100 hover:bg-red-200 text-red-700 rounded-3xl p-5 transition text-left"
            >
              <div className="h-12 w-12 rounded-2xl bg-white flex items-center justify-center mb-4">
                <XCircle size={24} />
              </div>

              <h3 className="font-semibold text-lg">Cancel</h3>

              <p className="text-sm mt-1 opacity-80">Cancel this appointment</p>
            </button>

            <button
              onClick={() => updateStatus("COMPLETED")}
              className="bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-3xl p-5 transition text-left"
            >
              <div className="h-12 w-12 rounded-2xl bg-white flex items-center justify-center mb-4">
                <BadgeCheck size={24} />
              </div>

              <h3 className="font-semibold text-lg">Complete</h3>

              <p className="text-sm mt-1 opacity-80">
                Mark appointment as completed
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
