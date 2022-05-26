import React, {useEffect, useState} from 'react';
import {Box, Typography} from "@mui/material";

function MainInfo(props) {
    const {fullWeather, activeDay, cityInfo} = props;
    const [currentWeather, setCurrentWeather] = useState({});

    useEffect(() => {
        let weather = {};
        fullWeather.forEach(item => {
            if(item.day === activeDay) {
                weather = {...item.currentWeather}
            }
        })
        console.log(weather)
        setCurrentWeather(weather)
    }, [activeDay])


    if (!cityInfo) return;

    return (
        <Box component="div" className="weather-info" >
            <Box component="div">
                <Typography component="p" variant="p">Среднесуточная: {currentWeather.mainTemp} t' C</Typography>
                <Typography component="p" variant="p">Влажность: {currentWeather.humidity}</Typography>
                <Typography component="p" variant="p">Ветер: {currentWeather.windSpeed}</Typography>
            </Box>
            <Box component="div">
                <Typography component="h5" variant="h5">{cityInfo.name}</Typography>
                <Typography component="p" variant="p">Население: {cityInfo.population}</Typography>
                <Typography component="p" variant="p">Население: {cityInfo.descriptions[0]}</Typography>d
            </Box>
        </Box>
    );
}

export default MainInfo;