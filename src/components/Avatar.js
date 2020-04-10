import React from 'react';
import Avatars from '@dicebear/avatars';
import sprites from '@dicebear/avatars-gridy-sprites';


export default function Avatar() {

    let options = { height: 200, width: 200 };
    let avatars = new Avatars(sprites, options);
    let svg = avatars.create('custom-seed');

    return (
        <img src={'https://avatars.dicebear.com/v2/gridy/a.svg'} />
    )
}
