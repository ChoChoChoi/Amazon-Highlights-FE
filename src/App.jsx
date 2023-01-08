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
import Slide from "@mui/material/Slide";

const theme = createTheme({
  palette: {
    primary: {
      main: "#000000",
    },
    secondary: {
      main: "#fec934",
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
  height: "100vh",
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

  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(theme.palette.secondary.main),
    backgroundColor: theme.palette.secondary.main,
    "&:hover": {
      backgroundColor: theme.palette.getContrastText(
        theme.palette.secondary.main
      ),
      color: theme.palette.secondary.main,
    },
  }));

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
      <Box sx={{ flexGrow: 1, minHeight: "100vh" }} height="100vh">
        <Grid container sx={{ height: "100vh" }}>
          <Grid item xs={12} sm={8} alignItems="center" justifyContent="center">
            <Box
              bgcolor={theme.palette.primary.main}
              component={Grid}
              xs={12}
              display={{ xs: "none", lg: "flex" }}
              color={theme.palette.getContrastText(theme.palette.primary.main)}
              justifyContent="center"
              alignItems="center"
              minHeight="100vh"
            >
              <Typography variant="h4" gutterBottom>
                Amazon Highlights
              </Typography>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            container
            direction="column"
            justifyContent="space-between"
            alignItems="left"
            padding={7}
            minHeight="100vh"
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
              <Grid item container direction="column">
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
              <Grid
                item
                container
                direction="column"
                paddingTop={8}
                paddingBottom={8}
                justifyContent="space-between"
              >
                <Grid item>
                  <Typography gutterBottom fontWeight={700}>
                    Subscribe Amazon Highlights
                  </Typography>
                </Grid>
                <Grid item>
                  <TextField
                    id="outlined-basic"
                    label="Name"
                    variant="outlined"
                    sx={{
                      width: { sm: 200, md: 400 },
                    }}
                  />
                </Grid>
              </Grid>
              <Grid item paddingBottom={8}>
                <ColorButton sx={{ width: 200, padding: 1 }}>Next</ColorButton>
              </Grid>
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
