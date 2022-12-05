import { grey } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    "fontFamily": `Quicksand`,
    "fontWeightLight": 400,
    "fontWeightRegular": 500,
    "fontWeightMedium": 600,
    "fontWeightBold": 700,
    button: {
      textTransform: "none"
    }
  },
  palette: {
    primary: {
      main: grey[900],
    },
  },
})

export default theme;