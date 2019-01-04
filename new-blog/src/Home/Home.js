import React from 'react';
import './Home.css';
import ArticlesList from './PublicArticles/ArticlesList';
import TagBox from './Tags/TagBox';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';

class Home extends React.Component {
    state={
        data: []
    }  

    componentDidMount() {
        console.log('pagination!')
    }
    render() {
        console.log('data that Home receive', this.props)    
        return (
            <div className="Home">
                <Grid container spacing={24}>
                    <Grid item xs={9}>
                        <ArticlesList posts={this.props.allPosts}/>
                    </Grid>
                    <Grid item xs={3}>
                        <Card style={{marginTop: "10px"}}>
                            <h3>Popular Tags</h3>
                            <TagBox popularTags={this.props.hotTags} />
                        </Card>
                    </Grid>
                </Grid>
            </div> 
        )
    }
}

export default Home;
