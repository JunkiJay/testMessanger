/* eslint-disable react/prop-types */
import { themas } from "../../../../themas/themas";
import Blur from "../../Blur/Blur";
import styles from "./appearence.module.scss";
function Appearence({
  userThema,
  setUserThema,
  privacy,
  blurPassword,
  setBlurPassword,
  password,
  setPassword,
  setPrivacy,
}) {
  function handleUserThemaUpdate(thema) {
    setUserThema(thema);
  }
  return (
    <div className={styles["wrapper"]}>
      <div className={styles["appearence"]}>
        <div className={styles["appearence-content"]}>
          <h1 className={styles["appearence-content__title"]}>Appearence</h1>
          <h2 className={styles["appearence-content__bigText"]}>App Theme</h2>
          <div className={styles["themsList"]}>
            {Object.keys(themas).map((thema) => {
              return (
                <div
                  onClick={() => handleUserThemaUpdate(thema)}
                  key={`Тема ${thema}`}
                  className={`${
                    userThema.toLocaleLowerCase() == thema.toLocaleLowerCase()
                      ? styles["themsList-itemActive"]
                      : styles["themsList-item"]
                  }`}
                >
                  <img
                    alt={`Тема ${thema}`}
                    src={`./assets/themsPrev/${thema}.png`}
                    className={`${
                      userThema.toLocaleLowerCase() == thema.toLocaleLowerCase()
                        ? styles["themsList-itemActive__preview"]
                        : styles["themsList-item__preview"]
                    }`}
                  />
                  <h2
                    className={`${
                      userThema.toLocaleLowerCase() == thema.toLocaleLowerCase()
                        ? styles["themsList-itemActive__text"]
                        : styles["themsList-item__text"]
                    }`}
                  >
                    {thema}
                  </h2>
                </div>
              );
            })}
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

export default Appearence;
