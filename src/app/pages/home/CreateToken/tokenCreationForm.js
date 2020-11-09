import React, { useState } from "react";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Upload, message } from "antd";
import ImgCrop from "antd-img-crop";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import { PlusOutlined } from "@ant-design/icons";
import { TitleComponent } from "../../../partials/content/helmetComponent";
import { DB1 } from "../../../../index";
import { makeStyles } from "@material-ui/core/styles";
import { updateUserWalletsData, updateUserTokensData } from "../../../store/ducks/auth.duck";
import { useTheme } from "@material-ui/core/styles";
import { useSnackbar } from "notistack";
import { v4 as uuidv4 } from "uuid";
import firebase from "firebase/app";
import "firebase/storage";
import "firebase/database";
import Utils from "./utils";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

const storageRef = firebase
  .app()
  .storage("gs://wallettokens_vionex/")
  .ref();

function TokenCreationForm(props) {
  const { enqueueSnackbar } = useSnackbar();
  const [mintingLoader, setmintingLoader] = useState(false);
  const [supplyField, setsupplyField] = useState(0);
  const [mintNameField, setmintNameField] = useState("");
  const [mintSiteUrlField, setmintSiteUrlField] = useState("");
  const [selectedWallet, setselectedWallet] = useState(0);
  const [mintDesc, setmintDesc] = useState("");
  const [imageFile, setimageFile] = useState([]);

  const mintToken = async () => {
    let pass = true;
    setmintingLoader(true);
    if (Number(supplyField) <= 0) {
      pass = false;
      enqueueSnackbar("Token Supply should be greater than 0", { variant: "error" });
    }

    if (mintNameField === "") {
      pass = false;
      enqueueSnackbar("Please provide a valid Token name", { variant: "error" });
    }

    if (!imageFile[0]) {
      pass = false;
      enqueueSnackbar("Please provide Token Image!", { variant: "error" });
    }

    if (!pass) {
      setmintingLoader(false);
    } else {
      createToken();
    }
  };

  const createToken = async () => {
    if (props.computer[Number(selectedWallet)]) {
      let imageId = uuidv4();
      let uploadTask = storageRef.child("tokensLogos/" + imageId);
      uploadTask.put(imageFile[0].originFileObj);
      let logo = `https://firebasestorage.googleapis.com/v0/b/wallettokens_vionex/o/tokensLogos%2F${imageId}?alt=media`;
      try {
        const publicKey = props.computer[Number(selectedWallet)].db.wallet.getPublicKey().toString();
        const TokenSc = await Utils.importFromPublic("/token-sc.js");
        const token = await props.computer[Number(selectedWallet)].new(TokenSc, [
          publicKey,
          supplyField,
          mintNameField,
          mintDesc,
          logo,
          mintSiteUrlField,
        ]);
        let tokenData = JSON.parse(JSON.stringify(token));

        console.log(`Minted ${token.name} with supply ${supplyField} and id ${token._id}`);
        console.log("token details", tokenData);

        //updating details in firebase

        setTimeout(() => {
          enqueueSnackbar(`Minted ${token.name} token successfully!`, { variant: "success" });
          setmintingLoader(false);
          setimageFile([]);
          setmintNameField("");
          setmintSiteUrlField("");
          setmintDesc("");
          setsupplyField(0);
          setTimeout(() => {
            props.history.push("./tokens");
          }, 1000);
        }, 1000);
        let updates = {};
        tokenData = { ...tokenData, userEmail: props.userEmail, status: props.tokenType };
        updates["tokens/" + tokenData._id] = tokenData;

        firebase
          .database()
          .ref()
          .update(updates);
      } catch (err) {
        console.log("err", err);
        if (err.message.startsWith("Insufficient balance in address")) {
          enqueueSnackbar("Insufficient balance in address", { variant: "error" });
        } else {
          enqueueSnackbar(err.message, { variant: "error" });
        }
        setmintingLoader(false);
      }
    }
  };

  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  const onChangeImage = ({ fileList: newFileList }) => {
    if (newFileList[0] && newFileList[0].size > 625000) {
      message.error("Image must smaller than 5MB!");
    } else {
      setimageFile(newFileList);
    }
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  return (
    <div>
      <Grid container justify="center" alignItems="stretch" spacing={1} style={{ width: "100%" }}>
        {props.tokenType === "Open" && props.openTab}
        {props.tokenType === "Team" && props.teamTab}
        {props.tokenType === "Private" && props.privateTab}

        <Grid item lg={3} md={4} xs={12}>
          <Paper style={{ padding: 20, height: "100%" }}>
            <TextField
              margin="dense"
              fullWidth
              autoFocus
              onChange={(e) => {
                setmintNameField(e.target.value);
              }}
              label="Token Name"
              style={{ marginTop: 10 }}
            />
            <TextField
              fullWidth
              onChange={(e) => {
                setsupplyField(e.target.value);
              }}
              label="Token Supply"
              margin="dense"
              style={{ marginTop: 10 }}
              type="number"
            />
            <TextField
              margin="dense"
              fullWidth
              onChange={(e) => {
                setmintSiteUrlField(e.target.value);
              }}
              label="Website Url"
              style={{ marginTop: 10 }}
            />
            <TextField
              fullWidth
              multiline
              onChange={(e) => {
                setmintDesc(e.target.value);
              }}
              rowsMax={10}
              label="Token Description"
              margin="dense"
              style={{ marginTop: 10 }}
            />

            <FormControl style={{ marginTop: 10, width: "100%" }}>
              <InputLabel>Wallet</InputLabel>
              <Select
                value={selectedWallet}
                onChange={(e) => {
                  setselectedWallet(e.target.value);
                }}
                fullWidth
              >
                {props.walletsList.map((selectItem, indx) => {
                  return (
                    <MenuItem key={selectItem.id + "opt" + indx} value={indx}>
                      {selectItem.title}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>

            <div style={{ margin: "20px 0px 0px 0px", textAlign: "left" }}>
              <Typography variant="caption" color="textSecondary">
                Token Logo
              </Typography>
              <div style={{ marginTop: 6 }}>
                <ImgCrop rotate>
                  <Upload
                    customRequest={dummyRequest}
                    listType="picture-card"
                    fileList={imageFile}
                    onChange={onChangeImage}
                    onPreview={onPreview}
                  >
                    {imageFile.length < 1 && <PlusOutlined />}
                  </Upload>
                </ImgCrop>
              </div>
            </div>

            <Button
              onClick={mintToken}
              style={{ padding: 10, margin: 20, backgroundColor: mintingLoader ? "transparent" : "#FFBE05", color: "black" }}
              variant={mintingLoader ? "text" : "contained"}
              color="primary"
              disabled={mintingLoader}
            >
              {mintingLoader ? <CircularProgress size={20} /> : "Create Token"}
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default TokenCreationForm;
