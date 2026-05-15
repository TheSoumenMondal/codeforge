"use client";

import { FireIcon } from "@phosphor-icons/react";

const GridCard = () => {
  const cells = Array.from({ length: 50 }, (_, index) => index);

  return (
    <div className="w-full h-full p-4">
      <div className="w-full h-full grid grid-cols-10 gap-1">
        {cells.map((cell) => (
          <div
            key={cell}
            className="aspect-square bg-accent flex items-center justify-center rounded-full cursor-pointer"
          >
            <FireIcon
              size={15}
              className="text-orange-500"
              weight="duotone"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GridCard;
