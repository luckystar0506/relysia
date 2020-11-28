import React from "react";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import SyntaxHighlighter from "react-syntax-highlighter";
import { tomorrowNightBright } from "react-syntax-highlighter/dist/esm/styles/hljs";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

const arumentsTable = [
  {
    prop: "amount",
    type: "STRING",
    value: "'tokens quantity' if transferring tokens , 'amount in US $' if transferring Bsvs.",
  },
  {
    prop: "to",
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
    prop: "allowMultipleWallets",
    type: "STRING",
    value: "true(default), display aselect wallet option, if(false) vaionex-wallet will be used",
  },
];

function HTMLPage(props) {
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <div>
      <Typography variant="h5" component="h1" className={clsx("Head1")}>
        HTML
      </Typography>

      <Typography paragraph variant="body1">
        The easiest way to add a Pay Button to a website is with the HTML Pay Button. When the document finishes loading, our script looks
        around the document for {"<div>"} elements with the <span className="highlightedWord">pay-button-root</span> ID and certain required
        attributes. Every {"<div>"} that matches the search is transformed into a Pay Button component. First, add this script to your HTML
        somewhere:
      </Typography>
      <div style={{ width: "100%", overflow: "auto" }}>
        <SyntaxHighlighter language="html" style={tomorrowNightBright}>
          {`
 <!DOCTYPE html>
 <html lang="en">
   <head>
     <meta charset="UTF-8" />
     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
     <title>Document</title>
   </head>
   <body>
     <div id="pay-button-root" amount='[20,30]' to='["address1GoesHere","address2GoesHere"]' token="token_id"></div>
     <script src="https://firebasestorage.googleapis.com/v0/b/pay-button-vaionexdev/o/js%2Findex.js?alt=media"></script>
   </body>
 </html>
        `}
        </SyntaxHighlighter>
      </div>
      <Typography paragraph variant="body1">
        Pay Button can used in 2 different ways. Pay Button can be used either for transferring
        <span className="highlightedWord">BSVs</span> or <span className="highlightedWord">Tokens</span> at a time. To transfer BSVs user
        needs to pass the <span className="highlightedWord">token</span> argument with a<span className="highlightedWord">'BSV'</span> value
        (which is the default value), the <span className="highlightedWord">amount</span> argument will contain the{" "}
        <span className="highlightedWord">amount</span> to be transferred in US $, user can transfer amount to multiple users at the same
        time by including the amount need to transfer with specific address, <span className="highlightedWord">to</span> argument will
        contain the <span className="highlightedWord">public address(amount and to argument length should be same)</span>
        where the amount will be sent.
      </Typography>

      <div style={{ width: "100%", overflow: "auto" }}>
        <SyntaxHighlighter language="html" style={tomorrowNightBright}>
          {`
 <div id="pay-button-root" amount='[20,30]' to='["address1GoesHere","address2GoesHere"]'></div>  
        `}
        </SyntaxHighlighter>
      </div>

      <Typography paragraph variant="body1">
        In the case of transferring tokens, the user needs to pass the <span className="highlightedWord">amount</span> argument that will
        contain the number of tokens to be transferred, user can transfer tokens to multiple users at the same time by including the tokens
        quantity need to transfer to the specific publickey, the <span className="highlightedWord">to</span> argument will contain the{" "}
        <span className="highlightedWord">public-key</span> where the tokens will be sent, <span className="highlightedWord">token</span>{" "}
        argument will contain the ID of specific token that will be transferred from user account (amount and to argument length should be
        same). Tokens will be only transferred if the user owns does specific tokens.
      </Typography>

      <div style={{ width: "100%", overflow: "auto" }}>
        <SyntaxHighlighter language="html" style={tomorrowNightBright}>
          {`
 <div id="pay-button-root" amount='["20"]' to='["publicKeyGoesHere"]' token="token_id"></div>  
        `}
        </SyntaxHighlighter>
      </div>

      <Typography paragraph variant="body1">
        A Pay Button <span className="highlightedWord">{"<div>"}</span> can take the following attributes:
      </Typography>

      <TableContainer component={Paper} style={{ width: matchesMD ? "100%" : "70%" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Prop</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {arumentsTable.map((row, index) => (
              <TableRow hover={true} key={row.prop + index}>
                <TableCell>{row.prop}</TableCell>
                <TableCell>{row.type}</TableCell>
                <TableCell>{row.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default HTMLPage;
