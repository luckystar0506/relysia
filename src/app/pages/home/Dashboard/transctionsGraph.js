import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { Line } from "react-chartjs-2";

const TimeSeriesChart = (props) => {
  const [chartData, setchartData] = useState([
    {
      x: moment(2018),
      y: 10,
    },
    {
      x: moment(2019),
      y: 11,
    },
    {
      x: moment(2020),
      y: 1,
    },
  ]);

  const [withdrawLine, setwithdrawLine] = useState([]);
  const [depositLine, setdepositLine] = useState([]);

  useEffect(() => {
    if (props.activities && props.activities.length > 0) {
      let withdrawArr = [];
      let depositArr = [];
      props.activities.map((x) => {
        if (x.balance_change > 0) {
          depositArr.push({
            x: moment(x.time),
            y: x.balance_change,
          });
        } else {
          withdrawArr.push({
            x: moment(x.time),
            y: x.balance_change * -1,
          });
        }
      });

      setwithdrawLine(withdrawArr);
      setdepositLine(depositArr);
    }
  }, [props.activities]);

  let graphData = {
    datasets: [
      {
        data: depositLine,
        backgroundColor: "#6570b4",
        borderColor: "#3f50b5",
        fill: false,
        borderWidth: 2,
        label: "Deposit",
      },
      {
        data: withdrawLine,
        borderColor: "#ff2868",
        backgroundColor: "#ff2868",
        fill: false,
        label: "Withdraw",
        borderWidth: 2,
      },
    ],
  };

  let graphOptions = {
    responsive: true,
    maintainAspectRatio: false,
    legend: false,
    scales: {
      xAxes: [
        {
          type: "time",
          distribution: "linear",
          time: {
            tooltipFormat: "h:mm:ss a, MM/DD/YYYY",

            displayFormats: {
              millisecond: "MM/DD",
              second: "MM/DD",
              minute: "MM/DD",
              hour: "MM/DD",
              day: "MM/DD",
              week: "MM/DD",
              month: "MM/DD",
              quarter: "MM/DD",
              year: "MM/DD",
            },
          },
          // categoryPercentage: 0.35,
          // barPercentage: 0.7,
          display: true,
          scaleLabel: {
            display: false,
            labelString: "Data",
          },
          gridLines: false,
          ticks: {
            display: true,
            fontSize: 13,
            padding: 10,
          },
        },
      ],
      yAxes: [
        {
          // categoryPercentage: 0.35,
          // barPercentage: 0.7,
          display: true,
          scaleLabel: {
            display: false,
            labelString: "Latency",
          },
          gridLines: {
            //   color: shape2Color,
            drawBorder: false,
            offsetGridLines: false,
            drawTicks: false,
            borderDash: [3, 4],
            zeroLineWidth: 1,
            //   zeroLineColor: shape2Color,
            zeroLineBorderDash: [3, 4],
          },
          ticks: {
            // max: 70,
            //   stepSize: 10,
            display: false,
            //   beginAtZero: true,
            //   fontColor: shape3Color,
            fontSize: 13,
            padding: 10,
          },
        },
      ],
    },
    title: {
      display: false,
    },
    hover: {
      mode: "ErrorsPage.js",
    },
    tooltips: {
      enabled: true,
      intersect: false,
      //   mode: "nearest",
      bodySpacing: 5,
      yPadding: 10,
      xPadding: 10,
      caretPadding: 0,
      displayColors: false,
      // backgroundColor: brandColor,
      titleFontColor: "#ffffff",
      cornerRadius: 4,
      footerSpacing: 0,
      titleSpacing: 0,
      
    },

    // layout: {
    //   padding: {
    //     left: 0,
    //     right: 0,
    //     top: 5,
    //     bottom: 5,
    //   },
    // },
  };

  return <Line data={graphData} options={graphOptions} />;
};

export default TimeSeriesChart;
