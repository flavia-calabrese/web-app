import "./courses.css";
import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableRow,
  ListItem,
  ListItemText,
  IconButton,
  Tooltip,
  Collapse,
} from "@mui/material";
import { TransitionGroup } from "react-transition-group";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
function CoursesComponent() {
  const myCourses = [
    { couseName: "ciccio", cfu: "3" },
    { couseName: "pasticcio", cfu: "3" },
    { couseName: "ciccio", cfu: "3" },
    { couseName: "pasticcio", cfu: "3" },
    { couseName: "ciccio", cfu: "3" },
    { couseName: "pasticcio", cfu: "3" },
    { couseName: "ciccio", cfu: "3" },
    { couseName: "pasticcio", cfu: "3" },
  ];
  return (
    <TableContainer
      sx={{
        width: "35rem",
        aspectRatio: 2,
        background: "#3f87a6",
        borderRadius: "1rem",
      }}
    >
      <Table stickyHeader aria-label="sticky table">
        <TableBody>
          {myCourses.map((course, index) => (
            <TableRow key={index} hover>
              <TableCell>
                <ListItem
                  secondaryAction={[
                    <Tooltip key={"1"} title="Add exam date">
                      <IconButton edge="end">
                        <CalendarMonthOutlinedIcon />
                      </IconButton>
                    </Tooltip>,
                    <Tooltip key={"2"} title="Add material">
                      <IconButton edge="end">
                        <AddCircleOutlineOutlinedIcon />
                      </IconButton>
                    </Tooltip>,
                    <Tooltip key={"3"} title="Delete">
                      <IconButton edge="end">
                        <DeleteOutlineOutlinedIcon />
                      </IconButton>
                    </Tooltip>,
                  ]}
                >
                  <ListItemText
                    primary={course.couseName}
                    secondary={course.cfu}
                  />
                </ListItem>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CoursesComponent;
