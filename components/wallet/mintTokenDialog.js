import React, { useState, useRef, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Slide from "@material-ui/core/Slide";
import firebase from "../../config/fire-conf";
import CustomLoader from "../Layouts/CustomLoader";
import { ToastContainer, toast } from "react-toastify";
import Select from "@material-ui/core/Select";
import { PlusOutlined } from "@ant-design/icons";
import { makeStyles } from "@material-ui/core/styles";
import { Upload, message } from "antd";
import ImgCrop from "antd-img-crop";
import PerfectScrollbar from "react-perfect-scrollbar";
import { v4 as uuidv4 } from "uuid";
import Utils from "./utils";

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

export default function MintTokenDialog(props) {
  const classes = useStyles();

  const [loading, setloading] = useState(false);
  const [tokenName, settokenName] = useState("");
  const [tokenSupply, settokenSupply] = useState("");
  const [tokenWebUrl, settokenWebUrl] = useState("");
  const [tokenDesc, settokenDesc] = useState("");
  const [imageFile, setimageFile] = useState([]);

  const handleClose = () => {
    props.setdialogState(false);
  };

  const mintTokenFunc = async () => {
    setloading(true);
    if (props.walletComputerObj) {
      let imageId = uuidv4();
      let uploadTask = storageRef.child("tokensLogos/" + imageId);
      uploadTask.put(imageFile[0].originFileObj);
      let logo = `https://firebasestorage.googleapis.com/v0/b/wallettokens_vionex/o/tokensLogos%2F${imageId}?alt=media`;
      try {
        const publicKey = props.walletComputerObj.db.wallet
          .getPublicKey()
          .toString();
        const TokenSc = await Utils.importFromPublic("/token-sc.js");
        const token = await props.walletComputerObj.new(
          TokenSc,
          [
            publicKey,
            tokenSupply,
            tokenName,
            tokenDesc,
            logo,
            tokenWebUrl,
          ]
        );
        let tokenData = JSON.parse(JSON.stringify(token));
        console.log(
          `Minted ${token.name} with supply ${tokenSupply} and id ${token._id}`
        );
        console.log("token details", tokenData);

        setTimeout(() => {
          setimageFile([]);
          settokenName("");
          settokenWebUrl("");
          settokenDesc("");
          settokenSupply("");

          toast.success(`Minted ${token.name} token successfully!`, {
            position: "bottom-left",
            autoClose: 10000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          setloading(false);
          handleClose();

          setTimeout(() => {
            props.history.push("./tokens");
          }, 1000);
        }, 1000);

        //   if (sendBsvRes && sendBsvRes.data) {
        //     if (sendBsvRes.data.status && sendBsvRes.data.status === "error") {
        //       toast.error(sendBsvRes.data.msg, {
        //         position: "bottom-left",
        //         autoClose: 10000,
        //         hideProgressBar: false,
        //         closeOnClick: true,
        //         pauseOnHover: true,
        //         draggable: true,
        //       });
        //       setloading(false);
        //     } else if (
        //       sendBsvRes.data.status &&
        //       sendBsvRes.data.status === "success"
        //     ) {
        // toast.success(sendBsvRes.data.msg, {
        //   position: "bottom-left",
        //   autoClose: 10000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        // });
        // setloading(false);
        // handleClose();
        // setwalletAddress("");
        // setwalletAomunt("");
        //     }
        //   }
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
    <Dialog
      open={props.dialogState}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
      fullWidth
      style={{ zIndex: 100 }}
      maxWidth="sm"
      className="custom-dialog"
    >
      <PerfectScrollbar style={{ maxHeight: "90vh" }}>
        <h5 style={{ padding: "18px 24px 5px 24px" }}>Mint Token</h5>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            mintTokenFunc();
          }}
        >
          <DialogContent>
            <>
              <div className="form-group">
                <label>Token Name</label>

                <input
                  onChange={(e) => {
                    settokenName(e.target.value);
                  }}
                  value={tokenName}
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
                />
              </div>

              <div className="form-group">
                <label>Website URL</label>

                <input
                  onChange={(e) => {
                    settokenWebUrl(e.target.value);
                  }}
                  value={tokenWebUrl}
                  type="text"
                  className="form-control"
                  placeholder="URL"
                  required
                />
              </div>

              <div className="form-group">
                <label>Token Description</label>

                <textarea
                  onChange={(e) => {
                    settokenDesc(e.target.value);
                  }}
                  value={tokenDesc}
                  type="text"
                  className="form-control"
                  placeholder="Description"
                  required
                  rows="3"
                />
              </div>

              <div className="form-group">
                <label>Token Logo</label>
                <div>
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
            </>
          </DialogContent>
          <DialogActions style={{ marginTop: 10, height: 50 }}>
            <button
              type="button"
              onClick={handleClose}
              className="btn btn-primary btn-small"
              style={{ marginRight: 5 }}
            >
              Cancel
            </button>
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
                    Send
                  </button>
                );
              }
            })()}
          </DialogActions>
        </form>
        <ToastContainer />
      </PerfectScrollbar>
    </Dialog>
  );
}
