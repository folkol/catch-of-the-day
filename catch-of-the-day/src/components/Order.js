import React from 'react';
import { formatPrice } from '../helpers';

class Order extends React.Component {
	render() {
		const total = Object.keys(this.props.order).reduce((acc, key) => {
			return acc + this.props.fishes[key].price * this.props.order[key];
		}, 0);
		return (
			<div>
				<h2>My Order</h2>
				{
					Object
						.keys(this.props.order)
						.map(key => {
							return <div>{this.props.fishes[key].name}</div>;
						})
				}
				<p>Total: {formatPrice(total)}</p>
			</div>
		)
	}
}

export default Order;
