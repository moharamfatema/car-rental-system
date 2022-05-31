import React from "react";
import NavBar from "./NavBar";
import { Paper, Grid } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import Car from "./Car";
import { useLocation } from "react-router-dom";

export default function DisplayCars() {
    const props = useLocation();
  console.log(props.state);
  let rows = [
    { id: 0, brand: "mercedes", year: 2022, model: "benz",Status:'Active' },
    { id: 1, brand: "mercedes", year: 2022, model: "benz" },
  ];
  //car.plate_number, car.model, car.brand, car.`year`
  const columns = [
    { field: "id", headerName: "Plate Number", width: 90 },
    {
      field: "model",
      headerName: "Model",
      width: 150,
    },
    {
      field: "brand",
      headerName: "Brand",
      width: 150,
    },
    {
      field: "year",
      headerName: "Year",
      type: "number",
      width: 110,
    },
  ];

  return (
    <>
      <NavBar current="displaycars" />
        <Grid container spacing={2}>
        {Object.entries(props.state.rows).map(([key, value]) => {
             return(
              <Grid item key={key}>
                <Car {...value} />
              </Grid>
            )
          })}
        </Grid>
    </>
  );
}
