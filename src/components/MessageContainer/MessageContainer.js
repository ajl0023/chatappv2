import { useContext, useEffect, useState } from "react";
import { usePopper } from "react-popper";
import io from "socket.io-client";
import SocketContext from "../../contexts/SocketContext/SocketContext";

import { getNewSocket, getSocket } from "../../socketInstance";
import Tooltip from "../Tooltip/Tooltip";

import "./MessageContainer.scoped.scss";
import Message from "../Message/Message";

export default function MessageContainer(props) {
  const { socket } = useContext(SocketContext);
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const [tooltipPos, setTooltipPos] = useState("");
  const [mounted, setMounted] = useState(null);
  const [content, setContent] = useState(null);
  const { styles, attributes, update, state } = usePopper(
    referenceElement,
    popperElement,
    {
      placement: tooltipPos,
    }
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    socket && (
      <div className="wrapper">
        {props.messages.map((msg) => {
          const subset_length = msg.messages.length;
          return msg.messages.map((item, i) => {
            return (
              <Message
                setContent={setContent}
                setTooltipPos={setTooltipPos}
                setReferenceElement={setReferenceElement}
                key={item.message.id}
                subset_length={subset_length}
                index={i}
                socket_id={socket.id}
                message={item}
              />
            );
          });
        })}
        {content && (
          <Tooltip
            style={styles.popper}
            content={content}
            ref={setPopperElement}
            popper={{
              ...attributes.popper,
            }}
          />
        )}
      </div>
    )
  );
}
