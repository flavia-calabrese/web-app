import * as React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import "./component.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { DayCalendarSkeleton } from "@mui/x-date-pickers/DayCalendarSkeleton";
import { WidthNormal } from "@mui/icons-material";
import dayjs from "dayjs";

export default function CalendarComponent() {
  return (
    <div className="calendar-border">
      <DateCalendar defaultValue={dayjs()} />
    </div>
  );
}
