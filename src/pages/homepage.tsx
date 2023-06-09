import {
  List,
  ListItem,
  ListItemText,
  Divider,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <main>
      <Typography variant="h1">Welcome to the App</Typography>
      <List component="nav">
        <Link to="/new-users">
          <ListItem button>
            <ListItemText primary="Fetch" />
          </ListItem>
        </Link>
        <Link to="/saved-users">
          <ListItem button>
            <ListItemText primary="History" />
          </ListItem>
        </Link>
        <Divider />
      </List>
    </main>
  );
};

export default Homepage;
