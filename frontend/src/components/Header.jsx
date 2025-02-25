import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import authService from "../Backend/patient.config";
import {
  login as storeLogin,
  logOut as storeLogout,
} from "../store/authSlice.js";
function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    authService.LogoutPatient().then(() => {
      dispatch(storeLogout());
      navigate("/");
    });
  };

  return (
    <div className="full flex items-center justify-between p-4 shadow-md">
      {/* Logo and Title */}
      <Link to="/home">
        <div className="flex items-center gap-2">
          <img src="/logo2.svg" alt="Logo" className="h-10" />
          <span className="text-xl font-bold">MedicoTalk</span>
        </div>
      </Link>
      {/* Authentication Buttons */}
      <div>
        {authStatus ? (
          <button
            onClick={handleLogout}
            className="bg-white text-blue-500 px-4 py-2 rounded-md hover:bg-gray-100"
          >
            Logout
          </button>
        ) : (
          <div className="flex gap-4">
            <Link to="/login">
              <button className="bg-white text-blue-500 px-4 py-2 rounded-md hover:bg-gray-100">
                Login
              </button>
            </Link>
            <button
              onClick={() => navigate("/register")}
              className="bg-blue-700 text-black px-4 py-2 rounded-md hover:bg-red-600"
            >
              Register
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
