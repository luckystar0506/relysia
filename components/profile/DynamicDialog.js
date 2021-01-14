import React, { useState, useRef } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Slide from "@material-ui/core/Slide";
import firebase from "../../config/fire-conf";
import CustomLoader from "../Layouts/CustomLoader";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";
import { updateUserDataAction } from "../../store/actions/actiosMain";
import UpdateImagePortrait from "./UpdateImagePortrait";
import { useDispatch, useSelector } from "react-redux";
import WithdrawComponent from "./WithdrawComponent";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DynamicDialog(props) {
  const [userNameField, setuserNameField] = useState("");
  const [loading, setloading] = useState(false);
  const [emailField, setemailField] = useState("");
  const [ucurrentPasswordField, setucurrentPasswordField] = useState("");
  const [unewPasswordField, setunewPasswordField] = useState("");

  const [imageFile, setimageFile] = useState([]);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleClose = () => {
    props.setdialogState(false);
  };

  const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const updateUsername = () => {
    setloading(true);
    if (userNameField === "") {
      toast.error("Please provide a Username", {
        position: "bottom-left",
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setloading(false);
    } else {
      var updateUser = firebase.auth().currentUser;
      updateUser
        .updateProfile({
          displayName: userNameField,
        })
        .then(() => {
          toast.success("Username updated Successfully", {
            position: "bottom-left",
            autoClose: 10000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          setloading(false);
          handleClose();
          setuserNameField("");
        })
        .catch(function(error) {
          toast.error(error.message, {
            position: "bottom-left",
            autoClose: 10000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          setloading(false);
        });
    }
  };

  const updateUserEmail = () => {
    setloading(true);
    let pass = true;

    if (!validateEmail(emailField)) {
      toast.error("Please provide a valid Email Address", {
        position: "bottom-left",
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      pass = false;
    }
    if (ucurrentPasswordField === "") {
      toast.error("Please provide your current Password", {
        position: "bottom-left",
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      pass = false;
    }

    if (!pass) {
      setloading(false);
    } else {
      //signning the user
      firebase
        .auth()
        .signInWithEmailAndPassword(props.userEmail, ucurrentPasswordField)
        .then(() => {
          //updating email
          var user = firebase.auth().currentUser;
          return user.updateEmail(emailField);
        })
        .then(() => {
          // Update successful.
          toast.success("User Email Updated Successfully", {
            position: "bottom-left",
            autoClose: 10000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          setloading(false);
          handleClose();
          setemailField("");
          setucurrentPasswordField("");
        })
        .catch((error) => {
          toast.error(error.message, {
            position: "bottom-left",
            autoClose: 10000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          setloading(false);
        });
    }
  };

  const updateUserPassword = () => {
    setloading(true);
    let pass = true;

    if (unewPasswordField === "") {
      toast.error("Please provide your new Password", {
        position: "bottom-left",
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      pass = false;
    }
    if (ucurrentPasswordField === "") {
      toast.error("Please provide your current Password", {
        position: "bottom-left",
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      pass = false;
    }

    if (!pass) {
      setloading(false);
    } else {
      //signning the user
      firebase
        .auth()
        .signInWithEmailAndPassword(props.userEmail, ucurrentPasswordField)
        .then(() => {
          //updating email
          var user = firebase.auth().currentUser;
          return user.updatePassword(unewPasswordField);
        })
        .then(() => {
          // Update successful.
          toast.success("User Password Updated Successfully", {
            position: "bottom-left",
            autoClose: 10000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          setloading(false);
          handleClose();
          setunewPasswordField("");
          setucurrentPasswordField("");
        })
        .catch((error) => {
          toast.error(error.message, {
            position: "bottom-left",
            autoClose: 10000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          setloading(false);
        });
    }
  };

  const updateUserAccount = () => {
    setloading(true);
    let pass = true;

    if (ucurrentPasswordField === "") {
      toast.error("Please provide your current Password", {
        position: "bottom-left",
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      pass = false;
    }

    if (!pass) {
      setloading(false);
    } else {
      //signning the user
      firebase
        .auth()
        .signInWithEmailAndPassword(props.userEmail, ucurrentPasswordField)
        .then(() => {
          //updating email
          var user = firebase.auth().currentUser;
          return user.delete();
        })
        .then(() => {
          // Update successful.
          toast.success("User Account Deleted Successfully", {
            position: "bottom-left",
            autoClose: 10000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          setloading(false);
          handleClose();
          setucurrentPasswordField("");
          dispatch(updateUserDataAction(null));
          router.push("/");
        })
        .catch((error) => {
          toast.error(error.message, {
            position: "bottom-left",
            autoClose: 10000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          setloading(false);
        });
    }
  };

  const updateUserPhoto = async () => {
    setloading(true);
    let pass = true;
    if (imageFile[0]) {
      //pushing image to DB
      let storage = firebase.storage();
      let modefiedURL = `https://firebasestorage.googleapis.com/v0/b/vaionexdev.appspot.com/o/profile_images%2F${props.uid}?alt=media`;

      await storage
        .ref()
        .child(`profile_images/${props.uid}`)
        .put(imageFile[0].originFileObj);

      props.setprofileImg(modefiedURL);

      let currentuser = firebase.auth().currentUser;
      currentuser
        .updateProfile({
          photoURL: modefiedURL,
        })
        .then(function() {
          setloading(false);
          handleClose();

          toast.success("Image Uploaded Succesfully", {
            position: "bottom-left",
            autoClose: 10000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        })
        .catch((error) => {
          setloading(false);
          toast.error("Error Occured!", {
            position: "bottom-left",
            autoClose: 10000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        });
    } else {
      setloading(false);
      toast.error("Please provide Profile Image", {
        position: "bottom-left",
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
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
      <h5 style={{ padding: "18px 24px 5px 24px" }}>
        {(() => {
          if (props.dialogType === "export") {
            return "Backup Your Wallet";
          } else if (props.dialogType === "update-username") {
            return "Update UserName";
          } else if (props.dialogType === "update-email") {
            return "Update Email";
          } else if (props.dialogType === "update-password") {
            return "Update Password";
          } else if (props.dialogType === "update-account") {
            return "Delete Account";
          } else if (props.dialogType === "update-image") {
            return "Add an account photo";
          } else if (props.dialogType === "withdraw") {
            return "Withdraw Amount";
          }
        })()}
      </h5>
      <DialogContent>
        {(() => {
          if (props.dialogType === "export") {
            return (
              <>
                <p style={{ marginBottom: "0.2rem" }}>Please write down your backup phrase to secure your wallet.</p>
                <p style={{ marginTop: 0, color: "#0e314c" }}>rent all smooth flame increase ketchup catalog moon room wasp twice media</p>
              </>
            );
          } else if (props.dialogType === "update-username") {
            return (
              <>
                <div className="form-group">
                  <label>UserName</label>
                  <input
                    onChange={(e) => {
                      setuserNameField(e.target.value);
                    }}
                    type="text"
                    className="form-control"
                    defaultValue=""
                    placeholder="Enter your Display Name"
                    required
                  />
                </div>
              </>
            );
          } else if (props.dialogType === "update-email") {
            return (
              <>
                <div className="form-group">
                  <label>New Email</label>
                  <input
                    onChange={(e) => {
                      setemailField(e.target.value);
                    }}
                    type="email"
                    className="form-control"
                    defaultValue=""
                    placeholder="Enter your New Email Address"
                  />
                </div>
                <div className="form-group">
                  <label>Current Password</label>
                  <input
                    onChange={(e) => {
                      setucurrentPasswordField(e.target.value);
                    }}
                    type="password"
                    className="form-control"
                    defaultValue=""
                    placeholder="Enter your Password"
                  />
                </div>
              </>
            );
          } else if (props.dialogType === "update-password") {
            return (
              <>
                <div className="form-group">
                  <label>Current Password</label>
                  <input
                    onChange={(e) => {
                      setucurrentPasswordField(e.target.value);
                    }}
                    type="password"
                    className="form-control"
                    defaultValue=""
                    placeholder="Enter your Current Password"
                  />
                </div>
                <div className="form-group">
                  <label>New Password</label>
                  <input
                    onChange={(e) => {
                      setunewPasswordField(e.target.value);
                    }}
                    type="password"
                    className="form-control"
                    defaultValue=""
                    placeholder="Enter your New Password"
                  />
                </div>
              </>
            );
          } else if (props.dialogType === "update-account") {
            return (
              <>
                <div className="form-group">
                  <label>Current Password</label>
                  <input
                    onChange={(e) => {
                      setucurrentPasswordField(e.target.value);
                    }}
                    type="password"
                    className="form-control"
                    defaultValue=""
                    placeholder="Enter your Current Password"
                  />
                </div>
              </>
            );
          } else if (props.dialogType === "update-image") {
            return <UpdateImagePortrait photoUrl={props.photoUrl} imageFile={imageFile} setimageFile={setimageFile} />;
          } else if (props.dialogType === "withdraw") {
            return <WithdrawComponent handleClose={handleClose} />;
          }
        })()}
      </DialogContent>
      {props.dialogType !== "withdraw" && (
        <DialogActions style={{ marginTop: 10, height: 50 }}>
          {(() => {
            if (loading) {
              return (
                <div style={{ width: 80 }}>
                  <CustomLoader width={25} height={25} />
                </div>
              );
            } else {
              if (props.dialogType === "export") {
                return (
                  <button type="button" className="btn btn-primary btn-small" onClick={handleClose}>
                    Close
                  </button>
                );
              } else {
                return (
                  <button
                    type="button"
                    className="btn btn-primary btn-small"
                    onClick={() => {
                      if (props.dialogType === "update-username") {
                        updateUsername();
                      } else if (props.dialogType === "update-email") {
                        updateUserEmail();
                      } else if (props.dialogType === "update-password") {
                        updateUserPassword();
                      } else if (props.dialogType === "update-account") {
                        updateUserAccount();
                      } else if (props.dialogType === "update-image") {
                        updateUserPhoto();
                      }
                    }}
                  >
                    Update
                  </button>
                );
              }
            }
          })()}
        </DialogActions>
      )}
      <ToastContainer />
    </Dialog>
  );
}
