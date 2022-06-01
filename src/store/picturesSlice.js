import { 
    createSlice, 
    createAsyncThunk
} from "@reduxjs/toolkit";

const initialState = {
    all: {},
    favorite: {}
}

export const fetchPictures = createAsyncThunk('pictures/fetchPosts', 
    async (amount) => {
        const url = `https://api.thecatapi.com/v1/images/search?limit=${amount}`;
        const response = await fetch(url);

        if (response.ok) {
            return response.json();
        } else {
            const rejected = await response.json();
            return Promise.reject(rejected.message)
        }
    }
)

const picturesSlice = createSlice({
    name: 'pictures',
    initialState,
    reducers: {
        setPictures(state, action) {
            state.all = action.payload;
        },
        setFavPictures(state, action) {
            state.favorite = action.payload;
        },
        favPictureHandler(state, action) {
            const imgId = action.payload.imgId;
            const picture = state.all[imgId];

            if (picture.selected) {
                state.favorite[imgId] = picture
            } else {
                delete state.favorite[imgId];
            }
        }
    },
});

export const { 
    setPictures, 
    setFavPictures, 
    favPictureHandler 
} = picturesSlice.actions;

export default picturesSlice.reducer