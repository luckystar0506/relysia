import React, { useState, useEffect } from "react";
import CustomLoader from "../Layouts/CustomLoader";
import ShowMoreText from "react-show-more-text";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import MintTokenDialog from "./mintTokenDialog";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import RefreshIcon from "@material-ui/icons/Refresh";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  papercon: {
    borderRadius: 15,
    padding: "20px 20px",
  },
}));

export default function TokensCon(props) {
  const classes = useStyles();
  const [newTokenDialogState, setnewTokenDialogState] = useState(false);
  const [refreshTokens, setrefreshTokens] = useState(false);

  const groupByRoot = (list) =>
    list.reduce(
      (acc, obj) => ({
        ...acc,
        [obj["_rootId"]]: (acc[obj["_rootId"]] || []).concat(obj),
      }),
      {}
    );

  const refreshTokensHandler = () => {
    setrefreshTokens(true);
    props.getTokens();

    setTimeout(() => {
      setrefreshTokens(false);
    }, 1500);
  };

  return (
    <div className="token-view-con">
      <div style={{ display: "flex", alignItems: "center", marginBottom: 10 }}>
        <h2 className="dbTag" style={{ display: "block" }}>
          Tokens{" "}
          <Tooltip title="Refresh">
            <div className="refresh-token-con ">
              <IconButton
                disabled={refreshTokens}
                onClick={refreshTokensHandler}
                size="small"
                color="primary"
                style={{ marginLeft: 10 }}
              >
                {refreshTokens ? (
                  <CircularProgress
                    size={16}
                    thickness={4}
                    style={{ color: "#f48665" }}
                  />
                ) : (
                  <RefreshIcon
                    style={{ height: 17, width: 17, color: "#f48665" }}
                  />
                )}
              </IconButton>
            </div>
          </Tooltip>{" "}
        </h2>
        <p
          className="mint-btn link"
          onClick={() => setnewTokenDialogState(true)}
        >
          Mint Token
        </p>
      </div>
      <div>
        {Object.values(groupByRoot(props.tokensList)).length === 0 &&
          !props.loadingTokens && (
            <p style={{ marginLeft: 10 }}>You didn't have any tokens</p>
          )}
        {props.loadingTokens ? (
          <div style={{ marginTop: 25 }}>
            <CustomLoader />
          </div>
        ) : (
          Object.values(groupByRoot(props.tokensList)).map((tokens, index) => {
            const [first] = tokens;
            const balance = tokens.reduce(
              (acc, token) => acc + parseInt(token.coins, 10),
              0
            );
            return (
              <div className="token-ele" key={tokens[0]._id}>
                <Paper className={classes.papercon}>
                  <div className="token-item">
                    <div>
                      <Avatar
                        alt="token-icon"
                        src={
                          first.tokenImage
                            ? first.tokenImage
                            : "https://image.shutterstock.com/image-vector/dots-letter-c-logo-design-260nw-551769190.jpg"
                        }
                      />
                    </div>
                    <div className="token-item-2">
                      <h5>{first.name}</h5>
                      <p>
                        <ShowMoreText
                          lines={2}
                          more="more"
                          less="less"
                          anchorClass="anchor-more-class"
                          expanded={false}
                        >
                          {first.description ? first.description : "-"}
                        </ShowMoreText>
                      </p>
                    </div>
                    <p className="tokens-count"> {balance}</p>
                  </div>
                </Paper>
              </div>
            );
          })
        )}
      </div>
      <MintTokenDialog
        dialogState={newTokenDialogState}
        setdialogState={setnewTokenDialogState}
        walletComputerObj={props.walletComputerObj}
        getTokens={props.getTokens}
      />
    </div>
  );
}
