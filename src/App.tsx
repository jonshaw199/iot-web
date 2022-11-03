import React, { useState } from "react";
import { styled, ThemeProvider } from "@mui/material/styles";

import { Message } from "@backend/types";

import "./App.css";
import Nav from "./components/Nav";
import Dashboard from "./components/Dashboard";
import Messages from "./components/Messages";
import theme from "./theme";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WS from "./components/WS";
import { GlobalContext } from "./Context";

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  padding: theme.spacing(1),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: 0,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: theme.drawer.width,
  }),
}));

function App() {
  const [open, setOpen] = useState(false);
  const [messages] = useState<Message[]>([
    { senderID: 1, state: 2, transportType: 3, type: 4 },
  ]);

  return (
    <GlobalContext.Provider value={{ messages }}>
      <Router>
        <ThemeProvider theme={theme}>
          <Nav
            open={open}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
          />
          <Main open={open}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="messages/" element={<Messages />} />
            </Routes>
          </Main>
          <WS url="ws://127.0.0.1:3000/1/web/ws" />
        </ThemeProvider>
      </Router>
    </GlobalContext.Provider>
  );
}

export default App;
