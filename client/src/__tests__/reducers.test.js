import {
    UPDATE_PRODUCTS,
    UPDATE_CATEGORIES,
    UPDATE_CURRENT_CATEGORY,
    ADD_TO_CART,
    ADD_MULTIPLE_TO_CART,
    REMOVE_FROM_CART,
    UPDATE_CART_QUANTITY,
    CLEAR_CART,
    TOGGLE_CART
} from '../utils/actions';

import { reducer } from '../utils/reducers';

const initialState = {
    products: [],
    categories: [{ name: 'food' }],
    currentCategory: '1',
    cart: [
        {
            _id: '1',
            name: 'Soup',
            purchaseQuantity: 1
        },
        {
            _id: '2',
            name: 'Bread',
            purchaseQuantity: 2
        }
    ],
    cartOpen: false
};

test('UPDATE_PRODUCTS', () => {
    let newState = reducer(initialState, {
        type: UPDATE_PRODUCTS,
        products: [{}, {}]
    });
    expect(newState.products.length).toBe(2);
    expect(initialState.products.length).toBe(0);
});

test('UPDATE_CATEGORIES', () => {
    let newState = reducer(initialState, {
        type: UPDATE_CATEGORIES,
        categories: [{}, {}]
    });
    expect(newState.categories.length).toBe(2);
    expect(initialState.categories.length).toBe(1);
});

test('UPDATE_CURRENT_CATEGORY', () => {
    let newState = reducer(initialState, {
        type: UPDATE_CURRENT_CATEGORY,
        currentCategory: '2'
    });
    expect(newState.currentCategory).toBe('2');
    expect(initialState.currentCategory).toBe('1');
});

test('ADD_TO_CART', () => {
    let newState = reducer(initialState, {
        type: ADD_TO_CART,
        product: { purchaseQuantity: 1 }
    });
    expect(newState.cart.length).toBe(3);
    expect(initialState.cart.length).toBe(2);
});

test('ADD_MULTIPLE_TO_CART', () => {
    let newState = reducer(initialState, {
        type: ADD_MULTIPLE_TO_CART,
        products: [{},{}]
    });
    expect(newState.cart.length).toBe(4);
    expect(initialState.cart.length).toBe(2)
});

test('REMOVE_FROM_CART', () => {
    let newState1 = reducer(initialState, {
        type: REMOVE_FROM_CART,
        _id: '1'
    });
    expect(newState1.cartOpen).toBe(true);
    expect(newState1.cart.length).toBe(1);
    expect(newState1.cart[0]._id).toBe('2');
    let newState2 = reducer(newState1, {
        type: REMOVE_FROM_CART,
        _id: '2'
    });
    expect(newState2.cartOpen).toBe(false);
    expect(newState2.cart.length).toBe(0);
    expect(initialState.cart.length).toBe(2);
});

test('UPDATE_CART_QUANTITY', () => {
    let newState = reducer(initialState, {
        type: UPDATE_CART_QUANTITY,
        _id: '1',
        purchaseQuantity: 3
    })
    expect(newState.cartOpen).toBe(true);
    expect(newState.cart[0].purchaseQuantity).toBe(3);
    expect(newState.cart[1].purchaseQuantity).toBe(2);
    expect(initialState.cartOpen).toBe(false);
});

test('CLEAR_CART', () => {
    let newState = reducer(initialState, {
        type: CLEAR_CART
    });
    expect(newState.cartOpen).toBe(false);
    expect(newState.cart.length).toBe(0);
    expect(initialState.cart.length).toBe(2);
});

test('TOGGLE_CART', () => {
    let newState = reducer(initialState, {
        type: TOGGLE_CART
    });
    expect(newState.cartOpen).toBe(true);
    expect(initialState.cartOpen).toBe(false);
    let newState2 = reducer(newState, {
        type: TOGGLE_CART
    });
    expect(newState2.cartOpen).toBe(false);
});




