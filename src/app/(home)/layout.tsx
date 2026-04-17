import type React from "react";
import LeftSidebar from "@/components/features/common/LeftSidebar";
import Navbar from "@/components/features/common/Navbar";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="w-full min-h-screen grid grid-cols-12 max-w-298 mx-auto">
      <div className="col-span-2 border-r">
        <LeftSidebar />
      </div>
      <div className="col-span-10 border-r">
        <div className="h-14 border-b">
          <Navbar />
        </div>
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
};

export default layout;
