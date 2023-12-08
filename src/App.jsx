import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Navbar } from "./component/Navbar";
import { loginAction } from "./redux/slices/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import NotFound from "./component/NotFound";

function App() {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.user.id);
  const keepLogin = () => {
    const data = localStorage.getItem("sosialmedia");
    const user = JSON.parse(data);
    if (data) {
      dispatch(loginAction(user));
    }
  };

  useEffect(() => {
    keepLogin();
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        {!userLogin ? (
          <>
            <Route element={<Login />} path="/login" />
            <Route element={<Register />} path="/register" />{" "}
          </>
        ) : null}
        <Route element={<Home />} path="/" />
        <Route element={<NotFound />} path="*" />
      </Routes>
    </>
  );
}

export default App;
