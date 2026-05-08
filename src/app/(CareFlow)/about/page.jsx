import Image from "next/image";
import { HeartHandshake, Eye, Users, Award } from "lucide-react";

export default function AboutPage() {
  return (
    <main>
      {/*Hero Section */}
      <section className="py-10 bg-linear-to-br from-white to-teal-50">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">

          {/* Content */}
          <div>
            <p className="text-2xl text-teal-600 font-semibold uppercase tracking-wider">
              About CareFlow
            </p>
            <h1 className="mt-4 text-3xl md:text-5xl font-bold text-gray-800 leading-tight">
              Redefining Healthcare <br />
              <span className="text-teal-600">With Compassion & Innovation</span>
            </h1>
            <p className="mt-6 text-gray-600 text-base leading-relaxed">
              At CareFlow, we combine advanced medical technology
              with compassionate patient care. Our experienced doctors and
              modern infrastructure ensure reliable and high-quality treatment
              for every individual.
            </p>
          </div>
        </div>
      </section>

      {/* Hospital Story */}
      <section className=" bg-white">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
          <div className="relative w-full h-72 md:h-96 rounded-xl overflow-hidden">
            <Image
              src="/images/hospital-building.jpg"
              alt="Hospital"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Our Commitment to Care
            </h2>
            <p className="mt-4 text-gray-600 leading-relaxed text-sm md:text-base">
              CareFlow was founded with a vision to provide
              affordable, reliable, and advanced healthcare services.
              Our experienced doctors and modern infrastructure allow
              us to serve patients with excellence and integrity.
            </p>
            <p className="mt-4 text-gray-600 leading-relaxed text-sm md:text-base">
              From emergency care to specialized treatments,
              we ensure every patient receives personalized attention
              and the highest standard of medical care.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-14 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-sm shadow-gray-500">
            <div className="flex items-center gap-3 mb-3">
              <HeartHandshake className="text-teal-600 w-6 h-6" />
              <h3 className="text-xl font-semibold text-gray-800">
                Our Mission
              </h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              To provide compassionate healthcare services using
              modern technology and expert medical professionals
              while ensuring patient safety and satisfaction.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm shadow-gray-500">
            <div className="flex items-center gap-3 mb-3">
              <Eye className="text-teal-600 w-6 h-6" />
              <h3 className="text-xl font-semibold text-gray-800">
                Our Vision
              </h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              To become a trusted healthcare institution recognized
              for excellence, innovation, and patient-centered care.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-10 bg-white">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <Users className="mx-auto text-teal-600 w-7 h-7 mb-2" />
            <h4 className="text-2xl font-bold text-gray-800">50+</h4>
            <p className="text-gray-600 text-sm">Expert Doctors</p>
          </div>
          <div>
            <Award className="mx-auto text-teal-600 w-7 h-7 mb-2" />
            <h4 className="text-2xl font-bold text-gray-800">10+</h4>
            <p className="text-gray-600 text-sm">Years Experience</p>
          </div>
          <div>
            <Users className="mx-auto text-teal-600 w-7 h-7 mb-2" />
            <h4 className="text-2xl font-bold text-gray-800">25K+</h4>
            <p className="text-gray-600 text-sm">Happy Patients</p>
          </div>
          <div>
            <Award className="mx-auto text-teal-600 w-7 h-7 mb-2" />
            <h4 className="text-2xl font-bold text-gray-800">15+</h4>
            <p className="text-gray-600 text-sm">Departments</p>
          </div>
        </div>
      </section>
    </main>
  );
}