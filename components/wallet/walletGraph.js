import React, { useState, useEffect } from "react";
import moment from "moment";
import { Line } from "react-chartjs-2";
import { Typography, IconButton } from "@material-ui/core";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import { DateRangePicker } from "@material-ui/pickers";
import { LocalizationProvider } from "@material-ui/pickers";
import MomentUtils from "@material-ui/pickers/adapter/moment";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  activityBox2: {
    borderRadius: 15,
    padding: "20px 20px",
  },
}));

const WalletGraph = (props) => {
  const classes = useStyles();

  const [withdrawLine, setwithdrawLine] = useState([]);
  const [depositLine, setdepositLine] = useState([]);
  const [value, setValue] = useState([null, null]);

  useEffect(() => {
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
    let dateVals = [null, null];
    if (props.activities[0]) {
      dateVals[1] = moment(props.activities[0].time);
    }
    if (props.activities[props.activities.length - 1]) {
      dateVals[0] = moment(props.activities[props.activities.length - 1].time);
    }
    setValue(dateVals);
  }, [props.activities]);

  useEffect(() => {
    //intial intilization

    if (
      props.activities &&
      props.activities.length > 0 &&
      value[0] &&
      value[1]
    ) {
      let withdrawArr = [];
      let depositArr = [];
      props.activities.map((x) => {
        if (
          x.balance_change > 0 &&
          moment(x.time).isBetween(value[0], value[1], "day", "[]")
        ) {
          depositArr.push({
            x: moment(x.time),
            y: x.balance_change,
          });
        } else {
          if (moment(x.time).isBetween(value[0], value[1], "day", "[]")) {
            withdrawArr.push({
              x: moment(x.time),
              y: x.balance_change * -1,
            });
          }
        }
      });

      setwithdrawLine(withdrawArr);
      setdepositLine(depositArr);
    } else if (
      props.activities &&
      props.activities.length > 0 &&
      value[0] &&
      !value[1]
    ) {
      let withdrawArr = [];
      let depositArr = [];
      props.activities.map((x) => {
        if (x.balance_change > 0 && moment(x.time).isAfter(value[0])) {
          depositArr.push({
            x: moment(x.time),
            y: x.balance_change,
          });
        } else {
          if (moment(x.time).isAfter(value[0])) {
            withdrawArr.push({
              x: moment(x.time),
              y: x.balance_change * -1,
            });
          }
        }
      });

      setwithdrawLine(withdrawArr);
      setdepositLine(depositArr);
    } else if (
      props.activities &&
      props.activities.length > 0 &&
      !value[0] &&
      value[1]
    ) {
      let withdrawArr = [];
      let depositArr = [];
      props.activities.map((x) => {
        if (x.balance_change > 0 && moment(x.time).isBefore(value[0])) {
          depositArr.push({
            x: moment(x.time),
            y: x.balance_change,
          });
        } else {
          if (moment(x.time).isBefore(value[0])) {
            withdrawArr.push({
              x: moment(x.time),
              y: x.balance_change * -1,
            });
          }
        }
      });

      setwithdrawLine(withdrawArr);
      setdepositLine(depositArr);
    }
  }, [value, props.activities]);

  let graphData = {
    datasets: [
      {
        data: depositLine,
        backgroundColor: "#44ce6f",
        borderColor: "#44ce6f",
        fill: false,
        borderWidth: 2,
        label: "Deposit",
      },
      {
        data: withdrawLine,
        borderColor: "#f48665", 
        backgroundColor: "#f48665",
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
          distribution: "series",
          time: {
            tooltipFormat: "h:mm:ss a, MM/DD/YYYY",

            displayFormats: {
              millisecond: "ddd",
              second: "ddd",
              minute: "ddd",
              hour: "ddd",
              day: "ddd",
              week: "ddd",
              month: "ddd",
              quarter: "ddd",
              year: "ddd",
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

  return (
    <Paper className={classes.activityBox2}>
      <LocalizationProvider dateAdapter={MomentUtils}>
        <div>
          <div
            style={{
              display: "flex",
              marginBottom: 15,
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {" "}
            <DateRangePicker
              disableFuture={true}
              autoOk={false}
              value={value}
              onChange={(newValue) => setValue(newValue)}
              renderInput={(startProps, endProps) => (
                <React.Fragment>
                  <IconButton
                    onClick={() => startProps.inputProps.onFocus()}
                    style={{
                      backgroundColor: "rgba(0, 0, 0, 0.04)",
                      borderRadius: "40%",
                    }}
                    size="medium"
                    disabled={props.activities === 0 ? true : false}
                  >
                    <CalendarTodayIcon
                      fontSize="small"
                      style={{ color: "#000000" }}
                    />
                  </IconButton>
                </React.Fragment>
              )}
            />
            <div style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginRight: 15,
                }}
              >
                <div
                  style={{
                    borderRadius: "50%",
                    height: 10,
                    width: 10,
                    backgroundColor: "#44ce6f",
                    marginRight: 4,
                  }}
                />
                <Typography style={{ fontWeight: 550 }} variant="body2">
                  Deposits
                </Typography>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div
                  style={{
                    borderRadius: "50%",
                    height: 10,
                    width: 10,
                    backgroundColor: "#f48665",
                    marginRight: 4,
                  }}
                />
                <Typography style={{ fontWeight: 550 }} variant="body2">
                  Withdrawals
                </Typography>
              </div>
            </div>
          </div>
          <div style={{ maxHeight: 200 }}>
            <Line data={graphData} options={graphOptions} />
          </div>
        </div>
      </LocalizationProvider>
    </Paper>
  );
};

export default WalletGraph;
