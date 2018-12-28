import React from 'react';
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

class Heading extends React.Component {
    render() {
        return (
            <div>
                <Grid container spacing={24}>
                    <Grid item xs={3}>
                        <h1>{localStorage.getItem('author')}</h1>
                        <Button variant="outlined">
                            Edit profile
                        </Button>
                    </Grid>
                    <Grid item xs={6}></Grid>
                    <Grid item xs={3}>Avatar</Grid>
                </Grid>
            </div>
        )
    }
}

export default Heading;