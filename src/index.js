import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";
import Home from "./Home";
import Game from "./Game";

console.log('Public URL:', process.env.PUBLIC_URL);
console.log('NODE_ENV:', process.env.NODE_ENV);

// Determine the base URL dynamically
const baseUrl = process.env.PUBLIC_URL || '/';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home/>,
  },
  {
    path: 'game/:gameId/:playerId',
    loader: async ({ params }) => {
      if (!params.gameId || !params.playerId) {
        return redirect('/')
      }

      return null;
    },
    element: <Game/>,
  },
], { basename: baseUrl });

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);