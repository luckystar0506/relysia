/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import Dropdown from "react-bootstrap/Dropdown";

export default function PortletHeaderDropdown(props) {
  return (
    <Dropdown className="kt-portlet__head-toolbar" drop="down" alignRight>
      <Dropdown.Toggle
        variant="transparent"
        className="btn btn-label-success btn-sm btn-bold dropdown-toggle"
        id="dropdown-toggle-top"
      >
        Export
      </Dropdown.Toggle>
      <Dropdown.Menu className="dropdown-menu-fit dropdown-menu-right">
        <ul className="kt-nav">
          <li className="kt-nav__item">
            <div className="kt-nav__link">
            <i className="kt-nav__link-icon flaticon2-send" />
            {props.mnemonicBtn}
            </div>
          </li>
        </ul>
      </Dropdown.Menu>
    </Dropdown>
  );
}
