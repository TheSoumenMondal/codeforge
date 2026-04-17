type TProps = {
  children: React.ReactNode;
};

const layout = ({ children }: TProps) => {
  return (
    <div className="w-full grid grid-cols-12 h-[calc(100vh-57px)]">
      <div className="col-span-8 border-r">{children}</div>
      <div className="col-span-4">Right Section</div>
    </div>
  );
};

export default layout;
