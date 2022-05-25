import ReactApexChart from "react-apexcharts"
import React from "react"

class ApexChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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

        };
    }

    componentDidMount() {
        this.setState({
            ...this.state,
            series: [
                {
                    name: this.props.name,
                    data: this.props.data
                }
            ],
            options: {
                xaxis: {
                    categories : this.props.dateTime
                }
            }
        })

    }

    componentWillUnmount() {
        this.setState({
            ...this.state,
            series: [
                {
                    name: this.props.name,
                    data: this.props.data
                }
            ],
            options: {
                xaxis: {
                    categories : this.props.dateTime
                }
            }
        })
    }

    render() {
        return (

            <div id="chart">
                <ReactApexChart options={this.state.options} series={this.state.series} type="area"
                                height={650}></ReactApexChart>
            </div>
        );
    }
}

export default ApexChart;