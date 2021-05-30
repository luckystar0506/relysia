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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "../next-server/lib/utils":
/*!*****************************************************!*\
  !*** external "next/dist/next-server/lib/utils.js" ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("next/dist/next-server/lib/utils.js");

/***/ }),

/***/ "./components/Layouts/GetCurrentUser.js":
/*!**********************************************!*\
  !*** ./components/Layouts/GetCurrentUser.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "react-redux");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _store_actions_actiosMain__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../store/actions/actiosMain */ "./store/actions/actiosMain.js");
/* harmony import */ var _config_fire_conf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../config/fire-conf */ "./config/fire-conf.js");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! next/router */ "next/router");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_4__);
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;






function GetCurrentUser() {
  const dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useDispatch"])();
  const router = Object(next_router__WEBPACK_IMPORTED_MODULE_4__["useRouter"])();
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    _config_fire_conf__WEBPACK_IMPORTED_MODULE_3__["default"].auth().onAuthStateChanged(user => {
      if (user) {
        dispatch(Object(_store_actions_actiosMain__WEBPACK_IMPORTED_MODULE_2__["updateUserDataAction"])(user)); // if(router.pathname === "/"){
        //   router.push("/app/wallet/vionex-wallet");
        // }
      }
    });
  }, []);
  return __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null);
}

/* harmony default export */ __webpack_exports__["default"] = (GetCurrentUser);

/***/ }),

/***/ "./config/fire-conf.js":
/*!*****************************!*\
  !*** ./config/fire-conf.js ***!
  \*****************************/
/*! exports provided: DB1, tokensFirebaseStorage, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DB1", function() { return DB1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tokensFirebaseStorage", function() { return tokensFirebaseStorage; });
/* harmony import */ var firebase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! firebase */ "firebase");
/* harmony import */ var firebase__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(firebase__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var firebase_storage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! firebase/storage */ "firebase/storage");
/* harmony import */ var firebase_storage__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(firebase_storage__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var firebase_analytics__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! firebase/analytics */ "firebase/analytics");
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
/* harmony default export */ __webpack_exports__["default"] = (fire);

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/interopRequireDefault.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

module.exports = _interopRequireDefault;

/***/ }),

/***/ "./node_modules/antd/dist/antd.css":
/*!*****************************************!*\
  !*** ./node_modules/antd/dist/antd.css ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./node_modules/next/app.js":
/*!**********************************!*\
  !*** ./node_modules/next/app.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./dist/pages/_app */ "./node_modules/next/dist/pages/_app.js")


/***/ }),

/***/ "./node_modules/next/dist/pages/_app.js":
/*!**********************************************!*\
  !*** ./node_modules/next/dist/pages/_app.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

exports.__esModule = true;
exports.Container = Container;
exports.createUrl = createUrl;
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _utils = __webpack_require__(/*! ../next-server/lib/utils */ "../next-server/lib/utils");

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

if (true) {
  warnContainer = (0, _utils.execOnce)(() => {
    console.warn(`Warning: the \`Container\` in \`_app\` has been deprecated and should be removed. https://nextjs.org/docs/messages/app-container-deprecated`);
  });
  warnUrl = (0, _utils.execOnce)(() => {
    console.error(`Warning: the 'url' property is deprecated. https://nextjs.org/docs/messages/url-deprecated`);
  });
} // @deprecated noop for now until removal


function Container(p) {
  if (true) warnContainer();
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
      if (true) warnUrl();
      return query;
    },

    get pathname() {
      if (true) warnUrl();
      return pathname;
    },

    get asPath() {
      if (true) warnUrl();
      return asPath;
    },

    back: () => {
      if (true) warnUrl();
      router.back();
    },
    push: (url, as) => {
      if (true) warnUrl();
      return router.push(url, as);
    },
    pushTo: (href, as) => {
      if (true) warnUrl();
      const pushRoute = as ? href : '';
      const pushUrl = as || href;
      return router.push(pushRoute, pushUrl);
    },
    replace: (url, as) => {
      if (true) warnUrl();
      return router.replace(url, as);
    },
    replaceTo: (href, as) => {
      if (true) warnUrl();
      const replaceRoute = as ? href : '';
      const replaceUrl = as || href;
      return router.replace(replaceRoute, replaceUrl);
    }
  };
}

/***/ }),

/***/ "./node_modules/odometer/themes/odometer-theme-default.css":
/*!*****************************************************************!*\
  !*** ./node_modules/odometer/themes/odometer-theme-default.css ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./node_modules/react-accessible-accordion/dist/fancy-example.css":
/*!************************************************************************!*\
  !*** ./node_modules/react-accessible-accordion/dist/fancy-example.css ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./node_modules/react-bootstrap-country-select/dist/react-bootstrap-country-select.css":
/*!*********************************************************************************************!*\
  !*** ./node_modules/react-bootstrap-country-select/dist/react-bootstrap-country-select.css ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./node_modules/react-image-lightbox/style.css":
/*!*****************************************************!*\
  !*** ./node_modules/react-image-lightbox/style.css ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./node_modules/react-modal-video/css/modal-video.min.css":
/*!****************************************************************!*\
  !*** ./node_modules/react-modal-video/css/modal-video.min.css ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./node_modules/react-perfect-scrollbar/dist/css/styles.css":
/*!******************************************************************!*\
  !*** ./node_modules/react-perfect-scrollbar/dist/css/styles.css ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./node_modules/react-phone-number-input/style.css":
/*!*********************************************************!*\
  !*** ./node_modules/react-phone-number-input/style.css ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./node_modules/react-toastify/dist/ReactToastify.css":
/*!************************************************************!*\
  !*** ./node_modules/react-toastify/dist/ReactToastify.css ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./node_modules/vionex-pay-button/dist/index.css":
/*!*******************************************************!*\
  !*** ./node_modules/vionex-pay-button/dist/index.css ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./pages/_app.js":
/*!***********************!*\
  !*** ./pages/_app.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var antd_dist_antd_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! antd/dist/antd.css */ "./node_modules/antd/dist/antd.css");
