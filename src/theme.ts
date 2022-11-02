import { createTheme } from "@mui/material";

declare module '@mui/material/styles' {
  interface Theme {
    drawer: {
      width: number;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    drawer?: {
      width?: number;
    };
  }
}

export default createTheme({
  drawer: {
    width: 240,
  },
});