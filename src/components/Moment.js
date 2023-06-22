import { forwardRef } from "react";
import styles from "../css/styles.module.css";

const Moment = forwardRef(({ title, image }, ref) => {
  const {
    absoluteFill,
    center,
    momentContainer,
    image: sImage,
    title: sTitle,
    textWrap,
    separator,
  } = styles;

  return (
    <div className={[momentContainer, separator].join(" ")}>
      <img src={image} className={sImage} alt="" {...{ ref }} />
      <div className={[absoluteFill, center].join(" ")}>
        <div className={textWrap}>
          <span className={sTitle}>{title}</span>
        </div>
      </div>
    </div>
  );
});

export default Moment;
