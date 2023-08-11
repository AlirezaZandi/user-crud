import "./globals.css";
import type { Metadata } from "next";
import { DashboardLayout } from "@/components/DashboardLayout";

export const metadata: Metadata = {
  title: "User Management",
  description: "Users and Roles",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <DashboardLayout>{children}</DashboardLayout>
      </body>
    </html>
  );
}
