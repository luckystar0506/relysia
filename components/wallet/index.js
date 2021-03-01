import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import DepositeDialog from "./depositeDialog";
import WithdrawDialog from "./withdrawDialog";
import IconButton from "@material-ui/core/IconButton";
import CircularProgress from "@material-ui/core/CircularProgress";
import RefreshIcon from "@material-ui/icons/Refresh";
import firebase, { DB1 } from "../../config/fire-conf";
import Tooltip from "@material-ui/core/Tooltip";
import WalletGraph from "./walletGraph";
import Activity from "./activity";
import { useRouter } from "next/router";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Menu, Dropdown } from "antd";
import FilterListIcon from "@material-ui/icons/FilterList";
import { Checkbox } from "antd";
import Computer from "bitcoin-computer";
import TokensCon from "./tokensCon";
import moment from "moment";
import StasTokenCon from "./stasTokenCon";

function WalletPage(props) {
  const router = useRouter();

  const [depositeDialogState, setdepositeDialogState] = useState(false);
  const [withdrawDialogState, setwithdrawDialogState] = useState(false);
  const [refreshBalance, setrefreshBalance] = useState(false);
  const [walletTransactions, setwalletTransactions] = useState([]);
  const [selectedActivityState, setselectedActivityState] = useState(2);
  const [bsvRate, setbsvRate] = useState(0);
  const [dropdownState, setdropdownState] = useState(false);
  const [walletComputerObj, setwalletComputerObj] = useState(null);
  const [tokensList, settokensList] = useState([]);
  const [loadingTokens, setloadingTokens] = useState(true);
  const userDataRedux = useSelector((state) => state.userData);

  useEffect(() => {
    if (userDataRedux) {
      firebase
        .database()
        .ref(
          "userTransactions/" +
            userDataRedux.uid +
            "/" +
            router.query.walletId +
            "/transactions"
        )
        .on("value", (snapshot) => {
          if (snapshot.val()) {
            setwalletTransactions([...Object.values(snapshot.val())]);
          } else {
            setwalletTransactions([]);
          }
        });
    }
  }, [userDataRedux, props.currentWalletsData]);

  useEffect(() => {
    DB1.ref("stats/market_price_usd")
      .once("value")
      .then((snap) => {
        if (snap.val()) {
          setbsvRate(snap.val());
        }
      });
  }, []);

  useEffect(() => {
    if (props.currentWalletsData) {
      setloadingTokens(true);

      try {
        let newComputerObj = new Computer({
          chain: "BSV",
          network: "testnet",
          // network: "livenet",
          seed: props.currentWalletsData.mnemonic,
          path: "m/44'/0'/0'/0/0",
        });
        setwalletComputerObj(newComputerObj);

        getTokens(newComputerObj);
      } catch (err) {
        console.log("bitoin-computer err", err);
      }
    }
  }, [props.currentWalletsData]);

  const showDollarBal = (val) => {
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

  const refreshBalanceHandler = async () => {
    setrefreshBalance(true);
    let walletListAPI = firebase.functions().httpsCallable("getWalletBalances");
    await walletListAPI();
    setrefreshBalance(false);
  };

  const onChangeDeposite = (e) => {
    if (selectedActivityState === 2) {
      setselectedActivityState(1);
    } else if (selectedActivityState === 1) {
      setselectedActivityState(2);
    } else if (selectedActivityState === 0) {
      setselectedActivityState(-1);
    } else {
      setselectedActivityState(0);
    }
  };

  const onChangeWithdraw = () => {
    if (selectedActivityState === 2) {
      setselectedActivityState(0);
    } else if (selectedActivityState === 0) {
      setselectedActivityState(2);
    } else if (selectedActivityState === 1) {
      setselectedActivityState(-1);
    } else {
      setselectedActivityState(1);
    }
  };

  const getTokens = async (obj) => {
    setloadingTokens(true);

    if (walletComputerObj || obj) {
      let localComputerObj = obj ? obj : walletComputerObj;
      const revs = await localComputerObj.getRevs(
        localComputerObj.db.wallet.getPublicKey().toString()
      );
      let locallist = await Promise.all(
        revs.map(async (rev) => {
          return localComputerObj.sync(rev);
        })
      );

      settokensList([...locallist]);
      setloadingTokens(false);
    }
  };

  const tranTypeSele = (
    <Menu style={{ minWidth: 150 }}>
      <Menu.Item
        icon={
          <Checkbox defaultChecked={true} onChange={onChangeDeposite}>
            Deposite
          </Checkbox>
        }
      ></Menu.Item>
      <Menu.Item
        icon={
          <Checkbox defaultChecked={true} onChange={onChangeWithdraw}>
            Withdraw
          </Checkbox>
        }
      ></Menu.Item>
    </Menu>
  );

  return (
    <section className="ptb-50">
      <div className="container customize-con">
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

            <div className="balance-Head">
              <h2
                className="dbTag"
                style={{ display: "block", marginBottom: 10 }}
              >
                Your Balance
                <Tooltip title="Refresh">
                  <div className="refresh-wallet-con">
                    <IconButton
                      disabled={refreshBalance}
                      onClick={refreshBalanceHandler}
                      size="small"
                      color="primary"
                      style={{ marginLeft: 10 }}
                    >
                      {refreshBalance ? (
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
              <h1>
                {props.currentWalletsData &&
                props.currentWalletsData.dollarBal ? (
                  showDollarBal(props.currentWalletsData.dollarBal)
                ) : (
                  <span>
                    0<span className="main1-color">¢</span>
                  </span>
                )}
              </h1>
              <p>
                {" "}
                {props.currentWalletsData && props.currentWalletsData.bsvBal
                  ? (props.currentWalletsData.bsvBal / 100000000).toFixed(8) +
                    " BSV"
                  : "0 BSV"}
              </p>
            </div>

            <div className="wallet-btns">
              <div>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setdepositeDialogState(true);
                  }}
                  className="btn btn-primary btn-primary-inverse-color"
                >
                  Deposit
                </a>
              </div>
              <div>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setwithdrawDialogState(true);
                  }}
                  className="btn btn-primary "
                >
                  Withdraw
                </a>
              </div>
            </div>

            <TokensCon
              walletComputerObj={walletComputerObj}
              userDataRedux={userDataRedux}
              tokensList={tokensList}
              settokensList={settokensList}
              loadingTokens={loadingTokens}
              setloadingTokens={setloadingTokens}
              getTokens={getTokens}
            />

            <StasTokenCon userDataRedux={userDataRedux} />
          </div>
          <div className="wallet-con2">
            <PerfectScrollbar
              style={{ maxHeight: "100vh", height: "auto", padding: "0px 2px" }}
            >
              <div className="wallet-head">
                <h2 className="dbTag" style={{ display: "block" }}>
                  Transactions History
                </h2>
              </div>
              <div className="transaction-gr-summary">
                <WalletGraph activities={walletTransactions} />
              </div>
              <div className="wallet-head">
                <h2 className="dbTag" style={{ display: "block" }}>
                  Transactions Details
                </h2>
                <div
                  style={{
                    position: "absolute",

                    marginTop: -30,
                    marginLeft: 100,
                  }}
                >
                  <Dropdown
                    overlay={tranTypeSele}
                    placement="bottomCenter"
                    onVisibleChange={setdropdownState}
                    visible={dropdownState}
                  >
                    <IconButton style={{ outline: "none" }}>
                      <FilterListIcon />
                    </IconButton>
                  </Dropdown>
                </div>
              </div>
              <div style={{ margin: "15px 0px" }}>
                <Activity
                  activities={walletTransactions}
                  bsvRate={bsvRate}
                  selectedActivityState={selectedActivityState}
                />
              </div>
            </PerfectScrollbar>
          </div>
        </div>
      </div>
      <DepositeDialog
        dialogState={depositeDialogState}
        setdialogState={setdepositeDialogState}
        userDataRedux={userDataRedux}
        walletData={props.currentWalletsData ? props.currentWalletsData : null}
        walletComputerObj={walletComputerObj}
      />
      <WithdrawDialog
        dialogState={withdrawDialogState}
        setdialogState={setwithdrawDialogState}
        userDataRedux={userDataRedux}
        walletData={props.currentWalletsData ? props.currentWalletsData : null}
        walletComputerObj={walletComputerObj}
        getTokens={getTokens}
        tokensList={tokensList}
        settokensList={settokensList}
      />
    </section>
  );
}

export default WalletPage;
