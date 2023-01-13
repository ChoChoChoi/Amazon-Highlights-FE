import React, { useState, useEffect } from "react";
// import API from Amplify library
import { API, graphqlOperation } from "aws-amplify";
// import query definition
import { listUsers } from "./graphql/queries";

import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import IconButton from "@mui/material/IconButton";
import { createUser } from "./graphql/mutations";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import DeleteIcon from "@mui/icons-material/Delete";
import Collapse from "@mui/material/Collapse";
import { TransitionGroup } from "react-transition-group";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";

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

const steps = ["Name", "Email", "Topic"];

const tags = [
  "Compute",
  "Database",
  "Analytics",
  "Machine Learning",
  "Internet of Things",
  "Storage",
  "Front-end Web & Mobile",
  "Networking",
];
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function App() {
  const [user, setUsers] = useState({ email: "", name: "" });
  const [step, setStep] = useState(1);
  const [tagsInBasket, setTagsInBasket] = useState(tags);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  useEffect(() => {
    // fetchUsers();
  }, []);

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

  async function createUserFunction() {
    // https://aws.amazon.com/blogs/mobile/build-real-time-multi-user-experiences-using-graphql-on-aws-amplify/
    //https://github.com/SamWSoftware/amplify-react-tutorial-project/blob/amplify-upload/src/App.jsx
    try {
      const userdata = {
        // id: unstable_useId(),
        name: user.name,
        email: user.email,
        tag: tagsInBasket,
      };
      console.log(userdata);
      await API.graphql(graphqlOperation(createUser, { input: userdata }));
    } catch (e) {
      console.log({ e });
    }
  }

  const handleonClick = () => {
    if (step === 1 || step === 2) setStep(step + 1);
    if (step === 3) {
      setOpen(true);
      console.log(open);
      createUserFunction();
      setStep(1);
    }
  };

  function renderItem({ item, handleRemoveTag }) {
    return (
      <ListItem
        secondaryAction={
          <IconButton
            edge="end"
            aria-label="delete"
            title="Delete"
            onClick={() => handleRemoveTag(item)}
          >
            <DeleteIcon />
          </IconButton>
        }
      >
        <ListItemText primary={item} />
      </ListItem>
    );
  }
  const handleAddTag = () => {
    const nextHiddenItem = tags.find((i) => !tagsInBasket.includes(i));
    if (nextHiddenItem) {
      setTagsInBasket((prev) => [nextHiddenItem, ...prev]);
    }
  };

  const handleRemoveTag = (item) => {
    setTagsInBasket((prev) => [...prev.filter((i) => i !== item)]);
  };

  const addTagButton = (
    <Button
      variant="contained"
      disabled={tagsInBasket.length >= tags.length}
      onClick={handleAddTag}
    >
      Undo
    </Button>
  );

  function handlePrev() {
    setStep(step - 1);
  }
  const handleFormChange = (e) => {
    setUsers({
      ...user,
      [e.target.name]: e.target.value,
    });
    // console.log(user);
  };
  const text = [
    { text: "What should we call you?", var: "name" },
    { text: "What's your email address?", var: "email" },
    { text: "What are your interests?", var: "tag" },
  ];

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1, minHeight: "100vh" }} height="100vh">
        <Grid container sx={{ minheight: "100vh" }}>
          <Grid
            item
            xs={12}
            sm={8}
            alignItems="center"
            justifyContent="center"
            minHeight="100vh"
          >
            <Box
              // bgcolor={theme.palette.primary.main}
              sx={{
                // background: "conic-gradient(from 295deg, #FFAD0D, #010101)",
                /* Created with https://www.css-gradient.com */
                background:
                  "radial-gradient(ellipse at center, #B08030, #030425)",
                /* Created with https://www.css-gradient.com */
              }}
              // fec934
              component={Grid}
              xs={12}
              display={{ xs: "none", lg: "flex" }}
              color={theme.palette.getContrastText(theme.palette.primary.main)}
              justifyContent="center"
              alignItems="center"
              minHeight="100vh"
              // height="100vh"
              height="100%"
              columnSpacing={12}
            >
              <Card
                sx={{
                  minHeight: "280px",
                  width: "100%",
                  height: "auto",
                  maxWidth: "300px",
                  marginRight: "10%",
                  background: "transparent",
                  boxShadow: "none",
                }}
              >
                <CardMedia
                  component="img"
                  minHeight="280px"
                  image="/mockup.png"
                />
              </Card>
              <Box>
                <Typography variant="h3" gutterBottom fontWeight={700}>
                  Amazon Highlights
                </Typography>
                <Typography sx={{ width: "50vh" }} gutterTop fontWeight={400}>
                  <br />
                  Amazon Highlights aims to assist Amazon employees to better
                  self-serve and provide a personalized, first glance to newly
                  released information across multiple channels. By connecting
                  to available information distribution channels (ex. youtube),
                  <br /> <br />
                  Amazon Highlights would first scan newly uploaded content on a
                  weekly basis, summarize the information and provide it to the
                  user as a newsletter format if it matches the user defined
                  keyword. <br /> <br />
                  With Amazon Highlight, users will not have to manually search
                  and review information spread across multiple channels. On top
                  of being able to summarize text, Amazon Highlights also
                  provides a unique feature that also summarizes video content
                  such as broadcast or meeting recordings.
                </Typography>
              </Box>
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
                    {text[step - 1].text}
                  </Typography>
                </Grid>
                {step === 1 && (
                  <>
                    <Grid item paddingTop={2}>
                      <TextField
                        id="outlined-basic"
                        label={text[step - 1].var}
                        variant="outlined"
                        sx={{
                          width: { xs: 300, md: 400 },
                        }}
                        name="name"
                        onChange={handleFormChange}
                      />
                    </Grid>
                  </>
                )}
                {step === 2 && (
                  <>
                    <Grid item paddingTop={2}>
                      <TextField
                        id="outlined-basic"
                        label={text[step - 1].var}
                        variant="outlined"
                        sx={{
                          width: { xs: 300, md: 400 },
                        }}
                        name="email"
                        onChange={handleFormChange}
                      />
                    </Grid>
                  </>
                )}
                {step === 3 && (
                  <>
                    {addTagButton}
                    <Box sx={{ mt: 1 }}>
                      <List>
                        <TransitionGroup>
                          {tagsInBasket.map((item) => (
                            <Collapse key={item}>
                              {renderItem({ item, handleRemoveTag })}
                            </Collapse>
                          ))}
                        </TransitionGroup>
                      </List>
                    </Box>
                    <Modal
                      aria-labelledby="transition-modal-title"
                      aria-describedby="transition-modal-description"
                      open={open}
                      onClose={handleClose}
                      closeAfterTransition
                      BackdropComponent={Backdrop}
                      BackdropProps={{
                        timeout: 500,
                      }}
                    >
                      <Fade in={open}>
                        <Box sx={style}>
                          <Typography
                            id="transition-modal-title"
                            variant="h6"
                            component="h2"
                          >
                            Text in a modal
                          </Typography>
                          <Typography
                            id="transition-modal-description"
                            sx={{ mt: 2 }}
                          >
                            Duis mollis, est non commodo luctus, nisi erat
                            porttitor ligula.
                          </Typography>
                        </Box>
                      </Fade>
                    </Modal>
                  </>
                )}
              </Grid>
              <Grid
                item
                paddingBottom={8}
                container
                direction="column"
                alignItems="flex-start"
              >
                {step !== 3 && (
                  <ColorButton
                    sx={{ width: 200, padding: 1 }}
                    onClick={handleonClick}
                  >
                    Next
                  </ColorButton>
                )}
                {step === 3 && (
                  <ColorButton
                    sx={{ width: 200, padding: 1 }}
                    onClickCapture={handleonClick}
                    onClick={handleonClick}
                  >
                    Submit
                  </ColorButton>
                )}

                {step !== 1 && (
                  <>
                    <Button onClick={handlePrev}>previous</Button>
                  </>
                )}
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
