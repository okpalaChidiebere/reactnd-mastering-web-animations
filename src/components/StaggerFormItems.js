import { useCallback, useLayoutEffect, useRef } from "react";
import styles from "../css/styles.module.css";

export default function StaggerFormItems() {
  const emailRef = useRef(null); // use to focus first the email once out entrance animation is complete
  const passwordRef = useRef(null);
  const buttonRef = useRef(null);

  // entrance animation style function
  const createAnimationStyle = useCallback(
    () => ({
      opacity: [0, 1], // the opacity of all form items must be hidden (value 0) from the start in the css
      transform: ["translateY(-5px)", "translateY(0px)"],
    }),
    []
  );

  const focusFirst = useCallback(() => {
    emailRef.current?.focus();
  }, []);

  useLayoutEffect(() => {
    const getConfig = (delay) => ({
      duration: 200,
      fill: "forwards",
      delay,
    });

    //we have a stagger of 100ms between each animation
    Promise.all([
      emailRef.current?.animate(createAnimationStyle(), getConfig(50)).finished,
      passwordRef.current?.animate(createAnimationStyle(), getConfig(150))
        .finished,
      buttonRef.current?.animate(createAnimationStyle(), getConfig(250))
        .finished,
    ]).then(focusFirst);
  }, [createAnimationStyle, focusFirst]);

  const { absoluteFill, button, buttonText, container, form, input, title } =
    styles;
  return (
    <div className={container}>
      <div
        className={absoluteFill}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className={form}>
          <div className={title}>Login</div>
          <input
            ref={emailRef}
            type="text"
            className={input}
            placeholder="Email"
            inputMode="email"
          />
          <input
            ref={passwordRef}
            placeholder="Password"
            className={input}
            type="password"
          />
          <button ref={buttonRef} className={button}>
            <span className={buttonText}>Login</span>
          </button>
        </div>
      </div>
    </div>
  );
}
