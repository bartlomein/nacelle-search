import React from "react";
import { useAppDispatch } from "../store/hooks";
import { addNotification } from "../store/notificationSlice";
import { NotificationContainer } from "../components/Notification/NotificationContainer";

const NotificationPage = () => {
  const dispatch = useAppDispatch();

  const showNotification = (type: "success" | "error" | "info") => {
    dispatch(
      addNotification({
        message: `This is a ${type} notification!`,
        type,
      })
    );
  };

  return (
    <div className="min-h-screen p-8">
      <NotificationContainer />
      <div className="flex gap-4">
        <button
          onClick={() => showNotification("success")}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Show Success
        </button>
        <button
          onClick={() => showNotification("error")}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Show Error
        </button>
        <button
          onClick={() => showNotification("info")}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Show Info
        </button>
      </div>
    </div>
  );
};

export default NotificationPage;
