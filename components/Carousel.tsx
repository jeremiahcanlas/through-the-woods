import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Image, Button } from "@chakra-ui/react";
import { wrap } from "popmotion";
import styles from "../styles/Carousel.module.scss";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";

const MotionImage = motion(Image);

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

/**
 * Experimenting with distilling swipe offset and velocity into a single variable, so the
 * less distance a user has swiped, the more velocity they need to register as a swipe.
 * Should accomodate longer swipes and short flicks without having binary checks on
 * just distance thresholds and velocity > 0.
 */
// const swipeConfidenceThreshold = 10000;
// const swipePower = (offset: number, velocity: number) => {
//   return Math.abs(offset) * velocity;
// };

const Carousel = ({ images }) => {
  const [[page, direction], setPage] = useState([0, 0]);

  // We only have 3 images, but we paginate them absolutely (ie 1, 2, 3, 4, 5...) and
  // then wrap that within 0-2 to find our image ID in the array below. By passing an
  // absolute page index as the `motion` component's `key` prop, `AnimatePresence` will
  // detect it as an entirely new image. So you can infinitely paginate as few as 1 images.
  const imageIndex = wrap(0, images.length, page);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <>
      <AnimatePresence initial={false} custom={direction}>
        <MotionImage
          className="trail-image"
          key={page}
          src={images[imageIndex]}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          position={"absolute"}
          maxW={"100%"}
          maxH={"100%"}
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          // drag="x"
          // dragConstraints={{ left: 0, right: 0 }}
          // dragElastic={1}
          // onDragEnd={({ offset, velocity }) => {
          //   const swipe = swipePower(offset.x, velocity.x);

          //   if (swipe < -swipeConfidenceThreshold) {
          //     paginate(1);
          //   } else if (swipe > swipeConfidenceThreshold) {
          //     paginate(-1);
          //   }
          // }}
        />
      </AnimatePresence>

      {images.length > 1 && (
        <>
          <Button
            right={["1px"]}
            position={"absolute"}
            className={styles.next}
            textColor={"white"}
            leftIcon={<HiOutlineChevronRight />}
            onClick={() => paginate(1)}
          />

          <Button
            left={["1px"]}
            position={"absolute"}
            className={styles.prev}
            leftIcon={<HiOutlineChevronLeft />}
            onClick={() => paginate(-1)}
          />
        </>
      )}
    </>
  );
};

export default Carousel;
