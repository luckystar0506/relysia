import React, { useState, useRef } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Slide from "@material-ui/core/Slide";
import firebase from "../../config/fire-conf";
import CustomLoader from "./CustomLoader";
import { ToastContainer, toast } from "react-toastify";
import { PlusOutlined } from "@ant-design/icons";
import { Upload, message } from "antd";
import ImgCrop from "antd-img-crop";
import { v4 as uuidv4 } from "uuid";
import { tokensFirebaseStorage } from "../../config/fire-conf";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function NewWalletDialog(props) {
  const [loading, setloading] = useState(false);
  const [walletName, setwalletName] = useState("");
  const [walletPassword, setwalletPassword] = useState("");
  const [imageFile, setimageFile] = useState([]);

  const handleClose = () => {
    props.setdialogState(false);
  };

  const createNewDialog = async (e) => {
    e.preventDefault();
    setloading(true);
    if (imageFile[0]) {
      try {
        let imageId = uuidv4();
        let uploadTask = tokensFirebaseStorage.child("walletLogos/" + imageId);
        uploadTask.put(imageFile[0].originFileObj);
        let walletLogo = `https://firebasestorage.googleapis.com/v0/b/wallettokens_vionex/o/walletLogos%2F${imageId}?alt=media`;

        toast.info("Generating Wallet Keys..", {
          position: "bottom-left",
          autoClose: 10000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        let createWalletAPI = firebase
          .functions()
          .httpsCallable("createWallet");
        let walletRes = await createWalletAPI({
          title: walletName,
          password: walletPassword,
          walletLogo: walletLogo,
        });

        if (
          walletRes &&
          walletRes.data &&
          walletRes.data.status === "success"
        ) {
          toast.success("Wallet created Successfully!", {
            position: "bottom-left",
            autoClose: 10000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });

          setloading(false);
          handleClose();
          setwalletPassword("");
          setwalletName("");
          setimageFile([]);
        } else {
          toast.error("An error occures, Try again!", {
            position: "bottom-left",
            autoClose: 10000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          setloading(false);
        }
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
    } else {
      toast.error("Please upload wallet logo!", {
        position: "bottom-left",
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      setloading(false);
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
    >
      <h5 style={{ padding: "18px 24px 5px 24px" }}>Create New Wallet</h5>
      <form onSubmit={createNewDialog}>
        <DialogContent>
          <div className="form-group">
            <label>Wallet Name</label>
            <input
              onChange={(e) => {
                setwalletName(e.target.value);
              }}
              value={walletName}
              type="text"
              className="form-control"
              placeholder="Enter your Wallet Name"
              required
              maxLength={80}
            />
          </div>
          <div className="form-group">
            <label>Wallet Password</label>
            <input
              onChange={(e) => {
                setwalletPassword(e.target.value);
              }}
              type="password"
              className="form-control"
              placeholder="Enter your Wallet Password"
              value={walletPassword}
              required
              minLength={6}
              maxLength={200}
            />
          </div>
          <div className="form-group">
            <label>Wallet Logo</label>
            <div>
              <ImgCrop rotate aspect={1 / 1}>
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
        </DialogContent>
        <DialogActions style={{ marginTop: 10, height: 50 }}>
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
                  Create
                </button>
              );
            }
          })()}
        </DialogActions>
      </form>
      <ToastContainer />
    </Dialog>
  );
}
