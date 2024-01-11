import { MdClose } from "react-icons/md";
import ProductFilter from "./ProductFilter";

interface MobileFitlerProps {
  onUnmount: () => void;
}

const MobileFilter: React.FC<MobileFitlerProps> = ({ onUnmount }) => {
  return (
    <div className="h-full w-full absolute top-0 flex items-center justify-center backdrop-blur">
      <div className="flex justify-center w-full">
        <ProductFilter />
      </div>
      <button
        className="absolute top-10 right-8 bg-green-300 rounded-full p-2 text-white"
        onClick={onUnmount}
      >
        <MdClose size="20px" />
      </button>
    </div>
  );
};

export default MobileFilter;
