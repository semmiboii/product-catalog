import PriceFilter from "./PriceFilter";
import CategoryFilter from "./CategoryFilter";

interface ProductFilterItemProps {
  categories: string[];
  isSuccess?: boolean;
}

const ProductFilterItem: React.FC<ProductFilterItemProps> = ({
  categories,
  isSuccess,
}) => {
  return (
    <div className="h-[100%]">
      <div className="flex flex-col bg-white shadow-lg drop-lg outline-none border-none text-md mx-2 my-2 p-4">
        {isSuccess && <CategoryFilter categories={categories} />}
      </div>
      <div className="flex flex-col bg-white shadow-lg drop-lg outline-none border-none text-md px-10 py-4 m-2">
        <PriceFilter />
      </div>
    </div>
  );
};

export default ProductFilterItem;
