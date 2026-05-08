"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Ambulance,
  Stethoscope,
  Microscope,
  Pill,
  HeartPulse,
  CalendarCheck,
  ShieldCheck,
  Users,
  Clock,
  Award,
} from "lucide-react";

export default function Home() {

  // HERO SLIDER
  const slides = [
    {
      image: "/images/slide1.jpg",
      title: "Advanced Medical Care",
      description:
        "State-of-the-art facilities and expert doctors at your service.",
    },
    {
      image: "/images/slide2.jpg",
      title: "Book Appointments Easily",
      description: "Schedule consultations with trusted professionals instantly.",
    },
    {
      image: "/images/slide3.jpg",
      title: "24/7 Emergency Services",
      description: "Always ready to provide urgent and critical care support.",
    },
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const facilities = [
    {
      icon: Ambulance,
      title: "Emergency Care",
      description: "24/7 rapid emergency response services.",
    },
    {
      icon: Stethoscope,
      title: "Expert Doctors",
      description: "Highly qualified and experienced professionals.",
    },
    {
      icon: Microscope,
      title: "Laboratory Services",
      description: "Advanced diagnostic and pathology testing.",
    },
    {
      icon: Pill,
      title: "In-House Pharmacy",
      description: "Complete medicine support within hospital.",
    },
    {
      icon: HeartPulse,
      title: "ICU & Critical Care",
      description: "Fully equipped intensive care units.",
    },
    {
      icon: CalendarCheck,
      title: "Online Appointments",
      description: "Quick and easy appointment booking system.",
    },
  ];

  const features = [
    {
      icon: ShieldCheck,
      title: "Trusted & Certified",
      description: "Accredited hospital with certified medical professionals.",
    },
    {
      icon: Users,
      title: "Experienced Staff",
      description: "Highly trained doctors and support staff ensuring quality care.",
    },
    {
      icon: Clock,
      title: "24/7 Availability",
      description: "Round-the-clock emergency and patient care services.",
    },
    {
      icon: Award,
      title: "Modern Technology",
      description: "Advanced medical equipment and digital healthcare systems.",
    },
  ];

  return (
    <main>

      {/* HERO */}
      <section className="relative w-full h-[60vh] overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === current ? "opacity-100" : "opacity-0"
              }`}
          >
            <Image
              src={slide.image}
              alt="hospital"
              fill
              className="object-cover"
              priority
            />

            <div className="absolute inset-0 bg-black/50" />

            <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 text-white">
              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                {slide.title}
              </h1>
              <p className="max-w-2xl text-sm md:text-lg">
                {slide.description}
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* FACILITIES */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4">

          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800">
              Our Medical Facilities
            </h2>
            <p className="mt-3 text-gray-600">
              Advanced healthcare services with modern technology and expertise.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {facilities.map((f, i) => {
              const Icon = f.icon;

              return (
                <div
                  key={i}
                  className="flex items-start gap-4 p-5 bg-gray-50 rounded-xl hover:shadow-md transition"
                >
                  <div className="bg-teal-100 p-3 rounded-lg">
                    <Icon className="w-5 h-5 text-teal-600" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {f.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {f.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-14 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">

          <div>
            <h2 className="text-3xl font-bold text-gray-800">
              Why Choose CareFlow
            </h2>

            <p className="mt-4 text-gray-600 leading-relaxed">
              We prioritize patient safety, advanced treatment methods,
              and compassionate care with modern technology and expert staff.
            </p>

            <button className="mt-6 px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition">
              Contact Us
            </button>
          </div>

          <div className="space-y-6">
            {features.map((f, i) => {
              const Icon = f.icon;

              return (
                <div key={i} className="flex items-start gap-4">
                  <div className="bg-teal-100 p-3 rounded-lg">
                    <Icon className="w-5 h-5 text-teal-600" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {f.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {f.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}