import React from 'react';

class StorePicker extends React.Component {
	render() {
		return (
			<form className="store-selector">
				<h2>Please enter store name</h2>
				<input type="text" required placeholder="store name"/>
				<button type="submit">Visit Store --></button>
			</form>
		);
	}
}

export default StorePicker;
