import React from "react";

export default function FormattedDate(props) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[props.date.getDay()];
  let hours = props.date.getHours() % 12 || 12;

  let minutes = props.date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let amPm = props.date.getHours() < 12 ? "am" : "pm";

  return (
    <div>
      {day}, {hours}:{minutes} {amPm}
    </div>
  );
}
