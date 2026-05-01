import type React from "react";

type TProps = {
  children: React.ReactNode;
};

const layout = ({ children }: TProps) => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-full max-w-lg h-screen">{children}</div>
    </div>
  );
};

export default layout;
