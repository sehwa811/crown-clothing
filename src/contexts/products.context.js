import { createContext, useState } from "react";

import PRODUCTS from '../shop-data.json';

export const ProductsContext = createContext({
    products: [],
});
//상품 목록을 context로 저장

export const ProductsProvider = ({children}) => {
    const [products, setProducts] = useState(PRODUCTS)
    const value = {products};
    return (
        <ProductsContext.Provider value={value}>
            {children}
        </ProductsContext.Provider>
    );
};