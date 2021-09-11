import axios from "axios";
import React, { useEffect, useState } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import {
  getColorClass,
  getHighAndLowPnLAmount,
  getLossColorAndRange,
  getProfitColorAndRange
} from "../../helper/PnLCalendarHelper";
import "./index.css";
import PnLColorRange from "./PnLColorRange";

const PnLCalendar = () => {
  const [tradeData, setTradeData] = useState([]);
  const [highLowTrader, setHighLowTrader] = useState({ high: 0, low: 0 });

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        "https://api.jsonbin.io/b/613b31a19548541c29af5f98"
      );
      let highAndLowValue = null;
      const modifyData = data.map(({ date, pnl }) => {
        highAndLowValue = getHighAndLowPnLAmount(pnl);
        return {
          date: date.substring(0, 10),
          pnl: pnl,
        };
      });
      setHighLowTrader(highAndLowValue);
      setTradeData(modifyData);
    };
    fetchData();
  }, []);
  return (
    <div className="PnLCalendarContainer">
      <CalendarHeatmap
        values={tradeData}
        classForValue={(value) => getColorClass(value, highLowTrader)}
        startDate={tradeData[0]?.date}
        endDate={new Date().toISOString().split("T")[0]}
        showOutOfRangeDays={true}
        showWeekdayLabels={true}
        weekdayLabels={["s", "m", "t", "w", "t", "f", "s"]}
        tooltipDataAttrs={(value) => ({
          "data-for": "pnlItem",
          "data-tip": `${value.pnl} PnL on ${value.date}`,
          "data-iscapture": "true",
        })}
      />
      <div className="flex-s-bt">
        <PnLColorRange
          title="Profit"
          boxInfo={getProfitColorAndRange(highLowTrader)}
        />
        <PnLColorRange
          title="Profit"
          boxInfo={getLossColorAndRange(highLowTrader)}
        />
      </div>
    </div>
  );
};

export default PnLCalendar;
