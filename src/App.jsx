import React, { useState, useEffect } from "react";
// import API from Amplify library
import { API } from "aws-amplify";
// import query definition
import { listUsers } from "./graphql/queries";

import { styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

const theme = createTheme({
  palette: {
    primary: {
      main: "#000000",
    },
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
});
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  boxShadow: "none",
}));

const steps = [
  "Select master blaster campaign settings",
  "Create an ad group",
  "Create an ad",
];

export default function App() {
  const [user, setUsers] = useState([]);
  const [step, setStep] = useState(1);

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      name: data.get("name"),
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  async function fetchUsers() {
    try {
      const postData = await API.graphql({ query: listUsers });
      setUsers(postData.data.listUsers.items);
    } catch (err) {
      console.log({ err });
    }
  }
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container>
          <Grid item xs={12} sm={8}>
            test
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            container
            direction="column"
            justifyContent="space-around"
            alignItems="left"
            padding={6}
          >
            <Grid item>
              <Item gutterBottom>
                <img src="/logo.png" width="166px" />
              </Item>
            </Grid>
            <Grid
              container
              item
              direction="column"
              justifyContent="space-between"
            >
              <Grid item>
                <Typography variant="h1" gutterBottom fontWeight={700}>
                  Welcome
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h5" gutterBottom>
                  Subscribe Amazon Highlights
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Item>
                <TextField
                  id="outlined-basic"
                  label="Name"
                  variant="outlined"
                />
              </Item>
            </Grid>
            <Grid item>
              <Item>
                <Stepper activeStep={step - 1} alternativeLabel>
                  {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Item>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}
