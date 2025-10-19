/* @refresh reload */
import { render } from "solid-js/web";
import "./styles/globals.css";
import App from "./App";

/**
 * Application entry point
 * Initializes and renders the SolidJS application
 */

const root = document.getElementById("root");

if (!root) {
  throw new Error(
    'Root element not found. Please ensure there is a <div id="root"></div> in your HTML.',
  );
}

// Dispose function for cleanup
const dispose = render(() => <App />, root);

// Hot module replacement support
if (import.meta.hot) {
  import.meta.hot.dispose(dispose);
}
