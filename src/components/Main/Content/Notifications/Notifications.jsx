/* eslint-disable react/prop-types */
import Toggle from "../../../Toggle/Toggle";
import Blur from "../../Blur/Blur";
import styles from "./notifications.module.scss";
function Notifications({
  privacy,
  toggleState,
  setToggleState,
  blurPassword,
  setBlurPassword,
  password,
  setPassword,
  setPrivacy,
}) {
  function handleChangeToggleState(e, valueKey) {
    setToggleState((prevToggleState) => ({
      ...prevToggleState,
      [valueKey]: !prevToggleState[valueKey],
    }));
  }
  return (
    <div className={styles["wrapper"]}>
      <div className={styles["notifications"]}>
        <div className={styles["notifications-content"]}>
          <h1 className={styles["notifications-content__title"]}>
            Notifications
          </h1>

          <div className={styles["toggleAndTexts"]}>
            <div className={styles["toggleAndText-item"]}>
              <h2 className={styles["toggleAndText-item__text"]}>
                Personal Chats
              </h2>
              <Toggle
                valueChecked={toggleState.personalChats}
                valueChange={(e) => handleChangeToggleState(e, "personalChats")}
                className={styles["toggleAndText-item__toggle"]}
              />
            </div>
            <div className={styles["toggleAndText-item"]}>
              <h2 className={styles["toggleAndText-item__text"]}>
                Group Chats
              </h2>
              <Toggle
                valueChecked={toggleState.groupChats}
                valueChange={(e) => handleChangeToggleState(e, "groupChats")}
                className={styles["toggleAndText-item__toggle"]}
              />
            </div>
            <div className={styles["toggleAndText-item"]}>
              <h2 className={styles["toggleAndText-item__text"]}>@Mentions</h2>
              <Toggle
                valueChecked={toggleState.mentions}
                valueChange={(e) => handleChangeToggleState(e, "mentions")}
                className={styles["toggleAndText-item__toggle"]}
              />
            </div>
            <div className={styles["toggleAndText-item"]}>
              <h2 className={styles["toggleAndText-item__text"]}>
                All Messages
              </h2>
              <Toggle
                valueChecked={toggleState.allMessages}
                valueChange={(e) => handleChangeToggleState(e, "allMessages")}
                className={styles["toggleAndText-item__toggle"]}
              />
            </div>
          </div>
        </div>
      </div>
      {privacy && (
        <Blur
          blurPassword={blurPassword}
          setBlurPassword={setBlurPassword}
          password={password}
          setPassword={setPassword}
          setPrivacy={setPrivacy}
        />
      )}
      ;
    </div>
  );
}

export default Notifications;
