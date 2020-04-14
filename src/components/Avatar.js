import React from 'react';
import Avatars from '@dicebear/avatars';
import sprites from '@dicebear/avatars-gridy-sprites';
import {Image} from 'semantic-ui-react';


export default function RandomAvatar({ seed }) {

    let options = { base64: true, width: 50 };
    let avatars = new Avatars(sprites, options);
    let svg = avatars.create(seed);

    return (
        <Image alt="avatar" avatar src={svg} />
    )
}
