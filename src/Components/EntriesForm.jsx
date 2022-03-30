import React from 'react'
import { makeStyles, ThemeProvider, createTheme} from '@material-ui/core';
import { ReviewState } from '../Context';
import {CSVLink} from "react-csv";
import '../App.css';

const useStyles = makeStyles(()=>({
    progress: {
        color:"black"
    },
    csv: {
        color:"white"
    }
}))

const EntriesForm = () => {
    const classes = useStyles();
    const {item, bindItem,bindSize, theArray,loading, handleSubmit, headers} = ReviewState();  
    
    const theme = createTheme({
        palette: {
            type: 'light'
        },
    })

    return (
        <ThemeProvider theme = {theme}>
            <div className="card m-3 mx-auto" style={{backgroundColor:"black", borderRadius: "0.5rem"}}>
                <div className="card-body" style={{background:"black", borderRadius: "0.25rem"}}>
                    <form onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="form-group col">
                                <label style={{color:"white"}}>Item</label>
                                <input name="item" type="text" {...bindItem} className="form-control"/>
                            </div>
                            <div className="form-group col">
                                <label style={{color:"white"}}>No. of Entries</label>
                                <input name="noOfEntries" type="number" {...bindSize} className="form-control"/>
                            </div>
                        </div>
                        <div className="form-row" style={{justifyContent:"space-between"}}>
                            <div style={{marginLeft:"5px"}}>
                                <button type="submit" className="btn btn-primary mr-1" disabled={loading}>Submit</button>
                            </div>
                            <div>
                                {(theArray.length===0)?<button type="button" className="btn btn-success mr-1" disabled={(theArray.length===0)||loading}>Export as CSV</button>:<CSVLink data = {theArray} headers = {headers} className={classes.csv} filename={`ReviewHubContent.csv`}><button type="button" className="btn btn-success mr-1" disabled={(theArray.length===0)||loading}>Export as CSV</button></CSVLink>}
                                {(theArray.length===0)?<button type="button" className="btn btn-warning mr-1" disabled={(theArray.length===0)||loading}>Export as JSON</button>:<a href={`data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(theArray))}`} download={`${item}.txt`} styles={{color:"white"}}><button type="button" className="btn btn-warning mr-1" disabled={(theArray.length===0)||loading}>Export as JSON</button></a>}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </ThemeProvider>
    )
}

export default EntriesForm