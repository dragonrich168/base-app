import { appConfig } from "../config/app";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { Card } from "../components/ui/Card";

export function AboutPage() {
  useDocumentTitle("About");

  return (
    <div className="marketing-page">
      <section className="hero compact">
        <p className="eyebrow">About</p>
        <h1>{appConfig.name}</h1>
        <p className="lede">{appConfig.description}</p>
      </section>
      <Card>
        <p>
          This repository is public on purpose. The workspace is a local-first React app so anyone can clone it, run it, and
          keep building in the open.
        </p>
        <p>
          Source:{" "}
          <a href={appConfig.repoUrl} target="_blank" rel="noreferrer">
            {appConfig.repoUrl}
          </a>
        </p>
      </Card>
    </div>
  );
}
