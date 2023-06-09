import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@mui/material";
import { User } from "../hooks/useUsers";

interface UserListProps {
  users: User[];
  onUserClick: (user: User) => void;
}

const UserList: React.FC<UserListProps> = ({ users, onUserClick }) => {
  return (
    <List>
      {users.map((user) => (
        <ListItem
          button
          key={user.login.uuid}
          onClick={() => onUserClick(user)}
        >
          <ListItemAvatar>
            <Avatar alt={user.name.first} src={user.picture.thumbnail} />
          </ListItemAvatar>
          <ListItemText
            primary={`${user.name.first} ${user.name.last} - ${user.location.country}`}
            secondary={`Phone: ${user.phone}, Gender: ${user.gender}, Email:${user.email}`}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default UserList;
