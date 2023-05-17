import { useCallback, useRef } from "react";
import styles from "../css/AnimateProperties.module.css";

export default function AnimateOpacity() {
  const boxRef = useRef(null);

  const startAnimation = useCallback(() => {
    const animation = boxRef.current?.animate(
      [{ opacity: 1 }, { opacity: 0 }],
      {
        duration: 350,
        fill: "forwards", // make sure the object stays in its new css state and not reset back to its original position
      }
    );
    animation.onfinish = (event) => {
      // when the animation is complete, we animate the opacity back to 1
      boxRef.current?.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 500,
        fill: "forwards", // make sure the object stays in its new css state and not reset back to its original position
      });
    };
  }, []);

  const { container, box } = styles;

  return (
    <div className={container}>
      <div ref={boxRef} className={box} onClick={startAnimation}></div>
    </div>
  );
}
