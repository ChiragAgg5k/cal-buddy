import dayGridPlugin from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";

export default function SmartCalendar() {
  return <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" />;
}
