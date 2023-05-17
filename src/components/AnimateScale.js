import { useCallback, useRef } from "react";
import styles from "../css/AnimateProperties.module.css";

export default function AnimateScale() {
  const boxRef = useRef(null);

  const startAnimation = useCallback(() => {
    boxRef.current?.animate(
      //the box will double its size
      [
        {
          transform: "scale(1)", //default value is 1; meaning that the object is at its original size
          //   transform: "scaleX(1)",
        },
        {
          transform: "scale(2)",
          //   transform: "scaleX(2)",
          //   transform: "scaleX(-2)", // this will flip the card along the vertical axis. Its good to know that you can use scale for flip or reflection like animations :)
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
