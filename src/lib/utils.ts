import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const parseDate = (
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
