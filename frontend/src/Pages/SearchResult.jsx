import { useState, Fragment, useEffect } from 'react';
import * as React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { getByTerm, getByTermV2 } from '../services/api';
import {
    TextField,
    Button,
    Grid,
    List,
    ListItem,
    ListItemText,
    Typography,
    Divider,
    Skeleton,
    Switch,
    FormGroup,
    FormControlLabel,
    FormLabel
} from '@mui/material';


function SearchResult() {
    const { terms } = useParams();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const v2Param = searchParams.get("v2");
    const [searchString, setSearchString] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [results, setResults] = useState([]);
    const [responseTime, setResponseTime] = useState('');
    const [isV2, setIsV2] = useState(false);
    const [state, setState] = React.useState({
        v2: false,
    });

    const handleChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.checked,
        });
        setIsV2(event.target.checked);
    };

    useEffect(() => {
        setIsV2(v2Param === "true" ? true : false);
        setSearchString(terms);
        fetchTerm(searchString);
    }, [terms, v2Param]);

    const fetchTerm = async (term) => {
        const startTime = new Date()
        setResponseTime('')
        setIsLoading(true);
        try {
            if (isV2) {
                const { data } = await getByTermV2(term);
                setResults(data)
                setIsLoading(false);
                const endTime = new Date();
                const timeDifference = endTime - startTime;
                const timeInSeconds = (timeDifference / 1000).toFixed(2);
                setResponseTime(timeInSeconds + 's')
            } else {
                const { data } = await getByTerm(term);
                setResults(data)
                setIsLoading(false);
                const endTime = new Date();
                const timeDifference = endTime - startTime;
                const timeInSeconds = (timeDifference / 1000).toFixed(2);
                setResponseTime(timeInSeconds + 's')
            }
        } catch (err) {
            setIsLoading(false);
        }
    }

    const handleClickSearch = () => {
        fetchTerm(searchString);
    };

    const buildSkeletonList = () => {
        const numberOfItems = 15; // Número de itens desejado

        const listItemData = Array.from({ length: numberOfItems }, (_, index) => ({
            key: index,
            width1: 210,
            height1: 20,
            width2: 420,
            height2: 20,
        }));

        return (
            <>
                {listItemData.map(({ key, width1, height1, width2, height2 }) => (
                    <Fragment key={key}>
                        <ListItem alignItems="flex-start">
                            <Grid
                                container
                                direction="column"
                                justifyContent="center"
                                alignItems="flex-start"
                            >
                                <Skeleton variant="rounded" width={width1} height={height1} />
                                <Skeleton
                                    variant="rounded"
                                    width={width2}
                                    height={height2}
                                    sx={{ marginTop: 1 }}
                                />
                            </Grid>
                        </ListItem>
                        <Divider component="li" />
                    </Fragment>
                ))}
            </>
        );
    };

    const buildSearchList = () => (
        <>
            {results.map((result) => (
                <>
                    <ListItem alignItems="flex-start">
                        <ListItemText
                            primary={result._source.title}
                            secondary={
                                <Fragment>
                                    <Typography
                                        sx={{ display: 'inline' }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >
                                        {result._source.body.length > 500 ? `${result._source.body.slice(0, 500)}...` : result._source.body}
                                    </Typography>
                                    <br></br>
                                    <br></br>
                                    <Typography
                                        sx={{ display: 'inline' }}
                                        component="span"
                                        variant="subtitle2"
                                        color="text.primary"
                                    >
                                        Aparece em:
                                    </Typography>
                                    {result.highlight.body.map((highlight, index) => (
                                        <>
                                            <div
                                                key={index}
                                                dangerouslySetInnerHTML={{ __html: highlight }}
                                            />
                                            <br></br>
                                        </>
                                    ))}

                                </Fragment>
                            }
                        />
                    </ListItem>
                    <Divider component="li" />
                </>

            ))}

        </>
    );

    return (
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center">
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center">

                <TextField
                    id="outlined-basic"
                    variant="outlined"
                    placeholder='Pesquisar...'
                    value={searchString}
                    fullWidth
                    sx={{ marginTop: 3, width: '30%' }}
                    onChange={(event) => setSearchString(event.target.value)}
                />

                <Button variant="contained"
                    sx={{ marginLeft: 3, marginTop: 3 }}
                    onClick={handleClickSearch}
                >
                    Pesquisar
                </Button>
            </Grid>

            <FormGroup row={true} sx={{ width: '37.5%', marginTop: 1, textAlign: 'left' }} >
                <FormLabel sx={{ marginTop: 1, marginRight: 1.5 }}>V1</FormLabel>
                <FormControlLabel
                    value="end"
                    control={<Switch color="primary" checked={isV2} onChange={handleChange} name="v2" />}
                    label="V2"
                    labelPlacement="end"
                />
            </FormGroup>

            <Typography sx={{ width: '37.5%', marginTop: 1, textAlign: 'left' }}>
                Resultado obtido em: {responseTime}
            </Typography>
            <List sx={{ width: '50%', bgcolor: 'background.paper', marginBottom: 2 }}>
                {isLoading ? buildSkeletonList() : buildSearchList()}
            </List>
        </Grid>
    );
}

export default SearchResult;
