import { Navigate, Route, Routes } from "react-router-dom";
import { AppShell } from "./components/layout/AppShell";
import { MarketingShell } from "./components/layout/MarketingShell";
import { ROUTES } from "./constants/routes";
import { AboutPage } from "./pages/AboutPage";
import { ActivityPage } from "./pages/ActivityPage";
import { ChangelogPage } from "./pages/ChangelogPage";
import { DashboardPage } from "./pages/DashboardPage";
import { DocsPage } from "./pages/DocsPage";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { NotesPage } from "./pages/NotesPage";
import { ProjectsPage } from "./pages/ProjectsPage";
import { SettingsPage } from "./pages/SettingsPage";
import { TasksPage } from "./pages/TasksPage";

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<MarketingShell />}>
        <Route path={ROUTES.home} element={<HomePage />} />
        <Route path={ROUTES.docs} element={<DocsPage />} />
        <Route path={ROUTES.changelog} element={<ChangelogPage />} />
        <Route path={ROUTES.about} element={<AboutPage />} />
      </Route>
      <Route path="/app" element={<AppShell />}>
        <Route index element={<DashboardPage />} />
        <Route path="projects" element={<ProjectsPage />} />
        <Route path="tasks" element={<TasksPage />} />
        <Route path="notes" element={<NotesPage />} />
        <Route path="activity" element={<ActivityPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
      <Route path="/workspace" element={<Navigate to={ROUTES.app} replace />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
