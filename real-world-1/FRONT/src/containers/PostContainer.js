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

    getGlobalPosts = () => {
        axios.get("/api/posts")
            .then( res => {
                let totalDocs = res.data.totalDocuments[0].posts;
                let pageNums = [...this.state.pageNums];
                for (let i = 1; i < totalDocs / 13 + 1; i++) {
                    pageNums.push(i);
                }
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
                let totalDocs = res.data.totalDocuments[0].posts;
                let pageNums = [...this.state.pageNums];
                for (let i = 1; i < totalDocs / 13 + 1; i++) {
                    pageNums.push(i);
                }
                this.setState({ 
                    data: res.data.posts,
                    author: res.data.user,
                    pageNums
                }, () => console.log(this.state.author));
            }).catch(error => console.log(error));
    }
    // getFavouritePosts
    // editPost
    // deletePost
    // likePost
    // comment
    // getComments
    // deleteComment
    // getTags
    // getPostsByTag
}

let container = new PostContainer();

export default container;