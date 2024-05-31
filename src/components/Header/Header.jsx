import { RiArrowLeftFill } from "react-icons/ri";
import { themas } from "../../themas/themas";
import styles from "./header.module.scss";
import { useTonConnectUI } from '@tonconnect/ui-react';

// eslint-disable-next-line react/prop-types
function Header({ privacy, setPrivacy, userThema, openTab, setOpenTab }) {
  const [tonConnectUI, setOptions] = useTonConnectUI();

  const walletInfo = {
    tonValue: "200.65",
    usdtValue: "1304.22",
    profit: 0.24,
  };
  function handleChangePrivacy() {
    setPrivacy(true);
  }
  function handleGoToChat() {
    setOpenTab("Chat");
  }
  return (
    <div
      className={styles["wrapper"]}
      style={
        ({ "--colour1": themas[userThema]["color1"] },
        { "--colour2": themas[userThema]["color2"] },
        { "--colour3": themas[userThema]["color3"] },
        { "--colour4": themas[userThema]["color4"] },
        { "--colour5": themas[userThema]["color5"] },
        { "--colour6": themas[userThema]["color6"] },
        { "--colour7": themas[userThema]["color7"] })
      }
    >
      <div className={styles["header"]}>
        {" "}
        <div>
          {openTab != "Chat" && (
            <RiArrowLeftFill
              onClick={handleGoToChat}
              className={styles["header__arrow"]}
            />
          )}
          <a href="">
            <img
              className={styles["header__logo"]}
              alt="logo"
              src={"./assets/logo.png"}
            />
          </a>
        </div>
        <div className={styles["header-walletInfo"]}>
          <img
            className={styles["walletInfo__logo"]}
            alt="walletLogo"
            src={tonConnectUI.wallet?.imageUrl}
            // src="./assets/wallets/logo.png"
          />
          <h3 className={styles["walletInfo__text"]}>{tonConnectUI.wallet?.appName}</h3>
          {/* <h3 className={styles["walletInfo__text"]}>Wallet</h3> */}
          <h3 className={styles["walletInfo__ton"]}>{walletInfo.tonValue} TON</h3>
          <h3 className={styles["walletInfo__usdt"]}>
            {walletInfo.usdtValue} USDT
            {/* <span
              className={`${
                walletInfo.profit > 0
                  ? styles["walletInfo__usdt-profit"]
                  : styles["walletInfo__usdt-lesion"]
              }`}
            >
              {walletInfo.profit > 0 && "+"}
              {walletInfo.profit}%
            </span> */}
          </h3>
        </div>
        <div className={styles["header-privacy"]} onClick={handleChangePrivacy}>
          <div className={styles["privacy__bg"]}></div>
          <img
            src={
              privacy ? "./assets/castleClosed.png" : "./assets/castleOpen.png"
            }
            className={
              privacy
                ? `${styles["privacy__castleOpen"]} ${styles["privacy__castle"]}`
                : `${styles["privacy__castleClosed"]} ${styles["privacy__castle"]}`
            }
          />
        </div>
      </div>
    </div>
  );
}

export default Header;
