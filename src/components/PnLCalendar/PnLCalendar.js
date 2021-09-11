import axios from "axios";
import React, { useEffect, useState } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "./index.css";

const highLowValue = {
  high: -Infinity,
  low: Infinity,
};
const getHighAndLowPnL = (currentPnL) => {
  if (highLowValue.high <= currentPnL) {
    highLowValue.high = currentPnL;
  } else if (highLowValue.low >= currentPnL) {
    highLowValue.low = currentPnL;
  }

  return highLowValue;
};

const getPartOfNumber = (number, part) => {
  return (number / 4) * part;
};

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
        highAndLowValue = getHighAndLowPnL(pnl);
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
    <div className='PnLCalendarContainer'>
      <CalendarHeatmap
        values={tradeData}
        classForValue={(value) => {
          if (!value) {
            return "color-empty";
          } else if (value.pnl > 0) {
            if (value.pnl >= getPartOfNumber(highLowTrader.high, 3)) {
              return "color-high-4";
            } else if (value.pnl >= getPartOfNumber(highLowTrader.high, 2)) {
              return "color-high-3";
            } else if (value.pnl >= getPartOfNumber(highLowTrader.high, 1)) {
              return "color-high-2";
            } else {
              return "color-high-1";
            }
          } else if (value.pnl <= 0) {
            if (value.pnl <= getPartOfNumber(highLowTrader.low, 3)) {
              return "color-low-4";
            } else if (value.pnl >= getPartOfNumber(highLowTrader.low, 2)) {
              return "color-low-3";
            } else if (value.pnl >= getPartOfNumber(highLowTrader.low, 1)) {
              return "color-low-2";
            } else {
              return "color-low-1";
            }
          }
        }}
        startDate="2021-01-01"
        endDate="2021-09-11"
        showOutOfRangeDays={true}
        showWeekdayLabels={true}
        gutterSize={1}
        tooltipDataAttrs={(value) => ({
          "data-for": "pnlItem",
          "data-tip": `${value.pnl} PnL on ${value.date}`,
          "data-iscapture": "true",
        })}
      />
    </div>
  );
};

export default PnLCalendar;
