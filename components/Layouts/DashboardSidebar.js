import React, { useState, useEffect } from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import {
  SettingOutlined,
  WalletOutlined,
  SwapOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import DashboardIcon from "@material-ui/icons/Dashboard";
import firebase from "../../config/fire-conf";
import { useRouter } from "next/router";
import Link from "next/link";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

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
            setwalletsData(recWalletsData);
            console.log("walletsData", recWalletsData);
          });
      }
    });
  }, []);

  useEffect(() => {
    if (router.pathname === "/app/dashboard") {
      setselectedKey(["1"]);
    } else if (router.pathname === "/app/settings") {
      setselectedKey(["6"]);
    } else if (router.pathname.includes("/app/wallet/")) {
      setselectedKey([router.query.walletId]);
    }
  }, []);

  useEffect(() => {
    if (matcheslg) {
      setcollapsed(false);
    } else {
      setcollapsed(true);
    }
  }, [matcheslg]);

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
          onCollapse={(e) => setcollapsed(e)}
          onMouseEnter={() => matchesmd && setcollapsed(false)}
          onMouseLeave={() => matchesmd && setcollapsed(true)}
        >
          <Menu theme="dark" selectedKeys={selectedKey} mode="inline">
            {!matchesmd && (
              <Menu.Item
                icon={!collapsed ? <LeftOutlined /> : <RightOutlined />}
                onClick={() => setcollapsed(!collapsed)}
              >
                <span
                  style={{
                    color: "#6e6e6e",
                    fontSize: 12,
                    position: "relative",
                    top: 2,
                  }}
                >
                  Navigation
                </span>
              </Menu.Item>
            )}{" "}
            <Menu.Item key="1" icon={<DashboardIcon />}>
              <Link href={`/app/dashboard`}>
                <a> Dashboard</a>
              </Link>
            </Menu.Item>
            <SubMenu
              key="sub1"
              icon={
                <WalletOutlined style={{ position: "relative", top: -2 }} />
              }
              title="Wallets"
              className="submeun-anchor"
            >
              {Object.values(walletsData).map((wallet_ele, wallet_index) => {
                return (
                  <Menu.Item
                    key={wallet_ele.id}
                    onClick={() =>
                      changeDBroute(
                        `/app/wallet/${wallet_ele.id}`,
                        wallet_ele.dbId
                      )
                    }
                  >
                    {wallet_ele.title}
                  </Menu.Item>
                );
              })}
            </SubMenu>
            <Menu.Item key="2" icon={<SwapOutlined />}>
              <Link href={`/app/zaps`}>
                <a>Zaps</a>
              </Link>
            </Menu.Item>
            <Menu.Item key="6" icon={<SettingOutlined />}>
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
    </section>
  );
}

export default DashboardSidebar;