import reducers from '../utils/reducers';

test('reducers', () => {
  let state;
  state = reducers({updateProducts:{type:'global/r_UPDATE_PRODUCTS'},updateCategories:{type:'global/r_UPDATE_CATEGORIES'},updateCurrentCategory:{type:'global/r_UPDATE_CURRENT_CATEGORY'},addToCart:{type:'global/r_ADD_TO_CART'},addMultipleToCart:{type:'global/r_ADD_MULTIPLE_TO_CART'},removeFromCart:{type:'global/r_REMOVE_FROM_CART'},updateCartQuantity:{type:'global/r_UPDATE_CART_QUANTITY'},clearCart:{type:'global/r_CLEAR_CART'},toggleCart:{type:'global/r_TOGGLE_CART'}}, {type:'global/r_UPDATE_PRODUCTS',payload:[{__typename:'Product',_id:'61904ed798dee728c823ea1e',name:'Tin of Cookies',description:'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',price:2.99,quantity:500,image:'cookie-tin.jpg',category:{__typename:'Category',_id:'61904ed798dee728c823ea17'}},{__typename:'Product',_id:'61904ed798dee728c823ea1f',name:'Canned Coffee',description:'Praesent sed lacinia mauris. Nulla congue nibh magna, at feugiat nunc scelerisque quis. Donec iaculis rutrum vulputate. Suspendisse lectus sem, vulputate ac lectus sed, placerat consequat dui.',price:1.99,quantity:500,image:'canned-coffee.jpg',category:{__typename:'Category',_id:'61904ed798dee728c823ea17'}},{__typename:'Product',_id:'61904ed798dee728c823ea20',name:'Toilet Paper',description:'Donec volutpat erat erat, sit amet gravida justo sodales in. Phasellus tempus euismod urna. Proin ultrices nisi ut ipsum congue, vitae porttitor libero suscipit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam lacinia a nisi non congue.',price:7.99,quantity:20,image:'toilet-paper.jpg',category:{__typename:'Category',_id:'61904ed798dee728c823ea18'}},{__typename:'Product',_id:'61904ed798dee728c823ea21',name:'Handmade Soap',description:'Praesent placerat, odio vel euismod venenatis, lectus arcu laoreet felis, et fringilla sapien turpis vestibulum nisl.',price:3.99,quantity:50,image:'soap.jpg',category:{__typename:'Category',_id:'61904ed798dee728c823ea18'}},{__typename:'Product',_id:'61904ed798dee728c823ea22',name:'Set of Wooden Spoons',description:'Vivamus ut turpis in purus pretium mollis. Donec turpis odio, semper vel interdum ut, vulputate at ex. Duis dignissim nisi vel tortor imperdiet finibus. Aenean aliquam sagittis rutrum.',price:14.99,quantity:100,image:'wooden-spoons.jpg',category:{__typename:'Category',_id:'61904ed798dee728c823ea18'}},{__typename:'Product',_id:'61904ed798dee728c823ea23',name:'Camera',description:'Vestibulum risus metus, luctus non tortor quis, tincidunt consectetur ex. Nullam vitae lobortis ligula, ut sagittis massa. Curabitur consectetur, tellus at pulvinar venenatis, erat augue cursus erat, eu ullamcorper eros lectus ultrices ipsum. Integer rutrum, augue vitae auctor venenatis, turpis turpis elementum orci, at sagittis risus mi a leo.',price:399.99,quantity:30,image:'camera.jpg',category:{__typename:'Category',_id:'61904ed798dee728c823ea19'}},{__typename:'Product',_id:'61904ed798dee728c823ea24',name:'Tablet',description:'In sodales, ipsum quis ultricies porttitor, tellus urna aliquam arcu, eget venenatis purus ligula ut nisi. Fusce ut felis dolor. Mauris justo ante, aliquet non tempus in, tempus ac lorem. Aliquam lacinia dolor eu sem eleifend ultrices. Etiam mattis metus metus. Sed ligula dui, placerat non turpis vitae, suscipit volutpat elit. Phasellus sagittis, diam elementum suscipit fringilla, libero mauris scelerisque ex, ac interdum diam erat non sapien.',price:199.99,quantity:30,image:'tablet.jpg',category:{__typename:'Category',_id:'61904ed798dee728c823ea19'}},{__typename:'Product',_id:'61904ed798dee728c823ea25',name:'Tales at Bedtime',description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ornare diam quis eleifend rutrum. Aliquam nulla est, volutpat non enim nec, pharetra gravida augue. Donec vitae dictum neque. Pellentesque arcu lorem, fringilla non ligula ac, tristique bibendum erat. Ut a semper nibh. Quisque a mi et mi tempor ultricies. Maecenas eu ipsum eu enim hendrerit accumsan at euismod urna.',price:9.99,quantity:100,image:'bedtime-book.jpg',category:{__typename:'Category',_id:'61904ed798dee728c823ea1a'}},{__typename:'Product',_id:'61904ed798dee728c823ea26',name:'Spinning Top',description:'Ut vulputate hendrerit nibh, a placerat elit cursus interdum.',price:1.99,quantity:1000,image:'spinning-top.jpg',category:{__typename:'Category',_id:'61904ed798dee728c823ea1b'}},{__typename:'Product',_id:'61904ed798dee728c823ea27',name:'Set of Plastic Horses',description:'Sed a mauris condimentum, elementum enim in, rhoncus dui. Phasellus lobortis leo odio, sit amet pharetra turpis porta quis.',price:2.99,quantity:1000,image:'plastic-horses.jpg',category:{__typename:'Category',_id:'61904ed798dee728c823ea1b'}},{__typename:'Product',_id:'61904ed798dee728c823ea28',name:'Teddy Bear',description:'Vestibulum et erat finibus erat suscipit vulputate sed vitae dui. Ut laoreet tellus sit amet justo bibendum ultrices. Donec vitae felis vestibulum, congue augue eu, finibus turpis.',price:7.99,quantity:100,image:'teddy-bear.jpg',category:{__typename:'Category',_id:'61904ed798dee728c823ea1b'}},{__typename:'Product',_id:'61904ed798dee728c823ea29',name:'Alphabet Blocks',description:'Morbi consectetur viverra urna, eu fringilla turpis faucibus sit amet. Suspendisse potenti. Donec at dui ac sapien eleifend hendrerit vel sit amet lectus.',price:9.99,quantity:600,image:'alphabet-blocks.jpg',category:{__typename:'Category',_id:'61904ed798dee728c823ea1b'}}]});
  expect(state).toEqual({updateProducts:{type:'global/r_UPDATE_PRODUCTS',payload:{type:'global/r_UPDATE_PRODUCTS'}},updateCategories:{type:'global/r_UPDATE_CATEGORIES',payload:{type:'global/r_UPDATE_CATEGORIES'}},updateCurrentCategory:{type:'global/r_UPDATE_CURRENT_CATEGORY',payload:{type:'global/r_UPDATE_CURRENT_CATEGORY'}},addToCart:{type:'global/r_ADD_TO_CART',payload:{type:'global/r_ADD_TO_CART'}},addMultipleToCart:{type:'global/r_ADD_MULTIPLE_TO_CART',payload:{type:'global/r_ADD_MULTIPLE_TO_CART'}},removeFromCart:{type:'global/r_REMOVE_FROM_CART',payload:{type:'global/r_REMOVE_FROM_CART'}},updateCartQuantity:{type:'global/r_UPDATE_CART_QUANTITY',payload:{type:'global/r_UPDATE_CART_QUANTITY'}},clearCart:{type:'global/r_CLEAR_CART',payload:{type:'global/r_CLEAR_CART'}},toggleCart:{type:'global/r_TOGGLE_CART',payload:{type:'global/r_TOGGLE_CART'}}});
});



