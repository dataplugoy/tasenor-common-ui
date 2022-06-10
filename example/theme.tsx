import { createTheme } from '@mui/material'
import { green, yellow } from '@mui/material/colors'

const theme = createTheme({
  palette: {
    primary: {
      main: green[400],
    },
    secondary: {
      main: yellow[500],
    },
  },
})

export default theme
