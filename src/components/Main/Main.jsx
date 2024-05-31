/* eslint-disable react/prop-types */
import Appearence from "./Content/Appearence/Appearence";
import Password from "./Content/Password/Password";
import Messaging from "./Content/Messaging/Messaging";
import Notifications from "./Content/Notifications/Notifications";
import Profile from "./Content/Profile/Profile";
import Navigation from "./Navigation/Navigation";
import styles from "./main.module.scss";
import Chat from "./Content/Chat/Chat";
function Main({
  privacy,
  setPrivacy,
  openTab,
  setOpenTab,
  userInfo,
  setUserInfo,
  toggleState,
  setToggleState,
  userThema,
  setUserThema,
  search,
  setSearch,
  userOpen,
  setUserOpen,
  blurPassword,
  setBlurPassword,
  password,
  setPassword,
}) {
  const content = {
    Chat: (
      <Chat
        search={search}
        setSearch={setSearch}
        userOpen={userOpen}
        setUserOpen={setUserOpen}
        privacy={privacy}
        userInfo={userInfo}
        setUserInfo={setUserInfo}
        blurPassword={blurPassword}
        setBlurPassword={setBlurPassword}
        password={password}
        setPassword={setPassword}
        setPrivacy={setPrivacy}
        toggleState={toggleState}
      />
    ),
    Profile: (
      <Profile
        privacy={privacy}
        userInfo={userInfo}
        setUserInfo={setUserInfo}
        blurPassword={blurPassword}
        setBlurPassword={setBlurPassword}
        password={password}
        setPassword={setPassword}
        setPrivacy={setPrivacy}
      />
    ),
    Password: (
      <Password
        toggleState={toggleState}
        setToggleState={setToggleState}
        privacy={privacy}
        blurPassword={blurPassword}
        setBlurPassword={setBlurPassword}
        password={password}
        setPassword={setPassword}
        setPrivacy={setPrivacy}
      />
    ),
    Messaging: (
      <Messaging
        toggleState={toggleState}
        setToggleState={setToggleState}
        privacy={privacy}
        blurPassword={blurPassword}
        setBlurPassword={setBlurPassword}
        password={password}
        setPassword={setPassword}
        setPrivacy={setPrivacy}
      />
    ),
    Appearence: (
      <Appearence
        privacy={privacy}
        userThema={userThema}
        setUserThema={setUserThema}
        blurPassword={blurPassword}
        setBlurPassword={setBlurPassword}
        password={password}
        setPassword={setPassword}
        setPrivacy={setPrivacy}
      />
    ),
    Notifications: (
      <Notifications
        toggleState={toggleState}
        setToggleState={setToggleState}
        privacy={privacy}
        blurPassword={blurPassword}
        setBlurPassword={setBlurPassword}
        password={password}
        setPassword={setPassword}
        setPrivacy={setPrivacy}
      />
    ),
  };
  return (
    <div className={styles["wrapper"]}>
      <Navigation privacy={privacy} openTab={openTab} setOpenTab={setOpenTab} />
      {content[openTab]}
    </div>
  );
}

export default Main;
