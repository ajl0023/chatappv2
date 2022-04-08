import { useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import SocketContext from "../../contexts/SocketContext/SocketContext";

import { getNewSocket, getSocket } from "../../socketInstance";
import { v4 as uuidv4 } from "uuid";

import "./MainInput.scoped.scss";
export default function MainInput(props) {
  const [input, setInput] = useState("");
  const { socket } = useContext(SocketContext);
  const handleChange = (value, cb) => {
    cb(value);
  };
  const handleSubmit = () => {
    socket.emit("message", {
      text: input,
      sent: Date.now(),
      id: uuidv4(),
    });
    setInput("");
  };

  return (
    <div className="input-container">
      <input
        onChange={(e) => {
          handleChange(e.target.value, setInput);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" && input.trim().length > 0) {
            handleSubmit();
          }
        }}
        value={input}
        className="main-input"
      />
      {input.trim().length > 0 && <div className="button-send">Send</div>}
    </div>
  );
}
