import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

export function AppShell() {
  const [open, setOpen] = useState(false);

  return (
    <div className="app-shell">
      <Sidebar open={open} onClose={() => setOpen(false)} />
      <div className="app-main">
        <Topbar onMenu={() => setOpen(true)} />
        <main className="app-content">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}