/* harmony import */ var antd_dist_antd_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(antd_dist_antd_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_phone_number_input_style_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-phone-number-input/style.css */ "./node_modules/react-phone-number-input/style.css");
/* harmony import */ var react_phone_number_input_style_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_phone_number_input_style_css__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_bootstrap_country_select_dist_react_bootstrap_country_select_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-bootstrap-country-select/dist/react-bootstrap-country-select.css */ "./node_modules/react-bootstrap-country-select/dist/react-bootstrap-country-select.css");
/* harmony import */ var react_bootstrap_country_select_dist_react_bootstrap_country_select_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap_country_select_dist_react_bootstrap_country_select_css__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var vionex_pay_button_dist_index_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! vionex-pay-button/dist/index.css */ "./node_modules/vionex-pay-button/dist/index.css");
/* harmony import */ var vionex_pay_button_dist_index_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(vionex_pay_button_dist_index_css__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _static_css_bootstrap_min_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../static/css/bootstrap.min.css */ "./static/css/bootstrap.min.css");
/* harmony import */ var _static_css_bootstrap_min_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_static_css_bootstrap_min_css__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _static_css_slick_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../static/css/slick.css */ "./static/css/slick.css");
/* harmony import */ var _static_css_slick_css__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_static_css_slick_css__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _static_css_animate_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../static/css/animate.css */ "./static/css/animate.css");
/* harmony import */ var _static_css_animate_css__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_static_css_animate_css__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _static_css_flaticon_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../static/css/flaticon.css */ "./static/css/flaticon.css");
/* harmony import */ var _static_css_flaticon_css__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_static_css_flaticon_css__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _static_css_boxicons_min_css__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../static/css/boxicons.min.css */ "./static/css/boxicons.min.css");
/* harmony import */ var _static_css_boxicons_min_css__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_static_css_boxicons_min_css__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var odometer_themes_odometer_theme_default_css__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! odometer/themes/odometer-theme-default.css */ "./node_modules/odometer/themes/odometer-theme-default.css");
/* harmony import */ var odometer_themes_odometer_theme_default_css__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(odometer_themes_odometer_theme_default_css__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var react_toastify_dist_ReactToastify_css__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react-toastify/dist/ReactToastify.css */ "./node_modules/react-toastify/dist/ReactToastify.css");
/* harmony import */ var react_toastify_dist_ReactToastify_css__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(react_toastify_dist_ReactToastify_css__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var react_accessible_accordion_dist_fancy_example_css__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react-accessible-accordion/dist/fancy-example.css */ "./node_modules/react-accessible-accordion/dist/fancy-example.css");
/* harmony import */ var react_accessible_accordion_dist_fancy_example_css__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(react_accessible_accordion_dist_fancy_example_css__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _node_modules_react_modal_video_css_modal_video_min_css__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../node_modules/react-modal-video/css/modal-video.min.css */ "./node_modules/react-modal-video/css/modal-video.min.css");
/* harmony import */ var _node_modules_react_modal_video_css_modal_video_min_css__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_node_modules_react_modal_video_css_modal_video_min_css__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var react_image_lightbox_style_css__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! react-image-lightbox/style.css */ "./node_modules/react-image-lightbox/style.css");
/* harmony import */ var react_image_lightbox_style_css__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(react_image_lightbox_style_css__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _static_styles_style_css__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../static/styles/style.css */ "./static/styles/style.css");
/* harmony import */ var _static_styles_style_css__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_static_styles_style_css__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var react_perfect_scrollbar_dist_css_styles_css__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! react-perfect-scrollbar/dist/css/styles.css */ "./node_modules/react-perfect-scrollbar/dist/css/styles.css");
/* harmony import */ var react_perfect_scrollbar_dist_css_styles_css__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(react_perfect_scrollbar_dist_css_styles_css__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var _static_styles_brink_pink_style_css__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../static/styles/brink-pink-style.css */ "./static/styles/brink-pink-style.css");
/* harmony import */ var _static_styles_brink_pink_style_css__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(_static_styles_brink_pink_style_css__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var _static_css_responsive_css__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../static/css/responsive.css */ "./static/css/responsive.css");
/* harmony import */ var _static_css_responsive_css__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(_static_css_responsive_css__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var _static_css_custom_css__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../static/css/custom.css */ "./static/css/custom.css");
/* harmony import */ var _static_css_custom_css__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(_static_css_custom_css__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! react-redux */ "react-redux");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_19__);
/* harmony import */ var next_app__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! next/app */ "./node_modules/next/app.js");
/* harmony import */ var next_app__WEBPACK_IMPORTED_MODULE_20___default = /*#__PURE__*/__webpack_require__.n(next_app__WEBPACK_IMPORTED_MODULE_20__);
/* harmony import */ var next_seo__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! next-seo */ "next-seo");
/* harmony import */ var next_seo__WEBPACK_IMPORTED_MODULE_21___default = /*#__PURE__*/__webpack_require__.n(next_seo__WEBPACK_IMPORTED_MODULE_21__);
/* harmony import */ var next_redux_wrapper__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! next-redux-wrapper */ "next-redux-wrapper");
/* harmony import */ var next_redux_wrapper__WEBPACK_IMPORTED_MODULE_22___default = /*#__PURE__*/__webpack_require__.n(next_redux_wrapper__WEBPACK_IMPORTED_MODULE_22__);
/* harmony import */ var _store_reducers_authReducer__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ../store/reducers/authReducer */ "./store/reducers/authReducer.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_24___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_24__);
/* harmony import */ var _components_Layouts_GetCurrentUser__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ../components/Layouts/GetCurrentUser */ "./components/Layouts/GetCurrentUser.js");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! @material-ui/core/styles */ "@material-ui/core/styles");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_26___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_26__);
/* harmony import */ var _material_ui_styles__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! @material-ui/styles */ "@material-ui/styles");
/* harmony import */ var _material_ui_styles__WEBPACK_IMPORTED_MODULE_27___default = /*#__PURE__*/__webpack_require__.n(_material_ui_styles__WEBPACK_IMPORTED_MODULE_27__);
var _jsxFileName = "C:\\Users\\Robpre\\Vaionex\\Dev\\wallet\\pages\\_app.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_24___default.a.createElement;

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

 // or 'antd/dist/antd.less'















 // If you want to change the theme color you should comment out above line and uncomment the below line and change the color names from list

/*
 * brink-pink-style.css
 * pink-style.css
 * purple-style.css
 */













const theme = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_26__["createMuiTheme"])({
  palette: {
    primary: {
      main: "#f48665"
    },
    secondary: {
      main: "#44ce6f"
    }
  }
});
/* harmony default export */ __webpack_exports__["default"] = (next_redux_wrapper__WEBPACK_IMPORTED_MODULE_22___default()(_store_reducers_authReducer__WEBPACK_IMPORTED_MODULE_23__["initStore"])(class MyApp extends next_app__WEBPACK_IMPORTED_MODULE_20___default.a {
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
    return __jsx(react__WEBPACK_IMPORTED_MODULE_24___default.a.Fragment, null, __jsx(next_seo__WEBPACK_IMPORTED_MODULE_21__["DefaultSeo"], {
      title: "Relysia - The Bitcoin database",
      description: "Relysia is a Bitcoin database, helping developers build robust applications on the blockchain.",
      openGraph: {
        type: "website",
        locale: "en_IE"
      },
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 64,
        columnNumber: 11
      }
    }), __jsx(react_redux__WEBPACK_IMPORTED_MODULE_19__["Provider"], {
      store: store,
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 72,
        columnNumber: 11
      }
    }, __jsx(_material_ui_styles__WEBPACK_IMPORTED_MODULE_27__["ThemeProvider"], {
      theme: theme,
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 73,
        columnNumber: 13
      }
    }, __jsx(_components_Layouts_GetCurrentUser__WEBPACK_IMPORTED_MODULE_25__["default"], {
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 74,
        columnNumber: 15
      }
    }), __jsx(Component, _extends({}, pageProps, {
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 75,
        columnNumber: 15
      }
    })))));
  }

}));

/***/ }),

