import React, { useState, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import { makeStyles } from "@material-ui/core/styles";
import PerfectScrollbar from "react-perfect-scrollbar";
import axios from "axios";

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

export default function StasTokenDetailsDialog(props) {
  const classes = useStyles();
  const [tokenDetails, settokenDetails] = useState({
    name: "",
    token_id: "",
    ticker: "",
    terms: "",
    protocol: "",
    issuer_website: "",
    issuer_name: "",
    issuer_legal_form: "",
    issuer_email: "",
    issuer_country: "",
    description: "",
    governing_law: "",
    icon_url: "",
  });

  useEffect(() => {
    if (props.selectedTokenDetailsId) {
      getTokenDetails();
    }
  }, [props.selectedTokenDetailsId]);

  const getTokenDetails = async () => {
    try {
      let res = await axios({
        method: "get",
        url: `https://taalnet.whatsonchain.com/v1/bsv/taalnet/token/${props.selectedTokenDetailsId}`,
        auth: {
          username: "taal_private",
          password: "dotheT@@l007",
        },
      });
      if (res && res.status === 200 && res.data && res.data.token) {
        let modifiedObj = {
          name: res.data.token.name,
          token_id: res.data.token.token_id,
          ticker: res.data.token.ticker,
          terms: res.data.token.terms,
          protocol: res.data.token.protocol,
          issuer_website: res.data.token.issuer_website,
          issuer_name: res.data.token.issuer_name,
          issuer_legal_form: res.data.token.issuer_legal_form,
          issuer_email: res.data.token.issuer_email,
          issuer_country: res.data.token.issuer_country,
          description: res.data.token.description,
          governing_law: res.data.token.governing_law,
          icon_url: res.data.token.icon_url,
        };
        settokenDetails(modifiedObj);
      }

      console.log("token details res", res.data.token);
    } catch (err) {
      console.log("err", err);
    }
  };

  const handleClose = () => {
    props.setdialogState(false);
  };

  return (
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
      <PerfectScrollbar style={{ padding: "18px 24px 5px 24px" }}>
        <h5>Token Details</h5>
        <div style={{ margin: "20px 10px" }}>
          {Object.keys(tokenDetails).map((key, index) => {
            return (
              <div
                key={"details" + index}
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <h6 style={{ margin: 0, marginRight: 10 }}>{key} :</h6>
                <p style={{ margin: 0 }}>
                  {tokenDetails[key] ? tokenDetails[key] : "-"}
                </p>
              </div>
            );
          })}
        </div>
      </PerfectScrollbar>
    </Dialog>
  );
}
