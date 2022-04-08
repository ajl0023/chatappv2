import React, { useState } from "react";
import io from "socket.io-client";

import { getNewSocket, getSocket } from "../../socketInstance";
import { usePopper } from "react-popper";

import "./UserBar.scoped.scss";
import Tooltip from "../Tooltip/Tooltip";
export default function UserBar(props) {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [error, setError] = useState(false);
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const [hoveredUser, setHoveredUser] = useState(null);
  const handleChange = (value, cb) => {
    cb(value);
  };

  const { styles, attributes, update, state } = usePopper(
    referenceElement,
    popperElement,
    {
      placement: "left",
    }
  );

  return (
    <div ref={setName} className="wrapper">
      <div className="bar-container">
        {props.users.map((user) => {
          return (
            <React.Fragment key={user.id}>
              <div
                onMouseEnter={(e) => {
                  setReferenceElement(e.currentTarget);
                  setHoveredUser(user);
                }}
                onMouseLeave={(e) => {
                  setReferenceElement(null);
                  setHoveredUser(null);
                }}
                className="user-container"
                style={{
                  background: user.grad,
                }}
              ></div>
            </React.Fragment>
          );
        })}
      </div>

      {hoveredUser && (
        <Tooltip
          style={styles.popper}
          update={update}
          content={hoveredUser && hoveredUser.name}
          ref={setPopperElement}
          popper={{
            ...attributes.popper,
          }}
        />
      )}
    </div>
  );
}
