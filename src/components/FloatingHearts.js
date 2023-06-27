import {
  createRef,
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "../css/styles.module.css";

export default function FloatingHearts() {
  const dimens = useRef({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [state, setState] = useState({
    hearts: [],
  });
  const { absoluteFill, container } = styles;
  const { hearts } = state;

  const handleAddHeart = useCallback(() => {
    const ref = createRef(null);
    //NOTE: we wanted to make sure that all of the state has flushed through thats is why we passed the callback to setState
    setState((currState) => ({
      hearts: [
        ...currState.hearts,
        {
          start: getRandomInt(100, dimens.current.width - 100), //a starting position along the bottom of the screen
          ref,
        },
      ],
    }));
  }, []);

  const animateStyle = useCallback((elem, leftPosition) => {
    elem.style.left = `${leftPosition}px`;
    const d = dimens.current.height - 50;
    const animation = new Animation(
      new KeyframeEffect(
        elem,
        {
          transform: [
            `translateX(0px) translateY(${d}px) scale(0)`,
            `translateX(0px) translateY(${d * 0.95}px) scale(1.2)`,
            `translateX(0px)translateY(${d * 0.9}px) scale(1)`,

            `translateX(15px) translateY(${d * 0.7}px) scale(1) `,
            `translateX(-15px) translateY(${d * 0.5}px) scale(1) `,
            `translateX(15px) translateY(${d * 0.3}px) scale(1) `,
            `translateX(-15px) translateY(${d * 0.1}px) scale(1) `,
            `translateX(15px) translateY(${d * 0.05}px) scale(1) `,

            `translateX(-15px) translateY(0px) scale(1) `,
          ],
          opacity: [1, 0.75, 0.5, 0.25, 0, 0, 0, 0, 0],
          offset: [0, 0.05, 0.1, 0.3, 0.5, 0.7, 0.9, 0.95, 1],
        },
        { duration: 3000, fill: "forwards" }
      ),
      document.timeline
    );
    animation.play();
  }, []);

  const handleWindowResize = useCallback(() => {
    dimens.current = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }, []);

  useEffect(() => {
    const newHeartToAnimate = hearts[hearts.length - 1];
    // console.log(newHeartToAnimate?.ref.current);
    if (newHeartToAnimate?.ref) {
      animateStyle(newHeartToAnimate?.ref.current, newHeartToAnimate.start);
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [hearts, animateStyle, handleWindowResize]);

  return (
    <div className={container}>
      <div className={absoluteFill} onClick={handleAddHeart}>
        {hearts.map(({ ref }, index) => {
          return <Heart key={index} ref={ref} />;
        })}
      </div>
    </div>
  );
}

const Heart = forwardRef((props, ref) => {
  const { heart, heartShape, filledHeart, leftHeart, rightHeart } = styles;
  return (
    <div ref={ref} className={[heart].join(" ")}>
      <div className={[heartShape, leftHeart, filledHeart].join(" ")} />
      <div className={[heartShape, rightHeart, filledHeart].join(" ")} />
    </div>
  );
});

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
