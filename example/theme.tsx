import { createTheme } from '@mui/material'
import { blue, teal } from '@mui/material/colors'

const theme = createTheme({
  palette: {
    primary: {
      main: blue[400],
    },
    secondary: {
      main: teal[500],
    },
  },
})

export default theme
