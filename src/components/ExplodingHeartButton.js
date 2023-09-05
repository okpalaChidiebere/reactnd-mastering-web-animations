import { createRef, forwardRef, useCallback, useMemo, useState } from "react";
import styles from "../css/styles.module.css";

const getTransformationAnimation = (elemRef, scale, y, x, rotate, opacity) => {
  return new Animation(
    new KeyframeEffect(
      elemRef.current,
      {
        transform: [
          `translateX(0px) translateY(0px) scale(0) rotate(0)`,
          `translateX(${x}px) translateY(${y}px) scale(${scale}) rotate(${rotate})`,
        ],
        opacity: [0, opacity],
      },
      {
        duration: 200,
        fill: "both",
        easing: "cubic-bezier(.91,.8,.54,1.39)", //bounce
      }
    ),
    document.timeline
  );
};

export default function ExplodingHeartButton() {
  const [state, setState] = useState({
    liked: false,
    animations: [
      {
        ref: createRef(),
        scale: 0.8,
        y: -60,
        x: 0,
        rotate: "35deg",
        opacity: 0.8,
      },
      {
        ref: createRef(),
        scale: 0.3,
        y: -120,
        x: -120,
        rotate: "-35deg",
        opacity: 0.7,
      },
      {
        ref: createRef(),
        scale: 0.3,
        y: -150,
        x: 120,
        rotate: "-35deg",
        opacity: 0.6,
      },
      {
        ref: createRef(),
        scale: 0.8,
        y: -120,
        x: -40,
        rotate: "-45deg",
        opacity: 0.3,
      },
      {
        ref: createRef(),
        scale: 0.7,
        y: -120,
        x: 40,
        rotate: "45deg",
        opacity: 0.5,
      },
      {
        ref: createRef(),
        scale: 0.4,
        y: -280,
        x: 0,
        rotate: "10deg",
        opacity: 0.7,
      },
    ],
  });

  const { center, container } = styles;

  const triggerLike = useCallback(async () => {
    setState((state) => ({ ...state, liked: !state.liked }));

    const animations = state.animations.map((a) =>
      getTransformationAnimation(a.ref, a.scale, a.y, a.x, a.rotate, a.opacity)
    );

    // set up the stagger animation config
    for (const index in animations) {
      animations[index].effect.updateTiming({
        delay: 50 * (Number(index) + 1),
        ...(Number(index) === animations.length - 1 && { endDelay: 100 }), // cause a delay to simulate sequence animation to hide the hearts after showing them
      });
    }

    // show animations
    animations.forEach((a) => a.play());

    // wait for the show animations to finish
    await Promise.all(animations.map((a) => a.finished));

    // hide animations
    animations.forEach((a) => a.reverse());
  }, [state.animations]);

  return (
    <div className={[container, center].join(" ")}>
      <div>
        <Heart filled ref={state.animations[5].ref} />
        <Heart filled ref={state.animations[4].ref} />
        <Heart filled ref={state.animations[3].ref} />
        <Heart filled ref={state.animations[2].ref} />
        <Heart filled ref={state.animations[1].ref} />
        <Heart filled ref={state.animations[0].ref} />
      </div>
      <span onClick={triggerLike}>
        <Heart filled={state.liked} />
      </span>
    </div>
  );
}

const Heart = forwardRef((props, ref) => {
  const { empty, emptyFill, heart, filledHeart, fit } = styles;
  const { filled, style } = props;
  const fillStyle = useMemo(
    () => (filled ? filledHeart : empty),
    [filled, empty, filledHeart]
  );

  const centerNonFilled = (
    <div className={[fit].join(" ")}>
      <div className={[heart, emptyFill].join(" ")} />
    </div>
  );

  return (
    <div {...{ ref, style }}>
      <div className={[heart, fillStyle].join(" ")} />
      {!filled && centerNonFilled}
    </div>
  );
});
