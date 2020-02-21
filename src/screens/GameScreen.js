import React, { Component } from 'react';
import { connect } from 'react-redux';
import GameArea from '../components/GameArea';


class GameScreen extends Component {

	render() {

		return (
			<div className="GameScreen">
				<GameArea />
			</div>
		);
	}
}

// const mapStateToProps = ({ board }) => {
// 	const { mounted } = board;
// 	return { mounted };
// };

export default connect(null, {
})(GameScreen);
