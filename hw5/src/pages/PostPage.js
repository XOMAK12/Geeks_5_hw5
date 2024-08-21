import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPosts, deletePosts } from '../store/postsSlice';
import './PostPage.css';

const PostPage = () => {
    const dispatch = useDispatch();
    const { posts, preloader } = useSelector((state) => state.posts);

    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch]);

    return (
        <div className="container">
            <h1>Posts</h1>
            {preloader && <p className="loading">Loading...</p>}
            {posts.length > 0 ? (
                <>
                    <button
                        onClick={() => dispatch(deletePosts())}
                        className="delete-button"
                    >
                        Delete All Posts
                    </button>
                    {posts.map((post) => (
                        <div key={post.id} className="post">
                            <h2 className="post-title">{post.title}</h2>
                            <p>{post.body}</p>
                        </div>
                    ))}
                </>
            ) : (
                <>
                    <h2 className="no-posts">NO POSTS</h2>
                    <button
                        onClick={() => dispatch(getPosts())}
                        className="add-button"
                    >
                        Add Posts
                    </button>
                </>
            )}
        </div>
    );
};

export default PostPage;