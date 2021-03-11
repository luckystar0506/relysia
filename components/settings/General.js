import React, { useState } from "react";
import { useRouter } from "next/router";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import firebase from "../../config/fire-conf";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import { ToastContainer, toast } from "react-toastify";
import * as Icon from "react-feather";
import Popper from "@material-ui/core/Popper";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import { Popconfirm } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";

const useStyles = makeStyles((theme) => ({}));

function GeneralSettings(props) {
  const router = useRouter();
  const classes = useStyles();

  const [selectedWallet, setselectedWallet] = useState(0);
  const [anchorElWalletName, setAnchorElWalletName] = useState(null);
  const [walletNameField, setwalletNameField] = useState("");

  const handleClickWalletNamePopup = (event) => {
    setAnchorElWalletName(anchorElWalletName ? null : event.currentTarget);
  };

  const updateWalletName = async () => {
    if (walletNameField !== "") {
      let modefiedObj = { ...props.walletsData };
      modefiedObj[
        props.walletListArray[selectedWallet].id
      ].title = walletNameField;
      props.setwalletsData(modefiedObj);

      //updating data in firebase
      let updates = {};
      updates[
        "userWallets/" +
          props.userDataRedux.uid +
          "/" +
          props.walletListArray[selectedWallet].id +
          "/title"
      ] = walletNameField;
      firebase.database().ref().update(updates);

      setTimeout(() => {
        toast.success("Wallet name updated Successfully", {
          position: "bottom-left",
          autoClose: 10000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }, 1000);
      handleClickWalletNamePopup();
    } else {
      toast.error("Please provide wallet name!", {
        position: "bottom-left",
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const confirmDelete = () => {
    let modefiedObj = { ...props.walletsData };
    delete modefiedObj[props.walletListArray[selectedWallet].id];
    props.setwalletsData(modefiedObj);

    //updating data in firebase
    let updates = {};
    updates[
      "userWallets/" +
        props.userDataRedux.uid +
        "/" +
        props.walletListArray[selectedWallet].id
    ] = {};

    firebase.database().ref().update(updates);

    setTimeout(() => {
      toast.success("Wallet deleted Successfully", {
        position: "bottom-left",
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }, 1000);
  };

  const openDbNamePopup = Boolean(anchorElWalletName);
  const idWalletNamePopup = openDbNamePopup ? "db-name-popper" : undefined;

  return (
    <>
      <section className="blog-details-area">
        <div className="row">
          <div className="col-lg-12 col-md-12" style={{ margin: "0px auto" }}>
            <div className="blog-details">
              <div className="article-content">
                <h5>Your Wallets</h5>

                {props.walletListArray && props.walletListArray.length > 0 ? (
                  <div className="generalSet-con-main">
                    <div className="generalSet-con1">
                      {props.walletListArray.map((ele, index) => {
                        return (
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                            }}
                            className={
                              selectedWallet === index
                                ? "single-box2 bg-eb6b3d dbselecednav"
                                : "single-box2 bg-eb6b3d "
                            }
                            key={ele.id + "nav"}
                            onClick={() => setselectedWallet(index)}
                          >
                            <div
                              className="icon"
                              style={{ cursor: "pointer", marginRight: 12 }}
                            >
                              <Icon.CreditCard style={{ height: 18, width: 18 }} />
                            </div>
                            <div className="sett-gen-nav-nam">
                              <p
                                className="nav-set-head"
                                style={{ color: "#0a0f12" }}
                              >
                                {ele.title}
                              </p>
                              <p
                                style={{
                                  fontSize: 11,
                                  position: "relative",
                                  top: -4,
                                }}
                              >
                                {ele.id === "vaionex-wallet"
                                  ? "Default wallet"
                                  : "Custom wallet"}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="generalSet-con2">
                      <div
                        style={{ marginTop: 0 }}
                        className="general-settings"
                      >
                        <h6 style={{ marginTop: 0 }}>
                          Wallet Name
                          <IconButton
                            size="small"
                            style={{
                              position: "absolute",
                              marginTop: -4,
                              marginLeft: 6,
                            }}
                            aria-describedby={idWalletNamePopup}
                            onClick={(e) => {
                              setwalletNameField(
                                props.walletListArray[selectedWallet] &&
                                  props.walletListArray[selectedWallet].title
                                  ? props.walletListArray[selectedWallet].title
                                  : ""
                              );
                              handleClickWalletNamePopup(e);
                            }}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </h6>
                        <p>
                          {props.walletListArray[selectedWallet] &&
                          props.walletListArray[selectedWallet].title
                            ? props.walletListArray[selectedWallet].title
                            : "-"}
                        </p>

                        <h6>Wallet ID</h6>
                        <p>
                          {props.walletListArray[selectedWallet] &&
                          props.walletListArray[selectedWallet].id
                            ? props.walletListArray[selectedWallet].id
                            : "-"}
                        </p>

                        <h6>
                          Mnemonic Phrase{" "}
                          <span className="helper-test-settings">
                            (Please Keep backup of this to secure your wallet.){" "}
                          </span>
                        </h6>
                        <p>
                          {props.walletListArray[selectedWallet] &&
                          props.walletListArray[selectedWallet].mnemonic
                            ? props.walletListArray[selectedWallet].mnemonic
                            : "-"}
                        </p>

                        <h6>Remove this wallet</h6>
                        <Popconfirm
                          placement="top"
                          title={
                            <div>
                              Are you sure to delete this Wallet?
                              <br /> You will not be able to acess wallet keys
                              anymore!
                            </div>
                          }
                          onConfirm={() => confirmDelete()}
                          okText="Yes"
                          cancelText="No"
                          icon={
                            <QuestionCircleOutlined
                              style={{ color: "#B33A3A" }}
                            />
                          }
                        >
                          <Button
                            style={{
                              color: "#B33A3A",
                            }}
                            startIcon={<DeleteIcon />}
                          >
                            Delete
                          </Button>
                        </Popconfirm>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="generalSet-con-main">
                    <p>You didn't have any apps yet </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </section>
      <Popper
        id={idWalletNamePopup}
        open={openDbNamePopup}
        anchorEl={anchorElWalletName}
        placement="bottom"
        disablePortal={false}
        modifiers={{
          flip: {
            enabled: true,
          },
          preventOverflow: {
            enabled: true,
            boundariesElement: "scrollParent",
          },
        }}
      >
        <Paper className="poper-dbname">
          <h6 className="popHeadMain">Update App Name</h6>
          <div className="form-group" style={{ margin: "20px 0px" }}>
            <input
              type="text"
              name="DB Name"
              className="form-control"
              required
              data-error="Please enter your DB Name"
              placeholder="DB Name"
              style={{ height: 40 }}
              value={walletNameField}
              onChange={(e) => {
                setwalletNameField(e.target.value);
              }}
              autoFocus
            />
          </div>
          <div className="normal-button" style={{ display: "flex" }}>
            <div style={{ marginLeft: "auto" }}>
              <button
                style={{ marginRight: 10 }}
                onClick={handleClickWalletNamePopup}
              >
                Cancel
              </button>

              <button onClick={updateWalletName}>Update</button>
            </div>
          </div>
        </Paper>
      </Popper>
    </>
  );
}

export default GeneralSettings;
