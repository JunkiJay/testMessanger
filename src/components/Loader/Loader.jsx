import styles from "./loader.module.scss";
function Loader() {
  return (
    <div className={styles.wrapper}>
      <img src="./assets/loader.png" className={styles.loader} />
    </div>
  );
}

export default Loader;
