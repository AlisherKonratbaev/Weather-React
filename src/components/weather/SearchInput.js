import React, {useState} from 'react';
import {Box, TextField, Button} from "@mui/material";
import {useDispatch} from "react-redux";
import {fetchWeather} from "../../store/weatherSlice";
function SearchInput(props) {
    const dispatch = useDispatch();
    const [text, setText] = useState("");
    const searchHandler = (e) => {
        e.preventDefault();
        dispatch(fetchWeather(text.toLowerCase()))
    }
    return (
        <Box component={"form"} onSubmit={searchHandler} sx={{display:"flex", mb:"100px"}}>
            <TextField id="outlined-basic" label="Search city" variant="outlined"
                       sx={{width:"100%"}}
                       value={text}
                       onChange={e => setText(e.target.value)}
            />
            <Button variant="contained" type="submit">Search</Button>
        </Box>
    );
}

export default SearchInput;