import ApiUrlContainer from "../new-component/ApiUrlContainer";
import CodeContainer from "../new-component/CodeContainer";

function WalletsPage(){
            const styles = {
        heading1Space: {
            marginTop: "10px",
            marginBottom: "20px"
        },
        heading2Space: {
            marginTop: "40px",
            marginBottom: "20px"
        },
        paraSpace: {
            marginBottom: "15px"
        }

    }


    return(
        <div>
           <div style={styles.heading1Space}>
                <h2>Wallets</h2>
            </div>
            <div style={styles.paraSpace}>
                <p>you can get all wallet related api</p>
            </div>


                    {/* get address docs start from here */}

            <div style={styles.heading2Space}>
                <h4>(1.) Get Address</h4>
            </div>
            <div style={styles.paraSpace}>
                <p>you can get user address by sending HTTP <b>GET</b> request to the address URI </p>
            </div>
            <ApiUrlContainer title="https://api.vaionex.com/address" />

            <div style={styles.heading2Space}>
                <h6>request</h6>
            </div>
            <ApiUrlContainer title="[GET] https://api.vaionex.com/address" />

            <div style={styles.heading2Space}>
                <h6>headers</h6>
            </div>
            < CodeContainer title = {`
    authToken: <your auth token>
    walletId: <your wallet id>      //optional
`}
            />
            <div style={styles.paraSpace}>
                <p>To get address of wallet, you have to pass two header parameters one is <b>authToken</b> and second <b>walletId</b>.</p>
            </div>

            <div style={styles.heading2Space}>
                <h6>Example</h6>
            </div>
            < CodeContainer title = {`

    const config ={
        method: 'get',
        url: 'https://api.vaionex.com/address',
        headers: {
            Content-Type: "application/json,
            authToken: "eyJhbGciOiJSUzI1NiIsImtpZCI6ImFiMGNiMTk5Zjg3MGYyOGUyOTg5YWI0ODFjYzJlNDdlMGUyY2MxOWQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vdmFpb25leGRldiIsImF1ZCI6InZhaW9uZXhkZXYiLCJhdXRoX3RpbWUiOjE2MjMwODEyOTYsInVzZXJfaWQiOiJ6Yk0yeDNVRXVEUzFiZWNlbGhGWTJvTzhnNkQyIiwic3ViIjoiemJNMngzVUV1RFMxYmVjZWxoRlkyb084ZzZEMiIsImlhdCI6MTYyMzA4MTI5NiwiZXhwIjoxNjIzMDg0ODk2LCJlbWFpbCI6IjEyMzVAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbIjEyMzVAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.ZgRVxWH--tJdVuBdzjl2NeABWW605z0kEub37n3nEbWQzu1BlxNV6I_MOtUXfv1g6QOzc6mgK7gpQvkGGXgprxqv0tOuaPGUjVUQKemPLbt4bWdf-fGWbAekH-4k4TQZqpI2vyfhDclc_G9B0eh7_83jE0H19KPLTj42Lmqzr5SLEIpijf5AlHOPK-9QUaQCuQo-VVSM6h2XP4jOXruZQ7VacMTiJYWHxxX2FELHGoTBiWImNQrBfPL3OXOWhq9yDwaxBxVNJuBAyGDGRp6K9zPK5YsZKKFXQBpzP5sLxg1ekUTa7u6tprWiHqa1ODyBoS2FozIWb5m8-luP6BKXIQ",
            walletId: "vaionex-wallet"
        }
    };

    axios(config).then((res) =>{
        console.log(res);
    });


`}
            />

            <div style={styles.heading2Space}>
                <h6>Response</h6>
            </div>

             <div style={styles.paraSpace}>
                <p>If your request succeeds,  the server responds with an HTTP <b>200 OK</b>  status code and address data.</p>
            </div>

            <CodeContainer title={
                `{
  "statusCode": 200,
  "data": {
    "status": "success",
    "msg": "Operation completed successfully",
    "addresses": "17n2JVhrCf1oYSMkZtZNjcf1deteUEKQsH",
    "paymail": "string"
  }
}
                `
            }/>



                    {/* get address docs start from here */}

            <div style={styles.heading2Space}>
                <h4>(2.) Get All Addresses</h4>
            </div>
            <div style={styles.paraSpace}>
                <p>you can get user all addresses by sending HTTP <b>GET</b> request to the allAddresses URI </p>
            </div>
            <ApiUrlContainer title="https://api.vaionex.com/allAddresses" />

            <div style={styles.heading2Space}>
                <h6>request</h6>
            </div>
            <ApiUrlContainer title="[GET] https://api.vaionex.com/allAddresses" />

            <div style={styles.heading2Space}>
                <h6>headers</h6>
            </div>
            < CodeContainer title = {`
    authToken: <your auth token>
    walletId: <your wallet id>      //optional
`}
            />
            <div style={styles.paraSpace}>
                <p>To get all addressess of wallets, you have to pass two header parameters one is <b>authToken</b> and second <b>walletId</b>.</p>
            </div>

            <div style={styles.heading2Space}>
                <h6>Example</h6>
            </div>
            < CodeContainer title = {`

    const config ={
        method: 'get',
        url: 'https://api.vaionex.com/allAddresses',
        headers: {
            Content-Type: "application/json,
            authToken: "eyJhbGciOiJSUzI1NiIsImtpZCI6ImFiMGNiMTk5Zjg3MGYyOGUyOTg5YWI0ODFjYzJlNDdlMGUyY2MxOWQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vdmFpb25leGRldiIsImF1ZCI6InZhaW9uZXhkZXYiLCJhdXRoX3RpbWUiOjE2MjMwODEyOTYsInVzZXJfaWQiOiJ6Yk0yeDNVRXVEUzFiZWNlbGhGWTJvTzhnNkQyIiwic3ViIjoiemJNMngzVUV1RFMxYmVjZWxoRlkyb084ZzZEMiIsImlhdCI6MTYyMzA4MTI5NiwiZXhwIjoxNjIzMDg0ODk2LCJlbWFpbCI6IjEyMzVAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbIjEyMzVAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.ZgRVxWH--tJdVuBdzjl2NeABWW605z0kEub37n3nEbWQzu1BlxNV6I_MOtUXfv1g6QOzc6mgK7gpQvkGGXgprxqv0tOuaPGUjVUQKemPLbt4bWdf-fGWbAekH-4k4TQZqpI2vyfhDclc_G9B0eh7_83jE0H19KPLTj42Lmqzr5SLEIpijf5AlHOPK-9QUaQCuQo-VVSM6h2XP4jOXruZQ7VacMTiJYWHxxX2FELHGoTBiWImNQrBfPL3OXOWhq9yDwaxBxVNJuBAyGDGRp6K9zPK5YsZKKFXQBpzP5sLxg1ekUTa7u6tprWiHqa1ODyBoS2FozIWb5m8-luP6BKXIQ",
            walletId: "vaionex-wallet"
        }
    };

    axios(config).then((res) =>{
        console.log(res);
    });


`}
            />

            <div style={styles.heading2Space}>
                <h6>Response</h6>
            </div>

             <div style={styles.paraSpace}>
                <p>If your request succeeds,  the server responds with an HTTP <b>200 OK</b>  status code and all addresses data.</p>
            </div>

            <CodeContainer title={
                `{
  "statusCode": 200,
  "data": {
    "status": "success",
    "msg": "Operation completed successfully",
    "addresses": [
      "17n2JVhrCf1oYSMkZtZNjcf1deteUEKQsH"
    ],
    "paymail": "string"
  }
}
                `
            }/>

        {/* get balance docs start from here */}

            <div style={styles.heading2Space}>
                <h4>(3.) Get Balance</h4>
            </div>
            <div style={styles.paraSpace}>
                <p>you can get user balance by sending HTTP <b>POST</b> request to the balance URI </p>
            </div>
            <ApiUrlContainer title="https://api.vaionex.com/balance" />

            <div style={styles.heading2Space}>
                <h6>request</h6>
            </div>
            <ApiUrlContainer title="[POST] https://api.vaionex.com/balance" />

            <div style={styles.heading2Space}>
                <h6>headers</h6>
            </div>
            < CodeContainer title = {`
    authToken: <your auth token>
    currency: <which type of balance you want to get>           //defalt value is "USD".,
    walletsID: [ <array string of wallets id> ]                 // default value is ["vaionex-wallet"]
`}
            />
            <div style={styles.paraSpace}>
                <p>To get balance, you have to pass two header parameters one is <b>authToken</b> which is required and second <b>type</b>. type key value should be <b>BSV</b> or <b>STAS</b></p>
            </div>

             <div style={styles.paraSpace}>
                <p>To get balance, you have to pass array string of your wallet id to body and key will be <b>walletId</b> </p>
            </div>

            <div style={styles.heading2Space}>
                <h6>Example</h6>
            </div>
            < CodeContainer title = {`

    const config ={
        method: 'post',
        url: 'https://api.vaionex.com/balance',
        headers: {
            Content-Type: "application/json,
            authToken: "eyJhbGciOiJSUzI1NiIsImtpZCI6ImFiMGNiMTk5Zjg3MGYyOGUyOTg5YWI0ODFjYzJlNDdlMGUyY2MxOWQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vdmFpb25leGRldiIsImF1ZCI6InZhaW9uZXhkZXYiLCJhdXRoX3RpbWUiOjE2MjMwODEyOTYsInVzZXJfaWQiOiJ6Yk0yeDNVRXVEUzFiZWNlbGhGWTJvTzhnNkQyIiwic3ViIjoiemJNMngzVUV1RFMxYmVjZWxoRlkyb084ZzZEMiIsImlhdCI6MTYyMzA4MTI5NiwiZXhwIjoxNjIzMDg0ODk2LCJlbWFpbCI6IjEyMzVAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbIjEyMzVAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.ZgRVxWH--tJdVuBdzjl2NeABWW605z0kEub37n3nEbWQzu1BlxNV6I_MOtUXfv1g6QOzc6mgK7gpQvkGGXgprxqv0tOuaPGUjVUQKemPLbt4bWdf-fGWbAekH-4k4TQZqpI2vyfhDclc_G9B0eh7_83jE0H19KPLTj42Lmqzr5SLEIpijf5AlHOPK-9QUaQCuQo-VVSM6h2XP4jOXruZQ7VacMTiJYWHxxX2FELHGoTBiWImNQrBfPL3OXOWhq9yDwaxBxVNJuBAyGDGRp6K9zPK5YsZKKFXQBpzP5sLxg1ekUTa7u6tprWiHqa1ODyBoS2FozIWb5m8-luP6BKXIQ",
            currency: "BSV"
        },
    };

    axios(config).then((res) =>{
        console.log(res);
    });


`}
            />

            <div style={styles.heading2Space}>
                <h6>Response</h6>
            </div>

             <div style={styles.paraSpace}>
                <p>If your request succeeds,  the server responds with an HTTP <b>200 OK</b>  status code and balance data.</p>
            </div>

            <CodeContainer title={
                `{
  "statusCode": 200,
  "data": {
    "status": "success",
    "msg": "Operation completed successfully",
    "stasTokenBal": {
      "data": [
        "string"
      ]
    },
    "otherBal": {
      "data": {
        "walletData": "string",
        "totalBalance": {
          "bsvBal": 619338,
          "currencyCode": "BSV",
          "currencyBal": 619338
        }
      }
    }
  }
}
                `
            }/>




        {/* get metrics docs start from here */}

            <div style={styles.heading2Space}>
                <h4>(4.) Get metrics</h4>
            </div>
            <div style={styles.paraSpace}>
                <p>you can get user metrics by sending HTTP <b>GET</b> request to the metrics URI </p>
            </div>
            <ApiUrlContainer title="https://api.vaionex.com/metrics" />

            <div style={styles.heading2Space}>
                <h6>request</h6>
            </div>
            <ApiUrlContainer title="[GET] https://api.vaionex.com/metrics" />

            <div style={styles.heading2Space}>
                <h6>headers</h6>
            </div>
            < CodeContainer title = {`
    authToken: <your auth token>
`}
            />
            <div style={styles.paraSpace}>
                <p>To get user metrics, you have to pass header parameter <b>authToken</b></p>
            </div>

            <div style={styles.heading2Space}>
                <h6>Example</h6>
            </div>
            < CodeContainer title = {`

    const config ={
        method: 'get',
        url: 'https://api.vaionex.com/metrics',
        headers: {
            Content-Type: "application/json,
            authToken: "eyJhbGciOiJSUzI1NiIsImtpZCI6ImFiMGNiMTk5Zjg3MGYyOGUyOTg5YWI0ODFjYzJlNDdlMGUyY2MxOWQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vdmFpb25leGRldiIsImF1ZCI6InZhaW9uZXhkZXYiLCJhdXRoX3RpbWUiOjE2MjMwODEyOTYsInVzZXJfaWQiOiJ6Yk0yeDNVRXVEUzFiZWNlbGhGWTJvTzhnNkQyIiwic3ViIjoiemJNMngzVUV1RFMxYmVjZWxoRlkyb084ZzZEMiIsImlhdCI6MTYyMzA4MTI5NiwiZXhwIjoxNjIzMDg0ODk2LCJlbWFpbCI6IjEyMzVAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbIjEyMzVAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.ZgRVxWH--tJdVuBdzjl2NeABWW605z0kEub37n3nEbWQzu1BlxNV6I_MOtUXfv1g6QOzc6mgK7gpQvkGGXgprxqv0tOuaPGUjVUQKemPLbt4bWdf-fGWbAekH-4k4TQZqpI2vyfhDclc_G9B0eh7_83jE0H19KPLTj42Lmqzr5SLEIpijf5AlHOPK-9QUaQCuQo-VVSM6h2XP4jOXruZQ7VacMTiJYWHxxX2FELHGoTBiWImNQrBfPL3OXOWhq9yDwaxBxVNJuBAyGDGRp6K9zPK5YsZKKFXQBpzP5sLxg1ekUTa7u6tprWiHqa1ODyBoS2FozIWb5m8-luP6BKXIQ",
        }
    };

    axios(config).then((res) =>{
        console.log(res);
    });


`}
            />

            <div style={styles.heading2Space}>
                <h6>Response</h6>
            </div>

             <div style={styles.paraSpace}>
                <p>If your request succeeds,  the server responds with an HTTP <b>200 OK</b>  status code and user metrics data.</p>
            </div>

            <CodeContainer title={
                `{
  "statusCode": 200,
  "data": {
    "msg": "Operation completed successfully",
    "utxos": [
      {
        "txid": "3a0d4b10f301a0ee12258732fcda6c97766837a8943842fdaa35ec36ac62b3a8",
        "vout": 1,
        "value": "11725",
        "height": 691790,
        "confirmations": 232,
        "scriptPubKey": "76a9144a548f3da5526d1e2f8b5c3584ebb9739edfbe3b88ac"
      }
    ]
  }
}
                `
            }/>


        </div>
    );
}

export default WalletsPage;