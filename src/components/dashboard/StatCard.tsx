import type { Stat } from "../../types/stat";
import { Card } from "../ui/Card";

export function StatCard({ stat }: { stat: Stat }) {
  return (
    <Card className={`stat-card tone-${stat.tone}`}>
      <p className="eyebrow">{stat.label}</p>
      <strong>{stat.value}</strong>
      <span className="quiet">{stat.hint}</span>
    </Card>
  );
}
