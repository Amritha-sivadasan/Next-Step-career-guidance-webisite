import { Route, Routes } from "react-router-dom";
import StudentRouter from "./routes/StudentRouter";
import ExpertRouter from "./routes/ExpertRouter";
import AdminRouter from "./routes/AdminRouter";

function App() {
  return (
    <>
      <Routes>
        <Route path="/*" element={<StudentRouter />} />
        <Route path="/expert/*" element={<ExpertRouter />} />
        <Route path="/admin/*" element={<AdminRouter />} />
  
      </Routes>
    </>
  );
}

export default App;