/***/ "./static/css/animate.css":
/*!********************************!*\
  !*** ./static/css/animate.css ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./static/css/bootstrap.min.css":
/*!**************************************!*\
  !*** ./static/css/bootstrap.min.css ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./static/css/boxicons.min.css":
/*!*************************************!*\
  !*** ./static/css/boxicons.min.css ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./static/css/custom.css":
/*!*******************************!*\
  !*** ./static/css/custom.css ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./static/css/flaticon.css":
/*!*********************************!*\
  !*** ./static/css/flaticon.css ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./static/css/responsive.css":
/*!***********************************!*\
  !*** ./static/css/responsive.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./static/css/slick.css":
/*!******************************!*\
  !*** ./static/css/slick.css ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./static/styles/brink-pink-style.css":
/*!********************************************!*\
  !*** ./static/styles/brink-pink-style.css ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./static/styles/style.css":
/*!*********************************!*\
  !*** ./static/styles/style.css ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./store/actions/actiosMain.js":
/*!*************************************!*\
  !*** ./store/actions/actiosMain.js ***!
  \*************************************/
/*! exports provided: USER_DATA_UPDATE, updateUserDataAction */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "USER_DATA_UPDATE", function() { return USER_DATA_UPDATE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateUserDataAction", function() { return updateUserDataAction; });
//Types should be in const to avoid typos and duplication since it's a string and could be easily miss spelled
const USER_DATA_UPDATE = "USER_DATA_UPDATE";
const updateUserDataAction = payload => {
  return {
    type: USER_DATA_UPDATE,
    payload
  };
};

/***/ }),

/***/ "./store/reducers/authReducer.js":
/*!***************************************!*\
  !*** ./store/reducers/authReducer.js ***!
  \***************************************/
/*! exports provided: initStore */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initStore", function() { return initStore; });
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux */ "redux");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(redux__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var redux_devtools_extension__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux-devtools-extension */ "redux-devtools-extension");
/* harmony import */ var redux_devtools_extension__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(redux_devtools_extension__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var redux_thunk__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux-thunk */ "redux-thunk");
/* harmony import */ var redux_thunk__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(redux_thunk__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _actions_actiosMain__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../actions/actiosMain */ "./store/actions/actiosMain.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





const initState = {
  userData: null
};

const authReducer = (state = initState, action) => {
  if (action.type === _actions_actiosMain__WEBPACK_IMPORTED_MODULE_3__["USER_DATA_UPDATE"]) {
    return _objectSpread(_objectSpread({}, state), {}, {
      userData: action.payload
    });
  } else {
    return state;
  }
};

const initStore = (initialState = initState) => {
  return Object(redux__WEBPACK_IMPORTED_MODULE_0__["createStore"])(authReducer, initialState, Object(redux_devtools_extension__WEBPACK_IMPORTED_MODULE_1__["composeWithDevTools"])(Object(redux__WEBPACK_IMPORTED_MODULE_0__["applyMiddleware"])(redux_thunk__WEBPACK_IMPORTED_MODULE_2___default.a)));
};

/***/ }),

/***/ 0:
/*!****************************************!*\
  !*** multi private-next-pages/_app.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! private-next-pages/_app.js */"./pages/_app.js");


/***/ }),

/***/ "@material-ui/core/styles":
/*!*******************************************!*\
  !*** external "@material-ui/core/styles" ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/styles");

/***/ }),

/***/ "@material-ui/styles":
/*!**************************************!*\
  !*** external "@material-ui/styles" ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/styles");

/***/ }),

/***/ "firebase":
/*!***************************!*\
  !*** external "firebase" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("firebase");

/***/ }),

/***/ "firebase/analytics":
/*!*************************************!*\
  !*** external "firebase/analytics" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("firebase/analytics");

/***/ }),

/***/ "firebase/storage":
/*!***********************************!*\
  !*** external "firebase/storage" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("firebase/storage");

/***/ }),

/***/ "next-redux-wrapper":
/*!*************************************!*\
  !*** external "next-redux-wrapper" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("next-redux-wrapper");

/***/ }),

/***/ "next-seo":
/*!***************************!*\
  !*** external "next-seo" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("next-seo");

/***/ }),

/***/ "next/router":
/*!******************************!*\
  !*** external "next/router" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("next/router");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "react-redux":
/*!******************************!*\
  !*** external "react-redux" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),

/***/ "redux":
/*!************************!*\
  !*** external "redux" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("redux");

/***/ }),

/***/ "redux-devtools-extension":
/*!*******************************************!*\
  !*** external "redux-devtools-extension" ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("redux-devtools-extension");

/***/ }),

