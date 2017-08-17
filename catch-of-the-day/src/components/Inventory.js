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

	renderEditFish(key) {
		const fish = this.props.fishes[key];
		return (
			<li key={key}>
				<form className="fish-edit">
					<input type="text" placeholder="Fish Name" name="name" value={fish.name} onChange={e => this.changeHandler(e, key)} />
					<input type="text" placeholder="Fish Price" name="price" value={fish.price} onChange={e => this.changeHandler(e, key)} />
					<select name="status" onChange={e => this.changeHandler(e, key)}>
						<option value="available">Fresh!</option>
						<option value="unavailable">Sold Out!</option>
					</select>
					<textarea type="text" placeholder="Fish Desc" name="desc" value={fish.desc} onChange={e => this.changeHandler(e, key)}></textarea>
					<input type="text" placeholder="Fish Image" name="image" value={fish.image} onChange={e => this.changeHandler(e, key)}/>
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

export default Inventory;
