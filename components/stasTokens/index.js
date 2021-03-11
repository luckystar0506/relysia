import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import CircularProgress from "@material-ui/core/CircularProgress";
import * as Icon from "react-feather";
import firebase, { DB1 } from "../../config/fire-conf";
import Tooltip from "@material-ui/core/Tooltip";
import { useRouter } from "next/router";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Menu, Dropdown } from "antd";
import FilterListIcon from "@material-ui/icons/FilterList";
import { Checkbox } from "antd";
import moment from "moment";
import Link from "next/link";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  largeAvatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    margin: 0,
    padding: 0,
  },
}));

function StasTokenComponent(props) {
  const router = useRouter();
  const classes = useStyles();

  const userDataRedux = useSelector((state) => state.userData);
  const [userCreatedTokens, setuserCreatedTokens] = useState([]); //tokens created by this user

  useEffect(() => {
    if (userDataRedux) {
      getUserCreatedTokens(userDataRedux.uid);
    }
  }, [userDataRedux]);

  const getUserCreatedTokens = async (userId) => {
    let dataObj = await firebase
      .database()
      .ref("stasTokens/userTokens/" + userId + "/myTokens")
      .once("value")
      .then((snap) => (snap.val() ? snap.val() : null));
    if (dataObj) {
      setuserCreatedTokens(Object.values(dataObj));
    }
  };

  return (
    <section className="ptb-50">
      <div className="container customize-con">
        <div className="stas-view-con">
          <div className="stas-head">
            <h1>Manage Stas Tokens</h1>
            <div style={{ marginLeft: "auto" }}>
              <Link href="/app/stas-tokens/create">
                <a className="btn btn-primary">Create New Token</a>
              </Link>
            </div>
          </div>
          <div className="stas-tokenDetails row">
            {userCreatedTokens.map((ele, index) => {
              return (
                <Link href={`/app/stas-tokens/${ele.tokenId}`}>
                  <div
                    className="col-lg-3 col-md-6"
                    style={{ cursor: "pointer" }}
                    key={"stas-token" + index}
                  >
                    <div className="single-box bg-eb6b3d fix-height-tokencon">
                      <div
                        style={{
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          marginBottom: 20,
                        }}
                      >
                        <div className="icon">
                          <Avatar
                            alt={ele.tickerSymbol}
                            src={ele.icon}
                            className={classes.largeAvatar}
                          />
                        </div>
                        <p style={{ marginLeft: "auto" }}>{ele.supply}</p>
                      </div>
                      <h3 style={{ cursor: "pointer", fontSize: 22 }}>
                        {ele.tickerSymbol}
                      </h3>
                      <p>{ele.tokenName}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
            {userCreatedTokens.length === 0 && (
              <div>
                {" "}
                <p style={{ marginLeft: 20 }}>
                  You don't have any Stas Tokens yet,
                  <Link href="/app/stas-tokens/create">
                    <span className="link"> create one!</span>
                  </Link>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default StasTokenComponent;
