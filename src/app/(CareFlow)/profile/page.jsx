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
} from "lucide-react";

export default function ProfilePage() {
    const [profile, setProfile] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const [editing, setEditing] = useState(false);
    const [loading, setLoading] = useState(false);

    const fetchAll = async () => {
        const [p, a] = await Promise.all([
            fetch("/api/profile"),
            fetch("/api/appointments")
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
                body: JSON.stringify(profile)
            });

            if (!res.ok) throw new Error();

            toast.success("Updated");
            setEditing(false);
        } catch {
            toast.error("Failed");
        } finally {
            setLoading(false);
        }
    };

    const cancelAppointment = async (id) => {
        if (!confirm("Cancel appointment?")) return;

        const res = await fetch(`/api/appointments/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: "CANCELLED" })
        });

        if (res.ok) {
            toast.success("Cancelled");
            fetchAll();
        }
    };

    if (!profile) return null;

    const input =
        "w-full mt-1 px-4 py-2.5 rounded-lg bg-gray-100 focus:ring-2 focus:ring-teal-500 outline-none";

    const statusColor = (s) => {
        if (s === "PENDING") return "bg-yellow-100 text-yellow-700";
        if (s === "CONFIRMED") return "bg-green-100 text-green-700";
        if (s === "CANCELLED") return "bg-red-100 text-red-600";
        return "bg-blue-100 text-blue-700";
    };

    return (
        <div className="max-w-2xl mx-auto px-4 py-10 space-y-8">

            {/* PROFILE */}
            <h1 className="text-4xl font-bold flex items-center text-teal-700 gap-2">
                <User className="text-teal-600" size={20} />
                My Profile
            </h1>
            <div className="bg-white rounded-2xl shadow-2xl p-6 space-y-6">

                <div className="flex justify-end items-center">

                    {!editing ? (
                        <button
                            onClick={() => setEditing(true)}
                            className="text-teal-600 flex items-center gap-1 text-sm font-medium"
                        >
                            <Pencil size={16} /> Edit
                        </button>
                    ) : (
                        <button
                            onClick={updateProfile}
                            className="bg-teal-600 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-1 hover:bg-teal-700 transition"
                        >
                            <Save size={16} /> {loading ? "Saving..." : "Save"}
                        </button>
                    )}
                </div>

                <div className="space-y-4">

                    <Row icon={User} label="Name">
                        {editing ? (
                            <input
                                className={input}
                                value={profile.name}
                                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                            />
                        ) : profile.name}
                    </Row>

                    <Row icon={Mail} label="Email">
                        {profile.email}
                    </Row>

                    <Row icon={Phone} label="Phone">
                        {editing ? (
                            <input
                                className={input}
                                value={profile.phone}
                                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                            />
                        ) : profile.phone}
                    </Row>

                    <Row icon={User} label="Gender">
                        {editing ? (
                            <select
                                className={input}
                                value={profile.gender}
                                onChange={(e) => setProfile({ ...profile, gender: e.target.value })}
                            >
                                <option>MALE</option>
                                <option>FEMALE</option>
                                <option>OTHER</option>
                            </select>
                        ) : profile.gender}
                    </Row>

                    <Row icon={Calendar} label="DOB">
                        {editing ? (
                            <input
                                type="date"
                                className={input}
                                value={profile.dob?.split("T")[0]}
                                onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
                            />
                        ) : new Date(profile.dob).toLocaleDateString()}
                    </Row>

                    <Row icon={MapPin} label="Address">
                        {editing ? (
                            <textarea
                                rows={2}
                                className={input}
                                value={profile.address}
                                onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                            />
                        ) : profile.address}
                    </Row>
                </div>

            </div>

            <h2 className="text-4xl text-teal-800 font-bold mb-5 flex items-center gap-2">
                <Calendar className="text-teal-600" size={20} />
                My Appointments
            </h2>
            {/* APPOINTMENTS */}
            <div className="bg-white rounded-2xl shadow-2xl p-6">


                {appointments.length === 0 ? (
                    <p className="text-gray-500 text-sm">
                        No appointments yet
                    </p>
                ) : (
                    <div className="space-y-4">

                        {appointments.map((a) => {
                            const date = new Date(a.bookingTime).toLocaleString();

                            return (
                                <div
                                    key={a.id}
                                    className="flex justify-between items-center p-4  rounded-xl hover:shadow-sm transition"
                                >

                                    {/* LEFT */}
                                    <div>
                                        <p className="font-semibold text-xl">
                                            Dr. {a.doctor.name}
                                        </p>
                                        <p className="text-sm text-gray-500 mt-1">
                                            {date}
                                        </p>
                                    </div>

                                    {/* RIGHT */}
                                    <div className="flex flex-col items-end gap-2">

                                        <span className={`text-xs px-3 py-1 rounded-full font-medium ${statusColor(a.status)}`}>
                                            {a.status}
                                        </span>

                                        {a.status === "PENDING" && (
                                            <button
                                                onClick={() => cancelAppointment(a.id)}
                                                className="text-red-500 text-xs font-medium hover:underline"
                                            >
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
    );
}

/* ROW */
function Row({ icon: Icon, label, children }) {
    return (
        <div className="flex items-start gap-3">

            {/* ICON */}
            <div className="mt-1 text-teal-600">
                <Icon size={18} />
            </div>

            {/* TEXT */}
            <div className="flex-1">
                <p className="text-lg font-semibold text-gray-500">
                    {label}
                </p>
                <div className="text-gray-800 text-xl font-bold">
                    {children}
                </div>
            </div>
        </div>
    );
}