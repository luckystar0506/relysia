module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../ssr-module-cache.js');
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ({

/***/ "+eIL":
/***/ (function(module, exports) {



/***/ }),

/***/ "/5/m":
/***/ (function(module, exports) {



/***/ }),

/***/ 1:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("1TCz");


/***/ }),

/***/ "1F5d":
/***/ (function(module, exports) {



/***/ }),

/***/ "1TCz":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/antd/dist/antd.css
var antd = __webpack_require__("TpwP");

// EXTERNAL MODULE: ./node_modules/react-phone-number-input/style.css
var style = __webpack_require__("QAl9");

// EXTERNAL MODULE: ./node_modules/react-bootstrap-country-select/dist/react-bootstrap-country-select.css
var react_bootstrap_country_select = __webpack_require__("WxOz");

// EXTERNAL MODULE: ./node_modules/vionex-pay-button/dist/index.css
var dist = __webpack_require__("g/zC");

// EXTERNAL MODULE: ./static/css/slick.css
var slick = __webpack_require__("Nrac");

// EXTERNAL MODULE: ./static/css/animate.css
var animate = __webpack_require__("GPYT");

// EXTERNAL MODULE: ./static/css/flaticon.css
var flaticon = __webpack_require__("/5/m");

// EXTERNAL MODULE: ./static/css/boxicons.min.css
var boxicons_min = __webpack_require__("IVv6");

// EXTERNAL MODULE: ./node_modules/odometer/themes/odometer-theme-default.css
var odometer_theme_default = __webpack_require__("IZgi");

// EXTERNAL MODULE: ./node_modules/react-toastify/dist/ReactToastify.css
var ReactToastify = __webpack_require__("jDDT");

// EXTERNAL MODULE: ./node_modules/react-accessible-accordion/dist/fancy-example.css
var fancy_example = __webpack_require__("QYuT");

// EXTERNAL MODULE: ./node_modules/react-modal-video/css/modal-video.min.css
var modal_video_min = __webpack_require__("HP2+");

// EXTERNAL MODULE: ./node_modules/react-image-lightbox/style.css
var react_image_lightbox_style = __webpack_require__("Y9L4");

// EXTERNAL MODULE: ./static/styles/style.css
var styles_style = __webpack_require__("d1yk");

// EXTERNAL MODULE: ./node_modules/react-perfect-scrollbar/dist/css/styles.css
var styles = __webpack_require__("kVbL");

// EXTERNAL MODULE: ./static/styles/brink-pink-style.css
var brink_pink_style = __webpack_require__("kI49");

// EXTERNAL MODULE: ./static/css/responsive.css
var responsive = __webpack_require__("+eIL");

// EXTERNAL MODULE: ./static/css/custom.css
var custom = __webpack_require__("Ih5T");

// EXTERNAL MODULE: ./static/styles/GlobalNewDocsContainer.css
var GlobalNewDocsContainer = __webpack_require__("Kzp6");

// EXTERNAL MODULE: ./node_modules/tailwindcss/tailwind.css
var tailwind = __webpack_require__("uXJ4");

// EXTERNAL MODULE: ./assets/styles/globals.css
var globals = __webpack_require__("1F5d");

// EXTERNAL MODULE: external "react-redux"
var external_react_redux_ = __webpack_require__("h74D");

// EXTERNAL MODULE: ./node_modules/next/app.js
var app = __webpack_require__("8Bbg");
var app_default = /*#__PURE__*/__webpack_require__.n(app);

// EXTERNAL MODULE: external "next-seo"
var external_next_seo_ = __webpack_require__("efsx");

// EXTERNAL MODULE: external "next-redux-wrapper"
var external_next_redux_wrapper_ = __webpack_require__("JMOJ");
var external_next_redux_wrapper_default = /*#__PURE__*/__webpack_require__.n(external_next_redux_wrapper_);

// EXTERNAL MODULE: external "redux"
var external_redux_ = __webpack_require__("rKB8");

// EXTERNAL MODULE: external "redux-devtools-extension"
var external_redux_devtools_extension_ = __webpack_require__("ufKq");

// EXTERNAL MODULE: external "redux-thunk"
var external_redux_thunk_ = __webpack_require__("ZSx1");
var external_redux_thunk_default = /*#__PURE__*/__webpack_require__.n(external_redux_thunk_);

