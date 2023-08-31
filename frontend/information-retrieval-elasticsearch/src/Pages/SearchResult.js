import { useState, Fragment, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getByTerm } from '../services/api';
import {
    TextField,
    Button,
    Grid,
    List,
    ListItem,
    ListItemText,
    Typography,
    Divider,
    Skeleton
} from '@mui/material';


function SearchResult() {
    const { terms } = useParams();
    const [isLoading, setIsLoading] = useState(false)
    const [results, setResults] = useState([])

    useEffect(() => {
        fetchTerm(terms);
      }, []);

    const fetchTerm = async (term) => {
        setIsLoading(true);
        try {
            const { data } = await getByTerm(term);
            setResults(data)
            setIsLoading(false);
        } catch (err) {
            setIsLoading(false);
        }
    }

    const buildSkeletonList = () => (
        <>
            <ListItem alignItems="flex-start">
                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="flex-start">
                    <Skeleton variant="rounded" width={210} height={20} />
                    <Skeleton variant="rounded" width={420} height={20} sx={{ marginTop: 1 }} />
                </Grid>
            </ListItem>
            <Divider component="li" />
            <ListItem alignItems="flex-start">
                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="flex-start">
                    <Skeleton variant="rounded" width={210} height={20} />
                    <Skeleton variant="rounded" width={420} height={20} sx={{ marginTop: 1 }} />
                </Grid>
            </ListItem>
            <Divider component="li" />
            <ListItem alignItems="flex-start">
                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="flex-start">
                    <Skeleton variant="rounded" width={210} height={20} />
                    <Skeleton variant="rounded" width={420} height={20} sx={{ marginTop: 1 }} />
                </Grid>
            </ListItem>
            <Divider component="li" />
            <ListItem alignItems="flex-start">
                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="flex-start">
                    <Skeleton variant="rounded" width={210} height={20} />
                    <Skeleton variant="rounded" width={420} height={20} sx={{ marginTop: 1 }} />
                </Grid>
            </ListItem>
            <Divider component="li" />
            <ListItem alignItems="flex-start">
                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="flex-start">
                    <Skeleton variant="rounded" width={210} height={20} />
                    <Skeleton variant="rounded" width={420} height={20} sx={{ marginTop: 1 }} />
                </Grid>
            </ListItem>
            <Divider component="li" />
        </>

    );

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
                                        {result._source.body}
                                    </Typography>
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
                    value={terms}
                    sx={{ marginTop: 3 }}
                />

                <Button variant="contained"
                    sx={{ marginLeft: 3, marginTop: 3 }}
                >
                    Pesquisar
                </Button>
            </Grid>

            <List sx={{ width: '50%', bgcolor: 'background.paper' }}>
                {isLoading ? buildSkeletonList() : buildSearchList()}
            </List>
        </Grid>
    );
}

export default SearchResult;
