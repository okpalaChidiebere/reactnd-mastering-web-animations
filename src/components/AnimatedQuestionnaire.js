import { useCallback, useMemo, useRef, useState } from "react";
import styles from "../css/styles.module.css";

const initialState = {
  index: 0, // our active index which we'll default to 0
  questions: [
    "Do you tend to follow directions when given?",
    "Are you comfortable with the idea of standing and doing light physical activity most of the day?",
    "Would you enjoy making sure your customers leave happy?",
    "Are you willing to work nights and weekends (and possibly holidays)?",
  ],
};
const { innerWidth: width } = window;

export default function AnimatedQuestionnaire() {
  const [state, setState] = useState(initialState);
  const currentQuestionRef = useRef(null);
  const nextQuestionRef = useRef(null);
  const progressBarRef = useRef(null);

  const { questions, index } = state;
  const {
    absoluteFill,
    bar,
    container,
    close,
    closeText,
    option,
    optionText,
    overlay,
    progress,
    questionText,
    yes,
  } = styles;

  /**
   * we will render the question at index 0 at the first question,
   * and the second question (index 1) that will sit offscreen that
   * can translate in at thesame time we translate out the first question
   * */
  const question = useMemo(() => questions[index], [index, questions]);
  const nextQuestion = useMemo(() => {
    //if the next question is inside our array, we get the next question
    if (index + 1 < questions.length) return questions[index + 1];
    return null;
  }, [index, questions]);

  // translate the next question way off the screen to the right
  const nextStyle = useMemo(
    () => ({ transform: `translateX(${width}px)` }),
    []
  );

  const reset = useCallback(() => {
    progressBarRef.current.style.width = "0%"; //reset the bar
    setState((currState) => ({
      ...currState,
      index: 0,
    }));
  }, []);

  const handleAnswer = useCallback(async () => {
    // we want the animation to properties to not be retained (reset back to original value) so we will leave the default `fill` config value which is "none"
    // so we can prepare for new animations for the next question properly
    const config = { duration: 400, fill: "forwards" };
    const howFar = invlerp(0, questions.length, index + 1);

    const questionAnimation = new Animation(
      new KeyframeEffect(
        currentQuestionRef.current,
        { transform: [`translateX(${-width}px)`] },
        config
      ),
      document.timeline
    );

    const nextQuestionAnimation = new Animation(
      new KeyframeEffect(
        nextQuestionRef.current,
        { transform: [`translateX(${0}px)`] },
        config
      ),
      document.timeline
    );

    const progressBarAnimation = new Animation(
      new KeyframeEffect(
        progressBarRef.current,
        { width: `${howFar * 100}%` },
        { ...config, composite: "replace" }
      ),
      document.timeline
    );

    // parallel animations
    questionAnimation.play();
    nextQuestionAnimation.play();
    progressBarAnimation.play();

    // wait for all the animations to finish
    await Promise.all([
      questionAnimation.finished,
      nextQuestionAnimation.finished,
      progressBarAnimation.finished,
    ]);

    /** reset animations properly */
    nextQuestionAnimation.commitStyles();
    questionAnimation.commitStyles();
    progressBarAnimation.commitStyles();

    /** reset animations properly */
    questionAnimation.cancel();
    nextQuestionAnimation.cancel();
    progressBarAnimation.cancel();

    // update state
    setState((currState) => ({
      ...currState,
      index: currState.index + 1, //this causes the next question to be the main question and we have new next question
    }));
  }, [questions.length, index]);
  return (
    <div className={container}>
      <div className={[absoluteFill, overlay].join(" ")}>
        <span
          ref={currentQuestionRef}
          /**
           * It is key is IMPORTANT to add so that react can properly re-render the question
           * to avoid unnecessary flashes as you update the question */
          key={question}
          className={questionText}
        >
          {question}
        </span>
        <span
          ref={nextQuestionRef}
          className={questionText}
          style={nextStyle}
          /**
           * It is key is IMPORTANT to add so that react can properly re-render the question
           * to avoid unnecessary flashes as you update the question */
          key={nextQuestion}
        >
          {nextQuestion}
        </span>
      </div>
      <div className={progress}>
        <div ref={progressBarRef} className={bar} />
      </div>
      <div onClick={handleAnswer} className={option}>
        <span className={optionText}>No</span>
      </div>
      <div onClick={handleAnswer} className={[option, yes].join(" ")}>
        <span className={optionText}>Yes</span>
      </div>
      <div className={close} onClick={reset}>
        <span className={closeText}>X</span>
      </div>
    </div>
  );
}

const clamp = (a, min = 0, max = 1) => Math.min(max, Math.max(min, a));
const invlerp = (x, y, a) => clamp((a - x) / (y - x));
