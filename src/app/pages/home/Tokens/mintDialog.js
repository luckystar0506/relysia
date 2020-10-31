import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import TextField from "@material-ui/core/TextField";
import { useSnackbar } from "notistack";
import CircularProgress from "@material-ui/core/CircularProgress";
import Utils from "./utils";
import CloseIcon from "@material-ui/icons/Close";
import { Upload, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import ImgCrop from "antd-img-crop";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import { Typography } from "@material-ui/core";
import { v4 as uuidv4 } from "uuid";
import firebase from "firebase/app";
import "firebase/storage";

const storageRef = firebase
  .app()
  .storage("gs://wallettokens_vionex/")
  .ref();
const useStyles = makeStyles((theme) => ({
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function MintTokenBtn(props) {
  const classes = useStyles();
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const [mintDiologueState, setmintDiologueState] = useState(false);
  const [mintingLoader, setmintingLoader] = useState(false);
  const [supplyField, setsupplyField] = useState(0);
  const [mintNameField, setmintNameField] = useState("");
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
      if (props.computer[Number(selectedWallet)]) {
        let imageId = uuidv4();
        let uploadTask = storageRef.child("tokensLogos/" + imageId);
        uploadTask.put(imageFile[0].originFileObj);
        let logo = `https://firebasestorage.googleapis.com/v0/b/wallettokens_vionex/o/tokensLogos%2F${imageId}?alt=media`;
        try {
          const publicKey = props.computer[Number(selectedWallet)].db.wallet.getPublicKey().toString();
          const TokenSc = await Utils.importFromPublic("/token-sc.js");
          const token = await props.computer[Number(selectedWallet)].new(TokenSc, [publicKey, supplyField, mintNameField, mintDesc, logo]);
          console.log(`Minted ${token.name} with supply ${supplyField} and id ${token._id}`);
          setTimeout(() => {
            enqueueSnackbar(`Minted ${token.name} token successfully!`, { variant: "success" });
            setmintingLoader(false);
            setmintDiologueState(false);
            setimageFile([]);
            setmintNameField("");
            setmintDesc("");
            setsupplyField(0);
          }, 1000);
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

  const MintDialog = (
    <Dialog style={{ zIndex: 100 }} open={mintDiologueState} TransitionComponent={Transition} keepMounted fullWidth maxWidth="sm">
      <IconButton disabled={mintingLoader} aria-label="close" className={classes.closeButton} onClick={() => setmintDiologueState(false)}>
        <CloseIcon />
      </IconButton>
      <DialogTitle style={{ paddingBottom: 1 }}>Create Token</DialogTitle>
      <DialogContent>
        <DialogContentText style={{ marginBottom: 0 }}>Small amount will be charge</DialogContentText>
        <div style={{ display: "flex", flexDirection: "column", marginBottom: 30, marginTop: 20, width: "80%" }}>
          <TextField
            fullWidth
            value={supplyField}
            onChange={(e) => {
              setsupplyField(e.target.value);
            }}
            label="Token Supply"
            variant="outlined"
            className={`custom-padding`}
            style={{ marginTop: 10 }}
            type="number"
          />
          <TextField
            fullWidth
            value={mintNameField}
            onChange={(e) => {
              setmintNameField(e.target.value);
            }}
            label="Token Name"
            variant="outlined"
            className={`custom-padding`}
            style={{ marginTop: 10 }}
          />
          <TextField
            fullWidth
            multiline
            value={mintDesc}
            onChange={(e) => {
              setmintDesc(e.target.value);
            }}
            rows={2}
            rowsMax={10}
            label="Token Description"
            variant="outlined"
            className={`custom-padding`}
            style={{ marginTop: 10 }}
          />
          <FormControl style={{ marginTop: 10, width: "70%", marginLeft: 4 }}>
            <InputLabel>Wallet</InputLabel>
            <Select
              value={selectedWallet}
              onChange={(e) => {
                setselectedWallet(e.target.value);
              }}
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
          <div style={{ marginTop: 15 }}>
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
        </div>
      </DialogContent>
      <DialogActions>
        <Button disabled={mintingLoader} color="primary" onClick={() => setmintDiologueState(false)}>
          Cancel
        </Button>
        <Button disabled={mintingLoader} color="primary" onClick={mintToken}>
          {mintingLoader ? <CircularProgress size={20} /> : "Mint"}
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <>
      <Button
        startIcon={<AddRoundedIcon />}
        color="primary"
        variant="contained"
        style={{ marginLeft: "auto", borderRadius: 50, paddingLeft: 25, paddingRight: 25 }}
        onClick={() => setmintDiologueState(true)}
      >
        Mint Token
      </Button>
      {MintDialog}
    </>
  );
}

export default MintTokenBtn;
