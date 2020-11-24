import React from 'react';
import Products from './components/Products';
import Filter from './components/Filter';
import data from './data.json';

class App extends React.Component {

  constructor () {
    super();

    this.state = {
      products: data.products,
      size: "ALL",
      sort: ""
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

              <Products products={filteredProducts}></Products>
            </div>

            <div className="sidebar">
              sidebar
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
