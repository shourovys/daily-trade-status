const highLowValue = {
  high: -Infinity,
  low: Infinity,
};
export const getHighAndLowPnLAmount = (currentPnL) => {
  if (highLowValue.high <= currentPnL) {
    highLowValue.high = currentPnL;
  } else if (highLowValue.low >= currentPnL) {
    highLowValue.low = currentPnL;
  }

  return highLowValue;
};

export const getPartOfNumber = (number, part) => {
  return (number / 4) * part;
};

//checking the amount and returning the color class name
export const getColorClass = (value, highLowTrader) => {
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
};

// data for bottom pnl color range
export const getProfitColorAndRange = (highLowTrader) => [
  {
    color: "#d6e685",
    range: {
      from: getPartOfNumber(highLowTrader.high, 0),
      to: getPartOfNumber(highLowTrader.high, 1),
    },
  },
  {
    color: "#8cc665",
    range: {
      from: getPartOfNumber(highLowTrader.high, 1),
      to: getPartOfNumber(highLowTrader.high, 2),
    },
  },
  {
    color: "#44a340",
    range: {
      from: getPartOfNumber(highLowTrader.high, 2),
      to: getPartOfNumber(highLowTrader.high, 3),
    },
  },
  {
    color: "#1e6823",
    range: {
      from: getPartOfNumber(highLowTrader.high, 3),
      to: getPartOfNumber(highLowTrader.high, 4),
    },
  },
];
export const getLossColorAndRange = (highLowTrader) => [
  {
    color: "#ff7b7b",
    range: {
      from: getPartOfNumber(highLowTrader.low, 0),
      to: getPartOfNumber(highLowTrader.low, 1),
    },
  },
  {
    color: "#ff5252",
    range: {
      from: getPartOfNumber(highLowTrader.low, 1),
      to: getPartOfNumber(highLowTrader.low, 2),
    },
  },
  {
    color: "#ff0000",
    range: {
      from: getPartOfNumber(highLowTrader.low, 2),
      to: getPartOfNumber(highLowTrader.low, 3),
    },
  },
  {
    color: "#a70000",
    range: {
      from: getPartOfNumber(highLowTrader.low, 3),
      to: getPartOfNumber(highLowTrader.low, 4),
    },
  },
];
