import { useCallback, useRef } from "react";
import styles from "../css/styles.module.css";

export default function ProgressbarButton() {
  const progressRef = useRef(null);

  const handleOnClick = useCallback(async () => {
    const previous_animation = progressRef.current.getAnimations()[0];

    if (previous_animation && previous_animation.playState === "running") {
      // cancel any previous animation if the button was pressed again while the current one was running
      previous_animation.cancel();
    }

    /** Start Reset animation styles */
    const commit = await progressRef.current?.animate(
      {
        width: ["0%"],
        backgroundColor: ["#47ff63"],
        opacity: [1],
      },
      { duration: 0.0000001, fill: "forwards" }
    );
    await commit.finished;
    commit.commitStyles();
    /** End Reset animation styles */

    // this one works too
    // const animation = progressRef.current?.animate(
    //   {
    //     width: ["100%"],
    //     backgroundColor: ["#6347ff"],
    //   },
    //   { duration: 1500, fill: "forwards" }
    // );
    // animation.onfinish = (e) => {
    //   progressRef.current?.animate(
    //     { opacity: [0] },
    //     { duration: 200, fill: "forwards" }
    //   );
    // };

    progressRef.current?.animate(
      {
        width: ["0%", "100%", "100%"],
        backgroundColor: ["#47ff63", "#6347ff", "#6347ff"],
        offset: [0, 0.8],
        opacity: [1, 1, 0],
      },
      { duration: 1700 }
    );
  }, []);

  const { absoluteFill, button, buttonText, container, progress } = styles;

  return (
    <div className={container}>
      <div className={button} onClick={handleOnClick}>
        <div className={absoluteFill}>
          <div
            ref={progressRef}
            className={progress}
            /** Uncomment to see another style of progress */
            // style={{ height: 5, top: "unset", bottom: 0 }}
          />
        </div>
        <div className={buttonText}>Get it!</div>
      </div>
    </div>
  );
}

/** helper functions to interpolate colors */
/** In a real application, you would interpolate the progress with and color off of a progress value from 0 to 1
 *
 * or play and pause the animation based on the progress of an async request
 *
 * or you will have to be manipulating the startTime of the progress animation based on progress of your task.
 * When you manipulate the starTime, you basically control where you want the animation to start from
 * See this to have an idea https://stackoverflow.com/questions/65501631/js-how-to-sync-timing-of-multiple-animations
 *
 *
 * If you want to use interpolation these links will help
 * https://www.trysmudford.com/blog/linear-interpolation-functions/
 * https://stackoverflow.com/questions/66123016/interpolate-between-two-colours-based-on-a-percentage-value
 *  */
