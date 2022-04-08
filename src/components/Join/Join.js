import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SocketContext from "../../contexts/SocketContext/SocketContext";
import "./Join.scoped.scss";

export default function Join(props) {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState(false);
  const handleChange = (value, cb) => {
    cb(value);
  };
  const context = useContext(SocketContext);
  const navigate = useNavigate();
  const { socket } = context;
  const handleEnter = () => {
    if (name.trim().length === 0) {
      setError({
        error: "Name is required",
      });
      return;
    }
    context.setSocket();
    setIsValid(true);
  };
  // useEffect(() => {
  //   setName("test");
  // }, []);
  useEffect(() => {
    if (name.length > 0) {
      handleEnter();
    }
  }, [name]);
  useEffect(() => {
    if (socket && isValid) {
      socket.emit("join", name, room, (user) => {
        navigate(`/${user.room}`);
      });
    }
  }, [socket, isValid]);
  return (
    <div className="wrapper">
      <div className="container">
        <h1 className="header">Join</h1>
        <div className="input-container">
          <input
            className="join-input input-field"
            placeholder="Name"
            type="text"
            onChange={(e) => {
              handleChange(e.target.value, setName);
            }}
          />

          <div className={!error ? `inactive` : `error-container`}>
            <p className="error-message">{error.error}</p>
          </div>
        </div>

        <button
          className="signin-but"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleEnter(e);
            }
          }}
          onClick={(e) => handleEnter(e)}
          type="submit"
        >
          Sign In
        </button>
      </div>
    </div>
  );
}
