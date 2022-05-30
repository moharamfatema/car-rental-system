import React, { useEffect, useState } from "react";

import { BottomNavigation, Button, BottomNavigationAction } from "@mui/material";

import { useNavigate } from "react-router-dom";

export default function NavBar({current}) {
  const [navBarValue, setNavBarValue] = useState(current);
  const navigate = useNavigate();

  useEffect(() => {
      navigate('/'+navBarValue,{repplace:"True"})
  },[navBarValue,navigate])

  if (sessionStorage.getItem("isAdmin") === "True") {
    return (
      <BottomNavigation
      showLabels
        value={navBarValue}
        onChange={(event, newValue) => {
          setNavBarValue(newValue);
        }}
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      >  
      <BottomNavigationAction label="New Car" value='newcar'>
      </BottomNavigationAction>
      <BottomNavigationAction label="Reports" value='reports'>
      </BottomNavigationAction>
        
        {/*newacar*/}
        {/*reports*/}
        <Button
          variant="outlined"
          onClick={(e) => {
            sessionStorage.clear();
            console.log("Logging out");
          }}
        >
          Log Out
        </Button>
      </BottomNavigation>
    );
  } else {
    return (
      <BottomNavigation
        value={navBarValue}
        onChange={(event, newValue) => {
          setNavBarValue(newValue);
        }}
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      >
        {/*reservations*/}
        <Button
          variant="outlined"
          onClick={(e) => {
            sessionStorage.clear();
            console.log("Logging out");
            navigate("/", { replace: true });
          }}
        >
          Log Out
        </Button>
      </BottomNavigation>
    );
  }
}
