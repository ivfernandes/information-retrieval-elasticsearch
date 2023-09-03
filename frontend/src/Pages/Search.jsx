import * as React from 'react';
import { useState } from 'react';
import { Container, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Search() {
    const [searchString, setSearchString] = useState('');

    const handleClickSearch = () => {
        navigate(`/${searchString}`)
    };
    const navigate = useNavigate();

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
                onChange={(event) => setSearchString(event.target.value)}
            />

            <Button variant="contained"
                size="large"
                sx={{ marginTop: 3 }}
                onClick={handleClickSearch}
            >
                Pesquisar
            </Button>
        </Container>
    );
}

export default Search;
