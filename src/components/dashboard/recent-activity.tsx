import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar as CalendarIcon, MessageSquare, User } from "lucide-react";
import { useCallback } from "react";
import { RefreshIcon } from "../icons/refresh";

interface Activity {
  id: string;
  type: string;
  user: string;
  content: string;
  timestamp: Date;
}

interface RecentActivityProps {
  clearRecentActivity: () => void;
  activities: Activity[];
  isClient: boolean;
}

export default function RecentActivity({
  clearRecentActivity,
  activities,
  isClient,
}: RecentActivityProps) {
  const deduplicateActivities = useCallback((newActivities: Activity[]) => {
    const uniqueActivities: Activity[] = [];
    const activitySignatures = new Set<string>();

    for (const activity of newActivities) {
      const signature = `${activity.type}-${activity.content}-${activity.user}`;

      if (!activitySignatures.has(signature)) {
        if (uniqueActivities.length >= 5) {
          uniqueActivities.shift();
        }

        uniqueActivities.push(activity);
        activitySignatures.add(signature);
      }
    }

    return uniqueActivities;
  }, []);

  const displayActivities = deduplicateActivities(activities);

  return (
    <Card className="dark:border-none">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle>Recent Activity</CardTitle>
        <Button variant="outline" size="sm" onClick={clearRecentActivity}>
          <RefreshIcon />
        </Button>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {displayActivities.map((activity) => (
            <li key={activity.id} className="flex items-center space-x-3">
              <span
                className={`w-9 h-9 rounded-full flex items-center justify-center text-background ${
                  activity.type === "comment"
                    ? "bg-primary"
                    : activity.type === "meeting"
                      ? "bg-green-500"
                      : "bg-blue-500"
                }`}
              >
                {activity.type === "comment" ? (
                  <User className="h-5 w-5" />
                ) : activity.type === "meeting" ? (
                  <CalendarIcon className="h-5 w-5" />
                ) : (
                  <MessageSquare className="h-5 w-5" />
                )}
              </span>
              <div>
                <p className="text-sm">{activity.content}</p>
                <p className="text-sm text-muted-foreground">
                  {isClient
                    ? `${new Date(activity.timestamp).toLocaleDateString("en-US", { dateStyle: "long" })} at ${new Date(activity.timestamp).toLocaleTimeString("en-US", { timeStyle: "short" })}`
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
