import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Plus, Trash2 } from "lucide-react";

interface TasksComponentProps {
  newTask: string;
  addTask: (task: string, priority: "low" | "medium" | "high") => void;
  newTaskPriority: "low" | "medium" | "high";
  setNewTask: (task: string) => void;
  setNewTaskPriority: (priority: "low" | "medium" | "high") => void;
  taskFilter: "all" | "active" | "completed";
  setTaskFilter: (filter: "all" | "active" | "completed") => void;
  filteredTasks: {
    id: string;
    title: string;
    priority: "low" | "medium" | "high";
    completed: boolean;
  }[];
  toggleTaskCompletion: (id: string) => void;
  deleteTask: (id: string) => void;
}

export default function TasksComponent({
  newTask,
  addTask,
  newTaskPriority,
  setNewTask,
  setNewTaskPriority,
  taskFilter,
  setTaskFilter,
  filteredTasks,
  toggleTaskCompletion,
  deleteTask,
}: TasksComponentProps) {
  return (
    <Card className="col-span-2">
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
                <SelectItem value="completed">Completed Tasks</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <ul className="space-y-2">
            {filteredTasks.length === 0 ? (
              <div className="flex items-center justify-center text-gray-500 mt-12 text-sm">
                No tasks found
              </div>
            ) : (
              filteredTasks.map((task) => (
                <li
                  key={task.id}
                  className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-lg"
                >
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={task.completed}
                      onCheckedChange={() => toggleTaskCompletion(task.id)}
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
              ))
            )}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
