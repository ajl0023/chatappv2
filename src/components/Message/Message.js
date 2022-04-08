import { useState } from "react";
import io from "socket.io-client";

import { getNewSocket, getSocket } from "../../socketInstance";
import moment from "moment";
import "./Message.scoped.scss";
export default function Message(props) {
  if (props.message.user.name === "admin") {
    return <div className="admin-message">{props.message.message.text}</div>;
  }
  return (
    <div
      key={props.message.message.id}
      style={{
        justifyContent:
          props.message.user.id === props.socket_id ? "flex-end" : "flex-start",
      }}
      className="message-container"
    >
      {props.index === props.subset_length - 1 && (
        <div
          onMouseEnter={(e) => {
            props.setReferenceElement(e.currentTarget);
            props.setTooltipPos("left");
            props.setContent(props.message.user.name);
          }}
          onMouseLeave={(e) => {
            props.setReferenceElement(null);
            props.setContent(null);
          }}
          className="user-container"
          style={{
            background: props.message.user.grad,
          }}
        ></div>
      )}
      <div
        onMouseEnter={(e) => {
          props.setReferenceElement(e.currentTarget);
          props.setTooltipPos(
            props.message.id === props.socket_id ? "right" : "left"
          );
          props.setContent(moment(props.message.message.sent).format("h:mm a"));
        }}
        onMouseLeave={(e) => {
          props.setReferenceElement(null);
          props.setContent(null);
        }}
        className="message-content"
      >
        {props.message.message.text}
      </div>
    </div>
  );
}
