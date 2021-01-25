import React, { useState, useEffect } from "react";
import * as Icon from "react-feather";
import Link from "next/link";
import { useSelector } from "react-redux";
import DynamicDialog from "./DynamicDialog";
import ProfileImage from "./ProfileImage";
import { DB1 } from "../../config/fire-conf";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { ToastContainer, toast } from "react-toastify";

var QRCode = require("qrcode.react");

export default function ProfileView() {
  const userDataRedux = useSelector((state) => state.userData);
  const [ImageErr, setImageErr] = useState(false);
  const [dialogState, setdialogState] = useState(false);
  const [dialogType, setdialogType] = useState("");
  const [profileImg, setprofileImg] = useState(undefined);
  const [walletData, setwalletData] = useState({ address: "" });

  useEffect(() => {
    if (userDataRedux && userDataRedux.photoURL) {
      setprofileImg(userDataRedux.photoURL);
    }
    if (userDataRedux) {
      DB1.ref("KeyStore/" + userDataRedux.uid).once("value", (snapshot) => {
        if (snapshot.val()) {
          setwalletData(snapshot.val());
        }
      });
    }
  }, [userDataRedux]);

  const refetchImageUpdate = () => {
    let localSwap = profileImg;
    setprofileImg("");
    setprofileImg(localSwap);
  };

  return (
    <section className="team-area ptb-80 bg-f9f6f6">
      <ToastContainer />
      <div className="container">
        <div className="row">
          <div className="col-lg-5 col-md-6">
            <div className="single-team">
              <div
                className="team-image"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setdialogType("update-image");
                  setdialogState(true);
                }}
              >
                {profileImg && !ImageErr ? (
                  <ProfileImage
                    src={profileImg}
                    onError={() => setImageErr(true)}
                  />
                ) : (
                  <div className="singleChracterDisplay">
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        color: "#ffffff",
                        fontWeight: 600,
                        fontSize: 22,
                      }}
                    >
                      {userDataRedux && userDataRedux.displayName
                        ? userDataRedux.displayName.slice(0, 1)
                        : "."}
                    </div>
                  </div>
                )}
                <div
                  className="editIcon"
                  style={{
                    position: "absolute",
                    bottom: 0,
                    marginLeft: "-10px",
                  }}
                >
                  <Icon.Edit />
                </div>
              </div>

              <div className="team-content">
                <div className="team-info">
                  <h3
                    style={{
                      display: "block",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      width: "92%",
                      margin: "0px auto",
                    }}
                  >
                    {userDataRedux ? userDataRedux.displayName : "..."}
                  </h3>
                  <span
                    style={{
                      display: "block",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      width: "92%",
                      margin: "0px auto",
                    }}
                  >
                    {userDataRedux && userDataRedux.email
                      ? userDataRedux.email
                      : "..."}
                  </span>
                </div>

                {/* // profile settings */}
                <div className="services-content">
                  <div className="row">
                    <div className="col-xl-6 col-lg-12">
                      <div
                        className="box"
                        onClick={() => {
                          setdialogType("update-username");
                          setdialogState(true);
                        }}
                      >
                        Update Username
                      </div>
                    </div>

                    <div className="col-xl-6 col-lg-12">
                      <div
                        className="box"
                        onClick={() => {
                          setdialogType("update-email");
                          setdialogState(true);
                        }}
                      >
                        Update Email
                      </div>
                    </div>

                    <div className="col-xl-6 col-lg-12">
                      <div
                        className="box"
                        onClick={() => {
                          setdialogType("update-password");
                          setdialogState(true);
                        }}
                      >
                        Update Password
                      </div>
                    </div>

                    <div className="col-xl-6 col-lg-12">
                      <div
                        className="box"
                        onClick={() => {
                          setdialogType("update-account");
                          setdialogState(true);
                        }}
                      >
                        Delete Account
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-7 col-md-6">
            <div className="single-team">
              <div className="col-lg-12">
                <div
                  style={{
                    marginBottom: 20,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <h6 style={{ textAlign: "left" }}>
                      Bitcoin Wallet:{" "}
                      <span style={{ fontWeight: 300, marginLeft: 10 }}>
                        {" "}
                        {walletData.balance ? walletData.balance : 0} sats
                      </span>
                    </h6>
                  </div>

                  <div
                    style={{ marginLeft: "auto" }}
                    className="buttonColorInverse"
                  >
                    <button
                      type="button"
                      className="btn btn-primary btn-small"
                      onClick={() => {
                        setdialogType("export");
                        setdialogState(true);
                      }}
                    >
                      export
                    </button>
                  </div>
                </div>
                <CopyToClipboard
                  text={walletData.address ? walletData.address : "-"}
                  onCopy={() => {
                    toast.success("Address Copied!", {
                      position: "bottom-left",
                      autoClose: 10000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                    });
                  }}
                >
                  <div style={{ cursor: "pointer" }}>
                    <QRCode
                      value={"bitcoin:" + walletData.address + "?sv"}
                      renderAs="svg"
                    />
                    <p
                      style={{
                        marginTop: 5,

                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {walletData.address ? walletData.address : ""}
                    </p>
                  </div>
                </CopyToClipboard>
                <button
                  type="button"
                  className="btn btn-primary btn-small"
                  style={{ marginTop: 10 }}
                  onClick={() => {
                    setdialogType("withdraw");
                    setdialogState(true);
                  }}
                >
                  Withdraw
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <DynamicDialog
        userEmail={userDataRedux ? userDataRedux.email : ""}
        dialogState={dialogState}
        setdialogState={setdialogState}
        dialogType={dialogType}
        photoUrl={
          userDataRedux && userDataRedux.photoURL && !ImageErr
            ? userDataRedux.photoURL
            : undefined
        }
        uid={userDataRedux && userDataRedux.uid ? userDataRedux.uid : ""}
        setprofileImg={setprofileImg}
        refetchImageUpdate={refetchImageUpdate}
      />
    </section>
  );
}
