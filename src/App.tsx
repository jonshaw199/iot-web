import React, { useMemo, useState } from "react";
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
import Users from "./components/Users";
import Settings from "./components/Settings";
import useUserState from "./actions/user";

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

const Outer = styled("div")(({ theme }) => ({
  height: "100vh",
  backgroundColor: theme.page.backgroundColor,
}));

const orgId = 1;
const deviceId = -1;

function App() {
  const [open, setOpen] = useState(false);
  const [messages] = useState<Message[]>([
    { senderID: 1, state: 2, transportType: 3, type: 4 },
  ]);

  const userState = useUserState();
  const { users: userMap } = userState;
  const users = useMemo(() => Array.from(userMap.values()), [userMap]);

  return (
    <GlobalContext.Provider value={{ messages, users }}>
      <Router>
        <ThemeProvider theme={theme}>
          <Outer>
            <Nav
              open={open}
              onOpen={() => setOpen(true)}
              onClose={() => setOpen(false)}
            />
            <Main open={open}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="messages/" element={<Messages />} />
                <Route path="users/" element={<Users />} />
                <Route path="settings/" element={<Settings />} />
              </Routes>
            </Main>
          </Outer>
          <WS
            url={`ws://127.0.0.1:3000/web/ws?orgId=${orgId}&deviceId=${deviceId}`}
          />
        </ThemeProvider>
      </Router>
    </GlobalContext.Provider>
  );
}

export default App;
