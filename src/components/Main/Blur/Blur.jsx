import { useState } from "react";
import styles from "./blur.module.scss";

function Blur({ blurPassword, setBlurPassword, password, setPrivacy }) {
  function handleUpdateBlurPassword(e) {
    setBlurPassword(e.target.value);
  }

  function handleChangePrivacy(e) {
    e.preventDefault();
    if (blurPassword === password.currentPassword) {
      setPrivacy(false);
    }
  }

  const [readyToWritePassword, setReadyToWritePassword] = useState(false);

  function handleUpdateReadyStatus() {
    setReadyToWritePassword(true);
  }

  return (
    <div onClick={handleUpdateReadyStatus} className={styles.wrapper}>
      <div className={styles.inputBlock}>
        {readyToWritePassword && (
          <img
            className={styles.inputBlock__nlo}
            src={"./assets/nlo/safe.png"}
            alt="safe"
          />
        )}
        {!readyToWritePassword && (
          <img
            className={styles.inputBlock__nlo}
            src={"./assets/nlo/bluer.png"}
            alt="bluer"
          />
        )}
        {readyToWritePassword && (
          <form
            className={styles.inputBlockButtons}
            onSubmit={(e) => handleChangePrivacy(e)}
          >
            <input
              type="password"
              onChange={(e) => handleUpdateBlurPassword(e)}
              placeholder="Password..."
              className={styles.inputBlock__input}
            />
            <button type="submit" className={styles.inputBlock__button}>
              Return
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Blur;
