import LeftPage from "@/components/features/profile/LeftPage";
import RightPage from "@/components/features/profile/RightPage";

const page = () => {
  return (
    <div className="w-full grid grid-cols-12 h-[calc(100vh-57px)]">
      <div className="col-span-8 border-r">
        <LeftPage />
      </div>
      <div className="col-span-4">
        <RightPage />
      </div>
    </div>
  );
};

export default page;
