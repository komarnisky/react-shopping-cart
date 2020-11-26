import React from 'react';

import Products from './components/Products';
import Filter from './components/Filter';
import Cart from './components/Cart';

import data from './data.json';

class App extends React.Component {

  constructor () {
    super();

    const cartItemsStorage = JSON.parse(localStorage.getItem('cartItems'))

    const cartItems = cartItemsStorage ? cartItemsStorage : [];

    this.state = {
      products: data.products,
      size: "ALL",
      sort: "",
      cartItems
    }
  }

  sortProducts = (event) => {
    this.setState(prevState => ({
      ...prevState,
      sort: event.target.value,
    }))
  }

  filterProducts = (event) => {
    this.setState(prevState => ({
      ...prevState,
      size: event.target.value,
    }))
  }

  addToCart = (product) => {
    const cartItems = this.state.cartItems.slice();

    let alreadyInCart = false;
    cartItems.forEach(item => {
      
      if (item._id === product._id) {
        item.quantity++;
        alreadyInCart = true;
      }

    });

    if (!alreadyInCart) {
      cartItems.push({...product, quantity: 1});
    }

    this.setState(prevState => ({
      ...prevState,
      cartItems
    }))

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }

  deleteCartItem = (itemId) => {
    const cartItems = this.state.cartItems.filter(item => (item._id !== itemId));

    this.setState(prevState => ({
      ...prevState,
      cartItems
    }))

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }

  clearCart = () => {
    this.setState(prevState => ({
      ...prevState,
      cartItems: []
    }))

    localStorage.setItem('cartItems', '[]');
  }

  createOrder = order => {
    alert('creating order...');
    console.log(order);
  }


  render () {

    const { size, sort } = this.state;

    const filteredProducts = this.state.products.filter(product => (
      (size !== 'ALL') ? product.availableSizes.indexOf(size) !== -1 : true
    ))

    filteredProducts.sort((productA, productB) => {

      switch (sort) {
        case 'lowest':
          return productA.price - productB.price;
        case 'highest':
          return -(productA.price - productB.price);
        default:
          return 0;
      };

    })

    return (
      <div className="grid-container">
  
        <header>
          <a href="/">React Shopping Cart</a>
        </header>
  
        <main>
          
          <div className="content">

            <div className="main">
              
              <Filter
                count={this.state.products.length}
                size={this.state.size}
                sort={this.state.sort}
                onSortProducts={this.sortProducts}
                onFilterProducts={this.filterProducts}
              ></Filter>

              <Products
                products={filteredProducts}
                onAddToCart={this.addToCart}
              ></Products>

            </div>

            <div className="sidebar">
              
              <Cart
                cartItems={this.state.cartItems}
                onDeleteCartItem={this.deleteCartItem}
                onClearCart={this.clearCart}
                onCreateOrder={this.createOrder}
              ></Cart>

            </div>

          </div>

        </main>
        
        <footer>
          All rights are reserved.
        </footer>
  
      </div>
    );
  }

}

export default App;
