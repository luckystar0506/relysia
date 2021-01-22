import React, { useState, useRef, useEffect } from "react";
import CustomLoader from "../Layouts/CustomLoader";
import ShowMoreText from "react-show-more-text";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import useInterval from "./useInterval";
import Avatar from "@material-ui/core/Avatar";
import MintTokenDialog from "./mintTokenDialog";

const useStyles = makeStyles((theme) => ({
  papercon: {
    borderRadius: 15,
    padding: "20px 20px",
  },
}));

export default function TokensCon(props) {
  const classes = useStyles();
  const [tokensList, settokensList] = useState([]);
  const [loadingTokens, setloadingTokens] = useState(true);
  const [newTokenDialogState, setnewTokenDialogState] = useState(false);

  useEffect(() => {
    setloadingTokens(true);
    getTokens();
  }, [props.walletComputerObj]);

  const getTokens = async () => {
    if (props.walletComputerObj) {
      const revs = await props.walletComputerObj.getRevs(
        props.walletComputerObj.db.wallet.getPublicKey().toString()
      );
      settokensList(
        await Promise.all(
          revs.map(async (rev) => {
            return props.walletComputerObj.sync(rev);
          })
        )
      );
      setloadingTokens(false);
    }
  };

  const groupByRoot = (list) =>
    list.reduce(
      (acc, obj) => ({
        ...acc,
        [obj["_rootId"]]: (acc[obj["_rootId"]] || []).concat(obj),
      }),
      {}
    );

  // useInterval(() => {
  //   getTokens();
  // }, 10000);

  return (
    <div className="token-view-con">
      <div style={{ display: "flex", alignItems: "center", marginBottom: 10 }}>
        <h2 className="dbTag" style={{ display: "block" }}>
          Tokens
        </h2>
        <p
          className="mint-btn link"
          onClick={() => setnewTokenDialogState(true)}
        >
          Mint Token
        </p>
      </div>
      <div>
        {loadingTokens ? (
          <div style={{ marginTop: 25 }}>
            <CustomLoader />
          </div>
        ) : (
          Object.values(groupByRoot(tokensList)).map((tokens, index) => {
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
      />
    </div>
  );
}
