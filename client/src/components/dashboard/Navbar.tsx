"use client";

import { Bell, ChevronDown, LogOut, User } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/src/redux/store";

const Navbar = () => {
  const { loogedInuserData } = useSelector(
    (state: RootState) => state.auth
  );

  console.log("loogedInuserData")
  console.log(loogedInuserData)

  const firstName = loogedInuserData?.firstName ?? "";
  const lastName = loogedInuserData?.lastName ?? "";

  const fullName = `${firstName} ${lastName}`.trim();

  const initials =
    `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();

  return (
    <header className="flex  items-center justify-between border-b border-gray-200 bg-white px-8 py-1">
      {/* Left */}
      <div>
        <h2 className="text-xl font-semibold text-[#5B2501]">
          Hey {firstName ? `, ${firstName}` : ""}
        </h2>

     
      </div>

      {/* Right */}
      <div className="flex items-center gap-5">
        {/* Notifications */}
        <button
          type="button"
          className="relative rounded-full p-2 text-gray-600 transition hover:bg-gray-100"
          aria-label="Notifications"
        >
          <Bell size={21} />

          {/* Notification badge */}
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
        </button>

        {/* Divider */}
        <div className="h-8 w-px bg-gray-200" />

        {/* User */}
        <button
          type="button"
          className="flex items-center gap-3 rounded-lg px-2 py-1.5 transition hover:bg-gray-50"
        >
          {/* Avatar */}
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#9F5C23] text-sm font-semibold text-white">
            {initials || <User size={18} />}
          </div>

          {/* User details */}
          <div className="hidden text-left sm:block">
            <p className="text-sm font-semibold text-gray-800">
              {fullName || "User"}
            </p>

            
          </div>
        </button>
      </div>
    </header>
  );
};

export default Navbar;