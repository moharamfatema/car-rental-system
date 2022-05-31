import React, { useEffect, useState } from "react";

import {
  BottomNavigation,
  Button,
  BottomNavigationAction,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import LogoutIcon from "@mui/icons-material/Logout";
import SearchIcon from '@mui/icons-material/Search';

export default function NavBar({ current }) {
  const [navBarValue, setNavBarValue] = useState(current);
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/" + navBarValue, { repplace: "True" });
  }, [navBarValue, navigate]);

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
        <BottomNavigationAction
          label="New Car"
          value="newcar"
          icon={<DirectionsCarIcon />}
        />
        <BottomNavigationAction
          label="Reports"
          value="reports"
          icon={<ListAltIcon />}
        />
        <BottomNavigationAction
          label="Advanced Search"
          value="advancedsearch"
          icon={<ContentPasteSearchIcon />}
        />
        <Button
          startIcon={<LogoutIcon />}
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
  } else {
    return (
      <BottomNavigation
        value={navBarValue}
        onChange={(event, newValue) => {
          setNavBarValue(newValue);
        }}
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      >
        <BottomNavigationAction label="Search Cars" value="carsearch" icon={<SearchIcon/>}/>
        <Button
          startIcon={<LogoutIcon />}
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
