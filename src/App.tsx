import { Route, Routes } from "react-router-dom";
import Homescreen from "./pages/Homescreen";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Assignments from "./pages/Assignments";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Homescreen />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Dashboard />} />
        <Route path="/assignments" element={<Assignments />} />
      </Routes>
    </div>
  );
}

export default App;
