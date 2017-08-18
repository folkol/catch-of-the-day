import React from 'react';
import base from '../base';
import AddFishForm from './AddFishForm';

class Inventory extends React.Component {
	constructor() {
		super();
		this.renderEditFish = this.renderEditFish.bind(this);
		this.changeHandler = this.changeHandler.bind(this);
		this.authHandler = this.authHandler.bind(this);
		this.logout = this.logout.bind(this);

		this.state = {
			uid: undefined
		}
	}

	componentDidMount() {
		base.onAuth(user => {
			if(user) {
				this.authHandler(undefined, { user });
			}
		})
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

	authenticate(provider) {
		console.log(`Trying to log in with ${provider}`);
		console.log(base);
		base.authWithOAuthPopup(provider, this.authHandler);
	}

	authHandler(err, authData) {
		if(err) {
			console.error(err);
			return;
		}

		const storeRef = base.database().ref(this.props.storeId);
		storeRef.once('value', snapshot => {
			const data = snapshot.val() || {};
			if(!data.owner) {
				storeRef.set({
					owner: authData.user.uid
				})
			}

			this.setState({
				uid: authData.user.uid,
				owner: data.owner || authData.user.uid
			});
		});

	}

	renderLogin() {
		return (
			<nav className="login">
				<h2>Inventory</h2>
				<p>Sign in to manage your store's inventory</p>
				<button className="github" onClick={() => this.authenticate('github')}>Log In with GitHub</button>
				<button className="facebook" onClick={() => this.authenticate('facebook')}>Log In with Facebook</button>
				<button className="email" onClick={() => this.authenticate('email')}>Log In with e-mail</button>
			</nav>
		)
	}

	logout() {
		base.unauth();
		this.setState({uid: null});
	}

	render() {
		const button = <button onClick={this.logout}>Log out</button>

		if(!this.state.uid) {
			return <div>{this.renderLogin()}</div>
		}

		if(this.state.uid !== this.state.owner) {
			return (
				<div>
					<div>Sorry, you are not the owner.</div>
					{button}
				</div>
			)
		}

		return (
			<div>
				<h2>Inventory</h2>
				{button}
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
	removeFish: React.PropTypes.func.isRequired,
	storeId: React.PropTypes.string.isRequired
}

export default Inventory;
