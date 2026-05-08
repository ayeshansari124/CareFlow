"use client";

export default function Footer() {
  return (
    <footer className="bg-teal-700 py-4">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between text-sm text-white gap-3">

        {/* Left */}
        <p>
          © {new Date().getFullYear()} CareFlow. All rights reserved.
        </p>
      </div>
    </footer>
  );
}