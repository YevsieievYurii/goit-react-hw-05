import { NavLink } from "react-router-dom";
import "./Navigation.module.css";

function Navigation() {
  return (
    <nav>
      <NavLink
        to="/"
        end
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Home
      </NavLink>
      <NavLink
        to="/movies"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Movies
      </NavLink>
    </nav>
  );
}

export default Navigation;
