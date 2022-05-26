import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

export const fetchWeather = createAsyncThunk(
    'weather/fetchWeather',
    async function(city="", {rejectWithValue}) {
        try{
            const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&lang=ru&appid=ce6a5b2a2396442d0b0c9da35a6a1699`
            const response = await fetch(url)
            if(!response.ok) {
                throw new Error("Server error!")
            }
            const data = await response.json();
            return data;
        }
        catch (err) {
            return rejectWithValue(err.message)
        }
    }
)
const initialState = {
    weather: [],
    cityInfo: {},
    status: null,
    error: null,
}
const weatherSlice = createSlice({
    name:'weather',
    initialState,
    reducers: {
        clearAll:(state) => {
            state.weather = [];
        }
    },
    extraReducers: {
        [fetchWeather.pending]: (state, action) => {
            state.status = "loading"
        },
        [fetchWeather.fulfilled]: (state, action) => {
            state.status = "resolved";
            state.weather = action.payload;
        },
        [fetchWeather.rejected]: (state, action) => {
            state.status = "rejected";
            state.error = action.payload;
        },
    }
})
export const {clearAll} = weatherSlice.actions;
export default weatherSlice.reducer;