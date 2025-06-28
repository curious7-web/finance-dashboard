import React from "react";
import { Link, useLocation } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { AppBar, Toolbar, Typography, Button, Switch } from "@mui/material";

const Navbar = ({ user, setUser, darkMode, toggleDarkMode }) => {
  const location = useLocation();

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  // Hide navbar on login/signup page
  if (location.pathname === "/login" || location.pathname === "/signup") return null;

  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" component={Link} to="/" sx={{ color: "#fff", textDecoration: "none" }}>
          Finance Dashboard
        </Typography>
        <div>
          <Switch checked={darkMode} onChange={toggleDarkMode} color="default" />
          <Button component={Link} to="/" color="inherit">Dashboard</Button>
          <Button component={Link} to="/profile" color="inherit">Profile</Button>
          <Button component={Link} to="/insights" color="inherit">Insights</Button>
          {user ? (
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
          ) : (
            <Button component={Link} to="/login" color="inherit">Login</Button>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
