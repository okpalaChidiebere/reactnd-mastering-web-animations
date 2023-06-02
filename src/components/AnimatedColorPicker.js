import { createRef, useCallback, useMemo, useRef, useState } from "react";
import { FaAlignCenter, FaLink, FaBold, FaItalic } from "react-icons/fa"; //https://react-icons.github.io/react-icons/icons?name=fa
import styles from "../css/styles.module.css";

const initialState = {
  color: "#000", //default color to black to drive the color in the input View
  /**We use this to control pointer events in the for the inputView. The inputs
   * View has an absoluteFill style that makes it display over the ActionView */
  inputOpen: false,
};

const config = {
  duration: 200,
  fill: "both", // all the animations are reversible (like toggle) we will use `both` property
  easing: "ease-out",
};

export default function AnimatedColorPicker() {
  const [state, setState] = useState(initialState);

  const okBtnRef = useRef(null);
  const rowRef = useRef(null);
  const inputTextRef = useRef(null); //we want to be able to control the focus of the inputText
  const colorRowRef = useRef(null);

  const colorRowAnimation = useRef(null);
  const iconAnimations = useRef(null);
  const rowAnimation = useRef(null);
  const buttonAnimation = useRef(null);
  const inputOpacityAnimation = useRef(null);

  const openTextEditor = useRef(false); //we don't care if the textEditor unmounts in this projects so we will not put the value in our state

  const icons = useMemo(
    () => [
      {
        getIcon(props) {
          return <FaBold {...props} />;
        },
        ref: createRef(null),
      },
      {
        getIcon(props) {
          return <FaItalic {...props} />;
        },
        ref: createRef(null),
      },
      {
        getIcon(props) {
          return <FaAlignCenter {...props} />;
        },
        ref: createRef(null),
      },
      {
        getIcon(props) {
          return <FaLink {...props} />;
        },
        ref: createRef(null),
      },
    ],
    []
  );

  const { color, inputOpen } = state;
  const {
    absoluteFill,
    button,
    colorBall,
    colorRowWrap,
    container,
    iconBtn,
    input,
    okayButton,
    okayText,
    row,
    rowWrap,
  } = styles;

  const toggleInput = useCallback(() => {
    setState((currstate) => ({
      ...currstate,
      inputOpen: !currstate.inputOpen,
    }));
    //we want to show of blur focus on the textInput field causing the keyboard to open or close
    if (inputOpen) {
      inputTextRef.current.blur();
    } else {
      inputTextRef.current.setSelectionRange(color.length, color.length); // place the cursor at the end of the text every time
      inputTextRef.current.focus();
    }

    if (
      buttonAnimation.current &&
      inputOpacityAnimation.current &&
      iconAnimations.current &&
      colorRowAnimation.current
    ) {
      buttonAnimation.current.reverse();
      inputOpacityAnimation.current.reverse();
      colorRowAnimation.current.reverse();
      iconAnimations.current.forEach((animation) => animation.reverse());

      //   Promise.all(iconAnimations.current.map((a) => a.finished)).then(() => {
      //     iconAnimations.current.forEach((a) => {
      //       a.commitStyles();
      //     });
      //   });
      return;
    }

    buttonAnimation.current = new Animation(
      new KeyframeEffect(
        okBtnRef.current,
        {
          transform: [
            "translateX(-250px) scale(0)",
            "translateX(0px) scale(1)",
          ],
        },
        config
      ),
      document.timeline
    );

    inputOpacityAnimation.current = new Animation(
      new KeyframeEffect(
        inputTextRef.current,
        {
          opacity: [0, 0, 1],
          offset: [0, 0.8, 1],
        },
        config
      ),
      document.timeline
    );

    colorRowAnimation.current = new Animation(
      new KeyframeEffect(
        colorRowRef.current,
        {
          opacity: [0, 1, 1],
          offset: [0, 0.001],
        },
        config
      ),
      document.timeline
    );

    /**
     * We want to move the icons to the left as it fades to have the swap effect
     * with the inputText and okButton
     */
    iconAnimations.current = icons.map(
      (icon) =>
        new Animation(
          new KeyframeEffect(
            icon.ref.current,
            {
              transform: [
                "translateX(0px)",
                "translateX(-6px)", // 30 * .2
                "translateX(-30px)",
              ],
              opacity: [1, 0, 0],
              offset: [0, 0.2, 1],
            },
            config
          ),
          document.timeline
        )
    );

    buttonAnimation.current.play();
    inputOpacityAnimation.current.play();
    colorRowAnimation.current.play();
    iconAnimations.current.forEach((animation) => animation.play());
  }, [inputOpen, icons, color]);

  const handleToggle = useCallback(() => {
    if (rowAnimation.current) {
      rowAnimation.current.reverse();

      // if the input is still open we want to close it
      if (inputOpen) toggleInput();
      return;
    }

    rowAnimation.current = new Animation(
      new KeyframeEffect(
        rowRef.current,
        {
          transform: [
            "translateY(150px) scale(0, 0)",
            "translateY(75px) scale(0, 0.5)",
            "translateY(0px) scale(1, 1)",
          ],
          opacity: [0, 0.5, 1],
          offset: [0, 0.5, 1],
        },
        config
      ),
      document.timeline
    );

    rowAnimation.current.play();

    openTextEditor.current = !openTextEditor.current;
  }, [toggleInput, inputOpen]);

  /** we want the background color of the colorAction button to be driven off our state */
  const colorStyle = useMemo(
    () => ({
      backgroundColor: color,
    }),
    [color]
  );

  return (
    <div className={container}>
      <div ref={rowRef} className={rowWrap}>
        <div className={colorBall} style={colorStyle} onClick={toggleInput} />
        <div className={row}>
          {icons.map(({ getIcon, ref }, index) => (
            <button ref={ref} key={index} className={iconBtn}>
              {getIcon({
                color: "#555",
                size: 22,
                style: { cursor: "pointer" },
              })}
            </button>
          ))}
        </div>
        <div /** The inputView position on top of the actionView( with actionIcons) */
          ref={colorRowRef}
          className={[absoluteFill, colorRowWrap].join(" ")}
          style={{
            /** Control the pointer events on this view. When it is none,
             * it means that the okButton is hidden and we can interact
             * with the actionItem icons */
            pointerEvents: inputOpen ? "auto" : "none",
          }}
        >
          <input
            ref={inputTextRef}
            value={color}
            className={input}
            type="text"
            onChange={(e) =>
              setState((currstate) => ({ ...currstate, color: e.target.value }))
            }
          />

          <div ref={okBtnRef} className={okayButton} onClick={toggleInput}>
            <span className={okayText}>OK</span>
          </div>
        </div>
      </div>
      <div onClick={handleToggle} className={button}>
        <span>Toggle Open/Closed</span>
      </div>
    </div>
  );
}
