import classes from "./Profile.module.css";
import UserInfo from "./UserInfo";
import UserPassword from "./UserPassword";
import ProfileSidebar from "./ProfileSidebar";
import React, { useEffect, useState } from "react";
import { USER_TAB_NAME } from "../../utils/constant";
import { Layout } from "antd";

function Profile(props) {
  const [tab, setTab] = useState(USER_TAB_NAME.userInformation);
  const changeTabSideBarHandler = (tab) => {
    setTab(tab);
  };
  console.log(tab);
  return (
    <Layout>
      <ProfileSidebar onChangeTab={changeTabSideBarHandler} />
      <Layout>
        {tab === USER_TAB_NAME.userInformation && <UserInfo />}
        {tab === USER_TAB_NAME.changePassword && <UserPassword />}
      </Layout>
    </Layout>
  );
}

export default Profile;
