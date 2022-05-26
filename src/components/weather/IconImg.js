import React from 'react';
import {
    WiCloudy,
    WiDayCloudy,
    WiDayRainMix,
    WiDaySunny,
    WiDaySunnyOvercast,
    WiFog,
    WiSnow,
    WiThunderstorm
} from "react-icons/wi";

function IconImg(props) {
    const type = props.type;

    const getIcon = () => {
        switch (type) {
            case "ясно":
                return <WiDaySunny />
            case "облачно с прояснениями":
                return <WiDaySunnyOvercast />
            case "небольшая облачность":
                return <WiDayCloudy />
            case "переменная облачность":
                return <WiDaySunnyOvercast />
            case "пасмурно":
                return <WiCloudy />
            case "небольшой дождь":
                return <WiDayRainMix />
            case "туман":
                return <WiFog />
            case "снег":
                return <WiSnow />
            case "гроза":
                return <WiThunderstorm />
            default:
                return <WiDayCloudy />
        }
    }
    return (
        <span className={props.className}>
            {getIcon()}
        </span>
    );
}

export default IconImg;