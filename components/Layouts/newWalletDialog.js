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

const walletDefaultTokens = [
  "https://firebasestorage.googleapis.com/v0/b/wallettokens_vionex/o/walletIcons%2Fwallet.svg?alt=media",
  "https://firebasestorage.googleapis.com/v0/b/wallettokens_vionex/o/walletIcons%2Fwallet%20(1).svg?alt=media",
  ,
  "https://firebasestorage.googleapis.com/v0/b/wallettokens_vionex/o/walletIcons%2Fwallet-filled-money-tool.svg?alt=media",
  "https://firebasestorage.googleapis.com/v0/b/wallettokens_vionex/o/walletIcons%2Fwallet%20(2).svg?alt=media",
  "https://firebasestorage.googleapis.com/v0/b/wallettokens_vionex/o/walletIcons%2Faccount.svg?alt=media",
  "https://firebasestorage.googleapis.com/v0/b/wallettokens_vionex/o/walletIcons%2Fdashboard-interface.svg?alt=media",
  "https://firebasestorage.googleapis.com/v0/b/wallettokens_vionex/o/walletIcons%2Fpiggy-bank.svg?alt=media",
  "https://firebasestorage.googleapis.com/v0/b/wallettokens_vionex/o/walletIcons%2Fpurse.svg?alt=media",
  "https://firebasestorage.googleapis.com/v0/b/wallettokens_vionex/o/walletIcons%2Fimage.svg?alt=media",
  "https://firebasestorage.googleapis.com/v0/b/wallettokens_vionex/o/walletIcons%2Fpurse%20(1).svg?alt=media",
];

export default function NewWalletDialog(props) {
  const [loading, setloading] = useState(false);
  const [walletName, setwalletName] = useState("");
  const [walletPassword, setwalletPassword] = useState("");
  const [imageFile, setimageFile] = useState([]);
  const [walletIconIndex, setwalletIconIndex] = useState(-1);

  const handleClose = () => {
    props.setdialogState(false);
  };

  const createNewWallet = async (e) => {
    e.preventDefault();
    setloading(true);
    // if (imageFile[0] || walletIconIndex !== -1) {
    if (walletIconIndex !== -1) {
      try {
        let walletLogo = "";
        if (walletIconIndex !== -1) {
          walletLogo = walletDefaultTokens[walletIconIndex];
        }
        //  else {
        //   let imageId = uuidv4();
        //   let uploadTask = tokensFirebaseStorage.child(
        //     "walletLogos/" + imageId
        //   );
        //   uploadTask.put(imageFile[0].originFileObj);
        //   walletLogo = `https://firebasestorage.googleapis.com/v0/b/wallettokens_vionex/o/walletLogos%2F${imageId}?alt=media`;
        // }

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
          setwalletIconIndex(-1);
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
      toast.error("Please select wallet icon!", {
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
      setwalletIconIndex(-1);
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
      style={{ zIndex: 1000 }}
      maxWidth="sm"
    >
      <h5 style={{ padding: "18px 24px 5px 24px" }}>Create New Wallet</h5>
      <form onSubmit={createNewWallet}>
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
            <label>Wallet Icon</label>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexWrap: "wrap",
                  marginTop: 0,
                }}
                className="services-content withdraw-icons-con"
              >
                {walletDefaultTokens.map((icon, index1) => {
                  return (
                    <div
                      className="box iconBox wallet-sele-icon "
                      style={{
                        background:
                          walletIconIndex === index1
                            ? "linear-gradient(135deg, #f48665 0%, #fda23f 100%)"
                            : "",
                      }}
                      onClick={() => {
                        setwalletIconIndex(index1);
                        setimageFile([]);
                      }}
                    >
                      <img
                        style={{ width: "100%", height: "100%" }}
                        src={icon}
                        alt={`icon${index1}`}
                      />
                    </div>
                  );
                })}
              </div>
              {/* <div>
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
          */}
            </div>
          </div>
        </DialogContent>
        <DialogActions style={{ marginTop: 0, height: 50 }}>
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
