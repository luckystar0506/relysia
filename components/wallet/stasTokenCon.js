import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";
import Avatar from "@material-ui/core/Avatar";
import ShowMoreText from "react-show-more-text";

const useStyles = makeStyles((theme) => ({
  papercon: {
    borderRadius: 15,
    padding: "20px 20px",
  },
}));

export default function StasTokenCon(props) {
  const classes = useStyles();
  const router = useRouter();

  return (
    <div className="token-view-con" style={{ marginBottom: 50 }}>
      <div style={{ marginBottom: 10 }}>
        <h2 className="dbTag" style={{ display: "block" }}>
          Wallet Tokens
        </h2>
        {props.walletStasTokens.map((ele, index) => {
          return (
            <div
              className="token-ele"
              key={"wallet-stas-token" + index}
              style={{ cursor: "pointer" }}
              onClick={() => {
                router.push("/app/stas-tokens/" + ele.tokenId);
              }}
            >
              <Paper className={classes.papercon}>
                <div className="token-item">
                  <div>
                    <Avatar
                      alt="token-icon"
                      src={
                        ele.iconURL
                          ? ele.iconURL
                          : "https://image.shutterstock.com/image-vector/dots-letter-c-logo-design-260nw-551769190.jpg"
                      }
                    />
                  </div>
                  <div className="token-item-2">
                    <h5>{ele.ticker}</h5>
                    <p>
                      <ShowMoreText
                        lines={2}
                        more="more"
                        less="less"
                        anchorClass="anchor-more-class"
                        expanded={false}
                      >
                        {ele.protocol}
                      </ShowMoreText>
                    </p>
                  </div>
                  <p className="tokens-count"> {ele.balance}</p>
                </div>
              </Paper>
            </div>
          );
        })}
      </div>

      <ToastContainer />
    </div>
  );
}
