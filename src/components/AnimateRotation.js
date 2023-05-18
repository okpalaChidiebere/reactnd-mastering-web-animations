import { useCallback, useRef } from "react";
import styles from "../css/AnimateProperties.module.css";

export default function AnimateRotation() {
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
        /**
         * full 360 rotate animation
         * { transform: "rotate(0deg)" },
        {
          transform: "rotate(360deg)", //full 360 rotate animation
        },
         */
        // the object will rotateX half way before it does a full rotateY
        // So we have an interpolation from 0 to 1 and we animate to rotate properties at various interval from 0 to 1
        // You MUST specify all css property values at each stage of the interpolation
        // Offsets must be null or in the range [0,1]
        { transform: "rotateX(0deg) rotateY(0deg)" },
        { transform: "rotateX(180deg) rotateY(0deg)", offset: 0.5 },
        { transform: "rotateX(360deg) rotateY(180deg)" },
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
