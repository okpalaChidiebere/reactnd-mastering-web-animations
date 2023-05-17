import { useCallback, useRef } from "react";
import styles from "../css/AnimateProperties.module.css";

export default function AnimateWidthHeight() {
  const boxRef = useRef(null);

  const startAnimation = useCallback(() => {
    boxRef.current?.animate(
      //This cause layout changes for the element as well as any surrounding element
      [
        {
          width: "150px",
          height: "150px",
        },
        {
          width: "300px",
          height: "300px",
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
      <div ref={boxRef} className={box} onClick={startAnimation}>
        {/** this text will reflow because of the with of the box is growing :) */}
        <span>
          This is a really long text This is a really long text This is a really
          long text This is a really long text This is a really long text
        </span>
      </div>
    </div>
  );
}
