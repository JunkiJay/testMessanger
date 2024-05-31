/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { users } from "../../../../users/users";
import styles from "./chat.module.scss";
import Blur from "../../Blur/Blur";
import linkify from "linkify-it";
import Warning from "../../Warning/Warning";
import { useTonConnectUI } from "@tonconnect/ui-react";
import socket from '../../../../socket';

const linkifyInstance = linkify();

function Chat({
  search,
  setSearch,
  userOpen,
  setUserOpen,
  privacy,
  toggleState,
  blurPassword,
  password,
  setPassword,
  setPrivacy,
  setBlurPassword,
}) {
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [tonConnectUI, setOptions] = useTonConnectUI();

  useEffect(() => {
    const handleConnect = () => {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.self ? { ...user, connected: true } : user
        )
      );
    };

    const handleDisconnect = () => {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.self ? { ...user, connected: false } : user
        )
      );
    };

    const handleUsers = (ausers) => {
      ausers.forEach((user, i) => {
        if (user.username == localStorage.getItem('friendlyAddress')) {
          ausers.splice(i, 1);
        }
        user.messages.forEach((message) => {
          message.fromSelf = message.from === socket.userID;
        });
      });

      setUsers(ausers);
    };

    const handleUserConnected = (user) => {
      setUsers((prevUsers) =>
        prevUsers.map((u) =>
          u.userID === user.userID ? { ...u, connected: true } : u
        )
      );
    };

    const handleUserDisconnected = (id) => {
      setUsers((prevUsers) =>
        prevUsers.map((u) =>
          u.userID === id ? { ...u, connected: false } : u
        )
      );
    };

    const handlePrivateMessage = ({ content, from, to }) => {
      setUsers((prevUsers) =>
        prevUsers.map((user) => {
          const fromSelf = socket.userID === from;
          if (user.userID === (fromSelf ? to : from)) {
            const newUser = { ...user };
            newUser.messages.push({ content, fromSelf });
            if (newUser !== selectedUser) {
              newUser.hasNewMessages = true;
            }
            return newUser;
          }
          return user;
        })
      );
    };

    socket.on('connect', handleConnect);
    socket.on('disconnect', handleDisconnect);
    socket.on('users', handleUsers);
    socket.on('user connected', handleUserConnected);
    socket.on('user disconnected', handleUserDisconnected);
    socket.on('private message', handlePrivateMessage);

    return () => {
      socket.off('connect', handleConnect);
      socket.off('disconnect', handleDisconnect);
      socket.off('users', handleUsers);
      socket.off('user connected', handleUserConnected);
      socket.off('user disconnected', handleUserDisconnected);
      socket.off('private message', handlePrivateMessage);
    };
  }, [selectedUser]);

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    setUsers((prevUsers) =>
      prevUsers.map((u) =>
        u.userID === user.userID ? { ...u, hasNewMessages: false } : u
      )
    );
  };

  const handleMessage = (content) => {
    if (selectedUser) {
      socket.emit('private message', {
        content,
        to: selectedUser.userID,
      });
      setSelectedUser((prevUser) => {
        const newUser = { ...prevUser };
        newUser.messages.push({ content, fromSelf: true });
        return newUser;
      });
    }
  };

  // const chatHistoryRef = useRef(null);

  // useEffect(() => {
  //   if (chatHistoryRef.current) {
  //     chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
  //   }
  // }, [userOpen, users.find((user) => user.id === userOpen)?.messages]);

  const [warning, setWarning] = useState({
    state: false,
    link: "",
  });

  function handleUpdateInput(e) {
    setSearch(e.target.value);
  }

  function handleUpdateUserOpen(user) {
    setUserOpen(user.id);
  }

  console.log(warning);

  function formatTime(unixTime) {
    const currentTime = Math.floor(Date.now() / 1000);
    const timeDifference = currentTime - unixTime;
    const secondsInMinute = 60;
    const secondsInHour = 3600;
    const secondsInDay = 86400;

    if (timeDifference < secondsInMinute) {
      return `${timeDifference}s ago`;
    } else if (timeDifference < secondsInHour) {
      const minutes = Math.floor(timeDifference / secondsInMinute);
      return `${minutes}m ago`;
    } else if (timeDifference < secondsInDay) {
      const hours = Math.floor(timeDifference / secondsInHour);
      return `${hours}h ago`;
    } else {
      const date = new Date(unixTime * 1000);
      const options = { day: "numeric", month: "long" };
      return date.toLocaleDateString("en-US", options);
    }
  }

  function parseMessageText(text) {
    const matches = linkifyInstance.match(text);
    if (!matches) {
      return text;
    }

    const parts = [];
    let lastIndex = 0;

    matches.forEach((match, index) => {
      if (match.index > lastIndex) {
        parts.push(text.slice(lastIndex, match.index));
      }
      parts.push(
        <span
          key={index}
          className={styles.link}
          onClick={(e) => {
            e.preventDefault();
            setWarning({ state: true, link: match.url });
          }}
        >
          {match.url}
        </span>
      );
      lastIndex = match.lastIndex;
    });

    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }

    return parts;
  }

  const user = users.find((user) => user.userID === userOpen);

  return (
    <div className={styles["wrapper"]}>
      <div className={styles["chat"]}>
        <div className={styles["chat-users"]}>
          <div className={styles["inputBlock"]}>
            <input
              value={search}
              onChange={(e) => handleUpdateInput(e)}
              className={styles["inputBlock__input"]}
              placeholder="Search..."
            ></input>
          </div>
          <div className={styles["usersList"]}>
            {users
              // .filter((user) =>
              //   user.name.toLowerCase().includes(search.toLowerCase())
              // )
              .map((user, index) => {
                console.log(userOpen == user.userID);
                return (
                  <div
                    onClick={() => handleUpdateUserOpen(user)}
                    className={
                      userOpen == user.userID
                        ? styles["userActive"]
                        : styles["user"]
                    }
                    key={`Юзер $${index}`}
                  >
                    {/* <img
                      alt={`${user.name}'s avatar`}
                      src={`./assets/usersAvatars/${user.logo}`}
                      className={styles["user__avatar"]}
                    /> */}
                    <h2 className={styles["user__name"]}>{user.username}</h2>
                  </div>
                );
              })}
          </div>
        </div>
        <div className={styles["chatMessages"]}>
          <div
            className={
              userOpen === false
                ? styles["chat-dialog-empty"]
                : styles["chat-dialog"]
            }
            // ref={chatHistoryRef}
          >
            <div className={styles["chat-dialog-top"]}>
              <h3 className={styles["chat-dialog-top__name"]}>
                {user ? user.name : "Nik_Name"}
              </h3>
            </div>
            <div className={styles["chat-dialog-history"]}>
              {user && user.messages
                ? user.messages.map((message) => {
                    return (
                      <div
                        className={
                          message.owner
                            ? styles["messageOwner"]
                            : styles["messageSender"]
                        }
                        key={`Message: ${message.id}`}
                      >
                        <h3
                          className={
                            message.owner
                              ? styles["message__textOwner"]
                              : styles["message__textSender"]
                          }
                        >
                          {parseMessageText(message.text)}
                        </h3>
                        <h3
                          className={
                            message.owner
                              ? styles["message__dataOwner"]
                              : styles["message__dataSender"]
                          }
                        >
                          {formatTime(message.data)}
                        </h3>
                      </div>
                    );
                  })
                : "User not found"}
            </div>
          </div>
          <div className={styles["messageSendBlock"]}>
            <div className={styles["messageSendBlock__inputblock"]}>
              <textarea
                placeholder="Message..."
                className={styles["messageSendBlock__input"]}
              ></textarea>
            </div>
            <button className={styles["messageSendBlock__button"]}>Send</button>
          </div>
        </div>
      </div>
      {toggleState.alwaysAsk && warning.state && (
        <Warning warning={warning} setWarning={setWarning} />
      )}
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

export default Chat;
