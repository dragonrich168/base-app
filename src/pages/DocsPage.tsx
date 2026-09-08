import { useMemo, useState } from "react";
import { docs } from "../data/docs";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { Card } from "../components/ui/Card";
import { Tabs } from "../components/ui/Tabs";

export function DocsPage() {
  const [slug, setSlug] = useState(docs[0].slug);
  const page = useMemo(() => docs.find((item) => item.slug === slug) ?? docs[0], [slug]);
  useDocumentTitle(page.title);

  return (
    <div className="marketing-page">
      <section className="hero compact">
        <p className="eyebrow">Docs</p>
        <h1>How the workspace fits together</h1>
        <p className="lede">Short pages, no account, no backend.</p>
      </section>
      <Tabs tabs={docs.map((item) => ({ id: item.slug, label: item.title }))} value={slug} onChange={setSlug} />
      <Card className="doc-card">
        <h2>{page.title}</h2>
        <p className="lede">{page.summary}</p>
        {page.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </Card>
    </div>
  );
}
