import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import {
  createHashRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";
import Home from "./Home";
import Game from "./Game";


const router = createHashRouter([
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
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);