import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSnackbar } from "notistack";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import { useTheme } from "@material-ui/core/styles";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles((theme) => ({
  dialogCon: {
    width: 350,
    padding: "30px 25px",
    [theme.breakpoints.down("sm")]: {
      width: 250,
    },
  },
}));

export default function MintTokenDrawer(props) {
  const classes = useStyles();
  const [drawerState, setdrawerState] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();

  const [first] = props.tokens;
  const balance = props.tokens.reduce((acc, token) => acc + parseInt(token.coins, 10), 0);

  return (
    <>
      <div style={{ display: "flex", alignItems: "center", marginBottom: 15 }}>
        <Paper style={{ border: "0px solid red", borderRadius: "50%" }} elevation={2}>
          <Avatar
            src={
              first.tokenImage
                ? first.tokenImage
                : "https://image.shutterstock.com/image-vector/dots-letter-c-logo-design-260nw-551769190.jpg"
            }
            alt="logo"
            style={{ width: 50, height: 50 }}
          />
        </Paper>

        <div style={{ display: "flex", alignItems: "center", marginLeft: "auto" }}>
          {props.verfied && (
            <div style={{ marginRight: 10 }}>
              <Tooltip title="verfied">
                <DoneAllIcon style={{ color: "green" }} />
              </Tooltip>
            </div>
          )}
          <Typography variant="subtitle1" component="span" style={{ fontWeight: 500, color: theme.palette.textColors.textGreen }}>
            {balance}
          </Typography>
        </div>
      </div>
      <Typography
        component="h3"
        variant="subtitle1"
        style={{
          fontWeight: 600,
          display: "block",
          color: theme.palette.textColors.head,
          whiteSpace: "nowrap",
          overflow: "hidden ",
          width: "100%",
          textOverflow: "ellipsis",
        }}
      >
        {first.name}
      </Typography>
      <Typography
        component="p"
        variant="body1"
        style={{
          color: theme.palette.textColors.subParagraph,
          overflow: "hidden",
          textOverflow: "ellipsis",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          marginTop: 10,
          wordBreak: "break-word",
          minHeight: 40,
          fontWeight: 400,
        }}
      >
        {first.description ? first.description : "-"}
      </Typography>
    </>
  );
}
