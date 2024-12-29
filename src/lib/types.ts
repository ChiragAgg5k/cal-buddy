export type Event = {
  id: string;
  title: string;
  date: string;
  time?: string;
  color?: string;
  description?: string;
};

export type Task = {
  id: string;
  title: string;
  priority: "low" | "medium" | "high";
  completed: boolean;
};

export type Activity = {
  id: string;
  type: "comment" | "meeting" | "message";
  content: string;
  user: string;
  timestamp: Date;
};
