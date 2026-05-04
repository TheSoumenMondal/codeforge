"use client";

import clsx from "clsx";
import { useLottie } from "lottie-react";
import animationData from "../../../public/lottiefiles/fire.json";

const FireComponent = ({ className }: { className?: string }) => {
  const defaultProps = {
    animationData: animationData,
    loop: true,
  };

  const { View } = useLottie(defaultProps);

  return <div className={clsx(className)}>{View}</div>;
};

export default FireComponent;
