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

// Determine the base URL dynamically
const baseUrl = process.env.PUBLIC_URL || '/';
console.log('BASE URL IS: ', baseUrl);
console.log('PUBLIC URL IS: ', process.env.PUBLIC_URL);

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
  {
    path: '*',
    element: <div>Page Not Found</div>,
  },
], { basename: baseUrl });

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);