import { useContext } from "react";
import { WorkspaceContext } from "../context/workspace-context";

export function useWorkspace() {
  return useContext(WorkspaceContext);
}
