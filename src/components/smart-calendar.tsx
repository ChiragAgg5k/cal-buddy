import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCopilotAction, useCopilotReadable } from "@copilotkit/react-core";
import { useCopilotChatSuggestions } from "@copilotkit/react-ui";
import { EventClickArg, EventDropArg } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import googleCalendarPlugin from "@fullcalendar/google-calendar";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useUser } from "./context/auth-provider";
import { Button } from "./ui/button";

type Event = {
  id: string;
  title: string;
  date: string;
  time?: string;
  color?: string;
  description?: string;
};

const parseDate = (
  dateString: string,
  timeString?: string,
): { date: Date; time: string | undefined } => {
  let date = new Date(dateString);
  let time: string | undefined;

  if (!isNaN(date.getTime())) {
    if (timeString) {
      const [hours, minutes] = timeString.split(":").map(Number);
      date.setHours(hours, minutes);
      time = timeString;
    }
    return { date, time };
  }

  const parts = dateString.split("-");
  if (parts.length === 3) {
    date = new Date(
      parseInt(parts[0]),
      parseInt(parts[1]) - 1,
      parseInt(parts[2]),
    );
    if (!isNaN(date.getTime())) {
      if (timeString) {
        const [hours, minutes] = timeString.split(":").map(Number);
        date.setHours(hours, minutes);
        time = timeString;
      }
      return { date, time };
    }
  }

  return { date: new Date(), time: undefined };
};

