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
    "message": "Operation completed successfully",
    "statusCode": 200,
    "data": {
        "status": "success",
        "data": []              // if you are getting empty data array means you don't have balance.
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
    "message": "Operation completed successfully",
    "statusCode": 200,
    "data": {
        "status": "success",
        "data": []              // if you are getting empty data array means you don't have balance.
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
    type: <your wallet type>        //type value should be BSV or STAS and by default type is BSV
`}
            />
            <div style={styles.paraSpace}>
                <p>To get balance, you have to pass two header parameters one is <b>authToken</b> which is required and second <b>type</b>. type key value should be <b>BSV</b> or <b>STAS</b></p>
            </div>


            <div style={styles.heading2Space}>
                <h6>Body</h6>
            </div>
            < CodeContainer title = {`{
    "walletId": ["<your wallet id>"]            // array string of your wallet id
}
`}
            />

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
            type: "BSV"
        },
        data:{
            walletId: ["vaionex-wallet"]
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
                <p>If your request succeeds,  the server responds with an HTTP <b>200 OK</b>  status code and balance data.</p>
            </div>

            <CodeContainer title={
                `{
    "message": "Operation completed successfully",
    "statusCode": 200,
    "data": {
        "status": "success",
        "data": []              // if you are getting empty data array means you don't have balance.
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
    "message": "Operation completed successfully",
    "statusCode": 200,
    "data": {
        "status": "success",
        "data": []              // if you are getting empty data array means you don't have balance.
    }
}
                `
            }/>


        </div>
    );
}

export default WalletsPage;