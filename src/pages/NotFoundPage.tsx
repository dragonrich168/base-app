import { Link } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { Button } from "../components/ui/Button";

export function NotFoundPage() {
  useDocumentTitle("Not found");

  return (
    <div className="marketing-page">
      <section className="hero compact">
        <p className="eyebrow">404</p>
        <h1>That page is not in the workspace</h1>
        <Link to={ROUTES.home}>
          <Button>Back home</Button>
        </Link>
      </section>
    </div>
  );
}
