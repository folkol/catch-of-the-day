import React from 'react';
import { formatPrice } from '../helpers';
import CSSTransitionGroup from 'react-addons-css-transition-group';

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
			<CSSTransitionGroup
				component="span"
				className="count"
				transitionName="count"
				transitionEnterTimeout={250}
				transitionLeaveTimeout={250}
			>
				<span key={amount}>{amount}</span>
			</CSSTransitionGroup>
			lbs of {fish.name}
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
				<CSSTransitionGroup
					className="order"
					component="ul"
					transitionName="order"
					transitionEnterTimeout={500}
					transitionLeaveTimeout={500}
				>
					{
						Object
							.keys(this.props.order)
							.map(this.renderOrderItem.bind(this))
					}
					<li className="total">
						<strong>Total:</strong>
						{formatPrice(total)}
					</li>
				</CSSTransitionGroup>
			</div>
		)
	}
}

Order.propTypes = {
	fishes: React.PropTypes.object.isRequired,
	order: React.PropTypes.object.isRequired,
	removeFromOrder: React.PropTypes.func.isRequired
}

export default Order;
