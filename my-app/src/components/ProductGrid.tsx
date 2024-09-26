import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchProducts, setPage } from '../redux/productSlice';
import { Button, Pagination } from 'react-bootstrap';
import ProductModal from './ProductModal';

const ProductGrid: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { products, loading, page, limit, total } = useSelector(
        (state: RootState) => state.products
    );
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        dispatch(fetchProducts({ page, limit }));
    }, [page, limit, dispatch]);

    const handlePageChange = (newPage: number) => {
        dispatch(setPage(newPage));
    };

    const handleEditClick = (product: any) => {
        setSelectedProduct(product);
    };

    const handleSave = (updatedProduct: any) => {
        const updatedProducts = products.map(product => 
            product.id === updatedProduct.id ? updatedProduct : product
        );
        
        dispatch({
            type: 'products/updateProduct', 
            payload: updatedProducts
        });

        setSelectedProduct(null);
    };

    return (
        <div className="product-grid">
            {loading ? (
                <p>Loading...</p>
            ) : products.length === 0 ? (
                <p>No products found</p>
            ) : (
                <>
                    <div className="row">
                        {products.map((product) => (
                            <div className="col-md-4 mb-3" key={product.id}>
                                <div className="card">
                                    <img
                                        src={product.thumbnail}
                                        className="card-img-top"
                                        alt={product.title}
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">
                                            <a href="#" onClick={() => handleEditClick(product)}>
                                                {product.title}
                                            </a>
                                        </h5>
                                        <p className="card-text">Category: {product.category}</p>
                                        <p className="card-text">Price: ${product.price}</p>
                                        <Button variant="primary" onClick={() => handleEditClick(product)}>
                                            Edit
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <Pagination>
                        {Array.from({ length: Math.ceil(total / limit) }, (_, num) => (
                            <Pagination.Item
                                key={num + 1}
                                active={num + 1 === page}
                                onClick={() => handlePageChange(num + 1)}
                            >
                                {num + 1}
                            </Pagination.Item>
                        ))}
                    </Pagination>

                    {selectedProduct && (
                        <ProductModal
                            product={selectedProduct}
                            onHide={() => setSelectedProduct(null)}
                            onSave={handleSave}
                        />
                    )}
                </>
            )}
        </div>
    );
};

export default ProductGrid;
