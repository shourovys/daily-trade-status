import React from "react";

const PnLColorRange = ({ title, boxInfo }) => {
  return (
    <div className="PnLColorRangeContainer flex">
      <span>Less {title}</span>
      <ul className="flex colorBoxContainer">
        {boxInfo.map((box) => (
          <li
            data-for="pnlItem"
            data-tip={`From ${box.range.from}, To ${box.range.to}`}
            data-iscapture={true}
            style={{ backgroundColor: box.color }}
            className="colorBox"
          ></li>
        ))}
      </ul>
      <span>More {title}</span>
    </div>
  );
};

export default PnLColorRange;
