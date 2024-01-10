import PriceFilter from "../products-filter/PriceFilter";
import CategoryFilter from "../products-filter/CategoryFilter";

interface ProductFilterItemProps {
  categories: string[];
  isSuccess?: boolean;
}

const ProductFilterItem: React.FC<ProductFilterItemProps> = ({
  categories,
  isSuccess,
}) => {
  return (
    <>
      <div className="flex flex-col border-2 border-gray-300 text-md mx-2 my-2 rounded-md p-4">
        {isSuccess && <CategoryFilter categories={categories} />}
      </div>
      <div className="flex flex-col border-2 border-gray-300 text-md rounded-md p-4 m-2">
        <PriceFilter />
      </div>
    </>
  );
};

export default ProductFilterItem;
