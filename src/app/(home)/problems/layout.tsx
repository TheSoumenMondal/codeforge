import PageRight from "@/components/features/problems/PageRight";

type TProps = {
  children: React.ReactNode;
};

const layout = ({ children }: TProps) => {
  return (
    <div className="w-full min-w-0 grid grid-cols-12 h-[calc(100vh-57px)]">
      <div className="col-span-8 flex h-full min-h-0 min-w-0 flex-col border-r overflow-hidden">
        {children}
      </div>
      <div className="col-span-4 h-full min-h-0 min-w-0">
        <PageRight />
      </div>
    </div>
  );
};

export default layout;
