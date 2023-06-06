import { useCallback, useEffect, useRef, useState } from "react";
import { FaCaretSquareDown } from "react-icons/fa";
import {
  MdFormatBold,
  MdFormatListBulleted,
  MdFormatListNumbered,
  MdFormatItalic,
  MdFormatUnderlined,
  MdInsertPhoto,
  MdLink,
} from "react-icons/md"; // https://react-icons.github.io/react-icons/icons?name=md
import styles from "../css/styles.module.css";

const config = {
  duration: 290,
  fill: "both",
  easing: "cubic-bezier(.53,.57,.04,.97)",
};

export default function EvolvingWriteButton() {
  const editorWrapRef = useRef(null);
  const editorToolBarRef = useRef(null);
  const editorTextAreaRef = useRef(null);
  const editorButtonRef = useRef(null);
  const inputRef = useRef(null);

  const editorWrapAnimation = useRef(null);
  const editorToolBarAnimation = useRef(null);
  const editorTextAreaAnimation = useRef(null);
  const editorButtonAnimation = useRef(null);

  const [state, setState] = useState({ open: false });
  const {
    absoluteFill,
    bar,
    buttonText,
    center,
    container,
    editor,
    rightInnerBar,
    toolbar,
    lowerView,
    input,
  } = styles;

  const toggleTransform = useCallback(async () => {
    if (state.open === false) {
      editorWrapAnimation.current?.updatePlaybackRate(1);
      editorToolBarAnimation.current?.updatePlaybackRate(1);
      editorTextAreaAnimation.current?.updatePlaybackRate(1);
      editorButtonAnimation.current?.updatePlaybackRate(1);

      await Promise.all([
        editorWrapAnimation.current?.ready,
        editorToolBarAnimation.current?.ready,
        editorTextAreaAnimation.current?.ready,
        editorButtonAnimation.current?.ready,
      ]);

      editorWrapAnimation.current?.play();
      editorToolBarAnimation.current?.play();
      editorTextAreaAnimation.current?.play();
      editorButtonAnimation.current?.play();
    } else {
      editorWrapAnimation.current?.reverse();
      editorToolBarAnimation.current?.reverse();
      editorTextAreaAnimation.current?.reverse();
      editorButtonAnimation.current?.reverse();
    }

    await Promise.all([
      editorWrapAnimation.current?.finished,
      editorToolBarAnimation.current?.finished,
      editorTextAreaAnimation.current?.finished,
      editorButtonAnimation.current?.finished,
    ]);

    state.open
      ? inputRef.current.blur() //here we are heading towards not opening the editor, so we blur out the keyboard
      : inputRef.current.focus();

    setState((state) => ({
      open: !state.open,
    }));
  }, [state.open]);

  useEffect(() => {
    editorWrapAnimation.current = new Animation(
      new KeyframeEffect(
        editorWrapRef.current,
        {
          width: ["12%", "90%", "90%"], // we want the editor to be at full width at half of the animation
          offset: [0, 0.5, 1],
        },
        config
      ),
      document.timeline
    );

    editorToolBarAnimation.current = new Animation(
      new KeyframeEffect(
        editorToolBarRef.current,
        {
          opacity: [0, 1, 1], // after half of the animation, we want the toolbar visible
          offset: [0, 0.5, 1],
        },
        config
      ),
      document.timeline
    );

    editorTextAreaAnimation.current = new Animation(
      new KeyframeEffect(
        editorTextAreaRef.current,
        {
          height: ["0px", "0px", "150px"],
          opacity: [0, 0.7, 1],
          offset: [0, 0.7, 1],
        },
        config
      ),
      document.timeline
    );

    editorButtonAnimation.current = new Animation(
      new KeyframeEffect(
        editorButtonRef.current,
        { opacity: [1, 0, 0], offset: [0, 0.5, 1] },
        config
      ),
      document.timeline
    );
  }, []);

  return (
    <div className={container}>
      {
        <div ref={editorWrapRef} className={editor}>
          <div className={bar}>
            <div ref={editorToolBarRef} className={toolbar}>
              <MdFormatBold color="#FFF" size={30} />
              <MdFormatItalic color="#FFF" size={30} />
              <MdFormatUnderlined color="#FFF" size={30} />
              <MdFormatListBulleted color="#FFF" size={30} />
              <MdFormatListNumbered color="#FFF" size={30} />
              <div className={rightInnerBar}>
                <MdLink color="#FFF" size={30} />
                <MdInsertPhoto color="#FFF" size={30} />
                <FaCaretSquareDown color="#FFF" size={30} />
              </div>
            </div>

            {/** this button will stay in the center and the toolbar grow or shrink in width */}
            <div
              ref={editorButtonRef}
              className={[absoluteFill, center].join(" ")}
              style={{
                pointerEvents: state.open ? "none" : "auto",
                cursor: "pointer",
              }}
              onClick={toggleTransform}
            >
              <span className={buttonText}>Write</span>
            </div>
          </div>

          <div ref={editorTextAreaRef} className={lowerView}>
            <textarea
              placeholder="Start writing ... "
              // we use absoluteFill for the input so that the input can grow or shrink as we animate the wrapper div
              className={[absoluteFill, input].join(" ")}
              ref={inputRef}
            />
          </div>
        </div>
      }
    </div>
  );
}
