import React from 'react';
import './Home.css';
import ArticlesList from './PublicArticles/ArticlesList';
import TagBox from './Tags/TagBox';
import axios from 'axios';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';

class Home extends React.Component {
    state={
        data: [],
        tags: [],
        currentPage: 1,
        lastId: ''
    }  

    componentDidMount() {
        console.log('Home page component did mount')
        axios.get('/api/posts')
            .then( res => {
                this.setState({ 
                    data: res.data.posts, 
                    tags: res.data.tags 
                });
            }).catch(error => console.log(error));
    }

    // Don't need to care about posts per page because you only receive 13
    // Get last ObjectId for url
    // Call server to get the next 13 posts

    render() {
        return (
            <div className="Home">
                <Grid container spacing={24}>
                    <Grid item xs={9}>
                        <ArticlesList posts={this.state.data}/>
                    </Grid>
                    <Grid item xs={3}>
                        <Card style={{marginTop: "10px"}}>
                            <h3>Popular Tags</h3>
                            <TagBox popularTags={this.state.tags} />
                        </Card>
                    </Grid>
                </Grid>
            </div> 
        )
    }
}

export default Home;
