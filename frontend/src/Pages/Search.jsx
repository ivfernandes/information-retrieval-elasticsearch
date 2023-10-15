import * as React from 'react';
import { useState } from 'react';
import { Container, TextField, Button, Switch, FormGroup, FormControlLabel, FormLabel} from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Search() {
    const [searchString, setSearchString] = useState('');
    const [state, setState] = React.useState({
        v2: false,
      });
    
      const handleChange = (event) => {
        setState({
          ...state,
          [event.target.name]: event.target.checked,
        });
      };

    const handleClickSearch = () => {
        navigate(`/${searchString}?v2=${state.v2}`)
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


            <FormGroup row={true} sx={{ marginTop: 3 }} >
                <FormLabel sx={{ marginTop: 1, marginRight: 1.5 }}>V1</FormLabel>
                <FormControlLabel
                    value="end"
                    control={<Switch color="primary" onChange={handleChange} name="v2" />}
                    label="V2"
                    labelPlacement="end"
                />
            </FormGroup>


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
