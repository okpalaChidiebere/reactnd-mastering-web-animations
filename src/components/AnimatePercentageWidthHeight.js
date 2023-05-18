import { useCallback, useRef } from "react";
import styles from "../css/AnimateProperties.module.css";

export default function AnimatePercentageWidthHeight() {
  const boxRef = useRef(null);

  const startAnimation = useCallback(() => {
    const animationConfig = {
      duration: 1500,
      fill: "forwards",
      timeline: document.timeline,
    };

    /** Both animation will start at thesame time because they share thesame timeline */
    boxRef.current?.animate(
      [
        { width: "20%", height: "20%" }, //the start values are usually the default value defined in the style beforehand
        { width: "50%", height: "30%" },
      ],
      animationConfig
    );
  }, []);

  const { container, box } = styles;

  return (
    <div className={container}>
      <div ref={boxRef} className={box} onClick={startAnimation}></div>
    </div>
  );
}
