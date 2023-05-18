import { useCallback, useRef } from "react";
import styles from "../css/AnimateProperties.module.css";

export default function SequenceAnimations() {
  const boxRef = useRef(null);

  const startAnimation = useCallback(async () => {
    const bgAnimation = boxRef.current?.animate(
      {
        backgroundColor: ["rgb(255,99,71)", "rgb(99,71,255)"], // [ from, to ]
        offset: [0, 1], // we don't need to write this but good to know that its the default
      },
      { duration: 500, fill: "forwards" }
    );

    await bgAnimation.finished; // wait for the background color animation to finish first

    boxRef.current?.animate(
      { transform: ["scale(1)", "scale(2)"] },
      { duration: 300, fill: "forwards" }
    );
  }, []);

  const { container, box, text } = styles;

  return (
    <div className={container}>
      <div ref={boxRef} className={box} onClick={startAnimation}>
        <span className={text}>Hello Parallel</span>
      </div>
    </div>
  );
}
