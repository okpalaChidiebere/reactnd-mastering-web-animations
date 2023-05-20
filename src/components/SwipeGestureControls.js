import { useCallback, useEffect, useRef, useState } from "react";
import styles from "../css/styles.module.css";

function getDirectionAndColor(e, { moveX, moveY, dx, dy }) {
  let mHeight, mWidth;
  // We define that if a user moves their finger in a direction further than 30 pixels than we'll trigger a direction
  // we don't consider anything less than 30 a drag movement
  const threshold = 30;

  if (e.type === "mousemove") {
    // for web browsers
    const { height, width } = e.target.getBoundingClientRect();
    mHeight = height;
    mWidth = width;
  } else if (e.type === "touchmove") {
    // for mobile devices
    const { availHeight, availWidth } = window.screen;
    mHeight = availHeight;
    mWidth = availWidth;
  }

  const draggedDown = dy > threshold;
  const draggedUp = dy < -threshold;
  const draggedLeft = dx < -threshold;
  const draggedRight = dx > threshold;
  const isRed = moveY < 90 && moveY > 0 && moveX > 0 && moveX < mWidth;
  const isBlue = moveY > mHeight - 50 && moveX > 0 && moveX < mWidth;

  let dragDirection = "";

  if (draggedDown || draggedUp) {
    if (draggedDown) dragDirection += "dragged down ";
    if (draggedUp) dragDirection += "dragged up ";
  }

  if (draggedLeft || draggedRight) {
    if (draggedLeft) dragDirection += "dragged left ";
    if (draggedRight) dragDirection += "dragged right ";
  }

  if (isRed) return `red ${dragDirection}`;
  if (isBlue) return `blue ${dragDirection}`;
  if (dragDirection) return dragDirection;
}

export default function SwipeGestureControls() {
  const containerRef = useRef(null);
  const touch = useRef({
    startX: 0,
    startY: 0,
  });
  const [state, setState] = useState({
    zone: "Still Touchable",
  });

  const onPress = useCallback(() => {
    setState({
      zone: "I got touched with a parent pan responder",
    });
  }, []);

  const setTouch = useCallback(({ startX, startY }) => {
    touch.current = { startX, startY };
  }, []);

  const getGesture = useCallback(
    ({ clientX, clientY }) => ({
      /**
       * moveX and moveY are the current coordinate positions of the gestureState.
       * dx and dy are the distance change from where the initial finger was put down (delta clientX and delta clientY).
       */
      moveX: clientX,
      moveY: clientY,
      dx: parseInt(clientX) - touch.current.startX,
      dy: parseInt(clientY) - touch.current.startY,
    }),
    []
  );

  const onPanResponderMove = useCallback(
    (e) => {
      e.preventDefault();
      let moveX, moveY;

      switch (e.type) {
        case "mousemove":
          moveX = e.clientX;
          moveY = e.clientY;
          break;

        case "touchmove":
          const touchObj = e.changedTouches[0];
          moveX = touchObj.clientX;
          moveY = touchObj.clientY;
          break;

        default:
          moveX = 0;
          moveY = 0;
          break;
      }

      const drag = getDirectionAndColor(
        e,
        getGesture({ clientX: moveX, clientY: moveY })
      );
      setState({
        zone: drag,
      });
    },
    [getGesture]
  );

  useEffect(() => {
    // for regular desktop web browsers with mouse
    containerRef.current.onmousedown = (e) => {
      e.preventDefault();
      setTouch({ startX: e.clientX, startY: e.clientY });

      containerRef.current.onmousemove = onPanResponderMove;
      containerRef.current.onmouseup = () => {
        //close drag event
        //stop moving when mouse button is released
        containerRef.current.onmouseup = null;
        containerRef.current.onmousemove = null;
        touch.current = { startX: 0, startY: 0 };
      };
    };

    // for mobile device because our app could be opened from mobile
    containerRef.current.ontouchstart = (e) => {
      e.preventDefault();
      const touchObj = e.changedTouches[0];
      setTouch({ startX: touchObj.clientX, startY: touchObj.clientY });

      containerRef.current.ontouchmove = onPanResponderMove;
    };
  }, [onPanResponderMove, setTouch, getGesture]);

  const { center, container, zone1, zone2 } = styles;

  return (
    <div ref={containerRef} className={container}>
      <div className={zone1}></div>
      <div className={center}>
        <div onClick={onPress} onTouchStart={onPress}>
          <span>{state.zone}</span>
        </div>
      </div>
      <div className={zone2}></div>
    </div>
  );
}
