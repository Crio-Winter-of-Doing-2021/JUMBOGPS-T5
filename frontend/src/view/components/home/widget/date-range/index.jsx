import React, { useState } from "react";
import "./styles.css";
import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap-daterangepicker/daterangepicker.css";
import moment from "moment";

const dateRanges = {
  Today: [moment().toDate(), moment().toDate()],
  Yesterday: [
    moment().subtract(1, "days").toDate(),
    moment().subtract(1, "days").toDate(),
  ],
  "Last 7 Days": [moment().subtract(6, "days").toDate(), moment().toDate()],
  "Last 30 Days": [moment().subtract(29, "days").toDate(), moment().toDate()],
  "This Month": [
    moment().startOf("month").toDate(),
    moment().endOf("month").toDate(),
  ],
  "Last Month": [
    moment().subtract(1, "month").startOf("month").toDate(),
    moment().subtract(1, "month").endOf("month").toDate(),
  ],
};

const DateRangeSelector = () => {
  const [state, setState] = useState({
    start: moment().subtract(29, "days"),
    end: moment(),
  });
  const { start, end } = state;
  const handleCallback = (start, end) => {
    setState({ start, end });
  };
  const label =
    start.format("MMMM D, YYYY") +
    " 00:00 AM - " +
    end.format("MMMM D, YYYY") +
    " 11:59 PM";
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
        <div id="reportrange" >
          <span>{label}</span>
        </div>
      </DateRangePicker>
    </div>
  );
};

export default DateRangeSelector;