// EXTERNAL MODULE: ./store/actions/actiosMain.js
var actiosMain = __webpack_require__("WM9w");

// CONCATENATED MODULE: ./store/reducers/authReducer.js
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





const initState = {
  userData: null
};

const authReducer = (state = initState, action) => {
  if (action.type === actiosMain["a" /* USER_DATA_UPDATE */]) {
    return _objectSpread(_objectSpread({}, state), {}, {
      userData: action.payload
    });
  } else {
    return state;
  }
};

const initStore = (initialState = initState) => {
  return Object(external_redux_["createStore"])(authReducer, initialState, Object(external_redux_devtools_extension_["composeWithDevTools"])(Object(external_redux_["applyMiddleware"])(external_redux_thunk_default.a)));
};
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__("cDcd");
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);

// EXTERNAL MODULE: ./config/fire-conf.js
var fire_conf = __webpack_require__("m5h9");

// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__("4Q3z");

// CONCATENATED MODULE: ./components/Layouts/GetCurrentUser.js
var __jsx = external_react_default.a.createElement;






function GetCurrentUser() {
  const dispatch = Object(external_react_redux_["useDispatch"])();
  const router = Object(router_["useRouter"])();
  Object(external_react_["useEffect"])(() => {
    fire_conf["b" /* default */].auth().onAuthStateChanged(user => {
      if (user) {
        dispatch(Object(actiosMain["b" /* updateUserDataAction */])(user)); // if(router.pathname === "/"){
        //   router.push("/app/wallet/vionex-wallet");
        // }
      }
    });
  }, []);
  return __jsx(external_react_default.a.Fragment, null);
}

/* harmony default export */ var Layouts_GetCurrentUser = (GetCurrentUser);
// EXTERNAL MODULE: external "@material-ui/core/styles"
var styles_ = __webpack_require__("9Pu4");

// EXTERNAL MODULE: external "@material-ui/styles"
var external_material_ui_styles_ = __webpack_require__("Bjmp");

// EXTERNAL MODULE: external "next/head"
var head_ = __webpack_require__("xnum");
var head_default = /*#__PURE__*/__webpack_require__.n(head_);

// CONCATENATED MODULE: ./pages/_app.js
var _app_jsx = external_react_default.a.createElement;
 // or 'antd/dist/antd.less'



 // import "../static/css/bootstrap.min.css";











 // If you want to change the theme color you should comment out above line and uncomment the below line and change the color names from list

/*
 * brink-pink-style.css
 * pink-style.css
 * purple-style.css
 */



 // global css of docs container

 // tailwindcss













const theme = Object(styles_["createMuiTheme"])({
  palette: {
    primary: {
      main: "#f48665"
    },
    secondary: {
      main: "#44ce6f"
    }
  }
});
/* harmony default export */ var _app = __webpack_exports__["default"] = (external_next_redux_wrapper_default()(initStore)(class MyApp extends app_default.a {
  static async getInitialProps({
    Component,
    ctx
  }) {
    return {
      pageProps: Component.getInitialProps ? await Component.getInitialProps(ctx) : {}
    };
  }

  render() {
    const {
      Component,
      pageProps,
      store
    } = this.props;
    return _app_jsx(external_react_default.a.Fragment, null, _app_jsx(external_next_seo_["DefaultSeo"], {
      title: "Relysia - The Bitcoin database",
      description: "Relysia is a Bitcoin database, helping developers build robust applications on the blockchain.",
      openGraph: {
        type: "website",
        locale: "en_IE"
      }
    }), _app_jsx(head_default.a, null, _app_jsx("meta", {
      name: "viewport",
      content: "width=device-width, initial-scale=1, shrink-to-fit=no"
    })), _app_jsx(external_react_redux_["Provider"], {
      store: store
    }, _app_jsx(external_material_ui_styles_["ThemeProvider"], {
      theme: theme
    }, _app_jsx(Layouts_GetCurrentUser, null), _app_jsx(Component, pageProps))));
  }

}));

/***/ }),

/***/ "4Q3z":
/***/ (function(module, exports) {

module.exports = require("next/router");

/***/ }),

/***/ "8Bbg":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("B5Ud")


/***/ }),

/***/ "9Pu4":
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/styles");

/***/ }),

