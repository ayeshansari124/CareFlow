"use client";

import { useEffect, useState, use } from "react";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";
import { Phone, Clock, User, IndianRupee } from "lucide-react";

export default function DoctorDetailPage({ params }) {
    const { id } = use(params);
    const { user } = useAuth();

    const [doctor, setDoctor] = useState(null);
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");

    const fetchDoctor = async () => {
        const res = await fetch(`/api/doctors/${id}`);
        const data = await res.json();
        setDoctor(data.doctor);
    };

    useEffect(() => {
        fetchDoctor();
    }, [id]);

    const bookAppointment = async () => {
        if (!date || !time) {
            return toast.error("Select date and time");
        }

        const bookingTime = new Date(`${date}T${time}`);

        const res = await fetch("/api/appointments", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                doctorId: doctor.id,
                bookingTime
            })
        });

        const data = await res.json();

        if (!res.ok) toast.error(data.message);
        else {
            toast.success("Appointment booked");
            setDate("");
            setTime("");
        }
    };

    if (!doctor) return null;

    return (
        <div className="bg-gray-50 min-h-screen py-6 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto grid gap-10 lg:grid-cols-2 lg:gap-16">

                <div className="space-y-6 sm:space-y-8">

                    {/* IMAGE */}
                    <div className="relative">
                        <img
                            src={doctor.profileImage || "/doctor-placeholder.png"}
                            className="w-full aspect-4/5 object-cover rounded-2xl sm:rounded-3xl shadow-lg"
                        />
                        <div
                            className={`absolute bottom-3 right-3 px-3 py-1.5 text-xs sm:text-sm rounded-full font-semibold shadow ${doctor.available
                                    ? "bg-green-500 text-white"
                                    : "bg-red-500 text-white"
                                }`}
                        >
                            {doctor.available ? "Available" : "Unavailable"}
                        </div>
                    </div>

                    {/* BASIC INFO */}
                    <div>
                        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                            Dr. {doctor.name}
                        </h1>
                        <p className="text-base sm:text-lg text-gray-600 mt-1">
                            {doctor.degree}
                        </p>
                        <p className="text-base sm:text-lg text-teal-600 font-semibold mt-1">
                            {doctor.specialization}
                        </p>
                    </div>

                    {/* DETAILS */}
                    <div className="space-y-4 text-sm sm:text-base">

                        <div className="flex gap-3">
                            <Phone className="text-teal-600 w-5 h-5 mt-1" />
                            <div>
                                <p className="text-gray-500">Phone</p>
                                <p className="font-semibold">{doctor.phone}</p>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <Clock className="text-teal-600 w-5 h-5 mt-1" />
                            <div>
                                <p className="text-gray-500">Experience</p>
                                <p className="font-semibold">
                                    {doctor.experience} years
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <IndianRupee className="text-teal-600 w-5 h-5 mt-1" />
                            <div>
                                <p className="text-gray-500">Consultation Fee</p>
                                <p className="font-semibold">₹{doctor.fees}</p>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <User className="text-teal-600 w-5 h-5 mt-1" />
                            <div>
                                <p className="text-gray-500">Gender</p>
                                <p className="font-semibold capitalize">
                                    {doctor.gender}
                                </p>
                            </div>
                        </div>

                    </div>

                    {/* ABOUT */}
                    {doctor.about && (
                        <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                            {doctor.about}
                        </p>
                    )}
                </div>

                <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg p-5 sm:p-6 lg:p-8 h-fit lg:sticky lg:top-16">

                    <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-5">
                        Book Appointment
                    </h2>

                    {!user && (
                        <button className="w-full py-3 bg-gray-900 text-white rounded-xl text-sm sm:text-base hover:bg-black transition">
                            Login to Continue
                        </button>
                    )}

                    {user && !doctor.available && (
                        <p className="text-red-500 text-sm sm:text-base font-medium">
                            Doctor is currently unavailable
                        </p>
                    )}

                    {user && doctor.available && (
                        <div className="space-y-4">

                            <div>
                                <label className="text-xs sm:text-sm text-gray-600">
                                    Select Date
                                </label>
                                <input
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    className="mt-1 w-full px-3 py-2 sm:px-4 sm:py-3 rounded-xl bg-gray-100 focus:ring-2 focus:ring-teal-500 text-sm"
                                />
                            </div>

                            <div>
                                <label className="text-xs sm:text-sm text-gray-600">
                                    Select Time
                                </label>
                                <input
                                    type="time"
                                    value={time}
                                    onChange={(e) => setTime(e.target.value)}
                                    className="mt-1 w-full px-3 py-2 sm:px-4 sm:py-3 rounded-xl bg-gray-100 focus:ring-2 focus:ring-teal-500 text-sm"
                                />
                            </div>

                            <button
                                onClick={bookAppointment}
                                className="w-full py-3 bg-teal-600 text-white rounded-xl text-sm sm:text-base font-semibold hover:bg-teal-700 transition active:scale-[0.98]"
                            >
                                Confirm Appointment
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}