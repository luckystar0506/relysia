import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { useTheme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import "firebase/functions";
import "firebase/database";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  activityBox2: {
    borderRadius: 15,
    width: "100%",
    minHeight: 330,
    padding: "5px 15px",
    marginBottom: 12,
  },
}));

function Activity(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [activityList, setactivityList] = useState([]);

  useEffect(() => {
    if (props.selectedActivityState === 2) {
      setactivityList(props.activities);
    } else {
      filterActivities();
    }
  }, [props.activities, props.selectedActivityState]);

  const filterActivities = () => {
    let modifiArr = [];
    if (props.selectedActivityState === 0) {
      modifiArr = props.activities.filter((x) => {
        if (x.balance_change > 0) {
          return x;
        }
      });
    } else if (props.selectedActivityState === 1) {
      modifiArr = props.activities.filter((x) => {
        if (x.balance_change < 0) {
          return x;
        }
      });
    }
    setactivityList(modifiArr);
  };

  return (
    <div>
      <Paper className={classes.activityBox2}>
        <Typography variant="h6" component="h2" style={{ color: theme.palette.textColors.head1, padding: 17 }}>
          Latest Activity
        </Typography>
        {activityList &&
          activityList.map((item, index) => {
            return (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "15px 0px",
                  borderBottom: index === 2 ? "none" : "0.2px solid #eaeaea",
                }}
                key={item.block_id + "_ele" + index}
              >
                <div style={{ width: "10%", marginRight: 10 }}>
                  <Avatar
                    style={{ width: "100%", height: "auto" }}
                    src="data:image/png;base64,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"
                  />
                </div>
                <div style={{ width: "60%" }}>
                  <Typography variant="body2" style={{ fontWeight: 500, color: theme.palette.textColors.para2 }}>
                    {moment(item.time).format("MM/DD/YY hh:mm:ss")}
                  </Typography>
                  <Typography
                    variant="body2"
                    style={{
                      fontWeight: 500,
                      color: theme.palette.textColors.para2,

                      display: "block",
                      whiteSpace: "nowrap",
                      overflow: "hidden ",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {item.hash}
                  </Typography>
                </div>
                <div style={{ width: "25%", textAlign: "right" }}>
                  <Typography
                    variant="subtitle1"
                    style={{
                      display: "block",
                      whiteSpace: "nowrap",
                      overflow: "hidden ",
                      textOverflow: "ellipsis",
                      fontWeight: 800,
                      color: theme.palette.textColors.para1,
                    }}
                  >
                    {item.balance_change > 0 ? "+" : ""}
                    {item.balance_change ? (item.balance_change / 100000000).toFixed(4) : 0} BSV
                  </Typography>
                  <Typography variant="body2" style={{ fontWeight: 500, color: theme.palette.textColors.para2 }}>
                    ${((item.balance_change * props.bsvRate) / 100000000).toFixed(4)}
                  </Typography>
                </div>
                <a href={`https://whatsonchain.com/tx/${item.hash}`} target="_blank">
                  <IconButton>
                    <MoreVertIcon />
                  </IconButton>
                </a>
              </div>
            );
          })}
      </Paper>
    </div>
  );
}

export default Activity;
