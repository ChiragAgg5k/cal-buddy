import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Event } from "@/lib/types";
import { formatDate } from "@/lib/utils";

interface EventDialogProps {
  event: Event | null;
  onClose: () => void;
}

export const EventDialog = ({ event, onClose }: EventDialogProps) => {
  return (
    <Dialog open={!!event} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{event?.title}</DialogTitle>
        </DialogHeader>
        <div>
          <p>
            <strong>Date:</strong>{" "}
            {event?.time ? (
              formatDate(new Date(event.date))
            ) : (
              <p>No date available.</p>
            )}
          </p>
          <p>
            <strong>Description:</strong>{" "}
            {event?.description || "No description available."}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
