import { React, useState, useEffect, useRef } from "react";
import {
  Button,
  TextField,
  Stack,
  Grid,
  Paper,
  Box,
  Alert,
  IconButton,
  MenuItem,
} from "@mui/material";
import {
  useParams,
  useNavigate,
  useLocation,
  Navigate,
} from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import NavBar from "./NavBar";

export default function CarSearch() {
  const navigate = useNavigate();
  const validYear = /^(19|20)[\d]{2}$/;
  const statuses = [
    {
      value: "",
      label: "Choose Status",
    },
    {
      value: "active",
      label: "Active",
    },
    {
      value: "outOfService",
      label: "Out Of Service",
    },
  ];
  const offices = useRef([]);
  useEffect(()=>{
    fetch("http://localhost/carrental/getOffices.php",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
    })
    .then((res)=>res.json())
    .then((res)=>{
      //console.log(res);
      offices.current = [];
      res.forEach(element => {
        offices.current = offices.current.concat([
          {
            value:element.office_id,
            label:element.country + ", "+element.city+", "+element.address
          }
        ]);
      });
      setCar({
        ...car,
        pickupOffice: {
          ...car['pickupOffice'],
          ...offices.current[0],label:"Pickup Office"
        },
        returnOffice: {
          ...car['returnOffice'],
          ...offices.current[0]
          ,label:"Return Office"
        },
      });
      console.log(offices.current);
    })
    .catch((err) => {
      setErrorMsg("no-offices");
      setOpen("true");
      console.log(err);
    });
  },[]);

  const format = [{year:"numeric"}, {month:"2-digit"}, {day:"2-digit"}]
  
  const join = (t, a, s) => {
    function format(m) {
       let f = new Intl.DateTimeFormat('en', m);
       return f.format(t);
    }
    return a.map(format).join(s);
 }
  const current = (offset=0) => {
   return join(new Date().setDate(new Date().getDate() + offset), format,'-'); 
  }
  const [open, setOpen] = useState(false);

  const [errorMsg, setErrorMsg] = useState("Invalid Input!");

  const [car, setCar] = useState({
    pickupDate: {
      value: current(),
      name: "pickupDate",
      label: "Pick-Up Date",
      helperText: "",
      error: false,
      type:'date',
      required:true

    },
    returnDate: {
      value: current(5),
      name: "returnDate",
      label: "Return Date",
      helperText: "",
      error: false,
      type:'date',
      required:true

    },pickupOffice: {
      ...offices.current[0],
      name: "pickupOffice",
      label: "Pick-Up Office",
      select : true,

    }
    ,returnOffice: {
      ...offices.current[0],
      name: "returnOffice",
      label: "Return Office",

      select:true
    },
    plateNumber: {
      value: "",
      type: "text",
      name: "plateNumber",
      label: "Plate Number",
      error: false,
      helperText: "",
    },
    model: {
      value: "",
      type: "text",
      name: "model",
      label: "Model",
      error: false,
      helperText: "",
    },
    brand: {
      value: "",
      type: "text",
      name: "brand",
      label: "Brand",
      error: false,
      helperText: "",
    },
    year: {
      value: "",
      name: "year",
      label: "Year",
      inputProps: { inputMode: "numeric", pattern: validYear },
      error: false,
      helperText: "",
    },
  });
  

  const onChange = (e) => {
    let key = e.target.name;
    if (car[key].type === 'date'){
      // e.target.value = 
    }
    setCar({
      ...car,
      [key]: {
        ...car[key],
        value: e.target.value,
        error: false,
        helperText: "",
      },
    });
  };

  const validate = () => {
    let err = false;
    setCar((oldcar) => ({
      ...oldcar,
      brand: {
        ...oldcar["brand"],
        value: car.brand.value.trim(),
      },
    }));

    setCar((oldcar) => ({
      ...oldcar,
      model: {
        ...oldcar["model"],
        value: car.model.value.trim(),
      },
    }));

    if (car.year.value.trim() && !validYear.test(car.year.value)) {
      setCar((prevState) => ({
        ...prevState,
        year: {
          ...prevState["year"],
          error: true,
          helperText: "Please enter a valid Year!",
        },
      }));
      err = true;
    }

    return !err;
  };
  const url = "http://localhost:80/carrental/customerSearch.php"; // TODO
  const onSubmit = (e) => {
    e.preventDefault();
    let searchkeys = {};
    Object.entries(car).map((key, value) => {
      if (car[key[0]].value.trim() !== "") {
        searchkeys[car[key[0]].name] = car[key[0]].value;
      }
    });
    if (Object.keys(searchkeys).length === 0) {
      setErrorMsg("Please enter at least one value to search with!");
      setOpen("true");
      console.log("Empty entries");
    } else if (validate()) {
      console.log("OK");
      console.log(searchkeys);
      fetch(url, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(searchkeys),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res["error"] === "no results") {
            setErrorMsg("No Results!");
            setOpen("true");
            console.log(res["error"]);
          } else {
            console.log(res);
            navigate("/displaycars" ,{state:{rows:res}});
          }
        })
        .catch((err) => {
          setErrorMsg("An Error Ocurred! Please Try Again Later.");
          setOpen("true");
          console.log(err);
        });
    }
  };
  return (
    <>
    <NavBar current={"carsearch"}/>
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "100vh" }}
      direction='column'

    >
      <Grid item style={{ padding: "30px" }}>
        <h2 style={{ color: "white" }}>
          Please Enter The Values You'd Like To Search For
        </h2>
      </Grid>
      <Grid item xs={8} md={8} width='75%'>
        <Paper>
          <Stack spacing={3}>
            <form autocmplete="off" onSubmit={onSubmit} autoComplete="off">
              {Object.entries(car).map((key, value) => {
                if (car[key[0]].name === "status") {
                  return (
                    <Box sx={{ p: 2 }} key={value}>
                      <TextField
                        variant="filled"
                        fullWidth
                        color="primary"
                        {...car[key[0]]}
                        onChange={onChange}
                      >
                        {statuses.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Box>
                  );
                } else if (car[key[0]].name === "pickupOffice" || car[key[0]].name === "returnOffice") {
                  return (
                    <Box sx={{ p: 2 }} key={value}>
                      <TextField
                        variant="filled"
                        fullWidth
                        color="primary"
                        {...car[key[0]]}
                        onChange={onChange}
                      >
                        {offices.current.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Box>
                  );}else{
                  return (
                    <Box sx={{ p: 2 }} key={value}>
                      <TextField
                        variant="filled"
                        fullWidth
                        color="primary"
                        {...car[key[0]]}
                        onChange={onChange}
                      />
                    </Box>
                  );
                }
              })}
              <Box sx={{ p: 2 }}>
                <Button
                  variant="contained"
                  type="submit"
                  fullWidth
                  color="primary"
                  onClick={onSubmit}
                >
                  Search
                </Button>
              </Box>
              <Box sx={{ p: 2 }}>
                {open ? (
                  <Alert
                    show={open}
                    severity="error"
                    action={
                      <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                          setOpen(false);
                        }}
                      >
                        <CloseIcon fontSize="inherit" />
                      </IconButton>
                    }
                    sx={{ mb: 2 }}
                  >
                    {errorMsg}
                  </Alert>
                ) : (
                  <></>
                )}
              </Box>
            </form>
          </Stack>
        </Paper>
      </Grid>
    </Grid>
    </>
  );
}
