import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import store from "./store/store.js";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router";
import HomePage from "./components/HomePage.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import Dignosis from "./components/Dignosis.jsx";
import DignosisChatBot from "./components/DignosisChatBot.jsx";
import AuthLayout from "./components/AuthLayout.jsx";
import Landing from "./components/Landing.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <AuthLayout authentication={false}>
            <Landing />
          </AuthLayout>
        ),
      },
      {
        path: "/home",
        element: (
          <AuthLayout authentication>
            {" "}
            <HomePage />
          </AuthLayout>
        ),
      },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: "/register",
        element: (
          <AuthLayout authentication={false}>
            <Register />
          </AuthLayout>
        ),
      },
      {
        path: "/dignosis",
        element: (
          <AuthLayout authentication>
            {" "}
            <Dignosis />
          </AuthLayout>
        ),
      },
      {
        path: "/chatbot",
        element: (
          <AuthLayout authentication>
            {" "}
            <DignosisChatBot />
          </AuthLayout>
        ),
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
