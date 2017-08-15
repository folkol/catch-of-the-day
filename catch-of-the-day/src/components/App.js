import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';

class App extends React.Component {
	constructor() {
		super();
		this.addFish = this.addFish.bind(this);
		this.state = {};
		this.order = {};
	}
	addFish(fish) {
		console.log("Adding fish");
		console.log(fish);
		const state = {...this.state};
		const timestamp = Date.now();
		state[`fish-${timestamp}`] = fish;
		this.setState({state: state});
	}
	render() {
		return (
			<div className="catch-of-the-day">
				<div className="menu">
					<Header tagline="Fresh Fish" />
				</div>
				<Order />
				<Inventory addFish={this.addFish}/>
			</div>
		);
	}
}

export default App;
