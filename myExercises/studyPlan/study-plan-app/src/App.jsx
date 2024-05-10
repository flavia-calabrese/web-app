import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Course from "../Courses.mjs";
import NavComponent from "./Components/NavComponent";
import HomePage from "./Components/HomePage";
import { createTheme, ThemeProvider } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function App() {
  const theme = createTheme({
    components: {
      MuiPickersCalendarHeader: {
        styleOverrides: {
          labelContainer: {
            fontWeight: "800",
          },
        },
      },
      // Name of the component ⚛️
      MuiDateCalendar: {
        styleOverrides: {
          root: {
            width: "30rem",
            heigth: "40rem",
            marginTop: "1rem",
            marginBottom: "3rem",
          },
        },
      },
      MuiPickersDay: {
        styleOverrides: {
          root: {
            fontSize: "1rem",
          },
        },
      },
    },
  });

  const availableCourses = [
    new Course("aaaaaaa", "Software", 8),
    new Course("aaaaaab", "WebApp", 6),
    new Course("aaaaaac", "Pds", 10),
    new Course("aaaaaad", "Formal Languages", 8),
  ];

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <NavComponent></NavComponent>
        <div className="home-page">
          <HomePage></HomePage>
        </div>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
