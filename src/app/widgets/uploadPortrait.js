import React, { useState } from "react";
import { Upload } from "antd";
import ImgCrop from "antd-img-crop";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import { Modal } from "antd";
import CircularProgress from "@material-ui/core/CircularProgress";
import { connect } from "react-redux";
import { updateProfilePicFunc } from "../store/ducks/auth.duck";
import { useSnackbar } from "notistack";
import { FormattedMessage } from "react-intl";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";


function UpdatePortraitComponent(props) {
  const [fileList, setFileList] = useState([]);
  const [visible, setvisible] = useState(false);
  const [showLoader, setshowLoader] = useState(false);
  const [disabled, setdisabled] = useState(true);
  const { enqueueSnackbar } = useSnackbar();

  const onChange = ({ fileList: newFileList }) => {
    //max size 5mb
    if (newFileList[0] && newFileList[0].size > 625000) {
      setshowLoader(false);
      setdisabled(true);

      enqueueSnackbar("File Size is too large!", { variant: "error" });
    } else {
      setFileList(newFileList);
      if (newFileList.length > 0) {
        setdisabled(false);
      } else {
        setdisabled(true);
      }
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

  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  const submitProfilePic = () => {
    setshowLoader(true);
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        let uid = user.uid;

        let storage = firebase.storage();
        let storageRef = storage
          .ref()
          .child(`profile_images/${uid}`)
          .put(fileList[0].originFileObj);

        storageRef.on(
          firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
          function(snapshot) {},
          function(error) {
            setshowLoader(false);
            setdisabled(false);

            enqueueSnackbar("Error occured while uploading!", {
              variant: "error",
            });
            setFileList([]);
          },
          function() {
            let modefiedURL = `https://firebasestorage.googleapis.com/v0/b/hivedb-cdbf7.appspot.com/o/profile_images%2F${uid}_100x100?alt=media`;

            let currentuser = firebase.auth().currentUser;
            currentuser
              .updateProfile({
                photoURL: modefiedURL,
              })
              .then(function() {
                setshowLoader(false);
                setdisabled(true);

                enqueueSnackbar("Image Uploaded!", { variant: "success" });
                setvisible(false);
                setFileList([]);
                props.updateProfilePicFunc({
                  type: true,
                  url: URL.createObjectURL(fileList[0].originFileObj),
                });
              })
              .catch(function(error) {
                setshowLoader(false);
                setdisabled(false);
                enqueueSnackbar("Error Occured!", { variant: "error" });

                setFileList([]);
              });
            // });
          }
        );
      } else {
        setshowLoader(false);
        setdisabled(false);
        enqueueSnackbar("An Error Occured!", { variant: "error" });
        setFileList([]);
      }
    });
  };

  return (
    <Card style={{ marginTop: 8 }}>
      <Button style={{ width: "100%", padding: 15 }} onClick={() => setvisible(true)}>
        <FormattedMessage id="PRFILE.CHANGEPORTRAIT" defaultMessage="Update Portrait" />
      </Button>
      <Modal
        title="Add an account photo"
        visible={visible}
        onOk={submitProfilePic}
        onCancel={() => setvisible(false)}
        footer={[
          <div
            key="modal-foter"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <Button key="Cancle-112" color="primary" onClick={() => setvisible(false)}>
              <FormattedMessage id="PRFILE.DIALOG5.Cancel" defaultMessage="Cancel" />
            </Button>
            {showLoader ? (
              <CircularProgress size={20} style={{ margin: "0px 20px" }} />
            ) : (
              <Button key="Submit-112" color="primary" disabled={disabled} onClick={submitProfilePic}>
                <FormattedMessage id="PRFILE.DIALOG5.Submit" defaultMessage="Submit" />
              </Button>
            )}
          </div>,
        ]}
      >
        <ImgCrop rotate>
          <Upload
            customRequest={dummyRequest}
            listType="picture-card"
            fileList={fileList}
            onChange={onChange}
            onPreview={onPreview}
            accept="image/*"
          >
            {fileList.length < 1 && "+ Upload"}
          </Upload>
        </ImgCrop>
      </Modal>
    </Card>
  );
}

const mapStateToProps = ({ auth: { updateProfilePic } }) => ({
  updateProfilePic,
});
export default connect(mapStateToProps, { updateProfilePicFunc })(UpdatePortraitComponent);
