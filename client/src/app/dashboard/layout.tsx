import { redirect } from "next/navigation";
import { getServerUser } from "@/src/lib/auth";
import Sidebar from "@/src/components/dashboard/Sidebar";
import Navbar from "@/src/components/dashboard/Navbar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Server-side authentication check
  const user = await getServerUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
          <Navbar></Navbar>

        <main className="flex-1 sm:p-6 p-3">
          {children}
        </main>
      </div>
    </div>
  );
}