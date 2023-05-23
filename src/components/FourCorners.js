import { useCallback, useEffect, useRef } from "react";
import styles from "../css/styles.module.css";

export default function FourCorners() {
  const { box, container } = styles;
  const boxRef = useRef(null);
  const boxDimens = useRef({ width: 0, height: 0 });

  const startAnimation = useCallback(async () => {
    const { innerWidth: width, innerHeight: height } = window;

    const options = {
      duration: 300,
      easing: "cubic-bezier(.91,.8,.54,1.39)", //bounce
      fill: "forwards",
      endDelay: 300,
      iterations: 1,
    };

    // start sequence animation
    //because transform is affected by margin, padding and other flow control rules you can avoid
    // using it and just use the left and top rules to properly position your element
    const moveDown = boxRef.current.animate(
      { top: [`${height - boxDimens.current.height}px`] },
      options
    );
    await moveDown.finished;
    const moveRight = boxRef.current.animate(
      { left: [`${width - boxDimens.current.width}px`] },
      { ...options, composite: "accumulate" }
    );
    await moveRight.finished;
    const moveUp = boxRef.current.animate({ top: ["0px"] }, options);
    await moveUp.finished;
    // // moveLeft
    boxRef.current.animate({ left: ["0px"] }, options);
    //end sequence animation
  }, []);

  useEffect(() => {
    if (boxRef.current) {
      //its good to know that you can dynamically measuring the width and height. it does not matter if its a flex or not :)
      //you could also do this in `useLayoutEffect` that runs after the component mounts. its up to ur use case
      boxDimens.current = {
        width: boxRef.current.offsetWidth,
        height: boxRef.current.offsetHeight,
      };
    }
  }, []);

  return (
    <div className={container}>
      <div ref={boxRef} className={box} onClick={startAnimation}></div>
    </div>
  );
}

// -  we also learned about how to accumulate animation values :)
// https://css-tricks.com/additive-animation-web-animations-api/
// https://developer.mozilla.org/en-US/docs/Web/API/KeyframeEffect/KeyframeEffect#parameters
// - we also learned that we can dynamically get dimensions of div at runtime for animations
