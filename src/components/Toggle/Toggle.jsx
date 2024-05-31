/* eslint-disable react/prop-types */
import styles from "./toggle.module.scss";
function Toggle({ valueChecked, valueChange }) {
  return (
    <div
      onClick={valueChange}
      className={`${
        valueChecked ? styles["toggleActivate"] : styles["toggleNoActivate"]
      } ${styles["toggle"]}`}
    >
      <div
        className={`${
          valueChecked
            ? styles["toggle__circleRight"]
            : styles["toggle__circleLeft"]
        } ${styles["toggle__circle"]}`}
      ></div>
    </div>
  );
}

export default Toggle;
