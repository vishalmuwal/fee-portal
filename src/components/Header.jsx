import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <h2>IIIT Allahabad</h2>
      <div className="nav-items">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>Notifications</li>
          <li>Profile</li>
          <li>
            <Link to="/login">Logout</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
