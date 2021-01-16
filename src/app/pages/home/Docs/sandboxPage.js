import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import Iframe from "react-iframe";
import { Button } from "@material-ui/core";

const arumentsTable = [
  {
    prop: "amount",
    type: "STRING",
    value: "'tokens quantity' if transferring tokens , 'amount in US $' if transferring Bsvs",
  },
  {
    prop: "address",
    type: "STRING",
    value: "'public-key' if transferring tokens , 'wallet-address' if transferring Bsvs",
  },
  {
    prop: "token",
    type: "STRING",
    value: "'token-id' if transferring tokens , 'BSV'(default) if transferring Bsvs",
  },
  {
    prop: "currency",
    type: "STRING",
    value: "'USD'(default) or 'BSV'",
  },
  {
    prop: "onLoad",
    type: "FUNCTION",
    value: "Callback after the pay-button gets loaded",
  },
  {
    prop: "onTransactionStart",
    type: "FUNCTION",
    value: "Callback before starting the transaction",
  },
  {
    prop: "onError",
    type: "FUNCTION",
    value: "Callback when the error occurs",
  },
  {
    prop: "responseCallback",
    type: "FUNCTION",
    value: "Callback when API response is received",
  },
  {
    prop: "onSuccess",
    type: "FUNCTION",
    value: "Callback when transaction get succeeded",
  },
];

function SandboxPage(props) {
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
  const [selection, setselection] = useState(1);

  return (
    <div>
      <Typography variant="h5" component="h1" className={clsx("Head1")}>
        Try Pay-button in Sandbox
      </Typography>
      <div style={{ marginTop: 20 }}>
        <Button
          onClick={() => setselection(1)}
          color="primary"
          variant={selection ? "contained" : "outlined"}
          style={{ borderRadius: "4px 0px 0px 4px" }}
        >
          React
        </Button>
        <Button
          onClick={() => setselection(0)}
          color="primary"
          variant={selection ? "outlined" : "contained"}
          style={{ borderRadius: "0px 4px 4px 0px" }}
        >
          Html
        </Button>
      </div>
      <div style={{ height: "80vh", minHeight: "300px", marginTop: 10 }}>
        <Iframe
          url={`https://codesandbox.io/embed/${
            !selection ? "gracious-vaughan-4ngjp" : "upbeat-margulis-tlf18"
          }?codemirror=1&forcerefresh=1&hidenavigation=1&editorsize=50`}
          width="100%"
          height="100%"
          id="videoIframe"
          frameBorder={0}
          className="myClassname"
          display="initial"
          position="relative"
          allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
          sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
        />
      </div>
    </div>
  );
}

export default SandboxPage;
