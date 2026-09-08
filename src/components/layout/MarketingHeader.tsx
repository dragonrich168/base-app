import { Link, NavLink } from "react-router-dom";
import { marketingNav } from "../../config/nav";
import { ROUTES } from "../../constants/routes";
import { cn } from "../../lib/cn";
import { Wordmark } from "../brand/Wordmark";
import { Button } from "../ui/Button";

export function MarketingHeader() {
  return (
    <header className="marketing-header">
      <Link to={ROUTES.home} className="brand-link">
        <Wordmark />
      </Link>
      <nav className="marketing-nav">
        {marketingNav.map((item) => (
          <NavLink key={item.to} to={item.to} end={item.end} className={({ isActive }) => cn("text-link", isActive && "is-active")}>
            {item.label}
          </NavLink>
        ))}
      </nav>
      <Link to={ROUTES.app}>
        <Button>Open workspace</Button>
      </Link>
    </header>
  );
}
