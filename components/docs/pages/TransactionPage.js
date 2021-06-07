import ApiUrlContainer from "../new-component/ApiUrlContainer";
import CodeContainer from "../new-component/CodeContainer";

function TransactionPage(){

    
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
                <h2>User Transaction</h2>
            </div>
            <div style={styles.paraSpace}>
                <p>you can perform opration like get transtions, transaction inputs, transaction outputs, transaction by id, query transaction, delete transaction by using our transaction api</p>
            </div>

            {/* get All transaction docs start from here */}

            <div style={styles.heading2Space}>
                <h4>(1.) Get All transactions</h4>
            </div>
            <div style={styles.paraSpace}>
                <p>you can get all transaction made by user, by sending HTTP <b>GET</b> request to the transactions URI </p>
            </div>
            <ApiUrlContainer title="https://api.vaionex.com/transactions" />

            <div style={styles.heading2Space}>
                <h6>request</h6>
            </div>
            <ApiUrlContainer title="[GET] https://api.vaionex.com/transactions" />

            <div style={styles.heading2Space}>
                <h6>header</h6>
            </div>
            < CodeContainer title = {`
    metashard-user-key: <your metashard user key value>
    metashard-database-id: <your metashard database id key value>
    metashard-api-secret-key: <your metashard api secret key value>
`}
            />
            <div style={styles.paraSpace}>
                <p>To get all transaction, you have to pass three header parameters <b>metashard-user-key</b> , <b>metashard-database-id</b> and <b>metashard-api-secret-key</b></p>
            </div>

            <div style={styles.heading2Space}>
                <h6>Response</h6>
            </div>

             <div style={styles.paraSpace}>
                <p>If your request succeeds,  the server responds with an HTTP <b>200 OK</b>  status code and user data.</p>
            </div>

            <CodeContainer title={
                `{
    "message": "1 transaction(s) found",
    "statusCode": 200,
    "data": [
        {
            "id": "0030cf2129fed9f744c993fcf65c43877cf5e2a54055e54888b80f1c7be5ffe9",
            "txhash": {
                "lock": 0,
                "out": [
                    {
                        "id": "0030cf2129fed9f744c993fcf65c43877cf5e2a54055e54888b80f1c7be5ffe9",
                        "txhash": {
                            "lock": 0,
                            "out": [{
                                    "b6": "VUd3V283R1d1V014cnRuUHpvb1pjUlphUnZwMQ==",
                                    "s3": "like",
                                    "b7": "eHB1YjZGdUY3VjFrNkFGZGZuU2tOOE5nZGt5eUNCNEpXN2JlVmltcXJMRlJIR1U2R1VGTWozb1pkb2NyOWtNaHYzdllzRkZDSGplRWNZUkZMSng0b2hCZDRhNVQ4YkRjVE5tREI3R2l5N1oxM29R",
                                    "s4": "-MDGL7G3z_YNnc2XGXal",
                                    "b2": "aGl2ZQ==",
                                    "i": 0,
                                    "s7": "xpub6FuF7V1k6AFdfnSkN8NgdkyyCB4JW7beVimqrLFRHGU6GUFMj3oZdocr9kMhv3vYsFFCHjeEcYRFLJx4ohBd4a5T8bDcTNmDB7Giy7Z13oQ",
                                    "b0": {
                                        "op": 0
                                    },
                                    "s5": "-MCE_A4QdcbGX30tCGXp",
                                    "b3": "bGlrZQ==",
                                    "b1": {
                                        "op": 106
                                    },
                                    "b4": "LU1ER0w3RzN6X1lObmMyWEdYYWw=",
                                    "s2": "hive",
                                    "s6": "UGwWo7GWuWMxrtnPzooZcRZaRvp1",
                                    "e": {
                                        "v": 0,
                                        "i": 0,
                                        "a": "false"
                                    },
                                    "b5": "LU1DRV9BNFFkY2JHWDMwdENHWHA="
                                },
                                {
                                    "i": 1,
                                    "b1": {
                                        "op": 169
                                    },
                                    "s2": "�}3�G��6w�2k�n��'",
                                    "e": {
                                        "a": "1CmgJCgUUbvgTTWi2MF1ECAfR1smAgYs43",
                                        "v": 1400,
                                        "i": 1
                                    },
                                    "b3": {
                                        "op": 136
                                    },
                                    "b2": "gRx9M6wPR/bhNncP1DJroW6+m2A=",
                                    "b4": {
                                        "op": 172
                                    },
                                    "b0": {
                                        "op": 118
                                    }
                                },
                                {
                                    "b1": {
                                        "op": 169
                                    },
                                    "s2": "��J�AQC�-��/�Z˅AD",
                                    "e": {
                                        "v": 1000,
                                        "i": 2,
                                        "a": "1P3RnnAJzpNtcS95fEodpuBdNJPXULNnQP"
                                    },
                                    "b2": "8chKzwFBUUP/LQSjyi/yWsuFQUQ=",
                                    "b0": {
                                        "op": 118
                                    },
                                    "b3": {
                                        "op": 136
                                    },
                                    "i": 2,
                                    "b4": {
                                        "op": 172
                                    }
                                },
                                {
                                    "b0": {
                                        "op": 118
                                    },
                                    "s2": "��J�AQC�-��/�Z˅AD",
                                    "b4": {
                                        "op": 172
                                    },
                                    "b3": {
                                        "op": 136
                                    },
                                    "e": {
                                        "i": 3,
                                        "a": "1P3RnnAJzpNtcS95fEodpuBdNJPXULNnQP",
                                        "v": 800
                                    },
                                    "b2": "8chKzwFBUUP/LQSjyi/yWsuFQUQ=",
                                    "i": 3,
                                    "b1": {
                                        "op": 169
                                    }
                                },
                                {
                                    "b4": {
                                        "op": 172
                                    },
                                    "e": {
                                        "a": "1PfppcRkvxDF9fd9wzraLF9u28VoRzERcW",
                                        "v": 137026,
                                        "i": 4
                                    },
                                    "s2": "��~/I=��o2;= :",
                                    "b2": "+Kp+Hi9JPb74HhtvAwcyOz0gOh4=",
                                    "b0": {
                                        "op": 118
                                    },
                                    "i": 4,
                                    "b3": {
                                        "op": 136
                                    },
                                    "b1": {
                                        "op": 169
                                    }
                                }
                            ],
                            "in": [{
                                "seq": 4294967295,
                                "b0": "MEQCIAo240OqAz7DUWS11s+6wGw1504cmRTM0IJ/sAcY4gXgAiABBEiJgOeQ0qcabB9pTHLzIGKbFt7MPwhcurXfIhY6P0E=",
                                "b1": "A8jE+9RkOXN6TRjbc7HNj1h33FmKOWN/gxxlhczoln3c",
                                "i": 0,
                                "e": {
                                    "i": 4,
                                    "h": "ca3b315a1eaf7967a5ab50837d6c2802fe7fa8601797c28853277d84f6d51a22",
                                    "a": "1PfppcRkvxDF9fd9wzraLF9u28VoRzERcW"
                                }
                            }],
                            "tx": {
                                "h": "0030cf2129fed9f744c993fcf65c43877cf5e2a54055e54888b80f1c7be5ffe9"
                            }
                        }
                    },
    ]
}
                `
            }/>

            {/* get transaction input docs start from here */}

            <div style={styles.heading2Space}>
                <h4>(2.) Get Transaction Inputs</h4>
            </div>
            <div style={styles.paraSpace}>
                <p>you can get transaction inputs by sending HTTP <b>GET</b> request to the transaction in URI </p>
            </div>
            <ApiUrlContainer title="https://api.vaionex.com/transactions/in" />

            <div style={styles.heading2Space}>
                <h6>request</h6>
            </div>
            <ApiUrlContainer title="[GET] https://api.vaionex.com/transactions/in" />

            <div style={styles.heading2Space}>
                <h6>header</h6>
            </div>
            < CodeContainer title = {`
    metashard-user-key: <your metashard user key value>
    metashard-database-id: <your metashard database id key value>
    metashard-api-secret-key: <your metashard api secret key value>
`}
            />
            <div style={styles.paraSpace}>
                <p>To get all transaction input, you have to pass three header parameters <b>metashard-user-key</b> , <b>metashard-database-id</b> and <b>metashard-api-secret-key</b></p>
            </div>

            <div style={styles.heading2Space}>
                <h6>Response</h6>
            </div>

             <div style={styles.paraSpace}>
                <p>If your request succeeds,  the server responds with an HTTP <b>200 OK</b>  status code and user data.</p>
            </div>

            <CodeContainer title={
                `{
    "message": "4 transaction(s) found",
    "statusCode": 200,
    "data": [
        [
            {
                "e": {
                    "a": "1PfppcRkvxDF9fd9wzraLF9u28VoRzERcW",
                    "h": "ca3b315a1eaf7967a5ab50837d6c2802fe7fa8601797c28853277d84f6d51a22",
                    "i": 4
                },
                "seq": 4294967295,
                "b0": "MEQCIAo240OqAz7DUWS11s+6wGw1504cmRTM0IJ/sAcY4gXgAiABBEiJgOeQ0qcabB9pTHLzIGKbFt7MPwhcurXfIhY6P0E=",
                "b1": "A8jE+9RkOXN6TRjbc7HNj1h33FmKOWN/gxxlhczoln3c",
                "i": 0
            }
        ],
        [
            {
                "b1": "A8jE+9RkOXN6TRjbc7HNj1h33FmKOWN/gxxlhczoln3c",
                "b0": "MEQCIBv3Egu8wZ6hk5cAB0bXYPL0kLqNzLe3k+IcGudtfxa4AiBvMCx9wtLCuALNAz5CxoBup2vqmzuMhol7FHE6TeMK8UE=",
                "i": 0,
                "e": {
                    "h": "62ccd2d6138e673d02d80ffb5aa16bac569c6529673b788defe196b01780a031",
                    "i": 3,
                    "a": "1PfppcRkvxDF9fd9wzraLF9u28VoRzERcW"
                },
                "seq": 4294967295
            }
        ],
        [
            {
                "b0": "MEQCIH7oDJ+p2HTisbyo0QNl57j8BFibJX3iGMvOKSWXFi1HAiB+RuFbSceMKp/QbyOb/x4IfShYZPGcz0EOzm9y1xkmLUE=",
                "seq": 4294967295,
                "e": {
                    "h": "f10190bd4987125ea44c65161f3944e06b72e78768b47ea7e7bd2802100bc198",
                    "i": 4,
                    "a": "1PfppcRkvxDF9fd9wzraLF9u28VoRzERcW"
                },
                "i": 0,
                "b1": "A8jE+9RkOXN6TRjbc7HNj1h33FmKOWN/gxxlhczoln3c"
            }
        ],
        [
            {
                "i": 0,
                "e": {
                    "a": "1PfppcRkvxDF9fd9wzraLF9u28VoRzERcW",
                    "h": "8ac5bbb6ef733648bace98045ebd876fdf875b4a58be5cedd170ff5776e168c5",
                    "i": 4
                },
                "b1": "A8jE+9RkOXN6TRjbc7HNj1h33FmKOWN/gxxlhczoln3c",
                "seq": 4294967295,
                "b0": "MEUCIQDLaPUzF84jMoJQ41BfUqeGVopXMEODd/jnto1aTo0fAAIgQn3hvJtYRsnrOAHbEWhfMxFKY37/QLwBQjNkPYed3NRB"
            }
        ]
    ]
}
                `
            }/>


            {/* get transaction outputs docs start from here */}

            <div style={styles.heading2Space}>
                <h4>(3.) Get Transaction outputs</h4>
            </div>
            <div style={styles.paraSpace}>
                <p>you can get transaction outputs by sending HTTP <b>GET</b> request to the transaction out URI </p>
            </div>
            <ApiUrlContainer title="https://api.vaionex.com/transactions/out" />

            <div style={styles.heading2Space}>
                <h6>request</h6>
            </div>
            <ApiUrlContainer title="[GET] https://api.vaionex.com/transactions/out" />

            <div style={styles.heading2Space}>
                <h6>header</h6>
            </div>
            < CodeContainer title = {`
    metashard-user-key: <your metashard user key value>
    metashard-database-id: <your metashard database id key value>
    metashard-api-secret-key: <your metashard api secret key value>
`}
            />
            <div style={styles.paraSpace}>
                <p>To get all transaction output, you have to pass three header parameters <b>metashard-user-key</b> , <b>metashard-database-id</b> and <b>metashard-api-secret-key</b></p>
            </div>

            <div style={styles.heading2Space}>
                <h6>Response</h6>
            </div>

             <div style={styles.paraSpace}>
                <p>If your request succeeds,  the server responds with an HTTP <b>200 OK</b>  status code and user data.</p>
            </div>

            <CodeContainer title={
                `{
    "message": "1 transaction(s) found",
    "statusCode": 200,
    "data": [
        [
            {
                "b5": "LU1DRV9BNFFkY2JHWDMwdENHWHA=",
                "b7": "eHB1YjZGdUY3VjFrNkFGZGZuU2tOOE5nZGt5eUNCNEpXN2JlVmltcXJMRlJIR1U2R1VGTWozb1pkb2NyOWtNaHYzdllzRkZDSGplRWNZUkZMSng0b2hCZDRhNVQ4YkRjVE5tREI3R2l5N1oxM29R",
                "b4": "LU1ER0w3RzN6X1lObmMyWEdYYWw=",
                "i": 0
                "s6": "UGwWo7GWuWMxrtnPzooZcRZaRvp1",
                "s5": "-MCE_A4QdcbGX30tCGXp",
                "b2": "aGl2ZQ==",
                "b3": "bGlrZQ==",
                "s7": "xpub6FuF7V1k6AFdfnSkN8NgdkyyCB4JW7beVimqrLFRHGU6GUFMj3oZdocr9kMhv3vYsFFCHjeEcYRFLJx4ohBd4a5T8bDcTNmDB7Giy7Z13oQ",
                "b6": "VUd3V283R1d1V014cnRuUHpvb1pjUlphUnZwMQ==",
                "b1": {
                    "op": 106
                },
                "b0": {
                    "op": 0
                },
                "s4": "-MDGL7G3z_YNnc2XGXal",
                "e": {
                    "v": 0,
                    "a": "false",
                    "i": 0
                },
                "s2": "hive",
                "s3": "like"
            },
            {
                "b1": {
                    "op": 169
                },
                "b3": {
                    "op": 136
                },
                "i": 1,
                "b2": "gRx9M6wPR/bhNncP1DJroW6+m2A=",
                "b4": {
                    "op": 172
                },
                "e": {
                    "i": 1,
                    "a": "1CmgJCgUUbvgTTWi2MF1ECAfR1smAgYs43",
                    "v": 1400
                },
                "b0": {
                    "op": 118
                },
                "s2":"�}3�G��6w�2k�n��'"
            },
            {
                "i": 2,
                "b4": {
                    "op": 172
                },
                "b1": {
                    "op": 169
                },
                "b0": {
                    "op": 118
                },
                "b2": "8chKzwFBUUP/LQSjyi/yWsuFQUQ=",
                "e": {
                    "v": 1000,
                    "i": 2,
                    "a": "1P3RnnAJzpNtcS95fEodpuBdNJPXULNnQP"
                },
                "b3": {
                    "op": 136
                },
                "s2":"��J�AQC�-��/�Z˅AD"
            },
            {
                "b4": {
                    "op": 172
                },
                "i": 3,
                "b0": {
                    "op": 118
                },
                "s2":"��J�AQC�-��/�Z˅AD",
                "e": {
                    "a": "1P3RnnAJzpNtcS95fEodpuBdNJPXULNnQP",
                    "i": 3,
                    "v": 800
                },
                "b3": {
                    "op": 136
                },
                "b1": {
                    "op": 169
                },
                "b2": "8chKzwFBUUP/LQSjyi/yWsuFQUQ="
            },
            {
                "i": 4,
                "b0": {
                    "op": 118
                },
                "b2": "+Kp+Hi9JPb74HhtvAwcyOz0gOh4=",
                "s2":"��~/I=��o2;= :",
                "e": {
                    "v": 137026,
                    "i": 4,
                    "a": "1PfppcRkvxDF9fd9wzraLF9u28VoRzERcW"
                },
                "b4": {
                    "op": 172
                },
                "b3": {
                    "op": 136
                },
                "b1": {
                    "op": 169
                }
            }
        ],
        
    ]
}
                `
            }/>



{/* get transaction By id docs start from here */}

            <div style={styles.heading2Space}>
                <h4>(4.) Get Transaction By Id</h4>
            </div>
            <div style={styles.paraSpace}>
                <p>you can get single transaction by sending transaction id to server. by sending HTTP <b>GET</b> request to the get transaction by id URI </p>
            </div>
            < ApiUrlContainer title = "https://api.vaionex.com/getTransaction?tx=<your transcation id>" />

            <div style={styles.heading2Space}>
                <h6>request</h6>
            </div>
            < ApiUrlContainer title = "[GET] https://api.vaionex.com/getTransaction?tx=0030cf2129fed9f744c993fcf65c43877cf5e2a54055e54888b80f1c7be5ffe9" />

            <div style={styles.heading2Space}>
                <h6>header</h6>
            </div>
            < CodeContainer title = {`
    metashard-user-key: <your metashard user key value>
    metashard-database-id: <your metashard database id key value>
    metashard-api-secret-key: <your metashard api secret key value>
`}
            />

            <div style={styles.paraSpace}>
                <p>To get transaction by id, you have to pass three header parameters <b>metashard-user-key</b> , <b>metashard-database-id</b> and <b>metashard-api-secret-key</b></p>
            </div>


            <div style={styles.heading2Space}>
                <h6>query params</h6>
            </div>
            < CodeContainer title = {`
            tx=<your transaction id>
`}
            />

            <div style={styles.paraSpace}>
                <p>To get transaction by id , you have to pass <b>tx</b> query parameters with your transaction id</p>
            </div>

            <div style={styles.heading2Space}>
                <h6>Response</h6>
            </div>

             <div style={styles.paraSpace}>
                <p>If your request succeeds,  the server responds with an HTTP <b>200 OK</b>  status code and user data.</p>
            </div>

            <CodeContainer title={
                `{
    "message": "1 transaction found",
    "statusCode": 200,
    "data": {
        "txhash": {
            "out": [
                {
                    "s2": "hive",
                    "i": 0,
                    "b0": {
                        "op": 0
                    },
                    "b4": "LU1ER0w3RzN6X1lObmMyWEdYYWw=",
                    "b2": "aGl2ZQ==",
                    "b6": "VUd3V283R1d1V014cnRuUHpvb1pjUlphUnZwMQ==",
                    "e": {
                        "a": "false",
                        "v": 0,
                        "i": 0
                    },
                    "b7": "eHB1YjZGdUY3VjFrNkFGZGZuU2tOOE5nZGt5eUNCNEpXN2JlVmltcXJMRlJIR1U2R1VGTWozb1pkb2NyOWtNaHYzdllzRkZDSGplRWNZUkZMSng0b2hCZDRhNVQ4YkRjVE5tREI3R2l5N1oxM29R",
                    "s7": "xpub6FuF7V1k6AFdfnSkN8NgdkyyCB4JW7beVimqrLFRHGU6GUFMj3oZdocr9kMhv3vYsFFCHjeEcYRFLJx4ohBd4a5T8bDcTNmDB7Giy7Z13oQ",
                    "s6": "UGwWo7GWuWMxrtnPzooZcRZaRvp1",
                    "b1": {
                        "op": 106
                    },
                    "b5": "LU1DRV9BNFFkY2JHWDMwdENHWHA=",
                    "s3": "like",
                    "b3": "bGlrZQ==",
                    "s4": "-MDGL7G3z_YNnc2XGXal",
                    "s5": "-MCE_A4QdcbGX30tCGXp"
                },
                {
                    "b2": "gRx9M6wPR/bhNncP1DJroW6+m2A=",
                    "b1": {
                        "op": 169
                    },
                    "b4": {
                        "op": 172
                    },
                    "b3": {
                        "op": 136
                    },
                    "b0": {
                        "op": 118
                    },
                    "s2":"�}3�G��6w�2k�n��'",
                    "e": {
                        "i": 1,
                        "v": 1400,
                        "a": "1CmgJCgUUbvgTTWi2MF1ECAfR1smAgYs43"
                    },
                    "i": 1
                },
                {
                    "b1": {
                        "op": 169
                    },
                    "b0": {
                        "op": 118
                    },
                    "i": 2,
                    "s2":"��J�AQC�-��/�Z˅AD",
                    "e": {
                        "v": 1000,
                        "a": "1P3RnnAJzpNtcS95fEodpuBdNJPXULNnQP",
                        "i": 2
                    },
                    "b4": {
                        "op": 172
                    },
                    "b3": {
                        "op": 136
                    },
                    "b2": "8chKzwFBUUP/LQSjyi/yWsuFQUQ="
                },
                {
                    "i": 3,
                    "b1": {
                        "op": 169
                    },
                    "b4": {
                        "op": 172
                    },
                    "s2":"��J�AQC�-��/�Z˅AD",
                    "b2": "8chKzwFBUUP/LQSjyi/yWsuFQUQ=",
                    "e": {
                        "i": 3,
                        "a": "1P3RnnAJzpNtcS95fEodpuBdNJPXULNnQP",
                        "v": 800
                    },
                    "b0": {
                        "op": 118
                    },
                    "b3": {
                        "op": 136
                    }
                },
                {
                    "b4": {
                        "op": 172
                    },
                    "b2": "+Kp+Hi9JPb74HhtvAwcyOz0gOh4=",
                    "e": {
                        "v": 137026,
                        "a": "1PfppcRkvxDF9fd9wzraLF9u28VoRzERcW",
                        "i": 4
                    },
                    "b3": {
                        "op": 136
                    },
                    "s2":"��~/I=��o2;= :",
                    "i": 4,
                    "b0": {
                        "op": 118
                    },
                    "b1": {
                        "op": 169
                    }
                }
            ],
            "lock": 0,
            "in": [
                {
                    "b0": "MEQCIAo240OqAz7DUWS11s+6wGw1504cmRTM0IJ/sAcY4gXgAiABBEiJgOeQ0qcabB9pTHLzIGKbFt7MPwhcurXfIhY6P0E=",
                    "seq": 4294967295,
                    "b1": "A8jE+9RkOXN6TRjbc7HNj1h33FmKOWN/gxxlhczoln3c",
                    "i": 0,
                    "e": {
                        "i": 4,
                        "a": "1PfppcRkvxDF9fd9wzraLF9u28VoRzERcW",
                        "h": "ca3b315a1eaf7967a5ab50837d6c2802fe7fa8601797c28853277d84f6d51a22"
                    }
                }
            ],
            "tx": {
                "h": "0030cf2129fed9f744c993fcf65c43877cf5e2a54055e54888b80f1c7be5ffe9"
            }
        }
    }
}
                `
            }/>



            {/* query transaction docs start from here */}



            <div style={styles.heading2Space}>
                <h4>(.) Query Transaction</h4>
            </div>
            <div style={styles.paraSpace}>
                <p>To perform query on transaction. you have to sned HTTP <b>POST</b> request to query transaction URI</p>
            </div>
            <ApiUrlContainer title="https://api.vaionex.com/sendVerficationOtp" />

            <div style={styles.heading2Space}>
                <h6>request</h6>
            </div>
            <ApiUrlContainer title="[GET] https://api.vaionex.com/sendVerficationOtp" />

            <div style={styles.heading2Space}>
                <h6>header</h6>
            </div>
            < CodeContainer title = {`
    tokenid: eyJhbGciOiJSUzI1NiIsImtpZCI6ImFiMGNiMTk5Zjg3MGYyOGUyOTg5YWI0ODFjYzJlNDdlMGUyY2MxOWQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vdmFpb25leGRldiIsImF1ZCI6InZhaW9uZXhkZXYiLCJhdXRoX3RpbWUiOjE2MjI5NTc1MjMsInVzZXJfaWQiOiJZSEEwMGhCbG1zTUR1RDZuZ05sNTZSczhaQTczIiwic3ViIjoiWUhBMDBoQmxtc01EdUQ2bmdObDU2UnM4WkE3MyIsImlhdCI6MTYyMjk1NzUyMywiZXhwIjoxNjIyOTYxMTIzLCJlbWFpbCI6InRlc3RhZEB0ZXN0Mi5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsidGVzdGFkQHRlc3QyLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.IncXnmKxzRTzT66WSDkvx8i - eEHBpGBymLVWlAoZLjwhH7I2U7WHgmYz7AW8ts5G_6FE7zUdcyD_7P1tZvCRUvrKFBURPklzzGco6rRa5dEvWqgIDH0rwMZuAdw - vb_Jr6c628HLJB2ambMVuGbJn7o9jXU1XhNr1H2SNbQcbF88OUm_n8Tzu1Wq - hHi - 9 Gj02D8TsXrBJI8BQpT63bmMQN1AgXXqC8ChGDQ1cOdV6zcmOxScLSMsNpOTs2ffDIYovKQPOiIUVjds3H8uVfMAu3HZx_vu5xMFmEJ6R2sWCNip0tZyWJr76_7g4AmDZmAugc3b3i - O - mdS5oFoosa9Q,
    phonenumber: 8215441111
`}
            />
            <div style={styles.paraSpace}>
                <p>To generate otp, you have to pass two header parameters <b>tokenid</b> and <b>phonenumber</b></p>
            </div>

            <div style={styles.heading2Space}>
                <h6>Response</h6>
            </div>

             <div style={styles.paraSpace}>
                <p>If your request succeeds,  the server responds with an HTTP <b>200 OK</b>  status code and user data.</p>
            </div>

            <CodeContainer title={
                `{
    "message": "Verification code has been sent to your phone.",
    "statusCode": 200,
    "data": {
        "status": "success",
        "msg": "Verification code has been sent to your phone."
    }
}
                `
            }/>




         {/* delete transaction docs start from here */}



            <div style={styles.heading2Space}>
                <h4>(4.) Delete Transdaction</h4>
            </div>
            <div style={styles.paraSpace}>
                <p>In Now days,To validate genuine users most of apps uses otp validation. you can also validate by sending HTTP <b>GET</b> request to send verification otp URI</p>
            </div>
            <ApiUrlContainer title="https://api.vaionex.com/transactions" />

            <div style={styles.heading2Space}>
                <h6>request</h6>
            </div>
            <ApiUrlContainer title="[Delete] https://api.vaionex.com/transactions" />

            <div style={styles.heading2Space}>
                <h6>header</h6>
            </div>
            < CodeContainer title = {`
    metashard-user-key: <your metashard user key value>
    metashard-database-id: <your metashard database id key value>
    metashard-api-secret-key: <your metashard api secret key value>
`}
            />
            <div style={styles.paraSpace}>
                <p>To delete any transaction, you have to pass three header parameters <b>metashard-user-key</b> , <b>metashard-database-id</b> and <b>metashard-api-secret-key</b></p>
            </div>
            <div style={styles.heading2Space}>
                <h6>Body</h6>
            </div>

            <CodeContainer title={
                `{
    tx: ["<your transaction id>", "<your transaction id>"]
}`
            }/>

            <div style={styles.paraSpace}>
                <p>you have to pass array string of transaction id to <b>tx</b> key which transaction you want to delete</p>
            </div>


            <div style={styles.heading2Space}>
                <h6>Response</h6>
            </div>

             <div style={styles.paraSpace}>
                <p>If your request succeeds,  the server responds with an HTTP <b>200 OK</b>  status code and user data.</p>
            </div>

            <CodeContainer title={
                `{
    "message": "Phone number verified successfully.",
    "statusCode": 200,
    "data": {
        "status": "success",
        "msg": "Phone number verified successfully."
    }
}
                `
            }/>

        </div>
    );

}

export default TransactionPage;