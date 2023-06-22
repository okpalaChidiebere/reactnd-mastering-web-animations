import { useCallback, useRef } from "react";
import styles from "../css/styles.module.css";
import Moment from "./Moment";

const { innerWidth: width } = window;

const Images = [
  { image: require("../images/Image1.jpg"), title: "Vodca Cran" },
  { image: require("../images/Image10.jpg"), title: "Old Fashion" },
  { image: require("../images/Image11.jpg"), title: "Mule" },
  { image: require("../images/Image12.jpg"), title: "Strawberry DiaQuir" },
];

const getAnimatedStyle = (scrollLeftPosition, i, elemRef) => {
  //check the element is entering the screen
  const isEntering =
    scrollLeftPosition > 0 &&
    scrollLeftPosition > (i - 1) * width &&
    scrollLeftPosition < i * width;

  const inputRange = [
    (i - 1) * width, // set up the translateX for the image before it is swiped to
    i * width, // the translateX for when we are at the image
    (i + 1) * width, //the translateX after we have swiped away from the image
  ];

  const outputRange =
    i === 0
      ? // here we are at the first index
        [0, 0, 150]
      : /**
         * - The image will be -300 as we are swiping towards it
         * - When at width we do don't translate (we move towards 0)
         * - The image will translate 150 left as we swipe past it
         */
        [-300, 0, 150];

  // the image will will hidden from the entrance and gradually go into full opacity and the element exits the screen it gradually fades out too
  const imageTranslateX = isEntering
    ? //entering range interpolation
      range(
        ...inputRange.slice(0, 2),
        ...outputRange.slice(0, 2),
        scrollLeftPosition
      )
    : //exiting range interpolation
      range(
        ...inputRange.slice(-2),
        ...outputRange.slice(-2),
        scrollLeftPosition
      );

  elemRef.style.transform = `translateX(${imageTranslateX}px)`;
};

export default function HorizontalParallaxScroll() {
  const moments = useRef({});
  const { container, scrollDiv } = styles;
  return (
    <div className={container}>
      <div
        className={scrollDiv}
        onScroll={useCallback((e) => {
          const scrollValue = e.target.scrollLeft;
          Object.values(moments.current).forEach((ref, index) => {
            getAnimatedStyle(scrollValue, index, ref);
          });
        }, [])}
      >
        {Images.map((props, i) => {
          return (
            <Moment
              key={i}
              ref={(ref) => (moments.current[i] = ref)}
              {...props} //pass on the image properties as props "image" and "title"
            />
          );
        })}
      </div>
    </div>
  );
}

const lerp = (x, y, a) => x * (1 - a) + y * a;
const invlerp = (x, y, a) => clamp((a - x) / (y - x));
const clamp = (a, min = 0, max = 1) => Math.min(max, Math.max(min, a));
const range = (x1, y1, x2, y2, a) => lerp(x2, y2, invlerp(x1, y1, a));
