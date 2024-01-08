import axios from 'axios';

import { Suspense, lazy, memo } from 'react';
import { useQuery } from '@tanstack/react-query'

import ProductFilter from './ProductFilter';
import Loading from '../UI/Loading';

const ProductCard = lazy(() => import('./ProductCard'));

export interface ProductType {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
}

export interface ProductCardProps{
    product: ProductType;
    key: number;
}

const Products: React.FC = () => {

    const fetchProducts = async() => {                  // Function to fetch all the products through axios.
        const url = 'https://dummyjson.com/products';  
        const res = await axios.get(url)
        const data = await res.data;
        
        return data;
    }
    
    const {data: allProducts , isSuccess} = useQuery({      // Fetching all the products through useQuery.
        queryFn: fetchProducts,
        queryKey: ['products']
    })  

    // Checking if the data is fetched, then mapping the data to individual products. 
    return (
        <div className='flex flex-row h-full'>
            <div>
                <ProductFilter/>
            </div>
            <Suspense fallback={<Loading/>}>
                <div className='h-full w-full grid grid-cols-4 p-2 overflow-scroll gap-4'>
                    {isSuccess && allProducts.products.map((product: ProductType) => <ProductCard key={product.id} product={product} />)}
                </div>
            </Suspense>
        </div>
  )
}

export default memo(Products);