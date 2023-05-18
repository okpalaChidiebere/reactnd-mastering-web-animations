import { useCallback, useRef } from "react";
import styles from "../css/AnimateProperties.module.css";

export default function AnimateAbsolutePosition() {
  const boxRef = useRef(null);

  const startAnimation = useCallback(() => {
    boxRef.current?.animate(
      //This cause layout changes for the element as well as any surrounding element
      [
        {
          left: "0px",
          top: "0px",
        },
        {
          left: "300px",
          top: "300px",
        },
      ],
      {
        duration: 1500,
        fill: "forwards", // make sure the object stays in its new css state and not reset back to its original position
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
