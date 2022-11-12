import { TextField, styled, Button } from "@mui/material";
import { Box, useTheme } from "@mui/system";
import { useState } from "react";

const Error = styled("div")(({ theme }) => ({
  color: "red",
  paddingTop: theme.spacing(1),
}));

export default function Login() {
  const theme = useTheme();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  return (
    <Box>
      <Box display="flex" gap={1} flexWrap="wrap">
        <TextField
          required
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          required
          label="Password"
          type="password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
      </Box>
      {error && <Error>{error}</Error>}
      <Box pt={theme.spacing(1)}>
        <Button variant="outlined" onClick={() => null}>
          Submit
        </Button>
      </Box>
    </Box>
  );
}
