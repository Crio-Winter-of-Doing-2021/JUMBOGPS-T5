import React, { useState } from "react";
import "./styles.css";
import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap-daterangepicker/daterangepicker.css";
import moment from "moment";
import { setDateRange } from "../../../../../controller/reducer/asset";

const momentStart = () =>
  moment().set("hour", 0).set("minute", 0).set("second", 0);
const momentEnd = () =>
  moment().set("hour", 23).set("minute", 59).set("second", 59);

const dateRanges = {
  Today: [momentStart().toDate(), moment().toDate()],
  Yesterday: [
    momentStart().subtract(1, "days").toDate(),
    momentEnd().subtract(1, "days").toDate(),
  ],
  "Last 7 Days": [
    momentStart().subtract(6, "days").toDate(),
    momentEnd().toDate(),
  ],
  "Last 30 Days": [
    momentStart().subtract(29, "days").toDate(),
    momentEnd().toDate(),
  ],
  "This Month": [
    momentStart().startOf("month").toDate(),
    momentEnd().endOf("month").toDate(),
  ],
  "Last Month": [
    momentStart().subtract(1, "month").startOf("month").toDate(),
    momentEnd().subtract(1, "month").endOf("month").toDate(),
  ],
  Whole: [moment("2000-01-01T00:00:00+05:30"), moment()],
};

const DateRangeSelector = ({ dispatch }) => {
  const [state, setState] = useState({
    start: dateRanges.Whole[0],
    end: dateRanges.Whole[1],
  });
  const { start, end } = state;
  const handleCallback = (start, end) => {
    setState({ start, end });
    dispatch(setDateRange({ start: start.format(), end: end.format() }));
  };
  const label =
    start.format("MMMM D, YYYY h:mm a") +
    " to " +
    end.format("MMMM D, YYYY h:mm a");
  return (
    <div className="bg-secondary outer-box">
      <p>Select Start and End Date</p>
      <DateRangePicker
        initialSettings={{
          startDate: start.toDate(),
          endDate: end.toDate(),
          ranges: { ...dateRanges },
        }}
        onCallback={handleCallback}
      >
        <div id="reportrange">
          <span>{label}</span>
        </div>
      </DateRangePicker>
    </div>
  );
};

export default DateRangeSelector;
