import { ToastStack } from "./components/ui/ToastStack";
import { ToastProvider } from "./context/ToastProvider";
import { WorkspaceProvider } from "./context/WorkspaceProvider";
import { useWorkspace } from "./hooks/useWorkspace";
import { AppRoutes } from "./routes";

function DensityRoot() {
  const { settings } = useWorkspace();
  return (
    <div className={`density-${settings.density}`}>
      <AppRoutes />
      <ToastStack />
    </div>
  );
}

export function App() {
  return (
    <ToastProvider>
      <WorkspaceProvider>
        <DensityRoot />
      </WorkspaceProvider>
    </ToastProvider>
  );
}
