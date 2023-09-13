import performance from "../assets/performance.png";

export const Performance = ({
  tileStyle,
  titleStyle,
}: {
  tileStyle: string;
  titleStyle: string;
}) => {
  return (
    <div className={tileStyle}>
      <img src={performance} className="w-10 h-10" alt="performance" />
      <div>
        <p className={titleStyle}>Performance</p>
      </div>
    </div>
  );
};
