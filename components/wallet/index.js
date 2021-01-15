import React, { useState } from "react";
import * as Icon from "react-feather";
import Link from "../common/ActiveLink";
import ShowMoreText from "react-show-more-text";
import { route } from "next/dist/next-server/server/router";
import { useRouter } from "next/router";
// import NewWalletDialog from "./newWalletDialog";
import { useDispatch, useSelector } from "react-redux";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";

function WalletPage(props) {
  const router = useRouter();
  const [newWalletDialogState, setnewWalletDialogState] = useState(false);

  const userDataRedux = useSelector((state) => state.userData);
  const showDollarBal = (val) => {
    console.log("val", val);

    if (Number(val) < 1) {
      return (
        <span>
          {(Number(val) * 100).toFixed(2)}
          <span className="main1-color">¢</span>
        </span>
      );
    } else {
      return (
        <span>
          <span className="main1-color">$</span>
          {Number(val).toFixed(2)}
        </span>
      );
    }
  };
  return (
    <section className="ptb-50">
      <div className="container">
        <div className="wallet-view-con">
          <div className="wallet-con1">
            <div className="wallet-head">
              <h2 className="dbTag" style={{ display: "block" }}>
                Wallet
              </h2>
              <h1>
                {props.currentWalletsData && props.currentWalletsData.title
                  ? props.currentWalletsData.title
                  : "-"}
              </h1>
            </div>

            <div className=" balance-Head">
              <h2 className="dbTag" style={{ display: "block" }}>
                Your Balance
              </h2>
              <h1>
                {props.currentWalletsData && props.currentWalletsData.dollarBal
                  ? showDollarBal(props.currentWalletsData.dollarBal)
                  : "-"}
              </h1>
              <p>
                {" "}
                {props.currentWalletsData && props.currentWalletsData.bsvBal
                  ? (props.currentWalletsData.bsvBal / 100000000).toFixed(8) +
                    " BSV"
                  : "-"}
              </p>
            </div>

            <div className="wallet-btns">
              <div style={{ marginRight: 20 }}>
                <Link href="#">
                  <a className="btn btn-primary">Deposit</a>
                </Link>
              </div>
              <div>
                <Link href="#">
                  <a className="btn btn-primary btn-primary-inverse-color">
                    Withdraw
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <div className="wallet-con2"></div>
        </div>
      </div>
    </section>
  );
}

export default WalletPage;
