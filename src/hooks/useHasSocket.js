import { useState, useEffect, useContext } from "react";
import SocketContext from "../contexts/SocketContext/SocketContext";

export function useHasSocket() {
  const { socket } = useContext(SocketContext);

  return socket;
}
