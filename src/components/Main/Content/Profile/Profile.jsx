const PATH_TO_DEFAULT_AVATAR = "./assets/userAvatar.png";
import Blur from "../../Blur/Blur";
/* eslint-disable react/prop-types */
import styles from "./profile.module.scss";
function Profile({
  privacy,
  userInfo,
  setUserInfo,
  blurPassword,
  setBlurPassword,
  password,
  setPassword,
  setPrivacy,
}) {
  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        setUserInfo((prevInfo) => ({ ...prevInfo, avatar: e.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  function handleUpdateUserInfo(e, valueKey) {
    setUserInfo((prevInfo) => ({ ...prevInfo, [valueKey]: e.target.value }));
  }
  return (
    <div className={styles["wrapper"]}>
      <div className={styles["profile"]}>
        <h1 className={styles["profile__title"]}>Profile</h1>
        <div className={styles["profile-content"]}>
          <img
            src={userInfo.avatar ? userInfo.avatar : PATH_TO_DEFAULT_AVATAR}
            alt="avatar"
            className={styles["profile-content__avatar"]}
          />
          <input
            type="file"
            id="fileInput"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
          <h3 className={styles["profile-content__text"]}>Display Name</h3>
          <input
            onChange={(e) => {
              handleUpdateUserInfo(e, "name");
            }}
            value={userInfo.name}
            className={styles["profile-content__input"]}
          ></input>
          <h3 className={styles["profile-content__text"]}>Bio</h3>
          <textarea
            onChange={(e) => {
              handleUpdateUserInfo(e, "bio");
            }}
            value={userInfo.bio}
            placeholder="Tell us aboyt yourself"
            className={styles["profile-content__textarea"]}
          ></textarea>
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

export default Profile;
