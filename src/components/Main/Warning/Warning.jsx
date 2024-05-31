/* eslint-disable react/prop-types */
import styles from "./warning.module.scss";
function Warning({ warning, setWarning }) {
  function handleClickNo() {
    setWarning((prevInfo) => ({ ...prevInfo, state: false }));
  }
  function handleClickYes() {
    window.open(warning.link, "_blank");
    setWarning((prevInfo) => ({ ...prevInfo, state: false }));
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.warning}>
        <img className={styles.warning__nlo} src="./assets/nlo/warning.png" />
        <h2 className={styles.warning__text}>Open?</h2>
        <span className={styles.warning__link}>
          {warning.link.slice(0, 40)}
        </span>
        <div className={styles["warning-buttons"]}>
          <button
            onClick={handleClickYes}
            className={styles["warning-buttons__button"]}
          >
            Yes
          </button>
          <button
            onClick={handleClickNo}
            className={styles["warning-buttons__button"]}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}

export default Warning;
