import React from 'react'
import {Box, Container, Typography, makeStyles} from '@material-ui/core';

const useStyles = makeStyles(()=>({
    secondaryText: {
        color:"dimgray"
    },
    hub: {
        backgroundColor: "gold",
        paddingLeft: "5px",
        paddingRight: "5px",
        borderRadius: "10px",
        margin: "0px 2px 0px 2px"
    },
    review: {
        marginRight: "5px"
    }
}))

const Front = () => {
    const handleClickShashwat = () => {
        window.open("http://www.github.com/bansal247");
    };
    const handleClickDebashish = () => {
        window.open("http://www.github.com/NotFarFromBlonded");
    };
    const handleClickEmoji = () =>{
        window.open("https://www.youtube.com/watch?v=m4cpJzJrA4I")
    }
    const classes = useStyles();
    return (
        <div>   
            <Box
                sx={{
                
                pt: 8,
                pb: 6,
                }}
            >
                <Container maxWidth="sm">
                    <Typography
                        component="h1"
                        variant="h2"
                        align="center"
                        gutterBottom
                    >
                        <span className={classes.review}>Review</span><span className={classes.hub}>Hub</span>
                    </Typography>
                    <Typography variant="h5" align="center" className = {classes.secondaryText} paragraph>
                        Scrape, View and Export Reviews of your favorite products from Flipkart
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        align="center"
                        component="p"
                        className = {classes.secondaryText}
                    >
                        Developed with <button className="clickEmoji" onClick={handleClickEmoji}><span>&#10084;</span></button> by <button className = "click" onClick={handleClickShashwat}>bansal247</button> and <button className = "click" onClick={handleClickDebashish}>NotFarFromBlonded</button>  
                    </Typography>
                </Container>
            </Box>    
        </div>
    )
}

export default Front