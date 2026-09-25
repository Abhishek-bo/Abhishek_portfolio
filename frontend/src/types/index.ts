export type AppId =
  | "this-pc"
  | "ai"
  | "projects"
  | "resume"
  | "notepad"
  | "recycle-bin";

export interface AppDefinition {
  id: AppId;
  title: string;
  icon: string;
}

export interface WindowState {
  id: AppId;
  title: string;
  icon: string;

  x: number;
  y: number;

  width: number;
  height: number;

  minimized: boolean;
  maximized: boolean;
}