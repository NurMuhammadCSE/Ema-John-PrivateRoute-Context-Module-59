import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/UserContexts";
import logo from "../../images/Logo.svg";
import "./Header.css";

const Header = () => {
  const { user, logOut } = useContext(AuthContext);
  return (
    <div>
      <nav className="header">
        <Link to={"/"}>
          <img alt="" src={logo}></img>
        </Link>

        <div>
          <Link to={"/"}>Shop</Link>
          <Link to="/orders">Orders</Link>
          <Link to="/inventory">Inventory</Link>
          <Link to="/about">About</Link>
          {/* <Link to="/login">Login</Link>
          <Link to="/signup">Sign up</Link> */}

          {user?.email && <span className="text-white px-4">{user.email}</span>}

          {user?.uid ? (
            <Link className="btn-logout" onClick={logOut}>
              Log out
            </Link>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign up</Link>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Header;
