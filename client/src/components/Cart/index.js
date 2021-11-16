import './style.css';

import CartItem from '../CartItem';

import Auth from '../../utils/auth';

import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { r_TOGGLE_CART, r_ADD_MULTIPLE_TO_CART } from '../../utils/reducers';

import { idbPromise } from '../../utils/helpers';

import { useLazyQuery } from '@apollo/client';
import { QUERY_CHECKOUT } from '../../utils/queries';

import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const Cart = () => {
    const cart = useSelector(({ global }) => global.cart);
    const cartOpen = useSelector(({ global }) => global.cartOpen);
    const dispatch = useDispatch();
    const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

    function toggleCart() { dispatch(r_TOGGLE_CART()) };

    function calculateTotal() {
        let sum = 0;
        cart.forEach(item => {
            sum += item.price * item.purchaseQuantity
        });
        return sum.toFixed(2);
    };

    function submitCheckout() {
        const productIds = [];
        cart.forEach(item => {
            for (let i = 0; i < item.purchaseQuantity; i++) {
                productIds.push(item._id)
            };
        });
        getCheckout({
            variables: { products: productIds }
        });
    };

    useEffect(() => {
        async function getCart() {
            const dbcart = await idbPromise('cart', 'get');
            if (dbcart.length) {
                dispatch(r_ADD_MULTIPLE_TO_CART(dbcart));
            };
        };
        if (!cart.length) {
            getCart();
        }
    }, [cart.length, dispatch]);

    useEffect(() => {
        if (data) {
            stripePromise.then(res => res.redirectToCheckout({ sessionId: data.checkout.session }));
        }
    }, [data]);

    if (!cartOpen) {
        return (
            <div className="cart-closed" onClick={toggleCart}>
                <span
                    role='img'
                    aria-label='trash'
                >
                    🛒
                </span>
            </div>
        );
    }
    return (
        <div className="cart">
            <div className="close" onClick={toggleCart}>[close]</div>
            <h2>Shopping Cart</h2>
            {cart.length ? (
                <div>
                    {cart.map(item => (
                        <CartItem key={item._id} item={item} />
                    ))}
                    <div className="flex-row space-between">
                        <strong>Total: ${calculateTotal()}</strong>
                        {
                            Auth.loggedIn() ?
                                <button onClick={submitCheckout}>
                                    Checkout
                                </button>
                                :
                                <span>(log in to check out)</span>
                        }
                    </div>
                </div>
            ) : (
                <h3>
                    <span role="img" aria-label="shocked">
                        😱
                    </span>
                    You haven't added anything to your cart yet!
                </h3>
            )}
        </div>
    );
};

export default Cart;