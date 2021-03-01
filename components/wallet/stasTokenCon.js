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
import CreateStasTokenDialog from "./createNewStasToken";

const useStyles = makeStyles((theme) => ({
  papercon: {
    borderRadius: 15,
    padding: "20px 20px",
  },
}));


export default function StasTokenCon(props) {
  const classes = useStyles();
  const [newTokenDialogState, setnewTokenDialogState] = useState(false);
  const [adminTokens, setadminTokens] = useState([]); //tokens created by this user

  useEffect(()=>{
    
  },[])

  return (
    <div className="token-view-con" style={{ marginBottom: 50 }}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: 10 }}>
        <h2 className="dbTag" style={{ display: "block" }}>
          Stas Tokens{" "}
        </h2>
        <p
          className="mint-btn link"
          onClick={() => setnewTokenDialogState(true)}
        >
          Create New Contract
        </p>
      </div>
      <div>
        {adminTokens.map((ele, index) => {
          <div className="token-ele" key={"issuedtoken" + index}>
            <Paper className={classes.papercon}>
              <div className="token-item">
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
          </div>;
        })}
      </div>

      <CreateStasTokenDialog
        dialogState={newTokenDialogState}
        setdialogState={setnewTokenDialogState}
        userDataRedux={props.userDataRedux}
      />
    </div>
  );
}
