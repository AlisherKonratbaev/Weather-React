import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchWeather} from "../store/weatherSlice";
import ApexChart from "./Chart1";
import Chart2 from "./Chart2"
function Weather(props) {
    const {weather, status, error} = useSelector(state => state.weather)
    const dispatch = useDispatch();
    const [text, setText] = useState("");
    const [fullWeather, setFullWeather] = useState([]);
    const [options, setOptions] = useState({name: 'series1', data: [1, 21,12,15,23,10,17], dateTime:["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]});
    const {name, data, dateTime} = options;
    useEffect(() => {
        console.log(fullWeather)
        console.log(options)
    }, [fullWeather])

    const getDay = (text) => {
        const date = new Date(text);
        return date.getDate();
    }
    useEffect(() => {
        if(status === 'resolved') {
            let tempDate = weather.list.map(item => getDay(item.dt_txt))
            let date = Array.from(new Set(tempDate))
            const tempFullWeather = [];
            date.forEach(day => {
                let step = {day:day.toString(), weather:[]};
                weather.list.forEach(item => {
                    if(getDay(item.dt_txt) === day) {
                        step.weather.push(item)
                    }
                })

                tempFullWeather.push(step);
            })
            setFullWeather(tempFullWeather);
            setOptions({
                name:tempFullWeather[0].day,
                data: tempFullWeather[0].weather.map(item => item.main.temp),
                dateTime: tempFullWeather[0].weather.map(item => item.dt_txt)
            })
        }
    },[weather])


    return (
        <div>
            <input type={text} value={text} onChange={e => {setText(e.target.value)}} />
            <button onClick={() => {dispatch(fetchWeather(text))}}>show</button>

            <Chart2 {...options} />
        </div>
    );
}

export default Weather;