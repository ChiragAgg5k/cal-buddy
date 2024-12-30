import { useCopilotFeatures } from "@/hooks/useCopilotFeatures";
import { useEvents } from "@/hooks/useEvents";
import { Event } from "@/lib/types";
import { EventClickArg, EventDropArg } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import googleCalendarPlugin from "@fullcalendar/google-calendar";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
  const calendarRef = useRef<FullCalendar>(null);
  const user = useUser();
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showGoogleCalendarEvents, setShowGoogleCalendarEvents] =
    useState(false);
  const { events, addEvent, deleteEvent, updateEvent } =
    useEvents(addDefaultEvents);

  useCopilotFeatures({ events, selectedEvent, addEvent, deleteEvent });

  useEffect(() => {
    const calendarApi = calendarRef.current?.getApi();
    if (!calendarApi) return;

    calendarApi.removeAllEvents();

    events.forEach((e) => {
      calendarApi.addEvent({
        id: e.id,
        title: e.title,
        start: e.date,
        description: e.description,
        color: e.color,
        allDay: true,
        extendedProps: { ...e },
      });
    });
  }, [events]);

  const googleCalendarSource = useMemo(
    () => ({
      googleCalendarId: showGoogleCalendarEvents
        ? user?.current?.userId
        : undefined,
    }),
    [showGoogleCalendarEvents, user],
  );

  const handleEventClick = useCallback(
    (clickInfo: EventClickArg) => {
      const event = events.find((e) => e.id === clickInfo.event.id);
      setSelectedEvent(event || null);
    },
    [events],
  );

  const handleEventDrop = useCallback(
    (dropInfo: EventDropArg) => {
      const { event: droppedEvent } = dropInfo;

      const existingEvent = events.find((e) => e.id === droppedEvent.id);
      if (!existingEvent) return;

      const droppedDate = new Date(droppedEvent.start!);
      droppedDate.setDate(droppedDate.getDate() + 1);

      const updatedEvent = {
        ...existingEvent,
        date: droppedDate.toISOString().split("T")[0],
      };

      try {
        updateEvent(updatedEvent);

        const updatedEvents = events.map((event) =>
          event.id === updatedEvent.id ? updatedEvent : event,
        );
        localStorage.setItem("events", JSON.stringify(updatedEvents));
      } catch (error) {
        console.error("Failed to update event:", error);
        dropInfo.revert();
      }
    },
    [events, updateEvent],
  );

  return (
    <div className="min-h-[500px]">
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, googleCalendarPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        googleCalendarApiKey={
          process.env["NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY"]
        }
        events={[]}
        eventSources={[googleCalendarSource]}
        weekends={true}
        eventClick={handleEventClick}
        eventDisplay="block"
        eventClassNames="cursor-pointer"
        eventDrop={handleEventDrop}
        dragRevertDuration={0}
        eventDragMinDistance={5}
        rerenderDelay={0}
        editable={true}
        displayEventEnd={false}
        allDayMaintainDuration={false}
        nextDayThreshold="00:00:00"
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
