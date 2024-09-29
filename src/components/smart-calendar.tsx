import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useCopilotAction, useCopilotReadable } from "@copilotkit/react-core";
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
    description: "The state of the calendar events list",
    value: JSON.stringify(events),
  });

  useCopilotReadable({
    description: "The event user last selected",
    value: JSON.stringify(selectedEvent),
  });

  useCopilotReadable({
    description: "Today's date",
    value: JSON.stringify(new Date().toISOString().split('T')[0]),
  })

  useCopilotAction({
    name: "addEvent",
    description: "Adds a new event to the calendar",
    parameters: [
      {
        name: "title",
        type: "string",
        description: "The title of the event",
        required: true,
      },
      {
        name: "date",
        type: "string",
        description: "The date of the event. Format should be YYYY-MM-DD",
        required: true,
      },
      {
        name: "description",
        type: "string",
        description: "The description of the event",
        required: false,
      },
      {
        name: "color",
        type: "string",
        description: "The color of the event",
        required: false,
      }
    ],
    handler: ({ title, date, description = "No description provided.", color }) => {
      addEvent(title, date, description, color);
    },
    render: ({ status, args }) => (
      <div className="flex justify-center items-center text-sm">
        {status !== "complete" && <p>Adding event...</p>}
        {status === "complete" && (
          <div className="flex gap-2">
            <span>✅</span>
            <span className="font-semibold">Calendar event {args.title} added!</span>
          </div>
        )}
      </div>
    ),
  });

  useCopilotAction({
    name: "deleteEvent",
    description: "Deletes an event from the calendar",
    parameters: [
      {
        name: "id",
        type: "string",
        description: "The id of the event",
        required: true,
      },
    ],
    handler: ({ id }) => {
      deleteEvent(id);
    },
  });

  useCopilotAction({
    name: "clearEvents",
    description: "Clears all events from the calendar",
    handler: () => {
      setEvents([]);
    },
  })

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
            <DialogTitle>{selectedEvent?.title}</DialogTitle>
          </DialogHeader>
          <div>
            <p><strong>Date:</strong> {selectedEvent?.date}</p>
            <p><strong>Description:</strong> {selectedEvent?.description || 'No description available.'}</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}