import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import StatusBadge from "@/components/admin/StatusBadge";

export default async function PatientDetailPage({ params }) {
  const { id } = await params;

  const patient = await prisma.patient.findUnique({
    where: { id },

    include: {
      user: true,

      appointments: {
        include: { doctor: true },

        orderBy: { bookingTime: "desc" },
      },
    },
  });

  if (!patient) return notFound();

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
        <h1 className="text-3xl font-bold text-gray-900">Patient Details</h1>

        <p className="text-gray-500 mt-1">
          View patient information and appointment records
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[380px_1fr] gap-6 items-start">
        {/* LEFT */}
        <div className="bg-white rounded-[32px] shadow-[0_8px_30px_rgba(0,0,0,0.06)] p-6 xl:sticky xl:top-6">
          <div className="flex flex-col items-center text-center">
            <div className="h-24 w-24 rounded-[28px] bg-emerald-100 text-emerald-700 flex items-center justify-center text-4xl font-bold mb-5">
              {patient.name.charAt(0)}
            </div>

            <h2 className="text-2xl font-bold text-gray-900">{patient.name}</h2>

            <p className="text-gray-500 mt-1">Patient Record</p>

            <div className="mt-5 bg-gray-100 rounded-2xl px-4 py-2 text-sm text-gray-600">
              Joined {new Date(patient.user.createdAt).toLocaleDateString()}
            </div>
          </div>

          <div className="mt-8 space-y-5">
            <div>
              <p className="text-sm text-gray-500 mb-1">Gender</p>

              <h3 className="font-semibold text-gray-900">{patient.gender}</h3>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-1">Phone</p>

              <h3 className="font-semibold text-gray-900">{patient.phone}</h3>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-1">Email</p>

              <h3 className="font-semibold text-gray-900 break-all">
                {patient.user.email}
              </h3>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-1">Date of Birth</p>

              <h3 className="font-semibold text-gray-900">
                {new Date(patient.dob).toLocaleDateString()}
              </h3>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-1">Address</p>

              <h3 className="font-semibold text-gray-900">{patient.address}</h3>
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

              <p className="text-gray-500 mt-1">Patient appointment activity</p>
            </div>

            <div className="bg-emerald-50 text-emerald-700 rounded-2xl px-4 py-2 text-sm font-semibold">
              {patient.appointments.length} Total
            </div>
          </div>

          {patient.appointments.length === 0 ? (
            <div className="px-6 pb-8">
              <div className="bg-gray-50 rounded-3xl p-12 text-center text-gray-500">
                No appointments booked yet.
              </div>
            </div>
          ) : (
            <>
              {/* DESKTOP */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full">
                  <thead className="text-left text-sm text-gray-500 border-b border-gray-100">
                    <tr>
                      <th className="px-6 py-4 font-semibold">Doctor</th>
                      <th className="px-6 py-4 font-semibold">Date</th>
                      <th className="px-6 py-4 font-semibold">Amount</th>
                      <th className="px-6 py-4 font-semibold">Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {patient.appointments.map((appt) => {
                      const date = new Date(appt.bookingTime).toLocaleString();

                      return (
                        <tr
                          key={appt.id}
                          className="border-b border-gray-100 last:border-none hover:bg-gray-50/70 transition"
                        >
                          <td className="px-6 py-5">
                            <div>
                              <h3 className="font-semibold text-gray-900">
                                {appt.doctor.name}
                              </h3>

                              <p className="text-sm text-gray-500 mt-1">
                                Appointment
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
                {patient.appointments.map((appt) => {
                  const date = new Date(appt.bookingTime).toLocaleString();

                  return (
                    <div
                      key={appt.id}
                      className="bg-gray-50 rounded-3xl p-5 space-y-4"
                    >
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Doctor</p>

                        <h3 className="font-semibold text-gray-900">
                           {appt.doctor.name}
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
    </div>
  );
}
