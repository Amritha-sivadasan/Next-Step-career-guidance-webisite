import { Route, Routes } from "react-router-dom";
import StudentRouter from "./routes/StudentRouter";
import ExpertRouter from "./routes/ExpertRouter";
import AdminRouter from "./routes/AdminRouter";
import LoadingPage from "./components/common/LoadingPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/*" element={<StudentRouter />} />
        <Route path="/expert/*" element={<ExpertRouter />} />
        <Route path="/admin/*" element={<AdminRouter />} />
        <Route path='/loading' element={<LoadingPage/>}/>
      </Routes>
    </>
  );
}

export default App;
