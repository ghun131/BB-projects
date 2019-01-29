import React from 'react';
import { Link } from 'react-router-dom'
import { Subscribe } from 'unstated';
import UserContainer from '../containers/UserContainer';
import PostContainer from '../containers/PostContainer';

class Profile extends React.Component {

    componentDidMount = () => {
        let authorArr = this.props.location.pathname.split("/");
        let author = authorArr[authorArr.length - 1]
        PostContainer.getUserPosts(author)
    }

    render() {
        return (
            <Subscribe to={[UserContainer, PostContainer]}>
                {
                    (userThings, postThings) => (
                        <div className="profile-page">
                        {console.log(postThings, userThings)}
                        <div className="user-info">
                            <div className="container">
                                <div className="row">
                                    {
                                        postThings.state.author[0] ? 
                                        <div className="col-xs-12 col-md-10 offset-md-1">
                                            <img src={postThings.state.author[0].avaUrl} className="user-img" />
                                            <h4>{postThings.state.author[0].username}</h4>
                                            <p>
                                                {postThings.state.author[0].biography}
                                            </p>
                                            <button className="btn btn-sm btn-outline-secondary action-btn">
                                                <i className="ion-plus-round"></i>
                                                &nbsp;
                                                Follow &nbsp; {postThings.state.author[0].username}
                                            </button>
                                        </div> :
                                        ""
                                    }
                                </div>
                            </div>
                        </div>
    
                        <div className="container">
                            <div className="row">
    
                                <div className="col-xs-12 col-md-10 offset-md-1">
                                    <div className="articles-toggle">
                                    <ul className="nav nav-pills outline-active">
                                        <li className="nav-item">
                                        <Link className="nav-link active" to="">My Articles</Link>
                                        </li>
                                        <li className="nav-item">
                                        <Link className="nav-link" to="">Favorited Articles</Link>
                                        </li>
                                    </ul>
                                    </div>
    
                                    {
                                        postThings.state.data[0] ?
                                        postThings.state.data.map( p => 
                                            <div className="article-preview">
                                                <div className="article-meta">
                                                    <Link to=""><img src={p.avaUrl} /></Link>
                                                    <div className="info">
                                                    <Link to="" className="author">{p.author}</Link>
                                                    <span className="date">{PostContainer.displayTime(p.time)}</span>
                                                    </div>
                                                    <button className="btn btn-outline-primary btn-sm pull-xs-right">
                                                    <i className="ion-heart"></i> {p.love}
                                                    </button>
                                                </div>
                                                <Link to="" className="preview-link">
                                                    <h1>{p.title}</h1>
                                                    <p style={{overflow: "hidden", height: "1.5rem"}}>
                                                        {p.content}
                                                    </p>
                                                    <span>Read more...</span>
                                                    <ul className="tag-list">
                                                        {
                                                            p.tags ? 
                                                            p.tags.map( t => 
                                                                <li key={t} className="tag-default tag-pill tag-outline">
                                                                    {t}
                                                                </li>
                                                            ) : ""
                                                        }
                                                    </ul>
                                                </Link>
                                            </div>
                                        ): <div>Loading articles...</div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    )
                }
            </Subscribe>
        )
    }
}

export default Profile;