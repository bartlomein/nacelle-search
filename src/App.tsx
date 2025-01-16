import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import NotificationPage from "./pages/NotificationPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/search" element={<SearchPage />} />
        <Route path="/notification" element={<NotificationPage />} />
      </Routes>
    </Router>
  );
}

export default App;
