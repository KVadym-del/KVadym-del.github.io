import { Router, Route } from "@solidjs/router";
import { HomePage } from "./pages/HomePage";
import { ConverterPage } from "./pages/ConverterPage";
import "./styles/globals.css";

/**
 * Main App component with routing
 * Routes between portfolio home page and markdown converter
 */
function App() {
  return (
    <Router>
      <Route path="/" component={HomePage} />
      <Route path="/converter" component={ConverterPage} />
    </Router>
  );
}

export default App;
