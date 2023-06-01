import { useCallback, useMemo, useRef, useState } from "react";
import styles from "../css/styles.module.css";
import images from "../imgs";

const initialState = {
  activeImage: null,
  activeIndex: null,
  savedMeasurements: null,
};

export default function PhotoGridSharedElement() {
  const gridImages = useRef({}); // contains a map of all the imageRef. The index will be the key to access any imageRef
  const viewImageRef = useRef(null); // the space that the clicked image will occupy after clicked
  const imageDetailRef = useRef(null);
  const imageDetailsContentRef = useRef(null);
  const imageDetailAnimation = useRef(null); // keep reference to the animation so that we can easily reverse it
  const imageDetailsContentAnimation = useRef(null); // keep reference to the animation so that we can easily reverse it
  const [state, setState] = useState(initialState);

  const {
    absoluteFill,
    close,
    closeText,
    container,
    grid,
    gridImage,
    imageDetailsContainer,
    imageDetailsContent,
    imageDetailsTopContent,
    viewImage,
    scrollView,
    title,
  } = styles;

  const { activeImage, activeIndex, savedMeasurements } = state;

  const handleOpenImage = useCallback((index) => {
    let { width, height, top, left } =
      gridImages.current[index].getBoundingClientRect();

    setState({
      // initial position measurements
      savedMeasurements: {
        // save position
        top,
        left,
        //save size
        width,
        height,
      },

      activeImage: images[index], //set our active image to the image we clicked
      /**
       * Set the active index to know the image in grid we want to hide so that
       * we can put the image shared with the modalView in that exact spot :)
       *
       * Helps the transition looks smooth!
       */
      activeIndex: index,
    });

    // we measure the space (final position) that the image we replace will occupy after we have set the `initial position` and size
    let {
      width: tWidth,
      height: tHeight,
      top: tTop,
      left: tLeft,
    } = viewImageRef.current.getBoundingClientRect();

    const config = {
      duration: 400,
      fill: "forwards",
      easing: "cubic-bezier(.91,.8,.54,1.39)", //bounce
    };

    imageDetailAnimation.current = new Animation(
      new KeyframeEffect(
        imageDetailRef.current,
        {
          top: [`${tTop}px`],
          left: [`${tLeft}px`],
          width: [`${tWidth}px`],
          height: [`${tHeight}px`],
        },
        config
      ),
      document.timeline
    );

    imageDetailsContentAnimation.current = new Animation(
      new KeyframeEffect(
        imageDetailsContentRef.current,
        { transform: ["translateY(0px)"], opacity: 1 },
        { ...config, easing: "ease-in" }
      ),
      document.timeline
    );

    imageDetailAnimation.current.play();
    imageDetailsContentAnimation.current.play();
  }, []);

  const handleClose = useCallback(() => {
    const config = {
      duration: 250,
      easing: "ease-out",
    };

    imageDetailAnimation.current.effect.updateTiming(config);
    imageDetailsContentAnimation.current.effect.updateTiming(config);

    imageDetailAnimation.current.reverse();
    imageDetailsContentAnimation.current.reverse();

    Promise.all([
      imageDetailAnimation.current.finished,
      imageDetailsContentAnimation.current.finished,
    ]).then(() => {
      setState((state) => ({ ...state, activeImage: null })); // toggle back `pointer-events`
    });
  }, []);

  // hide the image clicked on
  const activeIndexStyle = useMemo(
    () => ({ opacity: activeImage ? 0 : 1 }),
    [activeImage]
  );

  //measurements used to replace the hidden image clicked with the new image from the details page
  const activeImageStyle = useMemo(() => {
    if (savedMeasurements)
      return {
        width: savedMeasurements.width,
        height: savedMeasurements.height,
        top: savedMeasurements.top,
        left: savedMeasurements.left,
        opacity: activeImage ? 1 : 0,
      };
  }, [savedMeasurements, activeImage]);

  return (
    <div className={container}>
      <div style={{ maxHeight: "99.7vh" }}>
        <div className={scrollView}>
          <div className={grid}>
            {images.map((src, index) => {
              // we place an "empty" div there on the image clicked to be replaced with the image(on the details view) with thesame measurements. The we will animate that image
              const style =
                index === activeIndex ? activeIndexStyle : undefined;

              return (
                <img
                  key={index}
                  onClick={() => handleOpenImage(index)}
                  src={src}
                  className={[gridImage].join(" ")}
                  draggable={false}
                  style={style}
                  ref={(ref) => (gridImages.current[index] = ref)}
                  alt=""
                />
              );
            })}
          </div>
        </div>
        {/** the div that we will transition to. We render this view over the top of the scroll */}
        <div
          className={[absoluteFill, imageDetailsContainer].join(" ")}
          style={{ pointerEvents: activeImage ? "auto" : "none" }}
        >
          {/* final position (empty space) that the activeImage will occupy */}
          <div className={imageDetailsTopContent} ref={viewImageRef} />
          <img
            ref={imageDetailRef}
            src={activeImage}
            style={activeImageStyle}
            className={[viewImage].join(" ")}
            alt=""
          />

          {activeImage && (
            <div className={close} onClick={handleClose}>
              <span className={closeText}>X</span>
            </div>
          )}

          <div
            ref={imageDetailsContentRef}
            /** we will transition the image content in as well when the image is selected */
            className={[imageDetailsContent].join(" ")}
            /* this content is hidden initially from the user :). The we can move it in as we transition the active image as well */
            style={{ transform: "translateY(400px)", opacity: 0 }}
          >
            <span className={title}>Pretty Image from Unsplash</span>
            <br />
            <span>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              lobortis interdum porttitor. Nam lorem justo, aliquam id feugiat
              quis, malesuada sit amet massa. Sed fringilla lorem sit amet metus
              convallis, et vulputate mauris convallis. Donec venenatis
              tincidunt elit, sed molestie massa. Fusce scelerisque nulla vitae
              mollis lobortis. Ut bibendum risus ac rutrum lacinia. Proin vel
              viverra tellus, et venenatis massa. Maecenas ac gravida purus, in
              porttitor nulla. Integer vitae dui tincidunt, blandit felis eu,
              fermentum lorem. Mauris condimentum, lorem id convallis fringilla,
              purus orci viverra metus, eget finibus neque turpis sed turpis.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
