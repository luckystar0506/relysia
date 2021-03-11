import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import CustomLoader from "../Layouts/CustomLoader";
import firebase from "../../config/fire-conf";
import { withRouter } from "next/router";
import Link from "next/link";
import IconButton from "@material-ui/core/IconButton";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { useSelector } from "react-redux";

const styles = (theme) => ({
  inputFieldStyle: {
    paddingTop: "30px !important",
    fontSize: "14px !important",
    color: "#0e314c",

    "& .MuiFilledInput-root": {
      paddingTop: "30px !important",
      fontSize: "14px !important",
      color: "#0e314c",
      backgroundColor: "red !important",
    },
  },
  customInput: {
    backgroundColor: "#eeeeee !important",
  },
});

const useStyles = makeStyles((theme) => ({
  largeAvatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    margin: 0,
    padding: 0,
  },
}));

function TokenDetails(props) {
  const classes = useStyles();
  const userDataRedux = useSelector((state) => state.userData);
  const router = useRouter();
  const tokenId = router.query.tokenId;
  const [tokenDetails, settokenDetails] = useState({});
  const [tokenTransactions, settokenTransactions] = useState([]);

  useEffect(() => {
    getTokenDetails();
  }, []);

  const getTokenDetails = async () => {
    try {
      let res = await axios({
        method: "get",
        url: `https://taalnet.whatsonchain.com/v1/bsv/taalnet/token/${tokenId}`,
        auth: {
          username: "taal_private",
          password: "dotheT@@l007",
        },
      });
      if (res && res.status === 200 && res.data && res.data.token) {
        settokenDetails(res.data.token);
      }

      let tranres = await axios({
        method: "get",
        url: `https://taalnet.whatsonchain.com/v1/bsv/taalnet/token/${tokenId}/tx`,
        auth: {
          username: "taal_private",
          password: "dotheT@@l007",
        },
      });
      if (
        tranres &&
        tranres.status === 200 &&
        tranres.data &&
        tranres.data.txs
      ) {
        settokenTransactions(tranres.data.txs);
      }
    } catch (err) {
      console.log("err", err);
    }
  };

  return (
    <>
      <div className="page-title-area">
        <div className="container">
          <div className="section-title" style={{ marginBottom: 0 }}>
            <h2>{tokenDetails.name ? tokenDetails.name : " "}</h2>
            <p>Token Details</p>
          </div>
        </div>

        <div className="shape1">
          <img src={require("../../static/images/shape1.png")} alt="shape" />
        </div>
        <div className="shape2 rotateme">
          <img src={require("../../static/images/shape2.svg")} alt="shape" />
        </div>
        <div className="shape3">
          <img src={require("../../static/images/shape3.svg")} alt="shape" />
        </div>
        <div className="shape4">
          <img src={require("../../static/images/shape4.svg")} alt="shape" />
        </div>
        <div className="shape5">
          <img src={require("../../static/images/shape5.png")} alt="shape" />
        </div>
        <div className="shape6 rotateme">
          <img src={require("../../static/images/shape4.svg")} alt="shape" />
        </div>
        <div className="shape7">
          <img src={require("../../static/images/shape4.svg")} alt="shape" />
        </div>
        <div className="shape8 rotateme">
          <img src={require("../../static/images/shape2.svg")} alt="shape" />
        </div>
      </div>
      <section
        className="services-details-area ptb-50"
        style={{ paddingBottom: 0 }}
      >
        <div className="container" style={{ marginBottom: 80 }}>
          <div className="details-box-con">
            <h2 className="details-box-head">Token Summary</h2>
            <div className="details-box-details">
              <div className="box">
                {Object.keys(tokenDetails)
                  .slice(0, Math.ceil(Object.keys(tokenDetails).length / 2))
                  .map((ele, index) => {
                    return (
                      <div className="details-box-item" key={"item" + index}>
                        <p className="details-val">
                          <span className="details-title">{ele} :</span>{" "}
                          {tokenDetails[ele]
                            ? typeof tokenDetails[ele] !== "string"
                              ? JSON.stringify(tokenDetails[ele])
                              : tokenDetails[ele]
                            : "-"}
                        </p>
                      </div>
                    );
                  })}
              </div>
              <div className="box">
                {Object.keys(tokenDetails)
                  .slice(
                    Math.ceil(Object.keys(tokenDetails).length / 2),
                    Object.keys(tokenDetails).length
                  )
                  .map((ele, index) => {
                    return (
                      <div className="details-box-item" key={"item" + index}>
                        <p className="details-val">
                          <span className="details-title">{ele} :</span>{" "}
                          {tokenDetails[ele]
                            ? typeof tokenDetails[ele] !== "string"
                              ? JSON.stringify(tokenDetails[ele])
                              : tokenDetails[ele]
                            : "-"}
                        </p>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>

          <div className="details-box-con" style={{ marginTop: 35 }}>
            <h2 className="details-box-head">Token Transactions</h2>
            <div className="details-box-details">
              {tokenTransactions.map((ele, index) => {
                return (
                  <div
                    className="details-box-tran-con"
                    key={"transaction" + index}
                  >
                    <p style={{ marginRight: 15, color: "#000000" }}>
                      {" "}
                      T{index}:
                    </p>{" "}
                    <a
                      href={`https://taalnet.whatsonchain.com/tx/${ele}`}
                      target="_blank"
                    >
                      <p className="details-tran-item">{ele}</p>
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <ToastContainer />
      </section>
    </>
  );
}

export default TokenDetails;
