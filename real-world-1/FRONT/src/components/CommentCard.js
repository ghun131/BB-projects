import React from 'react';
import { Subscribe } from 'unstated';
import { Link } from 'react-router-dom';
import PostContainer from '../containers/PostContainer';

class CommentCard extends React.Component {
    render() {
        return (
            <Subscribe to={[PostContainer]}>
                {
                    (postThings) => (
                        <div className="card">
                            <div className="card-block">
                                <p className="card-text">{this.props.comment}</p>
                            </div>
                            <div className="card-footer">
                                <Link to={`/profile/${this.props.author}`} className="comment-author">
                                    <img src={this.props.avaUrl} className="comment-author-img" />
                                </Link>
                                &nbsp;
                                <Link to={`/profile/${this.props.author}`} className="comment-author">
                                    {this.props.author}
                                </Link>
                                <span className="date-posted">
                                    {postThings.displayTime(this.props.time)}
                                </span>
                            </div>
                        </div>
                    )
                }
            </Subscribe>
        )
    }
}

export default CommentCard;