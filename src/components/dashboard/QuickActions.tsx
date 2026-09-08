import { Link } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";

export function QuickActions() {
  return (
    <Card className="quick-actions">
      <div>
        <p className="eyebrow">Next slice</p>
        <h2>Keep building in public</h2>
        <p className="lede">Add the work you are actually doing this week. The workspace stays on this device.</p>
      </div>
      <div className="row-actions">
        <Link to={ROUTES.projects}>
          <Button>New project</Button>
        </Link>
        <Link to={ROUTES.tasks}>
          <Button variant="soft">Add task</Button>
        </Link>
      </div>
    </Card>
  );
}
