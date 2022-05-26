import React, {useState, useEffect} from 'react';
import ReactApexChart from "react-apexcharts";

function Chart2(props) {
    const [values, setValues] = useState({
        series: [
            {
                name: "t \'C",
                data: props.data
            }
        ],
        options: {
            chart: {
                height: 350,
                type: 'area'
            },
            dataLabels: {
                enabled: true
            },
            stroke: {
                curve: 'smooth'
            },
            xaxis: {
                categories: props.dateTime,
            },

        },
    })
    const {series, options} = values;

    useEffect(() => {
        setValues({
            ...values,
            series: [
                {
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
                height={350}>
            </ReactApexChart>
        </div>
    );
}

export default Chart2;