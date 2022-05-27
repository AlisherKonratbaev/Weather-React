import React, {useEffect, useState} from 'react';
import {Box, Typography} from "@mui/material";
import IconImg from "./IconImg";

function MainInfo(props) {
    const {fullWeather, activeDay, cityInfo} = props;
    const [currentWeather, setCurrentWeather] = useState({});

    useEffect(() => {
        let weather ={}
        fullWeather.forEach(item => {
            if(item.day === activeDay) {
                weather = {...item.currentWeather}
            }
        })
        setCurrentWeather(weather)
    }, [activeDay])


    if (!cityInfo || !currentWeather.mainTemp) return;

    return (
        <Box component="div" className="weather-info" >
            <Box component="div">
                <Typography component="div" variant="p" sx={{display:"flex", alignItems:"center", mb:"10px"}}>
                    <IconImg type={currentWeather.descriptions[0]} className={"weather-info_icon"}/>
                    <div style={{display:"flex", flexDirection:"column", textAlign:"right", marginLeft:"10px"}}>
                        <span>
                             Среднесуточная t&deg;:
                        </span>
                        <span>
                             <span style={{fontSize:"40px"}}>
                                {currentWeather.mainTemp}
                            </span>
                            C&deg;
                        </span>
                    </div>
                </Typography>
                <Typography component="p" variant="p">Влажность: {currentWeather.humidity}%</Typography>
                <Typography component="p" variant="p">Ветер: {currentWeather.windSpeed} m/s</Typography>
            </Box>
            <Box component="div" sx={{textAlign:"right"}}>
                <Typography sx={{mb:"10px"}} component="h5" variant="h5">{cityInfo.name}, {cityInfo.country}</Typography>
                <Typography component="p" variant="p">Население: {cityInfo.population}</Typography>
                <Typography component="p" variant="p">{activeDay}</Typography>
                <Typography component="p" variant="p">{currentWeather.descriptions[0]} <br /> Местами: {currentWeather.descriptions.join(",")} </Typography>
            </Box>
        </Box>
    );
}

export default MainInfo;