import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Welcome from "../components/Welcome.jsx";
import TestComponent from "../components/TestComponent.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Welcome />
    <TestComponent />
  </StrictMode>
);
