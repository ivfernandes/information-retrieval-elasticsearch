import * as React from 'react';
import { Container, TextField, Button } from '@mui/material';

function Main() {
  return (
    <Container
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <TextField
        id="outlined-basic"
        variant="outlined"
        placeholder='Pesquisar...'
        fullWidth
      />

      <Button variant="contained"
        size="large"
        sx={{ marginTop: 3 }}
        >
        Pesquisar
      </Button>
    </Container>
  );
}

export default Main;
