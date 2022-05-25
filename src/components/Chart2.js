import React, {useState, useEffect} from 'react';
import ReactApexChart from "react-apexcharts";

function Chart2(props) {
    const [values, setValues] = useState({
        series: [
            {
                name: props.name,
                data: props.data
            }
        ],
        options: {
            chart: {
                height: 650,
                type: 'area'
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'smooth'
            },
            xaxis: {
                type: 'datetime',
                categories: props.dateTime
            },
            tooltip: {
                x: {
                    format: 'dd/MM/yy HH:mm'
                },
            },
        },
    })
    const {series, options} = values;

    useEffect(() => {
        setValues({
            ...values,
            series: [
                {
                    name: props.name,
                    data: props.data
                }
            ],
            options: {
                xaxis: {
                    type: 'datetime',
                    categories: props.dateTime
                },
            }
        })
    }, [props])

    return (
        <div id="chart">
            <ReactApexChart
                options={options}
                series={series}
                type="area"
                height={650}>
            </ReactApexChart>
        </div>
    );
}

export default Chart2;