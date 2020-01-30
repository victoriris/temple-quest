import React, { Component } from 'react';
import Viewer from './Viewer/';
import { connect } from 'react-redux';
import { testExampleData } from './actions';


class App extends Component {

	componentDidMount() {
		this.props.testExampleData();
	}

	render() {
		console.log(this.props.loaded);

		return (
			<div className="App">
				<Viewer />
			</div>
		);
	}
}

const mapStateToProps = ({ example }) => {
	const { loaded } = example;
	return { loaded };
};

export default connect(mapStateToProps, {
	testExampleData
})(App);
