const { createContext, useState, useEffect } = require("react");

const NotificationContext = createContext({
  notification: null, //{title,message,status}
  showNotification: function (notificationData) {},
  hideNotification: function () {},
});

export function NotificationContextProvider(props) {
  const [activeNotification, setActiveNotification] = useState();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (
        activeNotification &&
        (activeNotification.status === "success" ||
          activeNotification.status === "error")
      ) {
        setActiveNotification(null);
      }
    }, 2500);
    return () => {
      clearTimeout(timer);
    };
  }, [activeNotification]);

  function showNotificationHandler(notificationData) {
    setActiveNotification(notificationData);
  }

  function hideNotificationHandler() {
    setActiveNotification(null);
  }

  const context = {
    notification: activeNotification,
    showNotification: showNotificationHandler,
    hideNotification: hideNotificationHandler,
  };
  return (
    <NotificationContext.Provider value={context}>
      {props.children}
    </NotificationContext.Provider>
  );
}

export default NotificationContext;
