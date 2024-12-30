import { useCopilotFeatures } from "@/hooks/useCopilotFeatures";
import { useEvents } from "@/hooks/useEvents";
import { Event } from "@/lib/types";
import { EventClickArg, EventDropArg } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import googleCalendarPlugin from "@fullcalendar/google-calendar";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import { useMemo, useState } from "react";
import { useUser } from "../context/auth-provider";
import { EventDialog } from "./event-dialog";
import { GoogleCalendarToggle } from "./google-calendar";

export default function SmartCalendar({
  addDefaultEvents = true,
  addGoogleCalendarEvents = true,
}: {
  addDefaultEvents?: boolean;
  addGoogleCalendarEvents?: boolean;
}) {
  const user = useUser();
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showGoogleCalendarEvents, setShowGoogleCalendarEvents] =
    useState(false);
  const { events, addEvent, deleteEvent } = useEvents(addDefaultEvents);

  useCopilotFeatures({ events, selectedEvent, addEvent, deleteEvent });

  const eventSources = useMemo(
    () => [
      {
        events: events.map((e) => ({
          id: e.id,
          title: e.title,
          start: e.date,
          description: e.description,
          color: e.color,
        })),
        editable: true,
      },
      {
        googleCalendarId: showGoogleCalendarEvents
          ? user?.current?.userId
          : undefined,
      },
    ],
    [events, showGoogleCalendarEvents, user],
  );

  const handleEventClick = (clickInfo: EventClickArg) => {
    const event = events.find((e) => e.id === clickInfo.event.id);
    setSelectedEvent(event || null);
  };

  const handleEventDrop = (dropInfo: EventDropArg) => {
    const { event } = dropInfo;
    const existingEvent = events.find((e) => e.id === event.id);
    if (!existingEvent) return;

    const droppedDate = new Date(event.start!);
    droppedDate.setDate(droppedDate.getDate() + 1);

    const updatedEvent = {
      ...existingEvent,
      date: droppedDate.toISOString().split("T")[0],
    };
    deleteEvent(event.id);
    addEvent(
      updatedEvent.title,
      updatedEvent.date,
      updatedEvent.time || undefined,
      updatedEvent.description || undefined,
      updatedEvent.color || undefined,
    );
  };

  return (
    <div className="min-h-[500px]">
      <FullCalendar
        plugins={[dayGridPlugin, googleCalendarPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        googleCalendarApiKey={
          process.env["NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY"]
        }
        eventSources={eventSources}
        weekends={true}
        eventClick={handleEventClick}
        eventDisplay="block"
        eventClassNames="cursor-pointer"
        eventDrop={handleEventDrop}
      />

      {addGoogleCalendarEvents && (
        <GoogleCalendarToggle
          showGoogleCalendarEvents={showGoogleCalendarEvents}
          onToggle={() =>
            setShowGoogleCalendarEvents(!showGoogleCalendarEvents)
          }
        />
      )}

      <EventDialog
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />
    </div>
  );
}
