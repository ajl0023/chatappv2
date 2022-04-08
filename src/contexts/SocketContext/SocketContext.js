import React from "react";
import { init_socket } from "../../socketInstance";

function context() {
  return React.createContext({
    socket: null,
    setSocket: function() {},
  });
}
export default context();
