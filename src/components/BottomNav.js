import React from "react";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import DashboardIcon from '@mui/icons-material/Dashboard';
import InsightsIcon from '@mui/icons-material/Insights';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate, useLocation } from "react-router-dom";

const BottomNav = ({ user }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [value, setValue] = React.useState(location.pathname);

  React.useEffect(() => {
    setValue(location.pathname);
  }, [location.pathname]);

  // Hide BottomNav on login/signup pages
  if (location.pathname === "/login" || location.pathname === "/signup") return null;

  return (
    <Paper sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }} elevation={3}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          navigate(newValue);
        }}
      >
        <BottomNavigationAction label="Dashboard" value="/" icon={<DashboardIcon />} />
        <BottomNavigationAction label="Insights" value="/insights" icon={<InsightsIcon />} />
        <BottomNavigationAction label="Profile" value="/profile" icon={<PersonIcon />} />
      </BottomNavigation>
    </Paper>
  );
};

export default BottomNav;