/***/ "AroE":
/***/ (function(module, exports) {

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

module.exports = _interopRequireDefault;

/***/ }),

/***/ "B5Ud":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("AroE");

exports.__esModule = true;
exports.Container = Container;
exports.createUrl = createUrl;
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__("cDcd"));

var _utils = __webpack_require__("kYf9");

exports.AppInitialProps = _utils.AppInitialProps;
exports.NextWebVitalsMetric = _utils.NextWebVitalsMetric;
/**
* `App` component is used for initialize of pages. It allows for overwriting and full control of the `page` initialization.
* This allows for keeping state between navigation, custom error handling, injecting additional data.
*/

async function appGetInitialProps({
  Component,
  ctx
}) {
  const pageProps = await (0, _utils.loadGetInitialProps)(Component, ctx);
  return {
    pageProps
  };
}

class App extends _react.default.Component {
  // Kept here for backwards compatibility.
  // When someone ended App they could call `super.componentDidCatch`.
  // @deprecated This method is no longer needed. Errors are caught at the top level
  componentDidCatch(error, _errorInfo) {
    throw error;
  }

  render() {
    const {
      router,
      Component,
      pageProps,
      __N_SSG,
      __N_SSP
    } = this.props;
    return /*#__PURE__*/_react.default.createElement(Component, Object.assign({}, pageProps, // we don't add the legacy URL prop if it's using non-legacy
    // methods like getStaticProps and getServerSideProps
    !(__N_SSG || __N_SSP) ? {
      url: createUrl(router)
    } : {}));
  }

}

exports.default = App;
App.origGetInitialProps = appGetInitialProps;
App.getInitialProps = appGetInitialProps;
let warnContainer;
let warnUrl;

if (false) {} // @deprecated noop for now until removal


function Container(p) {
  if (false) {}
  return p.children;
}

function createUrl(router) {
  // This is to make sure we don't references the router object at call time
  const {
    pathname,
    asPath,
    query
  } = router;
  return {
    get query() {
      if (false) {}
      return query;
    },

    get pathname() {
      if (false) {}
      return pathname;
    },

    get asPath() {
      if (false) {}
      return asPath;
    },

    back: () => {
      if (false) {}
      router.back();
    },
    push: (url, as) => {
      if (false) {}
      return router.push(url, as);
    },
    pushTo: (href, as) => {
      if (false) {}
      const pushRoute = as ? href : '';
      const pushUrl = as || href;
      return router.push(pushRoute, pushUrl);
    },
    replace: (url, as) => {
      if (false) {}
      return router.replace(url, as);
    },
    replaceTo: (href, as) => {
      if (false) {}
      const replaceRoute = as ? href : '';
      const replaceUrl = as || href;
      return router.replace(replaceRoute, replaceUrl);
    }
  };
}

/***/ }),

/***/ "Bjmp":
/***/ (function(module, exports) {

module.exports = require("@material-ui/styles");

/***/ }),

/***/ "GPYT":
/***/ (function(module, exports) {



/***/ }),

/***/ "HP2+":
/***/ (function(module, exports) {



/***/ }),

/***/ "IVv6":
/***/ (function(module, exports) {



/***/ }),

/***/ "IZgi":
/***/ (function(module, exports) {



/***/ }),

/***/ "Ih5T":
/***/ (function(module, exports) {



/***/ }),

/***/ "JMOJ":
/***/ (function(module, exports) {

module.exports = require("next-redux-wrapper");

/***/ }),

/***/ "Kzp6":
/***/ (function(module, exports) {



/***/ }),

/***/ "M7zN":
/***/ (function(module, exports) {

module.exports = require("firebase/analytics");

/***/ }),

/***/ "Nrac":
/***/ (function(module, exports) {



/***/ }),

/***/ "QAl9":
/***/ (function(module, exports) {



/***/ }),

/***/ "QYuT":
/***/ (function(module, exports) {



/***/ }),

/***/ "TpwP":
/***/ (function(module, exports) {



/***/ }),

/***/ "WM9w":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return USER_DATA_UPDATE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return updateUserDataAction; });
//Types should be in const to avoid typos and duplication since it's a string and could be easily miss spelled
const USER_DATA_UPDATE = "USER_DATA_UPDATE";
const updateUserDataAction = payload => {
  return {
    type: USER_DATA_UPDATE,
    payload
  };
};

