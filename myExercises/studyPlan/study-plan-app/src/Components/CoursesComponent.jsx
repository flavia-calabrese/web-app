import "./courses.css";
import { Card } from "react-bootstrap";
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
  /**  <Card text={"dark"} className="mb-2 card-background card-position">
      <Card.Header as="h3" className="card-header">
        My Courses
      </Card.Header>
    <Card.Body>
        <Card.Text>
          <CoursesTable />
        </Card.Text>
      </Card.Body>
    </Card>*/
  return <CoursesTable></CoursesTable>;
}

function CoursesTable() {
  return (
    <TableContainer className="table-position card-background">
      <Table stickyHeader aria-label="sticky table">
        <TableBody>
          <TableRow hover>
            {/**  <ListItem
              key={1}
              secondaryAction={[
                <Tooltip title="1" aria-label="1">
                  <IconButton key={"a"} edge="end" title="date">
                    <CalendarMonthOutlinedIcon />
                  </IconButton>
                </Tooltip>,
                <Tooltip title="2" aria-label="2">
                  <IconButton key={"b"} edge="end" title="material">
                    <AddCircleOutlineOutlinedIcon />
                  </IconButton>
                </Tooltip>,

                <Tooltip title="3" aria-label="3">
                  <IconButton key={"c"} edge="end" title="delete">
                    <DeleteOutlineOutlinedIcon />
                  </IconButton>
                </Tooltip>,
              ]}
            >
              <ListItemText
                key={"item1"}
                primary="Course name"
                secondary="CFU"
              />
            </ListItem>*/}
          </TableRow>
          <TableRow hover>
            {/**  <ListItem key={2}>
              <ListItemText
                key={"item2"}
                primary="Course name"
                secondary="CFU"
              />
            </ListItem>*/}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CoursesComponent;
