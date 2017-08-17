import React from 'react';

import AddFishForm from './AddFishForm';

class Inventory extends React.Component {
	constructor() {
		super();
		this.renderEditFish = this.renderEditFish.bind(this);
		this.changeHandler = this.changeHandler.bind(this);
	}

	changeHandler(e, key) {
		const fish = this.props.fishes[key];
		const updatedFish = {
			...fish,
			[e.target.name]: e.target.value
		};
		this.props.updateFish(key, updatedFish);
	}

	removeFish(key) {
		console.log('Removing fish with key ', key);
		this.props.removeFish(key);
	}

	renderEditFish(key) {
		const fish = this.props.fishes[key];
		return (
			<li key={key}>
				<form className="fish-edit">
					<input type="text" placeholder="Fish Name" name="name" defaultValue={fish.name} onChange={e => this.changeHandler(e, key)} />
					<input type="text" placeholder="Fish Price" name="price" defaultValue={fish.price} onChange={e => this.changeHandler(e, key)} />
					<select name="status" value={fish.status} onChange={e => this.changeHandler(e, key)}>
						<option value="available">Fresh!</option>
						<option value="unavailable">Sold Out!</option>
					</select>
					<textarea type="text" placeholder="Fish Desc" name="desc" defaultValue={fish.desc} onChange={e => this.changeHandler(e, key)}></textarea>
					<input type="text" placeholder="Fish Image" name="image" defaultValue={fish.image} onChange={e => this.changeHandler(e, key)}/>
					<button type='button' onClick={() => this.removeFish(key)}>Remove Fish!</button>
				</form>
			</li>
		)
	}

	render() {
		return (
			<div>
				<h2>Inventory</h2>
				<ul>
				{
					Object
						.keys(this.props.fishes)
						.map(this.renderEditFish)
				}
				</ul>
				<AddFishForm addFish={this.props.addFish} />
				<button onClick={this.props.loadSamples}>Load Samples</button>
			</div>
		);
	}
}

Inventory.propTypes = {
	fishes: React.PropTypes.object.isRequired,
	addFish: React.PropTypes.func.isRequired,
	updateFish: React.PropTypes.func.isRequired,
	removeFish: React.PropTypes.func.isRequired
}

export default Inventory;
