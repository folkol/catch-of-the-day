import React from 'react';
import { formatPrice } from '../helpers';

class Order extends React.Component {
	renderOrderItem(key) {
		const fish = this.props.fishes[key];
		const amount = this.props.order[key];
		return (
			<li key={key}>
				{amount}lbs of {fish ? fish.name : 'fish'}
				<span className="price">{formatPrice(amount * (fish ? fish.price : 0))}</span>
			</li>
		)
	}

	render() {
		const total = Object.keys(this.props.order).reduce((acc, key) => {
			const fish = this.props.fishes[key];
			if(fish) {
				return acc + this.props.fishes[key].price * this.props.order[key];
			}
			return acc;
		}, 0);
		return (
			<div className="order-wrapp">
				<h2>Your Order</h2>
				<ul className="order">
					{
						Object
							.keys(this.props.order)
							.map(this.renderOrderItem.bind(this))
					}
					<li className="total">
						<strong>Total:</strong>
						{formatPrice(total)}
					</li>
				</ul>
			</div>
		)
	}
}

export default Order;
