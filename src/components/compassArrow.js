"use client"
import Image from "next/image";
import { motion } from "motion/react"

export default function CompassArrow({ angle }) {
  return (
    <motion.div animate={{ rotateZ: angle }} className="origin-bottom">
      <Image
        src="/arrow.svg"
        alt={"Arrow pointing in the direction of waffle house"}
        width={30}
        height={132}
        priority
      />
    </motion.div>
  );
}
