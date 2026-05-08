"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Pencil,
  Save,
  IndianRupee,
  X,
} from "lucide-react";

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchAll = async () => {
    const [p, a] = await Promise.all([
      fetch("/api/profile"),
      fetch("/api/appointments"),
    ]);

    const pData = await p.json();
    const aData = await a.json();

    setProfile(pData.profile);
    setAppointments(aData.appointments || []);
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const updateProfile = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/profile", {
        method: "PATCH",

        headers: { "Content-Type": "application/json" },

        body: JSON.stringify(profile),
      });

      if (!res.ok) throw new Error();

      toast.success("Profile updated");

      setEditing(false);
    } catch {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  const cancelAppointment = async (id) => {
    toast(
      (t) => (
        <div className="flex flex-col gap-4">
          <div>
            <h3 className="font-semibold text-slate-900">
              Cancel Appointment?
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              This action cannot be undone.
            </p>
          </div>

          <div className="flex justify-end gap-2">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-4 py-2 rounded-xl bg-gray-100 text-sm"
            >
              Keep
            </button>

            <button
              onClick={async () => {
                toast.dismiss(t.id);

                const res = await fetch(`/api/appointments/${id}`, {
                  method: "PATCH",

                  headers: {
                    "Content-Type": "application/json",
                  },

                  body: JSON.stringify({
                    status: "CANCELLED",
                  }),
                });

                if (res.ok) {
                  toast.success("Appointment cancelled");
                  fetchAll();
                } else {
                  toast.error("Failed");
                }
              }}
              className="px-4 py-2 rounded-xl bg-red-500 text-white text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      { duration: 10000 },
    );
  };

  if (!profile) return null;

  const inputClass =
    "w-full rounded-xl border border-gray-200 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-100";

  const statusColor = (status) => {
    if (status === "PENDING") {
      return "bg-yellow-100 text-yellow-700";
    }

    if (status === "CONFIRMED") {
      return "bg-green-100 text-green-700";
    }

    if (status === "CANCELLED") {
      return "bg-red-100 text-red-600";
    }

    return "bg-blue-100 text-blue-700";
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex flex-col xl:flex-row gap-6 items-start">
        {/* PROFILE */}
        <div className="w-full xl:w-[360px] shrink-0">
          <div className="bg-white rounded-3xl border border-gray-100 p-5 sticky top-6">
            {/* TOP */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="h-14 w-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-xl font-bold shrink-0">
                  {profile.name?.charAt(0)}
                </div>

                <div className="min-w-0">
                  <h1 className="text-2xl font-black text-slate-900 leading-tight break-words">
                    {profile.name}
                  </h1>

                  <p className="text-sm text-gray-500 mt-1">Personal Profile</p>
                </div>
              </div>

              {!editing ? (
                <button
                  onClick={() => setEditing(true)}
                  className="h-10 w-10 rounded-xl bg-gray-100 hover:bg-emerald-100 hover:text-emerald-700 flex items-center justify-center transition shrink-0"
                >
                  <Pencil size={16} />
                </button>
              ) : (
                <button
                  onClick={updateProfile}
                  className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl text-sm font-medium shrink-0"
                >
                  <Save size={16} />
                  {loading ? "Saving..." : "Save"}
                </button>
              )}
            </div>

            {/* INFO */}
            <div className="mt-6 space-y-3">
              <ProfileItem icon={Mail} label="Email">
                {profile.email}
              </ProfileItem>

              <ProfileItem icon={Phone} label="Phone">
                {editing ? (
                  <input
                    className={inputClass}
                    value={profile.phone}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        phone: e.target.value,
                      })
                    }
                  />
                ) : (
                  profile.phone
                )}
              </ProfileItem>

              <ProfileItem icon={User} label="Gender">
                {editing ? (
                  <select
                    className={inputClass}
                    value={profile.gender}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        gender: e.target.value,
                      })
                    }
                  >
                    <option>MALE</option>
                    <option>FEMALE</option>
                    <option>OTHER</option>
                  </select>
                ) : (
                  profile.gender
                )}
              </ProfileItem>

              <ProfileItem icon={Calendar} label="Date of Birth">
                {editing ? (
                  <input
                    type="date"
                    className={inputClass}
                    value={profile.dob?.split("T")[0]}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        dob: e.target.value,
                      })
                    }
                  />
                ) : (
                  new Date(profile.dob).toLocaleDateString()
                )}
              </ProfileItem>

              <ProfileItem icon={MapPin} label="Address">
                {editing ? (
                  <textarea
                    rows={3}
                    className={inputClass}
                    value={profile.address}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        address: e.target.value,
                      })
                    }
                  />
                ) : (
                  profile.address
                )}
              </ProfileItem>
            </div>
          </div>
        </div>

        {/* APPOINTMENTS */}
        <div className="flex-1 w-full">
          <div className="bg-white rounded-3xl border border-gray-100 p-5 sm:p-6">
            {/* HEADER */}
            <div className="mb-6">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                My Appointments
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                {appointments.length} total appointments
              </p>
            </div>

            {appointments.length === 0 ? (
              <div className="h-[220px] flex items-center justify-center text-gray-500">
                No appointments yet
              </div>
            ) : (
              <div className="space-y-3">
                {appointments.map((a) => {
                  const date = new Date(a.bookingTime).toLocaleString();

                  return (
                    <div
                      key={a.id}
                      className="rounded-2xl border border-gray-100 hover:border-emerald-200 hover:bg-emerald-50/30 transition-all p-4"
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        {/* LEFT */}
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-3 flex-wrap">
                            <h3 className="font-bold text-slate-900 text-lg">
                              Dr. {a.doctor.name}
                            </h3>

                            <span
                              className={`text-[11px] px-3 py-1 rounded-full font-semibold ${statusColor(a.status)}`}
                            >
                              {a.status}
                            </span>
                          </div>

                          <p className="text-sm text-gray-500 mt-1">
                            {a.doctor.specialization}
                          </p>

                          <div className="flex flex-wrap items-center gap-5 mt-4 text-sm">
                            <div className="flex items-center gap-2 text-gray-700">
                              <Calendar
                                size={15}
                                className="text-emerald-600"
                              />

                              <span>{date}</span>
                            </div>

                            <div className="flex items-center gap-2 text-gray-700">
                              <IndianRupee
                                size={15}
                                className="text-emerald-600"
                              />

                              <span className="font-semibold">₹{a.amount}</span>
                            </div>
                          </div>
                        </div>

                        {/* RIGHT */}
                        {a.status === "PENDING" && (
                          <button
                            onClick={() => cancelAppointment(a.id)}
                            className="flex items-center justify-center gap-2 text-red-600 hover:bg-red-50 px-4 py-2 rounded-xl text-sm font-medium transition whitespace-nowrap"
                          >
                            <X size={15} />
                            Cancel
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* PROFILE ITEM */
function ProfileItem({ icon: Icon, label, children }) {
  return (
    <div className="rounded-2xl bg-gray-50 p-4">
      <div className="flex items-start gap-3">
        <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center text-emerald-600 shrink-0">
          <Icon size={18} />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-xs text-gray-500 mb-1">{label}</p>

          <div className="font-medium text-slate-900 text-sm break-words">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

/* APPOINTMENT ITEM */
function AppointmentItem({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-3">
      <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center text-emerald-600 shrink-0">
        <Icon size={18} />
      </div>

      <div className="min-w-0">
        <p className="text-xs text-gray-500">{label}</p>

        <p className="font-semibold text-sm text-slate-900 break-words">
          {value}
        </p>
      </div>
    </div>
  );
}
