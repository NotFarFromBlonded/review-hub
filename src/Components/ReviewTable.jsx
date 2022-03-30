import React, {useState} from 'react'
import '../App.css';
import {
    makeStyles,
    createTheme,
    ThemeProvider,
    Container,
    TableContainer,
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
        backgroundColor: 'black',
        color: "white",
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
        backgroundColor: '#191919',
    },
    rowNew: {
        color: 'white',
        border: '1px solid #ffffff4a'
    },
    pagination: {
        background: 'black',
        color: 'white'
    },
    table: {
        marginTop: '4rem',
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
            <div className={classes.table}>
            <Container style={{ textAlign: 'center' }} >
                <Paper >
                        <TableContainer className={classes.container}>
                            <Table stickyHeader aria-label="sticky table" >
                                <TableHead >
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
                                <TableBody >
                                    {
                                        theArray.slice(
                                            page * rowsPerPage,
                                            page * rowsPerPage + rowsPerPage
                                        ).map((row, index) => {
                                            return(
                                                <TableRow key = {index} >
                                                    <TableCell
                                                        component="th"
                                                        scope="row"
                                                        align="left"
                                                        key = {row.noid}
                                                        className={classes.rowNew}
                                                    >
                                                        <div style={{ display: 'flex' }}>
                                                            <span>{row.no}</span>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell
                                                        align="left"
                                                        key = {row.byid}
                                                        className={classes.rowNew}
                                                    >
                                                        <div style={{display: 'flex'}}>
                                                            <span>{row.by}</span>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell
                                                        align="center"
                                                        key = {row.itemnameid}
                                                        className={classes.rowNew}
                                                    >
                                                        <div style={{display: 'flex'}}>
                                                            <span>{row.item_name}</span>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell
                                                        align="center"
                                                        key = {row.ratingid}
                                                        className={classes.rowNew}
                                                    >
                                                        <div>
                                                            <span>{row.rating}</span>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell
                                                        align="justify"
                                                        key = {row.ratingheadid}
                                                        className={classes.rowNew}
                                                    >
                                                        <div style={{display: 'flex'}}>
                                                            <p>{row.rating_head}</p>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell
                                                        align="justify"
                                                        key = {row.ratingtextid}
                                                        className={classes.rowNew}
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
                            className = {classes.pagination}
                        />
                </Paper>
            </Container>
            
            </div>
        </ThemeProvider>
    )
}

export default ReviewTable