import { PageHeader } from "../components/layout/PageHeader";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Select } from "../components/ui/Select";
import { Toggle } from "../components/ui/Toggle";
import { DENSITIES } from "../types/density";
import { THEMES } from "../types/theme";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { useToast } from "../hooks/useToast";
import { useWorkspace } from "../hooks/useWorkspace";
import { downloadJson } from "../lib/download";
import type { Density } from "../types/density";
import type { Theme } from "../types/theme";

export function SettingsPage() {
  const { settings, updateSettings, resetWorkspace, projects, tasks, notes, activity } = useWorkspace();
  const { pushToast } = useToast();
  useDocumentTitle("Settings");

  return (
    <div className="stack-lg">
      <PageHeader
        eyebrow="Settings"
        title="Workspace preferences"
        description="Theme, density, and a portable JSON snapshot."
      />
      <Card className="form-grid">
        <Input
          id="display-name"
          label="Display name"
          value={settings.displayName}
          onChange={(event) => updateSettings({ displayName: event.target.value })}
        />
        <Input
          id="tagline"
          label="Tagline"
          value={settings.tagline}
          onChange={(event) => updateSettings({ tagline: event.target.value })}
        />
        <Select
          id="theme"
          label="Theme"
          value={settings.theme}
          onChange={(event) => updateSettings({ theme: event.target.value as Theme })}
          options={THEMES.map((value) => ({ value, label: value }))}
        />
        <Select
          id="density"
          label="Density"
          value={settings.density}
          onChange={(event) => updateSettings({ density: event.target.value as Density })}
          options={DENSITIES.map((value) => ({ value, label: value }))}
        />
        <Toggle
          label="Show activity on overview"
          checked={settings.showActivity}
          onChange={(checked) => updateSettings({ showActivity: checked })}
        />
      </Card>
      <div className="row-actions">
        <Button
          onClick={() => {
            downloadJson("base-app-workspace.json", { settings, projects, tasks, notes, activity });
            pushToast("Export downloaded", "success");
          }}
        >
          Export JSON
        </Button>
        <Button
          variant="danger"
          onClick={() => {
            resetWorkspace();
            pushToast("Workspace reset", "warn");
          }}
        >
          Reset workspace
        </Button>
      </div>
    </div>
  );
}
