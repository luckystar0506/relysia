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
    prop: "istoken",
    type: "STRING",
    value: "'true' if transferring tokens , 'false' if transferring Bsvs",
  },
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
    prop: "tokenid",
    type: "STRING",
    value: "'token-id' if transferring tokens , 'null' if transferring Bsvs",
  },
];

function ReactPage(props) {
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <div>
      <Typography variant="h5" component="h1" className={clsx("Head1")}>
        React
      </Typography>

      <Typography paragraph variant="body1">
        The React version of Pay Button is what we use throughout the main Pay Button app and every other app we build. It is very similar
        to and is based on the pure javascript version of Pay Button. In fact, it is simply a wrapper for the pure javascript version.
      </Typography>
      <Typography paragraph variant="body1">
        How to install the React component (
        <a href="https://www.npmjs.com/package/vionex-pay-button" target="_blank">
          <Typography component="span" color="primary">
            npm package
          </Typography>
        </a>
        ):
      </Typography>
      <div style={{ width: "100%", overflow: "auto" }}>
        <SyntaxHighlighter language="html" style={tomorrowNightBright}>
          {`
 npm install vionex-pay-button
        `}
        </SyntaxHighlighter>
      </div>

      <Typography paragraph variant="body1">
        How to use it in your react project:
      </Typography>
      <div style={{ width: "100%", overflow: "auto" }}>
        <SyntaxHighlighter language="html" style={tomorrowNightBright}>
          {`
import PayButton from 'vionex-pay-button'
import 'vionex-pay-button/dist/index.css'
        `}
        </SyntaxHighlighter>
      </div>

      <Typography paragraph variant="body1">
        Pay Button can used in 2 different ways. Pay Button can be used either for transferring
        <span className="highlightedWord">BSVs</span> or <span className="highlightedWord">Tokens</span> at a time. To transfer BSVs user
        needs to pass the <span className="highlightedWord">isToken</span> argument with a<span className="highlightedWord">false</span>{" "}
        value, the <span className="highlightedWord">amount</span> argument will contain the <span className="highlightedWord">amount</span>{" "}
        to be transferred in US $, <span className="highlightedWord">address</span> argument will contain the{" "}
        <span className="highlightedWord">public address</span>
        where the amount will be sent.
      </Typography>

      <div style={{ width: "100%", overflow: "auto" }}>
        <SyntaxHighlighter language="html" style={tomorrowNightBright}>
          {`
import React from 'react'
import PayButton from 'vionex-pay-button'
import 'vionex-pay-button/dist/index.css'

const App = () => {
  const getRes = (res) => {
    console.log('res', res)
  }

   return (
    <PayButton
      isToken={false}
      amount='20'
      address='addressGoesHere'
      responseCallback={getRes}
    />
 )
}

export default App
        `}
        </SyntaxHighlighter>
      </div>

      <Typography paragraph variant="body1">
        In the case of transferring tokens, the user needs to pass the <span className="highlightedWord">isToken</span> argument with a{" "}
        <span className="highlightedWord">true</span> value, the <span className="highlightedWord">amount</span> argument will contain the
        number of tokens to be transferred, the <span className="highlightedWord">address</span> argument will contain the{" "}
        <span className="highlightedWord">public-key</span> where the tokens will be sent, <span className="highlightedWord">tokenId</span>{" "}
        will contain the ID of specific token that will be transferred from user account. Tokens will be only transferred if the user owns
        does specific tokens.
      </Typography>

      <div style={{ width: "100%", overflow: "auto" }}>
        <SyntaxHighlighter language="html" style={tomorrowNightBright}>
          {`
 import React from 'react'
 import PayButton from 'vionex-pay-button'
 import 'vionex-pay-button/dist/index.css'

 const App = () => {
   const getRes = (res) => {
     console.log('res', res)
   }

   return (
     <PayButton
       isToken={true}
       tokenId='tokenIdGoesHere'
       amount='20'
       address='addressGoesHere'
       responseCallback={getRes}
     />
   )
 }

 export default App        
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

export default ReactPage;
