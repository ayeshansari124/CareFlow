import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/layout/Footer";
export const metadata = {
  title: "CareFlow - Hospital Management System",
  description: "Modern Hospital Booking System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen flex flex-col">
        <AuthProvider>
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: "#ffffff",
                color: "#1f2937",
                borderRadius: "12px",
                border: "1px solid #e5e7eb",
                fontWeight: 600,
              },
            }}
          />
          <main className="grow">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
