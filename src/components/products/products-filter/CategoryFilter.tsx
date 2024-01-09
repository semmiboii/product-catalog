import { useDispatch, useSelector } from "react-redux";
import { Store } from "../../../redux/store";
import { setFilter } from "../../../redux/slices/products-slice";

interface CategoryFilterProps {
  categories?: string[];
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ categories }) => {
  const dispatch = useDispatch();
  const selectedCategory = useSelector(
    (state: Store) => state.products.categoryFilter
  );

  const handleChange = (e: { target: { value: string } }) => {
    dispatch(setFilter(e.target.value));
  };

  return (
    <>
      <h3 className="pb-4 uppercase font-black">CATEGORIES</h3>
      <ul className="pl-4 uppercase text-sm flex flex-col gap-2">
        {categories?.map(
          (
            category,
            index // todo: add_filter_function and shift this to another module.
          ) => (
            <li className="flex flex-row gap-3" key={index}>
              <input
                type="checkbox"
                name={category}
                value={category}
                onChange={handleChange}
                checked={selectedCategory === category}
              />
              {category}
            </li>
          )
        )}
      </ul>
    </>
  );
};

export default CategoryFilter;
