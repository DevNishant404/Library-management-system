import {
  LayoutDashboard,
  BookOpen,
  Users,
  FolderOpen,
  HandHelping,
  CreditCard,
  User,
  Settings,
  RotateCcw,
  Clock,
  BarChart3,
  UserCog,
  History,
} from "lucide-react";

export const sidebarMenus = {
  // Items available to everyone
  common: [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
 
  ],


  // Admin-specific items
  admin: [
    {
      name: "Manage Books",
      href: "/dashboard/admin/manage-books",
      icon: BookOpen,
    },
    {
      name: "Manage Categories",
      href: "/dashboard/admin/manage-categories",
      icon: FolderOpen,
    },
    {
      name: "Manage Users",
      href: "/dashboard/admin/manage-users",
      icon: Users,
    },

    {
      name: "Issued Books",
      href: "/dashboard/admin/issued-books",
      icon: BookOpen,
    },
    {
      name: "Overdue Books",
      href: "/dashboard/admin/overdue-books",
      icon: Clock,
    },
    {
      name: "Fines",
      href: "/dashboard/admin/fines",
      icon: CreditCard,
    },
    {
      name: "Reports",
      href: "/dashboard/reports",
      icon: BarChart3,
    },
    {
      name: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
    },
  ],

  // Librarian-specific items
  librarian: [
    {
      name: "Books",
      href: "/dashboard/books",
      icon: BookOpen,
    },
    {
      name: "Issue Book",
      href: "/dashboard/issue-book",
      icon: HandHelping,
    },
    {
      name: "Return Book",
      href: "/dashboard/return-book",
      icon: RotateCcw,
    },
    {
      name: "Members",
      href: "/dashboard/members",
      icon: Users,
    },
    {
      name: "Overdue Books",
      href: "/dashboard/overdue-books",
      icon: Clock,
    },
    {
      name: "Fines",
      href: "/dashboard/fines",
      icon: CreditCard,
    },
  ],

  // User-specific items
  user: [
    {
      name: "Browse Books",
      href: "/dashboard/user/all-books",
      icon: BookOpen,
    },
    {
      name: "My Borrowed Books",
      href: "/dashboard/user/al",
      icon: BookOpen,
    },
    {
      name: "Borrow History",
      href: "/dashboard/borrow-history",
      icon: History,
    },
    {
      name: "My Fines",
      href: "/dashboard/my-fines",
      icon: CreditCard,
    },
    {
      name: "Profile",
      href: "/dashboard/profile",
      icon: User,
    },
  ],
};