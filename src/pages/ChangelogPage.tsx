import { changelog } from "../data/changelog";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { Card } from "../components/ui/Card";

export function ChangelogPage() {
  useDocumentTitle("Changelog");

  return (
    <div className="marketing-page">
      <section className="hero compact">
        <p className="eyebrow">Changelog</p>
        <h1>What shipped in public</h1>
      </section>
      <div className="stack">
        {changelog.map((entry) => (
          <Card key={entry.version}>
            <p className="eyebrow">
              v{entry.version} · {entry.date}
            </p>
            <h2>{entry.title}</h2>
            <ul>
              {entry.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </div>
  );
}
