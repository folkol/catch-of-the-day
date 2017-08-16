import React from 'react';
import { formatPrice } from '../helpers';

class Order extends React.Component {
	render() {
		const total = Object.keys(this.props.order).reduce((acc, key) => {
			return acc + this.props.fishes[key].price * this.props.order[key];
		}, 0);
		return <p>Order: {formatPrice(total)}</p>
	}
}

export default Order;
