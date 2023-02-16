import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Bookmark from "./pages/Bookmark";
import Detail from "./pages/Detail";
import Home from "./pages/Home";
import SearchResult from "./pages/SearchResult";
import reportWebVitals from "./reportWebVitals";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "search",
    element: <SearchResult />,
  },
  {
    path: "detail",
    element: <Detail />,
  },
  {
    path: "bookmark",
    element: <Bookmark />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
