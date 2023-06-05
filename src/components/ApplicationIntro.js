import { useCallback, useRef } from "react";
import styles from "../css/styles.module.css";
import * as Images from "../imgs";

const { innerWidth: width } = window;

const screen1Styles = (elem, scrollLeftPosition) => {
  // 0 - represents the position when screen1 is in the viewport
  // width - represents the position when screen2 is not in the viewport and screen1 is out of viewport to the left of the screen
  const image2TranslateX = range(0, width, 0, -100, scrollLeftPosition);
  elem.style.transform = `translateX(${image2TranslateX}px)`;
};

// this one has an entrance and exit animations
const screen2Styles = (elem, scrollLeftPosition) => {
  // 0 -  represents the element position from the entrance (when the screen2 not in viewport but is the div to be shown in the viewport on the next scroll)
  // width - represents the stable position of this screen  (when screen2 is into viewPort)
  // width * 2 -  represents the exit position (when the screen2 has passed and screen3 is into viewPort)

  //check the element is entering the screen
  const isEntering = scrollLeftPosition > 0 && scrollLeftPosition < width;

  const image2TranslateX = range(0, width * 2, 100, -100, scrollLeftPosition);
  // the image will will hidden from the entrance and gradually go into full opacity and the element exits the screen it gradually fades out too
  const image2Opacity = isEntering
    ? range(0, width, 0, 1, scrollLeftPosition) //entering range interpolation
    : range(width, width * 2, 1, 0, scrollLeftPosition); //exiting range interpolation

  elem.style.transform = `translateY(${image2TranslateX}px)`;
  elem.style.opacity = image2Opacity;
};

const screen3Styles = (image1, image2, scrollLeftPosition) => {
  const outOfViewPortToTheRight = width;
  const inViewPort = width * 2;
  const outOfViewPortToTheLeft = width * 3;

  const isEntering =
    scrollLeftPosition > outOfViewPortToTheRight &&
    scrollLeftPosition < inViewPort;

  const image2Rotate = isEntering
    ? range(outOfViewPortToTheRight, inViewPort, -180, 0, scrollLeftPosition) //entering range interpolation
    : range(inViewPort, outOfViewPortToTheLeft, 0, 180, scrollLeftPosition); //exiting range interpolation

  const scale = isEntering
    ? range(outOfViewPortToTheRight, inViewPort, 0, 1, scrollLeftPosition) //entering range interpolation
    : range(inViewPort, outOfViewPortToTheLeft, 1, 0, scrollLeftPosition); //exiting range interpolation
  image1.style.transform = `scale(${scale})`;

  image2.style.transform = `scale(${scale}) rotate(${image2Rotate}deg)`;
};

export default function ApplicationIntro() {
  const screen1Image2Ref = useRef(null);
  const screen2Image2Ref = useRef(null);
  const screen3Image1Ref = useRef(null);
  const screen3Image2Ref = useRef(null);

  const { container, screenHeader, screenText, scrollDiv } = styles;

  const handleOnScroll = useCallback((e) => {
    screen1Styles(screen1Image2Ref.current, e.target.scrollLeft);
    screen2Styles(screen2Image2Ref.current, e.target.scrollLeft);
    screen3Styles(
      screen3Image1Ref.current,
      screen3Image2Ref.current,
      e.target.scrollLeft
    );
  }, []);
  return (
    <div className={container}>
      {/**
       * If you want to control the scroll using clicks you can check this example
       * https://stackoverflow.com/questions/74871193/how-to-set-scrollleft-in-js-while-scroll-snapping-is-enabled
       *
       * You will need to use the scrollBy() or scrollTo() method though if you want to use the animations
       * https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollBy
       * https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollTo
       *
       * More to explore
       * https://stackoverflow.com/questions/75011916/scrolling-multiple-div-with-variable-content-length-simultaneously-at-the-same-r
       */}
      <div className={scrollDiv} onScroll={handleOnScroll}>
        {/** Screen 1 */}
        <div>
          <div className={screenHeader}>
            <img
              src={Images.Image1}
              style={{ width: 300, height: 252, objectFit: "contain" }}
              alt=""
            />
            <img
              ref={screen1Image2Ref}
              src={Images.Image2}
              style={{
                width: 184,
                height: 112,
                position: "absolute",
                top: 215,
                left: 400,
                objectFit: "contain",
              }}
              alt=""
            />
            <img
              src={Images.Image3}
              style={{
                width: 92,
                height: 68,
                position: "absolute",
                top: 150,
                left: 400,
                objectFit: "contain",
              }}
              alt=""
            />
          </div>
          <div className={screenText}>
            <span>screen 1</span>
          </div>
        </div>
        {/** Screen 2 */}
        <div>
          <div className={screenHeader}>
            <img
              src={Images.Image1}
              style={{ width: 300, height: 252, objectFit: "contain" }}
              alt=""
            />
            <img
              ref={screen2Image2Ref}
              src={Images.Image2}
              style={{
                width: 184,
                height: 112,
                position: "absolute",
                top: 215,
                left: 400,
                objectFit: "contain",
              }}
              alt=""
            />
            <img
              src={Images.Image3}
              style={{
                width: 92,
                height: 68,
                position: "absolute",
                top: 150,
                left: 400,
                objectFit: "contain",
              }}
              alt=""
            />
          </div>
          <div className={screenText}>
            <span>screen 2</span>
          </div>
        </div>
        {/** Screen 3 */}
        <div>
          <div className={screenHeader}>
            <img
              ref={screen3Image1Ref}
              src={Images.Image1}
              style={{ width: 300, height: 252, objectFit: "contain" }}
              alt=""
            />
            <img
              ref={screen3Image2Ref}
              src={Images.Image2}
              style={{
                width: 184,
                height: 112,
                position: "absolute",
                top: 215,
                left: 400,
                objectFit: "contain",
              }}
              alt=""
            />
            <img
              src={Images.Image3}
              style={{
                width: 92,
                height: 68,
                position: "absolute",
                top: 150,
                left: 400,
                objectFit: "contain",
              }}
              alt=""
            />
          </div>
          <div className={screenText}>
            <span>screen 3</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const lerp = (x, y, a) => x * (1 - a) + y * a;
const invlerp = (x, y, a) => clamp((a - x) / (y - x));
const clamp = (a, min = 0, max = 1) => Math.min(max, Math.max(min, a));
const range = (x1, y1, x2, y2, a) => lerp(x2, y2, invlerp(x1, y1, a));
