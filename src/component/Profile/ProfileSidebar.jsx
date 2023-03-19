import classes from "./ProfileSidebar.module.css";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  RedoOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { USER_TAB_NAME } from "../../utils/constant";
const { Header, Content, Footer, Sider } = Layout;

function ProfileSidebar(props) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const itemsProperties = [
    {
      icon: ProfileOutlined,
      label: "User Infomation",
      tab: USER_TAB_NAME.userInformation,
    },
    {
      icon: RedoOutlined,
      label: "Change Password",
      tab: USER_TAB_NAME.changePassword,
    },
  ];
  const items = itemsProperties.map((item) => {
    return {
      key: item.tab,
      icon: React.createElement(item.icon),
      label: item.label,
      onClick: () => {
        props.onChangeTab(item.tab);
      },
    };
  });
  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={(broken) => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
      className={classes.sider}
    >
      <div className="logo" />
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={[USER_TAB_NAME.userInformation]}
        items={items}
      />
    </Sider>
  );
}

export default ProfileSidebar;
