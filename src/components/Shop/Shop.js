import React, { useEffect, useState } from 'react';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDb, getShoppingCart } from '../../utilities/fakedb';

const Shop = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch('products.json')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])

    useEffect(() => {
        const storedCart = getShoppingCart();
        const saveCart = [];
        // step 1: get ID
        for (const id in storedCart) {
            //step 2 : get the product by using id
            const addedProduct = products.find(product => product.id === id)
            console.log(addedProduct)
            if (addedProduct) {
                // step 3: get quantity of the product
                const quantity = storedCart[id];
                addedProduct.quantity = quantity;
                //step 4 : add the addProduct to the saveCart
                saveCart.push(addedProduct);
            }
            // console.log(addedProduct)

        }
        //step 5 : set data to UI
        setCart(saveCart)
    }, [products])

    const [cart, setCart] = useState([]);

    const handleAddToCart = (product) => {
        const newCart = [...cart, product];
        setCart(newCart);
        addToDb(product.id)
    }

    return (
        <div className='shop-conatiner'>
            <div className='product-container'>
                {
                    products.map(product =>
                        <Product
                            key={product.id}
                            product={product}
                            handleAddToCart={handleAddToCart}
                        ></Product>)
                }
            </div>
            <div className='order-cart'>
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;