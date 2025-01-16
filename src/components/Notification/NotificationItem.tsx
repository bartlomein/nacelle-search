import { useEffect } from "react";
import { useAppDispatch } from "../../store/hooks";
import { removeNotification } from "../../store/notificationSlice";
import { motion } from "framer-motion";

export const NotificationItem = ({
  id,
  message,
  type,
}: {
  id: string;
  message: string;
  type: "success" | "error" | "info";
}) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(removeNotification(id));
    }, 3000);

    return () => clearTimeout(timer);
  }, [id, dispatch]);

  const getBackgroundColor = () => {
    switch (type) {
      case "success":
        return "bg-green-500";
      case "error":
        return "bg-red-500";
      case "info":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.3 }}
      className={`${getBackgroundColor()} text-white p-4 rounded-md shadow-lg mb-2 flex justify-between items-center`}
    >
      <span>{message}</span>
      <button
        onClick={() => dispatch(removeNotification(id))}
        className="ml-4 text-white hover:text-gray-200 focus:outline-none"
      >
        ×
      </button>
    </motion.div>
  );
};
