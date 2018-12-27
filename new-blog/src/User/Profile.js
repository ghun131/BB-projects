import React from 'react';
import PropTypes from 'prop-types';
import Article from './Article';
import { withRouter} from 'react-router-dom';

class Profile extends React.Component {
    state={
        title: '',
        content: ''
    }

    handleEdit = (id) => {
        this.props.history.push(`/profile/edit/${id} `);
    }

    handleDelete = (id) => {
        
    }

    render() {
        const content = this.props.articlesUpdate.map(p => {  
            let time = Date(p.time)
            return (
                <Article 
                    key={p._id} 
                    date={time}
                    edit={this.handleEdit}
                    alert={this.handleDelete}
                    {...p}/>
            )
        });
        
        return (
            <div>
                <h1><em>{sessionStorage.getItem('author')}</em>'s profile</h1>
                {content}
            </div>
        )
    }
}

export default withRouter(Profile);

Profile.propTypes = {
    articlesUpdate: PropTypes.arrayOf(PropTypes.object)
}