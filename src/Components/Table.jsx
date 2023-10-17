import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DateRangePickerComp from "./DateRangePicker";

const Table = () => {
  const [id, setId] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [months, setMonths] = useState("");
  const [excludDate, setExcludDate] = useState({});
  const [excludDateDiff, setExcludDateDiff] = useState("");
  const [leadCount, setLeadCount] = useState(0);
  const [expectedLead, setExpectedLead] = useState(0);
  const [rowData, setRowData] = useState([]);

  const handelExcludDateDiff = (dateDiff) => {
    setExcludDateDiff(dateDiff);
  };
  const handesetExcludDate = (strtDate,endDate) => {
    setExcludDate({strtDate,endDate});
  };
  console.log(expectedLead);

  const tableHeader = [
    "Action/ID",
    "Start Date - End Date",
    "Month/Year",
    "Dates Excluded",
    "Numbers of Days",
    "Lead Count",
    "Expected DRR",
    "Last Updated",
  ];

  function getMonthDifference(date1, date2) {
    const monthsInAYear = 12;

    const year1 = date1?.getFullYear();
    const month1 = date1?.getMonth();
    const year2 = date2?.getFullYear();
    const month2 = date2?.getMonth();

    return (year2 - year1) * monthsInAYear + (month2 - month1);
  }

  const handleSave = () => {
    const currentDate = new Date();
    const timstump = new Date(currentDate)
    const newRowData = {
      id,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      months,
      excludDate:`${excludDate.strtDate}-${excludDate.endDate}`,
      excludDateDiff,
      leadCount,
      expectedLead:leadCount >= 1 && excludDateDiff
      ? (leadCount / Number(excludDateDiff)).toFixed(2)
      : 0,
      time:timstump.toLocaleString(),
    };

    setRowData([...rowData, newRowData]);
    setId("");
    setStartDate(null);
    setEndDate(null);
    setMonths("");
    setExcludDate("");
    setExcludDateDiff("")
    setLeadCount(0);
    setExpectedLead(0);
  };

  const handleCancel = () => {
    setId("");
    setStartDate(null);
    setEndDate(null);
    setMonths("");
    setExcludDate("");
    setExcludDateDiff(0);
    setLeadCount(0);
    setExpectedLead("0");
  };

  useEffect(() => {
    setMonths(getMonthDifference(startDate, endDate));
  }, [startDate, endDate]);

  const handleStartDate = (date) => {
    setStartDate(date);
  };

  const handleEndDate = (date) => {
    setEndDate(date);
  };

  return (
    <div className="container mx-auto p-4">
      <table className="table-auto border-collapse w-full">
        <thead>
          <tr>
            {tableHeader.map((header, index) => (
              <th
                key={index}
                className="border p-2 text-left text-blue-500 font-semibold"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border p-2">
              <input
                type="text"
                value={id}
                onChange={(e) => {
                  setId(e.target.value);
                }}
                className="w-full p-2 border rounded"
              />
            </td>
            <td className="border p-2">
              <div className="flex items-center">
                <DatePicker
                  selected={startDate}
                  onChange={handleStartDate}
                  className="p-2 border rounded mr-2"
                />
                <span className="text-gray-600">to</span>
                <DatePicker
                  selected={endDate}
                  onChange={handleEndDate}
                  className="p-2 border rounded ml-2"
                />
              </div>
            </td>
            <td
              className="border p-2"
              onChange={(e) => setMonths(e.target.value)}
            >
              {months ? `${months} months` : "not a month"}
            </td>
            <td className="border p-2">
              <DateRangePickerComp  handelExludDate={handelExcludDateDiff} handesetExcludDate={handesetExcludDate} >

              </DateRangePickerComp>
            </td>
            <td>{excludDateDiff}</td>
            <td className="border p-2">
              <input
                type="text"
                placeholder="0"
                onChange={(e) => setLeadCount(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </td>
            <td className="border p-2">
              <input
                type="text"
                value={
                  leadCount >= 1 && excludDateDiff
                    ? (leadCount / Number(excludDateDiff)).toFixed(2)
                    : 0
                }
                className="w-full p-2 border rounded"
                onChange={() => {
                  setExpectedLead(leadCount >= 1 && excludDateDiff
                    ? (leadCount / Number(excludDateDiff)).toFixed(2)
                    : 0);
                }}
              />
            </td>
            <td className="border p-2">
              <button style={{background:"aquamarine"}}
                onClick={handleSave}
                className="bg-blue-500 hover.bg-blue-700 text-white font-semibold py-2 px-4 rounded"
              >
                Save
              </button>
              <button style={{background:"red"}}
                onClick={handleCancel}
                className="bg-red-500 hover.bg-red-700 text-white font-semibold py-2 px-4 rounded ml-2"
              >
                Cancel
              </button>
            </td>
          </tr>
          
          {rowData.map((row, index) => {
            return (
            <tr key={index}>
              <td className="border p-2">{row.id}</td>
              <td className="border p-2">
                {new Date(row.startDate).toDateString()} -{" "}
                {new Date(row.endDate).toDateString()}
              </td>
              <td className="border p-2">{row.months} months</td>
              <td className="border p-2">{row.excludDate}</td>
              <td className="border p-2">{row.excludDateDiff}</td>
              <td className="border p-2">{row.leadCount}</td>
              <td className="border p-2">{row.expectedLead}</td>
              <td className="border p-2">
                {row.time}
              </td>
            </tr>
          )})}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
