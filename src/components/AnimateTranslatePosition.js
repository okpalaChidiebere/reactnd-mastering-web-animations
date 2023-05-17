import { useCallback, useRef } from "react";
import styles from "../css/AnimateProperties.module.css";

export default function AnimateTranslatePosition() {
  const boxRef = useRef(null);

  const startAnimation = useCallback(() => {
    boxRef.current?.animate(
      [{ transform: "translateY(0px)" }, { transform: "translateY(300px)" }], //move the object downwards along the Y-axis
      {
        duration: 1500,
        fill: "none", // `none` value resets the object back to its original position once the animation is finished
      }
    );
  }, []);

  const { container, box } = styles;

  return (
    <div className={container}>
      <div ref={boxRef} className={box} onClick={startAnimation}></div>
    </div>
  );
}
