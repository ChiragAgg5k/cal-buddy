"use client";

import RecentActivity from "@/components/dashboard/recent-activity";
import TasksComponent from "@/components/dashboard/tasks";
import SmartCalendar from "@/components/smart-calendar";

import { Card, CardContent } from "@/components/ui/card";
import { useCopilotAction, useCopilotReadable } from "@copilotkit/react-core";
import { useEffect, useState } from "react";

interface Task {
  id: string;
  title: string;
  priority: "low" | "medium" | "high";
  completed: boolean;
}

interface Activity {
  id: string;
  type: "comment" | "meeting" | "message";
  content: string;
  user: string;
  timestamp: Date;
}

const defaultTasks: Task[] = [
  {
    id: "1",
    title: "Prepare presentation",
    priority: "high",
    completed: false,
  },
  {
    id: "2",
    title: "Review project proposal",
    priority: "medium",
    completed: false,
  },
  {
    id: "3",
    title: "Schedule team meeting",
    priority: "low",
    completed: false,
  },
];

const defaultActivities: Activity[] = [
  {
    id: "1",
    type: "comment",
    content: "John Doe commented on your task",
    user: "JD",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  {
    id: "2",
    type: "meeting",
    content: "New meeting scheduled: Project Review",
    user: "System",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
  },
  {
    id: "3",
    type: "message",
    content: "You have a new message from Sarah",
    user: "Sarah",
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  },
];

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    const storedActivities = localStorage.getItem("activities");

    if (storedTasks) setTasks(JSON.parse(storedTasks));
    else setTasks(defaultTasks);

    if (storedActivities) setActivities(JSON.parse(storedActivities));
    else setActivities(defaultActivities);
  }, []);

  const [newTask, setNewTask] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState<
    "low" | "medium" | "high"
  >("medium");
  const [taskFilter, setTaskFilter] = useState<"all" | "active" | "completed">(
    "all",
  );

  const addTask = (task: string, priority?: "low" | "medium" | "high") => {
    let taskToAdd;

    if (task.trim() !== "") {
      taskToAdd = {
        id: Date.now().toString(),
        title: task,
        priority: priority ?? newTaskPriority,
        completed: false,
      };
    } else {
      taskToAdd = {
        id: Date.now().toString(),
        title: newTask,
        priority: priority ?? newTaskPriority,
        completed: false,
      };
    }

    if (taskToAdd.title.trim() !== "") {
      const updatedTasks = [...tasks, taskToAdd];
      setTasks(updatedTasks);
      setNewTask("");

      localStorage.setItem("tasks", JSON.stringify(updatedTasks));

      const activity: Activity = {
        id: Date.now().toString(),
        type: "comment",
        content: `You created a new ${newTaskPriority} priority task: ${newTask}`,
        user: "You",
        timestamp: new Date(),
      };

      setActivities([activity, ...activities]);
      localStorage.setItem(
        "activities",
        JSON.stringify([activity, ...activities]),
      );
    }
  };

  const toggleTaskCompletion = (id: string) => {
    const completeTask = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task,
    );
    setTasks(completeTask);

    localStorage.setItem("tasks", JSON.stringify(completeTask));

    const task = tasks.find((t) => t.id === id);
    if (task) {
      const activity: Activity = {
        id: Date.now().toString(),
        type: "comment",
        content: `You ${task.completed ? "uncompleted" : "completed"} the task: ${task.title}`,
        user: "You",
        timestamp: new Date(),
      };

      setActivities([activity, ...activities]);
      localStorage.setItem(
        "activities",
        JSON.stringify([activity, ...activities]),
      );
    }
  };

  const deleteTask = (id: string) => {
    const task = tasks.find((t) => t.id === id);
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);

    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    if (task) {
      const activity: Activity = {
        id: Date.now().toString(),
        type: "comment",
        content: `You deleted the task: ${task.title}`,
        user: "You",
        timestamp: new Date(),
      };

      setActivities([activity, ...activities]);
      localStorage.setItem(
        "activities",
        JSON.stringify([activity, ...activities]),
      );
    }
  };

  const clearRecentActivity = () => {
    setActivities([]);
    const activity: Activity = {
      id: Date.now().toString(),
      type: "comment",
      content: "You cleared the recent activity list",
      user: "You",
      timestamp: new Date(),
    };

    setActivities([activity]);
    localStorage.setItem("activities", JSON.stringify([activity]));
  };

  const filteredTasks = tasks.filter((task) => {
    if (taskFilter === "all") return true;
    if (taskFilter === "completed") return task.completed;
    if (taskFilter === "active") return !task.completed;
    return true;
  });

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useCopilotReadable({
    description: "The state of the todo list",
    value: JSON.stringify(tasks),
  });

  useCopilotAction({
    name: "addTask",
    description: "Adds a task to the todo list",
    parameters: [
      {
        name: "title",
        type: "string",
        description: "The title of the task",
        required: true,
      },
      {
        name: "priority",
        type: "string",
        description: "The priority of the task",
        enum: Object.values(newTaskPriority),
        defaultValue: "medium",
        required: false,
      },
    ],
    handler: ({ title }) => {
      addTask(title);
    },
  });

  useCopilotAction({
    name: "deleteTask",
    description: "Deletes a task from the todo list",
    parameters: [
      {
        name: "id",
        type: "string",
        description: "The id of the task",
        required: true,
      },
    ],
    handler: ({ id }) => {
      deleteTask(id);
    },
  });

  useCopilotAction({
    name: "showTasks",
    description: "Shows tasks for the user based on the filter",
    parameters: [
      {
        name: "filter",
        type: "string",
        description:
          "The filter to apply to the tasks. Options are 'all', 'active', and 'completed' (required)",
        required: true,
      },
      {
        name: "task",
        type: "string",
        description: "The task to show (optional)",
        required: false,
      },
    ],
    handler: ({ filter }) => {
      if (!filter) {
        throw new Error("Filter is required for showing tasks.");
      }
      if (filter === "all") {
        return JSON.stringify(tasks);
      } else if (filter === "active") {
        return JSON.stringify(tasks.filter((t) => !t.completed));
      } else if (filter === "completed") {
        return JSON.stringify(tasks.filter((t) => t.completed));
      } else {
        throw new Error(`Invalid filter: ${filter}`);
      }
    },
    render: ({ status, args }) => (
      <div className="flex justify-center items-center text-sm">
        {status !== "complete" && <p>Showing tasks for {args.filter}...</p>}
        {status === "complete" && (
          <div className="flex gap-2">
            <span>✅</span>
            <span className="font-semibold">
              Tasks for {args.filter}: {args.task}
            </span>
          </div>
        )}
      </div>
    ),
  });

  return (
    <div className="flex min-h-screen bg-muted/50">
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="mx-auto space-y-6">
          <div className="grid md:grid-cols-5 gap-6 mt-16">
            <TasksComponent
              newTask={newTask}
              addTask={addTask}
              newTaskPriority={newTaskPriority}
              setNewTask={setNewTask}
              setNewTaskPriority={setNewTaskPriority}
              taskFilter={taskFilter}
              setTaskFilter={setTaskFilter}
              filteredTasks={filteredTasks}
              toggleTaskCompletion={toggleTaskCompletion}
              deleteTask={deleteTask}
            />

            <Card className="col-span-3 w-full">
              <CardContent className="flex flex-col items-center py-4 justify-center w-full">
                <div className="w-full">
                  <SmartCalendar addDefaultEvents={false} />
                </div>
              </CardContent>
            </Card>
          </div>

          <RecentActivity
            clearRecentActivity={clearRecentActivity}
            activities={activities}
            isClient={isClient}
          />
        </div>
      </main>
    </div>
  );
}
