import React, { Component } from 'react';
import { connect } from 'react-redux';
import { testExampleData } from './actions';
import GameArea from './components/GameArea';


class GameScreen extends Component {

	componentDidMount() {
		this.props.testExampleData();
	}

	render() {
		console.log(this.props.loaded);

		return (
			<div className="GameScreen">
				<GameArea />
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
})(GameScreen);
