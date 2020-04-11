import React from 'react';
import Avatars from '@dicebear/avatars';
import sprites from '@dicebear/avatars-gridy-sprites';


export default function Avatar({ seed }) {

    let options = { base64: true, width: 50 };
    let avatars = new Avatars(sprites, options);
    let svg = avatars.create(seed);

    return (
        <img alt="avatar" src={svg} />
    )
}
