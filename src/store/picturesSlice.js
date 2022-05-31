import { 
    createSlice, 
    createAsyncThunk, 
    // createSelector
} from "@reduxjs/toolkit";

const initialState = {
    all: [],
    favorite: []
}

export const fetchPictures = createAsyncThunk('pictures/fetchPosts', async (amount) => {
    const url = `https://api.thecatapi.com/v1/images/search?limit=${amount}`;
    const response = await fetch(url);

    if (response.ok) {
        return response.json();
    } else {
        const rejected = await response.json();
        return Promise.reject(rejected.message)
    }
})

const picturesSlice = createSlice({
    name: 'pictures',
    initialState,
    reducers: {
        setPictures(state, action) {
            state.all = action.payload;
        }
    },
    // extraReducers(builder) {
    //     builder
    //     .addCase(fetchPictures.pending, (state) => {
    //         state.status = 'loading';
    //     })
    //     .addCase(fetchPictures.fulfilled, (state, action) => {
    //         state.status = 'successed';
    //         console.log(action.payload);
    //         state.pictures = action.payload;
    //     })
    //     .addCase(fetchPictures.rejected, (state, action) => {
    //         state.status = 'failed';
    //         state.error = action.error.message;
    //     })
    // }
});

// export const selectPictures = state => state.pictures.pictures;

export const { setPictures } = picturesSlice.actions;

export default picturesSlice.reducer