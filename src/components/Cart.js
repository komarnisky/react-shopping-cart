import React, { Component } from 'react';

import formatCurrency from '../util';

export default class Cart extends Component {
    constructor (props) {
        super (props);

        this.state = {
            showCheckout: false,

            name: '',
            email: '',
            address: ''
        }
    }

    handleInput = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    createOrder = event => {
        event.preventDefault();

        const { name, email, address } = this.state;
        const order = { name, email, address, cartItems: this.props.cartItems };

        this.props.onCreateOrder(order);
    }

    // TODO: Refactor render method implementing more comples conditional
    render() {
        const { cartItems } = this.props;
        const totalCost = cartItems.reduce((total, item) => (total + item.price * item.quantity), 0);

        const renderItem = item => (
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
        )

        return (
            <div>

                <h3>Cart</h3>

                { cartItems.length === 0 ? <p>Cart is empty</p> : cartItems.map(renderItem) }

                <div className="cart-summary">

                    <span class="bolder"> Total cost </span>
                    <span> {formatCurrency(totalCost)} </span>

                </div>

                <div className="cart-controls">

                    <button 
                        className="button button--secondary"
                        onClick={this.props.onClearCart}
                    >Clear cart</button>

                    <button onClick={() => {this.setState({ showCheckout: true })}} className="button">Place order</button>

                </div>

                {this.state.showCheckout && (
                    <div className="checkout">

                        <form onSubmit={this.createOrder} autocomplete="off">

                            <ul className="form-container">
                                <li>
                                    <label htmlFor="email">Name</label>
                                    <input onChange={this.handleInput} value={this.state.name} name="email" type="text"/>
                                </li>
                                <li>
                                    <label htmlFor="email">Email</label>
                                    <input onChange={this.handleInput} value={this.state.email} name="email" type="text"/>
                                </li>
                                <li>
                                    <label htmlFor="address">Address</label>
                                    <input onChange={this.handleInput} value={this.state.address} name="address" type="text"/>
                                </li>
                                <li className="controls">
                                    <button type="submit" className="button">Create order</button>
                                </li>
                            </ul>

                        </form>

                    </div>
                )}

            </div>
        )
    }
}
