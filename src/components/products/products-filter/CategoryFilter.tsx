import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../../../redux/slices/products-slice";
import { Reducers } from "../../../redux/store";

interface CategoryFilterProps {
  categories?: string[];
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ categories }) => {
  const dispatch = useDispatch();
  const selectedCategory = useSelector(
    (state: Reducers) => state.products.categoryFilter
  );

  const handleChange = (e: { target: { value: string; checked: boolean } }) => {
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
            <li className="flex flex-row gap-3 font-lato" key={index}>
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
