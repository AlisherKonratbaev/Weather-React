import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchWeather} from "../store/weatherSlice";

function Weather(props) {
    const {weather, status, error} = useSelector(state => state.weather)
    const dispatch = useDispatch();
    const [text, setText] = useState("");

    useEffect(() => {
        console.log(weather, status)
    })
    return (
        <div>
            <input type={text} value={text} onChange={e => {setText(e.target.value)}} />
            <button onClick={() => {dispatch(fetchWeather(text))}}>show</button>
        </div>
    );
}

export default Weather;