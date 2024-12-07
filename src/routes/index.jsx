import { Routes, Route } from "react-router-dom";
import { DashboardLayout } from "../layout";
import { HomeDashboard } from "../pages/dashboard/HomeDashboard";
import LoginPage from "../pages/Authentication/LoginPage";
import { HomePage } from "../pages/home";
import RegisterPage from "../pages/Authentication/RegisterPage";
import { ReportsDashboard } from "../pages/reports/ReportsDashboard";
import { AccountsDashboard } from "../pages/Accounts/AccountsDashboard";
import NotFound from "../pages/NotFound";

import { ReviewRates } from "../pages/review/ReviewRates";
import { BuildingRegulationsDahboard } from "../pages/regulations/BuildingRegulationsDasboard";
import { FinancingPage } from "../pages/financing/FinancingPage";

import { MaterialsPage } from "../pages/materials/MaterialsPage";
import RegulationsList from "../pages/regulations/child/RegulationList";
import RegulationDetail from "../pages/regulations/child/RegulationDetail";
import ProtectedRoutes from "./outlets/ProtectedRoutes";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route element={<ProtectedRoutes />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<HomeDashboard />} />
          <Route path="/accounts" element={<AccountsDashboard />} />
          <Route
            path="/regulations"
            element={<BuildingRegulationsDahboard />}
          />
          <Route path="/reports" element={<ReportsDashboard />} />
          <Route path="/finance" element={<FinancingPage />} />
          <Route path="/materials" element={<MaterialsPage />} />
          <Route path="/contractors" element={<ReviewRates />} />
          {/* <Route path="/regList" element={<RegulationsList />} /> */}
          {/* <Route path="/reg/:id" element={<RegulationDetail />} /> */}
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
