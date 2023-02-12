import React from "react";
import { createRoot } from "react-dom/client";
import "./style.scss";
import App from "./app";

const container = document.querySelector("#root");
if (container !== null) {
	const root = createRoot(container);
	root.render(<App />);
}