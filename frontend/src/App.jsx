import { useEffect, useState } from "react";
import Container from "./container/Container";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import authService from "./Backend/patient.config.js";
import { useDispatch } from "react-redux";
import {
  login as storeLogin,
  logOut as storeLogout,
} from "./store/authSlice.js";
import { useNavigate } from "react-router-dom";
function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    authService
      .getCurrentPatient()
      .then((res) => {
        if (res?.data?.data?._id) {
          dispatch(storeLogin({ userData: res.data.data }));
        } else {
          dispatch(storeLogout());
        }
      })
      .catch(() => {
        dispatch(storeLogout());
      });
  });

  return (
    <Container>
      <Header />
      <div className="h-[100vh] bg-blue-300 mt-2">
        <Outlet />
      </div>
    </Container>
  );
}

export default App;
