import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { TransactionProvider } from "./context/TransactionContext.jsx";
import { HashRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <TransactionProvider>
    <HashRouter>
      <App />
    </HashRouter>
  </TransactionProvider>
);
