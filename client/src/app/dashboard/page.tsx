"use client";

import { useSelector } from "react-redux";
import Admin from "./admin/Admin";
import Librarian from "./librarian/Librarian";
import User from "./user/User";
import { RootState } from "@/src/redux/store";

export default function Dashboard() {
  const { loogedInuserData } = useSelector(
    (state: RootState) => state.auth
  );

  const role = loogedInuserData?.role;

  switch (role) {
    case "admin":
      return <Admin />;

    case "librarian":
      return <Librarian />;

    case "user":
      return <User />;

    default:
      return null;
  }
}