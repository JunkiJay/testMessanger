import { lazy, useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import { themas } from "./themas/themas";
import Loader from "./components/Loader/Loader";
import { useTonConnectUI, toUserFriendlyAddress } from '@tonconnect/ui-react';
import socket from './socket';
import SelectUsername from "./components/SelectUsername";
import { generateKeyPair } from "./utils/crypto";

function App() {
  const [privacy, setPrivacy] = useState(false);
  const [search, setSearch] = useState("");
  const [userOpen, setUserOpen] = useState(false);
  const [openTab, setOpenTab] = useState("Chat");
  const [blurPassword, setBlurPassword] = useState("");
  const [userInfo, setUserInfo] = useState({
    avatar: null, //путь к дефолт фотке "./assets/userAvatar.png"
    name: "",
    bio: "",
  });

  const [password, setPassword] = useState({
    currentPassword: "test",
    newPassword: "",
    confirmNewPassword: "",
    passChangeError: "", //функция handleUpdatePassword проверяет данные, после чего возвращается true, если все гуд, и false, если есть проблемы. Описание ошибки засовывается в это значение (в password.passChangeError)
  });
  const [userThema, setUserThema] = useState(Object.keys(themas)[0]);

  const [usernameAlreadySelected, setUsernameAlreadySelected] = useState(false);
  const [tonConnectUI, setOptions] = useTonConnectUI();

  useEffect(() => {
    const sessionID = localStorage.getItem('sessionID');

    if (sessionID) {
      setUsernameAlreadySelected(true);
      socket.auth = { sessionID };
      socket.connect();
    }

    socket.on('session', ({ sessionID, userID }) => {
      // Attach the session ID to the next reconnection attempts
      socket.auth = { sessionID };
      // Store it in the localStorage
      localStorage.setItem('sessionID', sessionID);
      // Save the ID of the user
      socket.userID = userID;
    });

    socket.on('connect_error', (err) => {
      if (err.message === 'invalid username') {
        setUsernameAlreadySelected(false);
      }
    });

    return () => {
      socket.off('connect_error');
    };
  }, []);

  tonConnectUI.onStatusChange(async () => {
    if (tonConnectUI.connected) {
      setUsernameAlreadySelected(true);
      const keyPair = await generateKeyPair();
      socket.auth = { username: toUserFriendlyAddress(tonConnectUI.account.address) };
      localStorage.setItem('friendlyAddress', toUserFriendlyAddress(tonConnectUI.account.address));
      socket.connect();
    } else {
      setUsernameAlreadySelected(false);
      localStorage.removeItem('friendlyAddress');
      localStorage.removeItem('sessionID');
    }
  });

  const currentTheme = themas[userThema];
  const [toggleState, setToggleState] = useState({
    //настройки тумблеров
    allowNewContact: true,
    alwaysAsk: true,
    alwaysShowPreview: false,
    neverShowPreview: false,
    personalChats: true,
    groupChats: true,
    mentions: true,
    allMessages: false,
  });
  return (
    <div
      className="mainbody"
      style={{
        "--colour1": currentTheme.color1,
        "--colour2": currentTheme.color2,
        "--colour3": currentTheme.color3,
        "--colour4": currentTheme.color4,
        "--colour5": currentTheme.color5,
        "--colour6": currentTheme.color6,
        "--colour7": currentTheme.color7,
        "--colour8": currentTheme.color8,
        "--colour9": currentTheme.color9,
        "--blur": currentTheme.blur,
        "--gradient1": currentTheme.gradient1,
      }}
    >
      {!usernameAlreadySelected ? (
        <SelectUsername />
      ) : (
        <>
          <Header
            privacy={privacy}
            openTab={openTab}
            setOpenTab={setOpenTab}
            setPrivacy={setPrivacy}
            userThema={userThema}
          />
          <Main
            privacy={privacy}
            setPrivacy={setPrivacy}
            openTab={openTab}
            setOpenTab={setOpenTab}
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            toggleState={toggleState}
            setToggleState={setToggleState}
            userThema={userThema}
            setUserThema={setUserThema}
            search={search}
            setSearch={setSearch}
            userOpen={userOpen}
            setUserOpen={setUserOpen}
            blurPassword={blurPassword}
            setBlurPassword={setBlurPassword}
            password={password}
            setPassword={setPassword}
          />
        </>
      )}
    </div>
  );
}

export default App;
