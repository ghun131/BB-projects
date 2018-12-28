import React from 'react';
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

class Heading extends React.Component {
    render() {
        return (
            <div>
                <Grid container spacing={24}>
                    <Grid item xs={9}
                        style={{display: "flex", alignItems: "center"}}>
                        <h1 style={{marginRight: "20px"}}>
                            {localStorage.getItem('author')}
                        </h1>
                        <Button 
                            variant="outlined"
                            disableRipple
                            style={{width: "100px", height: "30px", 
                                padding: "0 8px", textTransform: "none"}}>
                                    Edit profile
                        </Button>
                    </Grid>
                    <Grid item xs={3}>Avatar</Grid>
                </Grid>
            </div>
        )
    }
}

export default Heading;