import * as BABYLON from 'babylonjs';
import React, { Component } from 'react';
// import { updateBoardData } from '../actions';
// import { connect } from 'react-redux';


export default class BabylonScene extends Component {

  onResizeWindow = () => {
    if (this.engine) {
      this.engine.resize();
      this.forceUpdate()
    }
  }

  componentDidMount () {
    
    this.engine = new BABYLON.Engine(
        this.canvas,
        true,
        this.props.engineOptions,
        this.props.adaptToDeviceRatio
    );

    let scene = new BABYLON.Scene(this.engine);
    this.scene = scene;

    if (typeof this.props.onSceneMount === 'function') {
      this.props.onSceneMount({
        scene,
        engine: this.engine,
        canvas: this.canvas
      });
    } else {
      console.error('onSceneMount function not available');
    }

    // Resize the babylon engine when the window is resized
    window.addEventListener('resize', this.onResizeWindow);
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.onResizeWindow);
  }

  onCanvasLoaded = (htmlCanvasElem) => {
    if (htmlCanvasElem !== null) {
      this.canvas = htmlCanvasElem;
    }

    // setTimeout(() => {
		// 	this.props.updateBoardData('mounted', true);
    // }, 5000);
  }

  render () {

    // if (!this.props.mounted) {
		// 	return (
		// 		<div>
		// 			Mounting...
		// 		</div>
		// 	);
    // }

    // 'rest' can contain additional properties that you can flow through to canvas:
    // (id, className, etc.)
    const { width, height } = this.props;

    const opts = {};

    if (width !== undefined && height !== undefined) {
      opts.width = width;
      opts.height = height;
    } else {
      opts.width = window.innerWidth;
      opts.height = window.innerHeight;
    }

    return (
      <canvas
        {...opts}
        ref={this.onCanvasLoaded}
      />
    )
  }
}

// const mapStateToProps = ({ board }) => {
//   const {mounted} = board;
//   return {mounted};
// };
// export default connect(mapStateToProps, {
//   updateBoardData
// })(BabylonScene);