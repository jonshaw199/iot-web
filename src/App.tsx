import { useEffect, useState } from "react";
import { styled, ThemeProvider } from "@mui/material/styles";

import "./App.css";
import Nav from "./components/Nav";
import Dashboard from "./components/Dashboard";
import Messages from "./components/Messages";
import theme from "./theme";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WS from "./components/WS";
import Users from "./components/Users";
import Settings from "./components/Settings";
import { GlobalUserContext, UserActionType, useUserState } from "./state/user";
import { useMemo } from "react";
import Login from "./components/Login";

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
  const userState = useUserState();
  const { token, dispatch } = userState;

  const loggedIn = useMemo(() => !!token, [token]);

  useEffect(() => {
    if (!loggedIn && localStorage.getItem("token")) {
      dispatch({
        type: UserActionType.AUTH,
        payload: { token: localStorage.getItem("token") },
      });
    }
  }, [loggedIn]);

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <GlobalUserContext.Provider value={userState}>
          <Outer>
            {loggedIn ? (
              <>
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
              </>
            ) : (
              <Login />
            )}
          </Outer>
          <WS
            url={`ws://127.0.0.1:3000/web/ws?orgId=${orgId}&deviceId=${deviceId}`}
          />
        </GlobalUserContext.Provider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
