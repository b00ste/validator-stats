import luck from "../assets/luck.png";

export const Luck = ({
  tileStyle,
  titleStyle,
}: {
  tileStyle: string;
  titleStyle: string;
}) => {
  return (
    <div className={tileStyle}>
      <img src={luck} className="w-10 h-10" alt="luck" />
      <div>
        <p className={titleStyle}>Luck</p>
      </div>
    </div>
  );
};
