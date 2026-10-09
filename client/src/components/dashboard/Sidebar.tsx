"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { sidebarMenus } from "@/src/utils/sidebardata";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/src/redux/store";
import { toast } from "react-toastify";
import { logout } from "@/src/redux/authReducer/authSlice";

const Sidebar = () => {
    const router=useRouter()
    const dispatch=useDispatch<AppDispatch>()
  const pathname = usePathname();

  const { loogedInuserData } = useSelector(
    (state: RootState) => state.auth
  );

  const user = {
    role: loogedInuserData?.role,
  };

  const menu = [
    ...sidebarMenus.common,
    ...(sidebarMenus[user?.role as keyof typeof sidebarMenus] ?? []),
  ];

  function handleLogout(){

    dispatch(logout()).unwrap().then((res)=>{
        toast.success(res?.data?.message)
        router.replace("/login");
    }).catch((er)=>{
        toast.error(er.error.message)
    })

  }

  return (
    <aside className="flex h-screen w-72 flex-col border-r border-r-gray-300 bg-white">
      {/* Logo */}
      <Link href={"/"}> <div className="border-b border-b-gray-300 px-8 py-3">
        <h1 className="text-3xl font-bold text-[#5B2501]">
          📚 BookNest
        </h1>
      </div></Link>
     

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto p-4">
        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-widest text-gray-400">
          Navigation
        </p>

        <nav className="space-y-2">
          {menu.map((item) => {
            const Icon = item.icon;

            const active =
              pathname === item.href ||
              pathname.startsWith(item.href + "/");

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                  active
                    ? "bg-[#9F5C23] text-white shadow-md"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Icon size={20} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Logout */}
      <div className="border-t border-t-gray-300 p-4">
        <button onClick={handleLogout} className="flex cursor-pointer w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-600 transition hover:bg-red-50">
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;