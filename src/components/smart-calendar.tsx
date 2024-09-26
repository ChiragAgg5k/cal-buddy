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
  description?: string;
};

export default function SmartCalendar({
  addDefaultEvents = true,
}: {
  addDefaultEvents?: boolean;
}) {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  // const [events, setEvents] = useState<Event[]>([
  //   {
  //     title: "Meeting with John",
  //     date: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
  //     description: "Discuss project progress and next steps.",
  //   }
  // ]);
  const [events, setEvents] = useState<Event[]>(addDefaultEvents ? [
    {
      id: Date.now().toString(),
      title: "Meeting with John",
      date: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
      description: "Discuss project progress and next steps.",
    },
    {
      id: Date.now().toString(),
      title: "Meeting with Sarah",
      date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 4).toISOString(),
      description: "Discuss project progress and next steps.",
    },
  ] : []);

  const handleEventClick = (clickInfo: EventClickArg) => {
    const calendarEvent = clickInfo.event.title;
    const event = events.find((e) => e.title === calendarEvent);
    setSelectedEvent(event || null);
  };

  const addEvent = (title: string, date: string, description?: string) => {
    const event: Event = {
      id: Date.now().toString(),
      title,
      date,
      description,
    };
    setEvents([...events, event]);
  };

  const deleteEvent = (id: string) => {
    const event = events.find((e) => e.id === id);
    setEvents(events.filter((e) => e.id !== id));
  };

  useCopilotReadable({
    description: "The state of the calendar events list",
    value: JSON.stringify(events),
  });

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
        description: "The date of the event",
        required: true,
      },
      {
        name: "description",
        type: "string",
        description: "The description of the event",
        required: false,
      },
    ],
    handler: ({ title, date, description }) => {
      addEvent(title, date, description);
    },
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

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventClick={handleEventClick}
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