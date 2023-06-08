import { QueryClientProvider } from "react-query";
import { queryClient } from "./queryClient";
import Homepage from "./pages/homepage";
import "./App.css";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Homepage />
    </QueryClientProvider>
  );
}

export default App;
