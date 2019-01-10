import React from 'react';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';

const CommentCard = (props) => {
    let {author, comment, time} = props;
    let firstLetter = author.charAt(0).toUpperCase();
    let displayTime = new Date(parseInt(time)).toString();
    return (
        <div style={{marginTop: "30px"}}>
            <Card>
                <CardHeader
                    avatar={<Avatar>{firstLetter}</Avatar>} 
                    title={
                        <Link to={`/profile/${author}`} >
                            {author}
                        </Link>
                        }
                    subheader={displayTime}
                />
                <Divider />
                <CardContent style={{whiteSpace: "pre-line"}}>
                    {comment}
                </CardContent>
            </Card>
        </div>
    )
}

export default CommentCard;