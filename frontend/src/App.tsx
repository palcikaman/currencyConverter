import * as React from 'react'
import {Container, Typography} from "@mui/material";
import Converter from "./components/Converter";

function App() {

  return (<>
    <Typography variant='h1' sx={{
      fontSize: 36,
      textAlign: 'center',
      marginBottom: 2
    }}>
      Convert Currencies
    </Typography>
    <Container maxWidth='md'>
      <Converter />
    </Container>
  </>)
}

export default App
