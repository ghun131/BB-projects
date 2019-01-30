import React from 'react';
import { Container } from 'unstated';
import axios from 'axios';

class PostContainer extends Container {
    state={
        data: [],
        tags: [],
        pageNums: [],
        author: [],
        tagName: ''
    }

    takeLastWord = (pathname) => {
        let arr = pathname.split("/");
        let lastWord = arr[arr.length - 1].trim();
        return lastWord;
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

    getUserPosts = (pathname) => {
        let author = this.takeLastWord(pathname);
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

    getFavouritePosts = (pathname) => {
        let username = this.takeLastWord(pathname);
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
                    data: res.data.article
                });
            })
            .catch (error => console.log(error))
    }
    editPost = (id, items, history) => {
        let { title, content, tags } = items;
        tags = tags.replace(/\s/g, "");
        const tagsArr = tags.split(",");
        const data = {
            title: title,
            content: content,
            avaUrl: localStorage.getItem("picUrl"),
            tags: tagsArr
        };

        axios.put(`/editor/${id}`, {data})
            .then(res => {
                console.log(res.data)
                history.push('/');
            })
            .catch(err => console.log(err.message));
    }

    deletePost = (id, history) => {
        axios.delete(`/profile/delete/${id}`)
            .then(res => {
                console.log('deleted post', res.data);
                history.push('/');
            })
            .catch(err => console.log(err.message))
    }

    likePost = (id, title) => {
        let payload = {
            author: localStorage.getItem("author"),
            title: title
        }

        axios.put(`/article/${id}`, {payload})
            .then( res => {
                //update state so UI will update
                let data = [...this.state.data];
                let likedPost = data.filter( i => i._id === res.data.post._id )
                let index = data.indexOf(likedPost[0]);
                data[index] = res.data.post;
                this.setState({ data });
                localStorage.setItem("loveArticles", res.data.user.loveArticles);
            })
            .catch(err => console.log(err))
    }

    getPostsByTag = (pathname) => {
        let tag = this.takeLastWord(pathname);
        axios.get(`/tag/${tag}`)
            .then(res => {
                console.log(res.data)
                this.setState({ data: res.data, tagName: tag })
            }).catch(err => console.log(err.message));
    }
}

let container = new PostContainer();

export default container;