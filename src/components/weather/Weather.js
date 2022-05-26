import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

import Chart2 from "./Chart2"
import SearchInput from "./SearchInput";
import Cards from "./Cards";

const getDayAndMonth = (text) => {
    const date = new Date(text);
    return `${date.toLocaleString('default', {month: 'long'})} ${date.getDate()}`;
}
const getHoursAndMinutes = (text) => {
    const date = new Date(text);
    let hours = date.getHours()
    let minutes = date.getMinutes();
    if (hours <= 9) hours = `0${hours}`
    if (minutes <= 9) minutes = `0${minutes}`
    return `${hours}:${minutes}`
}

function Weather(props) {
    const {weather, status, error} = useSelector(state => state.weather)
    const [fullWeather, setFullWeather] = useState([]);
    const [options, setOptions] = useState({
        name: 'series1',
        data: [0, 1],
        dateTime: ["09:00", "12:00"]
    });

    const {name, data, dateTime} = options;


    useEffect(() => {
        if (status === 'resolved') {
            let tempDate = weather.list.map(item => getDayAndMonth(item.dt_txt))
            let date = Array.from(new Set(tempDate))
            const tempFullWeather = [];
            date.forEach(day => {
                let step = {day: day.toString(), weather: []};
                weather.list.forEach(item => {
                    if (getDayAndMonth(item.dt_txt) === day) {
                        step.weather.push(item)
                    }
                })
                tempFullWeather.push(step);
            })
            chooseCardHandler(tempFullWeather[0])
            setFullWeather(tempFullWeather);
        }
    }, [weather])

    const chooseCardHandler = (item) => {
        setOptions({
            name: item.day,
            data: item.weather.map(item => Math.round(item.main.temp)),
            dateTime: item.weather.map(el => getHoursAndMinutes(el.dt_txt))
        })
    }
    useEffect(() => {
        console.log(options)
        console.log(fullWeather)
    }, [chooseCardHandler])

    return (
        <div>
            <SearchInput/>
            <Chart2 {...options} />
            {fullWeather.length != 0 && <Cards fullWeather={fullWeather} chooseCardHandler={chooseCardHandler}/>}
        </div>
    );
}

export default Weather;