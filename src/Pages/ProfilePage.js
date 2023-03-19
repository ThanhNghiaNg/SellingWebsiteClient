import Profile from "../component/Profile/Profile";
import BannerFrame from "../component/Banner/BannerFrame";
import React from "react";
import Container from "../component/UI/Container";

function ProfilePage(props) {
  return (
    <Container>
      <BannerFrame pageName="Profile" />
      <Profile />
    </Container>
  );
}

export default ProfilePage;
