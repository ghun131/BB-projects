import React from 'react';
import TagArticlesList from './TagArticle';
import axios from 'axios';

class ArticlesWithPopularTags extends React.Component {
    state={
        data: []
    }

    componentDidMount() {
        axios.get("/profile/:username/:tag")
            .then(res => {
                this.setState({ data: res.data })
            }).catch(err => console.log(err.message));
    }

    render() {
        return (
            <div>
                <TagArticlesList tagArticlesList={this.state.data}/>
            </div>
        )
    }
}

export default ArticlesWithPopularTags;
