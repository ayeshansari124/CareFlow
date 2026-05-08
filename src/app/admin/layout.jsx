import AdminNavbar from "@/components/layout/AdminNavbar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <AdminNavbar />
      <main className="grow">{children}</main>
    </div>
  );
}
