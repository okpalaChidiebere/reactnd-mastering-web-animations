import { useCallback, useRef } from "react";
import styles from "../css/AnimateProperties.module.css";

export default function AnimateBackgroundColor() {
  const boxRef = useRef(null);
  const containerRef = useRef(null);

  const startAnimation = useCallback(() => {
    /**
     * both animation will share thesame timeline and duration; like an interpolation for react-native
     * The "interpolation" (offset) here is from 0 to 1 for web animations
     * At certain time in the offset you can choose to animate whatever property you want
     *  */
    const animationConfig = {
      duration: 1000,
      fill: "backwards",
      timeline: document.timeline,
    };

    /** Both animation will start at thesame time because they share thesame timeline */
    boxRef.current?.animate(
      [
        {
          backgroundColor: "#47ff63", //default color in the css
          offset: 0,
        },
        {
          backgroundColor: "#ff6347",
          offset: 0.5,
        },
        { backgroundColor: "#6347ff", offset: 1 },
      ],
      animationConfig
    );

    containerRef.current?.animate(
      [
        {
          backgroundColor: "rgb(255, 99, 71,1)", //default color in the css
          offset: 0,
        },
        { backgroundColor: "rgb(255, 99, 71,0)", offset: 1 },
      ],
      animationConfig
    );
  }, []);

  const { container, box } = styles;

  return (
    <div ref={containerRef} className={container}>
      <div ref={boxRef} className={box} onClick={startAnimation}></div>
    </div>
  );
}
