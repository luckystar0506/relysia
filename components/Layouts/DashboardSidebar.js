import React, { useState, useEffect } from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import {
  SettingOutlined,
  WalletOutlined,
  SwapOutlined,
} from "@ant-design/icons";
import AddBoxIcon from "@material-ui/icons/AddBox";
import firebase from "../../config/fire-conf";
import { useRouter } from "next/router";
import Link from "next/link";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import NewWalletDialog from "./newWalletDialog";
import { useSelector } from "react-redux";
import TelegramIcon from "@material-ui/icons/Telegram";

const { Sider } = Layout;
const { SubMenu } = Menu;

function DashboardSidebar(props) {
  const router = useRouter();
  const theme = useTheme();
  const matchesmd = useMediaQuery(theme.breakpoints.down("md"));
  const matcheslg = useMediaQuery(theme.breakpoints.up("lg"));

  const [collapsed, setcollapsed] = useState(true);
  const [selectedKey, setselectedKey] = useState(["-1"]);
  const [walletsData, setwalletsData] = useState({});
  const [newWalletDialogState, setnewWalletDialogState] = useState(false);
  const userDataRedux = useSelector((state) => state.userData);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        router.push("/");
      } else {
        //getting user wallets
        firebase
          .database()
          .ref("userWallets/" + user.uid)
          .on("value", (snapshot) => {
            let recWalletsData = snapshot.val();
            console.log("recWalletsData", recWalletsData);
            setwalletsData(recWalletsData);
          });

        //update wallet balances
        updatebalances();
      }
    });
  }, []);

  const updatebalances = async () => {
    let walletListAPI = firebase.functions().httpsCallable("getWalletBalances");
    let res = await walletListAPI();
    console.log("res", res);
  };

  useEffect(() => {
    if (router.pathname === "/app/settings") {
      setselectedKey(["6"]);
    } else if (router.pathname.includes("/app/wallet/")) {
      setselectedKey([router.query.walletId]);
    }
  }, []);

  const changeDBroute = (route, walletId) => {
    setselectedKey([walletId]);
    router.push(route);
  };

  return (
    <section
      className="about-area ptb-80 more-top-padding"
      style={{ paddingBottom: 0 }}
    >
      <Layout
        style={{
          minHeight: "100vh",
          backgroundColor: "#ffffff",
          borderTop: "#eaeaea 0.7px solid",
        }}
      >
        <Sider
          collapsed={collapsed}
          // onCollapse={(e) => setcollapsed(e)}
        >
          <Menu theme="light" selectedKeys={selectedKey} mode="inline">
            {walletsData &&
              Object.values(walletsData).map((wallet_ele, wallet_index) => {
                return (
                  <Menu.Item
                    key={wallet_ele.id}
                    onClick={() =>
                      changeDBroute(
                        `/app/wallet/${wallet_ele.id}`,
                        wallet_ele.id
                      )
                    }
                    icon={
                      wallet_ele.walletLogo ? (
                        <div>
                          <img
                            className="sidebar-logo"
                            alt={wallet_ele.title}
                            src={wallet_ele.walletLogo}
                          />
                        </div>
                      ) : (
                        <WalletOutlined
                          style={{ color: "#ffffff !important" }}
                        />
                      )
                    }
                  >
                    {wallet_ele.title}
                  </Menu.Item>
                );
              })}
            <div className="sidebar-seperator"></div>
            <Menu.Item
              key="11"
              icon={<AddBoxIcon style={{ color: "#f48665" }} />}
            >
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setnewWalletDialogState(true);
                }}
              >
                Create New Wallet
              </a>
            </Menu.Item>
            <Menu.Item
              key="22"
              icon={<TelegramIcon style={{ color: "#f48665" }} />}
            >
              <Link href={`/app/stas-tokens`}>
                <a>Manage Stas Tokens</a>
              </Link>
            </Menu.Item>
            <Menu.Item
              key="2"
              icon={<SwapOutlined style={{ color: "#f48665" }} />}
            >
              <Link href={`/app/zaps`}>
                <a>Zaps</a>
              </Link>
            </Menu.Item>
            <Menu.Item
              key="6"
              icon={<SettingOutlined style={{ color: "#f48665" }} />}
            >
              <Link href={`/app/settings`}>
                <a>Settings</a>
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout" style={{ backgroundColor: "#ffffff" }}>
          {React.cloneElement(props.children, {
            walletsData: walletsData,
            setwalletsData: setwalletsData,
            currentWalletsData:
              walletsData &&
              router.query.walletId &&
              walletsData[router.query.walletId]
                ? walletsData[router.query.walletId]
                : null,
          })}
        </Layout>
      </Layout>
      <NewWalletDialog
        dialogState={newWalletDialogState}
        setdialogState={setnewWalletDialogState}
        userDataRedux={userDataRedux}
      />
    </section>
  );
}

export default DashboardSidebar;
