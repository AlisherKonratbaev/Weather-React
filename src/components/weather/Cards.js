import React, {useEffect, useState} from 'react';
import {Box, Container, Typography} from "@mui/material";

function Cards(props) {
    const {fullWeather, chooseCardHandler} = props
    const [active, setActive] = useState(0)
    const boxClickHandler = (item, index) => {
        setActive(index);
        chooseCardHandler(item);
    }
    useEffect(() => {
        setActive(0);
    }, [fullWeather])
    return (
        <Box className="weather-card_wrap">
            {fullWeather.map((item,index) => {
                return (
                    <Box className={index === active ? "weather-card_item active": "weather-card_item"} key={index} component="div" onClick={() => {boxClickHandler(item, index)}}>
                        <Typography component="h4" variant="p">{item.day}</Typography>
                        <Typography component="p" variant="p">27 t' C</Typography>
                        <Typography component="p" variant="p">Ясно</Typography>
                    </Box>
                )
            })}
        </Box>
    );
}

export default Cards;