/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import KTOffcanvas from "../../../../_assets/js/offcanvas";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import IconButton from "@material-ui/core/IconButton";

class QuickPanelToggler extends React.Component {
  componentDidMount() {
    const panel = document.getElementById("kt_quick_panel");

    // eslint-disable-next-line
    const offCanvas = new KTOffcanvas(panel, {
      overlay: true,
      baseClass: "kt-quick-panel",
      closeBy: "kt_quick_panel_close_btn",
      toggleBy: "kt_quick_panel_toggler_btn",
    }); //
  }

  render() {
    return (
      <>
        <OverlayTrigger placement="bottom" overlay={<Tooltip id="quick-panel-tooltip">Quick panel</Tooltip>}>
          <div className="kt-header__topbar-item dropdown">
            <div className="kt-header__topbar-wrapper">
              <div id="kt_quick_panel_toggler_btn">
                <IconButton>
                  <AccountBalanceWalletIcon id="walletIconHeader" style={{ color: "#6c6e86" }} />
                </IconButton>
              </div>
            </div>
          </div>
        </OverlayTrigger>
      </>
    );
  }
}

export default QuickPanelToggler;
