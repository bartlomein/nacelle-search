import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import NotificationPage from "./pages/NotificationPage";
import WelcomePage from "./pages/WelcomePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/notification" element={<NotificationPage />} />
      </Routes>
    </Router>
  );
}

export default App;
