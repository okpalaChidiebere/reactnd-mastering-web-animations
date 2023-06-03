import styles from "../css/styles.module.css";
import { IoReloadCircle } from "react-icons/io5";
import { MdLocalDrink } from "react-icons/md";
import { useCallback, useEffect, useRef } from "react";

const config = {
  duration: 200,
  fill: "both",
};

export default function FABWithMenu() {
  const reloadBtnRef = useRef(null);
  const orderBtnRef = useRef(null);
  const payBtnTextRef = useRef(null);
  const reloadBtnTextRef = useRef(null);
  const orderBtnTextRef = useRef(null);
  const backgroundRef = useRef(null);

  const backgroundAnimation = useRef(null);
  const reloadAnimation = useRef(null);
  const orderAnimation = useRef(null);
  const reloadBtnAnimation = useRef(null);
  const orderBtnAnimation = useRef(null);
  const payBtnAnimation = useRef(null);

  useEffect(() => {
    reloadAnimation.current = new Animation(
      new KeyframeEffect(
        reloadBtnRef.current,
        {
          transform: ["translateY(0px) scale(0)", "translateY(-70px) scale(1)"],
        },
        config
      ),
      document.timeline
    );

    orderAnimation.current = new Animation(
      new KeyframeEffect(
        orderBtnRef.current,
        {
          transform: [
            "translateY(0px) scale(0)",
            "translateY(-140px) scale(1)", // translateY is double the reload button
          ],
        },
        config
      ),
      document.timeline
    );

    const labelKeyFrames = {
      transform: [
        "translateX(-30px)",
        "translateX(-72px)", //80% of 90px which is 90 * .8
        "translateX(-90px)",
      ],
      opacity: [0, 0, 1], //we don't show the label until the 80% percentage of the animation
      offset: [0, 0.8, 1],
    };

    reloadBtnAnimation.current = new Animation(
      new KeyframeEffect(reloadBtnTextRef.current, labelKeyFrames, config),
      document.timeline
    );
    orderBtnAnimation.current = new Animation(
      new KeyframeEffect(orderBtnTextRef.current, labelKeyFrames, config),
      document.timeline
    );
    payBtnAnimation.current = new Animation(
      new KeyframeEffect(payBtnTextRef.current, labelKeyFrames, config),
      document.timeline
    );

    // scale the background out
    backgroundAnimation.current = new Animation(
      new KeyframeEffect(
        backgroundRef.current,
        {
          transform: ["scale(0)", "scale(50)"], //IDEALLY the increased scale number will be dynamic
        },
        config
      ),
      document.timeline
    );
  }, []);

  // for testing  :)
  // you can always check the state of your animations for testing
  //   useLayoutEffect(() => {
  //     reloadAnimation.current?.effect.updateTiming({ duration: 0.001 });
  //     orderAnimation.current?.effect.updateTiming({
  //       duration: 0.001,
  //     });

  //     reloadAnimation.current?.play();
  //     orderAnimation.current?.play();
  //   }, []);

  const { background, button, container, label, other, pay, payText } = styles;
  const toggleOpen = useCallback(async () => {
    if (
      !reloadAnimation.current?.currentTime &&
      !orderAnimation.current?.currentTime &&
      !orderBtnAnimation.current?.currentTime &&
      !reloadBtnAnimation.current?.currentTime &&
      !backgroundAnimation.current?.currentTime &&
      !payBtnAnimation.current?.currentTime
    ) {
      reloadAnimation.current?.updatePlaybackRate(1);
      orderAnimation.current?.updatePlaybackRate(1);
      reloadBtnAnimation.current?.updatePlaybackRate(1);
      orderBtnAnimation.current?.updatePlaybackRate(1);
      backgroundAnimation.current?.updatePlaybackRate(1);
      payBtnAnimation.current?.updatePlaybackRate(1);

      await Promise.all([
        reloadAnimation.current?.ready,
        orderAnimation.current?.ready,
        reloadBtnAnimation.current?.ready,
        orderBtnAnimation.current?.ready,
        backgroundAnimation.current?.ready,
        payBtnAnimation.current?.ready,
      ]);

      reloadAnimation.current?.play();
      orderAnimation.current?.play();
      reloadBtnAnimation.current?.play();
      orderBtnAnimation.current?.play();
      backgroundAnimation.current?.play();
      payBtnAnimation.current?.play();
      return;
    }
    reloadAnimation.current?.reverse();
    orderAnimation.current?.reverse();
    reloadBtnAnimation.current?.reverse();
    orderBtnAnimation.current?.reverse();
    backgroundAnimation.current?.reverse();
    payBtnAnimation.current?.reverse();
  }, []);
  return (
    <div className={container}>
      <div ref={backgroundRef} className={background} />
      <div ref={orderBtnRef} className={[button, other].join(" ")}>
        <span ref={orderBtnTextRef} className={label}>
          Order
        </span>
        <MdLocalDrink size={20} color="#555" />
      </div>
      <div ref={reloadBtnRef} className={[button, other].join(" ")}>
        <span ref={reloadBtnTextRef} className={label}>
          Reload
        </span>
        <IoReloadCircle size={20} color="#555" />
      </div>
      <div className={[button, pay].join(" ")} onClick={toggleOpen}>
        <span ref={payBtnTextRef} className={label}>
          Pay
        </span>
        <span className={payText}>$5.00</span>
      </div>
    </div>
  );
}
