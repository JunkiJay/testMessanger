/* eslint-disable react/prop-types */
import { useEffect } from "react";
import Toggle from "../../../Toggle/Toggle";
import Blur from "../../Blur/Blur";
import styles from "./messaging.module.scss";
function Messaging({
  toggleState,
  setToggleState,
  privacy,
  blurPassword,
  setBlurPassword,
  password,
  setPassword,
  setPrivacy,
}) {
  useEffect(() => {
    //запрос на бекенд для смены allow new contact
  }, [toggleState.allowNewContact]);

  function handleChangeToggleState(e, valueKey) {
    setToggleState((prevToggleState) => ({
      ...prevToggleState,
      [valueKey]: !prevToggleState[valueKey],
    }));
  }
  return (
    <div className={styles["wrapper"]}>
      <div className={styles["messaging"]}>
        <div className={styles["messaging-content"]}>
          <h1 className={styles["messaging-content__title"]}>Messaging</h1>
          <div className={styles["textAndToggle"]}>
            <h2 className={styles["textAndToggle__text"]}>Allow New Contact</h2>
            <Toggle
              valueChecked={toggleState.allowNewContact}
              valueChange={(e) => handleChangeToggleState(e, "allowNewContact")}
              className={styles["textAndToggle__toggle"]}
            />
          </div>
          <h2
            className={`${styles["textAndToggle__text"]} ${styles["textAndToggle__textBottom"]}`}
          >
            Website link previews
          </h2>
          <div className={styles["toggleAndTexts"]}>
            <div className={styles["toggleAndText-item"]}>
              <Toggle
                valueChecked={toggleState.alwaysAsk}
                valueChange={(e) => handleChangeToggleState(e, "alwaysAsk")}
                className={styles["toggleAndText-item__toggle"]}
              />
              <h2 className={styles["toggleAndText-item__text"]}>Always ask</h2>
            </div>
            <div className={styles["toggleAndText-item"]}>
              <Toggle
                valueChecked={toggleState.alwaysShowPreview}
                valueChange={(e) =>
                  handleChangeToggleState(e, "alwaysShowPreview")
                }
                className={styles["toggleAndText-item__toggle"]}
              />
              <h2 className={styles["toggleAndText-item__text"]}>
                Always show preview
              </h2>
            </div>
            <div className={styles["toggleAndText-item"]}>
              <Toggle
                valueChecked={toggleState.neverShowPreview}
                valueChange={(e) =>
                  handleChangeToggleState(e, "neverShowPreview")
                }
                className={styles["toggleAndText-item__toggle"]}
              />
              <h2 className={styles["toggleAndText-item__text"]}>
                Never show preview
              </h2>
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
    </div>
  );
}

export default Messaging;
