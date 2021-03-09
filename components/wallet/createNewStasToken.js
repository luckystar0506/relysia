import React, { useState, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Slide from "@material-ui/core/Slide";
import firebase from "../../config/fire-conf";
import CustomLoader from "../Layouts/CustomLoader";
import { ToastContainer, toast } from "react-toastify";
import { makeStyles } from "@material-ui/core/styles";
import PerfectScrollbar from "react-perfect-scrollbar";
import TextareaAutosize from "react-textarea-autosize";
import CountrySelect from "react-bootstrap-country-select";
import { contract, utils } from "../../stas-js/index";

const bsv = require("bsv");
const { getFundsFromFaucet, broadcast } = utils;

const useStyles = makeStyles((theme) => ({
  select: {
    "&:before": {
      borderColor: "#f48665",
    },
    "&:after": {
      borderColor: "#f48665",
    },
  },
  icon: {
    fill: "#f48665",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CreateStasTokenDialog(props) {
  const classes = useStyles();

  const [loading, setloading] = useState(false);
  const [tokenSupply, settokenSupply] = useState("");
  const [issuerCountryObj, setissuerCountryObj] = useState({
    alpha2: "us",
    alpha3: "usa",
    flag: "🇺🇸",
    id: "us",
    ioc: "usa",
    name: "United States",
  });

  const [tokenSchema, settokenSchema] = useState({
    schemaId: "Schema STAS Coupon",
    tokenName: "",
    tokenId: "",
    tokenDescription: "",
    issuerName: "",
    issuerCountry: "United States",
    issuerLegalForm: "Limited Liability Public Company",
    issuerEmail: "",
    issuerWebsite: "",
    terms: "© 2021",
    governingLaw: "Cayman Islands Law",
    icon: "",
    tickerSymbol: "TAAL",
  });

  const handleClose = () => {
    props.setdialogState(false);
  };

  const createNewTokenFunc = async () => {
    setloading(true);
    try {
      const tokenDetails = { ...tokenSchema };
      const contractPrivateKey = bsv.PrivateKey();

      const utxos = await getFundsFromFaucet(
        contractPrivateKey.toAddress("testnet").toString()
      );

      const publicKeyHash = bsv.crypto.Hash.sha256ripemd160(
        contractPrivateKey.publicKey.toBuffer()
      ).toString("hex");

      tokenDetails.tokenId = publicKeyHash;

      const contractHex = contract(
        contractPrivateKey,
        utxos,
        tokenDetails,
        Number(tokenSupply)
      );

      const contractTxid = await broadcast(contractHex);
      console.log(`Contract TX:     ${contractTxid}`);
      console.log("address", contractPrivateKey.toAddress().toString());

      //storing token details in firebase
      let contractPublicKey = contractPrivateKey.publicKey.toString();
      let contractAddress = contractPrivateKey.toAddress().toString();

      tokenDetails.contractPublicKey = contractPublicKey;
      tokenDetails.contractAddress = contractAddress;

      let updates = {};
      updates["stasTokens/tokensDetails/" + contractAddress] = tokenDetails;
      let tokenObj = {
        contractPrivateKey: contractPrivateKey.toString(),
        contractTxid: contractTxid,
        issued: 0,
        supply: tokenSupply,
        contractPublicKey: contractPublicKey,
        tokenId: publicKeyHash,
        tokenName: tokenDetails.tokenName,
        tickerSymbol: tokenDetails.tickerSymbol,
        icon: tokenDetails.icon,
        tokensIssued: false,
        issueTxid: null,
        contractAddress: contractAddress,
        tokenTransferred: false,
      };
      updates[
        "stasTokens/userTokens/" +
          props.userDataRedux.uid +
          "/myTokens/" +
          contractAddress
      ] = tokenObj;
      firebase.database().ref().update(updates);

      props.setuserCreatedTokens([...props.userCreatedTokens, tokenObj]);
      toast.success(`Contract created successfully!`, {
        position: "bottom-left",
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setloading(false);
      handleClose();

      settokenSchema({
        schemaId: "Schema STAS Coupon",
        tokenName: "",
        tokenId: "",
        tokenDescription: "",
        issuerName: "",
        issuerCountry: "United States",
        issuerLegalForm: "Limited Liability Public Company",
        issuerEmail: "",
        issuerWebsite: "",
        terms: "© 2021",
        governingLaw: "Cayman Islands Law",
        icon: "",
        tickerSymbol: "TAAL",
      });
      settokenSupply("");
      setissuerCountryObj({
        alpha2: "us",
        alpha3: "usa",
        flag: "🇺🇸",
        id: "us",
        ioc: "usa",
        name: "United States",
      });
    } catch (err) {
      console.log("catch err", err);
      toast.error(err.message, {
        position: "bottom-left",
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      setloading(false);
    }
  };

  return (
    <>
      <Dialog
        open={props.dialogState}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        fullWidth
        style={{ zIndex: 1000 }}
        maxWidth="sm"
        className="custom-dialog"
      >
        <PerfectScrollbar style={{ maxHeight: "90vh" }}>
          <h5 style={{ padding: "18px 24px 5px 24px" }}>Create New Contract</h5>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              createNewTokenFunc();
            }}
          >
            <DialogContent>
              <>
                <div className="form-group">
                  <label>Token Name</label>

                  <input
                    onChange={(e) => {
                      let modifiedObj = { ...tokenSchema };
                      modifiedObj.tokenName = e.target.value;
                      settokenSchema(modifiedObj);
                    }}
                    value={tokenSchema.tokenName}
                    type="text"
                    className="form-control"
                    placeholder="Enter token name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Token Supply</label>

                  <input
                    onChange={(e) => {
                      settokenSupply(e.target.value);
                    }}
                    value={tokenSupply}
                    type="number"
                    className="form-control"
                    placeholder="Enter the desired token supply"
                    required
                    min={100}
                  />
                </div>

                <div className="form-group">
                  <label>Country</label>

                  <CountrySelect
                    value={issuerCountryObj}
                    onChange={(e) => {
                      setissuerCountryObj(e);

                      if (e && e.name) {
                        let modifiedObj = { ...tokenSchema };
                        modifiedObj.issuerCountry = e.name;
                        settokenSchema(modifiedObj);
                      }
                    }}
                  />
                </div>

                <div className="form-group">
                  <label>Issuer Name</label>

                  <input
                    onChange={(e) => {
                      let modifiedObj = { ...tokenSchema };
                      modifiedObj.issuerName = e.target.value;
                      settokenSchema(modifiedObj);
                    }}
                    value={tokenSchema.issuerName}
                    type="text"
                    className="form-control"
                    placeholder="Enter Issuer Name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Issuer Email</label>

                  <input
                    onChange={(e) => {
                      let modifiedObj = { ...tokenSchema };
                      modifiedObj.issuerEmail = e.target.value;
                      settokenSchema(modifiedObj);
                    }}
                    value={tokenSchema.issuerEmail}
                    type="email"
                    className="form-control"
                    placeholder="Enter Issuer Email"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Issuer Website Url</label>

                  <input
                    onChange={(e) => {
                      let modifiedObj = { ...tokenSchema };
                      modifiedObj.issuerWebsite = e.target.value;
                      settokenSchema(modifiedObj);
                    }}
                    value={tokenSchema.issuerWebsite}
                    type="text"
                    className="form-control"
                    placeholder="Enter Issuer Website Url"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Ticker/Token Symbol</label>

                  <input
                    onChange={(e) => {
                      let modifiedObj = { ...tokenSchema };
                      modifiedObj.tickerSymbol = e.target.value;
                      settokenSchema(modifiedObj);
                    }}
                    value={tokenSchema.tickerSymbol}
                    type="text"
                    className="form-control"
                    placeholder="Enter Ticker/Token Symbol"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Governing Law</label>

                  <input
                    onChange={(e) => {
                      let modifiedObj = { ...tokenSchema };
                      modifiedObj.governingLaw = e.target.value;
                      settokenSchema(modifiedObj);
                    }}
                    value={tokenSchema.governingLaw}
                    type="text"
                    className="form-control"
                    placeholder="Enter Governing Law"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Token Icon</label>

                  <input
                    onChange={(e) => {
                      let modifiedObj = { ...tokenSchema };
                      modifiedObj.icon = e.target.value;
                      settokenSchema(modifiedObj);
                    }}
                    value={tokenSchema.icon}
                    type="text"
                    className="form-control"
                    placeholder="Enter Token Icon Image Url"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Issuer Legal Form</label>

                  <input
                    onChange={(e) => {
                      let modifiedObj = { ...tokenSchema };
                      modifiedObj.issuerLegalForm = e.target.value;
                      settokenSchema(modifiedObj);
                    }}
                    value={tokenSchema.issuerLegalForm}
                    type="text"
                    className="form-control"
                    placeholder="Enter Token Issuer Legal Form"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Token Description</label>

                  <TextareaAutosize
                    onChange={(e) => {
                      let modifiedObj = { ...tokenSchema };
                      modifiedObj.tokenDescription = e.target.value;
                      settokenSchema(modifiedObj);
                    }}
                    value={tokenSchema.tokenDescription}
                    type="text"
                    className="form-control"
                    placeholder="Description"
                    required
                    minRows="3"
                    maxRows="12"
                    aria-multiline="true"
                  />
                </div>

                <div className="form-group">
                  <label>Token Terms</label>

                  <TextareaAutosize
                    onChange={(e) => {
                      let modifiedObj = { ...tokenSchema };
                      modifiedObj.terms = e.target.value;
                      settokenSchema(modifiedObj);
                    }}
                    value={tokenSchema.terms}
                    type="text"
                    className="form-control"
                    placeholder="Description"
                    required
                    minRows="3"
                    maxRows="12"
                  />
                </div>
              </>
            </DialogContent>
            <DialogActions style={{ marginTop: 10, height: 50 }}>
              {(() => {
                if (loading) {
                  return (
                    <div style={{ width: 80 }}>
                      <CustomLoader width={25} height={25} />
                    </div>
                  );
                } else {
                  return (
                    <button type="submit" className="btn btn-primary btn-small">
                      Create
                    </button>
                  );
                }
              })()}
            </DialogActions>
          </form>
          <ToastContainer />
        </PerfectScrollbar>
      </Dialog>
    </>
  );
}
