import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";
import { MarketingHeader } from "./MarketingHeader";

export function MarketingShell() {
  return (
    <div className="marketing-shell">
      <MarketingHeader />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
