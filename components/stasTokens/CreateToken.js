import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import CustomLoader from "../Layouts/CustomLoader";
import firebase from "../../config/fire-conf";
import { withRouter } from "next/router";
import Chip from "@material-ui/core/Chip";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {
  ThemeProvider,
  withStyles,
  createMuiTheme,
} from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
import Lottie from "react-lottie";
import dbAnimation from "./dbAnimation.json";
import { makeStyles } from "@material-ui/core/styles";
import CountrySelect from "react-bootstrap-country-select";
import TextareaAutosize from "react-textarea-autosize";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepConnector from "@material-ui/core/StepConnector";
import SettingsApplicationsIcon from "@material-ui/icons/SettingsApplications";
import DescriptionIcon from "@material-ui/icons/Description";
import TuneIcon from "@material-ui/icons/Tune";
import clsx from "clsx";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import { useSelector } from "react-redux";
import { Upload } from "antd";
import ImgCrop from "antd-img-crop";
import { PlusOutlined } from "@ant-design/icons";
import { tokensFirebaseStorage } from "../../config/fire-conf";

const styles = (theme) => ({
  inputFieldStyle: {
    paddingTop: "30px !important",
    fontSize: "14px !important",
    color: "#0e314c",

    "& .MuiFilledInput-root": {
      paddingTop: "30px !important",
      fontSize: "14px !important",
      color: "#0e314c",
      backgroundColor: "red !important",
    },
  },
  customInput: {
    backgroundColor: "#eeeeee !important",
  },
});

const useStyles = makeStyles((theme) => ({
  largeAvatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    margin: 0,
    padding: 0,
  },
}));

