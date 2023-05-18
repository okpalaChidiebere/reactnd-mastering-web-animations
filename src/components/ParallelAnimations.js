import { useCallback, useRef } from "react";
import styles from "../css/AnimateProperties.module.css";

export default function ParallelAnimations() {
  const boxRef = useRef(null);

  const startAnimation = useCallback(async () => {
    boxRef.current?.animate(
      {
        backgroundColor: ["rgb(255,99,71)", "rgb(99,71,255)"], // [ from, to ]
        offset: [0, 1], // we don't need to write this but good to know that its the default
      },
      { duration: 500, fill: "forwards" }
    );
    boxRef.current?.animate(
      { transform: ["scale(1)", "scale(2)"] },
      { duration: 300, fill: "forwards" }
    );

    //both animations will run in parallel. You can confirm that by checking the `startTime` values in the long
    // console.log(boxRef.current?.getAnimations()); //prints an array

    //wait for both animations to complete. to avoid callback hel, we use async/await
    await Promise.all(
      boxRef.current?.getAnimations().map((animation) => animation.finished)
    );

    alert("Animation complete");
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
