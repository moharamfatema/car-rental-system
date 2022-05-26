import React, { useState } from "react";

import {
  Button,
  TextField,
  Stack,
  Box,
  Alert,
  IconButton
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function Signup() {
  const validEmail = /^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/;
  const validPhone = /(\(?([\d \-\)\–\+\/\(]+){6,}\)?([ .\-–\/]?)([\d]+))/;
  const [open, setOpen] = useState(false);

  const [errorMsg, setErrorMsg] = useState("Invalid Input!");

  const [user, setUser] = useState({
    fname: {
      value: "",
      type: "text",
      name: "fname",
      label: "First Name",
      error: false,
      helperText: "",
    },
    lname: {
      value: "",
      type: "text",
      name: "lname",
      label: "Last Name",
      error: false,
      helperText: "",
    },
    phone_number: {
      value: "",
      type: "text",
      name: "phone_number",
      label: "Phone Number",
      error: false,
      helperText: "",
    },
    email: {
      value: "",
      type: "email",
      name: "email",
      label: "E-mail Address",
      error: false,
      helperText: "",
    },
    password: {
      value: "",
      type: "password",
      name: "password",
      label: "Password",
      error: false,
      helperText: "",
    },
    confirmPassword: {
      value: "",
      name: "confirmPassword",
      type: "password",
      label: "Confirm Password",
      error: false,
      helperText: "",
    },
  });

  const onChange = (e) => {
    let key = e.target.name;
    setUser({
      ...user,
      [key]: {
        ...user[key],
        value: e.target.value,
        error: false,
        helperText: "",
      },
    });
  };
  const validate = () => {
    let err = false;
    if (!user.password.value) {
      setUser((olduser) => ({
        ...olduser,
        password: {
          ...olduser["password"],
          error: true,
          helperText: "Password cannot be empty!",
        },
      }));

      err = true;
    }
    
    if (!user.fname.value.trim()) {
      setUser((olduser) => ({
        ...olduser,
        fname: {
          ...olduser["fname"],
          error: true,
          helperText: "First Name cannot be empty!",
        },
      }));

      err = true;
    } else {
      setUser((olduser) => ({
        ...olduser,
        fname: {
          ...olduser["fname"],
          value: user.fname.value.trim(),
        },
      }));
    }
    if (!user.lname.value.trim()) {
      setUser((olduser) => ({
        ...olduser,
        lname: {
          ...olduser["lname"],
          error: true,
          helperText: "Last Name cannot be empty!",
        },
      }));

      err = true;
    } else {
      setUser((olduser) => ({
        ...olduser,
        lname: {
          ...olduser["lname"],
          value: user.lname.value.trim(),
        },
      }));
    }
    if (
      !user.confirmPassword.value ||
      user.confirmPassword.value !== user.password.value
    ) {
      setUser((olduser) => ({
        ...olduser,
        confirmPassword: {
          ...olduser["confirmPassword"],
          error: true,
          helperText: "Passwords are not matching!",
        },
      }));

      err = true;
    }
    if (!validEmail.test(user.email.value)) {
      setUser((prevState) => ({
        ...prevState,
        email: {
          ...prevState["email"],
          error: true,
          helperText: "Please enter a valid E-mail Address!",
        },
      }));
      err = true;
    }
    if (!validPhone.test(user.phone_number.value)) {
      setUser((prevState) => ({
        ...prevState,
        phone_number: {
          ...prevState["phone_number"],
          error: true,
          helperText: "Please enter a valid Phone Number!",
        },
      }));
      err = true;
    }

    return !err;
  };
  const url = "http://localhost:80/carrental/customerReg.php";
  const welcomeurl = "/";
  const onSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("OK");
      fetch(url, {
        method: "POST",

        headers: {
          "Content-Type": "application/jsonp",
        },
        body: JSON.stringify({
          fname: user.fname.value,
          lname: user.lname.value,
          email: user.email.value,
          password: user.password.value,
          phone_number: user.phone_number.value
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res["error"] === "email-exists") {
            setErrorMsg("Email Already Exists!");
            setOpen("true");
            console.log(res["error"]);
          } else {
            console.log(res);
            window.location.replace(
              welcomeurl + "?name=" + user.fname.value
            );
          }
        })
        .catch((err) => {
          setErrorMsg("Server Error!");
          setOpen("true");
          console.log(err);
        });
    }
  };

  return (
    <Stack spacing={3}>
      <form autocmplete="off" onSubmit={onSubmit} autoComplete="off">
        {Object.entries(user).map((key, value) => {
          return (
            <Box sx={{ p: 2 }} key={value}>
              <TextField
                variant="filled"
                required
                fullWidth
                color="primary"
                {...user[key[0]]}
                onChange={onChange}
              />
            </Box>
          );
        })}
        <Box sx={{ p: 2 }}>
          <Button
            variant="contained"
            type="submit"
            fullWidth
            color="primary"
            onClick={onSubmit}
          >
            Sign Up
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
  );
}