function CreateToken(props) {
  const classes = useStyles();
  const userDataRedux = useSelector((state) => state.userData);
  const router = useRouter();

  const [tokenSupply, settokenSupply] = useState("");
  const [issuerCountryObj, setissuerCountryObj] = useState({
    alpha2: "us",
    alpha3: "usa",
    flag: "🇺🇸",
    id: "us",
    ioc: "usa",
    name: "United States",
  });
  const [tokenSchema, settokenSchema] = useState({
    schemaId: "Schema STAS Coupon",
    tokenName: "",
    tokenId: "",
    tokenDescription: "",
    issuerName: "",
    issuerCountry: "United States",
    issuerLegalForm: "Limited Liability Public Company",
    issuerEmail: "",
    issuerWebsite: "",
    terms: "© 2021",
    governingLaw: "Cayman Islands Law",
    icon: "",
    tickerSymbol: "",
  });
  const [activeStep, setActiveStep] = React.useState(0);
  const [submitLoader, setsubmitLoader] = useState(false);
  const [imageFile, setimageFile] = useState([]);
  const [userWallets, setuserWallets] = useState([]);
  const [selectedWalletIndex, setselectedWalletIndex] = useState(0);

  const steps = getSteps();

  useEffect(() => {
    if (userDataRedux) {
      getUserWallets();
    }
  }, [userDataRedux]);

  const getUserWallets = () => {
    firebase
      .database()
      .ref("userWallets/" + userDataRedux.uid)
      .once("value", (snapshot) => {
        let recWalletsData = snapshot.val();
        if (recWalletsData) {
          let arr = Object.values(recWalletsData);
          let defaultWalletIndex = arr.findIndex(
            (x) => x.id === "vaionex-wallet"
          );
          setselectedWalletIndex(defaultWalletIndex);
          setuserWallets([...arr]);
        }
      });
  };

  const handleNext = () => {
    if (activeStep === 0 && !imageFile[0]) {
      toast.error(`Please upload Token Image!`, {
        position: "bottom-left",
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return null;
    }
    if (activeStep === 2) {
      createNewTokenFunc();
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const createNewTokenFunc = async () => {
    setsubmitLoader(true);
    try {
      let stasTokenImg;
      let imageId = uuidv4();
      let uploadTask = tokensFirebaseStorage.child("walletLogos/" + imageId);
      uploadTask.put(imageFile[0].originFileObj);
      stasTokenImg = `https://firebasestorage.googleapis.com/v0/b/wallettokens_vionex/o/walletLogos%2F${imageId}?alt=media`;

      const tokenDetails = { ...tokenSchema };
      tokenDetails.icon = stasTokenImg;

      let destinationAddress = [userWallets[selectedWalletIndex].address[0]];

      let stasTokenIssuanceAPI = firebase
        .functions()
        .httpsCallable("stasTokenIssuance");
      let res = await stasTokenIssuanceAPI({
        tokenDetails: tokenDetails,
        tokenSupply: tokenSupply,
        destinationAddress: destinationAddress,
      });
      console.log("res", res);
      if (res && res.data && res.data.status === "success") {
        toast.success(res.data.msg, {
          position: "bottom-left",
          autoClose: 10000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        settokenSchema({
          schemaId: "Schema STAS Coupon",
          tokenName: "",
          tokenId: "",
          tokenDescription: "",
          issuerName: "",
          issuerCountry: "United States",
          issuerLegalForm: "Limited Liability Public Company",
          issuerEmail: "",
          issuerWebsite: "",
          terms: "© 2021",
          governingLaw: "Cayman Islands Law",
          icon: "",
          tickerSymbol: "",
        });
        settokenSupply("");
        setissuerCountryObj({
          alpha2: "us",
          alpha3: "usa",
          flag: "🇺🇸",
          id: "us",
          ioc: "usa",
          name: "United States",
        });
        router.push("/app/stas-tokens");
        setsubmitLoader(false);
      } else {
        toast.error(res.data.msg, {
          position: "bottom-left",
          autoClose: 10000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        setsubmitLoader(false);
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

      setsubmitLoader(false);
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
    <>
      <div className="page-title-area">
        <div className="container">
          <div className="section-title" style={{ marginBottom: 0 }}>
            <h2>Create Token</h2>
            <div className="bar"></div>
            <p>Anything On your Mind. We’ll Be Glad To Assist You!</p>
          </div>
        </div>

        <div className="shape1">
          <img src={require("../../static/images/shape1.png")} alt="shape" />
        </div>
        <div className="shape2 rotateme">
          <img src={require("../../static/images/shape2.svg")} alt="shape" />
        </div>
        <div className="shape3">
          <img src={require("../../static/images/shape3.svg")} alt="shape" />
        </div>
        <div className="shape4">
          <img src={require("../../static/images/shape4.svg")} alt="shape" />
        </div>
        <div className="shape5">
          <img src={require("../../static/images/shape5.png")} alt="shape" />
        </div>
        <div className="shape6 rotateme">
          <img src={require("../../static/images/shape4.svg")} alt="shape" />
        </div>
        <div className="shape7">
          <img src={require("../../static/images/shape4.svg")} alt="shape" />
        </div>
        <div className="shape8 rotateme">
          <img src={require("../../static/images/shape2.svg")} alt="shape" />
        </div>
      </div>
      <section
        className="services-details-area ptb-50"
        style={{ paddingBottom: 0 }}
      >
        <div className="container" style={{ marginBottom: 80 }}>
          <div className="row h-100 justify-content-center align-items-center">
            <div className="col-lg-6 col-md-12 " style={{ marginBottom: 0 }}>
              <Lottie
                options={{
                  loop: true,
                  autoplay: true,
                  mode: "normal",

                  animationData: dbAnimation,
                  rendererSettings: {
                    preserveAspectRatio: "none",
                  },
                }}
                speed={1}
              />
            </div>

            <div className="col-lg-6 col-md-12">
              <div>
                <Stepper
                  style={{ width: "100%" }}
                  alternativeLabel
                  activeStep={activeStep}
                  connector={<ColorlibConnector />}
                >
                  {steps.map((label, indx) => (
                    <Step key={label}>
                      <StepLabel StepIconComponent={ColorlibStepIcon}>
                        {label}
                      </StepLabel>
                    </Step>
                  ))}
                </Stepper>
                <div>
                  <div>
                    {/* //fields */}
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleNext();
                      }}
                    >
                      <div
                        style={{
                          //   minHeight: "50vh",
                          margin: "20px 20px",
                        }}
                      >
                        {(() => {
                          if (activeStep === 0) {
                            return (
                              <div id="contactForm">
                                <div className="row">
                                  <div className="col-lg-12 col-md-12">
                                    <div className="form-group">
                                      <input
                                        name="Token Name"
                                        required
                                        onChange={(e) => {
                                          let modifiedObj = {
                                            ...tokenSchema,
                                          };
                                          modifiedObj.tokenName =
                                            e.target.value;
                                          settokenSchema(modifiedObj);
                                        }}
                                        value={tokenSchema.tokenName}
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter token name"
                                      />
                                    </div>
                                  </div>

                                  <div className="col-lg-12 col-md-12">
                                    <div className="form-group">
                                      <input
                                        name="Token Supply"
                                        onChange={(e) => {
                                          settokenSupply(e.target.value);
                                        }}
                                        value={tokenSupply}
                                        type="number"
                                        className="form-control"
                                        placeholder="Enter the desired token supply"
                                        required
                                        min={1}
                                      />
                                    </div>
                                  </div>

                                  <div className="col-lg-12 col-md-12">
                                    <div className="form-group">
                                      <input
                                        name="Ticker/Token Symbol"
                                        onChange={(e) => {
                                          let modifiedObj = {
                                            ...tokenSchema,
                                          };
                                          modifiedObj.tickerSymbol =
                                            e.target.value;
                                          settokenSchema(modifiedObj);
                                        }}
                                        value={tokenSchema.tickerSymbol}
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter Ticker/Token Symbol"
                                        required
                                      />
                                    </div>
                                  </div>

                                  <div className="col-lg-12 col-md-12">
                                    <div className="form-group">
                                      <label style={{ marginTop: 5 }}>
                                        Select Wallet
                                      </label>
                                      <div
                                        style={{
                                          maxWidth: 500,
                                          marginTop: -5,
                                          marginLeft: 5,
                                        }}
                                      >
                                        <Select
                                          value={selectedWalletIndex}
                                          onChange={(e) =>
                                            setselectedWalletIndex(
                                              e.target.value
                                            )
                                          }
                                          fullWidth
                                          className={classes.select}
                                          inputProps={{
                                            classes: {
                                              icon: classes.icon,
                                            },
                                          }}
                                        >
                                          {userWallets.map((wallet, index) => {
                                            return (
                                              <MenuItem
                                                key={index + "walletItem"}
                                                value={index}
                                              >
                                                {wallet.title}
                                              </MenuItem>
                                            );
                                          })}
                                          {userWallets.length === 0 && (
                                            <MenuItem value={0}>
                                              You didn't have any tokens
                                            </MenuItem>
                                          )}
                                        </Select>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="col-lg-12 col-md-12">
                                    <div className="form-group">
                                      <label style={{ marginTop: 5 }}>
                                        Upload Token Image
                                      </label>
                                      <ImgCrop rotate aspect={1 / 1}>
                                        <Upload
                                          customRequest={dummyRequest}
                                          listType="picture-card"
                                          fileList={imageFile}
                                          onChange={onChangeImage}
                                          onPreview={onPreview}
                                        >
                                          {imageFile.length < 1 && (
                                            <PlusOutlined />
                                          )}
                                        </Upload>
                                      </ImgCrop>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          } else if (activeStep === 1) {
                            return (
                              <div id="contactForm">
                                <div className="row">
                                  <div className="col-lg-12 col-md-12">
                                    <div className="form-group">
                                      <input
                                        name="Issuer Name"
                                        onChange={(e) => {
                                          let modifiedObj = {
                                            ...tokenSchema,
                                          };
                                          modifiedObj.issuerName =
                                            e.target.value;
                                          settokenSchema(modifiedObj);
                                        }}
                                        value={tokenSchema.issuerName}
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter Issuer Name"
                                        required
                                      />
                                    </div>
                                  </div>

                                  <div className="col-lg-12 col-md-12">
                                    <div className="form-group">
                                      <input
                                        name="Issuer Email"
                                        onChange={(e) => {
                                          let modifiedObj = {
                                            ...tokenSchema,
                                          };
                                          modifiedObj.issuerEmail =
                                            e.target.value;
                                          settokenSchema(modifiedObj);
                                        }}
                                        value={tokenSchema.issuerEmail}
                                        type="email"
                                        className="form-control"
                                        placeholder="Enter Issuer Email"
                                        required
                                      />
                                    </div>
                                  </div>
                                  <div className="col-lg-12 col-md-12">
                                    <div className="form-group">
                                      <CountrySelect
                                        value={issuerCountryObj}
                                        onChange={(e) => {
                                          setissuerCountryObj(e);

                                          if (e && e.name) {
                                            let modifiedObj = {
                                              ...tokenSchema,
                                            };
                                            modifiedObj.issuerCountry = e.name;
                                            settokenSchema(modifiedObj);
                                          }
                                        }}
                                      />
                                    </div>
                                  </div>

                                  <div className="col-lg-12 col-md-12">
                                    <div className="form-group">
                                      <input
                                        name="Issuer Website Url"
                                        onChange={(e) => {
                                          let modifiedObj = {
                                            ...tokenSchema,
                                          };
                                          modifiedObj.issuerWebsite =
                                            e.target.value;
                                          settokenSchema(modifiedObj);
                                        }}
                                        value={tokenSchema.issuerWebsite}
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter Issuer Website Url"
                                        required
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          } else if (activeStep === 2) {
                            return (
                              <div id="contactForm">
                                <div className="row">
                                  <div className="col-lg-12 col-md-12">
                                    <div className="form-group">
                                      <input
                                        name="Governing Law"
                                        onChange={(e) => {
                                          let modifiedObj = {
                                            ...tokenSchema,
                                          };
                                          modifiedObj.governingLaw =
                                            e.target.value;
                                          settokenSchema(modifiedObj);
                                        }}
                                        value={tokenSchema.governingLaw}
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter Governing Law"
                                        required
                                      />
                                    </div>
                                  </div>

                                  <div className="col-lg-12 col-md-12">
                                    <div className="form-group">
                                      <TextareaAutosize
                                        name="Token Description"
                                        onChange={(e) => {
                                          let modifiedObj = {
                                            ...tokenSchema,
                                          };
                                          modifiedObj.tokenDescription =
                                            e.target.value;
                                          settokenSchema(modifiedObj);
                                        }}
                                        value={tokenSchema.tokenDescription}
                                        type="text"
                                        className="form-control"
                                        placeholder="Description"
                                        required
                                        minRows="3"
                                        maxRows="12"
                                        aria-multiline="true"
                                      />
                                    </div>
                                  </div>

                                  <div className="col-lg-12 col-md-12">
                                    <div className="form-group">
                                      <TextareaAutosize
                                        name="Token Terms"
                                        onChange={(e) => {
                                          let modifiedObj = {
                                            ...tokenSchema,
                                          };
                                          modifiedObj.terms = e.target.value;
                                          settokenSchema(modifiedObj);
                                        }}
                                        value={tokenSchema.terms}
                                        type="text"
                                        className="form-control"
                                        placeholder="Description"
                                        required
                                        minRows="3"
                                        maxRows="12"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          }
                        })()}
                      </div>
                      <div
                        style={{
                          marginTop: 10,
                          marginBottom: 50,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "flex-end",
                        }}
                      >
                        <Button
                          disabled={activeStep === 0}
                          onClick={handleBack}
                          style={{ marginRight: 10 }}
                        >
                          Back
                        </Button>
                        <div style={{ width: 80 }}>
                          {submitLoader ? (
                            <div
                              style={{
                                height: 51,
                                display: "flex",
                                alignItems: "center",
                                width: "100%",
                                justifyContent: "center",
                              }}
                            >
                              <CustomLoader width={25} height={25} />
                            </div>
                          ) : (
                            <button type="submit" className="btn btn-primary">
                              {activeStep === steps.length - 1
                                ? "Submit"
                                : "Next"}
                            </button>
                          )}
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </section>
    </>
  );
}

export default CreateToken;

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    "& $line": {
      backgroundImage:
        "linear-gradient( 95deg,#e66f4b 0%, #f48665 50%, #f79577 100%)",
    },
  },
  completed: {
    "& $line": {
      backgroundImage:
        "linear-gradient( 95deg,#e66f4b 0%, #f48665 50%, #f79577 100%)",
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: "#eaeaf0",
    borderRadius: 1,
  },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: "#ccc",
    zIndex: 1,
    color: "#fff",
    width: 50,
    height: 50,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  active: {
    backgroundImage:
      "linear-gradient( 136deg, #e66f4b 0%, #f48665 50%, #f79577 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  },
  completed: {
    backgroundImage:
      "linear-gradient( 136deg, #e66f4b 0%, #f48665 50%, #f79577 100%)",
  },
});

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: <TuneIcon />,
    2: <SupervisorAccountIcon />,
    3: <DescriptionIcon />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}
function getSteps() {
  return ["Token Overview", "Issuer Details", "Token Details"];
}
