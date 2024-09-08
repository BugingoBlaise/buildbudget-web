import { Routes, Route } from "react-router-dom";
import { DashboardLayout } from "../layout";
import { HomeDashboard } from "../pages/dashboard/HomeDashboard";
import LoginPage from "../pages/Authentication/LoginPage";
import { HomePage } from "../pages/home";
import RegisterPage from "../pages/Authentication/RegisterPage";
import { UsersDashboard } from "../pages/users/UsersDashboard";
import { ReportsDashboard } from "../pages/reports/ReportsDashboard";
import { AccountApprovalDashboard } from "../pages/AccountApproval/AccountApprovalDashboard";
import { BuildingRegulationsDasboard } from "../pages/regulations/BuildingRegulationsDasboard";
import NotFound from "../pages/NotFound";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<HomeDashboard />} />
        <Route path="/approvals" element={<AccountApprovalDashboard />} />
        <Route path="/users" element={<UsersDashboard />} />
        <Route path="/regulations" element={<BuildingRegulationsDasboard />} />
        <Route path="/reports" element={<ReportsDashboard />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
