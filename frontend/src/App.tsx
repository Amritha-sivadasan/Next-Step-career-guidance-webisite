import { Route, Routes } from "react-router-dom";
import StudentRouter from "./routes/StudentRouter";
import ExpertRouter from "./routes/ExpertRouter";
import AdminRouter from "./routes/AdminRouter";
import { useDispatch } from "react-redux";
import useFetchUserData from "./hooks/UseFetchUser";
import { useEffect } from "react";
import { setAuthenticated,setUser } from "./features/student/authSlice";


function App() {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useFetchUserData();
  
  useEffect(() => {
    if (user) {
    
      dispatch(setUser(user));
      dispatch(setAuthenticated(isAuthenticated));
    } else {
      dispatch(setAuthenticated(false));
    }
  }, [dispatch, user, isAuthenticated]);

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
