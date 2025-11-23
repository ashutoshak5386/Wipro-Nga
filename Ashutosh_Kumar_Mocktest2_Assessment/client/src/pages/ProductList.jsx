import React from 'react';
import ProductCard from '../components/ProductCard';

const ProductList = () => {
    return (
        <div>
            <h2>ShopNow Product Catalog</h2>
            <p style={{ color: '#666', marginBottom: '20px' }}>Browse our latest deals and discounts!</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                <ProductCard title="ShopNow Smartphone" price={699} discount={50} />
                <ProductCard title="ShopNow Pro Laptop" price={1499} discount={200} />
                <ProductCard title="Wireless Earbuds" price={199} discount={30} />
                <ProductCard title="Smart Watch" price={299} discount={40} />
            </div>
        </div>
    );
};

export default ProductList;
