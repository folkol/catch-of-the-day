import React from 'react';
import { formatPrice } from '../helpers';

class Order extends React.Component {
	renderOrderItem(key) {
		const fish = this.props.fishes[key];
		const amount = this.props.order[key];

		const removeButton = <button type="button" onClick={() => this.props.removeFromOrder(key)}>&times;</button>;
		const available = fish && fish.status === 'available';

		if(!available) {
			return (
				<li key={key}>
				Sorry, fish no longer available.{removeButton}
				</li>
			)
		}

		return (
			<li key={key}>
			{amount}lbs of {fish.name}
			{removeButton}
			<span>{formatPrice(fish.price * amount)}</span>
			</li>
		)
	}

	render() {
		const total = Object.keys(this.props.order).reduce((acc, key) => {
			const fish = this.props.fishes[key];
			if(fish && fish.status === 'available') {
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
