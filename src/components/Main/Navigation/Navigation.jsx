/* eslint-disable react/prop-types */
import styles from "./navigation.module.scss";
function Navigation({ privacy, openTab, setOpenTab }) {
  function handleChangeOpenTab(newTab) {
    setOpenTab(newTab);
  }
  const tabs = [
    { tabName: "Profile", iconName: "Profile.png" },
    { tabName: "Password", iconName: "Password.png" },
    { tabName: "Messaging", iconName: "Messaging.png" },
    { tabName: "Appearence", iconName: "Appearence.png" },
    { tabName: "Notifications", iconName: "Notifications.png" },
  ];
  return (
    <div
      className={`${styles["navigation"]} ${
        privacy ? styles["navigation__close"] : styles["navigation__close"]
      }`}
    >
      <div className={styles["navigation-list"]}>
        {tabs.map((tab) => {
          return (
            <div
              key={`tab ${tab.tabName}`}
              onClick={() => {
                handleChangeOpenTab(tab.tabName);
              }}
              className={
                tab.tabName == openTab
                  ? styles["listItem-active"]
                  : styles["listItem"]
              }
            >
              <img
                alt={tab.tabName}
                src={`./assets/icons/${tab.iconName}`}
                className={styles["listItem__icon"]}
              />
              {!privacy && (
                <h2 className={styles["listItem__text"]}>{tab.tabName}</h2>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Navigation;
