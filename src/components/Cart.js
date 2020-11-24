import React, { Component } from 'react';

import formatCurrency from '../util';

export default class Cart extends Component {
    // TODO: Refactor render method implementing more comples conditional
    render() {

        const { cartItems } = this.props;
        const totalCost = cartItems.reduce((total, item) => (total + item.price * item.quantity), 0);

        return (
            <div>

                <h3>Cart</h3>

                {
                cartItems.length === 0 
                ? <p>Cart is empty</p>
                
                : cartItems.map(item => (

                    <div className="cart-item">

                        <div className="cart-item-image">
                            <img src={item.image} alt={item.title}/>
                        </div>

                        <div className="cart-item-meta">
                            <span className="bolder">{item.title}</span>
                            <span className="cart-item-total-price">{item.quantity} x {formatCurrency(item.price)}</span>
                        </div>

                        <div className="cart-item-controls">
                            <span class="cart-item-remove" onClick={() => (this.props.onDeleteCartItem(item._id))}>X</span>
                        </div>

                    </div>

                ))
                }

                <div className="cart-summary">

                    <span class="bolder"> Total cost </span>
                    <span> {formatCurrency(totalCost)} </span>

                </div>

                <div className="cart-controls">

                    <button 
                        className="button button--secondary"
                        onClick={this.props.onClearCart}
                    >Clear cart</button>
                    <button className="button">Place order</button>

                </div>

            </div>
        )
    }
}
