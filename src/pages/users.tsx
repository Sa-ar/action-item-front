import { CircularProgress, TextField, Typography } from "@mui/material";
import { useState } from "react";
import UserList from "../components/UserList";
import { User } from "../hooks/useUsers";
import { UseQueryResult } from "react-query";
import { useNavigate } from "react-router-dom";

interface UsersProps {
  useUsers: () => UseQueryResult<User[], unknown>;
  title: string;
}
const Users: React.FC<UsersProps> = ({ useUsers, title }) => {
  const { data: users = [], isLoading, error } = useUsers();
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();

  const filteredUsers = filter
    ? users?.filter(
        (user: User) =>
          user.name.first.toLowerCase().includes(filter.toLowerCase()) ||
          user.name.last.toLowerCase().includes(filter.toLowerCase()) ||
          user.location.country.toLowerCase().includes(filter.toLowerCase())
      )
    : users;

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  const handleUserClick = (user: User) => {
    navigate(`/users/${user.login.uuid}`, {
      state: { isFrom: title.toLowerCase().replace(" ", "-") },
    });
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error || !users) {
    return <Typography>Error loading user</Typography>;
  }

  return (
    <main>
      <Typography variant="h2">{title}</Typography>
      <TextField
        label="Filter"
        value={filter}
        onChange={handleFilterChange}
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <UserList users={filteredUsers} onUserClick={handleUserClick} />
    </main>
  );
};

export default Users;
