import { useCallback, useRef } from "react";
import styles from "../css/AnimateProperties.module.css";

export default function CombineAnimationsWithDelay() {
  const boxRef = useRef(null);

  //An example of combining multiple combined animations
  const startAnimation = useCallback(async () => {
    /** Start sequence animation */

    const anim1 = boxRef.current?.animate(
      { backgroundColor: ["rgb(255,99,71)", "rgb(99,71,255)"] },
      { duration: 500, fill: "forwards" }
    );

    await anim1.finished;

    const anim2 = boxRef.current?.animate(
      { transform: ["scale(1)", "scale(2)"] },
      { duration: 300, fill: "forwards", endDelay: 1500 }
    );

    await anim2.finished;

    //run in parallel after waiting 1500ms
    boxRef.current?.animate(
      { backgroundColor: ["rgb(99,71,255)", "rgb(255,99,71)"] },
      { duration: 500, fill: "forwards" }
    );
    boxRef.current?.animate(
      { transform: ["scale(2)", "scale(1)"] },
      { duration: 300, fill: "forwards" }
    );
    //end run in parallel

    /** End sequence animation */
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
