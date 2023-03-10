import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    data: [],
    isLoading: false,
    isSuccess: false
}

export const fetchUserData = createAsyncThunk(
    'data/fetData',
    async (skip) => {
        try {
            const response = await axios.get(`https://dummyjson.com/products?limit=10&skip=${skip}`)
            const res = await response.data.products
            console.log({ res })
            return res
        } catch (error) {
            console.log({ error })
        }
    }
)

export const ApiCallSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        // GetData: (state, action) => {
        //     state.data.push(...action.payload)
        // },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUserData.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(fetchUserData.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.data.push(...payload)
        })
        builder.addCase(fetchUserData.rejected, (state) => {
            state.isLoading = false;
            state.isSuccess = false;
        })
    }
})

// export const getDataAsync = skip => async (dispatch) => {
//     try {
//         const response = await axios.get(`https://dummyjson.com/products?limit=10&skip=${skip}`);
//         console.log('getDtaa Async -- ')
//         dispatch(GetData(response.data.products));
//     } catch (err) {
//         throw new Error(err);
//     }
// };

// export const { GetData } = ApiCallSlice.actions
export default ApiCallSlice.reducer