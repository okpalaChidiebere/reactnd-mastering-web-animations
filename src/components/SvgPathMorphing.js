import { useCallback, useState } from "react";
import styles from "../css/styles.module.css";

const ic_tick = `M4.8,13.4 L9,17.6 M10.4,16.2 L19.6,7`;
const ic_cross = `M6.4,6.4 L17.6,17.6 M6.4,17.6 L17.6,6.4`;

export default function SvgPathMorphing() {
  const { container } = styles;

  const [state, setState] = useState({
    animations: [],
  });

  const handlePress = useCallback(() => {
    // animate the svg from tick to a cross
    setState((currState) => ({
      ...currState,
      animations: currState.animations.concat([
        <animate
          attributeName="d"
          attributeType="XML"
          values={ic_cross}
          begin="0s"
          dur="1.4s"
          fill="freeze" //freeze ensures the svg does not revert back once the animation is finished
          key={currState.animations.length}
        />,
      ]),
    }));

    // wait 1500ms then animate the svg back to tick
    setTimeout(() => {
      setState((currState) => ({
        ...currState,
        animations: currState.animations.concat([
          <animate
            attributeName="d"
            attributeType="XML"
            values={ic_tick}
            begin="0s"
            dur="1.4s"
            fill="freeze"
            key={currState.animations.length}
          />,
        ]),
      }));
    }, 1500);
  }, []);

  return (
    <div className={container}>
      <div onClick={handlePress}>
        <svg width={150} height={150}>
          <path
            id="p1"
            d={ic_tick}
            stroke="black"
            scale={3}
            strokeWidth={4}
            strokeLinecap="square"
          >
            {state.animations.map((m) => m)}
          </path>
        </svg>
      </div>
    </div>
  );
}

/**
 * documentation
 * https://developer.mozilla.org/en-US/docs/Web/SVG/Element/animate
 * https://developer.mozilla.org/en-US/docs/Web/SVG/Element/animateTransform
 * https://www.tiny.cloud/blog/guide-svg-animation/
 */