/***/ }),

/***/ "WxOz":
/***/ (function(module, exports) {



/***/ }),

/***/ "Y9L4":
/***/ (function(module, exports) {



/***/ }),

/***/ "ZSx1":
/***/ (function(module, exports) {

module.exports = require("redux-thunk");

/***/ }),

/***/ "cDcd":
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "d1yk":
/***/ (function(module, exports) {



/***/ }),

/***/ "efsx":
/***/ (function(module, exports) {

module.exports = require("next-seo");

/***/ }),

/***/ "g/zC":
/***/ (function(module, exports) {



/***/ }),

/***/ "h74D":
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),

/***/ "ha8t":
/***/ (function(module, exports) {

module.exports = require("firebase/storage");

/***/ }),

/***/ "jDDT":
/***/ (function(module, exports) {



/***/ }),

/***/ "kI49":
/***/ (function(module, exports) {



/***/ }),

/***/ "kVbL":
/***/ (function(module, exports) {



/***/ }),

/***/ "kYf9":
/***/ (function(module, exports) {

module.exports = require("next/dist/next-server/lib/utils.js");

/***/ }),

/***/ "m5h9":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DB1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return tokensFirebaseStorage; });
/* harmony import */ var firebase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("pNaP");
/* harmony import */ var firebase__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(firebase__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var firebase_storage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("ha8t");
/* harmony import */ var firebase_storage__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(firebase_storage__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var firebase_analytics__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("M7zN");
/* harmony import */ var firebase_analytics__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(firebase_analytics__WEBPACK_IMPORTED_MODULE_2__);
// config/fire-config.js



const MODE = "DEV"; //DEV or PROD

const firebaseConfig = MODE === "DEV" ? {
  apiKey: "AIzaSyDiAjG-iuYAORff9qoaQQHVAaBzU49HViM",
  authDomain: "vaionexdev.firebaseapp.com",
  databaseURL: "https://wallet-vionex-dev.firebaseio.com/",
  projectId: "vaionexdev",
  storageBucket: "vaionexdev.appspot.com",
  messagingSenderId: "540169846332",
  appId: "1:540169846332:web:f3c5e00aa07b48d2db8d39",
  measurementId: "G-2SF16EW2KV"
} : {
  apiKey: "AIzaSyCGzjD8zb2yJzRi6W54FJvfj55CWu_36q4",
  authDomain: "hivedb-cdbf7.firebaseapp.com",
  databaseURL: "https://relysia-9e4c5.firebaseio.com/",
  projectId: "hivedb-cdbf7",
  storageBucket: "hivedb-cdbf7.appspot.com",
  messagingSenderId: "882176606224",
  appId: "1:882176606224:web:4b5a448b3bf607e1680a95",
  measurementId: "G-89Z5B2W3KM"
};
var db1Url = MODE === "DEV" ? "https://vaionexdev.firebaseio.com/" : "https://vaionexusers.firebaseio.com/";
var tokensFirebaseUrl = MODE === "DEV" ? "gs://wallettokens_vionex/" : "gs://relysia-cdbf8/";

try {
  firebase__WEBPACK_IMPORTED_MODULE_0___default.a.initializeApp(firebaseConfig);
} catch (err) {
  if (!/already exists/.test(err.message)) {
    console.error("Firebase initialization error", err.stack);
  }
}

const DB1 = firebase__WEBPACK_IMPORTED_MODULE_0___default.a.app().database(db1Url);
const tokensFirebaseStorage = firebase__WEBPACK_IMPORTED_MODULE_0___default.a.app().storage(tokensFirebaseUrl).ref();
const fire = firebase__WEBPACK_IMPORTED_MODULE_0___default.a;
/* harmony default export */ __webpack_exports__["b"] = (fire);

/***/ }),

/***/ "pNaP":
/***/ (function(module, exports) {

module.exports = require("firebase");

/***/ }),

/***/ "rKB8":
/***/ (function(module, exports) {

module.exports = require("redux");

/***/ }),

/***/ "uXJ4":
/***/ (function(module, exports) {



/***/ }),

/***/ "ufKq":
/***/ (function(module, exports) {

module.exports = require("redux-devtools-extension");

/***/ }),

/***/ "xnum":
/***/ (function(module, exports) {

module.exports = require("next/head");

/***/ })

/******/ });