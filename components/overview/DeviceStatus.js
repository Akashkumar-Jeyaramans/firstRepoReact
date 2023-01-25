import { Card, Spin } from "antd";
import ReactApexChart from "react-apexcharts";
import React, { useEffect, useState } from "react";

const DeviceStatus = () => {
  const [state, setState] = useState(null);
  useEffect(() => {
    setState({
      series: [27, 25, 18],
      options: {
        chart: {
          height: 200,
          type: "donut",
          //   toolbar: {
          //     show: true,
          //   },
        },
        labels: ["Warning", "Offline", "Unknown"],
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
    <Card title="Device Status" bordered={false}>
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

export default DeviceStatus;
