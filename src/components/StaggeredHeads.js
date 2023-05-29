import { useCallback, useEffect, useRef, useState } from "react";
import styles from "../css/styles.module.css";

export default function StaggeredHeads() {
  const translateXY = useRef({
    x: 0,
    y: 0,
  });
  const [heads] = useState([
    {
      image: require("./assets/andrea.schmidt.png"),
      //this helps us control the exact position for each of the heads
      ref: useRef(null),
      text: "Drag Me",
      alt: "andrea.schmidt",
    },
    {
      image: require("./assets/alexandergarcia.png"),
      ref: useRef(null),
      alt: "alexandergarcia",
    },
    {
      image: require("./assets/derek.russel.png"),
      ref: useRef(null),
      alt: "derek.russel",
    },
    {
      image: require("./assets/jmitch.png"),
      ref: useRef(null),
      alt: "jmitch",
    },
  ]);

  // call a function whenever the cursor moves
  const onActive = useCallback(
    (e) => {
      e.preventDefault();
      // we use the coords of the mousedown event

      const translateX = e.clientX - translateXY.current.x; //dx
      const translateY = e.clientY - translateXY.current.y; //dy
      const animatedStyles = {
        top: `${translateY}px`,
        left: `${translateX}px`,
      }; //keyframes

      // set drag on the first item
      e.target.style.top = animatedStyles.top;
      e.target.style.left = animatedStyles.left;

      // Now we control the other heads to stagger to wherever you drag the first head
      // each head will happen separately
      //use slice(1) to skip the first head which is our drag head
      const animations = heads.slice(1).map(
        //we did not pick the first head because we are not staggering it
        ({ ref }, index) => {
          return ref.current.animate(animatedStyles, {
            duration: 150,
            easing: "cubic-bezier(.91,.8,.54,1.39)", //bounce
            fill: "both",
            delay: index * 10, // this delay will cause the stagger effect because it will delay a certain amount based on the head position
          });
        }
      );

      Promise.all(animations.map((a) => a.finished)).then(() => {
        animations.forEach((a) => {
          a.commitStyles(); // you will see the styles get updated when you inspect the browser
          a.cancel(); // clean up because we don't need to keep track :)
        });
      });
    },
    [heads]
  );

  const onEnd = useCallback((e) => {
    // stop moving when mouse button is released:
    e.target.onmouseup = null;
    e.target.onmousemove = null;

    /**
     * We do not do anything in our onEnd but theoretically you could animate and
     * lock a head to either the left or right side depending on it's position.
     */
  }, []);

  const onStart = useCallback(
    (e) => {
      e.preventDefault();
      // we store the point of click(coords)
      translateXY.current = { x: e.offsetX, y: e.offsetY };

      e.target.onmousemove = onActive;
      e.target.onmouseup = onEnd;
      e.target.onmouseleave = onEnd;
    },
    [onEnd, onActive]
  );

  useEffect(() => {
    const headAtTheTop = heads[0].ref.current;
    // handle our pan responder for just the first element
    headAtTheTop.onmousedown = onStart;
  }, [heads, onStart, onEnd]);

  const { container, head } = styles;

  return (
    <div className={container}>
      {heads
        .slice(0) //shallow clone the heads
        /**
         * The order in which you render elements in react native matters.
         *
         * we reverse the list so the first head will actually appear on top
         * so that we can drag it around. Another way you can tackle this without
         * reversing the list is by setting the z-index for the heads but this will do
         */
        .reverse()
        .map((item, index, items) => {
          const isOnTop = index === items.length - 1;
          return (
            <img
              key={index}
              ref={item.ref}
              className={head}
              src={item.image}
              draggable="false" //prevent the ghost image drag
              alt={item.alt}
              // allow pointer events only on the first image
              {...{
                style: {
                  pointerEvents: isOnTop ? "auto" : "none",
                  cursor: isOnTop ? "pointer" : "auto",
                },
              }}
            />
          );
        })}
    </div>
  );
}
