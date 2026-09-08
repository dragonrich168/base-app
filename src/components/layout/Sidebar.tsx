import { NavLink } from "react-router-dom";
import { appNav } from "../../config/nav";
import { cn } from "../../lib/cn";
import { Icon } from "../icons/Icon";
import { Wordmark } from "../brand/Wordmark";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export function Sidebar({ open, onClose }: SidebarProps) {
  return (
    <>
      <div className={cn("sidebar-backdrop", open && "is-open")} onClick={onClose} />
      <aside className={cn("sidebar", open && "is-open")}>
        <div className="sidebar-brand">
          <Wordmark />
          <p>Public workspace</p>
        </div>
        <nav className="sidebar-nav">
          {appNav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => cn("nav-link", isActive && "is-active")}
              onClick={onClose}
            >
              <Icon name={item.icon} />
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}
