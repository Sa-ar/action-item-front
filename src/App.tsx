import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./pages/homepage";
import "./App.css";
import Users from "./pages/users";
import { useFetchSavedUsers, useFetchUsers } from "./hooks/useUsers";
import Profile from "./pages/profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "new-users",
    element: <Users useUsers={useFetchUsers} title="New Users" />,
  },
  {
    path: "saved-users",
    element: <Users useUsers={useFetchSavedUsers} title="Saved Users" />,
  },
  {
    path: "users/:id",
    element: <Profile />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
