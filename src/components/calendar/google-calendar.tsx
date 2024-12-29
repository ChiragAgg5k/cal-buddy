import { Button } from "@/components/ui/button";
import Image from "next/image";

interface GoogleCalendarToggleProps {
  showGoogleCalendarEvents: boolean;
  onToggle: () => void;
}

export const GoogleCalendarToggle = ({
  showGoogleCalendarEvents,
  onToggle,
}: GoogleCalendarToggleProps) => {
  return (
    <div className="flex justify-end items-center mt-4">
      <Button variant="outline" onClick={onToggle}>
        <Image
          src="/google-calendar.png"
          alt="Google Calendar"
          width={16}
          className="mr-2"
          height={16}
        />
        {showGoogleCalendarEvents
          ? "Hide Google Calendar Events"
          : "Show Google Calendar Events"}
      </Button>
    </div>
  );
};
