import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";

import {
    Calendar as CalendarIcon,
    MessageSquare,
    RefreshCw,
} from "lucide-react"; 

interface RecentActivityProps {
  clearRecentActivity: () => void;
  activities: { id: string; type: string; user: string; content: string; timestamp: Date }[];
  isClient: boolean;
}

export default function RecentActivity({ clearRecentActivity, activities, isClient }: RecentActivityProps) {
    return (
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
    );
}