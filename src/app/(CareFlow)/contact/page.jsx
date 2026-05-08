"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function ContactPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <main className="bg-gray-50">

      {/* HERO */}
      <section className="py-15 bg-linear-to-br from-teal-50 via-white to-teal-100 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 tracking-tight">
          Contact CareFlow
        </h1>
        <p className="mt-5 text-lg text-gray-600 max-w-xl mx-auto">
          We're always here to help you. Reach out anytime for assistance or inquiries.
        </p>
      </section>

      {/* MAIN SECTION */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16">

          {/*INFO CARDS */}
          <div className="space-y-6">

            {/* CARD */}
            <div className="flex items-start gap-5 p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition duration-300 border border-gray-100">
              <div className="bg-teal-100 p-3 rounded-xl">
                <MapPin className="text-teal-600 w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Address</h3>
                <p className="text-gray-600 mt-1">
                  CareFlow, Bhiwandi <br />
                  Maharashtra, India - 421302
                </p>
              </div>
            </div>

            <div className="flex items-start gap-5 p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition duration-300 border border-gray-100">
              <div className="bg-teal-100 p-3 rounded-xl">
                <Phone className="text-teal-600 w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Phone</h3>
                <p className="text-gray-600 mt-1 text-base">
                  +91 98765 43210
                </p>
              </div>
            </div>

            <div className="flex items-start gap-5 p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition duration-300 border border-gray-100">
              <div className="bg-teal-100 p-3 rounded-xl">
                <Mail className="text-teal-600 w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Email</h3>
                <p className="text-gray-600 mt-1">
                  info@careflow.com
                </p>
              </div>
            </div>

            <div className="flex items-start gap-5 p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition duration-300 border border-gray-100">
              <div className="bg-teal-100 p-3 rounded-xl">
                <Clock className="text-teal-600 w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Working Hours</h3>
                <p className="text-gray-600 mt-1">
                  Mon - Sat: 9:00 AM - 9:00 PM <br />
                  Sunday: Emergency Only
                </p>
              </div>
            </div>
          </div>

          {/* MAP + QR */}
          <div className="space-y-8">

            {/* MAP */}
            <div className="h-80 rounded-2xl overflow-hidden shadow-md border border-gray-200">
              <iframe
                src="https://www.google.com/maps?q=Al+Moin+Hospital+Bhiwandi&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
              ></iframe>
            </div>

            {/* QR CARD */}
            <div className="flex items-center gap-6 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition duration-300">
              <Image
                src="/images/map-qr.png"
                alt="QR Code"
                width={110}
                height={110}
                className="rounded-lg"
              />
              <div>
                <h4 className="text-lg font-semibold text-gray-800">
                  Scan for Directions
                </h4>
                <p className="text-gray-600 mt-1">
                  Quickly open Google Maps and navigate to our hospital.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}