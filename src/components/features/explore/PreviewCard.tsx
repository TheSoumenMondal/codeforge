import { XCircleIcon } from "@phosphor-icons/react";

const PreviewGrid = ({
  previews,
  onRemove,
}: {
  previews: string[];
  onRemove: (idx: number) => void;
}) => {
  if (previews.length === 0) return null;

  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {previews.map((src, idx) => (
        <div
          key={src}
          className="relative shrink-0 w-20 h-20 rounded-xl overflow-hidden group/tile"
        >
          <div
            style={{ backgroundImage: `url(${src})` }}
            className="absolute inset-0 bg-center bg-cover"
          />
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onRemove(idx);
            }}
            className="absolute top-1 right-1 z-10 bg-black/60 hover:bg-black/85 text-white rounded-full w-5 h-5 flex items-center justify-center shadow transition-colors opacity-0 group-hover/tile:opacity-100"
            aria-label="Remove image"
          >
            <XCircleIcon
              size={12}
              weight="fill"
            />
          </button>
          <div className="absolute bottom-1 left-1 bg-black/50 text-white text-[10px] font-medium px-1.5 py-px rounded-full leading-none opacity-0 group-hover/tile:opacity-100 transition-opacity">
            {idx + 1}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PreviewGrid;