export default function SmartCalendar({
  addDefaultEvents = true,
}: {
  addDefaultEvents?: boolean;
}) {
  const user = useUser();
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showGoogleCalendarEvents, setShowGoogleCalendarEvents] =
    useState(false);
  const [events, setEvents] = useState<Event[]>(
    addDefaultEvents
      ? [
          {
            id: "1",
            title: "Office Meeting",
            date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14)
              .toISOString()
              .split("T")[0],
            time: "10:00",
            description: "Discuss project progress and next steps.",
            color: "#03A9F4",
          },
          {
            id: "2",
            title: "Meeting with John",
            date: new Date(Date.now() + 1000 * 60 * 60 * 24)
              .toISOString()
              .split("T")[0],
            time: "14:30",
            description: "Discuss project progress and next steps.",
            color: "#009688",
          },
          {
            id: "3",
            title: "Pick-up",
            date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 4)
              .toISOString()
              .split("T")[0],
            time: "18:00",
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
    time?: string,
    description?: string,
    color?: string,
  ) => {
    const { date: parsedDate, time: parsedTime } = parseDate(date, time);
    if (isNaN(parsedDate.getTime())) {
      console.error("Invalid date format:", date);
      return;
    }

    const newEvent: Event = {
      id: Date.now().toString(),
      title,
      date: parsedDate.toISOString().split("T")[0],
      time: parsedTime,
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
    description: "Detailed overview of current calendar events",
    value: JSON.stringify(
      events.map((e) => ({
        id: e.id,
        title: e.title,
        date: e.date,
        time: e.time,
        description: e.description || "No description provided",
        color: e.color || "Default color (blue)",
        formattedDateTime: e.time
          ? `${new Date(e.date).toLocaleDateString("en-US", { dateStyle: "long" })} at ${e.time}`
          : new Date(e.date).toLocaleDateString("en-US", { dateStyle: "full" }),
      })),
    ),
  });

  useCopilotReadable({
    description: "Comprehensive details of the currently selected event",
    value: selectedEvent
      ? JSON.stringify({
          id: selectedEvent.id,
          title: selectedEvent.title,
          date: selectedEvent.date,
          time: selectedEvent.time,
          description: selectedEvent.description || "No description provided",
          color: selectedEvent.color || "Default color (blue)",
          formattedDateTime: selectedEvent.time
            ? `${new Date(selectedEvent.date).toLocaleDateString("en-US", { dateStyle: "long" })} at ${selectedEvent.time}`
            : new Date(selectedEvent.date).toLocaleDateString("en-US", {
                dateStyle: "full",
              }),
          daysUntilEvent: Math.ceil(
            (new Date(selectedEvent.date).getTime() - new Date().getTime()) /
              (1000 * 3600 * 24),
          ),
        })
      : "No event is currently selected",
  });

  useCopilotAction({
    name: "addEvent",
    description: "Add a new event to the calendar with detailed information",
    parameters: [
      {
        name: "title",
        type: "string",
        description: "The title or name of the event (required)",
        required: true,
      },
      {
        name: "date",
        type: "string",
        description: "The date of the event in YYYY-MM-DD format (required)",
        required: true,
      },
      {
        name: "time",
        type: "string",
        description: "The time of the event in HH:MM format (optional)",
      },
      {
        name: "description",
        type: "string",
        description: "A detailed description of the event (optional)",
      },
      {
        name: "color",
        type: "string",
        description:
          "The color for the event in hexadecimal format, e.g., '#FF0000' for red (optional, defaults to blue '#2196F3')",
      },
    ],
    handler: ({ title, date, time, description, color }) => {
      if (!title || !date) {
        throw new Error(
          "Both title and date are required for adding an event.",
        );
      }
      const { date: parsedDate, time: parsedTime } = parseDate(date, time);
      if (isNaN(parsedDate.getTime())) {
        throw new Error(
          `Invalid date format: ${date}. Please use YYYY-MM-DD or ISO date string.`,
        );
      }
      addEvent(
        title,
        parsedDate.toISOString().split("T")[0],
        parsedTime,
        description,
        color,
      );
      return `Event "${title}" successfully added for ${parsedDate.toLocaleDateString("en-US", { dateStyle: "full" })}${parsedTime ? ` at ${parsedTime}` : ""}`;
    },
    render: ({ status, args, result }) => (
      <div className="flex justify-center items-center text-sm">
        {status !== "complete" && <p>Adding event to calendar...</p>}
        {status === "complete" && (
          <div className="flex gap-2">
            <span>✅</span>
            <span className="font-semibold">{result}</span>
          </div>
        )}
      </div>
    ),
  });

  useCopilotReadable({
    description: "Detailed overview of current calendar events",
    value: JSON.stringify(
      events.map((e) => ({
        id: e.id,
        title: e.title,
        date: e.date,
        description: e.description || "No description provided",
        color: e.color || "Default color (blue)",
        formattedDate: new Date(e.date).toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      })),
    ),
  });

  useCopilotReadable({
    description: "Comprehensive details of the currently selected event",
    value: selectedEvent
      ? JSON.stringify({
          id: selectedEvent.id,
          title: selectedEvent.title,
          date: selectedEvent.date,
          description: selectedEvent.description || "No description provided",
          color: selectedEvent.color || "Default color (blue)",
          formattedDate: new Date(selectedEvent.date).toLocaleDateString(
            "en-US",
            {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            },
          ),
          daysUntilEvent: Math.ceil(
            (new Date(selectedEvent.date).getTime() - new Date().getTime()) /
              (1000 * 3600 * 24),
          ),
        })
      : "No event is currently selected",
  });

  useCopilotReadable({
    description: "Current date and time information",
    value: JSON.stringify({
      currentDate: new Date().toISOString().split("T")[0],
      formattedDate: new Date().toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      currentTime: new Date().toLocaleTimeString("en-US"),
      currentWeek: `Week ${Math.ceil((new Date().getDate() + new Date(new Date().getFullYear(), new Date().getMonth(), 1).getDay()) / 7)} of the year`,
    }),
  });

  useCopilotAction({
    name: "deleteEvent",
    description:
      "Remove a specific event from the calendar using its unique identifier",
    parameters: [
      {
        name: "id",
        type: "string",
        description:
          "The unique identifier of the event to be deleted (required)",
        required: true,
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
      return `Event "${eventToDelete.title}" scheduled for ${new Date(eventToDelete.date).toLocaleDateString("en-US", { dateStyle: "full" })} has been successfully removed from the calendar.`;
    },
  });

  useCopilotAction({
    name: "clearEvents",
    description:
      "Remove all events from the calendar, effectively resetting it",
    handler: () => {
      const eventCount = events.length;
      setEvents([]);
      localStorage.removeItem("events");
      return `All ${eventCount} events have been cleared from the calendar. Your schedule is now empty.`;
    },
  });

  useCopilotAction({
    name: "showEventsForPeriod",
    description:
      "Display events for a specific time period with detailed information",
    parameters: [
      {
        name: "period",
        type: "string",
        description:
          "The time period to show events for. Options are 'today', 'this week', 'next week', 'this month', and 'next month' (required)",
        required: true,
      },
    ],
    handler: ({ period }) => {
      if (!period) {
        throw new Error("Time period is required for showing events.");
      }
      const today = new Date();
      const filteredEvents = events.filter((e) => {
        const eventDate = new Date(e.date);
        switch (period) {
          case "today":
            return eventDate.toDateString() === today.toDateString();
          case "this week":
            const thisWeekStart = new Date(
              today.setDate(today.getDate() - today.getDay()),
            );
            const thisWeekEnd = new Date(
              today.setDate(today.getDate() - today.getDay() + 6),
            );
            return eventDate >= thisWeekStart && eventDate <= thisWeekEnd;
          case "next week":
            const nextWeekStart = new Date(
              today.setDate(today.getDate() - today.getDay() + 7),
            );
            const nextWeekEnd = new Date(
              today.setDate(today.getDate() - today.getDay() + 13),
            );
            return eventDate >= nextWeekStart && eventDate <= nextWeekEnd;
          case "this month":
            return (
              eventDate.getMonth() === today.getMonth() &&
              eventDate.getFullYear() === today.getFullYear()
            );
          case "next month":
            const nextMonth = new Date(
              today.getFullYear(),
              today.getMonth() + 1,
              1,
            );
            return (
              eventDate.getMonth() === nextMonth.getMonth() &&
              eventDate.getFullYear() === nextMonth.getFullYear()
            );
          default:
            throw new Error(`Invalid time period: ${period}`);
        }
      });

      return JSON.stringify(
        filteredEvents.map((e) => ({
          ...e,
          formattedDate: new Date(e.date).toLocaleDateString("en-US", {
            dateStyle: "full",
          }),
        })),
      );
    },
    render: ({ status, args, result }) => (
      <div className="flex justify-center items-center text-sm">
        {status !== "complete" && <p>Fetching events for {args.period}...</p>}
        {status === "complete" && (
          <div className="flex gap-2">
            <span>✅</span>
            <span className="font-semibold">
              Events for {args.period}:{" "}
              {(() => {
                try {
                  const parsedResult = JSON.parse(result);
                  return Array.isArray(parsedResult)
                    ? `${parsedResult.length} event(s) found`
                    : "Events retrieved successfully";
                } catch (error) {
                  console.error("Error parsing result:", error);
                  return "Events retrieved (count unavailable)";
                }
              })()}
            </span>
          </div>
        )}
      </div>
    ),
  });

  useCopilotChatSuggestions({
    instructions: `Suggest helpful actions for managing the calendar. You can:
    1. Show today's events and provide a brief summary.
    2. Display upcoming events for the next week or month.
    3. Count and categorize events (e.g., by type or color).
    4. Suggest clearing all events if the calendar looks cluttered.
    5. Recommend adding important events like holidays or birthdays.
    6. Offer to find gaps in the schedule for potential new events.
    7. Propose rescheduling conflicting events if any are detected.
    8. Suggest reviewing and updating event descriptions for clarity.

    When making suggestions, consider the current date, upcoming important dates, and the overall distribution of events in the calendar. Provide context for why each suggestion might be helpful to the user.`,
  });

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
        eventSources={[
          {
            googleCalendarId: showGoogleCalendarEvents
              ? user?.current?.email
              : undefined,
          },
        ]}
        events={{
          events: events.map((e) => ({
            id: e.id,
            title: e.title,
            start: e.date,
            description: e.description,
            color: e.color,
          })),
          editable: true,
        }}
        weekends={true}
        eventClick={handleEventClick}
        eventDisplay="block"
        eventClassNames={`cursor-pointer`}
        eventDrop={handleEventDrop}
      />
      <div className="flex justify-end items-center mt-4">
        <Button
          variant="outline"
          onClick={() => setShowGoogleCalendarEvents(!showGoogleCalendarEvents)}
        >
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
              <strong>Date:</strong>{" "}
              {selectedEvent?.time ? (
                `${new Date(selectedEvent.date).toLocaleDateString("en-US", { dateStyle: "long" })} at ${selectedEvent.time}`
              ) : selectedEvent ? (
                new Date(selectedEvent?.date).toLocaleDateString("en-US", {
                  dateStyle: "full",
                })
              ) : (
                <p>No date available.</p>
              )}
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
