import { RxDashboard } from "react-icons/rx";
import {
  MdOutlineInventory2,
  MdAssignment,
  MdManageAccounts,
  MdSupervisorAccount,
} from "react-icons/md";
import { FaTruckMoving } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import { TbReportAnalytics } from "react-icons/tb";
import { AiTwotoneBank } from "react-icons/ai";

export const sideBarLinks = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: RxDashboard,
  },
  {
    name: "Account Approvals",
    path: "/approvals",
    icon: MdManageAccounts,
  },
  {
    name: "Users",
    path: "/users",
    icon: MdSupervisorAccount,
  },
  {
    name: "Building Regulations",
    path: "/regulations",
    icon: MdAssignment,
  },
  {
    name: "Reports",
    path: "/reports",
    icon: TbReportAnalytics,
  },

  {
    name: "Settings",
    path: "/settings",
    icon: IoIosSettings,
  },
];
