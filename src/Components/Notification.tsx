interface Props {
  notificationHeader: string;
  notificationBody?: string;
}

const Notification: React.FC<Props> = ({
  notificationHeader,
  notificationBody,
}) => {
  return (
    <lukso-modal is-open>
      <div className="heading-inter-21-semi-bold p-6">
        <h1 className="p-4">{notificationHeader}</h1>
        {notificationBody ? <p className="p-4">{notificationBody}</p> : <></>}
      </div>
    </lukso-modal>
  );
};

export default Notification;
