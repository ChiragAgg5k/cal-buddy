"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCopilotAction, useCopilotReadable } from "@copilotkit/react-core";
import { useCopilotChatSuggestions } from "@copilotkit/react-ui";
import { EventClickArg } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";
import { useEffect, useState } from "react";

type Event = {
  id: string;
  title: string;
  date: string;
  color?: string;
  description?: string;
};

export default function SmartCalendar({
  addDefaultEvents = true,
}: {
  addDefaultEvents?: boolean;
}) {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [events, setEvents] = useState<Event[]>(
    addDefaultEvents
      ? [
          {
            id: "1",
            title: "Office Meeting",
            date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14)
              .toISOString()
              .split("T")[0],
            description: "Discuss project progress and next steps.",
            color: "#03A9F4",
          },
          {
            id: "2",
            title: "Meeting with John",
            date: new Date(Date.now() + 1000 * 60 * 60 * 24)
              .toISOString()
              .split("T")[0],
            description: "Discuss project progress and next steps.",
            color: "#009688",
          },
          {
            id: "3",
            title: "Pick-up",
            date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 4)
              .toISOString()
              .split("T")[0],
            description: "Discuss project progress and next steps.",
            color: "#3F51B5",
          },
        ]
      : [],
  );

  useEffect(() => {
    const storedEvents = localStorage.getItem("events");
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    }
  }, []);

  const handleEventClick = (clickInfo: EventClickArg) => {
    const event = events.find((e) => e.id === clickInfo.event.id);
    setSelectedEvent(event || null);
  };

  const addEvent = (
    title: string,
    date: string,
    description?: string,
    color?: string,
  ) => {
    const newEvent: Event = {
      id: Date.now().toString(),
      title,
      date: new Date(date).toISOString().split("T")[0],
      description,
      color,
    };
    setEvents((prevEvents) => {
      const updatedEvents = [...prevEvents, newEvent];
      localStorage.setItem("events", JSON.stringify(updatedEvents));
      return updatedEvents;
    });
  };

  const deleteEvent = (id: string) => {
  setEvents((prevEvents) => {
    const updatedEvents = prevEvents.filter((e) => e.id !== id);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
    return updatedEvents;
  });
  };

  useCopilotReadable({
    description: "Current calendar events",
    value: JSON.stringify(
      events.map((e) => ({
        id: e.id,
        title: e.title,
        date: e.date,
        description: e.description || "No description",
        color: e.color || "Default color",
      })),
    ),
  });

  useCopilotReadable({
    description: "Currently selected event",
    value: selectedEvent
      ? JSON.stringify({
          id: selectedEvent.id,
          title: selectedEvent.title,
          date: selectedEvent.date,
          description: selectedEvent.description || "No description",
          color: selectedEvent.color || "Default color",
        })
      : "No event selected",
  });

  useCopilotReadable({
    description: "Today's date",
    value: new Date().toISOString().split("T")[0],
  });

  useCopilotAction({
    name: "addEvent",
    description: "Add a new event to the calendar",
    parameters: [
      {
        name: "title",
        type: "string",
        description: "The title of the event (required)",
        required: true,
      },
      {
        name: "date",
        type: "string",
        description: "The date of the event in YYYY-MM-DD format (required)",
        required: true,
      },
      {
        name: "description",
        type: "string",
        description: "A description of the event (optional)",
      },
      {
        name: "color",
        type: "string",
        description:
          "The color for the event in hexadecimal format, e.g., '#FF0000' for red (optional, defaults to blue '#2196F3')",
      },
    ],
    handler: ({ title, date, description, color }) => {
      if (!title || !date) {
        throw new Error("Title and date are required for adding an event.");
      }
      addEvent(title, date, description, color);
    },
    render: ({ status, args }) => (
      <div className="flex justify-center items-center text-sm">
        {status !== "complete" && <p>Adding event...</p>}
        {status === "complete" && (
          <div className="flex gap-2">
            <span>✅</span>
            <span className="font-semibold">
              Calendar event &quot;{args.title}&quot; added for {args.date}!
            </span>
          </div>
        )}
      </div>
    ),
  });

  useCopilotAction({
    name: "deleteEvent",
    description: "Delete an event from the calendar by its ID",
    parameters: [
      {
        name: "id",
        type: "string",
        description:
          "The unique identifier of the event to be deleted (required)",
      },
    ],
    handler: ({ id }) => {
      if (!id) {
        throw new Error("Event ID is required for deleting an event.");
      }
      const eventToDelete = events.find((e) => e.id === id);
      if (!eventToDelete) {
        throw new Error(`No event found with ID: ${id}`);
      }
      deleteEvent(id);
      return `Event "${eventToDelete.title}" has been deleted.`;
    },
  });

  useCopilotAction({
    name: "clearEvents",
    description: "Remove all events from the calendar",
    handler: () => {
      setEvents([]);
      return "All events have been cleared from the calendar.";
    },
  });

  useCopilotAction({
    name: "showEventsForPeriod",
    description: "Show events for a specific time period",
    parameters: [
      {
        name: "period",
        type: "string",
        description:
          "The time period to show events for. Options are 'today', 'next week', and 'next month' (required)",
        required: true,
      },
      {
        name: "title",
        type: "string",
        description: "The title of the event to show",
        required: true,
      },
    ],
    handler: ({ period }) => {
      if (!period) {
        throw new Error("Time period is required for showing events.");
      }
      if (period === "today") {
        return JSON.stringify(
          events.filter(
            (e) =>
              new Date(e.date).toISOString().split("T")[0] ===
              new Date().toISOString().split("T")[0],
          ),
        );
      } else if (period === "next week") {
        return JSON.stringify(
          events.filter(
            (e) =>
              new Date(e.date).toISOString().split("T")[0] >=
              new Date().toISOString().split("T")[0] + 7 * 24 * 60 * 60 * 1000,
          ),
        );
      } else if (period === "next month") {
        return JSON.stringify(
          events.filter(
            (e) =>
              new Date(e.date).toISOString().split("T")[0] >=
              new Date().toISOString().split("T")[0] + 30 * 24 * 60 * 60 * 1000,
          ),
        );
      } else {
        throw new Error(`Invalid time period: ${period}`);
      }
    },
    render: ({ status, args }) => (
      <div className="flex justify-center items-center text-sm">
        {status !== "complete" && <p>Showing events for {args.period}...</p>}
        {status === "complete" && (
          <div className="flex gap-2">
            <span>✅</span>
            <span className="font-semibold">
              Events for {args.period}: {args.title}
            </span>
          </div>
        )}
      </div>
    ),
  });

  useCopilotChatSuggestions({
    instructions: `Suggest actions for the calendar. You can -
    1. Show today's events.
    2. Show upcoming events for the next wee.
    3. Count total number of events.
    4. Clear all events.
    `,
  });

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventClick={handleEventClick}
        eventDisplay="block"
      />
      <Dialog
        open={!!selectedEvent}
        onOpenChange={() => setSelectedEvent(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedEvent?.title}</DialogTitle>
          </DialogHeader>
          <div>
            <p>
              <strong>Date:</strong> {selectedEvent?.date}
            </p>
            <p>
              <strong>Description:</strong>{" "}
              {selectedEvent?.description || "No description available."}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
