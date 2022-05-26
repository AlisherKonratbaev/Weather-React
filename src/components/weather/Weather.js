import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

import WeatherArea from "./WeatherArea"
import SearchInput from "./SearchInput";
import Cards from "./Cards";
import MainInfo from "./MainInfo";

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

const getArithmetic = (arr) => {
    let sum = 0;
    arr.forEach(el => sum += +el)
    return Math.round(sum / arr.length);
}

function Weather(props) {
    const {weather, status, error} = useSelector(state => state.weather)
    const [fullWeather, setFullWeather] = useState([]);
    const [activeDay, setActiveDay] = useState("");
    const [options, setOptions] = useState({
        name: 'series1',
        data: [0, 1],
        dateTime: ["09:00", "12:00"]
    });

    const {name, data, dateTime} = options;

    useEffect(() => {
        if (status === 'resolved') {
            let dayList = weather.list.map(item => getDayAndMonth(item.dt_txt))
            let dayListSet = Array.from(new Set(dayList))
            let tempFullWeather = [];
            dayListSet.forEach(day => {
                let step = {day: day, weather: []};
                weather.list.forEach(item => {
                    if (getDayAndMonth(item.dt_txt) === day) {
                        step.weather.push(item)
                    }
                })
                tempFullWeather.push(step);
            })
            tempFullWeather = setMainTemp(tempFullWeather);
            chooseCardHandler(tempFullWeather[0])
            setFullWeather(tempFullWeather);
        }
    }, [weather])

    const setMainTemp = (weather) => {
        weather.forEach(item => {
            let tempList = item.weather.map(el => el.main.temp)
            const mainTemp = getArithmetic(tempList)
            const descriptions = Array.from(new Set(item.weather.map(el => el.weather[0].description)));
            let windList = item.weather.map(el => el.wind.speed)
            const windSpeed = getArithmetic(windList)
            let humidityList = item.weather.map(el => el.main.humidity)
            const humidity = getArithmetic(humidityList)

            item.currentWeather = {
                mainTemp: mainTemp,
                descriptions,
                windSpeed,
                humidity,
            }
        })
        return weather;
    }

    const chooseCardHandler = (item) => {
        setOptions({
            name: item.day,
            data: item.weather.map(item => Math.round(item.main.temp)),
            dateTime: item.weather.map(el => getHoursAndMinutes(el.dt_txt))
        })
        setActiveDay(item.day);
    }

    return (
        <div>
            <SearchInput/>
            <MainInfo fullWeather={fullWeather} activeDay={activeDay} cityInfo={weather.city} />
            <WeatherArea {...options} />
            {fullWeather.length != 0 && <Cards fullWeather={fullWeather} chooseCardHandler={chooseCardHandler}/>}

        </div>
    );
}

export default Weather;