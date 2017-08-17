import React from 'react';
import { formatPrice } from '../helpers';

class Order extends React.Component {
	renderOrderItem(key) {
		const fish = this.props.fishes[key];
		const amount = this.props.order[key];
		const text = fish ? `${amount}lbs of ${fish.name || 'fish'}` : 'Sorry, fish not available.';
		const price = amount * (fish ? fish.price : 0);
		return (
			<li key={key}>
			{text}
			{fish ? <span>{formatPrice(price)}</span> : ''}
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
