"use client";

export default function Footer() {
  return (
    <footer className="bg-teal-700 py-4">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-center">
        <p className="text-sm text-white text-center">
          © {new Date().getFullYear()} CareFlow. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
