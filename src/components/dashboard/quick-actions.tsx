import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function QuickActions() {
  return (
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
  );
}
