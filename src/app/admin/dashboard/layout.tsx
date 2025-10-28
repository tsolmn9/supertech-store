"use client"; // админ хэсэг ихэвчлэн client components агуулдаг

import { ClerkProvider } from "@clerk/nextjs";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="bg-gray-50 min-h-screen">
          <main className="p-6">{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
