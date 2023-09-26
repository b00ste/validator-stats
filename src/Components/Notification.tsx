const Notification = ({
  notificationDescription,
  opacity,
}: {
  notificationDescription: string;
  opacity: string;
}) => {
  return (
    <div className={`transition-opacity duration-200 ${opacity}`}>
      <div className="absolute top-0 left-0 w-full h-full rounded-lg bg-misty-rose blur-sm opacity-90"></div>
      <div className="absolute top-0 left-0 z-10 w-full h-full grid justify-center content-center">
        <p className="px-8 py-4 bg-lavender-pink rounded-lg">
          {notificationDescription}
        </p>
      </div>
    </div>
  );
};

export default Notification;
