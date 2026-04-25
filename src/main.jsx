import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import App from "./App";
import "./index.css";
import { FriendsProvider } from "./store/FriendsContext";
import { TimelineProvider } from "./store/TimelineContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <FriendsProvider>
        <TimelineProvider>
          <App />
          <Toaster position="top-right" />
        </TimelineProvider>
      </FriendsProvider>
    </BrowserRouter>
  </React.StrictMode>
);
