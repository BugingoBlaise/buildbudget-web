import { RxDashboard } from "react-icons/rx";
import {
  MdAttachMoney,
  MdAssignment,
  MdManageAccounts,
  MdSupervisorAccount,
  MdRateReview,
} from "react-icons/md";
import { FaMoneyCheckDollar, FaTrowelBricks } from "react-icons/fa6";

import { IoIosSettings } from "react-icons/io";
import { TbReportAnalytics } from "react-icons/tb";

export const sideBarLinks = {
  ADMIN: [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: RxDashboard,
    },
    {
      name: "Accounts Dashboard",
      path: "/accounts",
      icon: MdSupervisorAccount,
    },
    {
      name: "Building Regulations",
      path: "/regulations",
      icon: MdAssignment,
    },
    {
      name: "Contractors",
      path: "/contractors",
      icon: MdRateReview,
    },
    {
      name: "Reports",
      path: "/reports",
      icon: TbReportAnalytics,
    },
    {
      name: "Financing Options",
      path: "/finance",
      icon: FaMoneyCheckDollar,
    },
  ],
  SUPPLIER: [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: RxDashboard,
    },
    {
      name: "Materials",
      path: "/materials",
      icon: FaTrowelBricks,
    },
    {
      name: "Financing Options",
      path: "/finance",
      icon: FaMoneyCheckDollar,
    },
    {
      name: "Contractors",
      path: "/contractors",
      icon: MdRateReview,
    },
  ],
  CONTRACTOR: [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: RxDashboard,
    },
    {
      name: "Building Regulations",
      path: "/regulations",
      icon: MdAssignment,
    },
    {
      name: "Materials",
      path: "/materials",
      icon: FaTrowelBricks,
    },
    {
      name: "Financing Options",
      path: "/finance",
      icon: FaMoneyCheckDollar,
    },
  ],
  CITIZEN: [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: RxDashboard,
    },
    {
      name: "Building Regulations",
      path: "/regulations",
      icon: MdAssignment,
    },
    {
      name: "Materials",
      path: "/materials",
      icon: FaTrowelBricks,
    },
    {
      name: "Financing Options",
      path: "/finance",
      icon: FaMoneyCheckDollar,
    },
  ],
};
