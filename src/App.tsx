import { Route, Routes } from "react-router-dom";
import Homescreen from "./pages/Homescreen";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Homescreen />} />
      </Routes>
    </div>
  );
}

export default App;
