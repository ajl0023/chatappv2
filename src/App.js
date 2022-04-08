import logo from "./logo.svg";
import "./App.scoped.css";
import Join from "./components/Join/Join";
import "./global.scss";
import {
  Routes,
  Route,
  Link,
  BrowserRouter,
  useNavigate,
  Navigate,
} from "react-router-dom";
import ChatRoom from "./components/ChatRoom/ChatRoom";
import React, { useContext, useEffect, useState } from "react";
import SocketContext from "./contexts/SocketContext/SocketContext";
import { init_socket } from "./socketInstance";
import { useHasSocket } from "./hooks/useHasSocket";

const CheckSocket = ({ children }) => {
  const socket = useHasSocket();
  if (!socket) {
    return <Navigate to="/"></Navigate>;
  }
  return children;
};
const SocketContextWrapper = () => {
  const [socket, setSocket] = useState();
  const handler = () => {
    setSocket((s) => {
      return init_socket();
    });
  };

  return (
    <SocketContext.Provider
      value={{
        socket,
        setSocket: handler,
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Join />} />
          <Route
            path="/:room_id"
            element={
              <CheckSocket>
                <ChatRoom />
              </CheckSocket>
            }
          />
        </Routes>
      </BrowserRouter>
    </SocketContext.Provider>
  );
};
function App() {
  return (
    <div className="App">
      <SocketContextWrapper />
    </div>
  );
}

export default App;
