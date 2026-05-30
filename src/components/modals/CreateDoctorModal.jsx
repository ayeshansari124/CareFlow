"use client";

import { useState, useEffect } from "react";
import { X, UploadCloud } from "lucide-react";
import toast from "react-hot-toast";

export default function CreateDoctorModal({
  isOpen,
  onClose,
  refreshDoctors,
  doctor = null,
  editMode = false
}) {

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    gender: "MALE",
    degree: "",
    specialization: "",
    experience: "",
    fees: "",
    about: "",
    phone: "",
    available: true,
  });

  useEffect(() => {
    if (doctor) {
      setForm({
        name: doctor.name || "",
        email: doctor.user?.email || "",
        gender: doctor.gender || "MALE",
        degree: doctor.degree || "",
        specialization: doctor.specialization || "",
        experience: doctor.experience || "",
        fees: doctor.fees || "",
        about: doctor.about || "",
        phone: doctor.phone || "",
        available: doctor.available ?? true,
      });
    }
  }, [doctor]);

  if (!isOpen) return null;

  const update = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData();

      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const fileInput = document.querySelector("#doctorImage");

      if (fileInput?.files[0]) {
        formData.append("image", fileInput.files[0]);
      }

      const endpoint = editMode
        ? `/api/admin/doctors/${doctor.id}`
        : "/api/admin/doctors";

      const method = editMode ? "PATCH" : "POST";

      const res = await fetch(endpoint, {
        method,
        body: formData
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      toast.success(editMode ? "Doctor updated" : "Doctor created");

      refreshDoctors?.();
      onClose();

    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const input =
    "w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition";

  const label = "block text-sm font-semibold text-gray-700 mb-1";

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-8 relative">
        <button
          onClick={onClose}
          className="absolute right-6 top-6 text-gray-500 hover:text-gray-700"
        >
          <X size={22} />
        </button>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">
            {editMode ? "Edit Doctor" : "Create Doctor"}
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            {editMode
              ? "Update doctor information"
              : "Add a new doctor to the hospital system"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10">
          {/* BASIC */}
          <div>
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-4">
              Basic Information
            </h3>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className={label}>Full Name</label>
                <input
                  className={input}
                  placeholder="Dr. John Doe"
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                />
              </div>

              <div>
                <label className={label}>Email</label>
                <input
                  className={input}
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  disabled={editMode}
                />
              </div>

              <div>
                <label className={label}>Gender</label>
                <select
                  className={input}
                  value={form.gender}
                  onChange={(e) => update("gender", e.target.value)}
                >
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>

              <div>
                <label className={label}>Phone</label>
                <input
                  className={input}
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* PROFESSIONAL */}
          <div>
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-4">
              Professional Details
            </h3>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className={label}>Degree</label>
                <input
                  className={input}
                  value={form.degree}
                  onChange={(e) => update("degree", e.target.value)}
                />
              </div>

              <div>
                <label className={label}>Specialization</label>
                <input
                  className={input}
                  value={form.specialization}
                  onChange={(e) => update("specialization", e.target.value)}
                />
              </div>

              <div>
                <label className={label}>Experience (Years)</label>
                <input
                  type="number"
                  className={input}
                  value={form.experience}
                  onChange={(e) => update("experience", e.target.value)}
                />
              </div>

              <div>
                <label className={label}>Consultation Fees</label>
                <input
                  type="number"
                  className={input}
                  value={form.fees}
                  onChange={(e) => update("fees", e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* EXTRA */}
          <div>
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-4">
              Additional Information
            </h3>

            <div className="space-y-5">
              <div>
                <label className={label}>Profile Image</label>

                <label className="flex items-center justify-center gap-2 border-2 border-dashed border-gray-300 rounded-lg py-6 cursor-pointer hover:border-blue-500 transition">
                  <UploadCloud size={18} className="text-gray-500" />

                  <span className="text-sm text-gray-500">
                    Upload doctor image
                  </span>

                  <input id="doctorImage" type="file" className="hidden" />
                </label>
              </div>

              <div>
                <label className={label}>About Doctor</label>

                <textarea
                  rows={4}
                  className={input}
                  value={form.about}
                  onChange={(e) => update("about", e.target.value)}
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  checked={form.available}
                  onChange={(e) => update("available", e.target.checked)}
                  className="h-4 w-4 text-blue-600 rounded border-gray-300"
                />

                <label className="text-sm font-medium text-gray-700">
                  Available for appointments
                </label>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
          >
            {loading
              ? editMode
                ? "Updating Doctor..."
                : "Creating Doctor..."
              : editMode
                ? "Update Doctor"
                : "Create Doctor"}
          </button>
        </form>
      </div>
    </div>
  );
}