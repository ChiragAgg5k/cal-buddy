import { Event } from "@/lib/types";
import { parseDate } from "@/lib/utils";
import { useCallback, useEffect, useState } from "react";

export const useEvents = (addDefaultEvents = true) => {
  const defaultEvents: Event[] = addDefaultEvents
    ? [
        {
          id: "1",
          title: "Office Meeting",
          date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 12)
            .toISOString()
            .split("T")[0],
          time: "10:00",
          description: "Discuss project progress and next steps.",
          color: "#03A9F4",
        },
        {
          id: "2",
          title: "Doctor Appointment",
          date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2)
            .toISOString()
            .split("T")[0],
          time: "10:00",
          description: "Get a checkup",
          color: "#FF9800",
        },
        {
          id: "3",
          title: "Coffee with John",
          date: new Date(Date.now()).toISOString().split("T")[0],
          time: "10:00",
          description: "Talk about the future of the company",
          color: "#4CAF50",
        },
        {
          id: "4",
          title: "Hangout with friends",
          date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 10)
            .toISOString()
            .split("T")[0],
          time: "10:00",
          description: "Go to the park and hangout with friends",
          color: "#FF5722",
        },
      ]
    : [];

  const [events, setEvents] = useState<Event[]>(defaultEvents);

  useEffect(() => {
    const storedEvents = localStorage.getItem("events");
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    }
  }, []);

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

  const updateEvent = useCallback((updatedEvent: Event) => {
    setEvents((currentEvents) => {
      const updatedEvents = currentEvents.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event,
      );
      localStorage.setItem("events", JSON.stringify(updatedEvents));
      return updatedEvents;
    });
  }, []);

  return { events, addEvent, deleteEvent, setEvents, updateEvent };
};
