import React, {useState} from 'react'
import '../App.css';
import {
    makeStyles,
    createTheme,
    ThemeProvider,
    Container,
    TableContainer,
    CircularProgress,
    TableHead,
    TableRow,
    Table,
    TableCell,
    TableBody,
    Paper,
    TablePagination,
  } from '@material-ui/core';
import { ReviewState } from '../Context';

const useStyles = makeStyles(()=>({
    noOfEntriesField: {
        margin: 20,
        width: "100%"
    },
    progress: {
        color:"black"
    },
    tablehead: {
        backgroundColor: "black"
    },
    columnshead: {
        color: "black",
        fontFamily: ['"B612 Mono"','monospace'].join(','),
        fontWeight: "bold",
    },
    row: {
        display: "flex",
    },
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    }
   
}))

const ReviewTable = () => {
    const classes = useStyles();
    const {theArray, loading} = ReviewState();
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(0);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const theme = createTheme({
        palette: {
            type: 'light'
        },
    })

    return (
        <ThemeProvider theme = {theme}>
            <div>
            <Container style={{ textAlign: 'center' }} >
                <Paper >
                {((loading) ? (
                    <CircularProgress className={classes.progress} />
                ) : ((theArray.length===0)?"":(
                     <>
                        <TableContainer className={classes.container}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead className={classes.tablehead}>
                                    <TableRow>
                                    {['No.', 'By', 'Item Name', 'Rating', 'Rating Head', 'Comment'].map((column) => (
                                        <TableCell
                                        key={column}
                                        align={
                                            ((column === 'No.')? 'left' : 'center')
                                        }
                                        className={classes.columnshead}
                                        >
                                        {column}
                                        </TableCell>
                                    ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        theArray.slice(
                                            page * rowsPerPage,
                                            page * rowsPerPage + rowsPerPage
                                        ).map((row, index) => {
                                            return(
                                                <TableRow key = {index}>
                                                    <TableCell
                                                        component="th"
                                                        scope="row"
                                                        align="left"
                                                        key = {row.noid}
                                                    >
                                                        <div style={{ display: 'flex' }}>
                                                            <span>{row.no}</span>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell
                                                        align="left"
                                                        key = {row.byid}
                                                    >
                                                        <div style={{display: 'flex'}}>
                                                            <span>{row.by}</span>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell
                                                        align="center"
                                                        key = {row.itemnameid}
                                                    >
                                                        <div style={{display: 'flex'}}>
                                                            <span>{row.item_name}</span>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell
                                                        align="center"
                                                        key = {row.ratingid}
                                                    >
                                                        <div>
                                                            <span>{row.rating}</span>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell
                                                        align="justify"
                                                        key = {row.ratingheadid}
                                                    >
                                                        <div style={{display: 'flex'}}>
                                                            <p>{row.rating_head}</p>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell
                                                        align="justify"
                                                        key = {row.ratingtextid}
                                                    >
                                                        <div>
                                                            <p>{row.rating_text}</p>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[10, 25, 100]}
                            component="div"
                            count={theArray.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </>
                )))}
                </Paper>
            </Container>
            
            </div>
        </ThemeProvider>
    )
}

export default ReviewTable