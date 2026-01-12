"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "motion/react";

export default function CompassArrow({ angle, onClick, ...props }) {
  const [rotation, setRotation] = useState(angle);
  const [deviceOrientation, setDeviceOrientation] = useState(false);

  useEffect(() => {
    setRotation((prevRotation) => {
      const currentVisualAngle = ((prevRotation % 360) + 360) % 360;

      let delta = angle - currentVisualAngle;

      if (delta > 180) delta -= 360;
      if (delta < -180) delta += 360;

      return prevRotation + delta;
    });
  }, [angle]);
  return (
    <motion.div
      animate={{ rotateZ: rotation }}
      className="origin-bottom"
      onClick={() => {
        setDeviceOrientation(onClick());
      }}
      {...props}
    >
      <Image
        src="/arrow-dark.svg"
        alt={"Arrow pointing in the direction of waffle house"}
        width={30}
        height={132}
        className="dark:hidden"
        priority
      />
      <Image
        src="/arrow-light.svg"
        alt={"Arrow pointing in the direction of waffle house"}
        width={30}
        height={132}
        className="dark:block hidden"
        priority
      />
    </motion.div>
  );
}
