import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Movies from "./pages/Movies";
import MovieDetail from "./pages/MovieDetail";
import PrivateRoute from "./components/PrivateRoute";
import App from "./App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      {
        path: "/movies",
        element: (
          <PrivateRoute>
            <Movies />
          </PrivateRoute>
        ),
      },
      {
        path: "/movies/:id",
        element: (
          <PrivateRoute>
            <MovieDetail />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
