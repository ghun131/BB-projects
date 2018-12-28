import React from 'react';
import PropTypes from 'prop-types';
import Article from './Article';
import Heading from './Heading';
import ProfileNavBar from './ProfileNavBar';
import { withRouter} from 'react-router-dom';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

class Profile extends React.Component {
    state={
        title: '',
        content: '',
        articles: []
    }

    componentDidMount() {
        let articles = this.props.articlesUpdate;
        this.setState({ articles: articles})
    }

    handleEdit = (id) => {
        this.props.history.push(`/profile/edit/${id} `);
    }

    handleDelete = (id) => {
        let articles = [...this.state.articles];
        let post = articles.filter(p => p._id === id);
        let index = articles.indexOf(post[0]);
        articles.splice(index, 1);
        this.setState({ articles: articles });
        axios.delete(`/profile/delete/${id}`, post[0])
            .then(res => {
                console.log(res.data);
            })
            .catch(err => console.log(err.message))
    }

    deleteAlert = (id) => {
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure to delele this post.',
            buttons: [
              {
                label: 'Yes',
                onClick: () => this.handleDelete(id)
              },
              {
                label: 'No',
                onClick: () => console.log('No')
              }
            ]
        })
      };

    render() {
        const content = this.state.articles.map(p => {  
            let time = Date(p.time)
            return (
                <Article 
                    key={p._id} 
                    date={time}
                    edit={this.handleEdit}
                    alert={this.deleteAlert}
                    {...p}/>
            )
        });
        
        return (
            <div style={{
                width: '80%',
                margin: '10px auto',
                padding: '10px',
                textAlign: 'left'
            }}>
                <Heading />
                <ProfileNavBar />
                {content}
            </div>
        )
    }
}

export default withRouter(Profile);

Profile.propTypes = {
    articlesUpdate: PropTypes.arrayOf(PropTypes.object)
}