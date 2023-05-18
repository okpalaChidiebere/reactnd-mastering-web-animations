import { useCallback, useRef } from "react";
import styles from "../css/AnimateProperties.module.css";

export default function Easing() {
  const boxRef = useRef(null);

  const startAnimation = useCallback(() => {
    const animationConfig = {
      duration: 500,
      fill: "forwards",
      timeline: document.timeline,
      /**
       * Defining your own easing comes in handy when you want to control the
       * exact physics that will happen over a set duration of time
       * like bounce, spring, smooth, etc
       * There are a few physics that you can only do using keyframes like
       * spring, double bounce, etc. see https://easings.net/#
       *
       * see doc http://cubic-bezier.com
       * https://matthewlein.com/tools/ceaser
       * https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timing-function
       */
      //   easing: "cubic-bezier(0.36, 0, 0.98, -0.56)", //easingInBack
      //   easing: "ease-in",
      //   easing: "cubic-bezier(.91,.8,.54,1.39)", //single bounce
      //   easing: "cubic-bezier(0.045, 0.550, 1.000, 0.675)", //sticky
      //   easing: "cubic-bezier(0.550, 0.085, 0.680, 0.530)", //slow to fast
      //   easing: "cubic-bezier(0.250, 0.100, 0.250, 1.000)", //smooth
      easing: "cubic-bezier(0.190, 1.000, 0.220, 1.000)", //fast to slow
    };

    /** Both animation will start at thesame time because they share thesame timeline */
    boxRef.current?.animate(
      [{ transform: "translateY(0px)" }, { transform: "translateY(400px)" }],
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
