import { useCallback, useEffect, useRef, useState } from "react";
import styles from "../css/styles.module.css";
import Cat1 from "../assets/cat1.jpeg";
import Cat2 from "../assets/cat2.jpeg";
import Cat3 from "../assets/cat3.jpeg";
import Cat4 from "../assets/cat4.jpeg";

const { innerWidth: width } = window;

/**
 * This is the direction distance in which we swipe that will determine
 * what a decision is
 */
const SWIPE_THRESHOLD = 300;

const initialState = [
  { image: Cat1, id: 1, text: "Sweet Cat" },
  { image: Cat2, id: 2, text: "Sweeter Cat" },
  { image: Cat3, id: 3, text: "Sweetest Cat" },
  { image: Cat4, id: 4, text: "Aww" },
];

export default function KittenCards() {
  const dragCard = useRef(null); // we will get the drag gesture on this card
  const nextCard = useRef(null); // this is used to reference the next card that will be show after the user swiped on the drag card
  const nopeTextRef = useRef(null); // we need a reference to the nope text to animate it
  const yupTextRef = useRef(null); // we need a reference to the yup text to animate it
  const startPoint = useRef(null);
  const [state, setState] = useState({
    items: initialState,
  });

  /**
   * This function enables use to re use the transitioning to the next card and popping of the arrays
   */
  const transitionNext = useCallback(async (isYesDecision = false) => {
    await Promise.all([
      // fade the top card away
      dragCard.current?.animate({ opacity: [0] }, 300).finished,
      // scale the next card in
      nextCard.current?.animate(
        { transform: ["scale(1)"] },
        {
          duration: 350,
          easing: "cubic-bezier(.91,.8,.54,1.39)", // bounce
          fill: "forwards",
        }
      ).finished,
    ]);

    //update the state
    setState((state) => ({ ...state, items: state.items.slice(1) }));
  }, []);

  const animateYupStyles = useCallback((opts) => {
    opts = Object.assign({ opacity: 0, scale: 0.5, duration: 300 }, opts);
    const { opacity, scale, duration } = opts;
    return yupTextRef.current.animate(
      { opacity: [opacity], transform: [`scale(${scale})`] },
      { duration, fill: "forwards" }
    );
  }, []);

  const animateNopeStyles = useCallback((opts) => {
    opts = Object.assign({ opacity: 0, scale: 0.5, duration: 300 }, opts);
    const { opacity, scale, duration } = opts;
    return nopeTextRef.current.animate(
      { opacity: [opacity], transform: [`scale(${scale})`] },
      { duration, fill: "forwards" }
    );
  }, []);

  const onEnd = useCallback(
    async (e) => {
      // if the user did not just finished dragging we make a early return
      if (!startPoint.current) return;

      const offsetX = e.clientX - startPoint.current.x; //dy

      //if the user has swiped far enough, for us to know they have made a decision
      if (Math.abs(offsetX) > SWIPE_THRESHOLD) {
        const userSwipedRight = offsetX > SWIPE_THRESHOLD;
        e.target.animate(
          {
            transform: [`translateX(${userSwipedRight ? width : width * -1}px`],
          },
          {
            duration: 300,
            fill: "forwards",
            easing: "cubic-bezier(0.045, 0.550, 1.000, 0.675)",
          }
        ).onfinish = () => transitionNext(userSwipedRight);
      } else {
        //we bounce the card back to the center since no decision is made
        e.target.animate(
          {
            transform: [`translate(${0}px, ${0}px) rotate(${0}deg)`],
            opacity: [1],
          },
          {
            duration: 300,
            fill: "forwards",
            easing: "cubic-bezier(.91,.8,.54,1.39)", // bounce
          }
        );

        animateYupStyles();
        animateNopeStyles();
      }

      //reset everything for the next swipe
      startPoint.current = null;
      dragCard.current.onmouseup = null;
      dragCard.current.onmousemove = null;
    },
    [transitionNext, animateNopeStyles, animateYupStyles]
  );

  const onActive = useCallback(
    (e) => {
      e.preventDefault();
      if (!startPoint.current) return;

      const { clientX, clientY } = e;
      const offsetX = clientX - startPoint.current.x; //dx
      const offsetY = clientY - startPoint.current.y; //dy
      const rotate = range(-300, 300, -30, 30, offsetX);
      const opacity = range(0, width / 2, 1, 0.5, Math.abs(offsetX));
      const yesOpacity = round(range(0, 150, 0, 1, offsetX));
      const yesScale = round(range(0, 150, 0.5, 1, offsetX));
      const noOpacity = round(range(-150, 0, 1, 0, offsetX));
      const noScale = round(range(-150, 0, 1, 0.5, offsetX));

      e.target.animate(
        {
          transform: [
            `translate(${offsetX}px, ${offsetY}px) rotate(${rotate}deg)`,
          ],
          opacity: [round(opacity)],
        },
        { duration: 0.01, fill: "forwards" }
      );

      animateYupStyles({
        opacity: yesOpacity,
        scale: yesScale,
        duration: 0.01,
      });
      animateNopeStyles({ opacity: noOpacity, scale: noScale, duration: 0.01 });
    },
    [animateNopeStyles, animateYupStyles]
  );

  const onStart = useCallback(
    (e) => {
      e.preventDefault();
      // we store the point of click(coords)
      startPoint.current = { x: e.clientX, y: e.clientY };

      dragCard.current.onmousemove = onActive; // call a function whenever the cursor moves:
      dragCard.current.onmouseup = onEnd;
      dragCard.current.onmouseout = onEnd; // call a function whenever the cursor leaves the page
    },
    [onActive, onEnd]
  );

  const handleNo = useCallback(async () => {
    await Promise.all([
      animateNopeStyles({ duration: 10, opacity: 1, scale: 1 }).finished,
      dragCard.current.animate(
        { transform: [`translateX(${width * -1}px) rotate(-30deg)`] },
        {
          duration: 300,
          fill: "forwards",
          easing: "cubic-bezier(0.045, 0.550, 1.000, 0.675)",
        }
      ).finished,
    ]);
    transitionNext(false);
  }, [animateNopeStyles, transitionNext]);

  const handleYes = useCallback(async () => {
    await Promise.all([
      dragCard.current.animate(
        { transform: [`translateX(${width}px) rotate(30deg)`] },
        {
          duration: 500,
          fill: "forwards",
          easing: "cubic-bezier(0.045, 0.550, 1.000, 0.675)",
        }
      ).finished,
      animateYupStyles({ duration: 10, opacity: 1, scale: 1 }).finished,
    ]);

    transitionNext(true);
  }, [transitionNext, animateYupStyles]);

  useEffect(() => {
    if (dragCard.current) {
      // handle our pan responder for just the first element
      dragCard.current.onmousedown = onStart;

      // prevent card from being dragged
      dragCard.current.ondragstart = (e) => e.preventDefault();
    }
  }, [state, onStart]);

  const {
    button,
    buttonBar,
    card,
    container,
    lowerText,
    nope,
    nopeButton,
    nopeText,
    top,
    yup,
    yupButton,
    yupText,
  } = styles;

  return (
    <div className={container}>
      <div className={top}>
        {state.items
          .slice(0, 2) // We only need to render the first and second item so we use slice(0, 2)
          /**
           * Since the card has position of absolute, this means the cards will be placed on top
           * of each other and last index of card will be at the top most. So we reverse the list
           *  to have the first index rendered last to make it the on at the top because it is the
           * one we want to provide our gestures to
           */
          .reverse()
          .map(({ image, id, text }, index, items) => {
            // we want the card at the back to be a bit smaller

            const isLastItem = index === items.length - 1; // top card
            const isSecondToLast = index === items.length - 2; //back bard
            // our pan to be able to drag just the card at the top
            const pan = isLastItem ? { ref: dragCard } : {};

            const nextCardRef = isSecondToLast ? { ref: nextCard } : {};

            const topCardStyle = isLastItem
              ? { pointerEvents: "auto", cursor: "pointer" }
              : undefined;
            const nextStyle = isSecondToLast
              ? {
                  pointerEvents: "none",
                  cursor: "none",
                  transform: "scale(.9)", // we want the card at the back to be a bit smaller
                }
              : undefined;

            return (
              <div
                key={id}
                {...pan}
                {...nextCardRef}
                style={{ ...topCardStyle, ...nextStyle }}
                className={card}
              >
                <img src={image} className={styles.image} alt="" />

                <span className={lowerText}>{text}</span>

                {isLastItem && (
                  <div ref={nopeTextRef} className={nope}>
                    <div className={nopeText}>Nope!</div>
                  </div>
                )}

                {isLastItem && (
                  <div ref={yupTextRef} className={yup}>
                    <div className={yupText}>Yup!</div>
                  </div>
                )}
              </div>
            );
          })}
      </div>
      <div className={buttonBar}>
        <div onClick={handleNo} className={[button, nopeButton].join(" ")}>
          <span className={nopeText}>NO</span>
        </div>
        <div onClick={handleYes} className={[button, yupButton].join(" ")}>
          <span className={yupText}>YES</span>
        </div>
      </div>
    </div>
  );
}

//see doc  https://www.trysmudford.com/blog/linear-interpolation-functions/
const lerp = (x, y, a) => x * (1 - a) + y * a;
const clamp = (a, min = 0, max = 1) => Math.min(max, Math.max(min, a));
const invlerp = (x, y, a) => clamp((a - x) / (y - x));
const range = (x1, y1, x2, y2, a) => lerp(x2, y2, invlerp(x1, y1, a));

const round = (v) => Math.round(v * 10) / 10;
