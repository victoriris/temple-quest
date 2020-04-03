import { Vector3 } from '@babylonjs/core/Maths/math';
import React, { Component } from 'react';
import { DirectionalLight, ShadowGenerator } from 'react-babylonjs';


class RoomLights extends Component {

    renderLights () {
        const intensity = 1.7;
        const lights = [
            {direction: [-1, -.35, 1] , position: [20, 20, -20]},
            {direction: [1, -.35, -1] , position: [-20, 20, 20]},
            {direction: [-1, -.35, -1] , position: [20, 20, 20]},
            {direction: [1, -.35, 1] , position: [-20, 20, -20]},
        ];

        return lights.map((light, idx) => {
            const [d1, d2, d3] = light.direction; 
            const [p1, p2, p3] = light.position; 
            return (
                <DirectionalLight name={`dl0${idx}`} 
                intensity={intensity}
                direction={new Vector3(d1, d2, d3)} 
                position = {new Vector3(p1, p2, p3)}>
                  <ShadowGenerator 
                  mapSize={1024} 
                  useBlurExponentialShadowMap={true} 
                  blurKernel={32} 
                  shadowCasters={["counterClockwise", "clockwise", "BoomBox"]} />
                </DirectionalLight>
            );
        });
    }

    render () {

        return (
            <>
                {this.renderLights()}
            </>
        );

    }
}

export default RoomLights;
