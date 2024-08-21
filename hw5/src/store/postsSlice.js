import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getPosts = createAsyncThunk(
    'posts/getPosts',
    async (_, { dispatch }) => {
        dispatch(preloaderOn());
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts');
            if (response.ok) {
                const posts = await response.json();
                dispatch(postsInfo(posts));
            } else if (response.status === 404) {
                alert('404 Not Found');
            }
        } catch (error) {
            console.error('Failed to fetch posts:', error);
        } finally {
            dispatch(preloaderOff());
        }
    }
);

const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        posts: [],
        preloader: false,
    },
    reducers: {
        postsInfo: (state, action) => {
            state.posts = action.payload;
        },
        deletePosts: (state) => {
            state.posts = [];
        },
        preloaderOn: (state) => {
            state.preloader = true;
        },
        preloaderOff: (state) => {
            state.preloader = false;
        },
    },
});

export const { postsInfo, deletePosts, preloaderOn, preloaderOff } = postsSlice.actions;

export default postsSlice.reducer;