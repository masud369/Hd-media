import React, { useEffect, useState } from "react";
import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap-daterangepicker/daterangepicker.css";

const DateRangePickerComp = ({ handelExludDate,handesetExcludDate }) => {
  const [dates, setDatesState] = useState({
    startDate: "",
    endDate: "",
  });
  useEffect(()=>{
    handesetExcludDate(dates.startDate,dates.endDate);
  },[])

  const setDates = (e, { startDate, endDate }) => {
    setDatesState({
      startDate: startDate.format("YYYY-MM-DD"),
      endDate: endDate.format("YYYY-MM-DD"),
    });
  };

  function getDayDifference(startDate, endDate, handelExludDate) {
    const oneDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day

    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);

    if (!isNaN(startDateObj) && !isNaN(endDateObj)) {
      // Calculate the difference in days
      const differenceInDays = Math.round(
        Math.abs((endDateObj - startDateObj) / oneDay)
      );
      handelExludDate(differenceInDays);
      return differenceInDays;
    }

    // Return null or some other value to handle cases where the dates are not valid
    return null;
  }
  console.log(
    getDayDifference(dates.startDate, dates.endDate, handelExludDate)
  );

  return (
    <div className="App">
      {dates.startDate} - {dates.endDate}
      <br />
      <DateRangePicker
        onApply={setDates}
        initialSettings={{ startDate: "08/20/2022", endDate: "08/28/2022" }}
      >
        <input
          type="text"
          value={dates.startDate + "-" + dates.endDate}
          className="form-control"
        />
      </DateRangePicker>
    </div>
  );
};

export default DateRangePickerComp;
