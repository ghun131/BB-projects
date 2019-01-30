import React from 'react';
import { Link } from 'react-router-dom';
import PostContainer from '../containers/PostContainer';
import { Subscribe } from 'unstated';

class ArticlePreview extends React.Component {
    render() {
        return (
            <Subscribe to={[PostContainer]}>
                {
                    postThings => (
                        <div className="article-preview" key={this.props._id}>
                            <div className="article-meta">
                                <Link to={`/profile/${this.props.author}`}>
                                    <img src={this.props.avaUrl} />
                                </Link>
                                <div className="info">
                                    <Link to={`/profile/${this.props.author}`} className="author">
                                        {this.props.author}
                                    </Link>
                                    <span className="date">{PostContainer.displayTime(this.props.time)}</span>
                                </div>
                                <button className="btn btn-outline-primary btn-sm pull-xs-right">
                                    <i className="ion-heart"></i> {this.props.love}
                                </button>
                            </div>
                            <Link to={`/article/${this.props._id}`} className="preview-link">
                                <h1>{this.props.title}</h1>
                                <p style={{overflow: "hidden", height: "1.5rem"}}>
                                    {this.props.content}
                                </p>
                                <span>Read more...</span>
                                <ul className="tag-list">
                                    {
                                        this.props.tags ? 
                                        this.props.tags.map( t => 
                                            <li key={t} className="tag-default tag-pill tag-outline">
                                                {t}
                                            </li>
                                        ) : ""
                                    }
                                </ul>
                            </Link>
                        </div>
                    )
                }
            </Subscribe>
        )
    }
}

export default ArticlePreview;