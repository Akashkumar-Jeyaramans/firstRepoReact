import { Card, Spin } from "antd";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const RegisterdDeviceChart = (props) => {
  const { siteName } = props;
  const [state, setState] = useState(null);
  useEffect(() => {
    setState({
      series: [20, 8, 2],
      options: {
        chart: {
          height: 200,
          type: "donut",
          //   toolbar: {
          //     show: true,
          //   },
        },
        labels: ["CWR", "Switch", "MDR"],
        colors: ["#5B8FF9", "#5AD8A6", "#5D7092"],
        dataLabels: {
          enabled: true,
          formatter: function (val, opts) {
            return opts.w.globals.series[opts.seriesIndex];
          },
        },
        legend: {
          formatter: function (val, opts) {
            return val + " - " + opts.w.globals.series[opts.seriesIndex];
          },
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
        plotOptions: {
          pie: {
            donut: {
              labels: {
                show: true,
                total: {
                  showAlways: true,
                  show: true,
                },
                value: {
                  fontWeight: 600,
                  fontSize: "32px",
                },
              },
            },
          },
        },
      },
    });
  }, []);
  return (
    <Card
      title={`Registered Device in: ${siteName}`}
      bodyStyle={{
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: "25%",
        paddingRight: "25%",
      }}
      headStyle={{ borderBottom: "none" }}
    >
      <div id="chart" style={{ position: "relative" }}>
        {state === null ? (
          <Spin />
        ) : (
          <ReactApexChart
            options={state.options}
            series={state.series}
            type="donut"
            height={200}
          />
        )}
      </div>
    </Card>
  );
};

export default RegisterdDeviceChart;
