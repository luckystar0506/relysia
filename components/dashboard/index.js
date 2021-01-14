import React, { useState } from "react";
import * as Icon from "react-feather";
import Link from "../common/ActiveLink";
import ShowMoreText from "react-show-more-text";
import { route } from "next/dist/next-server/server/router";
import { useRouter } from "next/router";
import NewWalletDialog from "./newWalletDialog";
import { useDispatch, useSelector } from "react-redux";
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';

function DashboardPage(props) {
  const router = useRouter();
  const [newWalletDialogState, setnewWalletDialogState] = useState(false);

  const userDataRedux = useSelector((state) => state.userData);

  return (
    <>
      <section className="domain-search-area ptb-70">
        <div className="container">
          <div className="domain-search-content">
            <h2>Create your own workflow</h2>
            <form>
              <input
                type="text"
                className="form-control"
                name="domain-search"
                id="domain-search"
                placeholder="Search wallets here"
              />

              <button type="submit" style={{ marginLeft: "auto" }}>
                Search
              </button>
            </form>

            <ul
              className="domain-price dash-links"
              style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <li>
                <Link href={`/app/-`}>
                  <a>
                    Query
                    <br />
                    Transactions
                  </a>
                </Link>
              </li>

              <li>
                <Link href={`/app/api/-`}>
                  <a>
                    Api
                    <br />
                    Docs
                  </a>
                </Link>
              </li>

              <li>
                <Link href={`/app/settings`}>
                  <a>
                    Wallet
                    <br />
                    Settings
                  </a>
                </Link>
              </li>
              <li
                className="nav-item mobile-nav-only"
                style={{ flex: "none", marginLeft: 20 }}
              >
                <a
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    setnewWalletDialogState(true);
                  }}
                  className="btn btn-light"
                >
                  Create New Wallet
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="boxes-area" style={{ margin: 0 }}>
        <div className="container">
          {props.walletsData && Object.values(props.walletsData).length > 0 ? (
            <div className="row">
              {Object.values(props.walletsData).map((item, index) => {
                return (
                  <div className="col-lg-3 col-md-6" key={item.id+"_dashboard_wallet"}>
                    <div className="single-box bg-eb6b3d fix-height">
                      <div
                        className="icon"
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          router.push(`/app/databases/${item.id}`)
                        }
                      >
                        <AccountBalanceWalletIcon />
                      </div>
                      <h3
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          router.push(`/app/databases/${item.id}`)
                        }
                      >
                        {item.title}
                      </h3>
                      <p>
                        <ShowMoreText
                          lines={3}
                          more="more"
                          less="less"
                          anchorClass="anchor-more-class"
                          expanded={false}
                        >
                          {item.dollarBal}
                        </ShowMoreText>
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div style={{ textAlign: "center" }}>
              <p>Get start by creating a new Wallet</p>
            </div>
          )}
        </div>
      </section>

      <NewWalletDialog
        dialogState={newWalletDialogState}
        setdialogState={setnewWalletDialogState}
        userDataRedux={userDataRedux}
      />
    </>
  );
}

export default DashboardPage;
