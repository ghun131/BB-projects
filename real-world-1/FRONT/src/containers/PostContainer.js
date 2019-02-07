import React from 'react';
import { Container } from 'unstated';
import axios from 'axios';

class PostContainer extends Container {
    state={
        data: [],
        tags: [],
        pageNums: [],
        currentPageNum: 1,
        author: [],
        tagName: '',
        comments: [],
        following: false
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

        return monthNames[month] + " " + day + ", " + year;
    }

    pagination = (data) => {
        let totalDocs = data.totalDocuments[0].posts;
        let pageNums = [];
        for (let i = 1; i < totalDocs / 13 + 1; i++) {
            pageNums.push(i);
        }
        return pageNums
    }

    getGlobalPosts = () => {
        axios.get("/api/posts")
            .then( res => {
                let pageNums = this.pagination(res.data);
                this.setState({ 
                    data: res.data.posts, 
                    tags: res.data.tags,
                    pageNums
                });
        }).catch(error => console.log(error));
    }

    getPostsPagination = (num) => {
        let path = `/api/posts/${num}`;
        axios.get(path)
            .then( res => {
                this.setState({ 
                    data: res.data.posts, 
                    tags: res.data.tags,
                    currentPageNum: num
                });
            }).catch(error => console.log(error));
    }

    getFeed = () => {
        const payload = {
            payload: localStorage.getItem("following").split(",")
        }

        axios.post("/api/posts/feed", payload)
            .then( res => {
                this.setState({
                    data: res.data
                })                
            }).catch(error => console.log(error));

    }

    // Check follow user here
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

    // get a single post and its comments
    getPost = (path) => {
        axios.get(path)
            .then( res => {
                console.log(res.data);
                this.setState({ 
                    author: res.data.user,
                    data: res.data.article,
                    comments: res.data.comments
                });
            })
            .catch (error => console.log(error))
    }

    editPost = (id, items, path, history) => {
        let { title, content, tags } = items;
        tags = tags.replace(/\s/g, "");
        const tagsArr = tags.split(",");

        let token = localStorage.getItem("token");
        let lastLetter = this.takeLastWord(path).trim();
        let data = {
            title: title,
            content: content,
            avaUrl: localStorage.getItem("picUrl"),
            tags: tagsArr
        };
        if (lastLetter === "editor") {
            console.log('new post')
            data.author = localStorage.getItem("author"),
            data.email = localStorage.getItem("email"),
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
            axios.post('/api/newpost', {data})
                .then(res => {
                    console.log(res.data.message);
                    this.setState({ message: res.data.message });
                    history.push('/');
                }).catch(error => console.log(error));
        } else {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
            axios.put(`/editor/${id}`, {data})
            .then(res => {
                console.log(res.data)
                history.push('/');
            })
            .catch(err => console.log(err.message));
        }
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
                console.log('like post', res.data)
                let data = [...this.state.data];
                let likedPost = data.filter( i => i._id === res.data.post._id )
                let index = data.indexOf(likedPost[0]);
                data[index] = res.data.post;
                this.setState({ data });
                localStorage.setItem("loveArticles", res.data.user.loveArticles);
            })
            .catch(err => console.log(err))
    }

    followUser = (pathname) => {
        let user = this.takeLastWord(pathname).trim();

        let following = []
        if (localStorage.getItem("following")) {
            following = localStorage.getItem("following").split(",");
            console.log('following array', following);
        }

        let payload = {
            theFollowing: localStorage.getItem("author"),
            theFollowed: this.state.author[0].username,
            following: following
        }

        let isFollowed = payload.following.filter( f => f === user);
        console.log('isFollowed', isFollowed);

        if (!isFollowed[0]) {
            payload.following.push(user);
            axios.post(`/profile/${user}`, payload)
                .then( res => {
                    console.log('following', res.data)
                    this.setState({ following: true, author: [res.data] });
                    localStorage.setItem("following", payload.following);
                })
        } else {
            let index = payload.following.indexOf(user);
            payload.following.splice(index, 1)
            axios.post(`/profile/${user}`, payload)
                .then( res => {
                    console.log('unfollowing', res.data);
                    this.setState({ following: false, author: [res.data] })
                    localStorage.setItem("following", payload.following);
                })
        }
    }

    getPostsByTag = (pathname) => {
        let tag = this.takeLastWord(pathname);
        axios.get(`/tag/${tag}`)
            .then(res => {
                console.log(res.data)
                this.setState({ data: res.data, tagName: tag })
            }).catch(err => console.log(err.message));
    }

    comment = (text, title, path) => {
        const data = {
            author: localStorage.getItem("author"),
            avaUrl: localStorage.getItem("picUrl"),
            articleTitle: title,
            comment: text
        }

        axios.post(path, {data})
            .then (res => {
                let comments = [...this.state.comments];
                comments.unshift(res.data);
                this.setState({ comments })
            })
            .catch (error => console.log(error))
    }

    deleteComment = (id) => {
        let comments = [...this.state.comments];
        let comment = comments.filter(p => p._id === id);
        let index = comments.indexOf(comment[0]);
        comments.splice(index, 1);
        this.setState({ comments });
        axios.delete(`/article/comment/delete/${id}`, comment[0])
            .then(res => {
                console.log(res.data);
            })
            .catch(err => console.log(err.message))
    }
}

let container = new PostContainer();

export default container;