import React, { Component } from 'react';

export default class Filter extends Component {
    render() {
        return (
            <div className="filter">
                <div className="filter-result">
                    {this.props.count} products
                </div>

                <div className="filter-sort">
                    Order &nbsp;
                    <select value={this.props.order} onChange={this.props.onSortProducts}>

                        <option value="latest">
                            Latest
                        </option>
                        <option value="lowest">
                            Lowest price
                        </option>
                        <option value="highest">
                            Highest price
                        </option>

                    </select>
                </div>

                <div className="filter-size">
                    Filter &nbsp;
                    <select value={this.props.size} onChange={this.props.onFilterProducts}>

                        <option value="ALL">
                            ALL
                        </option>
                        <option value="XS">
                            XS
                        </option>
                        <option value="S">
                            S
                        </option>
                        <option value="M">
                            M
                        </option>
                        <option value="L">
                            L
                        </option>
                        <option value="XL">
                            XL
                        </option>
                        <option value="XXL">
                            XXL
                        </option>

                    </select>
                </div>
            </div>
        )
    }
}
