import Header from "./components/Header";
// import Body from './components/Body'
import { Outlet } from "react-router-dom";
import Login from "./components/Login";
import Admin from "./components/Admin";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Redirect from '/' to '/login' */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Your actual routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Admin />} />
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
};

export default App;
