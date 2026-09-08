import { Link } from "react-router-dom";
import { features } from "../data/features";
import { principles } from "../data/principles";
import { ROUTES } from "../constants/routes";
import { appConfig } from "../config/app";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";

export function HomePage() {
  useDocumentTitle("Home");

  return (
    <div className="marketing-page">
      <section className="hero">
        <p className="eyebrow">Built in the open</p>
        <h1>
          A calm workspace for
          <em> public builders.</em>
        </h1>
        <p className="lede">{appConfig.description}</p>
        <div className="row-actions">
          <Link to={ROUTES.app}>
            <Button>Launch workspace</Button>
          </Link>
          <Link to={ROUTES.docs}>
            <Button variant="soft">Read the docs</Button>
          </Link>
        </div>
      </section>
      <section className="feature-grid">
        {features.map((feature) => (
          <Card key={feature.id}>
            <p className="eyebrow">{feature.id}</p>
            <h2>{feature.title}</h2>
            <p>{feature.body}</p>
          </Card>
        ))}
      </section>
      <section className="principle-list">
        {principles.map((principle) => (
          <article key={principle.title}>
            <h3>{principle.title}</h3>
            <p>{principle.body}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
