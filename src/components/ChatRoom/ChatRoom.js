import React, { useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import SocketContext from "../../contexts/SocketContext/SocketContext";
import { v4 as uuid } from "uuid";
import { getNewSocket, getSocket } from "../../socketInstance";
import MainInput from "../MainInput/MainInput";
import MessageContainer from "../MessageContainer/MessageContainer";
import UserBar from "../UserBar/UserBar";
import "./ChatRoom.scoped.scss";
import _ from "lodash";
export default function ChatRoom(props) {
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const handleChange = (value, cb) => {
    cb(value);
  };
  const { socket, setSocket } = useContext(SocketContext);
  useEffect(() => {
    socket.emit("get_users");
    socket.on("join", (users) => {
      setUsers(users);
    });
    socket.on("_disconnect", (users, user) => {
      users = users && users.length > 0 ? users : [];

      setUsers(users);
    });
  }, []);
  useEffect(() => {
    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("message", (msg, user) => {
        setMessages((state) => {
          const copy = _.cloneDeep(state);

          const new_message = {
            set_id: user.id,

            messages: [
              {
                message: {
                  ...msg,
                },
                user: {
                  ...user,
                },
              },
            ],
          };
          if (copy.length === 0) {
            copy.push(new_message);
          } else {
            const recent_message = copy[copy.length - 1];
            if (recent_message.set_id === user.id) {
              recent_message.messages.push(...new_message.messages);
            } else {
              copy.push(new_message);
            }
          }

          return copy;
        });
      });
    }
  }, [socket]);

  return (
    <>
      <div className="chat-wrapper">
        {socket ? (
          <>
            <div className="userbar-container">
              <UserBar users={users} />
            </div>
            <div className="inner-container">
              <div className="header-container">
                <div className="header-user">
                  {users.map((user, i) => {
                    return (
                      <React.Fragment key={user.id}>
                        {i > 0 ? ", " : ""}
                        <span>{user.name}</span>
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>
              <div id="msg-box" className="chat-message-box">
                <MessageContainer messages={messages} />
              </div>
              <MainInput />
              <div />
            </div>
          </>
        ) : null}
        <div id="tooltip-origin"></div>
      </div>
    </>
  );
}
