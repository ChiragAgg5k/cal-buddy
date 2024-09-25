"use client";

import { ChatInterfaceComponent } from "@/components/chat-interface";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserButton } from "@clerk/nextjs";
import { useCopilotAction, useCopilotReadable } from "@copilotkit/react-core";
import { CopilotPopup } from "@copilotkit/react-ui";
import "@copilotkit/react-ui/styles.css";
import {
  Calendar as CalendarIcon,
  MessageSquare,
  Plus,
  RefreshCw,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

enum TaskStatus {
  Active = "active",
  Completed = "completed",
}

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

export default function Dashboard() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([
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
  ]);
  const [activities, setActivities] = useState<Activity[]>([
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
  ]);
  const [newTask, setNewTask] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState<
    "low" | "medium" | "high"
  >("medium");
  const [taskFilter, setTaskFilter] = useState("all");

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
      setTasks([...tasks, taskToAdd]);
      setNewTask("");

      // Add a new activity for task creation
      const activity: Activity = {
        id: Date.now().toString(),
        type: "comment",
        content: `You created a new ${newTaskPriority} priority task: ${newTask}`,
        user: "You",
        timestamp: new Date(),
      };
      setActivities([activity, ...activities]);
    }
  };

  const toggleTaskCompletion = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );

    // Add a new activity for task completion
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
    }
  };

  const deleteTask = (id: string) => {
    const task = tasks.find((t) => t.id === id);
    setTasks(tasks.filter((task) => task.id !== id));

    // Add a new activity for task deletion
    if (task) {
      const activity: Activity = {
        id: Date.now().toString(),
        type: "comment",
        content: `You deleted the task: ${task.title}`,
        user: "You",
        timestamp: new Date(),
      };
      setActivities([activity, ...activities]);
    }
  };

  const clearRecentActivity = () => {
    setActivities([]);
    // Add a new activity to show that the list was cleared
    const activity: Activity = {
      id: Date.now().toString(),
      type: "comment",
      content: "You cleared the recent activity list",
      user: "You",
      timestamp: new Date(),
    };
    setActivities([activity]);
  };

  const filteredTasks = tasks.filter((task) => {
    if (taskFilter === "all") return true;
    if (taskFilter === "completed") return task.completed;
    if (taskFilter === "active") return !task.completed;
    return true;
  });

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Sets to true once the component mounts on the client
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
    name: "setTaskStatus",
    description: "Sets the status of a task",
    parameters: [
      {
        name: "id",
        type: "number",
        description: "The id of the task",
        required: true,
      },
      {
        name: "status",
        type: "string",
        description: "The status of the task",
        enum: Object.values(TaskStatus),
        required: true,
      },
    ],
    handler: ({ id, status }) => {
      // setTaskStatus(id, status);
    },
  });

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 p-4 hidden md:block">
        <Link href={"/"} className="flex items-center mb-6">
          <CalendarIcon className="h-6 w-6 text-primary mr-2" />
          <span className="text-2xl font-bold">Cal Buddy</span>
        </Link>
        <nav className="space-y-2">
          <Link
            href="#"
            className="flex items-center space-x-2 p-2 rounded-lg bg-gray-100 dark:bg-gray-700"
          >
            <CalendarIcon className="h-5 w-5" />
            <span>Dashboard</span>
          </Link>
          {/* <Link href="#" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                        <Clock className="h-5 w-5" />
                        <span>Schedule</span>
                    </Link> */}
          {/* <Button
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={() => setIsChatOpen(true)}
                    >
                        <MessageSquare className="h-5 w-5 mr-2" />
                        <span>Chat</span>
                    </Button> */}
          {/* <Link href="#" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                        <Settings className="h-5 w-5" />
                        <span>Settings</span>
                    </Link> */}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <header className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <div className="flex items-center space-x-4">
              {/* <Button variant="outline" onClick={() => setIsChatOpen(true)}>
                                <MessageSquare className="h-4 w-4 mr-2" />
                                Chat with Cal Buddy
                            </Button> */}
              <UserButton userProfileMode="modal" />
            </div>
          </header>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="flex space-x-4">
              {/* <Button>Schedule Meeting</Button>
                            <Button variant="outline">Create Task</Button>
                            <Button variant="outline">View Calendar</Button> */}
              <p className="text-center text-gray-500 dark:text-gray-400 text-sm">
                Coming soon...
              </p>
            </CardContent>
          </Card>

          {/* Calendar and Tasks */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Calendar */}
            <Card>
              <CardHeader>
                <CardTitle>Calendar</CardTitle>
                <CardDescription>Your upcoming events</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col mt-4 items-center justify-center">
                <Calendar mode="single" className="rounded-md border" />
              </CardContent>
            </Card>

            {/* Tasks */}
            <Card>
              <CardHeader>
                <CardTitle>Tasks</CardTitle>
                <CardDescription>Your to-do list</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      addTask(newTask, newTaskPriority);
                    }}
                    className="flex space-x-2"
                  >
                    <Input
                      placeholder="Add a new task..."
                      value={newTask}
                      onChange={(e) => setNewTask(e.target.value)}
                      className="flex-grow"
                    />
                    <Select
                      value={newTaskPriority}
                      onValueChange={(value: "low" | "medium" | "high") =>
                        setNewTaskPriority(value)
                      }
                    >
                      <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="Priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button type="submit">
                      <Plus className="h-4 w-4 mr-2" />
                      Add
                    </Button>
                  </form>
                  <div className="flex justify-between items-center">
                    <Select value={taskFilter} onValueChange={setTaskFilter}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter tasks" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Tasks</SelectItem>
                        <SelectItem value="active">Active Tasks</SelectItem>
                        <SelectItem value="completed">
                          Completed Tasks
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <ul className="space-y-2">
                    {filteredTasks.map((task) => (
                      <li
                        key={task.id}
                        className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-lg"
                      >
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            checked={task.completed}
                            onCheckedChange={() =>
                              toggleTaskCompletion(task.id)
                            }
                          />
                          <span
                            className={
                              task.completed ? "line-through text-gray-500" : ""
                            }
                          >
                            {task.title}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge
                            variant={
                              task.priority === "high"
                                ? "destructive"
                                : task.priority === "medium"
                                  ? "default"
                                  : "secondary"
                            }
                          >
                            {task.priority}
                          </Badge>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteTask(task.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
            <CopilotPopup
              labels={{
                title: "Cal Buddy 🗓️",
                initial:
                  "Hello! I'm your Cal Buddy assistant. How can I help you today?",
              }}
            />
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle>Recent Activity</CardTitle>
              <Button variant="outline" size="sm" onClick={clearRecentActivity}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Clear Activity
              </Button>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {activities.map((activity) => (
                  <li key={activity.id} className="flex items-center space-x-4">
                    <span
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${
                        activity.type === "comment"
                          ? "bg-primary"
                          : activity.type === "meeting"
                            ? "bg-green-500"
                            : "bg-blue-500"
                      }`}
                    >
                      {activity.type === "comment" ? (
                        activity.user.substring(0, 2).toUpperCase()
                      ) : activity.type === "meeting" ? (
                        <CalendarIcon className="h-5 w-5" />
                      ) : (
                        <MessageSquare className="h-5 w-5" />
                      )}
                    </span>
                    <div>
                      <p className="font-medium">{activity.content}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {isClient
                          ? activity.timestamp.toLocaleString("en-US")
                          : "Loading..."}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Chat Interface */}
      {isChatOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <ChatInterfaceComponent onClose={() => setIsChatOpen(false)} />
        </div>
      )}
    </div>
  );
}
