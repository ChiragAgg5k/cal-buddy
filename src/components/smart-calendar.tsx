import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useCopilotAction, useCopilotReadable } from "@copilotkit/react-core";
import { useCopilotChatSuggestions } from "@copilotkit/react-ui";
import { EventClickArg } from '@fullcalendar/core';
import dayGridPlugin from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";
import { useState } from 'react';

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
  const [events, setEvents] = useState<Event[]>(addDefaultEvents ? [
    {
      id: "1",
      title: "Office Meeting",
      date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14).toISOString().split('T')[0],
      description: "Discuss project progress and next steps.",
      color: "#03A9F4",
    },
    {
      id: "2",
      title: "Meeting with John",
      date: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString().split('T')[0],
      description: "Discuss project progress and next steps.",
      color: "#009688",
    },
    {
      id: "3",
      title: "Pick-up",
      date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 4).toISOString().split('T')[0],
      description: "Discuss project progress and next steps.",
      color: "#3F51B5",
    },
  ] : []);

  const handleEventClick = (clickInfo: EventClickArg) => {
    const event = events.find((e) => e.id === clickInfo.event.id);
    setSelectedEvent(event || null);
  };

  const addEvent = (title: string, date: string, description?: string, color?: string) => {
    const newEvent: Event = {
      id: Date.now().toString(),
      title,
      date: new Date(date).toISOString().split('T')[0],
      description,
      color,
    };
    setEvents(prevEvents => [...prevEvents, newEvent]);
  };

  const deleteEvent = (id: string) => {
    setEvents(prevEvents => prevEvents.filter((e) => e.id !== id));
  };

  useCopilotReadable({
    description: "Current calendar events",
    value: JSON.stringify(events.map(e => ({
      id: e.id,
      title: e.title,
      date: e.date,
      description: e.description || 'No description',
      color: e.color || 'Default color'
    }))),
  });

  useCopilotReadable({
    description: "Currently selected event",
    value: selectedEvent ? JSON.stringify({
      id: selectedEvent.id,
      title: selectedEvent.title,
      date: selectedEvent.date,
      description: selectedEvent.description || 'No description',
      color: selectedEvent.color || 'Default color'
    }) : "No event selected",
  });

  useCopilotReadable({
    description: "Today's date",
    value: new Date().toISOString().split('T')[0],
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
        description: "The color for the event in hexadecimal format, e.g., '#FF0000' for red (optional, defaults to blue '#2196F3')",
      }
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
            <span className="font-semibold">Calendar event &quot;{args.title}&quot; added for {args.date}!</span>
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
        description: "The unique identifier of the event to be deleted (required)",
      },
    ],
    handler: ({ id }) => {
      if (!id) {
        throw new Error("Event ID is required for deleting an event.");
      }
      const eventToDelete = events.find(e => e.id === id);
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

  // 1. Count total number of events
  useCopilotAction({
    name: "countTotalEvents",
    description: "Count the total number of events in the calendar",
    handler: () => {
      return `There are a total of ${events.length} events in the calendar.`;
    },
    render: ({ status }) => (
      <div>
        {status !== "complete" && <p>Counting events...</p>}
        {status === "complete" && <p>Total number of events: {events.length}</p>}
      </div>
    ),
  });

  // 2. Show upcoming events for the next week
  useCopilotAction({
    name: "showUpcomingEventsForNextWeek",
    description: "Show events happening within the next 7 days",
    handler: () => {
      const today = new Date();
      const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
      const upcomingEvents = events.filter((event) => {
        const eventDate = new Date(event.date);
        return eventDate >= today && eventDate <= nextWeek;
      });
      return upcomingEvents.length
        ? JSON.stringify(upcomingEvents)
        : "No events in the upcoming week.";
    },
    render: ({ status, args }) => (
      <div>
        {status !== "complete" && <p>Fetching events...</p>}
        {status === "complete" && (
          <div>
            <p>Upcoming events in the next week:</p>
            <pre>{typeof args === 'object' ? JSON.stringify(args, null, 2) : args}</pre>
          </div>
        )}
      </div>
    ),
  });

  // 3. Highlight the busiest days in the month
  useCopilotAction({
    name: "highlightBusiestDays",
    description: "Highlight the busiest days of the month (days with most events)",
    handler: () => {
      const eventCountByDay: Record<string, number> = {};
      events.forEach(event => {
        if (eventCountByDay[event.date]) {
          eventCountByDay[event.date]++;
        } else {
          eventCountByDay[event.date] = 1;
        }
      });
      const busiestDays = Object.keys(eventCountByDay).sort((a, b) => eventCountByDay[b] - eventCountByDay[a]).slice(0, 3);
      return busiestDays.length
        ? `Busiest days: ${busiestDays.join(', ')}`
        : "No busy days found.";
    },
    render: ({ status, args }) => (
      <div>
        {status !== "complete" && <p>Finding busiest days...</p>}
        <pre>{typeof args === 'object' ? JSON.stringify(args, null, 2) : args}</pre>
      </div>
    ),
  });

  // Chat suggestions for Copilot
  useCopilotChatSuggestions({
    instructions: `Suggest actions for the calendar. You can -
    1. Show today's events.
    2. Show upcoming events for the next week.
    3. Count total number of events.
    4. Clear all events.
    5. Highlight the busiest days of the month.`,
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
      <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Event Details</DialogTitle>
          </DialogHeader>
          {selectedEvent && (
            <div>
              <p><strong>Title:</strong> {selectedEvent.title}</p>
              <p><strong>Date:</strong> {selectedEvent.date}</p>
              {selectedEvent.description && <p><strong>Description:</strong> {selectedEvent.description}</p>}
              {selectedEvent.color && (
                <div>
                  <strong>Color:</strong> <span style={{ color: selectedEvent.color }}>{selectedEvent.color}</span>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
