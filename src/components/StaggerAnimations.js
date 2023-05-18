import { useCallback, useRef } from "react";
import styles from "../css/AnimateProperties.module.css";

export default function StaggerAnimations() {
  const boxRef = useRef(null);

  const startAnimation = useCallback(async () => {
    boxRef.current?.animate(
      { backgroundColor: ["rgb(255,99,71)", "rgb(99,71,255)"] },
      { duration: 500, fill: "forwards" }
    );

    boxRef.current?.animate(
      { transform: ["scale(1)", "scale(2)"] },
      { duration: 300, fill: "forwards", delay: 200 }
    );

    /**
     * The scale animation will complete at thesame exact time as the backgroundColor because of the delay 200 ms
     *
     * You can confirm this by checking the 'timeline' number of the animation after both animation completes
     * by logging the animation event of the onFinish method for each animation. They will be thesame value
     * If we change the delay on the second animation to any other value the end timeline will be different :)
     *
     * Note that both animations will have thesame starttime because by default js runs both animations in parallel. But now, we choose
     * to stagger them by adding delays
     *
     * Stagger is basically running animations on a set delay
     */
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
