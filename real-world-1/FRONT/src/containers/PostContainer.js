import React from 'react';
import { Container } from 'unstated';
import axios from 'axios';

class PostContainer extends Container {
    state={
        data: [],
        tags: [],
        pageNums: [],
        author: []
    }

    displayTime = (time) => {
        let dateObj = new Date(parseInt(time));
        let month = dateObj.getUTCMonth(); 
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        let day = dateObj.getUTCDate();
        let year = dateObj.getUTCFullYear();

        return monthNames[month] + " " + day + "," + year;
    }

    pagination = (data, pageNumState) => {
        let totalDocs = data.totalDocuments[0].posts;
        let pageNums = [...pageNumState];
        for (let i = 1; i < totalDocs / 13 + 1; i++) {
            pageNums.push(i);
        }
        return pageNums
    }

    getGlobalPosts = () => {
        axios.get("/api/posts")
            .then( res => {
                let pageNums = this.pagination(res.data, this.state.pageNums);
                this.setState({ 
                    data: res.data.posts, 
                    tags: res.data.tags,
                    pageNums
                });
        }).catch(error => console.log(error));
    }

    getUserPosts = (author) => {
        axios.get(`/profile/${author}`)
            .then( res => {
                let pageNums = this.pagination(res.data, this.state.pageNums);
                this.setState({ 
                    data: res.data.posts,
                    author: res.data.user,
                    pageNums
                });
            }).catch(error => console.log(error));
    }

    getFavouritePosts = (username) => {
        axios.post(`/profile/${username}/favourites`, {loveArticles: this.state.author[0].loveArticles})
            .then( res => {
                this.setState({ data: res.data });
            })
    }

    getPost = (path) => {
        axios.get(path)
            .then( res => {
                console.log('one post', res.data)
                this.setState({ 
                    data: res.data.article,
                });
            })
            .catch (error => console.log(error))
    }
    // editPost
    // deletePost
    // likePost
    // getTags
    // getPostsByTag
}

let container = new PostContainer();

export default container;