/***/ "redux-thunk":
/*!******************************!*\
  !*** external "redux-thunk" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("redux-thunk");

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibmV4dC9kaXN0L25leHQtc2VydmVyL2xpYi91dGlscy5qc1wiIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvTGF5b3V0cy9HZXRDdXJyZW50VXNlci5qcyIsIndlYnBhY2s6Ly8vLi9jb25maWcvZmlyZS1jb25mLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2ludGVyb3BSZXF1aXJlRGVmYXVsdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbmV4dC9hcHAuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL3BhZ2VzL19hcHAudHN4Iiwid2VicGFjazovLy8uL3BhZ2VzL19hcHAuanMiLCJ3ZWJwYWNrOi8vLy4vc3RvcmUvYWN0aW9ucy9hY3Rpb3NNYWluLmpzIiwid2VicGFjazovLy8uL3N0b3JlL3JlZHVjZXJzL2F1dGhSZWR1Y2VyLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcIkBtYXRlcmlhbC11aS9jb3JlL3N0eWxlc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcIkBtYXRlcmlhbC11aS9zdHlsZXNcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJmaXJlYmFzZVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImZpcmViYXNlL2FuYWx5dGljc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImZpcmViYXNlL3N0b3JhZ2VcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJuZXh0LXJlZHV4LXdyYXBwZXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJuZXh0LXNlb1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm5leHQvcm91dGVyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3RcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdC1yZWR1eFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlZHV4XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVkdXgtZGV2dG9vbHMtZXh0ZW5zaW9uXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVkdXgtdGh1bmtcIiJdLCJuYW1lcyI6WyJHZXRDdXJyZW50VXNlciIsImRpc3BhdGNoIiwidXNlRGlzcGF0Y2giLCJyb3V0ZXIiLCJ1c2VSb3V0ZXIiLCJ1c2VFZmZlY3QiLCJmaXJlYmFzZSIsImF1dGgiLCJvbkF1dGhTdGF0ZUNoYW5nZWQiLCJ1c2VyIiwidXBkYXRlVXNlckRhdGFBY3Rpb24iLCJNT0RFIiwiZmlyZWJhc2VDb25maWciLCJhcGlLZXkiLCJhdXRoRG9tYWluIiwiZGF0YWJhc2VVUkwiLCJwcm9qZWN0SWQiLCJzdG9yYWdlQnVja2V0IiwibWVzc2FnaW5nU2VuZGVySWQiLCJhcHBJZCIsIm1lYXN1cmVtZW50SWQiLCJkYjFVcmwiLCJ0b2tlbnNGaXJlYmFzZVVybCIsImluaXRpYWxpemVBcHAiLCJlcnIiLCJ0ZXN0IiwibWVzc2FnZSIsImNvbnNvbGUiLCJlcnJvciIsInN0YWNrIiwiREIxIiwiYXBwIiwiZGF0YWJhc2UiLCJ0b2tlbnNGaXJlYmFzZVN0b3JhZ2UiLCJzdG9yYWdlIiwicmVmIiwiZmlyZSIsInBhZ2VQcm9wcyIsIlJlYWN0IiwiQ29tcG9uZW50IiwiY29tcG9uZW50RGlkQ2F0Y2giLCJyZW5kZXIiLCJfX05fU1NHIiwidXJsIiwiY3JlYXRlVXJsIiwiQXBwIiwib3JpZ0dldEluaXRpYWxQcm9wcyIsImFwcEdldEluaXRpYWxQcm9wcyIsImdldEluaXRpYWxQcm9wcyIsIndhcm5Db250YWluZXIiLCJ3YXJuVXJsIiwicCIsImJhY2siLCJwdXNoIiwicHVzaFRvIiwicHVzaFJvdXRlIiwiYXMiLCJwdXNoVXJsIiwicmVwbGFjZSIsInJlcGxhY2VUbyIsInJlcGxhY2VSb3V0ZSIsInJlcGxhY2VVcmwiLCJ0aGVtZSIsImNyZWF0ZU11aVRoZW1lIiwicGFsZXR0ZSIsInByaW1hcnkiLCJtYWluIiwic2Vjb25kYXJ5Iiwid2l0aFJlZHV4IiwiaW5pdFN0b3JlIiwiTXlBcHAiLCJjdHgiLCJzdG9yZSIsInByb3BzIiwidHlwZSIsImxvY2FsZSIsIlVTRVJfREFUQV9VUERBVEUiLCJwYXlsb2FkIiwiaW5pdFN0YXRlIiwidXNlckRhdGEiLCJhdXRoUmVkdWNlciIsInN0YXRlIiwiYWN0aW9uIiwiaW5pdGlhbFN0YXRlIiwiY3JlYXRlU3RvcmUiLCJjb21wb3NlV2l0aERldlRvb2xzIiwiYXBwbHlNaWRkbGV3YXJlIiwidGh1bmtNaWRkbGV3YXJlIl0sIm1hcHBpbmdzIjoiOztRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsSUFBSTtRQUNKO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7QUN4RkEsK0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFNBQVNBLGNBQVQsR0FBMEI7QUFDeEIsUUFBTUMsUUFBUSxHQUFHQywrREFBVyxFQUE1QjtBQUNBLFFBQU1D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Ozs7O0FDSFA7QUFDQTtBQUNBO0FBRUE7QUFFQSxNQUFNQyxTQUFTLEdBQUc7QUFDaEJDLFVBQVEsRUFBRTtBQURNLENBQWxCOztBQUlBLE1BQU1DLFdBQVcsR0FBRyxDQUFDQyxLQUFLLEdBQUdILFNBQVQsRUFBb0JJLE1BQXBCLEtBQStCO0FBQ2pELE1BQUlBLE1BQU0sQ0FBQ1IsSUFBUCxLQUFnQkUsb0VBQXBCLEVBQXNDO0FBQ3BDLDJDQUNLSyxLQURMO0FBRUVGLGNBQVEsRUFBRUcsTUFBTSxDQUFDTDtBQUZuQjtBQUlELEdBTEQsTUFLTztBQUNMLFdBQU9JLEtBQVA7QUFDRDtBQUNGLENBVEQ7O0FBV08sTUFBTVosU0FBUyxHQUFHLENBQUNjLFlBQVksR0FBR0wsU0FBaEIsS0FBOEI7QUFDckQsU0FBT00seURBQVcsQ0FDaEJKLFdBRGdCLEVBRWhCRyxZQUZnQixFQUdoQkUsb0ZBQW1CLENBQUNDLDZEQUFlLENBQUNDLGtEQUFELENBQWhCLENBSEgsQ0FBbEI7QUFLRCxDQU5NLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDckJQLHFEOzs7Ozs7Ozs7OztBQ0FBLGdEOzs7Ozs7Ozs7OztBQ0FBLHFDOzs7Ozs7Ozs7OztBQ0FBLCtDOzs7Ozs7Ozs7OztBQ0FBLDZDOzs7Ozs7Ozs7OztBQ0FBLCtDOzs7Ozs7Ozs7OztBQ0FBLHFDOzs7Ozs7Ozs7OztBQ0FBLHdDOzs7Ozs7Ozs7OztBQ0FBLGtDOzs7Ozs7Ozs7OztBQ0FBLHdDOzs7Ozs7Ozs7OztBQ0FBLGtDOzs7Ozs7Ozs7OztBQ0FBLHFEOzs7Ozs7Ozs7OztBQ0FBLHdDIiwiZmlsZSI6InBhZ2VzL19hcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHJlcXVpcmUoJy4uL3Nzci1tb2R1bGUtY2FjaGUuanMnKTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0dmFyIHRocmV3ID0gdHJ1ZTtcbiBcdFx0dHJ5IHtcbiBcdFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcbiBcdFx0XHR0aHJldyA9IGZhbHNlO1xuIFx0XHR9IGZpbmFsbHkge1xuIFx0XHRcdGlmKHRocmV3KSBkZWxldGUgaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdH1cblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJuZXh0L2Rpc3QvbmV4dC1zZXJ2ZXIvbGliL3V0aWxzLmpzXCIpOyIsImltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgdXNlRGlzcGF0Y2ggfSBmcm9tIFwicmVhY3QtcmVkdXhcIjtcclxuaW1wb3J0IHsgdXBkYXRlVXNlckRhdGFBY3Rpb24gfSBmcm9tIFwiLi4vLi4vc3RvcmUvYWN0aW9ucy9hY3Rpb3NNYWluXCI7XHJcbmltcG9ydCBmaXJlYmFzZSBmcm9tIFwiLi4vLi4vY29uZmlnL2ZpcmUtY29uZlwiO1xyXG5pbXBvcnQgeyB1c2VSb3V0ZXIgfSBmcm9tIFwibmV4dC9yb3V0ZXJcIjtcclxuXHJcbmZ1bmN0aW9uIEdldEN1cnJlbnRVc2VyKCkge1xyXG4gIGNvbnN0IGRpc3BhdGNoID0gdXNlRGlzcGF0Y2goKTtcclxuICBjb25zdCByb3V0ZXIgPSB1c2VSb3V0ZXIoKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGZpcmViYXNlLmF1dGgoKS5vbkF1dGhTdGF0ZUNoYW5nZWQoKHVzZXIpID0+IHtcclxuICAgICAgaWYgKHVzZXIpIHtcclxuICAgICAgICBkaXNwYXRjaCh1cGRhdGVVc2VyRGF0YUFjdGlvbih1c2VyKSk7XHJcbiAgICAgICAgLy8gaWYocm91dGVyLnBhdGhuYW1lID09PSBcIi9cIil7XHJcbiAgICAgICAgLy8gICByb3V0ZXIucHVzaChcIi9hcHAvd2FsbGV0L3Zpb25leC13YWxsZXRcIik7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9LCBbXSk7XHJcblxyXG4gIHJldHVybiA8PjwvPjtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgR2V0Q3VycmVudFVzZXI7XHJcbiIsIi8vIGNvbmZpZy9maXJlLWNvbmZpZy5qc1xyXG5pbXBvcnQgZmlyZWJhc2UgZnJvbSBcImZpcmViYXNlXCI7XHJcbmltcG9ydCBcImZpcmViYXNlL3N0b3JhZ2VcIjtcclxuaW1wb3J0IFwiZmlyZWJhc2UvYW5hbHl0aWNzXCI7XHJcbmNvbnN0IE1PREUgPSBcIkRFVlwiO1xyXG5cclxuLy9ERVYgb3IgUFJPRFxyXG5jb25zdCBmaXJlYmFzZUNvbmZpZyA9XHJcbiAgTU9ERSA9PT0gXCJERVZcIlxyXG4gICAgPyB7XHJcbiAgICAgICAgYXBpS2V5OiBcIkFJemFTeURpQWpHLWl1WUFPUmZmOXFvYVFRSFZBYUJ6VTQ5SFZpTVwiLFxyXG4gICAgICAgIGF1dGhEb21haW46IFwidmFpb25leGRldi5maXJlYmFzZWFwcC5jb21cIixcclxuICAgICAgICBkYXRhYmFzZVVSTDogXCJodHRwczovL3dhbGxldC12aW9uZXgtZGV2LmZpcmViYXNlaW8uY29tL1wiLFxyXG4gICAgICAgIHByb2plY3RJZDogXCJ2YWlvbmV4ZGV2XCIsXHJcbiAgICAgICAgc3RvcmFnZUJ1Y2tldDogXCJ2YWlvbmV4ZGV2LmFwcHNwb3QuY29tXCIsXHJcbiAgICAgICAgbWVzc2FnaW5nU2VuZGVySWQ6IFwiNTQwMTY5ODQ2MzMyXCIsXHJcbiAgICAgICAgYXBwSWQ6IFwiMTo1NDAxNjk4NDYzMzI6d2ViOmYzYzVlMDBhYTA3YjQ4ZDJkYjhkMzlcIixcclxuICAgICAgICBtZWFzdXJlbWVudElkOiBcIkctMlNGMTZFVzJLVlwiLFxyXG4gICAgICB9XHJcbiAgICA6IHtcclxuICAgICAgICBhcGlLZXk6IFwiQUl6YVN5Q0d6akQ4emIyeUp6Umk2VzU0Rkp2Zmo1NUNXdV8zNnE0XCIsXHJcbiAgICAgICAgYXV0aERvbWFpbjogXCJoaXZlZGItY2RiZjcuZmlyZWJhc2VhcHAuY29tXCIsXHJcbiAgICAgICAgZGF0YWJhc2VVUkw6IFwiaHR0cHM6Ly9yZWx5c2lhLTllNGM1LmZpcmViYXNlaW8uY29tL1wiLFxyXG4gICAgICAgIHByb2plY3RJZDogXCJoaXZlZGItY2RiZjdcIixcclxuICAgICAgICBzdG9yYWdlQnVja2V0OiBcImhpdmVkYi1jZGJmNy5hcHBzcG90LmNvbVwiLFxyXG4gICAgICAgIG1lc3NhZ2luZ1NlbmRlcklkOiBcIjg4MjE3NjYwNjIyNFwiLFxyXG4gICAgICAgIGFwcElkOiBcIjE6ODgyMTc2NjA2MjI0OndlYjo0YjVhNDQ4YjNiZjYwN2UxNjgwYTk1XCIsXHJcbiAgICAgICAgbWVhc3VyZW1lbnRJZDogXCJHLTg5WjVCMlczS01cIixcclxuICAgICAgfTtcclxudmFyIGRiMVVybCA9XHJcbiAgTU9ERSA9PT0gXCJERVZcIlxyXG4gICAgPyBcImh0dHBzOi8vdmFpb25leGRldi5maXJlYmFzZWlvLmNvbS9cIlxyXG4gICAgOiBcImh0dHBzOi8vdmFpb25leHVzZXJzLmZpcmViYXNlaW8uY29tL1wiO1xyXG5cclxudmFyIHRva2Vuc0ZpcmViYXNlVXJsID1cclxuICBNT0RFID09PSBcIkRFVlwiID8gXCJnczovL3dhbGxldHRva2Vuc192aW9uZXgvXCIgOiBcImdzOi8vcmVseXNpYS1jZGJmOC9cIjtcclxuXHJcbnRyeSB7XHJcbiAgZmlyZWJhc2UuaW5pdGlhbGl6ZUFwcChmaXJlYmFzZUNvbmZpZyk7XHJcbn0gY2F0Y2ggKGVycikge1xyXG4gIGlmICghL2FscmVhZHkgZXhpc3RzLy50ZXN0KGVyci5tZXNzYWdlKSkge1xyXG4gICAgY29uc29sZS5lcnJvcihcIkZpcmViYXNlIGluaXRpYWxpemF0aW9uIGVycm9yXCIsIGVyci5zdGFjayk7XHJcbiAgfVxyXG59XHJcbmV4cG9ydCBjb25zdCBEQjEgPSBmaXJlYmFzZS5hcHAoKS5kYXRhYmFzZShkYjFVcmwpO1xyXG5cclxuZXhwb3J0IGNvbnN0IHRva2Vuc0ZpcmViYXNlU3RvcmFnZSA9IGZpcmViYXNlXHJcbiAgLmFwcCgpXHJcbiAgLnN0b3JhZ2UodG9rZW5zRmlyZWJhc2VVcmwpXHJcbiAgLnJlZigpO1xyXG5cclxuY29uc3QgZmlyZSA9IGZpcmViYXNlO1xyXG5leHBvcnQgZGVmYXVsdCBmaXJlO1xyXG4iLCJmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikge1xuICByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDoge1xuICAgIFwiZGVmYXVsdFwiOiBvYmpcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0OyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9kaXN0L3BhZ2VzL19hcHAnKVxuIiwiaW1wb3J0IFJlYWN0LCB7IEVycm9ySW5mbyB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHtcbiAgZXhlY09uY2UsXG4gIGxvYWRHZXRJbml0aWFsUHJvcHMsXG4gIEFwcENvbnRleHRUeXBlLFxuICBBcHBJbml0aWFsUHJvcHMsXG4gIEFwcFByb3BzVHlwZSxcbiAgTmV4dFdlYlZpdGFsc01ldHJpYyxcbn0gZnJvbSAnLi4vbmV4dC1zZXJ2ZXIvbGliL3V0aWxzJ1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnLi4vY2xpZW50L3JvdXRlcidcblxuZXhwb3J0IHsgQXBwSW5pdGlhbFByb3BzIH1cblxuZXhwb3J0IHsgTmV4dFdlYlZpdGFsc01ldHJpYyB9XG5cbmV4cG9ydCB0eXBlIEFwcENvbnRleHQgPSBBcHBDb250ZXh0VHlwZTxSb3V0ZXI+XG5cbmV4cG9ydCB0eXBlIEFwcFByb3BzPFAgPSB7fT4gPSBBcHBQcm9wc1R5cGU8Um91dGVyLCBQPlxuXG4vKipcbiAqIGBBcHBgIGNvbXBvbmVudCBpcyB1c2VkIGZvciBpbml0aWFsaXplIG9mIHBhZ2VzLiBJdCBhbGxvd3MgZm9yIG92ZXJ3cml0aW5nIGFuZCBmdWxsIGNvbnRyb2wgb2YgdGhlIGBwYWdlYCBpbml0aWFsaXphdGlvbi5cbiAqIFRoaXMgYWxsb3dzIGZvciBrZWVwaW5nIHN0YXRlIGJldHdlZW4gbmF2aWdhdGlvbiwgY3VzdG9tIGVycm9yIGhhbmRsaW5nLCBpbmplY3RpbmcgYWRkaXRpb25hbCBkYXRhLlxuICovXG5hc3luYyBmdW5jdGlvbiBhcHBHZXRJbml0aWFsUHJvcHMoe1xuICBDb21wb25lbnQsXG4gIGN0eCxcbn06IEFwcENvbnRleHQpOiBQcm9taXNlPEFwcEluaXRpYWxQcm9wcz4ge1xuICBjb25zdCBwYWdlUHJvcHMgPSBhd2FpdCBsb2FkR2V0SW5pdGlhbFByb3BzKENvbXBvbmVudCwgY3R4KVxuICByZXR1cm4geyBwYWdlUHJvcHMgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcHA8UCA9IHt9LCBDUCA9IHt9LCBTID0ge30+IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PFxuICBQICYgQXBwUHJvcHM8Q1A+LFxuICBTXG4+IHtcbiAgc3RhdGljIG9yaWdHZXRJbml0aWFsUHJvcHMgPSBhcHBHZXRJbml0aWFsUHJvcHNcbiAgc3RhdGljIGdldEluaXRpYWxQcm9wcyA9IGFwcEdldEluaXRpYWxQcm9wc1xuXG4gIC8vIEtlcHQgaGVyZSBmb3IgYmFja3dhcmRzIGNvbXBhdGliaWxpdHkuXG4gIC8vIFdoZW4gc29tZW9uZSBlbmRlZCBBcHAgdGhleSBjb3VsZCBjYWxsIGBzdXBlci5jb21wb25lbnREaWRDYXRjaGAuXG4gIC8vIEBkZXByZWNhdGVkIFRoaXMgbWV0aG9kIGlzIG5vIGxvbmdlciBuZWVkZWQuIEVycm9ycyBhcmUgY2F1Z2h0IGF0IHRoZSB0b3AgbGV2ZWxcbiAgY29tcG9uZW50RGlkQ2F0Y2goZXJyb3I6IEVycm9yLCBfZXJyb3JJbmZvOiBFcnJvckluZm8pOiB2b2lkIHtcbiAgICB0aHJvdyBlcnJvclxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgcm91dGVyLCBDb21wb25lbnQsIHBhZ2VQcm9wcywgX19OX1NTRywgX19OX1NTUCB9ID0gdGhpc1xuICAgICAgLnByb3BzIGFzIEFwcFByb3BzPENQPlxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxDb21wb25lbnRcbiAgICAgICAgey4uLnBhZ2VQcm9wc31cbiAgICAgICAge1xuICAgICAgICAgIC8vIHdlIGRvbid0IGFkZCB0aGUgbGVnYWN5IFVSTCBwcm9wIGlmIGl0J3MgdXNpbmcgbm9uLWxlZ2FjeVxuICAgICAgICAgIC8vIG1ldGhvZHMgbGlrZSBnZXRTdGF0aWNQcm9wcyBhbmQgZ2V0U2VydmVyU2lkZVByb3BzXG4gICAgICAgICAgLi4uKCEoX19OX1NTRyB8fCBfX05fU1NQKSA/IHsgdXJsOiBjcmVhdGVVcmwocm91dGVyKSB9IDoge30pXG4gICAgICAgIH1cbiAgICAgIC8+XG4gICAgKVxuICB9XG59XG5cbmxldCB3YXJuQ29udGFpbmVyOiAoKSA9PiB2b2lkXG5sZXQgd2FyblVybDogKCkgPT4gdm9pZFxuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICB3YXJuQ29udGFpbmVyID0gZXhlY09uY2UoKCkgPT4ge1xuICAgIGNvbnNvbGUud2FybihcbiAgICAgIGBXYXJuaW5nOiB0aGUgXFxgQ29udGFpbmVyXFxgIGluIFxcYF9hcHBcXGAgaGFzIGJlZW4gZGVwcmVjYXRlZCBhbmQgc2hvdWxkIGJlIHJlbW92ZWQuIGh0dHBzOi8vbmV4dGpzLm9yZy9kb2NzL21lc3NhZ2VzL2FwcC1jb250YWluZXItZGVwcmVjYXRlZGBcbiAgICApXG4gIH0pXG5cbiAgd2FyblVybCA9IGV4ZWNPbmNlKCgpID0+IHtcbiAgICBjb25zb2xlLmVycm9yKFxuICAgICAgYFdhcm5pbmc6IHRoZSAndXJsJyBwcm9wZXJ0eSBpcyBkZXByZWNhdGVkLiBodHRwczovL25leHRqcy5vcmcvZG9jcy9tZXNzYWdlcy91cmwtZGVwcmVjYXRlZGBcbiAgICApXG4gIH0pXG59XG5cbi8vIEBkZXByZWNhdGVkIG5vb3AgZm9yIG5vdyB1bnRpbCByZW1vdmFsXG5leHBvcnQgZnVuY3Rpb24gQ29udGFpbmVyKHA6IGFueSkge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykgd2FybkNvbnRhaW5lcigpXG4gIHJldHVybiBwLmNoaWxkcmVuXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVVcmwocm91dGVyOiBSb3V0ZXIpIHtcbiAgLy8gVGhpcyBpcyB0byBtYWtlIHN1cmUgd2UgZG9uJ3QgcmVmZXJlbmNlcyB0aGUgcm91dGVyIG9iamVjdCBhdCBjYWxsIHRpbWVcbiAgY29uc3QgeyBwYXRobmFtZSwgYXNQYXRoLCBxdWVyeSB9ID0gcm91dGVyXG4gIHJldHVybiB7XG4gICAgZ2V0IHF1ZXJ5KCkge1xuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHdhcm5VcmwoKVxuICAgICAgcmV0dXJuIHF1ZXJ5XG4gICAgfSxcbiAgICBnZXQgcGF0aG5hbWUoKSB7XG4gICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykgd2FyblVybCgpXG4gICAgICByZXR1cm4gcGF0aG5hbWVcbiAgICB9LFxuICAgIGdldCBhc1BhdGgoKSB7XG4gICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykgd2FyblVybCgpXG4gICAgICByZXR1cm4gYXNQYXRoXG4gICAgfSxcbiAgICBiYWNrOiAoKSA9PiB7XG4gICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykgd2FyblVybCgpXG4gICAgICByb3V0ZXIuYmFjaygpXG4gICAgfSxcbiAgICBwdXNoOiAodXJsOiBzdHJpbmcsIGFzPzogc3RyaW5nKSA9PiB7XG4gICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykgd2FyblVybCgpXG4gICAgICByZXR1cm4gcm91dGVyLnB1c2godXJsLCBhcylcbiAgICB9LFxuICAgIHB1c2hUbzogKGhyZWY6IHN0cmluZywgYXM/OiBzdHJpbmcpID0+IHtcbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB3YXJuVXJsKClcbiAgICAgIGNvbnN0IHB1c2hSb3V0ZSA9IGFzID8gaHJlZiA6ICcnXG4gICAgICBjb25zdCBwdXNoVXJsID0gYXMgfHwgaHJlZlxuXG4gICAgICByZXR1cm4gcm91dGVyLnB1c2gocHVzaFJvdXRlLCBwdXNoVXJsKVxuICAgIH0sXG4gICAgcmVwbGFjZTogKHVybDogc3RyaW5nLCBhcz86IHN0cmluZykgPT4ge1xuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHdhcm5VcmwoKVxuICAgICAgcmV0dXJuIHJvdXRlci5yZXBsYWNlKHVybCwgYXMpXG4gICAgfSxcbiAgICByZXBsYWNlVG86IChocmVmOiBzdHJpbmcsIGFzPzogc3RyaW5nKSA9PiB7XG4gICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykgd2FyblVybCgpXG4gICAgICBjb25zdCByZXBsYWNlUm91dGUgPSBhcyA/IGhyZWYgOiAnJ1xuICAgICAgY29uc3QgcmVwbGFjZVVybCA9IGFzIHx8IGhyZWZcblxuICAgICAgcmV0dXJuIHJvdXRlci5yZXBsYWNlKHJlcGxhY2VSb3V0ZSwgcmVwbGFjZVVybClcbiAgICB9LFxuICB9XG59XG4iLCJpbXBvcnQgXCJhbnRkL2Rpc3QvYW50ZC5jc3NcIjsgLy8gb3IgJ2FudGQvZGlzdC9hbnRkLmxlc3MnXHJcbmltcG9ydCBcInJlYWN0LXBob25lLW51bWJlci1pbnB1dC9zdHlsZS5jc3NcIjtcclxuaW1wb3J0IFwicmVhY3QtYm9vdHN0cmFwLWNvdW50cnktc2VsZWN0L2Rpc3QvcmVhY3QtYm9vdHN0cmFwLWNvdW50cnktc2VsZWN0LmNzc1wiO1xyXG5cclxuaW1wb3J0IFwidmlvbmV4LXBheS1idXR0b24vZGlzdC9pbmRleC5jc3NcIjtcclxuaW1wb3J0IFwiLi4vc3RhdGljL2Nzcy9ib290c3RyYXAubWluLmNzc1wiO1xyXG5pbXBvcnQgXCIuLi9zdGF0aWMvY3NzL3NsaWNrLmNzc1wiO1xyXG5pbXBvcnQgXCIuLi9zdGF0aWMvY3NzL2FuaW1hdGUuY3NzXCI7XHJcbmltcG9ydCBcIi4uL3N0YXRpYy9jc3MvZmxhdGljb24uY3NzXCI7XHJcbmltcG9ydCBcIi4uL3N0YXRpYy9jc3MvYm94aWNvbnMubWluLmNzc1wiO1xyXG5pbXBvcnQgXCJvZG9tZXRlci90aGVtZXMvb2RvbWV0ZXItdGhlbWUtZGVmYXVsdC5jc3NcIjtcclxuaW1wb3J0IFwicmVhY3QtdG9hc3RpZnkvZGlzdC9SZWFjdFRvYXN0aWZ5LmNzc1wiO1xyXG5pbXBvcnQgXCJyZWFjdC1hY2Nlc3NpYmxlLWFjY29yZGlvbi9kaXN0L2ZhbmN5LWV4YW1wbGUuY3NzXCI7XHJcbmltcG9ydCBcIi4uL25vZGVfbW9kdWxlcy9yZWFjdC1tb2RhbC12aWRlby9jc3MvbW9kYWwtdmlkZW8ubWluLmNzc1wiO1xyXG5pbXBvcnQgXCJyZWFjdC1pbWFnZS1saWdodGJveC9zdHlsZS5jc3NcIjtcclxuaW1wb3J0IFwiLi4vc3RhdGljL3N0eWxlcy9zdHlsZS5jc3NcIjtcclxuaW1wb3J0IFwicmVhY3QtcGVyZmVjdC1zY3JvbGxiYXIvZGlzdC9jc3Mvc3R5bGVzLmNzc1wiO1xyXG5cclxuLy8gSWYgeW91IHdhbnQgdG8gY2hhbmdlIHRoZSB0aGVtZSBjb2xvciB5b3Ugc2hvdWxkIGNvbW1lbnQgb3V0IGFib3ZlIGxpbmUgYW5kIHVuY29tbWVudCB0aGUgYmVsb3cgbGluZSBhbmQgY2hhbmdlIHRoZSBjb2xvciBuYW1lcyBmcm9tIGxpc3RcclxuLypcclxuICogYnJpbmstcGluay1zdHlsZS5jc3NcclxuICogcGluay1zdHlsZS5jc3NcclxuICogcHVycGxlLXN0eWxlLmNzc1xyXG4gKi9cclxuaW1wb3J0IFwiLi4vc3RhdGljL3N0eWxlcy9icmluay1waW5rLXN0eWxlLmNzc1wiO1xyXG5pbXBvcnQgXCIuLi9zdGF0aWMvY3NzL3Jlc3BvbnNpdmUuY3NzXCI7XHJcbmltcG9ydCBcIi4uL3N0YXRpYy9jc3MvY3VzdG9tLmNzc1wiO1xyXG5cclxuaW1wb3J0IHsgUHJvdmlkZXIgfSBmcm9tIFwicmVhY3QtcmVkdXhcIjtcclxuaW1wb3J0IEFwcCBmcm9tIFwibmV4dC9hcHBcIjtcclxuaW1wb3J0IHsgRGVmYXVsdFNlbyB9IGZyb20gXCJuZXh0LXNlb1wiO1xyXG5pbXBvcnQgd2l0aFJlZHV4IGZyb20gXCJuZXh0LXJlZHV4LXdyYXBwZXJcIjtcclxuaW1wb3J0IHsgaW5pdFN0b3JlIH0gZnJvbSBcIi4uL3N0b3JlL3JlZHVjZXJzL2F1dGhSZWR1Y2VyXCI7XHJcbmltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IEdldEN1cnJlbnRVc2VyIGZyb20gXCIuLi9jb21wb25lbnRzL0xheW91dHMvR2V0Q3VycmVudFVzZXJcIjtcclxuaW1wb3J0IHsgY3JlYXRlTXVpVGhlbWUgfSBmcm9tIFwiQG1hdGVyaWFsLXVpL2NvcmUvc3R5bGVzXCI7XHJcbmltcG9ydCB7IFRoZW1lUHJvdmlkZXIgfSBmcm9tIFwiQG1hdGVyaWFsLXVpL3N0eWxlc1wiO1xyXG5cclxuY29uc3QgdGhlbWUgPSBjcmVhdGVNdWlUaGVtZSh7XHJcbiAgcGFsZXR0ZToge1xyXG4gICAgcHJpbWFyeToge1xyXG4gICAgICBtYWluOiBcIiNmNDg2NjVcIixcclxuICAgIH0sXHJcbiAgICBzZWNvbmRhcnk6IHtcclxuICAgICAgbWFpbjogXCIjNDRjZTZmXCIsXHJcbiAgICB9LFxyXG4gIH0sXHJcbn0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgd2l0aFJlZHV4KGluaXRTdG9yZSkoXHJcbiAgY2xhc3MgTXlBcHAgZXh0ZW5kcyBBcHAge1xyXG4gICAgc3RhdGljIGFzeW5jIGdldEluaXRpYWxQcm9wcyh7IENvbXBvbmVudCwgY3R4IH0pIHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBwYWdlUHJvcHM6IENvbXBvbmVudC5nZXRJbml0aWFsUHJvcHNcclxuICAgICAgICAgID8gYXdhaXQgQ29tcG9uZW50LmdldEluaXRpYWxQcm9wcyhjdHgpXHJcbiAgICAgICAgICA6IHt9LFxyXG4gICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgY29uc3QgeyBDb21wb25lbnQsIHBhZ2VQcm9wcywgc3RvcmUgfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgIHJldHVybiAoXHJcbiAgICAgICAgPD5cclxuICAgICAgICAgIDxEZWZhdWx0U2VvXHJcbiAgICAgICAgICAgIHRpdGxlPVwiUmVseXNpYSAtIFRoZSBCaXRjb2luIGRhdGFiYXNlXCJcclxuICAgICAgICAgICAgZGVzY3JpcHRpb249XCJSZWx5c2lhIGlzIGEgQml0Y29pbiBkYXRhYmFzZSwgaGVscGluZyBkZXZlbG9wZXJzIGJ1aWxkIHJvYnVzdCBhcHBsaWNhdGlvbnMgb24gdGhlIGJsb2NrY2hhaW4uXCJcclxuICAgICAgICAgICAgb3BlbkdyYXBoPXt7XHJcbiAgICAgICAgICAgICAgdHlwZTogXCJ3ZWJzaXRlXCIsXHJcbiAgICAgICAgICAgICAgbG9jYWxlOiBcImVuX0lFXCIsXHJcbiAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgICAgPFByb3ZpZGVyIHN0b3JlPXtzdG9yZX0+XHJcbiAgICAgICAgICAgIDxUaGVtZVByb3ZpZGVyIHRoZW1lPXt0aGVtZX0+XHJcbiAgICAgICAgICAgICAgPEdldEN1cnJlbnRVc2VyIC8+XHJcbiAgICAgICAgICAgICAgPENvbXBvbmVudCB7Li4ucGFnZVByb3BzfSAvPlxyXG4gICAgICAgICAgICA8L1RoZW1lUHJvdmlkZXI+XHJcbiAgICAgICAgICA8L1Byb3ZpZGVyPlxyXG4gICAgICAgIDwvPlxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxuKTtcclxuIiwiLy9UeXBlcyBzaG91bGQgYmUgaW4gY29uc3QgdG8gYXZvaWQgdHlwb3MgYW5kIGR1cGxpY2F0aW9uIHNpbmNlIGl0J3MgYSBzdHJpbmcgYW5kIGNvdWxkIGJlIGVhc2lseSBtaXNzIHNwZWxsZWRcclxuZXhwb3J0IGNvbnN0IFVTRVJfREFUQV9VUERBVEUgPSBcIlVTRVJfREFUQV9VUERBVEVcIjtcclxuXHJcbmV4cG9ydCBjb25zdCB1cGRhdGVVc2VyRGF0YUFjdGlvbiA9IChwYXlsb2FkKSA9PiB7XHJcbiAgcmV0dXJuIHtcclxuICAgIHR5cGU6IFVTRVJfREFUQV9VUERBVEUsXHJcbiAgICBwYXlsb2FkLFxyXG4gIH07XHJcbn07XHJcblxyXG5cclxuICAiLCJpbXBvcnQgeyBjcmVhdGVTdG9yZSwgYXBwbHlNaWRkbGV3YXJlIH0gZnJvbSBcInJlZHV4XCI7XHJcbmltcG9ydCB7IGNvbXBvc2VXaXRoRGV2VG9vbHMgfSBmcm9tIFwicmVkdXgtZGV2dG9vbHMtZXh0ZW5zaW9uXCI7XHJcbmltcG9ydCB0aHVua01pZGRsZXdhcmUgZnJvbSBcInJlZHV4LXRodW5rXCI7XHJcblxyXG5pbXBvcnQgeyBVU0VSX0RBVEFfVVBEQVRFIH0gZnJvbSBcIi4uL2FjdGlvbnMvYWN0aW9zTWFpblwiO1xyXG5cclxuY29uc3QgaW5pdFN0YXRlID0ge1xyXG4gIHVzZXJEYXRhOiBudWxsLFxyXG59O1xyXG5cclxuY29uc3QgYXV0aFJlZHVjZXIgPSAoc3RhdGUgPSBpbml0U3RhdGUsIGFjdGlvbikgPT4ge1xyXG4gIGlmIChhY3Rpb24udHlwZSA9PT0gVVNFUl9EQVRBX1VQREFURSkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgLi4uc3RhdGUsXHJcbiAgICAgIHVzZXJEYXRhOiBhY3Rpb24ucGF5bG9hZCxcclxuICAgIH07XHJcbiAgfSBlbHNlIHtcclxuICAgIHJldHVybiBzdGF0ZTtcclxuICB9XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgaW5pdFN0b3JlID0gKGluaXRpYWxTdGF0ZSA9IGluaXRTdGF0ZSkgPT4ge1xyXG4gIHJldHVybiBjcmVhdGVTdG9yZShcclxuICAgIGF1dGhSZWR1Y2VyLFxyXG4gICAgaW5pdGlhbFN0YXRlLFxyXG4gICAgY29tcG9zZVdpdGhEZXZUb29scyhhcHBseU1pZGRsZXdhcmUodGh1bmtNaWRkbGV3YXJlKSlcclxuICApO1xyXG59O1xyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJAbWF0ZXJpYWwtdWkvY29yZS9zdHlsZXNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQG1hdGVyaWFsLXVpL3N0eWxlc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJmaXJlYmFzZVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJmaXJlYmFzZS9hbmFseXRpY3NcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZmlyZWJhc2Uvc3RvcmFnZVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJuZXh0LXJlZHV4LXdyYXBwZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibmV4dC1zZW9cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibmV4dC9yb3V0ZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3RcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3QtcmVkdXhcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVkdXhcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVkdXgtZGV2dG9vbHMtZXh0ZW5zaW9uXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlZHV4LXRodW5rXCIpOyJdLCJzb3VyY2VSb290IjoiIn0=