import Link from "next/link";
import Image from "next/image";
import { HeartHandshake, Eye, Users, Award, ArrowRight } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="bg-white">
      {/* HERO */}
      <section className="py-10 md:py-14 bg-linear-to-br from-white via-teal-50 to-white">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-teal-600 font-bold uppercase tracking-[0.25em]">
              About CareFlow
            </p>

            <h1 className="mt-6 text-5xl lg:text-6xl font-extrabold leading-tight text-slate-900">
              Redefining Healthcare
              <br />
              <span className="text-teal-600">
                With Compassion & Innovation
              </span>
            </h1>

            <p className="mt-8 mb-8 text-lg text-slate-600 leading-relaxed max-w-xl">
              At CareFlow, we combine advanced medical technology with
              compassionate patient care. Our experienced doctors and modern
              infrastructure ensure reliable, accessible, and high-quality
              treatment for every individual.
            </p>

            <Link
              href="/about"
              className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-xl font-semibold transition"
            >
              Learn More
            </Link>

            <Link
              href="/contact"
              className="border border-gray-300 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition"
            >
              Contact Us
            </Link>
          </div>

          <div>
            <div className="relative h-[500px] rounded-[32px] overflow-hidden shadow-2xl">
              <Image
                src="/images/hospital-building.jpg"
                alt="CareFlow Hospital"
                fill
                className="object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* TRUST SECTION */}
      <section className="py-10">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-slate-900">
            Trusted Healthcare For Every Family
          </h2>

          <p className="mt-6 text-lg text-slate-600 leading-relaxed">
            We believe healthcare should be accessible, compassionate, and
            powered by innovation. Our team works tirelessly to deliver
            world-class medical services while ensuring every patient feels
            heard, respected, and cared for.
          </p>
        </div>
      </section>

      {/* STORY */}
      <section className="pb-14">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[1.1fr_0.9fr] gap-20 items-center">
          <div className="relative h-[450px] rounded-[32px] overflow-hidden shadow-xl">
            <Image
              src="/images/hospital-building.jpg"
              alt="Hospital"
              fill
              className="object-cover"
            />
          </div>

          <div>
            <p className="text-teal-600 font-bold uppercase tracking-widest">
              Our Story
            </p>

            <h2 className="mt-4 text-4xl font-bold text-slate-900">
              Our Commitment to Care
            </h2>

            <p className="mt-6 text-slate-600 leading-relaxed">
              CareFlow was founded with a vision to provide affordable,
              reliable, and advanced healthcare services to communities of all
              sizes.
            </p>

            <p className="mt-5 text-slate-600 leading-relaxed">
              Through experienced doctors, modern facilities, and patient-first
              values, we continue to raise the standard of healthcare delivery.
            </p>

            <p className="mt-5 text-slate-600 leading-relaxed">
              From emergency treatment to specialized care, every patient
              receives personalized attention and the highest level of
              professionalism.
            </p>
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="py-14 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-slate-900">
              What Drives Us
            </h2>

            <p className="mt-4 text-slate-600">
              The principles that guide our healthcare journey.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white border border-gray-100 rounded-[28px] p-8 shadow-lg hover:-translate-y-1 transition-all">
              <HeartHandshake className="w-10 h-10 text-teal-600" />

              <h3 className="mt-5 text-2xl font-bold text-slate-900">
                Our Mission
              </h3>

              <p className="mt-4 text-slate-600 leading-relaxed">
                To provide compassionate healthcare using modern technology and
                expert professionals while ensuring patient safety, dignity, and
                satisfaction.
              </p>
            </div>

            <div className="bg-white border border-gray-100 rounded-[28px] p-8 shadow-lg hover:-translate-y-1 transition-all">
              <Eye className="w-10 h-10 text-teal-600" />

              <h3 className="mt-5 text-2xl font-bold text-slate-900">
                Our Vision
              </h3>

              <p className="mt-4 text-slate-600 leading-relaxed">
                To become a trusted healthcare institution recognized for
                excellence, innovation, and patient-centered care worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-50 rounded-[28px] p-8 text-center">
              <Users className="mx-auto w-9 h-9 text-teal-600" />
              <h3 className="mt-4 text-4xl font-bold">50+</h3>
              <p className="mt-2 text-slate-500">Expert Doctors</p>
            </div>

            <div className="bg-slate-50 rounded-[28px] p-8 text-center">
              <Award className="mx-auto w-9 h-9 text-teal-600" />
              <h3 className="mt-4 text-4xl font-bold">10+</h3>
              <p className="mt-2 text-slate-500">Years Experience</p>
            </div>

            <div className="bg-slate-50 rounded-[28px] p-8 text-center">
              <Users className="mx-auto w-9 h-9 text-teal-600" />
              <h3 className="mt-4 text-4xl font-bold">25K+</h3>
              <p className="mt-2 text-slate-500">Happy Patients</p>
            </div>

            <div className="bg-slate-50 rounded-[28px] p-8 text-center">
              <Award className="mx-auto w-9 h-9 text-teal-600" />
              <h3 className="mt-4 text-4xl font-bold">15+</h3>
              <p className="mt-2 text-slate-500">Departments</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-14">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-teal-500 rounded-[36px] p-10 md:p-14 text-center text-white">
            <h2 className="text-4xl font-bold">Your Health Is Our Priority</h2>

            <p className="mt-5 text-teal-50 max-w-2xl mx-auto">
              Experience world-class healthcare services delivered with
              compassion, innovation, and excellence.
            </p>
            <Link
              href="/doctors"
              className="mt-8 inline-flex items-center gap-2 bg-white text-teal-700 px-7 py-3 rounded-xl font-semibold hover:scale-105 transition"
            >
              Book Appointment
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
