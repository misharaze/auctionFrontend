import "./UpgradeResult.scss";

const UpgradeResult = ({ result }) => {
  return (
    <div className={`upgrade-result ${result}`}>
      {result === "success"
        ? "Апгрейд успешен 🎉"
        : "Апгрейд не удался 💥"}
    </div>
  );
};

export default UpgradeResult;
