import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import "typeface-roboto";
import App from "./App";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { ConfigProvider } from "antd";
import enUS from "antd/lib/locale/en_US";
import moment from "moment";

moment.locale("en");

ReactDOM.render(
  <Provider store={store}>
    <ConfigProvider locale={enUS} componentSize="middle">
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ConfigProvider>
  </Provider>,
  document.getElementById("root")
);
