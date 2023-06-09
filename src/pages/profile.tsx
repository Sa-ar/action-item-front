import { Box, Button, TextField, Typography } from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { queryClient } from "../queryClient";
import { User, server } from "../hooks/useUsers";
import { useState } from "react";
import { useMutation } from "react-query";
import axios from "axios";

const Profile: React.FC = () => {
  const location = useLocation();
  const isFrom = location.state?.isFrom;
  const saveMutation = useMutation(async (data: User) => {
    const response = await axios.post(`${server}/users`, data);
    return response.data;
  });
  const updateMutation = useMutation(
    async ({ id, data }: { id: string; data: Partial<User> }) => {
      const response = await axios.put(`${server}/users/${id}`, data);
      return response.data;
    }
  );
  const deleteMutation = useMutation(async (id: string) => {
    const response = await axios.delete(`${server}/users/${id}`);
    return response.data;
  });
  const randomUsers = queryClient.getQueryData<User[]>("users") ?? [];
  const savedUsers = queryClient.getQueryData<User[]>("savedUsers") ?? [];
  const users = isFrom === "new-users" ? randomUsers : savedUsers;
  const { id } = useParams();
  const user = users?.find((u) => u.login.uuid === id);
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState(user?.name.first || "");
  const [lastName, setLastName] = useState(user?.name.last || "");
  const navigate = useNavigate();

  if (!user) {
    return null;
  }

  function handleSave() {
    if (!user) return;

    saveMutation.mutate(user);
  }

  function handleUpdate() {
    setIsEditing(false);
    if (!user) return;

    updateMutation.mutate({
      id: user.login.uuid,
      data: {
        name: { title: user.name.title, first: firstName, last: lastName },
      },
    });
  }

  function handleDelete() {
    if (!user) return;

    deleteMutation.mutate(user.login.uuid);
  }

  function handleBack() {
    navigate(-1);
  }

  return (
    <Box>
      <Typography variant="h3" marginBottom={3}>
        User Details
      </Typography>
      {isEditing ? (
        <>
          <TextField
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            label="First Name"
            variant="outlined"
          />
          <TextField
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            label="Last Name"
            variant="outlined"
          />
        </>
      ) : (
        <Typography>
          Name: {user.name.first} {user.name.last}
        </Typography>
      )}
      <Typography>Gender: {user.gender}</Typography>
      <Typography>
        Age: {user.dob.age} Born in {new Date(user.dob.date).getFullYear()}
      </Typography>
      <br />
      <Typography>
        <Typography fontWeight={600}>Address:</Typography>
        Street: {user.location.street.name} {user.location.street.number}
        <br />
        City: {user.location.city}
        <br />
        State: {user.location.state}
        <br />
        Country: {user.location.country}
      </Typography>
      <br />
      <Typography>
        <Typography fontWeight={600}>Contact:</Typography>
        Phone - {user.phone}
        <br />
        Email - {user.email}
      </Typography>

      <Box mt={2}>
        {isEditing ? (
          <>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleUpdate}
            >
              Update
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleUpdate}>
              Cancel
            </Button>
          </>
        ) : (
          <>
            {isFrom === "new-users" ? (
              <Button variant="contained" color="primary" onClick={handleSave}>
                Save
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={handleDelete}
              >
                Delete
              </Button>
            )}
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </Button>
            <Button variant="contained" onClick={handleBack}>
              Back
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Profile;
