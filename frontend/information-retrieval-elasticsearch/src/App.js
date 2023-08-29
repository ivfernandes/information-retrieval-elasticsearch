import * as React from 'react';
import { Container, TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

function App() {
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
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              <IconButton>
                <SearchIcon/>
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Container>
  );
}

export default App;
