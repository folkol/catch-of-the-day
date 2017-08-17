import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';


class App extends React.Component {
	constructor() {
		super();
		this.addFish = this.addFish.bind(this);
		this.updateFish = this.updateFish.bind(this);
		this.removeFish = this.removeFish.bind(this);
		this.loadSamples = this.loadSamples.bind(this);
		this.addToOrder = this.addToOrder.bind(this);
		this.removeFromOrder = this.removeFromOrder.bind(this);
		this.state = {
			fishes: {},
			order: {}
		};
	}

	addFish(fish) {
		console.log("Adding fish");
		console.log(fish);
		const fishes = {...this.state.fishes};
		const timestamp = Date.now();
		fishes[`fish-${timestamp}`] = fish;
		this.setState({ fishes });
	}

	updateFish(key, fish) {
		console.log("Updating fish", fish);
		const fishes = {
			...this.state.fishes,
			[key]: fish
		};
		this.setState({ fishes });
	}

	removeFish(key) {
		const fishes = {
			...this.state.fishes,
			[key]: null
		};
		this.setState({ fishes });		
	}

	loadSamples() {
		this.setState({
			fishes: sampleFishes
		})
	}

	addToOrder(key) {
		const order = {...this.state.order};
		order[key] = order[key] + 1 || 1;
		this.setState({order});
	}

	removeFromOrder(key) {
		console.log('Removing key from order', key);
		const updatedOrder = {...this.state.order};
		delete updatedOrder[key];
		this.setState({ order: updatedOrder });
	}

	componentWillMount() {
		this.ref = base.syncState(`${this.props.params.storeId}/fishes`, {
			context: this,
			state: 'fishes'
		});

		const order = localStorage.getItem(`order-${this.props.params.storeId}`);
		if(order) {
			this.setState({
				'order': JSON.parse(order)
			});
			console.log('Updated order: ' + order);
		}
	}

	componentWillUnmount() {
		base.removeBinding(this.ref);
	}

	componentWillUpdate(nextProps, nextState) {
		localStorage.setItem(`order-${this.props.params.storeId}`, JSON.stringify(this.state.order));
	}

	render() {
		return (
			<div className="catch-of-the-day">
				<div className="menu">
					<Header tagline="Fresh Fish" />
					<ul>
					{
						Object
							.keys(this.state.fishes)
							.map(key => <Fish addToOrder={() => this.addToOrder(key)} key={key} details={this.state.fishes[key]}/>)
					}
					</ul>
				</div>
				<Order fishes={this.state.fishes} order={this.state.order} removeFromOrder={this.removeFromOrder} />
				<Inventory fishes={this.state.fishes} addFish={this.addFish} updateFish={this.updateFish} removeFish={this.removeFish} loadSamples={this.loadSamples} />
			</div>
		);
	}
}

App.propTypes = {
	params: React.PropTypes.object.isRequired
}

export default App;
