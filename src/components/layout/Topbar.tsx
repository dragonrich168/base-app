import { Link } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { useWorkspace } from "../../hooks/useWorkspace";
import { Wordmark } from "../brand/Wordmark";
import { Button } from "../ui/Button";

interface TopbarProps {
  onMenu: () => void;
}

export function Topbar({ onMenu }: TopbarProps) {
  const { settings } = useWorkspace();

  return (
    <div className="topbar">
      <button type="button" className="menu-btn" onClick={onMenu} aria-label="Open navigation">
        Menu
      </button>
      <div className="topbar-brand">
        <Wordmark />
      </div>
      <div className="topbar-meta">
        <span className="quiet">{settings.displayName}</span>
        <Link to={ROUTES.home}>
          <Button variant="soft">Public site</Button>
        </Link>
      </div>
    </div>
  );
}
