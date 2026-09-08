import { useCallback, useMemo, type ReactNode } from "react";
import { STORAGE_KEYS } from "../constants/storage-keys";
import { defaultSettings } from "../config/defaults";
import { seedActivity } from "../data/seed-activity";
import { seedNotes } from "../data/seed-notes";
import { seedProjects } from "../data/seed-projects";
import { seedTasks } from "../data/seed-tasks";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useThemeClass } from "../hooks/useThemeClass";
import { appendActivity } from "../lib/activity-log";
import { createId } from "../lib/id";
import { nowIso } from "../lib/now";
import type { Note } from "../types/note";
import type { Project } from "../types/project";
import type { AppSettings } from "../types/settings";
import type { Task } from "../types/task";
import { WorkspaceContext } from "./workspace-context";

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useLocalStorage(STORAGE_KEYS.projects, seedProjects);
  const [tasks, setTasks] = useLocalStorage(STORAGE_KEYS.tasks, seedTasks);
  const [notes, setNotes] = useLocalStorage(STORAGE_KEYS.notes, seedNotes);
  const [activity, setActivity] = useLocalStorage(STORAGE_KEYS.activity, seedActivity);
  const [settings, setSettings] = useLocalStorage(STORAGE_KEYS.settings, defaultSettings);

  useThemeClass(settings.theme);

  const addProject = useCallback((input: Omit<Project, "id" | "createdAt" | "updatedAt">) => {
    const stamp = nowIso();
    const project: Project = { ...input, id: createId("proj"), createdAt: stamp, updatedAt: stamp };
    setProjects((current) => [project, ...current]);
    setActivity((current) => appendActivity(current, "project", `Created project ${project.name}.`));
  }, [setActivity, setProjects]);

  const updateProject = useCallback((id: string, patch: Partial<Project>) => {
    setProjects((current) =>
      current.map((project) => (project.id === id ? { ...project, ...patch, updatedAt: nowIso() } : project)),
    );
    setActivity((current) => appendActivity(current, "project", "Updated a project."));
  }, [setActivity, setProjects]);

  const removeProject = useCallback((id: string) => {
    setProjects((current) => current.filter((project) => project.id !== id));
    setTasks((current) => current.map((task) => (task.projectId === id ? { ...task, projectId: null } : task)));
    setActivity((current) => appendActivity(current, "project", "Removed a project."));
  }, [setActivity, setProjects, setTasks]);

  const addTask = useCallback((input: Omit<Task, "id" | "createdAt" | "updatedAt">) => {
    const stamp = nowIso();
    const task: Task = { ...input, id: createId("task"), createdAt: stamp, updatedAt: stamp };
    setTasks((current) => [task, ...current]);
    setActivity((current) => appendActivity(current, "task", `Added task ${task.title}.`));
  }, [setActivity, setTasks]);

  const updateTask = useCallback((id: string, patch: Partial<Task>) => {
    setTasks((current) => current.map((task) => (task.id === id ? { ...task, ...patch, updatedAt: nowIso() } : task)));
    setActivity((current) => appendActivity(current, "task", "Updated a task."));
  }, [setActivity, setTasks]);

  const removeTask = useCallback((id: string) => {
    setTasks((current) => current.filter((task) => task.id !== id));
    setActivity((current) => appendActivity(current, "task", "Removed a task."));
  }, [setActivity, setTasks]);

  const addNote = useCallback((input: Omit<Note, "id" | "createdAt" | "updatedAt">) => {
    const stamp = nowIso();
    const note: Note = { ...input, id: createId("note"), createdAt: stamp, updatedAt: stamp };
    setNotes((current) => [note, ...current]);
    setActivity((current) => appendActivity(current, "note", `Added note ${note.title}.`));
  }, [setActivity, setNotes]);

  const updateNote = useCallback((id: string, patch: Partial<Note>) => {
    setNotes((current) => current.map((note) => (note.id === id ? { ...note, ...patch, updatedAt: nowIso() } : note)));
    setActivity((current) => appendActivity(current, "note", "Updated a note."));
  }, [setActivity, setNotes]);

  const removeNote = useCallback((id: string) => {
    setNotes((current) => current.filter((note) => note.id !== id));
    setActivity((current) => appendActivity(current, "note", "Removed a note."));
  }, [setActivity, setNotes]);

  const updateSettings = useCallback((patch: Partial<AppSettings>) => {
    setSettings((current) => ({ ...current, ...patch }));
  }, [setSettings]);

  const resetWorkspace = useCallback(() => {
    setProjects(seedProjects);
    setTasks(seedTasks);
    setNotes(seedNotes);
    setActivity(seedActivity);
    setSettings(defaultSettings);
  }, [setActivity, setNotes, setProjects, setSettings, setTasks]);

  const value = useMemo(
    () => ({
      projects,
      tasks,
      notes,
      activity,
      settings,
      addProject,
      updateProject,
      removeProject,
      addTask,
      updateTask,
      removeTask,
      addNote,
      updateNote,
      removeNote,
      updateSettings,
      resetWorkspace,
    }),
    [
      activity,
      addNote,
      addProject,
      addTask,
      notes,
      projects,
      removeNote,
      removeProject,
      removeTask,
      resetWorkspace,
      settings,
      tasks,
      updateNote,
      updateProject,
      updateSettings,
      updateTask,
    ],
  );

  return <WorkspaceContext.Provider value={value}>{children}</WorkspaceContext.Provider>;
}
