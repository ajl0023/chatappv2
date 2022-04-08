import React, { useEffect, useState } from "react";

import io from "socket.io-client";
import ReactDOM from "react-dom";
import { getNewSocket, getSocket } from "../../socketInstance";

import "./Tooltip.scoped.scss";

const Tooltip = React.forwardRef((props, ref) => {
  const [origin, setOrigin] = useState(null);
  useEffect(() => {
    const tooltip_origin = document.getElementById("tooltip-origin");

    setOrigin(tooltip_origin);
  }, []);

  if (origin) {
    return ReactDOM.createPortal(
      <div
        style={{
          ...props.style,
        }}
        ref={ref}
        {...props.popper}
        className="container"
      >
        <div className="tooltip">
          <span className="tooltip-text">{props.content && props.content}</span>
        </div>
      </div>,
      origin
    );
  } else {
    return <div></div>;
  }
});
export default Tooltip;
