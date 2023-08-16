import React from "react";
import ReactDom from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import "antd/dist/reset.css";

const root = ReactDom.createRoot(document.getElementById("app"));
root.render(
  <BrowserRouter>
    <ConfigProvider theme={{ token: { colorPrimary: "#00b96b" } }}>
      <App />
    </ConfigProvider>
  </BrowserRouter>
);
