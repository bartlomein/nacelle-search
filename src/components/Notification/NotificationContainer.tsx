import { AnimatePresence } from "framer-motion";
import { NotificationItem } from "./NotificationItem";
import { useAppSelector } from "../../store/hooks";

export const NotificationContainer = () => {
  const notifications = useAppSelector(
    (state) => state.notifications.notifications
  );

  return (
    <div className="fixed top-4 right-4 z-50 w-80">
      <AnimatePresence>
        {notifications.map((notification) => (
          <NotificationItem key={notification.id} {...notification} />
        ))}
      </AnimatePresence>
    </div>
  );
};
