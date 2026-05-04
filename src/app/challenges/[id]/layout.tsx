import type React from "react";
import Navbar from "@/components/features/challenge/Navbar";

type TProps = {
  children: React.ReactNode;
};

const layout = ({ children }: TProps) => {
  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="w-full h-[calc(100vh-3.5rem)]">{children}</div>
    </div>
  );
};

export default layout;
