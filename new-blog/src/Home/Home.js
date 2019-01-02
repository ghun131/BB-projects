import React from 'react';
import './Home.css';
import Article from './Article';
import TagCard from './TagCard';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';

class Home extends React.Component {    
    render() {
        const posts = this.props.allPosts.map(p => {
            return <Article key={p._id} {...p}/>
        })

        const tags = this.props.hotTags.map(t => {
            return <TagCard key={t._id} {...t} />
        })

        return (
            <div className="Home">
                <Grid container spacing={24}>
                    <Grid item xs={9}>
                        {posts}
                    </Grid>
                    <Grid item xs={3}>
                        <Card style={{marginTop: "10px"}}>
                            <h1>Popular Tags</h1>
                            {tags}
                        </Card>
                    </Grid>
                </Grid>
            </div> 
        )
    }
}

export default Home;
