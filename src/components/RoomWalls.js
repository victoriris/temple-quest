import { Vector3 } from '@babylonjs/core/Maths/math';
import React, { Component } from 'react';
import { Model } from 'react-babylonjs';


let baseUrl = `${process.env.PUBLIC_URL}/objects/`;


class RoomWalls extends Component {

    renderWalls() {
        const { roomId } = this.props;

        const walls = [
            {position: [-40, 0, 0], rotation: [0, 0, 0]},
            {position: [0, 0, -40], rotation: [0, Math.PI/2, 0]},
            {position: [40, 0, 0], rotation: [0, 0, 0]},
            {position: [0, 0, 40], rotation: [0, Math.PI/2, 0]},
        ];

        return walls.map((wall, idx) => {
            const [p1, p2, p3] = wall.position;
            const [r1, r2, r3] = wall.rotation;
            return (
                <Model sceneFilename={`frontWall${roomId}.glb`}
                rootUrl = {baseUrl}
                position = {new Vector3(p1, p2, p3) }
                rotation = {new Vector3(r1, r2, r3) }
                />
            );
        });

    }

    render () {
        return (
          <>
            {this.renderWalls()}
          </>
        );

    }

}

export default RoomWalls;
