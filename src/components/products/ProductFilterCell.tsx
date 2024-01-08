// incomplete

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../../redux/slices/categories-slice";

interface ProductFilterCellProps {
    cell: string;
    categories?: string[];
    isSuccess?: boolean;
}

const ProductFilterCell: React.FC<ProductFilterCellProps> = ({ cell, categories, isSuccess }) => {

    const categoriesFilter = useSelector(({categories}) => categories.filter);

    const [filteredState, setFilteredState] = useState<string>(categoriesFilter);
    
    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilteredState(() => e.target.value);
    };
    
    const dispatch = useDispatch();
    dispatch(setFilter(filteredState))

    return (
        <div className="flex flex-col border-2 border-gray-300 text-md mx-2 my-2 rounded-md p-4">
            <h3 className="pb-4 uppercase font-black">{cell}</h3>
            {isSuccess && <ul className="pl-4 uppercase text-sm flex flex-col gap-2">
                {isSuccess && categories?.map((category, index) => ( // todo: add_filter_function and shift this to another module.
                    <li className="flex flex-row gap-3" key={index}>
                        <input
                            type="checkbox"
                            name="categories_checkbox"
                            value={category}
                            onChange={handleFilterChange}
                        />
                        {category}
                    </li>
                ))}
            </ul>}
            {cell === "price"   // todo: add price filter and filter_function.
                && <Price/>
            }
        </div>
    );
};

export default ProductFilterCell;
