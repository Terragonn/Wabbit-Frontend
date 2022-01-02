import React from "react";
import { render } from "react-dom";
import { HashRouter } from "react-router-dom";
import "./index.css";
import App from "./App";

render(
    <HashRouter>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </HashRouter>,
    document.getElementById("root")
);
